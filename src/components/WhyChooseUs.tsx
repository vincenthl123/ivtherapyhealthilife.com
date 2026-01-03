import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Award, Users, FlaskConical, Heart } from "lucide-react";
import stemCellsImage from "@/assets/treatment-room.webp";

const features = [
  {
    icon: FlaskConical,
    title: "Fresh Stem Cells Only",
    description:
      "We use only fresh umbilical cord-derived mesenchymal stem cells (MSCs), collected during scheduled C-section deliveries and processed within hours — ensuring maximum viability, purity, and regenerative power.",
  },
  {
    icon: Heart,
    title: "Doctor-Led Personalized Plans",
    description:
      "Our team builds a protocol based on your body, history, and goals — whether for anti-aging, fertility, osteoarthritis, diabetes, or overall vitality.",
  },
  {
    icon: Shield,
    title: "International-Grade Laboratory",
    description:
      "Our partner lab is class 100 cleanroom certified, follows strict pathogen screening, stem cell marker verification, and hypoxic cell culture for enhanced survival and integration.",
  },
  {
    icon: CheckCircle,
    title: "Traceable, Ethical & Xeno-Free",
    description:
      "Every treatment is accompanied by a Certificate of Analysis (COA). No animal components, no ethical concerns. Each donor is followed from day 1 of pregnancy through delivery.",
  },
  {
    icon: Users,
    title: "Trusted by International Patients",
    description:
      "Women and men from around the world trust Healthi-Life for discreet, effective, and world-class regenerative care in the heart of Bangkok.",
  },
];

const certifications = [
  { name: "ISO 9001 · ISO 13485 · ISO 21973", description: "Documented quality management systems supporting clinical processes and cellular therapy handling." },
  { name: "GMP-Compliant Operations", description: "Controlled environments and quality protocols for regenerative and wellness applications." },
  { name: "ISCT-Aligned Laboratory Standards", description: "Laboratory quality principles aligned with international cell therapy standards." },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Fresh, High-Potency Stem Cells Matter
          </h2>
          <p className="text-lg text-muted-foreground">
            <strong>Because your health deserves uncompromising care.</strong>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Side */}
          <div className="relative">
            <img
              src={stemCellsImage}
              alt="Healthi-Life treatment room"
              className="rounded-2xl shadow-strong w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-lg p-6 shadow-medium max-w-xs">
              <p className="text-sm font-semibold text-foreground mb-2">
                Real wealth is cellular.
              </p>
              <p className="text-xs text-muted-foreground">
                Stem cells are your body's elite repair force — restoring function naturally and at
                the source.
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

        {/* Certifications */}
        <div className="bg-gradient-subtle rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
            Certified Excellence
          </h3>
          <h2 className="text-lg md:text-xl text-center text-muted-foreground mb-8">
            International Standards. Physician-Led Excellence.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="border-accent/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-medical flex items-center justify-center">
                    <Award className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Badge className="bg-success text-success-foreground">
              ISCT, ISO & GMP Certified Laboratory
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
