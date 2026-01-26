import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
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

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popup Message - WhatsApp Style Chat */}
      {showPopup && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in-up">
          {/* Header with Concierge */}
          <div className="bg-[#075E54] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face" 
                    alt="Anna - Medical Concierge"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#075E54]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Anna - Medical Concierge</p>
                <p className="text-white/80 text-xs">{t("whatsapp.online")}</p>
              </div>
            </div>
            <button 
              onClick={closePopup}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Chat Body */}
          <div className="p-4 bg-[#ECE5DD] min-h-[140px]">
            <div className="bg-white rounded-lg p-3 shadow-sm max-w-[90%] relative">
              {/* Chat bubble tail */}
              <div className="absolute -left-2 top-0 w-0 h-0 border-t-8 border-t-white border-r-8 border-r-transparent" />
              <p className="text-gray-800 text-sm mb-2">
                {t("whatsapp.greeting")}
              </p>
              <p className="text-gray-800 text-sm mb-2">
                {t("whatsapp.welcome")}
              </p>
              <p className="text-gray-600 text-sm">
                {t("whatsapp.message")}
              </p>
              <p className="text-gray-400 text-[10px] text-right mt-2">
                {currentTime}
              </p>
            </div>
          </div>
          
          {/* Input Area */}
          <div className="p-3 bg-[#F0F0F0] flex items-center gap-2">
            <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400">
              Enter Your Message...
            </div>
            <button
              onClick={handleOpenChat}
              className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:bg-[#128C7E] transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button with Concierge Label */}
      <div className="relative flex items-center gap-3">
        {/* Concierge Label with Avatar */}
        {!showPopup && (
          <div className="bg-white rounded-full pl-2 pr-4 py-2 shadow-lg border border-gray-100 flex items-center gap-2 animate-fade-in">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face" 
                alt="Concierge"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-medium text-gray-800">{t("whatsapp.concierge")}</p>
          </div>
        )}
        
        {/* WhatsApp Button with Wave Effect */}
        <button
          onClick={handleOpenChat}
          className="group relative w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-white" />
          
          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
            1
          </span>
          
          {/* Wave Animation */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-30" style={{ animationDelay: '0.5s' }} />
        </button>
      </div>

      {/* Custom Wave Animation Styles */}
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppWidget;
