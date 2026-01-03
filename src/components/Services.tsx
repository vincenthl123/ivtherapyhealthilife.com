import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Dumbbell, Bone, MessageCircle } from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";

const services = [
  {
    icon: Heart,
    title: "Anti-Aging & Skin Rejuvenation",
    description:
      "Revitalizes energy, mental clarity, and recovery. Repairs tissue at a cellular level (skin, organs, vessels). Slows biological aging — visible in skin, energy, recovery.",
    benefits: ["Cellular renewal", "Enhanced vitality", "Skin rejuvenation"],
    cta: "Look younger, feel sharper, and perform",
  },
  {
    icon: Activity,
    title: "Chronic Pain & Fatigue",
    description:
      "When chronic pain and fatigue hold you back, stem cells work at the root — calming systemic inflammation, rebalancing immune pathways, and promoting long-term tissue healing.",
    benefits: ["Reduced inflammation", "Immune rebalancing", "Long-term healing"],
    cta: "Designed for fibromyalgia, joint discomfort, and fatigue",
  },
  {
    icon: Dumbbell,
    title: "Orthopedic & Sport Injury",
    description:
      "Torn ligament? Muscle fatigue? Chronic strain? Fresh stem cells activate tissue repair and reduce downtime. Ideal for athletes and active adults seeking faster recovery.",
    benefits: ["Tissue regeneration", "Faster recovery", "No surgery needed"],
    cta: "Move pain-free. Stay active. Stay strong.",
  },
  {
    icon: Bone,
    title: "Osteoarthritis & Joint Repair",
    description:
      "Joint degeneration doesn't have to define your future. Stem cells help regenerate cartilage, reduce inflammation, and relieve pain in knees, hips, shoulders, and spine.",
    benefits: ["Cartilage regeneration", "Pain relief", "Improved mobility"],
    cta: "Restore mobility without surgery",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How Stem Cell Therapy Helps
          </h2>
          <p className="text-lg text-muted-foreground">
            Our fresh mesenchymal stem cell protocols are designed for those who demand more:{" "}
            <strong>more energy, more clarity, more time.</strong>
          </p>
          <p className="text-base text-muted-foreground mt-2">
            Because real wealth is cellular.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-border"
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-medical flex items-center justify-center group-hover:scale-110 transition-transform">
                    <service.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{service.description}</p>

                <ul className="space-y-2 mb-4">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <p className="text-sm font-semibold text-primary mb-4">{service.cta}</p>

                <Button 
                  id={`stemcellclick-service-${index}`} 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => trackButtonClick(`stemcellclick-service-${index}`)}
                  asChild
                >
                  <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ask on WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button 
            id="stemcellclick-services-cta" 
            size="lg" 
            onClick={() => trackButtonClick('stemcellclick-services-cta')}
            asChild
          >
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" />
              Book Your Free Consultation
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;