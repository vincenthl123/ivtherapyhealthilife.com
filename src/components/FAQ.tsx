import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";

const faqs = [
  {
    question: "What is IV Therapy and how does it work?",
    answer:
      "IV Therapy delivers vitamins, minerals, and antioxidants directly into your bloodstream — allowing your body to absorb them faster and more effectively than oral supplements.",
  },
  {
    question: "How long does a session take?",
    answer:
      "Most IV drips take 30 to 45 minutes. You can relax, scroll your phone, or even nap while your body is being replenished.",
  },
  {
    question: "Is IV Therapy safe?",
    answer:
      "Yes — all IV drips at Healthi-Life are prepared by medical professionals using hospital-grade ingredients and are administered by trained nurses under doctor supervision.",
  },
  {
    question: "How soon will I feel the effects?",
    answer:
      "Many patients feel more energized, clear-headed, and refreshed within hours. For skin glow or immune support, visible results often appear within 24–72 hours.",
  },
  {
    question: "Can IV drip therapy help with weight loss?",
    answer:
      "Yes! Our Fat Burner IV Therapy includes L-Carnitine, B-Complex, and metabolism boosters to support fat loss, detoxification, and energy production.",
  },
  {
    question: "What should I expect during my first visit?",
    answer:
      "You'll be welcomed into our serene, hygienic clinic environment. Our team will discuss your health goals, recommend the right IV drip, and you'll relax in our private treatment lounges during the infusion.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Still Have Questions? Our Medical Concierge Team is Here to Help.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 shadow-soft"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="mt-12 bg-card border border-border rounded-2xl p-8 text-center shadow-soft">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Can't Find Your Answer?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our medical team is ready to answer all your questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                id="ivclick-faq-whatsapp" 
                size="lg" 
                onClick={() => trackButtonClick('ivclick-faq-whatsapp')}
                asChild
              >
                <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
              <Button 
                id="ivclick-faq-call" 
                size="lg" 
                variant="outline" 
                onClick={() => trackButtonClick('ivclick-faq-call')}
                asChild
              >
                <a href="tel:+66919991744">
                  <Phone className="h-5 w-5 mr-2" />
                  Call +66 (0)9-1999-1744
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
