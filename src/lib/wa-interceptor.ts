/**
 * Global WhatsApp click interceptor.
 *
 * Installs a document-level capture-phase click listener AND wraps window.open
 * so every click that resolves to wa.me/66919991744 is intercepted. We POST
 * tracking params (UTM/gclid/fbclid) to a Supabase edge function to mint a
 * short ref ID, then open WhatsApp with a clean message that contains only
 * a tiny `#iv-<tail>` tag (or `#iv` if no ref was minted).
 *
 * No existing component is modified — wiring is done via App.tsx useEffect.
 */

const WA_PHONE = "66919991744";
const WA_MATCH = `wa.me/${WA_PHONE}`;
const TIMEOUT_MS = 2500;

const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

type TrackingPayload = {
  service: "iv_therapy";
  page: string;
  referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
};

const collectTracking = (): TrackingPayload | null => {
  const params = new URLSearchParams(location.search);
  const payload: TrackingPayload = {
    service: "iv_therapy",
    page: location.pathname,
    referrer: document.referrer || "",
  };
  let hasAny = false;
  for (const key of TRACKING_KEYS) {
    const v = params.get(key);
    if (v) {
      (payload as Record<string, string | undefined>)[key] = v;
      hasAny = true;
    }
  }
  return hasAny ? payload : null;
};

const fetchRef = async (payload: TrackingPayload): Promise<string | null> => {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  if (!url || !anon) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${url}/functions/v1/track-click`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${anon}`,
        apikey: anon,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    const id = data && typeof data.id === "string" ? data.id : null;
    return id;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

const openWa = (originalOpen: typeof window.open) => {
  // Build the parser-friendly message with SID/GCLID/TS pulled from localStorage.
  void import("./whatsapp").then(({ buildWaUrl }) => {
    const url = buildWaUrl({
      source: "default",
      extras: {
        sourceLabel: "Legacy WA Link",
        page: location.pathname,
      },
    });
    originalOpen.call(window, url, "_blank");
  });
};

const handleWaIntent = async (originalOpen: typeof window.open) => {
  // Fire GA4 conversion event with full funnel attribution.
  void import("./tracking").then(({ trackWhatsAppClick }) => {
    trackWhatsAppClick({ source: "interceptor" });
  });

  const tracking = collectTracking();
  if (tracking) {
    // Fire and forget — ref minting is for backend logs only; the WA message
    // now carries SID/GCLID directly via buildWaUrl.
    void fetchRef(tracking);
  }
  openWa(originalOpen);
};

const isWaUrl = (val: unknown): boolean =>
  typeof val === "string" && val.includes(WA_MATCH);

const findWaAnchor = (start: EventTarget | null): Element | null => {
  let node = start as Node | null;
  while (node && node.nodeType !== 1) node = node.parentNode;
  let el = node as Element | null;
  // Walk up: if any ancestor opts out via data-wa-skip, abort interception.
  let cursor = el;
  while (cursor) {
    if (cursor.hasAttribute && cursor.hasAttribute("data-wa-skip")) return null;
    cursor = cursor.parentElement;
  }
  while (el) {
    if (el.tagName === "A") {
      const href = (el as HTMLAnchorElement).getAttribute("href") || "";
      if (href.includes(WA_MATCH)) return el;
    }
    if (el.hasAttribute && el.hasAttribute("data-wa")) return el;
    const aria = el.getAttribute && el.getAttribute("aria-label");
    if (aria && /whatsapp/i.test(aria)) return el;
    el = el.parentElement;
  }
  return null;
};

export const installWaInterceptor = (): (() => void) => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }

  const originalOpen = window.open.bind(window);

  const onClick = (e: MouseEvent) => {
    // Ignore modifier-key / non-primary clicks so users can still open in new tab manually.
    if (e.defaultPrevented) return;
    if (e.button !== undefined && e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const match = findWaAnchor(e.target);
    if (!match) return;

    e.preventDefault();
    e.stopPropagation();
    void handleWaIntent(originalOpen);
  };

  document.addEventListener("click", onClick, true);

  // Wrap window.open to catch direct programmatic calls.
  const wrappedOpen: typeof window.open = ((
    url?: string | URL,
    target?: string,
    features?: string,
  ) => {
    if (isWaUrl(url)) {
      void handleWaIntent(originalOpen);
      return null;
    }
    return originalOpen(url as string, target as string, features as string);
  }) as typeof window.open;

  window.open = wrappedOpen;

  return () => {
    document.removeEventListener("click", onClick, true);
    if (window.open === wrappedOpen) {
      window.open = originalOpen;
    }
  };
};
