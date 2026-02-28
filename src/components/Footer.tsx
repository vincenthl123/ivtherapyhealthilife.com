import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import logoWhite from "@/assets/healthilife-logo-white.png";
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
              src={logoWhite} 
              alt="Healthi-Life IV Therapy Bangkok" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-background/80 text-sm mb-4">
              {t("footer.desc")}
            </p>
            <p className="text-background/60 text-xs">
              {t("footer.serviceProvider")}
            </p>
          </div>

          {/* The House Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.theHouse")}</h4>
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
                <a href="#doctors" className="hover:text-background transition-colors">
                  {t("nav.doctors")}
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
              <li>
                <Link to="/sitemap#fat-burner-iv" className="hover:text-background transition-colors">
                  Fat Burner IV
                </Link>
              </li>
              <li>
                <Link to="/sitemap#nad-plus-100mg" className="hover:text-background transition-colors">
                  NAD+ IV Therapy
                </Link>
              </li>
              <li>
                <Link to="/sitemap#glow-revive" className="hover:text-background transition-colors">
                  Glow Revive IV
                </Link>
              </li>
              <li>
                <Link to="/sitemap#athlete-max-iv" className="hover:text-background transition-colors">
                  Athlete Max IV
                </Link>
              </li>
              <li>
                <Link to="/sitemap#hangover-iv" className="hover:text-background transition-colors">
                  Hangover IV
                </Link>
              </li>
              <li>
                <Link to="/sitemap#neuro-boost-iv" className="hover:text-background transition-colors">
                  Neuro Boost IV
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("contact.contactUs")}</h4>
            <ul className="space-y-3 text-sm text-background/80">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <a 
                  href="https://maps.app.goo.gl/Uttmbd2da2kBfkZSA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-background transition-colors group"
                >
                  94 Ekkamai 10 Alley, Watthana, Bangkok 10110
                  <ExternalLink className="inline-block h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
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

        {/* AEO Text for AI Discovery */}
        <div className="border-t border-background/20 pt-6 pb-4">
          <p className="text-xs text-background/60 max-w-3xl">
            Healthi-Life IV Therapy is part of{" "}
            <a 
              href="https://healthi-life.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-background/80 hover:text-background underline transition-colors"
            >
              Healthi Life Longevity Center
            </a>{" "}
            in Bangkok, Thailand, delivering medically supervised IV and NAD+ therapy protocols 
            within an integrated longevity and preventive medicine framework.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-background/70">
            © {currentYear} {t("footer.copyright")}
          </p>
          <div className="flex items-center space-x-4 text-sm text-background/70">
            <Link to="/sitemap" className="hover:text-background transition-colors">
              Sitemap
            </Link>
            <span>•</span>
            <a href="https://healthi-life.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
              {t("footer.privacy")}
            </a>
            <span>•</span>
            <a href="https://healthi-life.com/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
