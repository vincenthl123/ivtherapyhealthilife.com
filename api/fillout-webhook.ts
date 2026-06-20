/**
 * POST /api/fillout-webhook?secret=<FILLOUT_WEBHOOK_SECRET|RESPONDIO_WEBHOOK_SECRET>
 *
 * Called by a Fillout form's Webhook integration when a booking is submitted.
 * Sends a `booking_confirmed` event to the correct per-site GA4 property via the
 * Measurement Protocol, attributed to the original ad click.
 *
 * Attribution: the booking buttons open Fillout with URL parameters carrying the
 * click-time identity — `cid` (GA4 client_id), `gclid`, `site`. Fillout returns
 * these in `submission.urlParameters`. We send the conversion on that client_id
 * so it attaches to the original ad session (cross-domain safe). If a WhatsApp
 * ref `HL-XXXX` is present instead, we fall back to the attribution stored by
 * /api/wa-click.
 *
 * Auth: shared secret via ?secret= query param or X-Webhook-Secret header.
 *
 * Required env: GA4_API_SECRET (+ per-site GA4_API_SECRET_* ), and one of
 *   FILLOUT_WEBHOOK_SECRET or RESPONDIO_WEBHOOK_SECRET.
 */
import { get, put } from "@vercel/blob";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const REF_RE = /HL-[A-Z2-9]{4}/i;

/**
 * Per-site GA4 routing — must stay in sync with respondio-webhook.ts.
 * UNIFIED 2026-06-19 (Vincent): all non-stem-cell sites consolidate into the
 * main "Healthi Life Group" property (G-4XR12SQW4T) so bookings attribute in one
 * place and import as a single Google Ads conversion (Healthi-Life_THB). Per-site
 * reporting via the `site` param / hostname segmentation. Stem cell stays
 * ISOLATED in its own property → StemCell Ads account only (guardrail).
 */
const GROUP = { measurementId: "G-K9R2HXK3QT", secretEnv: "GA4_API_SECRET" };
const SITE_GA4: Record<string, { measurementId: string; secretEnv: string }> = {
  "healthi-life.com": GROUP,
  "ivtherapyhealthilife.com": GROUP,
  "healthcheckup-healthilife.com": GROUP,
  "certificate-healthi-life.com": GROUP,
  "skin-healthi-life.com": GROUP,
  "information-bangkok.com": GROUP,
  // GUARDRAIL: stem cell isolated → StemCell Ads account only. Never unify.
  "stemcellhealthilife.com": { measurementId: "G-RLYCLWD5Q6", secretEnv: "GA4_API_SECRET_STEMCELL" },
};
const DEFAULT_SITE = "healthi-life.com";

const siteConfig = (site?: string) => {
  const key = (site || "").toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  return SITE_GA4[key] || SITE_GA4[DEFAULT_SITE];
};

type RefRecord = { ga_client_id?: string; gclid?: string; s?: string; p?: string; src?: string; utm_source?: string; utm_medium?: string; utm_campaign?: string };

const readBlobJson = async <T>(pathname: string): Promise<T | null> => {
  try {
    const result = await get(pathname, { access: "private", useCache: false });
    if (!result?.stream) return null;
    const text = await new Response(result.stream as ReadableStream).text();
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
};

const randomClientId = (): string =>
  `${Math.floor(Math.random() * 9_000_000_000) + 1_000_000_000}.${Math.floor(Date.now() / 1000)}`;

/**
 * Flatten a Fillout webhook payload into a lowercase key→value bag. Reads
 * submission.urlParameters (hidden attribution fields) and submission.questions
 * (email/phone/etc.), tolerant to Fillout's shape variations.
 */
const flattenFillout = (body: Record<string, any>): Record<string, string> => {
  const bag: Record<string, string> = {};
  const sub = body.submission || body;
  const push = (name: unknown, value: unknown) => {
    if (typeof name !== "string") return;
    const v = value == null ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);
    bag[name.trim().toLowerCase()] = v;
  };
  for (const p of (sub.urlParameters || sub.urlParams || []) as any[]) push(p?.name ?? p?.id, p?.value);
  for (const q of (sub.questions || []) as any[]) push(q?.name ?? q?.id, q?.value);
  // also accept flat top-level fields (custom webhook mappings)
  for (const [k, val] of Object.entries(body)) if (typeof val !== "object") push(k, val);
  return bag;
};

const firstMatch = (bag: Record<string, string>, keys: string[]): string => {
  for (const k of keys) { const hit = bag[k]; if (hit) return hit; }
  return "";
};

const sendGa4 = async (clientId: string, params: Record<string, unknown>, config: { measurementId: string; secretEnv: string }): Promise<boolean> => {
  const apiSecret = process.env[config.secretEnv];
  if (!apiSecret) { console.error(`${config.secretEnv} not configured`); return false; }
  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(config.measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: clientId, non_personalized_ads: false, events: [{ name: "booking_confirmed", params }] }),
  });
  return r.ok;
};

/**
 * Fire a Klaviyo event so a Klaviyo Flow can send the branded HL confirmation
 * email (from contact@healthi-life.com — Klaviyo's default sender). Gated behind
 * KLAVIYO_PRIVATE_KEY: a no-op (returns false) when the key or the respondent
 * email is missing, so it never blocks or breaks the GA4 conversion path.
 * The Flow is triggered by the metric name "HL Booking Confirmed".
 */
