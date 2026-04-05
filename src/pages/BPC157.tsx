import React, { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircle, Shield, Stethoscope, Award, ArrowDown,
  Dumbbell, Heart, Brain, Sparkles, AlertTriangle, CheckCircle2,
  ClipboardCheck, Microscope, CalendarCheck, Phone, Mail,
  Syringe, Pill, FlaskConical, Activity
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackButtonClick } from "@/lib/tracking";
import heroImage from "@/assets/clinic-exterior.webp";
import drFirstImage from "@/assets/dr-first.jpg";

const WhatsAppWidget = lazy(() => import("@/components/WhatsAppWidget"));

// ─── HERO ────────────────────────────────────────────────
const BPCHero = () => (
  <section className="relative min-h-screen flex items-center pt-16 md:pt-20">
    <div className="absolute inset-0 z-0">
      <img
        src={heroImage}
        alt="BPC-157 Peptide Therapy at Healthi Life Bangkok"
        className="w-full h-full object-cover"
        width={1920}
        height={1080}
        // @ts-expect-error fetchpriority is valid HTML
        fetchpriority="high"
        loading="eager"
        decoding="sync"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/40" />
    </div>
    <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-12 md:py-32">
      <div className="max-w-3xl">
        <div className="animate-fade-in mb-6">
          <Badge className="bg-gradient-medical text-primary-foreground px-4 py-2 text-xs md:text-sm">
            <FlaskConical className="h-4 w-4 mr-2" />
            Physician-Prescribed Peptide Protocol
          </Badge>
        </div>

        <h1 className="animate-fade-in-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-[1.15]">
          BPC-157:{" "}
          <span className="bg-gradient-medical bg-clip-text text-transparent">
            The peptide that repairs. Prescribed right.
          </span>
        </h1>

        <p className="animate-fade-in-up text-base md:text-lg text-muted-foreground mb-4 max-w-2xl">
          BPC-157 exists. What's rare is the medical intelligence to prescribe it correctly — at the right dose, for the right indication, under physician oversight.
        </p>

        <div className="animate-scale-in flex flex-col sm:flex-row gap-4 mb-10">
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-bpc-hero-whatsapp')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Book via WhatsApp
            </a>
          </Button>
          <Button size="lg" variant="outline" onClick={() => trackButtonClick('ivclick-bpc-hero-learn')} asChild>
            <a href="#what-is-bpc">
              <ArrowDown className="h-5 w-5 mr-2" />
              Learn more ↓
            </a>
          </Button>
        </div>

      </div>
    </div>
  </section>
);

