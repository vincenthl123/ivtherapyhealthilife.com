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
  | "consultation";

const SOURCE_MESSAGES: Record<Exclude<WaSource, "protocol">, string> = {
  default: "Hi 👋 #iv",
  hero: "Hi Anna, I'd like to learn more about IV therapy at Healthi Life",
  visit: "Hi Anna, I'd like to book a consultation",
  widget: "Hi Anna, I have a question about your IV protocols",
  consultation: "Hi Anna, I'd like to book a consultation",
};

const messageFor = (source: WaSource, protocolName?: string): string => {
  if (source === "protocol") {
    const name = (protocolName || "your IV protocols").trim();
    return `Hi Anna, I'm interested in ${name}`;
  }
  return SOURCE_MESSAGES[source];
};

/**
 * Build a wa.me URL.
 *
 * Backwards-compatible: existing call sites pass a free-form string label
 * (e.g. "IV Therapy Enquiry") which is ignored and routed through the
 * default message + global interceptor for ref tracking.
 *
 * New call sites can pass a structured options object to opt into a
 * source-specific pre-filled message.
 */
export const buildWaUrl = (
  arg?: string | { source: WaSource; protocolName?: string },
): string => {
  const source: WaSource =
    typeof arg === "object" && arg !== null ? arg.source : "default";
  const protocolName =
    typeof arg === "object" && arg !== null ? arg.protocolName : undefined;

  const text = messageFor(source, protocolName);
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
};
