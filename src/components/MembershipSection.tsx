import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Heart, Shield, Check, MessageCircle, Phone, LucideIcon } from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";

type Tier = {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  price: number;
  headline: string;
  benefits: string[];
  cta: string;
  popular?: boolean;
};

const tiers: Tier[] = [
  {
    id: "membership-resident",
    icon: Leaf,
    tag: "🟢 Entry membership",
    title: "Resident",
    price: 50000,
    headline: "Enter the house. Begin the relationship.",
    benefits: [
      "10% member rate on all Recovery & Performance",
      "฿50,000 treatment credit (12 months)",
      "Health Check-Up (value ฿8,900)",
    ],
    cta: "Enquire about Resident",
  },
  {
    id: "membership-patron",
    icon: Heart,
    tag: "🔥 Best Seller",
    title: "Patron",
    price: 100000,
    headline: "The signature membership — most chosen.",
    benefits: [
      "15% member rate on all Recovery & Performance",
      "฿100,000 treatment credit (12 months)",
      "Health Check-Up (value ฿19,900)",
      "Longevity Consultation with Dr. Petch (฿10,000)",
    ],
    cta: "Enquire about Patron",
    popular: true,
  },
  {
    id: "membership-founding",
    icon: Shield,
    tag: "✦ Founding circle",
    title: "Founding Member",
    price: 300000,
    headline: "The full house experience, from arrival to interpretation.",
    benefits: [
      "20% member rate on all Recovery & Performance",
      "฿300,000 treatment credit (12 months)",
      "Health Check-Up (value ฿39,900)",
      "Consultation with Dr. Petch (฿10,000)",
      "Airport fast-track + transfer to the house (฿10,000)",
    ],
    cta: "Enquire about Founding",
  },
];

const buildWa = (title: string, price: number) =>
  `https://wa.me/66919991744?text=${encodeURIComponent(
    `Hello Healthi-Life — I'm interested in the ${title} membership (฿${price.toLocaleString("en-US")}).\nRef: HL-MEMBERSHIP`,
  )}`;

const MembershipSection = () => {
  return (
    <section id="membership" className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Membership · 12 months
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Membership into the house
          </h2>
          <p className="text-primary font-semibold mb-5">
            The Urban Longevity House — Ekkamai, Bangkok
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Longevity is not a single visit — it is a relationship. For twelve months, membership opens the house to you: a member rate on every Recovery &amp; Performance treatment, a treatment credit equal to your membership, and privileges chosen for how you actually live.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <Card
                key={tier.id}
                className={`relative overflow-visible transition-all duration-300 hover:-translate-y-1 ${
                  tier.popular
                    ? "ring-2 ring-primary shadow-strong md:scale-[1.03]"
                    : "border-border hover:shadow-medium"
                }`}
              >
                {/* Floating tag */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap ${
                      tier.popular
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground border border-border"
                    }`}
                  >
                    {tier.tag}
                  </span>
                </div>

                <CardContent className="p-6 md:p-8 pt-8 flex flex-col h-full">
                  {/* Icon + Price */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-medical flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl md:text-3xl font-bold text-primary leading-tight">
                        ฿{tier.price.toLocaleString("en-US")}
                      </span>
                      <span className="text-xs text-muted-foreground">12 months</span>
                    </div>
                  </div>

                  {/* Title + Headline */}
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    {tier.title}
                  </h3>
                  <p className="text-sm text-muted-foreground italic mb-5">
                    {tier.headline}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2.5 mb-6 flex-grow">
                    {tier.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    id={tier.id}
                    variant={tier.popular ? "default" : "outline"}
                    className="w-full mt-auto"
                    asChild
                  >
                    <a
                      href={buildWa(tier.title, tier.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {tier.cta}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer encart */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-16">
          <div className="bg-gradient-to-br from-primary/5 via-card to-accent/5 border border-primary/20 rounded-2xl p-6 md:p-8">
            <p className="text-foreground text-sm md:text-base leading-relaxed mb-4">
              <strong className="text-primary">The Longevity Consultation</strong> — with Dr. Petch, Longevity &amp; Functional Medicine. Explore your energy, sleep, stress, hormones, recovery and overall health. The starting point of a structured roadmap built around your biology.
            </p>
            <p className="text-xs md:text-sm text-muted-foreground italic mb-5">
              Member rate applies to all Recovery &amp; Performance treatments. Excludes blood tests.
            </p>
            <p className="text-center text-base md:text-lg font-semibold text-foreground tracking-wide mb-4">
              Come for the recovery. Stay for the longevity.
            </p>
            <div className="text-center">
              <a
                id="ivclick-membership-phone"
                href="tel:+66919991744"
                onClick={() => trackButtonClick('ivclick-membership-phone')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-primary" />
                Speak to a membership advisor: +66 (0)9 1999 1744
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
