import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useLocation } from "react-router-dom";
import { trackButtonClick } from "@/lib/tracking";
import { useLanguage } from "@/lib/i18n";
import conciergeAvatar from "@/assets/concierge-anna.jpg";

const WhatsAppWidget = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const isPeptides = location.pathname === "/therapy-bangkok" || location.pathname === "/peptides-therapy";
  const isBPC157 = location.pathname === "/BPC-157";
  const isGLP1 = location.pathname === "/GLP-1";
  const isCJC = location.pathname === "/CJC-1295-Ipamorelin";
  const isSema = location.pathname === "/Semaglutide";
  const isReta = location.pathname === "/Retatrutide";
  const [showPopup, setShowPopup] = useState(false);
  const [dismissCount, setDismissCount] = useState(0);

  // Initial open after 25s, reopen 30s after each dismiss
  useEffect(() => {
    const delay = dismissCount === 0 ? 25000 : 30000;
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [dismissCount]);

  const handleOpenChat = () => {
    trackButtonClick('ivclick-whatsapp-widget');
    window.open('https://wa.me/66919991744?text=IV%20Therapy%20Enquiry', '_blank');
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
    setDismissCount(prev => prev + 1);
  };

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      {/* Popup Message */}
      {showPopup && (
        <div className="absolute bottom-16 md:bottom-20 right-0 w-[calc(100vw-2rem)] max-w-80 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-success p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-success-foreground/30">
                  <img 
                    src={conciergeAvatar}
                    alt="Anna - Medical Concierge"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-success" />
              </div>
              <div>
                <p className="text-success-foreground font-semibold text-sm">Anna - Medical Concierge</p>
                <p className="text-success-foreground/80 text-xs">{t("whatsapp.online")}</p>
              </div>
            </div>
            <button 
              onClick={closePopup}
              className="text-success-foreground/80 hover:text-success-foreground transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Chat Body */}
          <div className="p-4 bg-secondary min-h-[140px]">
            <div className="bg-card rounded-lg p-3 shadow-sm max-w-[90%] relative">
              <div className="absolute -left-2 top-0 w-0 h-0 border-t-8 border-t-card border-r-8 border-r-transparent" />
              <p className="text-foreground text-sm mb-2">{t("whatsapp.greeting")}</p>
              <p className="text-foreground text-sm mb-2">{t("whatsapp.welcome")}</p>
              <p className="text-muted-foreground text-sm whitespace-pre-line">{t(isReta ? "whatsapp.message.reta" : isSema ? "whatsapp.message.sema" : isCJC ? "whatsapp.message.cjc" : isGLP1 ? "whatsapp.message.glp1" : isBPC157 ? "whatsapp.message.bpc157" : isPeptides ? "whatsapp.message.peptides" : "whatsapp.message")}</p>
              <p className="text-muted-foreground/60 text-[10px] text-right mt-2">{currentTime}</p>
            </div>
          </div>
          
          {/* Input Area */}
          <div className="p-3 bg-muted flex items-center gap-2">
            <div className="flex-1 bg-card rounded-full px-4 py-2 text-sm text-muted-foreground">
              Enter Your Message...
            </div>
            <button
              onClick={handleOpenChat}
              className="w-10 h-10 bg-success rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Send className="w-5 h-5 text-success-foreground" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div className="relative flex items-center gap-3">
        {!showPopup && (
          <div className="hidden md:flex bg-card rounded-full pl-2 pr-4 py-2 shadow-lg border border-border items-center gap-2 animate-fade-in">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-border">
              <img 
                src={conciergeAvatar}
                alt="Concierge"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-sm font-medium text-foreground">{t("whatsapp.concierge")}</p>
          </div>
        )}
        
        <button
          onClick={handleOpenChat}
          className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-success shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-success-foreground" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-destructive-foreground text-xs font-bold border-2 border-card">
            1
          </span>
          <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-20" />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppWidget;
