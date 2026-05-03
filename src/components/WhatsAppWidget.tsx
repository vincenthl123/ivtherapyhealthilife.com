import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { trackButtonClick, trackGAEvent } from "@/lib/tracking";
import { buildWaUrl, trackAndOpenWhatsApp } from "@/lib/whatsapp";
import conciergeAvatar from "@/assets/concierge-anna-v2.jpg";

const SESSION_KEY = "wa_widget_auto_opened";
const AUTO_OPEN_DELAY_MS = 10_000;
const SCROLL_THRESHOLD = 0.5; // 50% of the page

// Official WhatsApp green (legacy launcher icon color)
const WA_GREEN = "#25D366";
// Cream brand background
const CREAM = "#fff9ef";
// Healthi Life gold accent
const GOLD = "#b8941f";

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39-.034 0-.066-.006-.094-.02-.41-.183-3.176-1.71-4.426-4.084-.067-.12-.084-.213-.084-.288 0-.355.756-.86.756-1.246 0-.06-.014-.12-.043-.18-.064-.13-1.05-2.673-1.244-3.114-.143-.343-.32-.555-.69-.555-.094 0-.183 0-.275.012-.37.035-1.99.245-2.59 1.62-.61 1.39-.13 3.69 1.66 6.39 1.79 2.7 4.43 4.93 8.2 6.32 1.04.38 1.84.42 2.45.42.84 0 1.43-.12 1.74-.27.46-.22 1.97-.83 2.27-1.86.3-1.03.3-1.91.21-2.09-.09-.18-.32-.27-.69-.45-.36-.18-2.13-1.05-2.46-1.17-.32-.12-.56-.18-.79-.18zM16.25 4C9.5 4 4 9.5 4 16.25c0 2.34.66 4.53 1.81 6.39L4 28l5.59-1.83a12.18 12.18 0 0 0 6.66 1.96h.01c6.74 0 12.24-5.5 12.24-12.25S22.99 4 16.25 4zm0 22.36h-.01a10.16 10.16 0 0 1-5.18-1.42l-.37-.22-3.86 1.27 1.29-3.76-.24-.39A10.13 10.13 0 0 1 6.13 16.25c0-5.59 4.55-10.13 10.13-10.13 2.71 0 5.25 1.06 7.16 2.97a10.07 10.07 0 0 1 2.97 7.17c0 5.59-4.55 10.13-10.14 10.13z" />
  </svg>
);

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [autoOpened, setAutoOpened] = useState(false);
  const [pulseTick, setPulseTick] = useState(0);
  const [userMessage, setUserMessage] = useState("");
  const triggeredRef = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  // Auto-open: 10s timer OR 50% scroll, once per session
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        triggeredRef.current = true;
        return;
      }
    } catch {
      /* sessionStorage may be blocked; fall through to in-memory */
    }

    const trigger = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setIsOpen(true);
      setAutoOpened(true);
      cleanup();
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const ratio = window.scrollY / scrollable;
      if (ratio >= SCROLL_THRESHOLD) trigger();
    };

    const timer = window.setTimeout(trigger, AUTO_OPEN_DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });

    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, []);

  // Subtle pulse every 8s when closed
  useEffect(() => {
    if (isOpen) return;
    const id = window.setInterval(() => setPulseTick((n) => n + 1), 8000);
    return () => window.clearInterval(id);
  }, [isOpen]);

  const handleContinue = () => {
    trackButtonClick("ivclick-whatsapp-widget");

    // trackAndOpenWhatsApp now fires GA4 'whatsapp_click' + 'generate_lead'
    // with full funnel attribution (gclid/fbclid/utm) attached.
    trackAndOpenWhatsApp({
      source: "popup",
      userMessage: userMessage.trim(),
      extras: {
        sourceLabel: "Floating Widget",
        page:
          typeof window !== "undefined" ? window.location.pathname : "",
      },
    });

    // Defer closing so the browser's user-gesture for the new tab is not
    // interrupted. Reset textarea on close.
    window.setTimeout(() => {
      setIsOpen(false);
      setUserMessage("");
    }, 250);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleContinue();
  };

  const handleToggle = () => {
    setIsOpen((v) => {
      const next = !v;
      if (next) {
        trackGAEvent("whatsapp_popup_opened", {
          event_category: "engagement",
          event_label: "iv_therapy_widget",
          page_path:
            typeof window !== "undefined" ? window.location.pathname : "",
        });
      }
      return next;
    });
    setAutoOpened(false);
  };

  // ESC to close + autofocus textarea + restore focus on close.
  useEffect(() => {
    if (!isOpen) return;
    lastFocusRef.current = (document.activeElement as HTMLElement) || null;
    const t = window.setTimeout(() => textareaRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === "Tab") {
        // Simple focus trap inside the dialog.
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'button, [href], textarea, input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      // Restore focus to the launcher / previous element.
      lastFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  // Track auto-open once when it happens.
  useEffect(() => {
    if (isOpen && autoOpened) {
      trackGAEvent("whatsapp_popup_opened", {
        event_category: "engagement",
        event_label: "iv_therapy_widget_auto",
        page_path:
          typeof window !== "undefined" ? window.location.pathname : "",
      });
    }
  }, [isOpen, autoOpened]);

  return (
    <div
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
      data-wa-skip="1"
      style={{ ["--wa-cream" as string]: CREAM, ["--wa-green" as string]: WA_GREEN }}
    >
      {/* Backdrop (mobile bottom-sheet feel + click-outside-to-close) */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close chat"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 md:bg-transparent md:pointer-events-none animate-fade-in"
          style={{ zIndex: -1 }}
        />
      )}

      {/* Open card */}
      {isOpen && (
        <div
          ref={dialogRef}
          className="fixed inset-x-3 bottom-24 md:absolute md:inset-auto md:bottom-20 md:right-0 md:w-[380px] max-w-[420px] md:max-w-[380px] mx-auto md:mx-0 rounded-2xl shadow-2xl border overflow-hidden motion-safe:animate-fade-in"
          style={{
            backgroundColor: CREAM,
            borderColor: "rgba(184, 148, 31, 0.35)",
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="wa-popup-title"
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center justify-between border-b"
            style={{ borderColor: "rgba(184, 148, 31, 0.25)" }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="w-11 h-11 rounded-full overflow-hidden border-2"
                  style={{ borderColor: GOLD }}
                >
                  <img
                    src={conciergeAvatar}
                    alt="Healthi Life concierge"
                    className="w-full h-full object-cover"
                    width={88}
                    height={88}
                    loading="lazy"
                  />
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                  style={{ backgroundColor: "#22c55e", borderColor: CREAM }}
                  aria-hidden="true"
                />
              </div>
              <div className="leading-tight">
                <p
                  id="wa-popup-title"
                  className="text-foreground font-semibold text-sm uppercase"
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                    letterSpacing: "0.18em",
                  }}
                >
                  Healthi Life
                </p>
                <p className="text-muted-foreground text-xs">
                  Typically replies within minutes
                </p>
                <p className="text-[11px] mt-0.5 flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ backgroundColor: "#22c55e" }}
                  />
                  <span style={{ color: "#15803d" }}>Online</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 -mr-1"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Welcome bubble */}
          <div className="px-4 pt-4 pb-3">
            <div
              className="bg-white rounded-xl px-4 py-3 text-sm text-foreground leading-relaxed relative"
              style={{ boxShadow: "0 2px 10px rgba(60, 40, 0, 0.06)" }}
            >
              <span
                className="absolute -left-1.5 top-3 w-3 h-3 bg-white rotate-45"
                style={{ boxShadow: "-2px 2px 4px rgba(60, 40, 0, 0.04)" }}
                aria-hidden="true"
              />
              Hi 👋 Welcome to Healthi Life! Need info on treatments, a
              consultation, or pricing? Just send us a message — our team will
              reply shortly.
            </div>
          </div>

          {/* Form: textarea + CTA */}
          <form
            onSubmit={handleSubmitForm}
            className="px-4 pb-4 space-y-3"
            data-wa-skip="1"
          >
            <textarea
              ref={textareaRef}
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message…"
              rows={3}
              className="w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 resize-none"
              style={{
                borderColor: "rgba(184, 148, 31, 0.35)",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
              aria-label="Type your message"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleContinue();
                }
              }}
            />
            <button
              id="wa-widget-cta"
              type="submit"
              data-wa-skip="1"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: GOLD,
                color: CREAM,
              }}
            >
              <WhatsAppIcon className="w-5 h-5" />
              Open WhatsApp
            </button>
          </form>
        </div>
      )}

      {/* Closed-state launcher with concierge label */}
      <div className="relative flex items-center gap-3 justify-end">
        {!isOpen && (
          <button
            onClick={handleToggle}
            aria-label="Open WhatsApp chat"
            className="hidden md:flex items-center gap-2 rounded-full pl-2 pr-4 py-1.5 shadow-md border animate-fade-in transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: CREAM,
              borderColor: "rgba(180, 150, 90, 0.45)",
            }}
          >
            <span
              className="w-7 h-7 rounded-full overflow-hidden border block"
              style={{ borderColor: "rgba(180, 150, 90, 0.45)" }}
            >
              <img
                src={conciergeAvatar}
                alt="Anna, Medical Concierge"
                className="w-full h-full object-cover"
                width={56}
                height={56}
                loading="lazy"
              />
            </span>
            <span className="text-sm font-medium text-foreground">
              Your Medical Concierge
            </span>
          </button>
        )}

        <button
          onClick={handleToggle}
          aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          className="relative rounded-full flex items-center justify-center transition-transform hover:scale-105"
          style={{
            width: 60,
            height: 60,
            backgroundColor: CREAM,
            border: "1.5px solid rgba(180, 150, 90, 0.55)",
            boxShadow: "0 6px 20px rgba(60, 40, 0, 0.15)",
            color: WA_GREEN,
          }}
        >
          <WhatsAppIcon className="w-7 h-7" />
          {/* Pulse ring (re-keyed every 8s for subtle attention) */}
          {!isOpen && (
            <span
              key={pulseTick}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.45)",
                animation: "wa-pulse 2.2s ease-out 1",
              }}
              aria-hidden="true"
            />
          )}
          {!isOpen && autoOpened === false && (
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white border-2"
              style={{ backgroundColor: WA_GREEN, borderColor: CREAM }}
            >
              1
            </span>
          )}
        </button>
      </div>

      {/* Local keyframes for the on-demand pulse */}
      <style>{`
        @keyframes wa-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.45); }
          70%  { box-shadow: 0 0 0 18px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppWidget;
