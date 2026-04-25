/**
 * WhatsApp URL builder.
 * Returns a clean, customer-friendly pre-filled message with NO tracking metadata.
 * The `prefix` argument is intentionally ignored — kept only to preserve the
 * existing call signature across the codebase. Tracking will be reintroduced
 * later via a separate Supabase-based ref ID system.
 */
export const buildWaUrl = (_prefix?: string): string => {
  return 'https://wa.me/66919991744?text=' + encodeURIComponent('Hi 👋 #iv');
};
