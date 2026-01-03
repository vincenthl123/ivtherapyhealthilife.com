import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Send, Video, Calendar, MessageCircle } from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Submit Evaluation Form",
    description: "Book online and answer a few questions about your health goals and history.",
  },
  {
    icon: Send,
    number: "02",
    title: "Send Your Reports",
    description: "Optional: MRI, blood tests, or existing diagnosis to help us understand your needs better.",
  },
  {
    icon: Video,
    number: "03",
    title: "Doctor Consultation",
    description: "Consultation by phone/video call, or at our medical center in Bangkok.",
  },
  {
    icon: Calendar,
    number: "04",
    title: "Get Your Personalized Plan",
    description: "Our doctors will advise, schedule, and prepare your stem cell therapy.",
  },
];

const Process = () => {
  return (
    <section id="process" className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Simple Process
          </h2>
          <p className="text-lg text-muted-foreground">
            From consultation to treatment — we make it seamless and personalized.
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
            Ready to Get Started?
          </h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Button 
              id="stemcellclick-process-call" 
              size="lg" 
              variant="outline" 
              className="h-auto py-4" 
              onClick={() => trackButtonClick('stemcellclick-process-call')}
              asChild
            >
              <a href="tel:+66919991744">
                <div className="text-left w-full">
                  <div className="font-bold text-base mb-1">Call Us</div>
                  <div className="text-xs text-muted-foreground">+66 (0)9-1999-1744</div>
                </div>
              </a>
            </Button>
            <Button 
              id="stemcellclick-process-whatsapp" 
              size="lg" 
              className="h-auto py-4" 
              onClick={() => trackButtonClick('stemcellclick-process-whatsapp')}
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
              id="stemcellclick-process-book" 
              size="lg" 
              variant="outline" 
              className="h-auto py-4" 
              onClick={() => trackButtonClick('stemcellclick-process-book')}
              asChild
            >
              <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                <div className="text-left w-full">
                  <div className="font-bold text-base mb-1">Book Online</div>
                  <div className="text-xs text-muted-foreground">Schedule now</div>
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