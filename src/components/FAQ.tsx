import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";
import { useLanguage } from "@/lib/i18n";

const FAQ = () => {
  const { t } = useLanguage();

  const faqs = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
    { question: t("faq.q6"), answer: t("faq.a6") },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("faq.subtitle")}
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
              {t("faq.cantFind")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("faq.teamReady")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                id="ivclick-faq-whatsapp" 
                size="lg" 
                onClick={() => trackButtonClick('ivclick-faq-whatsapp')}
                asChild
              >
                <a href={buildWaUrl("IV Therapy Enquiry")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t("faq.whatsappUs")}
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
                  {t("faq.call")} +66 (0)9-1999-1744
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
