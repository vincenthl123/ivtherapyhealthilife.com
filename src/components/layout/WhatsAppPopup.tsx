/**
 * WhatsAppPopup — branded floating WhatsApp popup for Healthi Life.
 *
 * The actual implementation lives in `src/components/WhatsAppWidget.tsx`
 * (kept in place to preserve all existing import paths, lazy-loading and
 * SSR/prerender hooks). This file is a thin re-export so consumers can
 * import from the conventional `layout/` location.
 *
 * Behaviour:
 *  - Floating gold/cream launcher (bottom-right, all sections).
 *  - Click opens a branded popup with welcome bubble + textarea.
 *  - "Open WhatsApp" submits the typed message (or default greeting if
 *    empty) and opens wa.me — native app on mobile, WhatsApp Web on desktop.
 *  - Tracking source/page are appended to the WhatsApp text so context
 *    survives the redirect even when the global interceptor is bypassed.
 */
export { default } from "@/components/WhatsAppWidget";
export { default as WhatsAppPopup } from "@/components/WhatsAppWidget";
