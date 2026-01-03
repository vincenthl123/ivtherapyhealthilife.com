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
    question: "Is stem cell therapy safe?",
    answer:
      "Yes. At Healthi-Life, we use only fresh, ethically sourced umbilical cord stem cells processed in certified labs. Every batch is tested for safety, purity, and viability. To date, we have seen no serious adverse reactions in any of our patients.",
  },
  {
    question: "What conditions can stem cell therapy help with?",
    answer:
      "Our stem cell programs support patients dealing with fertility challenges, hormonal imbalance, osteoarthritis, joint pain, chronic fatigue, and visible signs of aging. Treatments are personalized based on your goals and health history.",
  },
  {
    question: "Where do your stem cells come from?",
    answer:
      "We use only mesenchymal stem cells (MSCs) derived from fresh umbilical cord tissue, collected during planned C-section deliveries. No fetal or embryonic sources, no animal products — 100% ethical, traceable, and xeno-free.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "Most patients begin with a plan of 1–3 sessions, spaced out over several weeks. Your doctor will recommend a specific protocol based on your age, condition, and response to treatment.",
  },
  {
    question: "What makes fresh stem cells better than frozen ones?",
    answer:
      "Fresh cells retain higher viability, grow faster, and integrate more effectively. Frozen stem cells often suffer from cell damage, reduced activity, and lower therapeutic results. That's why we only use fresh, high-potency MSCs at Healthi-Life.",
  },
  {
    question: "Will I need downtime after treatment?",
    answer:
      "Not at all. Most of our therapies are walk-in / walk-out with no downtime required. You may feel slightly tired or experience a mild low-grade fever — this is a natural response as your body begins to activate its healing.",
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
                id="stemcellclick-faq-whatsapp" 
                size="lg" 
                onClick={() => trackButtonClick('stemcellclick-faq-whatsapp')}
                asChild
              >
                <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
              <Button 
                id="stemcellclick-faq-call" 
                size="lg" 
                variant="outline" 
                onClick={() => trackButtonClick('stemcellclick-faq-call')}
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