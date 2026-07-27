import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X, Phone } from "lucide-react";
import logo from "@/assets/healthilife-logo.png";
import { trackButtonClick, trackBookingClick } from "@/lib/tracking";
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
    // Route, pas ancre : rendue en <Link> plus bas. La page /pricing existait
    // depuis toujours sans etre liee de nulle part.
    { name: t("nav.pricing"), href: "/pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-transparent"
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
            {navigation.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* CTA Buttons + Language Switcher */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              id="ivclick-header-phone"
              href="tel:+66919991744"
              onClick={() => trackButtonClick('ivclick-header-phone')}
              className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors"
              aria-label="Call +66 91 999 1744"
            >
              <Phone className="h-4 w-4 mr-1.5" />
              +66 91 999 1744
            </a>
            <LanguageSwitcher />
            {/* Point d entree de reservation. IV etait le seul des quatre
                satellites a formulaire dont l en-tete n en portait pas — alors
                que c est l emplacement le plus vu du site. Le parametre
                ?service=iv_therapy suit la convention des trois autres
                (skin, health_checkup, stem_cell) : Vercel preserve la query
                string en redirigeant vers Fillout, c est donc lui qui porte
                l origine de la demande. */}
            <Button variant="outline" size="sm" asChild>
              <a
                href="/book?service=iv_therapy"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackBookingClick('header_desktop')}
              >
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
          <div className="md:hidden flex items-center gap-1">
            <a
              id="ivclick-mobile-phone-icon"
              href="tel:+66919991744"
              onClick={() => trackButtonClick('ivclick-mobile-phone-icon')}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Call +66 91 999 1744"
            >
              <Phone className="h-5 w-5" />
            </a>
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
          <div className="md:hidden -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 space-y-3 border-t border-border bg-background shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navigation.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="pt-2 space-y-2">
              {/* Meme point d entree qu en desktop : un visiteur mobile ne doit
                  pas avoir moins de chemins vers la reservation. */}
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a
                  href="/book?service=iv_therapy"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackBookingClick('header_mobile');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t("nav.bookNow")}
                </a>
              </Button>
              <a
                id="ivclick-mobile-phone"
                href="tel:+66919991744"
                onClick={() => {
                  trackButtonClick('ivclick-mobile-phone');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center w-full py-2.5 rounded-md border border-border text-sm font-semibold text-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                +66 91 999 1744
              </a>
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
