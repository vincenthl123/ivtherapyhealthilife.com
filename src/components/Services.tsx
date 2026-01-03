import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Zap, Sparkles, Dumbbell, PartyPopper, Brain, MessageCircle } from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";

const popularDrips = [
  {
    icon: Flame,
    title: "Fat Burner IV Therapy",
    price: "4,500 THB",
    description:
      "Ignite your metabolism and accelerate fat burning. Packed with L-Carnitine, CLA, B-complex vitamins, and antioxidants to boost energy, detoxify your body, and target stubborn fat.",
    benefits: ["Accelerate fat burning", "Boost energy", "Detoxify liver"],
    highlight: true,
  },
  {
    icon: Zap,
    title: "NAD+ IV Therapy",
    price: "6,900 THB",
    description:
      "Boost energy, repair cells, slow aging, and enhance brain power. Delivering NAD+ directly into your bloodstream for cellular health and cognitive enhancement.",
    benefits: ["Cellular health", "Anti-aging", "Mental clarity"],
    highlight: true,
  },
  {
    icon: Sparkles,
    title: "Glow Revive IV Therapy",
    price: "12,000 THB",
    description:
      "Revitalize your skin with placenta extract for a brighter glow, firmer texture, and lasting youthfulness. Premium anti-aging skin treatment.",
    benefits: ["Firms & lifts skin", "Improves elasticity", "Radiant glow"],
    highlight: true,
  },
  {
    icon: Dumbbell,
    title: "Athlete Max IV",
    price: "4,500 THB",
    description:
      "Fuel muscle growth, speed up recovery, and elevate performance with advanced amino acids + vitamin infusion designed for active lifestyles.",
    benefits: ["Speeds recovery", "Enhances endurance", "Replenishes nutrients"],
    highlight: false,
  },
  {
    icon: PartyPopper,
    title: "Hangover IV",
    price: "4,500 THB",
    description:
      "Rapid hangover relief – rehydrate, eliminate toxins, and detox your liver in one powerful, refreshing IV drip. Feel better fast.",
    benefits: ["Fast rehydration", "Relieves headache", "Reduces nausea"],
    highlight: false,
  },
  {
    icon: Brain,
    title: "Neuro Boost IV",
    price: "4,500 THB",
    description:
      "Unlock your brain's full potential. Experience sharper focus, enhanced memory, and improved cognitive function with neuro-enhancing vitamins.",
    benefits: ["Sharper focus", "Enhanced memory", "Mental clarity"],
    highlight: false,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Most Popular IV Therapy
          </h2>
          <p className="text-lg text-muted-foreground">
            Replenish your energy, enhance metabolism, and support detoxification with our targeted IV drips.{" "}
            <strong>Fast, effective results.</strong>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {popularDrips.map((drip, index) => (
            <Card
              key={index}
              className={`group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-border ${
                drip.highlight ? "ring-2 ring-primary/20" : ""
              }`}
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
                  id={`ivclick-service-${index}`} 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => trackButtonClick(`ivclick-service-${index}`)}
                  asChild
                >
                  <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat with Us
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* More Drips CTA */}
        <div className="text-center bg-card border border-border rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Discover More Than 21 IV Drips
          </h3>
          <p className="text-muted-foreground mb-6">
            From Brain Boosters to Skin Boosters, we have the perfect IV therapy for your needs.
          </p>
          <Button 
            id="ivclick-services-cta" 
            size="lg" 
            onClick={() => trackButtonClick('ivclick-services-cta')}
            asChild
          >
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" />
              Talk to Us Directly
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
