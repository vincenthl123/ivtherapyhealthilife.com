/**
 * WhatsApp URL builder.
 *
 * Returns a wa.me link with a clean, customer-friendly pre-filled message.
 * Supports named "sources" so each entry point on the site sends a tailored
 * opening message that helps Anna route the conversation faster.
 *
 * NOTE: A global click interceptor (src/lib/wa-interceptor.ts) currently
 * rewrites wa.me clicks to "Hi 👋 #iv" for ref-tracking. To preserve the
 * source-specific message, anchors/buttons that use a non-default source
 * should add `data-wa-skip="1"` so the interceptor leaves them alone.
 */

import { getAttribution, getSessionId, getGaClientId, getGaClientIdStatus } from "./attribution";

const WA_PHONE = "66919991744";
const SITE_DOMAIN = "ivtherapyhealthilife.com";

/** Format a Date as 'YYYY-MM-DDTHH:mm:ss' in GMT+7 (Bangkok). */
const formatBangkokTimestamp = (date: Date): string => {
  const shifted = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  return `${shifted.toISOString().slice(0, 19)}+07:00`;
};

export type WaSource =
  | "default"
  | "hero"
  | "protocol"
  | "visit"
  | "widget"
  | "consultation"
  | "popup";

/** Human-readable "interest" label per entry point (fills the [page-name] slot). */
const SOURCE_INTEREST: Record<Exclude<WaSource, "protocol">, string> = {
  default: "your IV therapy services",
  hero: "your IV therapy services",
  visit: "booking a consultation",
  widget: "your IV protocols",
  consultation: "booking a consultation",
  popup: "your IV protocols",
};

const interestFor = (source: WaSource, protocolName?: string): string => {
  if (source === "protocol") {
    return (protocolName || "your IV protocols").trim();
  }
  return SOURCE_INTEREST[source];
};

export type BuildWaOptions = {
  source: WaSource;
  protocolName?: string;
  /** Free-form message typed by the user in the popup. Appended after prefix. */
  userMessage?: string;
  /** Optional extras stitched into the message for tracking visibility. */
  extras?: { page?: string; sourceLabel?: string };
};

/**
 * Build a wa.me URL.
 *
 * Backwards-compatible: existing call sites pass a free-form string label
 * (ignored) or a structured options object.
 *
 * Final text format when userMessage is provided:
 *   "<prefix> | Source: <label> | Page: <path> | Message: <userMessage>"
 *
 * UTM/GCLID/page tracking on the current URL is preserved by the global
 * interceptor (wa-interceptor.ts) which POSTs them to the edge function.
 * For popup submissions we bypass the interceptor (data-wa-skip) and instead
 * embed Source/Page directly in the WhatsApp text so context is never lost.
 */
type WaLinkData = {
  url: string;
  ref: string;
  payload: Record<string, unknown>;
};

const normalizeOptions = (arg?: string | BuildWaOptions): BuildWaOptions =>
  typeof arg === "object" && arg !== null ? arg : { source: "default" };

const buildWaData = (arg?: string | BuildWaOptions): WaLinkData => {
  const opts: BuildWaOptions =
    normalizeOptions(arg);

  const interest = interestFor(opts.source, opts.protocolName);
  const path =
    opts.extras?.page ||
    (typeof window !== "undefined" ? window.location.pathname : "");
  const cta = opts.extras?.sourceLabel || opts.source;
  const attr = typeof window !== "undefined" ? getAttribution() : {};
  const sid = typeof window !== "undefined" ? getSessionId() : "";
  const gclid = attr.gclid || "";
  const ts = formatBangkokTimestamp(new Date());

  // Customer-visible portion: friendly greeting + their typed message only.
  const greeting = `Hello HealthiLife — I'm interested in ${interest}.`;
  const userMsg = (opts.userMessage || "").trim();

  // Short opaque ref code (looks like a support ticket number).
  // Full attribution is cached locally and sent to Make only on real WA clicks.
  const ref = makeShortRef(sid);
  const payload = makeRefPayload(opts, path, cta, sid, attr, ts);
  rememberRefMapping(ref, payload);

  const visibleLines = [greeting];
  if (userMsg) visibleLines.push("", userMsg);
  visibleLines.push("", `Ref: ${ref}`);

  const text = visibleLines.join("\n");
  return {
    url: `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`,
    ref,
    payload,
  };
};

export const buildWaUrl = (arg?: string | BuildWaOptions): string =>
  buildWaData(arg).url;

/** Generate a short, ticket-like ref code: HL-XXXX (4 base32 chars). */
const makeShortRef = (seed: string): string => {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I
  let n = Date.now() ^ 0;
  for (let i = 0; i < seed.length; i++) n = (n * 31 + seed.charCodeAt(i)) | 0;
  n ^= Math.floor(Math.random() * 0xffffffff);
  let out = "";
  for (let i = 0; i < 4; i++) {
    out += alphabet[Math.abs(n) % alphabet.length];
    n = Math.floor(n / alphabet.length) || Math.floor(Math.random() * 0xffff);
  }
  return `HL-${out}`;
};

