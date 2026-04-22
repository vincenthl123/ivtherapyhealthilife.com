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
      win.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'iv_therapy',
        page_source: 'iv_therapy',
      });
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
