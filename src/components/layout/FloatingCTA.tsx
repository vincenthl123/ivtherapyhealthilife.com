/**
 * FloatingCTA — sticky bottom-right WhatsApp launcher.
 *
 * In this codebase the floating CTA and the popup are part of the same
 * component (`WhatsAppWidget`). This file re-exports it under the expected
 * `layout/FloatingCTA` path so future refactors can split them without
 * breaking imports.
 */
export { default } from "@/components/WhatsAppWidget";
export { default as FloatingCTA } from "@/components/WhatsAppWidget";
