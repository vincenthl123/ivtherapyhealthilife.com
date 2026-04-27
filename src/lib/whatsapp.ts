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

const WA_PHONE = "66919991744";

export type WaSource =
  | "default"
  | "hero"
  | "protocol"
  | "visit"
  | "widget"
  | "consultation"
  | "popup";

const SOURCE_MESSAGES: Record<Exclude<WaSource, "protocol">, string> = {
  default: "Hi 👋 #iv",
  hero: "Hi Anna, I'd like to learn more about IV therapy at Healthi Life",
  visit: "Hi Anna, I'd like to book a consultation",
  widget: "Hi Anna, I have a question about your IV protocols",
  consultation: "Hi Anna, I'd like to book a consultation",
  popup:
    "Hi 👋 Welcome to Healthi Life! I'd like more info on your IV protocols.",
};

const messageFor = (source: WaSource, protocolName?: string): string => {
  if (source === "protocol") {
    const name = (protocolName || "your IV protocols").trim();
    return `Hi Anna, I'm interested in ${name}`;
  }
  return SOURCE_MESSAGES[source];
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

  const prefix = messageFor(opts.source, opts.protocolName);
  const parts: string[] = [prefix];

  if (opts.extras?.sourceLabel) {
    parts.push(`Source: ${opts.extras.sourceLabel}`);
  }
  if (opts.extras?.page) {
    parts.push(`Page: ${opts.extras.page}`);
  }
  const trimmed = (opts.userMessage || "").trim();
  if (trimmed) {
    parts.push(`Message: ${trimmed}`);
  }

  const text = parts.join(" | ");
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
};

/**
 * Build the URL and open WhatsApp in a new tab. Preserves the user gesture.
 * Returns the URL that was opened (useful for logging/tests).
 */
export const trackAndOpenWhatsApp = (opts: BuildWaOptions): string => {
  const url = buildWaUrl(opts);
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return url;
};
