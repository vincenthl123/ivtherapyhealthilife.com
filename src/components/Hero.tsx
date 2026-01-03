import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, MapPin, Clock, MessageCircle } from "lucide-react";
import heroImage from "@/assets/clinic-exterior.webp";
import { trackButtonClick } from "@/lib/tracking";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Healthi-Life clinic exterior with pool"
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Award Badge */}
          <div className="animate-fade-in mb-6">
            <Badge className="bg-gradient-medical text-primary-foreground px-4 py-2 text-xs md:text-sm">
              <Award className="h-4 w-4 mr-2" />
              Best Regenerative Medicine Clinic 2025 – Asia-Pacific
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Stem Cell Therapy in{" "}
            <span className="bg-gradient-medical bg-clip-text text-transparent">
              Bangkok
            </span>
          </h1>

          {/* Subheading */}
          <p className="animate-fade-in-up text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            At Healthi-Life, we don't just treat — <strong>We optimize.</strong> Fresh mesenchymal
            stem cell protocols designed for those who demand more energy, more clarity, more time.
          </p>

          {/* Trust Signals */}
          <div className="animate-fade-in-up flex flex-wrap items-center gap-4 md:gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium">5.0 Google Reviews</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Ekkamai, Bangkok</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Mon-Sat: 11 AM – 7 PM</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="animate-scale-in flex flex-col sm:flex-row gap-4">
            <Button 
              id="stemcellclick-hero-whatsapp" 
              size="lg" 
              className="group" 
              onClick={() => trackButtonClick('stemcellclick-hero-whatsapp')}
              asChild
            >
              <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Free WhatsApp Consultation
              </a>
            </Button>
            <Button 
              id="stemcellclick-hero-call" 
              size="lg" 
              variant="outline" 
              onClick={() => trackButtonClick('stemcellclick-hero-call')}
              asChild
            >
              <a href="tel:+66919991744">Call +66 (0)9-1999-1744</a>
            </Button>
          </div>

          {/* Location Info */}
          <p className="animate-fade-in mt-8 text-sm text-muted-foreground">
            📍 Bangkok's Premier Stem Cell Center at EKKAMAI 10
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;