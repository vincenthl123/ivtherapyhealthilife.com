import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import clinicImage from "@/assets/award-certificate.webp";
import { trackButtonClick } from "@/lib/tracking";
import { useLanguage } from "@/lib/i18n";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-medical flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">{t("contact.location")}</h3>
                    <p className="text-muted-foreground mb-1">
                      {t("contact.address")}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("contact.bts")}
                    </p>
                    <Button 
                      id="ivclick-contact-maps" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => trackButtonClick('ivclick-contact-maps')}
                      asChild
                    >
                      <a
                        href="https://g.co/kgs/c1rAiGV"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        {t("contact.findUs")}
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-medical flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">{t("contact.openingHours")}</h3>
                    <div className="space-y-1 text-muted-foreground">
                      <p>{t("contact.monSat")}</p>
                      <p>{t("contact.sunday")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-medical flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">{t("contact.contactUs")}</h3>
                    <div className="space-y-3">
                      <a
                        href="tel:+66919991744"
                        className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        +66 (0)9-1999-1744
                      </a>
                      <div className="flex gap-3">
                        <Button 
                          id="ivclick-contact-whatsapp" 
                          size="sm" 
                          onClick={() => trackButtonClick('ivclick-contact-whatsapp')}
                          asChild
                        >
                          <a
                            href="https://wa.me/66919991744"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            WhatsApp
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={clinicImage}
              alt="Healthi-Life 2025 award certificate"
              className="rounded-2xl shadow-strong w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-6 shadow-medium max-w-xs">
              <p className="text-sm font-semibold text-foreground mb-2">
                {t("contact.awardWinning")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("contact.awardDesc")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-medical rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            {t("contact.feelFast")}
          </h3>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            {t("contact.feelFastDesc")}
          </p>
          <Button 
            id="ivclick-contact-cta" 
            size="lg" 
            variant="secondary" 
            onClick={() => trackButtonClick('ivclick-contact-cta')}
            asChild
          >
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" />
              {t("contact.bookYour")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
