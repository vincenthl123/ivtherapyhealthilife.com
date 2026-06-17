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
 * Two payload types (configure in the respond.io HTTP Request steps):
 *
 * 1. Ref capture — Workflow "Conversation Opened": maps the contact to the
 *    HL-XXXX ref found in their first WhatsApp message.
 *   {
 *     "type":      "ref_capture",
 *     "contactId": "{{$contact.id}}",
 *     "phone":     "{{$contact.phone}}",
 *     "message":   "{{$conversation.first_incoming_message}}"
 *   }
 *
 * 2. Booking — Workflow "Lifecycle Updated → Consultation Booked": sends the
 *    whatsapp_conversion to GA4 using the stored contact → ref → attribution.
 *   {
 *     "type":      "booking",                       // or omit (default)
 *     "contactId": "{{$contact.id}}",
 *     "phone":     "{{$contact.phone}}",
 *     "stage":     "Consultation Booked"
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

const REF_RE = /HL-[A-Z2-9]{4}/i;

/**
 * Per-site GA4 routing. All HealthiLife sites POST their click refs to this
 * central endpoint; the conversion must be sent to the GA4 property that the
 * click's client_id belongs to (a client_id is meaningless in another
 * property). Site comes from the ref record's `s` field (set at click time).
 */
const SITE_GA4: Record<string, { measurementId: string; secretEnv: string }> = {
  "ivtherapyhealthilife.com": {
    measurementId: process.env.GA4_MEASUREMENT_ID || "G-K9R2HXK3QT",
    secretEnv: "GA4_API_SECRET",
  },
  "skin-healthi-life.com": {
    measurementId: "G-5VMVWT3Y5E",
    secretEnv: "GA4_API_SECRET_SKIN",
  },
  "healthcheckup-healthilife.com": {
    measurementId: "G-C7JWK2LM04",
    secretEnv: "GA4_API_SECRET_CHECKUP",
  },
  "stemcellhealthilife.com": {
    measurementId: "G-RLYCLWD5Q6",
    secretEnv: "GA4_API_SECRET_STEMCELL",
  },
  "certificate-healthi-life.com": {
    measurementId: "G-3YFQC228M0",
    secretEnv: "GA4_API_SECRET_CERTIFICATE",
  },
  "healthi-life.com": {
    measurementId: "G-4XR12SQW4T",
    secretEnv: "GA4_API_SECRET_HEALTHILIFE",
  },
  "information-bangkok.com": {
    measurementId: "G-1QJF72V7RC",
    secretEnv: "GA4_API_SECRET_INFOBANGKOK",
  },
};
const DEFAULT_SITE = "ivtherapyhealthilife.com";

const siteConfig = (site?: string) => {
  const key = (site || "").toLowerCase().replace(/^www\./, "");
  return SITE_GA4[key] || SITE_GA4[DEFAULT_SITE];
};

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
  s?: string; // site domain at click time
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
  config: { measurementId: string; secretEnv: string },
): Promise<boolean> => {
  const apiSecret = process.env[config.secretEnv];
  if (!apiSecret) {
    console.error(`${config.secretEnv} not configured (site routing)`);
    return false;
  }
  const url =
    "https://www.google-analytics.com/mp/collect" +
    `?measurement_id=${encodeURIComponent(config.measurementId)}` +
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
    const contactKey = contactId || phone.replace(/\D/g, "");

    // --- Type 1: ref capture on conversation open -------------------------
    if (body.type === "ref_capture") {
      const capturedRef = extractRef(body.message, body.ref);
      if (!capturedRef || !contactKey) {
        // No ref in the first message (organic contact) — nothing to store.
        return res.status(200).json({ ok: true, status: "no_ref_found" });
      }
      await put(
        `wa-contacts/${contactKey}.json`,
        JSON.stringify({
          ref: capturedRef,
          contactId,
          phone,
          captured_at: new Date().toISOString(),
        }),
        {
          access: "private",
          addRandomSuffix: false,
          allowOverwrite: true,
          contentType: "application/json",
        },
      );
      console.log(`ref_capture stored ${capturedRef} for contact=${contactKey}`);
      return res
        .status(200)
        .json({ ok: true, status: "ref_stored", ref: capturedRef });
    }

    // --- Type 2 (default): booking conversion ------------------------------
    // Resolve the ref: explicit field/message, else the mapping stored at
    // conversation open.
    let ref = extractRef(body.ref, body.message);
    if (!ref && contactKey) {
      const mapping = await readBlobJson<{ ref?: string }>(
        `wa-contacts/${contactKey}.json`,
      );
      ref = mapping?.ref || null;
    }

    // Idempotency: respond.io can re-fire if the lifecycle stage bounces.
    // One conversion per contact (falls back to ref).
    const dedupeKey = contactKey || ref;
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
    const site = record?.s || DEFAULT_SITE;
    const config = siteConfig(site);

    // Site known but its GA4 property isn't configured yet (e.g. awaiting
    // access). Acknowledge without sending and without writing the dedupe
    // marker, so the booking is not lost to a half-configured property.
    if (!config.measurementId) {
      console.log(
        `whatsapp_conversion HELD site=${site} (GA4 pending) ref=${ref} contact=${contactId}`,
      );
      return res
        .status(200)
        .json({ ok: true, ref, matched, status: "site_ga4_pending" });
    }

    const sent = await sendGa4Conversion(
      clientId,
      {
        currency: "THB",
        value: 1,
        ref: ref || "",
        site,
        lifecycle_stage: stage,
        attribution_status: matched ? "matched" : "unmatched",
        source: "respondio_webhook",
        gclid: record?.gclid || "",
        utm_source: record?.utm_source || "",
        utm_medium: record?.utm_medium || "",
        utm_campaign: record?.utm_campaign || "",
        click_page: record?.p || "",
        click_cta: record?.src || "",
      },
      config,
    );

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
      `whatsapp_conversion ${sent ? "sent" : "FAILED"} site=${site} (${config.measurementId}) ref=${ref} matched=${matched} contact=${contactId}`,
    );
    return res
      .status(sent ? 200 : 502)
      .json({ ok: sent, ref, matched, status: sent ? "sent" : "ga4_send_failed" });
  } catch (e) {
    console.error("respondio-webhook error:", e);
    return res.status(500).json({ error: "internal" });
  }
}
