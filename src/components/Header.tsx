import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X, Phone } from "lucide-react";
import logo from "@/assets/healthilife-logo.png";
import { trackButtonClick } from "@/lib/tracking";
import { useLanguage } from "@/lib/i18n";
import { buildWaUrl } from "@/lib/whatsapp";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: t("nav.ivDrips"), href: "#services" },
    { name: t("nav.whyIVTherapy"), href: "#why-us" },
    { name: t("nav.doctors"), href: "#doctors" },
    { name: t("nav.process"), href: "#process" },
    { name: t("nav.testimonials"), href: "#testimonials" },
    { name: t("nav.faq"), href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img 
                src={logo} 
                alt="Healthi-Life IV Therapy Bangkok" 
                className="h-8 md:h-10 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons + Language Switcher */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSwitcher />
            <Button 
              id="ivclick-header-book" 
              variant="outline" 
              size="sm" 
              onClick={() => trackButtonClick('ivclick-header-book')}
              asChild
            >
              <a href={buildWaUrl("IV Therapy Enquiry")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                {t("nav.bookNow")}
              </a>
            </Button>
            <Button 
              id="ivclick-header-whatsapp" 
              size="sm" 
              onClick={() => trackButtonClick('ivclick-header-whatsapp')}
              asChild
            >
              <a href={buildWaUrl("IV Therapy Enquiry")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                {t("nav.whatsapp")}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2 space-y-2">
              <Button 
                id="ivclick-mobile-book" 
                variant="outline" 
                size="sm" 
                className="w-full" 
                onClick={() => trackButtonClick('ivclick-mobile-book')}
                asChild
              >
                <a href={buildWaUrl("IV Therapy Enquiry")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {t("nav.bookNow")}
                </a>
              </Button>
              <Button 
                id="ivclick-mobile-whatsapp" 
                size="sm" 
                className="w-full" 
                onClick={() => trackButtonClick('ivclick-mobile-whatsapp')}
                asChild
              >
                <a href={buildWaUrl("IV Therapy Enquiry")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {t("nav.whatsapp")}
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
