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

import { getAttribution, getSessionId } from "./attribution";

const WA_PHONE = "66919991744";
const SITE_DOMAIN = "ivtherapyhealthilife.com";

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
export const buildWaUrl = (
  arg?: string | BuildWaOptions,
): string => {
  const opts: BuildWaOptions =
    typeof arg === "object" && arg !== null
      ? arg
      : { source: "default" };

  const interest = interestFor(opts.source, opts.protocolName);
  const path =
    opts.extras?.page ||
    (typeof window !== "undefined" ? window.location.pathname : "");
  const cta = opts.extras?.sourceLabel || opts.source;
  const attr = typeof window !== "undefined" ? getAttribution() : {};
  const sid = typeof window !== "undefined" ? getSessionId() : "";
  const gclid = attr.gclid || "";
  const ts = new Date().toISOString();

  // Customer-visible portion: friendly greeting + their typed message only.
  const greeting = `Hello HealthiLife — I'm interested in ${interest}.`;
  const userMsg = (opts.userMessage || "").trim();

  const visibleLines = [greeting];
  if (userMsg) visibleLines.push("", userMsg);

  // Hidden tracking payload: compact, base64-encoded JSON wrapped in the
  // [#iv:...] marker so our parser can extract it but it reads as an
  // opaque reference code to the customer.
  const payload = {
    s: SITE_DOMAIN,
    p: path,
    c: cta,
    src: opts.source,
    sid,
    gclid,
    ts,
  };
  let token = "";
  try {
    const json = JSON.stringify(payload);
    token =
      typeof window !== "undefined" && typeof window.btoa === "function"
        ? window
            .btoa(unescape(encodeURIComponent(json)))
            .replace(/=+$/, "")
        : "";
  } catch {
    /* ignore */
  }

  // Append after blank lines so it sits visually "below" the message and
  // looks like a reference code rather than metadata.
  const text =
    visibleLines.join("\n") +
    (token ? `\n\n\nRef: [#iv:${token}]` : "");
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
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
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return url;
};
