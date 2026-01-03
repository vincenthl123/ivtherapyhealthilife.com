import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Flame, Zap, Sparkles, MessageCircle, Brain, Heart, Droplets } from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";

const popularDrips = [
  {
    icon: Flame,
    title: "Fat Burner IV Therapy",
    price: "4,500 THB",
    description:
      "Ignite your metabolism and accelerate fat burning. Packed with L-Carnitine, CLA, B-complex vitamins, and antioxidants to boost energy, detoxify your body, and target stubborn fat.",
    benefits: ["Accelerate fat burning", "Boost energy", "Detoxify liver"],
  },
  {
    icon: Zap,
    title: "NAD+ IV Therapy",
    price: "6,900 THB",
    description:
      "Boost energy, repair cells, slow aging, and enhance brain power. Delivering NAD+ directly into your bloodstream for cellular health and cognitive enhancement.",
    benefits: ["Cellular health", "Anti-aging", "Mental clarity"],
  },
  {
    icon: Sparkles,
    title: "Glow Revive IV Therapy",
    price: "12,000 THB",
    description:
      "Revitalize your skin with placenta extract for a brighter glow, firmer texture, and lasting youthfulness. Premium anti-aging skin treatment.",
    benefits: ["Firms & lifts skin", "Improves elasticity", "Radiant glow"],
  },
];

const bodyBoosterDrips = [
  {
    title: "NAD+ IV",
    price: "6,900 THB",
    tagline: "Cellular health, boosts energy, anti-aging",
    description: "Elevate your energy, mental clarity, and vitality with this advanced IV treatment. Delivering Nicotinamide Adenine Dinucleotide (NAD+) directly into your bloodstream, it restores cellular health, boosts energy, enhances cognitive focus, supports anti-aging, and accelerates athletic recovery. Experience detoxification and rejuvenation within 24–48 hours, with lasting benefits from regular sessions.",
  },
  {
    title: "Fat Burner IV",
    price: "4,500 THB",
    tagline: "Accelerate fat burning, detox",
    description: "Ignite your metabolism and accelerate fat burning with our scientifically formulated IV drip. Packed with essential nutrients like L-Carnitine, CLA, B-complex vitamins, and antioxidants, this therapy boosts energy, detoxifies your body, supports muscle recovery, and targets stubborn fat for effective, long-lasting results. Perfect for anyone seeking enhanced weight loss, sustained stamina, and faster recovery.",
  },
  {
    title: "Vital Boost / Myer's Cocktail IV",
    price: "4,500 THB",
    tagline: "Energy boost, strengthens immunity, reduces stress",
    description: "Recharge instantly with Vital Boost IV – a powerful blend of vitamins to fight fatigue, boost immunity, and restore total body balance. The original Myer's Cocktail formula enhanced for maximum effectiveness.",
  },
  {
    title: "Athlete Max IV",
    price: "4,500 THB",
    tagline: "Speeds recovery, enhances endurance, replenishes nutrients",
    description: "Fuel muscle growth, speed up recovery, and elevate performance with our Athlete Max IV – advanced amino acids + vitamin infusion designed for active lifestyles and peak performance.",
  },
  {
    title: "Party Shield IV",
    price: "4,500 THB",
    tagline: "Rehydrates body, restores energy, supports liver detox",
    description: "Pre-party protection in a drip – boost energy, hydrate deeply, and stay energized all night with Party Shield IV Therapy. Prepare your body before a big night out.",
  },
  {
    title: "Hangover IV",
    price: "4,500 THB",
    tagline: "Reduces nausea, relieves headache, fast rehydration",
    description: "Rapid hangover relief – rehydrate, eliminate toxins, and detox your liver in one powerful, refreshing IV drip. Feel better fast and get back to your day.",
  },
];

const brainBoosterDrips = [
  {
    title: "Time Zone IV",
    price: "4,500 THB",
    tagline: "Fights jet lag, restores energy, reduces fatigue",
    description: "Rehydrate, recharge, and reset your body with a tailored blend to combat fatigue, restore energy, and ease travel recovery. Perfect for frequent travelers and jet lag relief.",
  },
  {
    title: "Stress Ease IV",
    price: "4,500 THB",
    tagline: "Calms the nervous system, lowers stress, improves mood",
    description: "Recharge your mind and body with a soothing blend of nutrients designed to relieve stress, restore balance, and promote relaxation. Ideal for high-stress lifestyles.",
  },
  {
    title: "Neuro Boost IV",
    price: "4,500 THB",
    tagline: "Improves focus, enhances memory, boosts cognitive function",
    description: "Unlock Your Brain's Full Potential. Experience sharper focus, enhanced memory, and improved cognitive function with our powerful neuro-enhancing vitamin infusion.",
  },
  {
    title: "Dream Ease IV",
    price: "4,500 THB",
    tagline: "Improves sleep quality, relaxes body & mind, restores balance",
    description: "A premium infusion designed to soothe your mind, relax your body, and unlock the rejuvenating power of deep, restorative sleep. Wake up refreshed and renewed.",
  },
];

const skinBoosterDrips = [
  {
    title: "Glow Vita IV",
    price: "4,500 THB",
    tagline: "Hydrates skin deeply, brightens complexion, restores natural glow",
    description: "Brighten your skin with nutrients that boost hydration, enhance collagen production, and reveal your natural glow. The perfect introduction to skin-boosting IV therapy.",
  },
  {
    title: "Glow Restore IV",
    price: "8,500 THB",
    tagline: "Repairs skin damage, boosts collagen, reduces fine lines",
    description: "A powerful infusion of potent antioxidants to brighten, protect, and rejuvenate your skin. Ideal for repairing sun damage and reducing visible signs of aging.",
  },
  {
    title: "Glow Revive IV",
    price: "12,000 THB",
    tagline: "Firms and lifts skin, improves elasticity, delivers radiant anti-aging effect",
    description: "Revitalize your skin with placenta extract for a brighter glow, firmer texture, and lasting youthfulness. Our premium anti-aging skin treatment for maximum results.",
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
                    Chat with Us
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All IV Drips Section */}
        <div className="text-center mb-8">
          <p className="text-lg text-muted-foreground">
            Discover more than 21 IV drips tailored for your wellness needs
          </p>
        </div>

        {/* Body Booster Category */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-medical flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">BODY BOOSTER IV</h3>
          </div>
          <CategoryAccordion drips={bodyBoosterDrips} categoryId="body" />
        </div>

        {/* Brain Booster Category */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-medical flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">BRAIN BOOSTER</h3>
          </div>
          <CategoryAccordion drips={brainBoosterDrips} categoryId="brain" />
        </div>

        {/* Skin Booster Category */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-medical flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">SKIN BOOSTER</h3>
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
            <a href="https://healthilife.fillout.com/ivtherapy" target="_blank" rel="noopener noreferrer">
              Book Now
            </a>
          </Button>
        </div>

        {/* Talk to us CTA */}
        <div className="text-center mt-12 bg-card border border-border rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Not Sure Which IV Drip is Right for You?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our medical team will help you choose the perfect IV therapy for your needs.
          </p>
          <Button 
            id="ivclick-services-whatsapp" 
            size="lg" 
            onClick={() => trackButtonClick('ivclick-services-whatsapp')}
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
