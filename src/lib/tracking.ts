// SEO-Optimized Tracking Utilities
// Deferred execution to avoid blocking main thread

// Extend Window interface for tracking libraries
interface TrackingWindow extends Window {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}

// Debounce tracking calls to prevent performance issues
let trackingQueue: Array<() => void> = [];
let isProcessing = false;

const processQueue = () => {
  if (isProcessing || trackingQueue.length === 0) return;
  
  isProcessing = true;
  
  // Use requestIdleCallback for non-blocking execution
  const executeTracking = () => {
    const batch = trackingQueue.splice(0, 5); // Process 5 at a time
    batch.forEach(fn => {
      try {
        fn();
      } catch (e) {
        // Silently fail - tracking should never break the app
      }
    });
    
    isProcessing = false;
    if (trackingQueue.length > 0) {
      scheduleProcessing();
    }
  };

  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(executeTracking);
  } else {
    setTimeout(executeTracking, 1);
  }
};

const scheduleProcessing = () => {
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(processQueue);
  } else {
    setTimeout(processQueue, 16);
  }
};

// Meta Pixel tracking - deferred
export const trackMetaEvent = (eventName: string, params?: Record<string, unknown>) => {
  trackingQueue.push(() => {
    const win = window as TrackingWindow;
    if (typeof window !== 'undefined' && win.fbq) {
      win.fbq('track', eventName, params);
    }
  });
  scheduleProcessing();
};

// Google Analytics tracking - deferred
export const trackGAEvent = (eventName: string, params?: Record<string, unknown>) => {
  trackingQueue.push(() => {
    const win = window as TrackingWindow;
    if (typeof window !== 'undefined' && win.gtag) {
      win.gtag('event', eventName, params);
    }
  });
  scheduleProcessing();
};

// WhatsApp click conversion event with full funnel attribution.
// Fires:
//   - GA4 'whatsapp_click' (marked as conversion in GA4 → imported to Google Ads)
//   - GA4 'generate_lead' (recommended event for Enhanced Conversions)
//   - Meta Pixel 'Lead'
// All events include gclid/fbclid/utm_* captured on landing (90d window),
// enabling Enhanced Conversions and offline attribution via the GA4 ↔ Ads link.
// Dedupe window: a single physical click can reach this function through
// several paths (interceptor click handler, wrapped window.open, delegated
// link listener), which previously double/triple-counted whatsapp_click.
let lastWaClickAt = 0;
const WA_CLICK_DEDUPE_MS = 1500;

export const trackWhatsAppClick = (params: {
  source: string;
  page?: string;
  hasMessage?: boolean;
}) => {
  const now = Date.now();
  if (now - lastWaClickAt < WA_CLICK_DEDUPE_MS) return;
  lastWaClickAt = now;
  // Lazy import to keep tracking.ts free of cycles.
  void import("./attribution").then(({ getAttribution }) => {
    const attr = getAttribution();
    const payload = {
      event_category: "engagement",
      event_label: params.source,
      page_source: "iv_therapy",
      page_path:
        params.page ||
        (typeof window !== "undefined" ? window.location.pathname : ""),
      has_message: params.hasMessage ? 1 : 0,
      // Funnel attribution
      gclid: attr.gclid,
      gbraid: attr.gbraid,
      wbraid: attr.wbraid,
      fbclid: attr.fbclid,
      utm_source: attr.utm_source,
      utm_medium: attr.utm_medium,
      utm_campaign: attr.utm_campaign,
      utm_term: attr.utm_term,
      utm_content: attr.utm_content,
      landing_page: attr.landing_page,
      referrer: attr.referrer,
    };

    trackGAEvent("whatsapp_click", payload);
    // Recommended GA4 event (Enhanced Conversions / Ads import).
    trackGAEvent("generate_lead", {
      ...payload,
      currency: "THB",
      value: 1,
    });
    trackMetaEvent("Lead", {
      content_name: `whatsapp_${params.source}`,
      content_category: "iv_therapy",
    });
  });
};

// Combined button click tracking - sends to both Meta & GA
export const trackButtonClick = (buttonId: string) => {
  // Meta Pixel Lead event
  trackMetaEvent('Lead', { content_name: buttonId });
  
  // Google Analytics event
  trackGAEvent('button_click', { 
    event_category: 'CTA',
    event_label: buttonId,
    non_interaction: false
  });
};

// Delegated click tracking for WhatsApp & tel links
// Fires gtag events on every wa.me / tel: anchor click anywhere in the app
let linkTrackingInit = false;
export const initLinkClickTracking = () => {
  if (typeof document === 'undefined' || linkTrackingInit) return;
  linkTrackingInit = true;

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const anchor = target.closest('a') as HTMLAnchorElement | null;
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';

    const win = window as TrackingWindow;
    if (!win.gtag) return;

    if (href.includes('wa.me/')) {
      // Route through trackWhatsAppClick so the dedupe window applies —
      // the wa-interceptor also fires for the same physical click.
      trackWhatsAppClick({ source: 'link' });
    } else if (href.startsWith('tel:')) {
      win.gtag('event', 'phone_click', {
        event_category: 'engagement',
        event_label: 'iv_therapy',
        page_source: 'iv_therapy',
      });
    }
  }, { capture: true, passive: true });
};

// SEO: Track scroll depth for engagement metrics
let maxScrollDepth = 0;
let scrollTracked = false;

export const initScrollTracking = () => {
  if (typeof window === 'undefined' || scrollTracked) return;
  scrollTracked = true;
  
  const trackScrollDepth = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const depth = Math.round((scrolled / scrollHeight) * 100);
    
    // Track at 25%, 50%, 75%, 100% thresholds
    const thresholds = [25, 50, 75, 100];
    thresholds.forEach(threshold => {
      if (depth >= threshold && maxScrollDepth < threshold) {
        maxScrollDepth = threshold;
        trackGAEvent('scroll_depth', {
          event_category: 'Engagement',
          event_label: `${threshold}%`,
          value: threshold,
          non_interaction: true
        });
      }
    });
  };
  
  // Throttled scroll listener
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        trackScrollDepth();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
};

// SEO: Track time on page
export const initTimeOnPageTracking = () => {
  if (typeof window === 'undefined') return;
  
  const startTime = Date.now();
  const trackTime = () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    trackGAEvent('time_on_page', {
      event_category: 'Engagement',
      event_label: 'Exit',
      value: timeOnPage,
      non_interaction: true
    });
  };
  
  // Track on page visibility change (more reliable than beforeunload)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      trackTime();
    }
  });
};