const sendKlaviyoBookingEvent = async (params: {
  email: string; name?: string; service?: string; bookingDate?: string;
  bookingTime?: string; site?: string; ref?: string;
}): Promise<boolean> => {
  const key = process.env.KLAVIYO_PRIVATE_KEY;
  if (!key || !params.email) return false;
  try {
    const r = await fetch("https://a.klaviyo.com/api/events/", {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${key}`,
        "Content-Type": "application/json",
        accept: "application/json",
        revision: "2024-10-15",
      },
      body: JSON.stringify({
        data: {
          type: "event",
          attributes: {
            metric: { data: { type: "metric", attributes: { name: "HL Booking Confirmed" } } },
            profile: {
              data: {
                type: "profile",
                attributes: { email: params.email, ...(params.name ? { first_name: params.name } : {}) },
              },
            },
            properties: {
              name: params.name || "",
              service: params.service || "",
              booking_date: params.bookingDate || "",
              booking_time: params.bookingTime || "",
              site: params.site || "",
              ref: params.ref || "",
              source: "fillout_webhook",
            },
          },
        },
      }),
    });
    return r.ok;
  } catch (e) {
    console.error("klaviyo event error:", e);
    return false;
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  const secret = process.env.FILLOUT_WEBHOOK_SECRET || process.env.RESPONDIO_WEBHOOK_SECRET;
  const provided = (req.query.secret as string) || (req.headers["x-webhook-secret"] as string);
  if (!secret || provided !== secret) return res.status(401).json({ error: "unauthorized" });

  try {
    const body: Record<string, any> = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
    const bag = flattenFillout(body);

    const submissionId = firstMatch(bag, ["submissionid", "submission_id", "id"]) || (body.submission?.submissionId ?? "");
    const cid = firstMatch(bag, ["cid", "client_id", "ga_client_id"]);
    const gclidRaw = firstMatch(bag, ["gclid", "gbraid", "wbraid"]);
    const refRaw = firstMatch(bag, ["ref", "hl_ref"]) || "";
    const ref = (refRaw.match(REF_RE) || [])[0]?.toUpperCase() || "";
    let site = firstMatch(bag, ["site", "domain"]) || "";
    const ctx = firstMatch(bag, ["ctx", "cta", "ctacontext", "source"]);
    const service = firstMatch(bag, ["service", "interest", "offer", "treatment"]);
    // Respondent identity + booked slot for the branded Klaviyo confirmation email.
    const email = firstMatch(bag, ["email", "emailaddress", "email_address", "e-mail"]);
    const name = firstMatch(bag, ["name", "fullname", "full_name", "yourname", "your_name"]);
    const bookingDate = firstMatch(bag, ["bookingdate", "booking date", "date", "appointmentdate", "scheduleddate"]);
    const bookingTime = firstMatch(bag, ["bookingtime", "booking time", "time", "appointmenttime", "scheduledtime", "slot"]);

    // Idempotency: Fillout retries failed deliveries.
    if (submissionId) {
      const seen = await readBlobJson(`wa-bookings/${submissionId}.json`);
      if (seen) return res.status(200).json({ ok: true, status: "duplicate_skipped" });
    }

    // Resolve identity: prefer the live client_id passed from the site. Else use
    // the click attribution stored under the WhatsApp ref. Else a fallback id.
    let clientId = cid;
    let gclid = gclidRaw;
    if ((!clientId || !site) && ref) {
      const rec = await readBlobJson<RefRecord>(`wa-refs/${ref}.json`);
      if (rec) { clientId = clientId || rec.ga_client_id || ""; gclid = gclid || rec.gclid || ""; site = site || rec.s || ""; }
    }
    const matched = !!clientId;
    if (!clientId) clientId = randomClientId();

    const config = siteConfig(site);
    const sent = await sendGa4(clientId, {
      currency: "THB",
      value: 1,
      source: "fillout_webhook",
      booking_form: body.formName || body.submission?.formName || "",
      site: site || DEFAULT_SITE,
      ref,
      gclid: gclid || "",
      cta_context: ctx,
      service,
      attribution_status: matched ? "matched" : "unmatched",
    }, config);

    // Branded HL confirmation email via Klaviyo (no-op unless KLAVIYO_PRIVATE_KEY
    // is set). Independent of the GA4 path — never blocks the conversion.
    const klaviyo = await sendKlaviyoBookingEvent({ email, name, service, bookingDate, bookingTime, site: site || DEFAULT_SITE, ref });

    if (sent && submissionId) {
      await put(`wa-bookings/${submissionId}.json`, JSON.stringify({ submissionId, site, ref, matched, gclid, klaviyo, sent_at: new Date().toISOString() }), {
        access: "private", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json",
      });
    }

    console.log(`booking_confirmed ${sent ? "sent" : "FAILED"} site=${site || DEFAULT_SITE} (${config.measurementId}) ref=${ref} matched=${matched} klaviyo=${klaviyo} sub=${submissionId}`);
    return res.status(sent ? 200 : 502).json({ ok: sent, matched, site: site || DEFAULT_SITE, status: sent ? "sent" : "ga4_send_failed" });
  } catch (e) {
    console.error("fillout-webhook error:", e);
    return res.status(500).json({ error: "internal" });
  }
}
