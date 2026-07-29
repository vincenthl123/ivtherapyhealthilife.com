import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initLinkClickTracking } from "./lib/tracking";

// Initialize delegated click tracking for WhatsApp & tel links
initLinkClickTracking();

// SEO: Hydrate immediately for faster FCP/LCP
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  
  // Production: Render without StrictMode for performance
  // Development: Use StrictMode for catching bugs
  if (import.meta.env.DEV) {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else {
    root.render(<App />);
  }
}

// SEO: Report Web Vitals for monitoring (optional)
if (import.meta.env.PROD && 'performance' in window) {
  // Log LCP, FID, CLS to analytics
  const reportWebVitals = () => {
    if ('PerformanceObserver' in window) {
      // LCP Observer
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          const win = window as Window & { gtag?: (...args: unknown[]) => void };
          if (lastEntry && win.gtag) {
            win.gtag('event', 'web_vitals', {
              // send_to explicite obligatoire : gtag.js est chargé deux fois
              // (fan-out GTM + snippet différé index.html) et les events sans
              // send_to sont silencieusement droppés (sonde 2026-07-24).
              // Même règle que trackGAEvent dans src/lib/tracking.ts.
              send_to: 'G-K9R2HXK3QT',
              event_category: 'Web Vitals',
              event_label: 'LCP',
              value: Math.round(lastEntry.startTime),
              non_interaction: true,
            });
          }
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch {
        // LCP not supported
      }
    }
  };
  
  // Defer web vitals reporting
  if (document.readyState === 'complete') {
    reportWebVitals();
  } else {
    window.addEventListener('load', reportWebVitals);
  }
}
