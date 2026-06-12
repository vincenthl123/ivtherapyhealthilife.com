/**
 * POST /api/respondio-webhook?secret=<RESPONDIO_WEBHOOK_SECRET>
 *
 * Called by a respond.io Workflow when a contact's lifecycle stage becomes
 * "Consultation Booked". Looks up the click-time attribution stored by
 * /api/wa-click (via the HL-XXXX ref embedded in the customer's first
 * WhatsApp message) and sends a `whatsapp_conversion` event to GA4 through
 * the Measurement Protocol, attached to the original GA4 client_id so the
 * conversion attributes to the original ad session.
 *
 * Expected JSON body (configure in the respond.io HTTP Request step):
 *   {
 *     "phone":        "{{$contact.phone}}",
 *     "ref":          "{{$contact.<ref custom field>}}",   // or omit and pass message
 *     "message":      "<raw first message text>",           // optional fallback, ref is regexed out
 *     "contactId":    "{{$contact.id}}",
 *     "stage":        "Consultation Booked",
 *     "firstName":    "{{$contact.firstName}}"              // optional, for logs only
 *   }
 *
 * Auth: shared secret via ?secret= query param or X-Webhook-Secret header.
 *
 * Required env:
 *   GA4_API_SECRET            (GA4 Admin → Data Streams → Measurement Protocol API secrets)
 *   RESPONDIO_WEBHOOK_SECRET  (any long random string, mirrored in the respond.io workflow)
 *   BLOB_STORE_ID             (auto-added when the private Blob store was connected; OIDC auth)
 * Optional env:
 *   GA4_MEASUREMENT_ID        (defaults to G-K9R2HXK3QT)
 */
import { get, put } from "@vercel/blob";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const GA4_MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID || "G-K9R2HXK3QT";
const REF_RE = /HL-[A-Z2-9]{4}/i;

type RefRecord = {
  ref?: string;
  ga_client_id?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  p?: string; // page path at click time
  src?: string; // CTA source
  ts?: string; // click timestamp
};

const extractRef = (...candidates: unknown[]): string | null => {
  for (const c of candidates) {
    if (typeof c !== "string") continue;
    const m = c.match(REF_RE);
    if (m) return m[0].toUpperCase();
  }
  return null;
};

const readBlobJson = async <T>(pathname: string): Promise<T | null> => {
  try {
    const result = await get(pathname, { access: "private", useCache: false });
    if (!result?.stream) return null;
    const text = await new Response(result.stream as ReadableStream).text();
    return JSON.parse(text) as T;
  } catch {
    return null; // not found / unreadable → no record
  }
};

/** GA-shaped fallback client_id for conversions we can't match to a click. */
const randomClientId = (): string => {
  const rand = Math.floor(Math.random() * 9_000_000_000) + 1_000_000_000;
  return `${rand}.${Math.floor(Date.now() / 1000)}`;
};

const sendGa4Conversion = async (
  clientId: string,
  params: Record<string, unknown>,
): Promise<boolean> => {
  const apiSecret = process.env.GA4_API_SECRET;
  if (!apiSecret) {
    console.error("GA4_API_SECRET not configured");
    return false;
  }
  const url =
    "https://www.google-analytics.com/mp/collect" +
    `?measurement_id=${encodeURIComponent(GA4_MEASUREMENT_ID)}` +
    `&api_secret=${encodeURIComponent(apiSecret)}`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      non_personalized_ads: false,
      events: [{ name: "whatsapp_conversion", params }],
    }),
  });
  // The MP endpoint returns 2xx even for silently-dropped payloads; this only
  // catches transport/auth-level failures.
  return r.ok;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const secret = process.env.RESPONDIO_WEBHOOK_SECRET;
  const provided =
    (req.query.secret as string) || (req.headers["x-webhook-secret"] as string);
  if (!secret || provided !== secret) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const body: Record<string, unknown> =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};

    const phone = String(body.phone || "").trim();
    const stage = String(body.stage || "consultation_booked");
    const contactId = String(body.contactId || "").trim();
    const ref = extractRef(body.ref, body.message);

    // Idempotency: respond.io can re-fire if the lifecycle stage bounces.
    // One conversion per contact (falls back to phone, then ref).
    const dedupeKey = contactId || phone.replace(/\D/g, "") || ref;
    if (dedupeKey) {
      const seen = await readBlobJson(`wa-conversions/${dedupeKey}.json`);
      if (seen) {
        return res.status(200).json({ ok: true, status: "duplicate_skipped" });
      }
    }

    const record = ref
      ? await readBlobJson<RefRecord>(`wa-refs/${ref}.json`)
      : null;

    const matched = !!record?.ga_client_id;
    const clientId = record?.ga_client_id || randomClientId();

    const sent = await sendGa4Conversion(clientId, {
      currency: "THB",
      value: 1,
      ref: ref || "",
      lifecycle_stage: stage,
      attribution_status: matched ? "matched" : "unmatched",
      source: "respondio_webhook",
      gclid: record?.gclid || "",
      utm_source: record?.utm_source || "",
      utm_medium: record?.utm_medium || "",
      utm_campaign: record?.utm_campaign || "",
      click_page: record?.p || "",
      click_cta: record?.src || "",
    });

    if (sent && dedupeKey) {
      await put(
        `wa-conversions/${dedupeKey}.json`,
        JSON.stringify({
          ref,
          phone,
          contactId,
          stage,
          matched,
          sent_at: new Date().toISOString(),
        }),
        {
          access: "private",
          addRandomSuffix: false,
          allowOverwrite: true,
          contentType: "application/json",
        },
      );
    }

    console.log(
      `whatsapp_conversion ${sent ? "sent" : "FAILED"} ref=${ref} matched=${matched} contact=${contactId}`,
    );
    return res
      .status(sent ? 200 : 502)
      .json({ ok: sent, ref, matched, status: sent ? "sent" : "ga4_send_failed" });
  } catch (e) {
    console.error("respondio-webhook error:", e);
    return res.status(500).json({ error: "internal" });
  }
}
