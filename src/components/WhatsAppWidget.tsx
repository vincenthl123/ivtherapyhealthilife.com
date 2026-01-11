import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";
import { useLanguage } from "@/lib/i18n";

const WhatsAppWidget = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);

  useEffect(() => {
    // Show popup after 15 seconds
    const timer = setTimeout(() => {
      if (!hasSeenPopup) {
        setShowPopup(true);
        setHasSeenPopup(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [hasSeenPopup]);

  const handleOpenChat = () => {
    trackButtonClick('ivclick-whatsapp-widget');
    window.open('https://wa.me/66919991744', '_blank');
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popup Message */}
      {showPopup && (
        <div className="absolute bottom-20 right-0 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
          <div className="bg-[#075E54] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                <img 
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face" 
                  alt="Medical Concierge"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Healthi-Life</p>
                <p className="text-white/80 text-xs">{t("whatsapp.online")}</p>
              </div>
            </div>
            <button 
              onClick={closePopup}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 bg-[#ECE5DD]">
            <div className="bg-white rounded-lg p-3 shadow-sm max-w-[85%]">
              <p className="text-gray-800 text-sm mb-1">
                {t("whatsapp.greeting")} 👋
              </p>
              <p className="text-gray-600 text-xs">
                {t("whatsapp.message")}
              </p>
              <p className="text-gray-400 text-[10px] text-right mt-1">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
          <button
            onClick={handleOpenChat}
            className="w-full bg-[#25D366] text-white py-3 font-semibold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            {t("whatsapp.startChat")}
          </button>
        </div>
      )}

      {/* Floating Button with Avatar */}
      <div className="relative">
        {/* Concierge Label */}
        {!showPopup && (
          <div className="absolute -top-10 right-0 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100 whitespace-nowrap animate-fade-in">
            <p className="text-sm font-medium text-gray-800">{t("whatsapp.concierge")}</p>
          </div>
        )}
        
        <button
          onClick={handleOpenChat}
          className="group relative w-16 h-16 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          {/* Avatar */}
          <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face" 
              alt="Medical Concierge"
              className="w-full h-full object-cover"
            />
          </div>
          <MessageCircle className="w-7 h-7 text-white" />
          
          {/* Pulse Animation */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppWidget;
