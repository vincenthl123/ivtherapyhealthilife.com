import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, MapPin, Clock, MessageCircle, CalendarCheck, Phone } from "lucide-react";
import heroRoomDesktop from "@/assets/hero-private-room-desktop.webp";
import heroRoomMobile from "@/assets/hero-private-room-mobile.webp";
import { trackButtonClick, trackCallClick } from "@/lib/tracking";
import { useLanguage } from "@/lib/i18n";
import { buildWaUrl } from "@/lib/whatsapp";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-20">
      {/* Background Image with Overlay - LCP Optimized */}
      <div className="absolute inset-0 z-0">
        {/* Preload hint already in index.html */}
        <picture>
          <source media="(min-width: 768px)" srcSet={heroRoomDesktop} type="image/webp" />
          <img
            src={heroRoomMobile}
            alt="Private treatment room at Healthi Life — the urban longevity house in Ekkamai, Bangkok"
            width={2400}
            height={1862}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "32% 58%" }}
          />
        </picture>
        <div
          className="absolute inset-0 hl-hero-veil"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,249,239,0.95) 0%, rgba(255,249,239,0.90) 50%, rgba(255,249,239,0.45) 100%)",
          }}
        />
        <style>{`
          @media (min-width: 768px) {
            .hl-hero-veil {
              background: linear-gradient(
                90deg,
                rgba(255,249,239,0.97) 0%,
                rgba(255,249,239,0.94) 34%,
                rgba(255,249,239,0.72) 55%,
                rgba(255,249,239,0.38) 78%,
                rgba(255,249,239,0.28) 100%
              ) !important;
            }
          }
        `}</style>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-12 md:py-32">
        <div className="max-w-3xl">
          {/* Award Badge */}
          <div className="animate-fade-in mb-6">
            <Badge className="bg-gradient-medical text-primary-foreground px-4 py-2 text-xs md:text-sm">
              <Award className="h-4 w-4 mr-2" />
              {t("hero.badge")}
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="animate-fade-in-up text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4 md:mb-6 leading-[1.15]">
            {t("hero.title")}{" "}
            <span className="bg-gradient-medical bg-clip-text text-transparent">
              {t("hero.titleHighlight")}
            </span>
          </h1>

          {/* Subheading */}
          <p className="animate-fade-in-up text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl">
            {t("hero.subtitle")} <strong>{t("hero.subtitleBold")}</strong>
          </p>

          {/* Trust Signals */}
          <div className="animate-fade-in-up flex flex-wrap items-center gap-4 md:gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium">{t("hero.reviews")}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{t("hero.location")}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{t("hero.hours")}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="animate-scale-in flex flex-col sm:flex-row gap-4">
            <Button 
              id="ivclick-hero-whatsapp" 
              size="lg" 
              className="group" 
              onClick={() => trackButtonClick('ivclick-hero-whatsapp')}
              asChild
            >
              <a href={buildWaUrl({ source: "hero" })} target="_blank" rel="noopener noreferrer" data-wa-skip="1">
                <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                {t("hero.cta1")}
              </a>
            </Button>
            <Button
              id="ivclick-hero-book"
              size="lg"
              variant="outline"
              onClick={() => trackButtonClick('ivclick-hero-book')}
              asChild
            >
              <a href="/book?service=iv_therapy" target="_blank" rel="noopener noreferrer" data-booking-ctx="hero">
                <CalendarCheck className="h-5 w-5 mr-2" />
                Book Consultation
              </a>
            </Button>
          </div>

          {/* Call link — small, under the primary CTAs (not a 3rd big button) */}
          <a
            href="tel:+66919991744"
            id="ivclick-hero-call"
            onClick={() => { trackButtonClick('ivclick-hero-call'); trackCallClick('hero'); }}
            className="animate-fade-in-up mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            Or call us directly: +66 91 999 1744
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
