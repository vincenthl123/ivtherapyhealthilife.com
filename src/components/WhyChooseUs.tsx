import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Award, Droplets, Zap, Heart } from "lucide-react";
import treatmentImage from "@/assets/treatment-room.webp";
import { useLanguage } from "@/lib/i18n";

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Droplets, title: t("why.absorption.title"), description: t("why.absorption.desc") },
    { icon: Zap, title: t("why.instant.title"), description: t("why.instant.desc") },
    { icon: Heart, title: t("why.physician.title"), description: t("why.physician.desc") },
    { icon: Shield, title: t("why.medical.title"), description: t("why.medical.desc") },
    { icon: CheckCircle, title: t("why.quick.title"), description: t("why.quick.desc") },
  ];

  const benefits = [
    { name: t("why.brainBooster"), description: t("why.brainBoosterDesc") },
    { name: t("why.bodyBooster"), description: t("why.bodyBoosterDesc") },
    { name: t("why.skinBooster"), description: t("why.skinBoosterDesc") },
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("why.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("why.subtitle")}{" "}
            <strong>{t("why.subtitleBold")}</strong>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Side */}
          <div className="relative">
            <img
              src={treatmentImage}
              alt="Healthi-Life IV therapy treatment room"
              className="rounded-2xl shadow-strong w-full"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-lg p-6 shadow-medium max-w-xs">
              <p className="text-sm font-semibold text-foreground mb-2">
                {t("why.whyNeed")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("why.whyNeedDesc")}
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IV Categories */}
        <div className="bg-gradient-subtle rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
            {t("why.targeted")}
          </h3>
          <h4 className="text-lg md:text-xl text-center text-muted-foreground mb-8">
            {t("why.trusted")}
          </h4>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-accent/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-medical flex items-center justify-center">
                    <Award className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{benefit.name}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Badge className="bg-success text-success-foreground">
              {t("why.luxurious")}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