// ─── WHAT IS BPC-157 ─────────────────────────────────────
const WhatIsBPC = () => (
  <section id="what-is-bpc" className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">The Science</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          What is BPC-157?
        </h2>

        <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
          <p>
            <strong className="text-foreground">BPC-157</strong> stands for Body Protective Compound-157 — a synthetic peptide derived from a protein found naturally in human gastric juice. It is made of 15 amino acids and has been studied extensively for its regenerative and protective properties across multiple body systems.
          </p>
          <p>
            Unlike supplements you find online, BPC-157 works at the cellular level — stimulating growth factors, modulating nitric oxide pathways, and accelerating tissue repair in ways that have real clinical application.
          </p>
          <p>
            What most sources miss: the compound is only as effective as the protocol around it. Dose, route of administration (subcutaneous vs. oral), cycle length, and indication selection determine whether it works — or does nothing.
          </p>
        </div>

        <blockquote className="mt-8 border-l-4 border-primary pl-6 py-4 bg-secondary/30 rounded-r-lg">
          <p className="text-foreground font-medium italic text-lg">
            "BPC-157 is not the rare part. Knowing exactly when, how, and for whom to prescribe it — that is."
          </p>
        </blockquote>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { label: "Amino Acids", value: "15" },
            { label: "Protocol Type", value: "Physician Prescription" },
            { label: "Routes Available", value: "Injection / Oral" },
            { label: "Standard Cycle", value: "4–8 weeks" },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4 text-center shadow-soft">
              <div className="text-xl md:text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── BENEFITS ────────────────────────────────────────────
const benefits = [
  {
    icon: Dumbbell,
    number: "01",
    title: "MUSCULOSKELETAL",
    subtitle: "Tendons, Joints & Muscle Repair",
    description: "BPC-157 accelerates healing of tendons, ligaments, and muscle tears by stimulating growth factor production and promoting vascularization in damaged tissue. Particularly relevant for athletes, chronic injury, and post-surgical recovery.",
    indications: ["Tendon injury", "Ligament tear", "Post-surgery", "Chronic joint pain", "Athletic recovery"],
  },
  {
    icon: Heart,
    number: "02",
    title: "GASTROINTESTINAL",
    subtitle: "Gut Lining & Digestive Healing",
    description: "Derived from a gastric protein, BPC-157 has a natural affinity for the digestive system. It repairs mucosal integrity, reduces inflammation, and addresses conditions from leaky gut to IBD-related discomfort. Often underused in this indication.",
    indications: ["Leaky gut", "IBS", "Intestinal inflammation", "Gastric ulcer support", "NSAID damage recovery"],
  },
  {
    icon: Brain,
    number: "03",
    title: "NEUROLOGICAL",
    subtitle: "Brain, Mood & Nervous System",
    description: "BPC-157 modulates dopamine and serotonin activity and shows neuroprotective effects in early research. Relevant for stress-related cognitive decline, mood disruption, and neurological recovery — an increasingly studied application in executive health.",
    indications: ["Cognitive fatigue", "Mood dysregulation", "Neuroprotection", "Stress recovery", "Focus & clarity"],
  },
  {
    icon: Sparkles,
    number: "04",
    title: "LONGEVITY",
    subtitle: "Systemic Repair & Longevity Support",
    description: "As a systemic protective compound, BPC-157 is increasingly used in longevity protocols alongside NAD+ and GHK-Cu for its anti-inflammatory, angiogenic, and cytoprotective properties. Think of it as cellular maintenance — not treatment.",
    indications: ["Anti-inflammatory", "Cytoprotection", "Longevity stacking", "Vascular health", "Systemic recovery"],
  },
];

const BPCBenefits = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Clinical Applications</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Where BPC-157 works.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {benefits.map((b, i) => (
          <Card key={i} className="group hover:shadow-medium transition-all duration-300 border-border overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary/60">{b.number}</span>
                  <h3 className="text-lg font-bold text-foreground">{b.title}</h3>
                  <p className="text-sm font-medium text-primary">{b.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{b.description}</p>
              <div className="flex flex-wrap gap-2">
                {b.indications.map((ind, j) => (
                  <Badge key={j} variant="secondary" className="text-xs">{ind}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// ─── WHY DOCTOR ──────────────────────────────────────────
const risks = [
  {
    icon: AlertTriangle,
    title: "Wrong Dosing",
    description: "Underdosing produces no effect. Overdosing creates inflammation and disrupts hormonal axes. Clinical dosing is weight- and indication-specific.",
  },
  {
    icon: Syringe,
    title: "Route Matters",
    description: "Subcutaneous injection targets systemic and musculoskeletal issues. Oral form prioritizes gut healing. Choosing the wrong route means no clinical outcome.",
  },
  {
    icon: Shield,
    title: "Contraindications Exist",
    description: "BPC-157 promotes angiogenesis — vascular growth. This is excellent for tissue repair. It requires careful assessment in oncology history or vascular anomalies.",
  },
  {
    icon: FlaskConical,
    title: "Purity & Quality",
    description: "Grey-market peptides have no quality standard. Our supplier (Genoracle) carries HACCP, GHPs, and ISO 9001 certifications. Purity is not optional.",
  },
];

const WhyDoctor = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Medical Oversight</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Why a doctor must prescribe this.
        </h2>

        <blockquote className="border-l-4 border-accent/60 pl-6 py-3 mb-8 bg-accent/5 rounded-r-lg">
          <p className="text-foreground font-medium italic">
            "Self-administering BPC-157 is like performing surgery with a YouTube tutorial. The compound is real. The risk is in the hands holding it."
          </p>
        </blockquote>

        <div className="text-muted-foreground space-y-4 mb-10 text-base leading-relaxed">
          <p>
            BPC-157 is available online in grey markets — often mislabeled, under- or over-dosed, and administered without any indication assessment. We see the consequences: systemic side effects from wrong dosing, no result from wrong routes, and misuse in inappropriate candidates.
          </p>
          <p>
            At Healthi Life, every BPC-157 protocol starts with a physician consultation, biomarker assessment, and written prescription. The dose, route, and cycle are calibrated to you — not to a forum post.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {risks.map((r, i) => (
            <Card key={i} className="border-border">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                  <r.icon className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">{r.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── DR FIRST CARD ───────────────────────────────────────
const DrFirstSection = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Your Physician</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-10">
          Meet Dr. First.
        </h2>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={drFirstImage}
                alt="Dr. Napat Hunsajarupan (First)"
                className="w-full h-64 md:h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6 md:p-10 md:w-2/3">
              <h3 className="text-2xl font-bold text-foreground mb-1">Dr. Napat Hunsajarupan</h3>
              <p className="text-primary font-semibold mb-4">Co-Founder & CMO</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {["MD — Licensed Physician", "Specialist: Dermatology", "Peptides & Regenerative Medicine", "Cosmetic & Anti-Aging Protocols", "Healthi Life — Ekkamai, Bangkok"].map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>

              <blockquote className="border-l-4 border-primary pl-4 py-2 mb-5 bg-primary/5 rounded-r-lg">
                <p className="text-sm text-foreground italic font-medium">
                  "Every BPC-157 prescription at Healthi Life is written, reviewed, and monitored by Dr. First personally."
                </p>
              </blockquote>

              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  Dr. First leads the Cosmetic & Anti-Aging vertical at Healthi Life, overseeing all peptide protocols, IV therapies, hormonal optimization, and skin treatments. His approach is biomarker-driven: no protocol is prescribed without understanding your biology first.
                </p>
                <p>
                  His background in dermatology gives him a deep understanding of systemic repair — skin being the most visible marker of what's happening internally. BPC-157, in his practice, is always prescribed as part of a broader protocol, not in isolation.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {["Peptide Therapy", "Biomarker-First", "Physician-Written Prescriptions", "Monitored Protocol"].map((tag, i) => (
                  <Badge key={i} className="bg-primary/10 text-primary border-0 text-xs">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── PROTOCOL STEPS ──────────────────────────────────────
const protocolSteps = [
  {
    icon: Stethoscope,
    day: "Day 1",
    title: "Initial Consultation",
    description: "45-min consultation with Dr. First. Medical history, current symptoms, and indication review.",
    detail: "At Healthi Life, Ekkamai 10 · or WhatsApp pre-consult",
  },
  {
    icon: Microscope,
    day: "Day 1–3",
    title: "Biomarker Assessment",
    description: "Blood panel + relevant markers. Body composition (InBody). Protocol indication confirmed or refined.",
    detail: "On-site labs or partner hospital · Results reviewed by Dr. First",
  },
  {
    icon: ClipboardCheck,
    day: "Day 3–5",
    title: "Protocol Prescribed",
    description: "Written prescription. Dose, route (SC or oral), cycle duration, and monitoring plan delivered in writing.",
    detail: "PDF protocol · WhatsApp follow-up channel activated",
  },
  {
    icon: CalendarCheck,
    day: "Weeks 1–8",
    title: "Active Protocol + Review",
    description: "Regular check-ins. Mid-cycle review at week 4. Final assessment and protocol continuation decision.",
    detail: "WhatsApp + in-clinic review · Biomarker follow-up included",
  },
];

const ProtocolSection = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">The Process</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          What happens when you book.
        </h2>
        <p className="text-lg text-muted-foreground">
          Four steps. No ambiguity. You know exactly what to expect from first contact to active protocol.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {protocolSteps.map((step, i) => (
          <Card key={i} className="relative group hover:shadow-medium transition-all duration-300 border-border">
            <CardContent className="p-6">
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-medical flex items-center justify-center text-primary-foreground font-bold text-sm shadow-soft">
                {i + 1}
              </div>
              <Badge variant="secondary" className="mb-3 text-xs">{step.day}</Badge>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
              <p className="text-xs text-primary/70 italic">{step.detail}</p>
            </CardContent>
            {i < protocolSteps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-border" />
            )}
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// ─── CTA BLOCK ───────────────────────────────────────────
const CTABlock = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Ready to start?
        </h2>
        <p className="text-lg text-muted-foreground mb-10">
          One consultation. A physician who knows peptides. A protocol built for your biology.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Stethoscope, label: "Physician-Supervised", desc: "Dr. First reviews every case personally" },
            { icon: Shield, label: "Certified Supply", desc: "Genoracle — HACCP, GHPs, ISO 9001" },
            { icon: ClipboardCheck, label: "Written Protocol", desc: "Every prescription documented" },
            { icon: CheckCircle2, label: "Legal in Thailand", desc: "Prescribed by a licensed physician" },
          ].map((g, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4 shadow-soft text-center">
              <g.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <h4 className="font-bold text-foreground text-sm">{g.label}</h4>
              <p className="text-xs text-muted-foreground mt-1">{g.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-bpc-cta-whatsapp')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Book via WhatsApp
            </a>
          </Button>
          <Button size="lg" variant="outline" onClick={() => trackButtonClick('ivclick-bpc-cta-email')} asChild>
            <a href="mailto:contact@healthi-life.com">
              <Mail className="h-5 w-5 mr-2" />
              Send an Email
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

// ─── FAQ ─────────────────────────────────────────────────
const faqs = [
  {
    q: "Is BPC-157 legal in Thailand?",
    a: "Yes. BPC-157 is legal in Thailand when prescribed by a licensed physician. It is not classified as a controlled substance. At Healthi Life, all peptide protocols are written and supervised by Dr. First (MD), ensuring full legal and medical compliance. We do not sell or dispense peptides without a prior medical consultation and formal prescription.",
  },
  {
    q: "What's the difference between buying BPC-157 online and getting it here?",
    a: "Online sources sell research-grade peptides with no quality guarantee, no dosing guidance, and no medical indication assessment. You're essentially self-experimenting. At Healthi Life, you receive a clinical-grade peptide from a certified supplier (Genoracle — HACCP, GHPs, ISO 9001), a physician-written protocol with the correct dose and route for your specific condition, and active monitoring throughout your cycle. The compound is the same. The difference is everything around it.",
  },
  {
    q: "How long does a BPC-157 protocol last?",
    a: "Standard cycles run 4 to 8 weeks depending on indication. Musculoskeletal repairs often respond within 4–6 weeks. Gut healing protocols may require 6–8 weeks. Longevity stacking protocols are typically embedded within a 3- or 12-month protocol. Dr. First will define the exact duration after your initial consultation and biomarker review.",
  },
  {
    q: "Is the injection painful? Can I take it orally instead?",
    a: "Subcutaneous injections are minimal — a small insulin-type needle, typically self-administered once daily. Most people rate discomfort at 1–2/10. For gut-specific indications, oral BPC-157 is equally or more effective and entirely injection-free. The route will be chosen by Dr. First based on your specific therapeutic goal, not preference alone.",
  },
  {
    q: "What are the side effects?",
    a: "BPC-157 has a strong safety profile in existing research. The most commonly reported effects are mild nausea (usually dose-related and transient) and temporary fatigue in the first days. Because BPC-157 stimulates angiogenesis (new blood vessel formation), it requires medical screening in anyone with a history of malignancy or known vascular anomalies. This is why we conduct a full consultation before prescribing. There are no documented serious adverse events in clinical literature at therapeutic doses.",
  },
  {
    q: "How much does a BPC-157 protocol cost at Healthi Life?",
    a: "Pricing depends on the protocol duration, route, and whether BPC-157 is prescribed as a standalone intervention or as part of a broader longevity or anti-aging protocol. Initial consultation fees and protocol pricing are disclosed at your first appointment. Contact us via WhatsApp or email for a pre-consultation overview. We do not publish price lists to ensure every guest receives a personalized recommendation — not a menu selection.",
  },
];

const BPCFaq = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Questions</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Everything you need to know.
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-lg px-6 shadow-soft"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

// ─── DISCLAIMER ──────────────────────────────────────────
const Disclaimer = () => (
  <section className="py-8 bg-muted/50">
    <div className="container px-4 sm:px-6 lg:px-8">
      <p className="text-xs text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
        <strong>Medical Disclaimer:</strong> This page is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. BPC-157 protocols at Healthi Life are prescribed exclusively by licensed physicians following a formal medical consultation. Individual results vary. All treatments require prior physician evaluation. Healthi Life does not provide medical services to individuals with contraindications identified during consultation. Consult your physician before beginning any new therapeutic protocol.
      </p>
    </div>
  </section>
);

// ─── MAIN PAGE ───────────────────────────────────────────
const BPC157 = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <BPCHero />
      <WhatIsBPC />
      <BPCBenefits />
      <WhyDoctor />
      <DrFirstSection />
      <ProtocolSection />
      <CTABlock />
      <BPCFaq />
      <Disclaimer />
    </main>
    <Footer />
    <Suspense fallback={null}>
      <WhatsAppWidget />
    </Suspense>
  </div>
);

export default BPC157;
