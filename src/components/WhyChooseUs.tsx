import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Award, Droplets, Zap, Heart } from "lucide-react";
import treatmentImage from "@/assets/treatment-room.webp";

const features = [
  {
    icon: Droplets,
    title: "100% Absorption",
    description:
      "IV Therapy delivers vitamins, minerals, and antioxidants directly into your bloodstream — allowing your body to absorb them faster and more effectively than oral supplements.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Unlike oral supplements, IV therapy bypasses the digestive system and gives your body exactly what it needs, where it needs it, fast. Feel the difference within hours.",
  },
  {
    icon: Heart,
    title: "Physician-Led Care",
    description:
      "All IV drips at Healthi-Life are prepared by medical professionals using hospital-grade ingredients and administered by trained nurses under doctor supervision.",
  },
  {
    icon: Shield,
    title: "Medical-Grade Formulas",
    description:
      "Each infusion is personalized with medical-grade nutrients that match your exact health profile. Because safety isn't optional — it's our standard.",
  },
  {
    icon: CheckCircle,
    title: "Quick & Comfortable",
    description:
      "Most IV drips take 30 to 45 minutes. Relax in our private treatment lounges while your body is being replenished with essential nutrients.",
  },
];

const benefits = [
  { name: "Brain Booster IV", description: "Sharpen focus, clear the fog. Neuro-enhancing vitamins and antioxidants to boost memory, clarity, and cognitive speed." },
  { name: "Body Booster IV", description: "Total body revival in one drip. Restores energy, strengthens immunity, and supports detox at the cellular level." },
  { name: "Skin Booster IV", description: "Glow starts from the inside. Skin-loving antioxidants and collagen boosters for radiant, youthful skin." },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What is IV Therapy?
          </h2>
          <p className="text-lg text-muted-foreground">
            Modern life drains you. Stress, poor sleep, toxins, travel, and aging all deplete your body's essential reserves.{" "}
            <strong>IV Therapy restores balance.</strong>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Side */}
          <div className="relative">
            <img
              src={treatmentImage}
              alt="Healthi-Life IV therapy treatment room"
              className="rounded-2xl shadow-strong w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-lg p-6 shadow-medium max-w-xs">
              <p className="text-sm font-semibold text-foreground mb-2">
                Why You Need It
              </p>
              <p className="text-xs text-muted-foreground">
                Recharge your system and get the boost you didn't know you were missing.
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
            Targeted IV Solutions
          </h3>
          <h4 className="text-lg md:text-xl text-center text-muted-foreground mb-8">
            Trusted by Doctors. Chosen by High Performers.
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
              Bangkok's Most Luxurious IV Experience
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
