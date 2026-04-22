import React, { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircle, CalendarCheck, FlaskConical, Microscope,
  Brain, Dumbbell, Moon, Activity, Sparkles, BookOpen,
  GraduationCap, ShieldAlert, AlertTriangle,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";
import heroImage from "@/assets/clinic-exterior.webp";

const WhatsAppWidget = lazy(() => import("@/components/WhatsAppWidget"));

const WA_HREF = "https://wa.me/66919991744?text=IV%20Therapy%20Enquiry";

// ─── HERO ────────────────────────────────────────────────
const HeroSection = () => (
  <section className="relative min-h-[80vh] flex items-center pt-16 md:pt-20">
    <div className="absolute inset-0 z-0">
      <img
        src={heroImage}
        alt="Peptide education at Healthi-Life Bangkok"
        className="w-full h-full object-cover"
        width={1920}
        height={1080}
        loading="eager"
        decoding="sync"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/50" />
    </div>
    <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="max-w-3xl">
        <div className="animate-fade-in mb-6">
          <Badge className="bg-gradient-medical text-primary-foreground px-4 py-2 text-xs md:text-sm">
            <BookOpen className="h-4 w-4 mr-2" />
            Educational Resource — Bangkok
          </Badge>
        </div>

        <h1 className="animate-fade-in-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-[1.15]">
          Understanding Peptides:{" "}
          <span className="bg-gradient-medical bg-clip-text text-transparent">
            a clear, evidence-informed guide
          </span>
        </h1>

        <p className="animate-fade-in-up text-base md:text-lg text-muted-foreground mb-6 max-w-2xl">
          Peptides are short chains of amino acids that act as signaling
          molecules in the body. This page is purely educational — explaining
          what specific peptides are, how research suggests they work, and what
          questions to ask a qualified physician.
        </p>

        <div className="bg-secondary/50 border border-border rounded-lg p-4 mb-8 max-w-2xl">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Important:</strong> Nothing on
            this page constitutes medical advice or a treatment recommendation.
            Peptides should only be considered under the supervision of a
            licensed physician after a complete clinical assessment.
          </p>
        </div>

        <div className="animate-scale-in flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="group" asChild>
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Ask a Question on WhatsApp
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="h-5 w-5 mr-2" />
              Book a Consultation
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

// ─── WHAT ARE PEPTIDES ────────────────────────────────────
const WhatArePeptides = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4">
          <Microscope className="h-3.5 w-3.5 mr-1.5" /> The Basics
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          What are peptides?
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Peptides are biological messengers — short sequences of amino acids
          (typically fewer than 50) that the body uses to communicate between
          cells. Many hormones, growth factors, and immune modulators are
          peptides.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: FlaskConical,
            title: "Naturally occurring",
            body: "The human body produces thousands of peptides every day. Insulin, oxytocin and glutathione are familiar examples.",
          },
          {
            icon: Activity,
            title: "Signaling molecules",
            body: "Peptides bind to specific receptors and may help regulate processes such as repair, recovery and metabolism.",
          },
          {
            icon: GraduationCap,
            title: "Active research field",
            body: "Many peptides are still being studied. Quality of evidence varies widely between molecules and indications.",
          },
        ].map((item, i) => (
          <Card key={i} className="border-border shadow-soft">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-medical flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// ─── MOLECULE CARDS ───────────────────────────────────────
const molecules = [
  {
    name: "BPC-157",
    icon: Sparkles,
    tag: "Body Protective Compound",
    summary:
      "A synthetic peptide derived from a protein found in human gastric juice. Preclinical research suggests it may support tissue repair processes, particularly in tendons, ligaments and the gastrointestinal lining.",
    research:
      "Most published data comes from animal studies. Human clinical evidence remains limited.",
  },
  {
    name: "TB-500",
    icon: Activity,
    tag: "Thymosin Beta-4 fragment",
    summary:
      "A synthetic version of a region of the naturally occurring protein Thymosin Beta-4. Research suggests it may play a role in cell migration, angiogenesis and tissue remodeling.",
    research:
      "Preclinical studies explore its role in recovery contexts. Robust human trials are still lacking.",
  },
  {
    name: "NAD+",
    icon: Brain,
    tag: "Coenzyme (technically a nucleotide)",
    summary:
      "Nicotinamide adenine dinucleotide is a coenzyme present in every living cell, central to energy metabolism and DNA-repair pathways. Levels naturally decline with age.",
    research:
      "Research suggests NAD+ precursors may support cellular energy metabolism. Effects on long-term human outcomes are still being studied.",
  },
  {
    name: "CJC-1295",
    icon: Dumbbell,
    tag: "Growth-hormone-releasing hormone analog",
    summary:
      "A modified analog of GHRH designed to stimulate the pituitary's own pulsatile release of growth hormone, rather than supplying exogenous GH.",
    research:
      "Often studied alongside Ipamorelin. Use is restricted to physician-supervised contexts in jurisdictions where it is permitted.",
  },
  {
    name: "Ipamorelin",
    icon: Moon,
    tag: "Selective GH secretagogue",
    summary:
      "A pentapeptide that selectively encourages growth hormone release with minimal effect on cortisol or prolactin in published studies.",
    research:
      "Frequently paired with CJC-1295 in research protocols. Clinical context and supervision are essential.",
  },
  {
    name: "Epithalon",
    icon: Sparkles,
    tag: "Tetrapeptide (Epitalon)",
    summary:
      "A synthetic tetrapeptide studied in the context of the pineal gland and circadian regulation. Some preclinical research suggests it may interact with telomerase activity.",
    research:
      "Most data originates from a small number of research groups. Independent replication and large-scale human trials remain limited.",
  },
];

const MoleculesSection = () => (
  <section className="py-16 md:py-24 bg-secondary/30">
    <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4">
          <FlaskConical className="h-3.5 w-3.5 mr-1.5" /> Molecule Reference
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Six peptides commonly discussed in research
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          A neutral overview of what each molecule is and what current research
          suggests. None of the descriptions below are claims of treatment,
          cure, or guaranteed outcome.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {molecules.map((m) => (
          <Card key={m.name} className="border-border shadow-soft hover:shadow-medical transition-shadow">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-medical flex items-center justify-center flex-shrink-0">
                  <m.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.tag}</p>
                </div>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed mb-4">
                {m.summary}
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  Evidence note
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {m.research}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// ─── HOW THEY WORK ────────────────────────────────────────
const HowTheyWork = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4">
          <Microscope className="h-3.5 w-3.5 mr-1.5" /> Mechanism Overview
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          How peptides are thought to work
        </h2>
        <p className="text-lg text-muted-foreground">
          A simplified, neutral summary of the pharmacology — for orientation
          only.
        </p>
      </div>

      <div className="space-y-6">
        {[
          {
            n: "01",
            title: "Receptor binding",
            body: "Each peptide has a specific 3D shape that fits particular cellular receptors, much like a key in a lock. This binding is what triggers a downstream response.",
          },
          {
            n: "02",
            title: "Signal cascade",
            body: "Once bound, the peptide may initiate intracellular signaling — for example influencing gene expression, hormone release, or local repair processes.",
          },
          {
            n: "03",
            title: "Short half-life",
            body: "Most peptides are broken down by enzymes within minutes to hours. This is why dosing schedules and formulations matter and why qualified medical oversight is essential.",
          },
          {
            n: "04",
            title: "Variable evidence",
            body: "The strength of clinical evidence differs significantly between peptides. Some are well-studied in specific indications; others remain primarily research tools.",
          },
        ].map((step) => (
          <div key={step.n} className="flex gap-4 md:gap-6 items-start">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-medical bg-clip-text text-transparent flex-shrink-0 w-16">
              {step.n}
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── SAFETY / CONSIDERATIONS ─────────────────────────────
const SafetySection = () => (
  <section className="py-16 md:py-24 bg-secondary/30">
    <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl">
      <div className="text-center mb-10">
        <Badge variant="outline" className="mb-4">
          <ShieldAlert className="h-3.5 w-3.5 mr-1.5" /> Important Considerations
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Questions to ask before considering any peptide
        </h2>
      </div>

      <Card className="border-border shadow-soft">
        <CardContent className="p-6 md:p-8">
          <ul className="space-y-4 text-foreground/90">
            {[
              "Is this peptide approved or regulated for the indication being discussed in your country?",
              "What is the quality and source of the compound — pharmaceutical grade or research grade?",
              "What does current peer-reviewed human evidence actually show for this molecule?",
              "What are the known side effects, contraindications and drug interactions?",
              "Who will supervise the protocol, monitor labs, and manage adverse events?",
              "What are the realistic expectations — and what outcomes cannot be promised?",
            ].map((q, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-primary font-semibold flex-shrink-0">→</span>
                <span className="leading-relaxed">{q}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 p-4 rounded-lg bg-background border border-border flex gap-3 items-start">
            <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Peptide use without medical supervision can carry real risks. This
              page does not endorse self-administration of any compound. Always
              consult a licensed physician.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
);

// ─── FAQ ─────────────────────────────────────────────────
const faqs = [
  {
    q: "What exactly is a peptide?",
    a: "A peptide is a short chain of amino acids — the same building blocks that make up proteins. Peptides typically contain fewer than 50 amino acids and act as signaling molecules in the body.",
  },
  {
    q: "Are peptides the same as steroids?",
    a: "No. Steroids are lipid-based hormones built around a four-ring carbon structure. Peptides are amino-acid based signaling molecules. They are pharmacologically distinct categories.",
  },
  {
    q: "Is there strong human evidence behind peptides like BPC-157 or TB-500?",
    a: "Most published research on BPC-157 and TB-500 comes from preclinical (animal or in-vitro) studies. Robust large-scale human clinical trials are limited, which is why physician oversight and informed consent are essential.",
  },
  {
    q: "Why is NAD+ included on a peptide page?",
    a: "Strictly speaking, NAD+ is a coenzyme (a nucleotide), not a peptide. It is included here because it is frequently discussed alongside peptide therapies in longevity contexts, and many people researching peptides also research NAD+.",
  },
  {
    q: "Why are CJC-1295 and Ipamorelin often mentioned together?",
    a: "They act through complementary pathways: CJC-1295 is a GHRH analog and Ipamorelin is a selective GH secretagogue. Research protocols frequently study them in combination, but use should always be physician-supervised.",
  },
  {
    q: "What is Epithalon studied for?",
    a: "Epithalon (Epitalon) is a synthetic tetrapeptide studied in the context of the pineal gland, circadian rhythm and cellular aging markers. Evidence is largely from a limited number of research groups and broader replication is still needed.",
  },
  {
    q: "Can I get peptides over the counter?",
    a: "In most jurisdictions, peptides used in a clinical context require a physician's prescription and a regulated source. Quality and provenance vary widely outside regulated pharmacy channels.",
  },
  {
    q: "Does this page recommend a specific protocol?",
    a: "No. This page is purely educational. Any clinical decision must follow an in-person assessment by a qualified physician who can review your medical history, current medications and personal goals.",
  },
];

const FAQSection = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8 max-w-3xl">
      <div className="text-center mb-10">
        <Badge variant="outline" className="mb-4">
          <BookOpen className="h-3.5 w-3.5 mr-1.5" /> Frequently Asked
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Common questions about peptides
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="bg-card border border-border rounded-lg px-6 shadow-soft"
          >
            <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

// ─── FINAL CTA ────────────────────────────────────────────
const FinalCTA = () => (
  <section className="py-16 md:py-24 bg-gradient-to-br from-secondary/60 to-background">
    <div className="container px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Have a specific question?
      </h2>
      <p className="text-lg text-muted-foreground mb-8">
        Our medical concierge in Bangkok is happy to discuss your situation and
        help you understand whether a physician consultation is appropriate.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="group" asChild>
          <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Ask on WhatsApp
          </a>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
            <CalendarCheck className="h-5 w-5 mr-2" />
            Book a Consultation
          </a>
        </Button>
      </div>
    </div>
  </section>
);

// ─── PAGE ─────────────────────────────────────────────────
const PeptideBangkok = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Peptides Explained — Educational Guide | Healthi-Life Bangkok</title>
        <meta
          name="description"
          content="A neutral, educational guide to peptides discussed in research: BPC-157, TB-500, NAD+, CJC-1295, Ipamorelin and Epithalon. Information only — not medical advice."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ivtherapyhealthilife.com/peptide/bangkok" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />
      <main>
        <HeroSection />
        <WhatArePeptides />
        <MoleculesSection />
        <HowTheyWork />
        <SafetySection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <WhatsAppWidget />
      </Suspense>
    </>
  );
};

export default PeptideBangkok;
