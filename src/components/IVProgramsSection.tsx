import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Sparkles, Crown, Check, CheckCircle2, Gift, Activity, MessageCircle, LucideIcon } from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";
import { Price } from "@/lib/currency";
import { buildWaUrl } from "@/lib/whatsapp";

// ============================================================================
// IV Therapy Programs — 3 curated multi-day programs.
// Card chrome cloned from MembershipSection.tsx (floating tag, icon+price row,
// benefit list, CTA). Inner elements (benefit chips, "What Most Clients Report"
// box, gift perk strip, ⭐ badge) reuse the exact tokens used in Services.tsx.
// ============================================================================

// ----------------------------------------------------------------------------
// COPY v1 — à valider par Vincent
// Tous les champs subtitle / description / footMassageNote / benefits /
// reportTitle / reports ci-dessous sont une première proposition rédactionnelle.
// Conformité: AUCUNE promesse médicale / de traitement. Les puces "What Most
// Clients Report" restent expérientielles ("report feeling…"). Ne PAS modifier
// les libellés "What Most Clients Report" ni "Book Your Medical Review".
// Find/replace ici pour la version finale.
// ----------------------------------------------------------------------------

type Program = {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  perkStrip: boolean;
  badge?: string;
  benefits: string[];
  reportTitle: string;
  reports: string[];
  popular?: boolean;
};

const programs: Program[] = [
  {
    id: "iv-program-nad-renewal",
    icon: Zap,
    eyebrow: "3 DAYS · 500MG NAD+ TOTAL",
    title: "NAD+ Renewal",
    subtitle: "A measured cellular reset over three days",
    description:
      "A three-day NAD+ course delivering 500mg total, paced for comfort and supervised throughout by our medical team.",
    price: "from 30,000 THB",
    perkStrip: true,
    benefits: ["NAD+ 500mg total", "3 supervised sessions", "Medical review included", "Hydration support"],
    reportTitle: "What Most Clients Report",
    reports: [
      "Report feeling steadier daily energy",
      "Report sharper focus through the day",
      "Report a calmer, more rested feeling",
    ],
  },
  {
    id: "iv-program-amazing-boost",
    icon: Sparkles,
    eyebrow: "3 DAYS · EXOSOME 50B + PLACENTA + PERSONALIZED IV",
    title: "Amazing Boost",
    subtitle: "Our most chosen three-day signature program",
    description:
      "A curated three-day program combining 50 billion exosomes, placenta and a personalized IV, designed around your medical review.",
    price: "from 60,000 THB",
    perkStrip: true,
    badge: "⭐ Most Chosen",
    popular: true,
    benefits: ["Exosome 50 billion", "Placenta complex", "Personalized IV", "Medical review included"],
    reportTitle: "What Most Clients Report",
    reports: [
      "Report feeling more energy day to day",
      "Report a refreshed, revitalized feeling",
      "Report better recovery after effort",
    ],
  },
  {
    id: "iv-program-super-boost",
    icon: Crown,
    eyebrow: "3 DAYS · NEUROEXOSOME 50B + PLACENTA + 3 PERSONALIZED IVS",
    title: "Super Boost",
    subtitle: "Our most complete three-day program",
    description:
      "Our most comprehensive three-day program: 50 billion neuroexosomes, placenta and three personalized IVs, fully supervised.",
    price: "from 100,000 THB",
    perkStrip: false,
    benefits: ["Neuroexosome 50 billion", "Placenta complex", "3 personalized IVs", "Medical review included"],
    reportTitle: "What Most Clients Report",
    reports: [
      "Report feeling sharper mental focus",
      "Report sustained energy across the program",
      "Report feeling restored and recovered",
    ],
  },
];

const IVProgramsSection = () => {
  return (
    <section id="iv-programs" className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            IV Therapy Programs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {/* COPY v1 — à valider par Vincent */}
            Curated multi-day IV programs
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {/* COPY v1 — à valider par Vincent */}
            Three structured three-day programs, each built around a medical review and supervised
            from the first session to the last.
          </p>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <Card
                key={program.id}
                className={`relative overflow-visible transition-all duration-300 hover:-translate-y-1 ${
                  program.popular
                    ? "ring-2 ring-primary shadow-strong md:scale-[1.03]"
                    : "border-border hover:shadow-medium"
                }`}
              >
                {/* Floating badge — card 2 only */}
                {program.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap bg-primary text-primary-foreground">
                      {program.badge}
                    </span>
                  </div>
                )}

                <CardContent className="p-6 md:p-8 pt-8 flex flex-col h-full">
                  {/* Eyebrow */}
                  <span className="block text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-primary mb-3">
                    {program.eyebrow}
                  </span>

                  {/* Icon + Price */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-medical flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl md:text-3xl font-bold text-primary leading-tight">
                        <Price value={program.price.replace(/^from\s+/i, "")} />
                      </span>
                      <span className="text-xs text-muted-foreground">from</span>
                    </div>
                  </div>

                  {/* Title + Subtitle */}
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                    {program.title}
                  </h3>
                  <p className="text-sm text-primary font-semibold mb-3">
                    {program.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {program.description}
                  </p>

                  {/* Perk strip — cards 1 & 2 only */}
                  {program.perkStrip && (
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-2.5 flex items-center gap-2 mb-4">
                      <Gift className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                      <p className="text-xs font-semibold text-foreground">
                        Complimentary Foot Massage included
                      </p>
                    </div>
                  )}

                  {/* Benefit chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {program.benefits.map((b, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        <Activity className="h-3 w-3 mr-1" />
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* What Most Clients Report */}
                  <div className="bg-primary/5 border border-primary/15 rounded-lg p-3 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      <h4 className="font-semibold text-foreground text-xs">{program.reportTitle}</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {program.reports.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Button
                    id={`ivclick-${program.id}`}
                    variant={program.popular ? "default" : "outline"}
                    className="w-full mt-auto"
                    onClick={() => trackButtonClick(`ivclick-${program.id}`)}
                    asChild
                  >
                    <a href={buildWaUrl({ source: "protocol", protocolName: program.title })} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Book Your Medical Review
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IVProgramsSection;
