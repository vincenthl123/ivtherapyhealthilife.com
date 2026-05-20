/**
 * Funnel attribution capture.
 *
 * On first landing, captures gclid / fbclid / utm_* / referrer / landing page
 * and stores them in localStorage for 90 days (Google Ads conversion window).
 * These values are then attached to every WhatsApp click event sent to GA4,
 * enabling Enhanced Conversions and offline conversion attribution via the
 * GA4 ↔ Google Ads link.
 */

const STORAGE_KEY = "hl_attribution_v1";
const TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

const KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gad_source",
  "gad_campaignid",
] as const;

export type Attribution = {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gad_source?: string;
  gad_campaignid?: string;
  landing_page?: string;
  referrer?: string;
  captured_at?: number;
};

const safeStorage = (): Storage | null => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export const captureAttribution = (): Attribution => {
  if (typeof window === "undefined") return {};
  const storage = safeStorage();
  const now = Date.now();

  // Read existing
  let existing: Attribution = {};
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Attribution;
      if (parsed.captured_at && now - parsed.captured_at < TTL_MS) {
        existing = parsed;
      }
    }
  } catch {
    /* ignore */
  }

  // Merge new params (only overwrite on fresh click ids)
  const params = new URLSearchParams(window.location.search);
  const incoming: Attribution = {};
  let hasNew = false;
  for (const k of KEYS) {
    const v = params.get(k);
    if (v) {
      incoming[k] = v;
      hasNew = true;
    }
  }

  if (hasNew || !existing.captured_at) {
    const merged: Attribution = {
      ...existing,
      ...incoming,
      landing_page: existing.landing_page || window.location.pathname,
      referrer: existing.referrer || document.referrer || "",
      captured_at: hasNew ? now : existing.captured_at || now,
    };
    try {
      storage?.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
      /* ignore */
    }
    return merged;
  }

  return existing;
};

const SID_KEY = "hl_sid";

/** Get or create a stable session id stored in localStorage. */
export const getSessionId = (): string => {
  if (typeof window === "undefined") return "";
  const storage = safeStorage();
  try {
    const existing = storage?.getItem(SID_KEY);
    if (existing) return existing;
    const sid =
      "s_" +
      Date.now().toString(36) +
      "_" +
      Math.random().toString(36).slice(2, 8);
    storage?.setItem(SID_KEY, sid);
    return sid;
  } catch {
    return "";
  }
};

/**
 * Read the GA4 `client_id` from the `_ga` cookie.
 * Format: GA1.1.<client_id>  → client_id = "1234567890.1234567890"
 * Returns "" if GA hasn't set the cookie yet.
 */
export const getGaClientId = (): string => {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(/(?:^|;\s*)_ga=GA\d\.\d\.(\d+\.\d+)/);
  return m?.[1] ?? "";
};

export type GaClientIdStatus = "ok" | "cookie_missing" | "no_document";

export const getGaClientIdStatus = (): GaClientIdStatus => {
  if (typeof document === "undefined") return "no_document";
  return getGaClientId() ? "ok" : "cookie_missing";
};

/**
 * Async variant using gtag's `get` API. Falls back to the `_ga` cookie.
 * Resolves within ~300ms even if gtag is slow/blocked.
 */
export const getGaClientIdAsync = (measurementId?: string): Promise<string> =>
  new Promise((resolve) => {
    const fallback = () => resolve(getGaClientId());
    if (typeof window === "undefined") return resolve("");
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    const id = measurementId || "G-K9R2HXK3QT";
    if (typeof w.gtag !== "function") return fallback();
    const t = window.setTimeout(fallback, 300);
    try {
      w.gtag("get", id, "client_id", (cid: string) => {
        window.clearTimeout(t);
        resolve(cid || getGaClientId());
      });
    } catch {
      window.clearTimeout(t);
      fallback();
    }
  });

export const getAttribution = (): Attribution => {
  if (typeof window === "undefined") return {};
  const storage = safeStorage();
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Attribution;
    if (parsed.captured_at && Date.now() - parsed.captured_at < TTL_MS) {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return {};
};

/** Compact suffix for the WhatsApp message body (so the agent sees the source). */
export const attributionTag = (attr: Attribution): string => {
  const tag: string[] = [];
  if (attr.gclid) tag.push(`g:${attr.gclid.slice(-8)}`);
  if (attr.fbclid) tag.push(`f:${attr.fbclid.slice(-8)}`);
  if (attr.utm_source) tag.push(`s:${attr.utm_source}`);
  if (attr.utm_campaign) tag.push(`c:${attr.utm_campaign}`);
  return tag.length ? `#${tag.join("|")}` : "";
};
