import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, Stethoscope, Droplets } from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Chat with Us",
    description: "Message us on WhatsApp to discuss your health goals and ask any questions.",
  },
  {
    icon: Stethoscope,
    number: "02",
    title: "Quick Consultation",
    description: "Our medical team will recommend the perfect IV drip for your needs.",
  },
  {
    icon: Calendar,
    number: "03",
    title: "Book Your Session",
    description: "Schedule your visit at our serene clinic in Ekkamai, Bangkok.",
  },
  {
    icon: Droplets,
    number: "04",
    title: "Relax & Recharge",
    description: "Enjoy your 30-45 minute IV drip in our luxurious private treatment lounges.",
  },
];

const Process = () => {
  return (
    <section id="process" className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            From booking to feeling amazing — we make it seamless and comfortable.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative group hover:shadow-medium transition-all duration-300 border-border"
            >
              <CardContent className="p-6">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-medical flex items-center justify-center text-primary-foreground font-bold text-lg shadow-soft">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>

              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-border" />
              )}
            </Card>
          ))}
        </div>

        {/* Contact Options */}
        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-soft">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
            Ready to Feel Amazing?
          </h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Button 
              id="ivclick-process-call" 
              size="lg" 
              variant="outline" 
              className="h-auto py-4" 
              onClick={() => trackButtonClick('ivclick-process-call')}
              asChild
            >
              <a href="tel:+66919991744">
                <div className="text-left w-full">
                  <div className="font-bold text-base mb-1">Call Us Now</div>
                  <div className="text-xs text-muted-foreground">+66 (0)9-1999-1744</div>
                </div>
              </a>
            </Button>
            <Button 
              id="ivclick-process-whatsapp" 
              size="lg" 
              className="h-auto py-4" 
              onClick={() => trackButtonClick('ivclick-process-whatsapp')}
              asChild
            >
              <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-bold text-base mb-1">WhatsApp</div>
                  <div className="text-xs">Quick consultation</div>
                </div>
              </a>
            </Button>
            <Button 
              id="ivclick-process-book" 
              size="lg" 
              variant="outline" 
              className="h-auto py-4" 
              onClick={() => trackButtonClick('ivclick-process-book')}
              asChild
            >
              <a href="https://healthilife.fillout.com/ivtherapy" target="_blank" rel="noopener noreferrer">
                <div className="text-left w-full">
                  <div className="font-bold text-base mb-1">Book Online</div>
                  <div className="text-xs text-muted-foreground">Schedule your session</div>
                </div>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
