import { MapPin, Phone, Clock } from "lucide-react";
import logo from "@/assets/healthilife-logo.png";

const Footer = () => {
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
              Bangkok's premium destination for personalized IV drips. Beyond hydration — targeted nutrients to restore energy, boost immunity, and rejuvenate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#services" className="hover:text-background transition-colors">
                  IV Drips
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-background transition-colors">
                  Why IV Therapy
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-background transition-colors">
                  Our Process
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-background transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-background transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Popular IV Drips */}
          <div>
            <h4 className="font-semibold mb-4">Popular IV Drips</h4>
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
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/80">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>94 Ekkamai 10 Alley, Watthana, Bangkok 10110</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+66919991744" className="hover:text-background transition-colors">
                  +66 (0)9-1999-1744
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Mon-Sat: 11 AM – 7 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-background/70">
            © {currentYear} IV Therapy Healthi-Life. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-background/70">
            <a href="#" className="hover:text-background transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-background transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
