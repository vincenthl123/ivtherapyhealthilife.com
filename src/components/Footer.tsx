import { MapPin, Phone, Clock } from "lucide-react";
import logo from "@/assets/healthilife-logo.png";
import { useLanguage } from "@/lib/i18n";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <img 
              src={logo} 
              alt="Healthi-Life IV Therapy Bangkok" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-background/80 text-sm mb-4">
              {t("footer.desc")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#services" className="hover:text-background transition-colors">
                  {t("nav.ivDrips")}
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-background transition-colors">
                  {t("nav.whyIVTherapy")}
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-background transition-colors">
                  {t("nav.process")}
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-background transition-colors">
                  {t("nav.testimonials")}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-background transition-colors">
                  {t("nav.faq")}
                </a>
              </li>
            </ul>
          </div>

          {/* Popular IV Drips */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.popularDrips")}</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>Fat Burner IV</li>
              <li>NAD+ IV Therapy</li>
              <li>Glow Revive IV</li>
              <li>Athlete Max IV</li>
              <li>Hangover IV</li>
              <li>Neuro Boost IV</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("contact.contactUs")}</h4>
            <ul className="space-y-3 text-sm text-background/80">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>{t("contact.address")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+66919991744" className="hover:text-background transition-colors">
                  +66 (0)9-1999-1744
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>{t("hero.hours")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-background/70">
            © {currentYear} {t("footer.copyright")}
          </p>
          <div className="flex items-center space-x-4 text-sm text-background/70">
            <a href="#" className="hover:text-background transition-colors">
              {t("footer.privacy")}
            </a>
            <span>•</span>
            <a href="#" className="hover:text-background transition-colors">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
