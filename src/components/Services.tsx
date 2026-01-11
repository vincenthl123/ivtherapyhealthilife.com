import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Flame, Zap, Sparkles, MessageCircle, Brain, Heart } from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";
import { useLanguage } from "@/lib/i18n";

const Services = () => {
  const { t } = useLanguage();

  const popularDrips = [
    {
      icon: Flame,
      title: t("popular.fatBurner.title"),
      price: t("popular.fatBurner.price"),
      description: t("popular.fatBurner.desc"),
      benefits: [t("popular.fatBurner.benefit1"), t("popular.fatBurner.benefit2"), t("popular.fatBurner.benefit3")],
    },
    {
      icon: Zap,
      title: t("popular.nad.title"),
      price: t("popular.nad.price"),
      description: t("popular.nad.desc"),
      benefits: [t("popular.nad.benefit1"), t("popular.nad.benefit2"), t("popular.nad.benefit3")],
    },
    {
      icon: Sparkles,
      title: t("popular.glow.title"),
      price: t("popular.glow.price"),
      description: t("popular.glow.desc"),
      benefits: [t("popular.glow.benefit1"), t("popular.glow.benefit2"), t("popular.glow.benefit3")],
    },
    {
      icon: Heart,
      title: t("popular.resveratrol.title"),
      price: t("popular.resveratrol.price"),
      description: t("popular.resveratrol.desc"),
      benefits: [t("popular.resveratrol.benefit1"), t("popular.resveratrol.benefit2"), t("popular.resveratrol.benefit3")],
    },
    {
      icon: Flame,
      title: t("popular.fullDetox.title"),
      price: t("popular.fullDetox.price"),
      description: t("popular.fullDetox.desc"),
      benefits: [t("popular.fullDetox.benefit1"), t("popular.fullDetox.benefit2"), t("popular.fullDetox.benefit3")],
    },
    {
      icon: Heart,
      title: t("popular.liverDetox.title"),
      price: t("popular.liverDetox.price"),
      description: t("popular.liverDetox.desc"),
      benefits: [t("popular.liverDetox.benefit1"), t("popular.liverDetox.benefit2"), t("popular.liverDetox.benefit3")],
    },
    {
      icon: Sparkles,
      title: t("popular.curcumin.title"),
      price: t("popular.curcumin.price"),
      description: t("popular.curcumin.desc"),
      benefits: [t("popular.curcumin.benefit1"), t("popular.curcumin.benefit2"), t("popular.curcumin.benefit3")],
    },
    {
      icon: Zap,
      title: t("popular.nad250.title"),
      price: t("popular.nad250.price"),
      description: t("popular.nad250.desc"),
      benefits: [t("popular.nad250.benefit1"), t("popular.nad250.benefit2"), t("popular.nad250.benefit3")],
    },
  ];

  const bodyBoosterDrips = [
    { title: t("body.nad.title"), price: t("body.nad.price"), tagline: t("body.nad.tagline"), description: t("body.nad.desc") },
    { title: t("body.fatBurner.title"), price: t("body.fatBurner.price"), tagline: t("body.fatBurner.tagline"), description: t("body.fatBurner.desc") },
    { title: t("body.vitalBoost.title"), price: t("body.vitalBoost.price"), tagline: t("body.vitalBoost.tagline"), description: t("body.vitalBoost.desc") },
    { title: t("body.athleteMax.title"), price: t("body.athleteMax.price"), tagline: t("body.athleteMax.tagline"), description: t("body.athleteMax.desc") },
    { title: t("body.partyShield.title"), price: t("body.partyShield.price"), tagline: t("body.partyShield.tagline"), description: t("body.partyShield.desc") },
    { title: t("body.hangover.title"), price: t("body.hangover.price"), tagline: t("body.hangover.tagline"), description: t("body.hangover.desc") },
  ];

  const brainBoosterDrips = [
    { title: t("brain.timeZone.title"), price: t("brain.timeZone.price"), tagline: t("brain.timeZone.tagline"), description: t("brain.timeZone.desc") },
    { title: t("brain.stressEase.title"), price: t("brain.stressEase.price"), tagline: t("brain.stressEase.tagline"), description: t("brain.stressEase.desc") },
    { title: t("brain.neuroBoost.title"), price: t("brain.neuroBoost.price"), tagline: t("brain.neuroBoost.tagline"), description: t("brain.neuroBoost.desc") },
    { title: t("brain.dreamEase.title"), price: t("brain.dreamEase.price"), tagline: t("brain.dreamEase.tagline"), description: t("brain.dreamEase.desc") },
  ];

  const skinBoosterDrips = [
    { title: t("skin.glowVita.title"), price: t("skin.glowVita.price"), tagline: t("skin.glowVita.tagline"), description: t("skin.glowVita.desc") },
    { title: t("skin.glowRestore.title"), price: t("skin.glowRestore.price"), tagline: t("skin.glowRestore.tagline"), description: t("skin.glowRestore.desc") },
    { title: t("skin.glowRevive.title"), price: t("skin.glowRevive.price"), tagline: t("skin.glowRevive.tagline"), description: t("skin.glowRevive.desc") },
  ];

  const CategoryAccordion = ({ 
    drips, 
    categoryId 
  }: { 
    drips: typeof bodyBoosterDrips; 
    categoryId: string;
  }) => (
    <Accordion type="single" collapsible className="space-y-3">
      {drips.map((drip, index) => (
        <AccordionItem
          key={index}
          value={`${categoryId}-${index}`}
          className="bg-secondary/50 border-none rounded-xl px-6"
        >
          <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
            <span>
              {drip.title} - <span className="font-bold">{drip.price}</span>{" "}
              <span className="text-muted-foreground font-normal">({drip.tagline})</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
            {drip.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("services.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("services.subtitle")}{" "}
            <strong>{t("services.subtitleBold")}</strong>
          </p>
        </div>

        {/* Popular Drips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {popularDrips.map((drip, index) => (
            <Card
              key={index}
              className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-border ring-2 ring-primary/20"
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-medical flex items-center justify-center group-hover:scale-110 transition-transform">
                    <drip.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-bold text-primary">{drip.price}</span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{drip.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{drip.description}</p>

                <ul className="space-y-2 mb-4">
                  {drip.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Button 
                  id={`ivclick-popular-${index}`} 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => trackButtonClick(`ivclick-popular-${index}`)}
                  asChild
                >
                  <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t("services.chatWithUs")}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All IV Drips Section */}
        <div className="text-center mb-8">
          <p className="text-lg text-muted-foreground">
            {t("services.discoverMore")}
          </p>
        </div>

        {/* Body Booster Category */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-medical flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">{t("services.bodyBooster")}</h3>
          </div>
          <CategoryAccordion drips={bodyBoosterDrips} categoryId="body" />
        </div>

        {/* Brain Booster Category */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-medical flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">{t("services.brainBooster")}</h3>
          </div>
          <CategoryAccordion drips={brainBoosterDrips} categoryId="brain" />
        </div>

        {/* Skin Booster Category */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-medical flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">{t("services.skinBooster")}</h3>
          </div>
          <CategoryAccordion drips={skinBoosterDrips} categoryId="skin" />
        </div>

        {/* Book Now CTA */}
        <div className="text-center mt-8">
          <Button 
            id="ivclick-services-book" 
            size="lg" 
            onClick={() => trackButtonClick('ivclick-services-book')}
            asChild
          >
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" />
              {t("nav.bookNow")}
            </a>
          </Button>
        </div>

        {/* Talk to us CTA */}
        <div className="text-center mt-12 bg-card border border-border rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {t("services.notSure")}
          </h3>
          <p className="text-muted-foreground mb-6">
            {t("services.notSureSubtitle")}
          </p>
          <Button 
            id="ivclick-services-whatsapp" 
            size="lg" 
            onClick={() => trackButtonClick('ivclick-services-whatsapp')}
            asChild
          >
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" />
              {t("services.talkToUs")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