const REF_CACHE_KEY = "hl_wa_ref_payloads";
const loggedRefs = new Set<string>();

const makeRefPayload = (
  opts: BuildWaOptions,
  path: string,
  cta: string,
  sid: string,
  attr: ReturnType<typeof getAttribution>,
  ts: string,
): Record<string, unknown> => ({
  s: SITE_DOMAIN,
  p: path,
  c: cta,
  src: opts.source,
  sid,
  ga_client_id: getGaClientId(),
  ga_client_id_status: getGaClientIdStatus(),
  gclid: attr.gclid || "",
  gbraid: attr.gbraid || "",
  wbraid: attr.wbraid || "",
  gad_source: attr.gad_source || "",
  gad_campaignid: attr.gad_campaignid || "",
  utm_source: attr.utm_source || "",
  utm_medium: attr.utm_medium || "",
  utm_campaign: attr.utm_campaign || "",
  utm_term: attr.utm_term || "",
  utm_content: attr.utm_content || "",
  fbclid: attr.fbclid || "",
  ts,
});

const rememberRefMapping = (ref: string, payload: Record<string, unknown>): void => {
  if (typeof window === "undefined") return;
  try {
    const cached = JSON.parse(sessionStorage.getItem(REF_CACHE_KEY) || "{}") as Record<string, unknown>;
    cached[ref] = payload;
    sessionStorage.setItem(REF_CACHE_KEY, JSON.stringify(cached));
  } catch {
    /* ignore */
  }
};

/**
 * Fire-and-forget POST so the ref → attribution mapping is logged in Make.
 * Make Custom Webhook receives the JSON; downstream modules (Sheets, CRM,
 * email, etc.) handle storage. No backend / edge function required.
 */
const MAKE_WEBHOOK_URL =
  "https://hook.eu2.make.com/4n31im2g0pua1xa2qls4u9ith13vkhf9";

/**
 * Poll for the _ga cookie up to `maxMs` (50ms intervals).
 * Returns the client_id once the cookie appears, or "" on timeout.
 */
const waitForGaClientId = (maxMs = 800): Promise<string> =>
  new Promise((resolve) => {
    const existing = getGaClientId();
    if (existing) return resolve(existing);
    const start = Date.now();
    const tick = () => {
      const v = getGaClientId();
      if (v) return resolve(v);
      if (Date.now() - start >= maxMs) return resolve("");
      setTimeout(tick, 50);
    };
    setTimeout(tick, 50);
  });

const logRefMapping = async (
  ref: string,
  payload: Record<string, unknown>,
): Promise<void> => {
  if (loggedRefs.has(ref)) return;
  loggedRefs.add(ref);

  // If the _ga cookie wasn't ready at click time, briefly wait for it so
  // Make receives the GA4 client_id on the very first click of a session.
  const finalPayload = { ...payload };
  if (!finalPayload.ga_client_id) {
    const late = await waitForGaClientId(800);
    if (late) {
      finalPayload.ga_client_id = late;
      finalPayload.ga_client_id_status = "ok_delayed";
    }
  }

  try {
    // Use text/plain to avoid CORS preflight; Make parses the JSON body fine.
    await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({ ref, service: "iv_therapy", ...finalPayload }),
      keepalive: true,
    });
  } catch {
    /* ignore */
  }
};

export const logWaUrlRef = (url: string | URL | undefined | null): void => {
  if (!url || typeof window === "undefined") return;
  const href = String(url);
  if (!href.includes(`wa.me/${WA_PHONE}`)) return;
  const text = new URL(href).searchParams.get("text") || "";
  const ref = decodeURIComponent(text).match(/Ref:\s*(HL-[A-Z2-9]{4})/)?.[1];
  if (!ref) return;

  let payload: Record<string, unknown> = { s: SITE_DOMAIN, p: location.pathname, c: "whatsapp", ts: new Date().toISOString() };
  try {
    const cached = JSON.parse(sessionStorage.getItem(REF_CACHE_KEY) || "{}") as Record<string, Record<string, unknown>>;
    payload = cached[ref] || payload;
  } catch {
    /* ignore */
  }
  void logRefMapping(ref, payload);
};

/**
 * Build the URL and open WhatsApp in a new tab. Preserves the user gesture.
 * Fires the GA4 'whatsapp_click' + 'generate_lead' conversion events with
 * full funnel attribution (gclid/utm) before opening.
 */
export const trackAndOpenWhatsApp = (opts: BuildWaOptions): string => {
  const url = buildWaUrl(opts);
  if (typeof window !== "undefined") {
    // Fire conversion tracking (non-blocking).
    void import("./tracking").then(({ trackWhatsAppClick }) => {
      trackWhatsAppClick({
        source: opts.source,
        page: opts.extras?.page,
        hasMessage: !!opts.userMessage?.trim(),
      });
    });
    logWaUrlRef(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return url;
};
