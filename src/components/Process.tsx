import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, Stethoscope, Droplets } from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";
import { useLanguage } from "@/lib/i18n";
import { buildWaUrl } from "@/lib/whatsapp";

const Process = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: MessageCircle, number: "01", title: t("process.step1.title"), description: t("process.step1.desc") },
    { icon: Stethoscope, number: "02", title: t("process.step2.title"), description: t("process.step2.desc") },
    { icon: Calendar, number: "03", title: t("process.step3.title"), description: t("process.step3.desc") },
    { icon: Droplets, number: "04", title: t("process.step4.title"), description: t("process.step4.desc") },
  ];

  return (
    <section id="process" className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("process.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("process.subtitle")}
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative group hover:shadow-medium transition-all duration-300 border-border"
            >
              <CardContent className="p-6">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-medical flex items-center justify-center text-primary-foreground font-bold text-sm md:text-lg shadow-soft">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>

              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-border" />
              )}
            </Card>
          ))}
        </div>

        {/* Contact Options */}
        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-soft">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
            {t("process.ready")}
          </h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Button 
              id="ivclick-process-call" 
              size="lg" 
              variant="outline" 
              className="h-auto py-4" 
              onClick={() => trackButtonClick('ivclick-process-call')}
              asChild
            >
              <a href="tel:+66919991744">
                <div className="text-left w-full">
                  <div className="font-bold text-base mb-1">{t("process.callUs")}</div>
                  <div className="text-xs text-muted-foreground">+66 (0)9 1999 1744</div>
                </div>
              </a>
            </Button>
            <Button 
              id="ivclick-process-whatsapp" 
              size="lg" 
              className="h-auto py-4" 
              onClick={() => trackButtonClick('ivclick-process-whatsapp')}
              asChild
            >
              <a href={buildWaUrl("IV Therapy Enquiry")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-bold text-base mb-1">WhatsApp</div>
                  <div className="text-xs">{t("process.quickConsult")}</div>
                </div>
              </a>
            </Button>
            <Button 
              id="ivclick-process-book" 
              size="lg" 
              variant="outline" 
              className="h-auto py-4" 
              onClick={() => trackButtonClick('ivclick-process-book')}
              asChild
            >
              <a href="https://healthilife.fillout.com/ivtherapy" target="_blank" rel="noopener noreferrer">
                <div className="text-left w-full">
                  <div className="font-bold text-base mb-1">{t("process.bookOnline")}</div>
                  <div className="text-xs text-muted-foreground">{t("process.scheduleSession")}</div>
                </div>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
