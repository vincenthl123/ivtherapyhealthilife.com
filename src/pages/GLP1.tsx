import React, { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircle, Shield, Stethoscope, Award, ArrowDown,
  Heart, Brain, Sparkles, AlertTriangle, CheckCircle2,
  ClipboardCheck, Microscope, CalendarCheck, Phone, Mail,
  Syringe, Pill, FlaskConical, Activity, Scale, Flame,
  TrendingDown, Zap, ShieldCheck, Thermometer, TestTube2
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
const GLP1Hero = () => (
  <section className="relative min-h-screen flex items-center pt-16 md:pt-20">
    <div className="absolute inset-0 z-0">
      <img
        src={heroImage}
        alt="GLP-1 Therapy at Healthi Life Bangkok"
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
            <Activity className="h-4 w-4 mr-2" />
            Weight Management · Longevity · Physician-Led
          </Badge>
        </div>

        <h1 className="animate-fade-in-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-[1.15]">
          Metabolic reset.{" "}
          <span className="bg-gradient-medical bg-clip-text text-transparent">
            Longevity optimized.
          </span>
        </h1>

        <p className="animate-fade-in-up text-base md:text-lg text-muted-foreground mb-4 max-w-2xl">
          GLP-1 receptor agonists are redefining medicine — not just for weight, but for how the body ages. At Healthi Life, both indications are treated with equal clinical seriousness.
        </p>

        {/* Stats row */}
        <div className="animate-fade-in-up grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { value: "15%", label: "Avg body weight reduction in clinical trials" },
            { value: "20%", label: "Reduction in major cardiovascular events (SELECT)" },
            { value: "3+", label: "Longevity pathways activated beyond glucose" },
            { value: "Rx", label: "Prescription-only — physician oversight required" },
          ].map((s, i) => (
            <div key={i} className="bg-card/80 backdrop-blur border border-border rounded-lg p-3 text-center shadow-soft">
              <div className="text-lg md:text-xl font-bold text-primary">{s.value}</div>
              <div className="text-[10px] text-muted-foreground mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>


        <div className="animate-scale-in flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-glp1-hero-whatsapp')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Book a Consultation
            </a>
          </Button>
          <Button size="lg" variant="outline" onClick={() => trackButtonClick('ivclick-glp1-hero-learn')} asChild>
            <a href="#what-is-glp1">
              <ArrowDown className="h-5 w-5 mr-2" />
              Understand GLP-1 ↓
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

// ─── WHAT IS GLP-1 ───────────────────────────────────────
const mechanisms = [
  {
    icon: Activity,
    title: "Pancreatic — Insulin & Glucagon",
    description: "Stimulates glucose-dependent insulin secretion and suppresses glucagon. Blood sugar stabilizes without hypoglycemia risk.",
  },
  {
    icon: Brain,
    title: "Hypothalamic — Appetite Suppression",
    description: "Acts on satiety centers in the brain. Reduces caloric intake by 20–35% without willpower — neurochemically mediated hunger reduction.",
  },
  {
    icon: Thermometer,
    title: "Gastric — Slowed Emptying",
    description: "Delays gastric emptying, blunting post-meal glucose spikes and extending satiety. Reduces food reward signaling.",
  },
  {
    icon: Heart,
    title: "Systemic — Cardio, Neuro, Hepatic",
    description: "Direct anti-inflammatory effects on blood vessels, liver (NASH reduction), and brain (neurodegeneration protection). The longevity signal.",
  },
];

const WhatIsGLP1 = () => (
  <section id="what-is-glp1" className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">The Science</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          What is a GLP-1 receptor agonist?
        </h2>

        <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
          <p>
            <strong className="text-foreground">GLP-1 — Glucagon-Like Peptide-1</strong> — is a hormone your body naturally produces in the gut after eating. It tells your pancreas to release insulin, signals your brain that you are full, and slows gastric emptying. In people with metabolic dysfunction, this signal is blunted or insufficient.
          </p>
          <p>
            GLP-1 receptor agonists are synthetic molecules that mimic and amplify this signal — with a longer duration of action than the natural hormone. The result: better glucose regulation, reduced appetite, significant fat loss, and a cascade of systemic effects that extend well beyond blood sugar.
          </p>
          <p>
            <strong className="text-foreground">The most important development of the last decade:</strong> clinical trials have demonstrated that these molecules reduce cardiovascular mortality, protect the brain, reduce liver fat, and modulate inflammation — effects that position them as genuine longevity agents, not merely weight-loss drugs.
          </p>
        </div>

        {/* 4 Mechanisms */}
        <h3 className="text-xl md:text-2xl font-bold text-foreground mt-12 mb-6">How It Works — 4 Mechanisms</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {mechanisms.map((m, i) => (
            <Card key={i} className="group hover:shadow-medium transition-all duration-300 border-border">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <m.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">{m.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{m.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Molecule specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { label: "Class", value: "Incretin Mimetic" },
            { label: "Route", value: "Subcutaneous (Weekly)" },
            { label: "Molecules", value: "Semaglutide · Tirzepatide" },
            { label: "Cycle", value: "3–12 months" },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4 text-center shadow-soft">
              <div className="text-sm md:text-base font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <blockquote className="mt-8 border-l-4 border-primary pl-6 py-4 bg-secondary/30 rounded-r-lg">
          <p className="text-foreground font-medium italic text-sm md:text-base">
            GLP-1 agonists are among the most evidence-backed molecules in modern medicine. Over 40 Phase III trials. Hundreds of thousands of participants. The longevity applications are emerging from real cardiovascular and neurological outcome data — not theory.
          </p>
        </blockquote>
      </div>
    </div>
  </section>
);

// ─── DUAL POSITIONING ────────────────────────────────────
const DualPositioning = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">Two Indications · One Protocol Logic</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Weight management. Longevity optimization.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These are not competing goals. They are two entry points to the same metabolic transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* INDICATION 01 */}
          <Card className="border-border overflow-hidden hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary/60">INDICATION 01</span>
                  <h3 className="text-lg font-bold text-foreground">Metabolic Reset & Weight Management</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                For guests who have struggled with weight despite effort — not from lack of willpower, but from a metabolic environment that works against them. GLP-1 therapy resets the system, not just the number on the scale.
              </p>
              <ul className="space-y-2">
                {[
                  "Visceral fat reduction (metabolically active fat)",
                  "Insulin resistance reversal and glucose normalization",
                  "Appetite neurochemistry correction — not just suppression",
                  "Liver fat reduction (NAFLD/NASH improvement)",
                  "15–22% body weight reduction in 12–18 month protocols",
                  "Integrated with nutrition protocol and body composition tracking",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* INDICATION 02 */}
          <Card className="border-border overflow-hidden hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary/60">INDICATION 02</span>
                  <h3 className="text-lg font-bold text-foreground">Longevity & Metabolic Optimization</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                For lean or metabolically healthy guests who want the systemic protective benefits — cardiovascular, neurological, anti-inflammatory — of a molecule proven to reduce all-cause mortality in large-scale clinical trials.
              </p>
              <ul className="space-y-2">
                {[
                  "20% reduction in major cardiovascular events (SELECT trial, 2023)",
                  "Neuroinflammation reduction — Alzheimer's risk signal emerging",
                  "CRP and systemic inflammation markers measurably reduced",
                  "mTOR and cellular senescence pathways modulated",
                  "Compatible with NAD+, peptide, and hormonal longevity stacks",
                  "Used at lower doses — outcome is optimization, not transformation",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA 1 */}
        <div className="max-w-2xl mx-auto mt-14 text-center">
          <p className="text-muted-foreground mb-5 text-base">
            Not sure which indication applies to you? Let our physician assess your metabolic profile personally.
          </p>
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-glp1-mid-cta-1')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Talk to Your Medical Concierge
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

// ─── THE MOLECULES ───────────────────────────────────────
const MoleculesSection = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">The Molecules</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Semaglutide & Tirzepatide.
        </h2>
        <p className="text-lg text-muted-foreground mb-10">What's the difference?</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Semaglutide */}
          <Card className="border-border overflow-hidden hover:shadow-medium transition-all duration-300">
            <div className="bg-primary/5 p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Syringe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">SEMAGLUTIDE</h3>
                  <p className="text-xs text-muted-foreground">GLP-1 Agonist · Weekly SC injection</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Semaglutide is the most studied GLP-1 receptor agonist in history. It binds selectively to GLP-1 receptors with approximately 94% amino acid homology to native human GLP-1. Its extended half-life (~7 days) allows once-weekly dosing. Clinical trials have demonstrated 15–17% average body weight reduction and landmark cardiovascular outcome data.
              </p>
              <div className="space-y-2">
                {[
                  { label: "Receptor", value: "GLP-1 receptor (selective)" },
                  { label: "Half-life", value: "~7 days" },
                  { label: "Weight reduction", value: "~15–17% average" },
                  { label: "Cardio data", value: "SELECT trial — 20% MACE reduction" },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between text-xs border-b border-border/50 pb-1.5">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-semibold text-foreground text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tirzepatide */}
          <Card className="border-border overflow-hidden hover:shadow-medium transition-all duration-300">
            <div className="bg-primary/5 p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FlaskConical className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">TIRZEPATIDE</h3>
                  <p className="text-xs text-muted-foreground">GLP-1 / GIP Dual Agonist · Weekly SC injection</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Tirzepatide represents the next generation of incretin therapy — a dual agonist that targets both GLP-1 and GIP receptors simultaneously. The GIP component adds a distinct metabolic pathway: enhanced fat metabolism, additional appetite suppression, and potentially superior metabolic outcomes. Phase III trials demonstrated 20–22% body weight reduction.
              </p>
              <div className="space-y-2">
                {[
                  { label: "Receptors", value: "GLP-1 + GIP (dual)" },
                  { label: "Half-life", value: "~5 days" },
                  { label: "Weight reduction", value: "~20–22% average (SURMOUNT)" },
                  { label: "Differentiation", value: "Superior fat mass reduction" },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between text-xs border-b border-border/50 pb-1.5">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-semibold text-foreground text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <blockquote className="mt-8 border-l-4 border-primary pl-6 py-4 bg-secondary/30 rounded-r-lg">
          <p className="text-foreground font-medium italic text-sm">
            <strong>Note — Molecule Selection:</strong> The choice between semaglutide and tirzepatide is a clinical decision — not a preference. Dr. First selects the molecule based on your metabolic profile, starting biomarkers, primary indication, and tolerance history. Both are available at Healthi Life under physician prescription.
          </p>
        </blockquote>
      </div>
    </div>
  </section>
);

// ─── WHY DOCTOR ──────────────────────────────────────────
const risks = [
  {
    icon: AlertTriangle,
    number: "01",
    title: "Contraindication Screening",
    description: "Personal or family history of medullary thyroid carcinoma or MEN2 syndrome are absolute contraindications. Pancreatitis history, severe renal impairment, and certain GI conditions require careful assessment before prescribing.",
  },
  {
    icon: Syringe,
    number: "02",
    title: "Dose Titration Protocol",
    description: "Starting at full dose causes nausea, vomiting, and protocol dropout. Proper titration — typically 4-week increments — determines whether a guest succeeds or abandons. This cannot be guessed without clinical oversight.",
  },
  {
    icon: Scale,
    number: "03",
    title: "Muscle Mass Protection",
    description: "GLP-1 therapy reduces total body weight — including lean mass. Without a structured protocol that includes resistance work and protein optimization, patients lose muscle alongside fat. This is a longevity negative.",
  },
  {
    icon: Microscope,
    number: "04",
    title: "Biomarker Monitoring",
    description: "Lipase, amylase, thyroid, kidney function, and metabolic panels require monitoring throughout the protocol. Sourcing GLP-1 without follow-up labs is not a protocol — it is an experiment.",
  },
  {
    icon: ShieldCheck,
    number: "05",
    title: "Supply Quality & Cold Chain",
    description: "GLP-1 peptides are temperature-sensitive and frequently counterfeited. Healthi Life sources exclusively through verified medical-grade channels. Grey-market sourcing means unknown degradation and unknown purity.",
  },
];

const WhyDoctor = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Medical Oversight</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Why this cannot be self-prescribed.
        </h2>

        <div className="text-muted-foreground space-y-4 mb-6 text-base leading-relaxed">
          <p>
            GLP-1 agonists are among the most effective metabolic tools available — and among the most misused. The global rise of grey-market sourcing, unmonitored dosing, and prescription without workup has produced a predictable outcome: avoidable side effects, poor results, and patients who abandon the therapy before it works.
          </p>
        </div>

        <blockquote className="border-l-4 border-primary/40 pl-6 py-3 mb-8 rounded-r-lg" style={{ backgroundColor: '#F5EDDC' }}>
          <p className="text-foreground font-medium italic">
            "GLP-1 therapy works. What fails is the absence of medical intelligence around it — wrong candidate, wrong dose, wrong titration, zero monitoring."
          </p>
        </blockquote>

        <p className="text-muted-foreground mb-8 text-base leading-relaxed">
          At Healthi Life, every GLP-1 protocol begins with a complete metabolic workup. We identify contraindications, set the right starting dose, manage titration carefully, and monitor outcomes at every checkpoint. The molecule does not change. The outcome does.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {risks.map((r, i) => (
            <Card key={i} className="border-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#F5EDDC' }}>
                    <r.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary/60">{r.number}</span>
                </div>
                <h4 className="font-bold text-foreground text-sm mb-1">{r.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA 2 */}
        <div className="mt-12 p-6 md:p-8 rounded-2xl border border-primary/20 bg-primary/5 text-center">
          <p className="text-foreground font-semibold text-lg mb-2">
            Don't self-prescribe. Talk to a physician who understands metabolic medicine.
          </p>
          <p className="text-muted-foreground text-sm mb-5">
            One WhatsApp message. Direct access to our medical concierge.
          </p>
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-glp1-mid-cta-2')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Talk Now
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

// ─── DR FIRST CARD ───────────────────────────────────────
const DrFirstSection = () => (
  <section className="py-16 md:py-24 bg-background">
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
                {["MD — Licensed Physician", "Specialist: Dermatology", "Peptides & Regenerative Medicine", "Metabolic & Anti-Aging Protocols", "Healthi Life — Ekkamai, Bangkok"].map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-5">
                <p className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">Prescription Authority</p>
                <p className="text-sm text-foreground">
                  All GLP-1 protocols at Healthi Life are written, titrated, and monitored by Dr. First personally.
                </p>
              </div>

              <blockquote className="border-l-4 border-primary pl-4 py-2 mb-5 bg-primary/5 rounded-r-lg">
                <p className="text-sm text-foreground italic font-medium">
                  "Every GLP-1 prescription is a clinical decision — not a product recommendation."
                </p>
              </blockquote>

              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  Dr. First oversees all metabolic and anti-aging protocols at Healthi Life, including GLP-1 therapy, peptide programs, IV nutrition, and hormonal optimization. His approach starts with biology: no molecule is prescribed without a clear indication, a clean contraindication screen, and a defined monitoring plan.
                </p>
                <p>
                  His background in dermatology — which requires deep understanding of systemic metabolic and hormonal dynamics — gives him a precise clinical lens for GLP-1 outcomes: not just weight on a scale, but visceral fat distribution, skin quality, inflammatory markers, and biological age indicators.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {["Biomarker-First", "Clinical Decision", "Active Monitoring"].map((tag, i) => (
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
    title: "Physician Consultation",
    description: "Medical history, goals, contraindication screening. Dr. First reviews your case personally. 45 min in-clinic or pre-consult via WhatsApp.",
  },
  {
    icon: Microscope,
    day: "Day 1–4",
    title: "Metabolic Workup",
    description: "Fasting glucose, HbA1c, lipase, thyroid, kidney function, lipid panel, body composition (InBody). Baseline established before prescribing.",
  },
  {
    icon: ClipboardCheck,
    day: "Day 4–7",
    title: "Protocol Written",
    description: "Molecule selected. Starting dose defined. Titration schedule. Nutrition guidelines. Written protocol PDF delivered. WhatsApp support channel opened.",
  },
  {
    icon: CalendarCheck,
    day: "Week 4 / 8",
    title: "Mid-Protocol Review",
    description: "Biomarker recheck. Weight and body composition reassessment. Dose adjustment if indicated. Side effect review and management if needed.",
  },
  {
    icon: Activity,
    day: "Month 3–12",
    title: "Continuation & Stack Integration",
    description: "Long-term protocol defined. GLP-1 stacked with longevity program if indicated. Maintenance dose established. Annual metabolic review calendar set.",
  },
];

const ProtocolSection = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Step by Step</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          What your protocol looks like.
        </h2>
        <p className="text-lg text-muted-foreground">
          From first contact to active results — five structured steps with zero ambiguity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
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
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA 3 */}
      <div className="max-w-2xl mx-auto mt-14 text-center">
        <p className="text-muted-foreground mb-5 text-base">
          Your journey starts with a single conversation. No commitment — just clarity.
        </p>
        <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-glp1-mid-cta-3')} asChild>
          <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Talk to Your Medical Concierge
          </a>
        </Button>
      </div>
    </div>
  </section>
);

// ─── CTA BLOCK ───────────────────────────────────────────
const CTABlock = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Start Today</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          One consultation. A protocol built for you.
        </h2>
        <p className="text-lg text-muted-foreground mb-10">
          Whether your goal is metabolic transformation or long-term longevity optimization — the first step is the same: a physician who understands both.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {[
            { icon: Stethoscope, label: "Physician-Supervised", desc: "Dr. First reviews every case before any prescription is written. No exceptions." },
            { icon: Microscope, label: "Biomarker-First Protocol", desc: "Full metabolic workup before prescribing. Your biology defines your protocol." },
            { icon: Shield, label: "Legal in Thailand", desc: "GLP-1 agonists are legal when prescribed by a licensed physician. Fully compliant." },
            { icon: ClipboardCheck, label: "Written Protocol + Monitoring", desc: "Every prescription documented. Regular labs and check-ins throughout your cycle." },
            { icon: Scale, label: "Muscle Preservation Built In", desc: "Nutrition and body composition protocol integrated from day one. Fat loss — not muscle loss." },
          ].map((g, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4 shadow-soft text-center">
              <g.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <h4 className="font-bold text-foreground text-sm">{g.label}</h4>
              <p className="text-xs text-muted-foreground mt-1">{g.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-glp1-cta-whatsapp')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Book via WhatsApp
            </a>
          </Button>
          <Button size="lg" variant="outline" onClick={() => trackButtonClick('ivclick-glp1-cta-email')} asChild>
            <a href="mailto:contact@healthi-life.com">
              <Mail className="h-5 w-5 mr-2" />
              contact@healthi-life.com
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
    q: "Is GLP-1 therapy legal in Thailand?",
    a: "Yes. Semaglutide and tirzepatide are legal in Thailand when prescribed by a licensed physician. Neither molecule is a controlled substance. At Healthi Life, all GLP-1 protocols are written exclusively by Dr. First (MD), ensuring full regulatory compliance. We do not dispense these medications without a prior medical consultation, contraindication screening, and formal prescription.",
  },
  {
    q: "I am not diabetic and not obese. Can I still benefit from GLP-1 therapy?",
    a: "Yes — and this is precisely the longevity indication. The cardiovascular, neurological, and anti-inflammatory benefits demonstrated in clinical trials were observed across populations that included individuals without diabetes and without significant obesity. GLP-1 agonists at lower doses can provide systemic protective benefits — reduced visceral fat, improved inflammatory markers, cardiovascular protection, and potential neurodegeneration risk reduction — independent of significant weight loss. Indication assessment happens in your initial consultation with Dr. First.",
  },
  {
    q: "What are the common side effects? Are they manageable?",
    a: "The most common side effects are gastrointestinal: nausea, reduced appetite, occasional vomiting, and constipation — particularly in the first weeks of titration. These are dose-dependent and transient in most cases. Proper titration (starting at low dose and increasing over 4-week increments) dramatically reduces their incidence. Serious adverse events — acute pancreatitis, gallbladder disease — are rare and are screened for prior to prescription. Absolute contraindications are identified in your initial workup.",
  },
  {
    q: "Will I lose muscle mass on GLP-1?",
    a: "This is the most important practical concern with GLP-1 therapy — and it is real. Unmanaged protocols that focus only on weight loss often result in significant lean mass loss. At Healthi Life, every GLP-1 protocol includes body composition monitoring (InBody), protein intake guidance, and resistance training recommendations. When relevant, we integrate supportive protocols for tissue preservation. The goal is fat loss and metabolic improvement — not simply a lower number on the scale.",
  },
  {
    q: "How long does a GLP-1 protocol last? What happens when I stop?",
    a: "Weight management protocols typically run 6–18 months. Longevity optimization protocols may be shorter cycles of 3–6 months with maintenance phases. When GLP-1 therapy is stopped without lifestyle consolidation, weight regain is common — clinical trials have documented this clearly. Our protocol design includes a maintenance strategy and metabolic lifestyle anchoring specifically to address this. The molecule is a tool. The lasting result depends on what is built around it during the protocol.",
  },
  {
    q: "What does the first consultation include and how much does it cost?",
    a: "The initial consultation covers full medical history review, indication assessment, contraindication screening, metabolic workup requisition, and preliminary protocol design. Consultation fees and protocol pricing are disclosed at booking. We do not publish price lists — every guest receives a personalized protocol, not a packaged product. Contact us via WhatsApp or email to schedule.",
  },
];

const GLP1Faq = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Questions</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Answered directly.
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

// ─── FOOTER ──────────────────────────────────────────────
const GLP1Footer = () => (
  <section className="py-8 bg-muted/30 border-t border-border">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <p className="text-sm text-foreground font-semibold">
          Healthi Life — The Urban Longevity House · Ekkamai 10, Bangkok
        </p>
        <p className="text-xs text-muted-foreground">
          Doctor-led · Protocol-driven · Premium · Long-term
        </p>
        <p className="text-xs text-muted-foreground">
          +66 91 999 1744 · contact@healthi-life.com · healthi-life.com
        </p>
        <div className="flex flex-wrap gap-2 justify-center pt-2">
          {["NAD+ IV", "BPC-157", "GLP-1", "Longevity Program"].map((link, i) => (
            <Badge key={i} variant="secondary" className="text-xs">{link}</Badge>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── DISCLAIMER ──────────────────────────────────────────
const Disclaimer = () => (
  <section className="py-8 bg-muted/50">
    <div className="container px-4 sm:px-6 lg:px-8">
      <p className="text-xs text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
        <strong>Medical Disclaimer:</strong> This page is for informational purposes only and does not constitute medical advice, diagnosis, or treatment recommendation. GLP-1 receptor agonist therapy at Healthi Life is prescribed exclusively by licensed physicians following a formal medical consultation and contraindication screening. Individual results vary significantly. The statistics referenced are from published clinical trials and do not represent guaranteed outcomes. All treatments carry risks that are reviewed in detail during your physician consultation. Healthi Life does not prescribe GLP-1 therapy to individuals with identified contraindications. This page does not reference or promote any specific pharmaceutical brand. Consult a licensed physician before beginning any new therapeutic protocol.
      </p>
    </div>
  </section>
);

// ─── MAIN PAGE ───────────────────────────────────────────
const GLP1 = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <GLP1Hero />
      <WhatIsGLP1 />
      <DualPositioning />
      <MoleculesSection />
      <WhyDoctor />
      <DrFirstSection />
      <ProtocolSection />
      <CTABlock />
      <GLP1Faq />
      <GLP1Footer />
      <Disclaimer />
    </main>
    <Footer />
    <Suspense fallback={null}>
      <WhatsAppWidget />
    </Suspense>
  </div>
);

export default GLP1;
