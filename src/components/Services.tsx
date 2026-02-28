import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Flame, Zap, Sparkles, MessageCircle, Brain, Heart, Activity, Calendar, Package, Users, CheckCircle2, Gift } from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";
import { useLanguage } from "@/lib/i18n";

const DiscountBadge = ({ percent }: { percent: number }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
    -{percent}%
  </span>
);

const Services = () => {
  const { t } = useLanguage();

  const popularDrips = [
    {
      icon: Zap,
      title: t("popular.nad250.title"),
      price: t("popular.nad250.price"),
      description: t("popular.nad250.desc"),
      benefits: [t("popular.nad250.benefit1"), t("popular.nad250.benefit2"), t("popular.nad250.benefit3")],
      footMassage: true,
      cta: "Book My NAD+ Session",
    },
    {
      icon: Flame,
      title: t("popular.fullDetox.title"),
      price: t("popular.fullDetox.price"),
      description: t("popular.fullDetox.desc"),
      benefits: [t("popular.fullDetox.benefit1"), t("popular.fullDetox.benefit2"), t("popular.fullDetox.benefit3")],
      footMassage: true,
      cta: "Start My Detox Protocol",
    },
    {
      icon: Sparkles,
      title: t("popular.curcumin.title"),
      price: t("popular.curcumin.price"),
      description: t("popular.curcumin.desc"),
      benefits: [t("popular.curcumin.benefit1"), t("popular.curcumin.benefit2"), t("popular.curcumin.benefit3")],
      footMassage: true,
      cta: "Book My Curcumin IV",
    },
    {
      icon: Heart,
      title: t("popular.resveratrol.title"),
      price: t("popular.resveratrol.price"),
      description: t("popular.resveratrol.desc"),
      benefits: [t("popular.resveratrol.benefit1"), t("popular.resveratrol.benefit2"), t("popular.resveratrol.benefit3")],
      footMassage: true,
    },
    {
      icon: Zap,
      title: t("popular.nad.title"),
      price: t("popular.nad.price"),
      description: t("popular.nad.desc"),
      benefits: [t("popular.nad.benefit1"), t("popular.nad.benefit2"), t("popular.nad.benefit3")],
    },
    {
      icon: Flame,
      title: t("popular.fatBurner.title"),
      price: t("popular.fatBurner.price"),
      description: t("popular.fatBurner.desc"),
      benefits: [t("popular.fatBurner.benefit1"), t("popular.fatBurner.benefit2"), t("popular.fatBurner.benefit3")],
      discount: 10,
      limited: t("body.fatBurner.limited"),
    },
    {
      icon: Heart,
      title: t("popular.liverDetox.title"),
      price: t("popular.liverDetox.price"),
      description: t("popular.liverDetox.desc"),
      benefits: [t("popular.liverDetox.benefit1"), t("popular.liverDetox.benefit2"), t("popular.liverDetox.benefit3")],
      discount: 10,
      limited: t("body.liverDetox.limited"),
    },
  ];

  const bodyBoosterDrips = [
    { title: t("body.nad.title"), price: t("body.nad.price"), tagline: t("body.nad.tagline"), description: t("body.nad.desc") },
    { title: t("body.nad250.title"), price: t("body.nad250.price"), tagline: t("body.nad250.tagline"), description: t("body.nad250.desc"), footMassage: true },
    { title: t("body.nadResveratrol.title"), price: t("body.nadResveratrol.price"), tagline: t("body.nadResveratrol.tagline"), description: t("body.nadResveratrol.desc"), limited: t("body.nadResveratrol.limited") },
    { title: t("body.fatBurner.title"), price: t("body.fatBurner.price"), tagline: t("body.fatBurner.tagline"), description: t("body.fatBurner.desc"), discount: 10, limited: t("body.fatBurner.limited") },
    { title: t("body.vitalBoost.title"), price: t("body.vitalBoost.price"), tagline: t("body.vitalBoost.tagline"), description: t("body.vitalBoost.desc"), discount: 10, limited: t("body.vitalBoost.limited") },
    { title: t("body.athletePro.title"), price: t("body.athletePro.price"), tagline: t("body.athletePro.tagline"), description: t("body.athletePro.desc"), discount: 10, limited: t("body.athletePro.limited") },
    { title: t("body.athleteProMax.title"), price: t("body.athleteProMax.price"), tagline: t("body.athleteProMax.tagline"), description: t("body.athleteProMax.desc"), footMassage: true },
    { title: t("body.resveratrol.title"), price: t("body.resveratrol.price"), tagline: t("body.resveratrol.tagline"), description: t("body.resveratrol.desc"), footMassage: true },
    { title: t("body.vitaminD.title"), price: t("body.vitaminD.price"), tagline: t("body.vitaminD.tagline"), description: t("body.vitaminD.desc"), discount: 10, limited: t("body.vitaminD.limited") },
    { title: t("body.liverDetox.title"), price: t("body.liverDetox.price"), tagline: t("body.liverDetox.tagline"), description: t("body.liverDetox.desc"), discount: 10, limited: t("body.liverDetox.limited") },
    { title: t("body.curcumin.title"), price: t("body.curcumin.price"), tagline: t("body.curcumin.tagline"), description: t("body.curcumin.desc"), footMassage: true },
    { title: t("body.proGut.title"), price: t("body.proGut.price"), tagline: t("body.proGut.tagline"), description: t("body.proGut.desc"), footMassage: true },
    { title: t("body.fullDetox.title"), price: t("body.fullDetox.price"), tagline: t("body.fullDetox.tagline"), description: t("body.fullDetox.desc"), footMassage: true },
    { title: t("body.cMax.title"), price: t("body.cMax.price"), tagline: t("body.cMax.tagline"), description: t("body.cMax.desc"), discount: 10, limited: t("body.cMax.limited") },
    { title: t("body.partyShield.title"), price: t("body.partyShield.price"), tagline: t("body.partyShield.tagline"), description: t("body.partyShield.desc"), discount: 10, limited: t("body.partyShield.limited") },
    { title: t("body.hangover.title"), price: t("body.hangover.price"), tagline: t("body.hangover.tagline"), description: t("body.hangover.desc"), discount: 10, limited: t("body.hangover.limited") },
  ];

  const brainBoosterDrips = [
    { title: t("brain.timeZone.title"), price: t("brain.timeZone.price"), tagline: t("brain.timeZone.tagline"), description: t("brain.timeZone.desc"), discount: 10, limited: t("brain.timeZone.limited") },
    { title: t("brain.stressEase.title"), price: t("brain.stressEase.price"), tagline: t("brain.stressEase.tagline"), description: t("brain.stressEase.desc"), discount: 10, limited: t("brain.stressEase.limited") },
    { title: t("brain.neuroBoost.title"), price: t("brain.neuroBoost.price"), tagline: t("brain.neuroBoost.tagline"), description: t("brain.neuroBoost.desc"), discount: 10, limited: t("brain.neuroBoost.limited") },
    { title: t("brain.dreamEase.title"), price: t("brain.dreamEase.price"), tagline: t("brain.dreamEase.tagline"), description: t("brain.dreamEase.desc"), discount: 10, limited: t("brain.dreamEase.limited") },
  ];

  const skinBoosterDrips = [
    { title: t("skin.glowVita.title"), price: t("skin.glowVita.price"), tagline: t("skin.glowVita.tagline"), description: t("skin.glowVita.desc"), discount: 10, limited: t("skin.glowVita.limited") },
    { title: t("skin.glowRestore.title"), price: t("skin.glowRestore.price"), tagline: t("skin.glowRestore.tagline"), description: t("skin.glowRestore.desc"), footMassage: true },
    { title: t("skin.glowRevive.title"), price: t("skin.glowRevive.price"), tagline: t("skin.glowRevive.tagline"), description: t("skin.glowRevive.desc") },
  ];

  const packages = [
    {
      id: "fat-burner-5",
      saveBadge: "Save 22%",
      icon: Flame,
      title: t("package.fatBurner5.title"),
      subtitle: t("package.fatBurner5.subtitle"),
      price: t("package.fatBurner5.price"),
      pricePerSession: t("package.fatBurner5.pricePerSession"),
      desc: t("package.fatBurner5.desc"),
      highlight: t("package.fatBurner5.highlight"),
      benefits: [t("package.fatBurner5.benefit1"), t("package.fatBurner5.benefit2"), t("package.fatBurner5.benefit3"), t("package.fatBurner5.benefit4")],
      outcomes: [t("package.fatBurner5.outcome1"), t("package.fatBurner5.outcome2"), t("package.fatBurner5.outcome3"), t("package.fatBurner5.outcome4")],
    },
    {
      id: "fat-burner-10",
      icon: Flame,
      saveBadge: "Save 33%",
      title: t("package.fatBurner10.title"),
      subtitle: t("package.fatBurner10.subtitle"),
      price: t("package.fatBurner10.price"),
      pricePerSession: t("package.fatBurner10.pricePerSession"),
      desc: t("package.fatBurner10.desc"),
      highlight: t("package.fatBurner10.highlight"),
      bonus: t("package.fatBurner10.bonus"),
      benefits: [t("package.fatBurner10.benefit1"), t("package.fatBurner10.benefit2"), t("package.fatBurner10.benefit3"), t("package.fatBurner10.benefit4")],
      outcomes: [t("package.fatBurner10.outcome1"), t("package.fatBurner10.outcome2"), t("package.fatBurner10.outcome3"), t("package.fatBurner10.outcome4")],
    },
    {
      id: "nad-5",
      icon: Zap,
      title: t("package.nad5.title"),
      subtitle: t("package.nad5.subtitle"),
      price: t("package.nad5.price"),
      pricePerSession: t("package.nad5.pricePerSession"),
      desc: t("package.nad5.desc"),
      highlight: t("package.nad5.highlight"),
      bonus: t("package.nad5.bonus"),
      benefits: [t("package.nad5.benefit1"), t("package.nad5.benefit2"), t("package.nad5.benefit3"), t("package.nad5.benefit4")],
      outcomes: [t("package.nad5.outcome1"), t("package.nad5.outcome2"), t("package.nad5.outcome3"), t("package.nad5.outcome4")],
    },
  ];

  const CategoryAccordion = ({ 
    drips, 
    categoryId 
  }: { 
    drips: typeof bodyBoosterDrips; 
    categoryId: string;
  }) => (
    <Accordion type="single" collapsible className="space-y-3">
      {drips.map((drip, index) => {
        const hasStrikePrice = drip.price.includes("→");
        const [oldPrice, newPrice] = hasStrikePrice ? drip.price.split("→").map(s => s.trim()) : [null, drip.price];
        return (
          <AccordionItem
            key={index}
            value={`${categoryId}-${index}`}
            className="bg-secondary/50 border-none rounded-xl px-6"
          >
            <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
              <span className="flex items-center gap-2 flex-wrap">
                {drip.title} -{" "}
                {hasStrikePrice ? (
                  <>
                    <span className="line-through text-muted-foreground font-normal">{oldPrice}</span>
                    <span className="font-bold text-primary">{newPrice}</span>
                  </>
                ) : (
                  <span className="font-bold">{drip.price}</span>
                )}
                {" "}
                <span className="text-muted-foreground font-normal">({drip.tagline})</span>
                {drip.discount && <DiscountBadge percent={drip.discount} />}
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
              {drip.description}
              {drip.limited && (
                <p className="mt-2 text-sm font-semibold text-primary italic">{drip.limited}</p>
              )}
              {drip.footMassage && (
                <div className="mt-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm">
                    <Gift className="h-3 w-3" />
                    Complimentary Foot Massage
                  </span>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
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
              className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-border ring-2 ring-primary/20 relative overflow-hidden"
            >
              {drip.discount && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-sm">
                    -{drip.discount}%
                  </span>
                </div>
              )}
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-medical flex items-center justify-center group-hover:scale-110 transition-transform">
                    <drip.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  {drip.price.includes("→") ? (
                    <div className="text-right">
                      <span className="line-through text-muted-foreground text-sm">{drip.price.split("→")[0].trim()}</span>
                      <span className="block text-lg font-bold text-primary">{drip.price.split("→")[1].trim()}</span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-primary">{drip.price}</span>
                  )}
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

                {drip.limited && (
                  <p className="text-xs font-semibold text-primary italic mb-4">{drip.limited}</p>
                )}

                {drip.footMassage && (
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm">
                      <Gift className="h-3 w-3" />
                      Complimentary Foot Massage
                    </span>
                  </div>
                )}

                <Button 
                  id={`ivclick-popular-${index}`} 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => trackButtonClick(`ivclick-popular-${index}`)}
                  asChild
                >
                  <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {drip.cta || t("services.chatWithUs")}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Wellness Packages Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider mb-4">
              {t("services.wellnessPackages")}
            </span>
          </div>
          
          <div className="space-y-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className="relative bg-gradient-to-br from-primary/5 via-card to-accent/5 border-2 border-primary/20 rounded-2xl p-8 md:p-10 overflow-hidden">
                {/* Save badge */}
                {pkg.saveBadge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-sm">
                      {pkg.saveBadge}
                    </span>
                  </div>
                )}
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-medical opacity-10 rounded-bl-[100px]" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                  {/* Left: Title & Description */}
                  <div>
                    {/* Highlight */}
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 flex items-center gap-2 mb-4">
                      <span className="text-primary text-lg">⭐</span>
                      <p className="text-sm font-semibold text-primary">{pkg.highlight}</p>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {pkg.title}
                    </h3>
                    <p className="text-primary font-semibold mb-3">{pkg.subtitle}</p>
                    <p className="text-muted-foreground mb-4">{pkg.desc}</p>

                    {pkg.bonus && (
                      <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 flex items-center gap-2 mb-5">
                        <Gift className="h-4 w-4 text-accent" />
                        <p className="text-sm font-semibold text-foreground">{pkg.bonus}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                      {pkg.benefits.map((b, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          <Activity className="h-3 w-3 mr-1.5" />
                          {b}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-2xl md:text-3xl font-bold text-primary">{pkg.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{pkg.pricePerSession}</p>

                    <Button
                      id={`ivclick-package-${pkg.id}`}
                      size="lg"
                      onClick={() => trackButtonClick(`ivclick-package-${pkg.id}`)}
                      asChild
                    >
                      <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        {t("services.bookMedicalReview")}
                      </a>
                    </Button>
                  </div>

                  {/* Right: Outcomes */}
                  <div className="space-y-5">
                    <div className="bg-primary/5 border border-primary/15 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-foreground text-sm">{t("pathway.vitalReset.outcomeTitle")}</h4>
                      </div>
                      <ul className="space-y-2">
                        {pkg.outcomes.map((o, i) => (
                          <li key={i} className="flex items-center text-xs text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2 flex-shrink-0" />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vitality Pathway - Premium Program */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider mb-4">
              {t("services.vitalityPathway")}
            </span>
          </div>
          <div className="relative bg-gradient-to-br from-primary/5 via-card to-accent/5 border-2 border-primary/20 rounded-2xl p-8 md:p-10 overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-medical opacity-10 rounded-bl-[100px]" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              {/* Left: Title & Description */}
              <div>
                {/* Doctor Recommendation Highlight - Top */}
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 flex items-center gap-2 mb-4">
                  <span className="text-primary text-lg">⭐</span>
                  <p className="text-sm font-semibold text-primary">{t("pathway.vitalReset.nadHighlight")}</p>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {t("pathway.vitalReset.title")}
                </h3>
                <p className="text-primary font-semibold mb-3">{t("pathway.vitalReset.subtitle")}</p>
                <p className="text-muted-foreground mb-4">{t("pathway.vitalReset.desc")}</p>

                {/* Ideal For - Persona Block */}
                <div className="bg-secondary/60 rounded-lg p-4 mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground text-sm">{t("pathway.vitalReset.idealFor")}</h4>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {[t("pathway.vitalReset.persona1"), t("pathway.vitalReset.persona2"), t("pathway.vitalReset.persona3"), t("pathway.vitalReset.persona4")].map((p, i) => (
                      <li key={i} className="flex items-center text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {[t("pathway.vitalReset.benefit1"), t("pathway.vitalReset.benefit2"), t("pathway.vitalReset.benefit3"), t("pathway.vitalReset.benefit4")].map((b, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      <Activity className="h-3 w-3 mr-1.5" />
                      {b}
                    </span>
                  ))}
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-2xl md:text-3xl font-bold text-primary">{t("pathway.vitalReset.price")}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{t("pathway.vitalReset.duration")}</p>

                <Button
                  id="ivclick-vital-reset"
                  size="lg"
                  onClick={() => trackButtonClick('ivclick-vital-reset')}
                  asChild
                >
                  <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {t("services.bookMedicalReview")}
                  </a>
                </Button>
              </div>

              {/* Right: Protocol Details */}
              <div className="space-y-5">
                {/* Protocol */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground text-sm">{t("pathway.vitalReset.protocol")}</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      { day: t("pathway.vitalReset.day1"), desc: t("pathway.vitalReset.day1Desc") },
                      { day: t("pathway.vitalReset.day3"), desc: t("pathway.vitalReset.day3Desc") },
                      { day: t("pathway.vitalReset.day5"), desc: t("pathway.vitalReset.day5Desc") },
                    ].map((step, i) => (
                      <div key={i} className="bg-secondary/50 rounded-lg p-3">
                        <p className="font-medium text-foreground text-sm">{step.day}</p>
                        <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Take-Home */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground text-sm">{t("pathway.vitalReset.takeHome")}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">{t("pathway.vitalReset.takeHomeDesc")}</p>
                </div>

                {/* What Most Clients Report - Outcome Frame */}
                <div className="bg-primary/5 border border-primary/15 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground text-sm">{t("pathway.vitalReset.outcomeTitle")}</h4>
                  </div>
                  <ul className="space-y-2">
                    {[t("pathway.vitalReset.outcome1"), t("pathway.vitalReset.outcome2"), t("pathway.vitalReset.outcome3"), t("pathway.vitalReset.outcome4")].map((o, i) => (
                      <li key={i} className="flex items-center text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2 flex-shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
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

        {/* Medical Review CTA */}
        <div className="text-center mt-12 bg-card border border-border rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {t("services.notSure")}
          </h3>
          <p className="text-muted-foreground mb-6">
            {t("services.notSureSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              id="ivclick-services-book-review" 
              size="lg" 
              onClick={() => trackButtonClick('ivclick-services-book-review')}
              asChild
            >
              <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                {t("services.bookMedicalReview")}
              </a>
            </Button>
            <Button 
              id="ivclick-services-concierge" 
              variant="ghost" 
              size="lg" 
              onClick={() => trackButtonClick('ivclick-services-concierge')}
              asChild
            >
              <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                {t("services.speakConcierge")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
