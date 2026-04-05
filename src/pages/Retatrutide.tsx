import React, { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PeptideSEO from "@/components/PeptideSEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircle, Shield, Stethoscope, Award, ArrowDown,
  Heart, Brain, Sparkles, AlertTriangle, CheckCircle2,
  ClipboardCheck, Microscope, CalendarCheck, Phone, Mail,
  Syringe, Pill, FlaskConical, Activity, Scale, Flame,
  TrendingDown, Zap, ShieldCheck, Thermometer, TestTube2,
  Dumbbell, Clock, RefreshCw, Target, Users, XCircle,
  BarChart3, FileText, Utensils, BicepsFlexed, Info, Layers
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
const RetaHero = () => (
  <section className="relative min-h-screen flex items-center pt-16 md:pt-20">
    <div className="absolute inset-0 z-0">
      <img
        src={heroImage}
        alt="Retatrutide Triple Agonist Therapy at Healthi Life Bangkok"
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
            <Layers className="h-4 w-4 mr-2" />
            Advanced Weight Management · Triple Agonist · Physician-Led · Bangkok
          </Badge>
        </div>

        <h1 className="animate-fade-in-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-[1.15]">
          The next generation{" "}
          <span className="bg-gradient-medical bg-clip-text text-transparent">
            is here.
          </span>
        </h1>

        <p className="animate-fade-in-up text-base md:text-lg text-muted-foreground mb-4 max-w-2xl">
          Retatrutide is the first triple receptor agonist in clinical development — targeting GLP-1, GIP, and glucagon simultaneously. Phase II trials reported up to 24.2% body weight reduction at 48 weeks. Nothing in the incretin class has produced results at this level.
        </p>

        {/* Stats row */}
        <div className="animate-fade-in-up grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { value: "24.2%", label: "Average body weight reduction at 48 weeks (Phase II, highest dose)" },
            { value: "3", label: "Receptor targets simultaneously: GLP-1 · GIP · Glucagon" },
            { value: "48w", label: "Timeline to peak results in Phase II clinical trial" },
            { value: "Rx", label: "Prescription-only · Physician oversight required" },
          ].map((s, i) => (
            <div key={i} className="bg-card/80 backdrop-blur border border-border rounded-lg p-3 text-center shadow-soft">
              <div className="text-lg md:text-xl font-bold text-primary">{s.value}</div>
              <div className="text-[10px] text-muted-foreground mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        <blockquote className="animate-fade-in-up border-l-4 border-primary/40 pl-4 py-2 mb-6 rounded-r-lg" style={{ backgroundColor: '#F5EDDC' }}>
          <p className="text-foreground font-medium italic text-sm">
            "Semaglutide targets one receptor. Tirzepatide targets two. Retatrutide targets three. The results reflect the difference."
          </p>
        </blockquote>

        <div className="animate-scale-in flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-reta-hero-whatsapp')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Book a Consultation
            </a>
          </Button>
          <Button size="lg" variant="outline" onClick={() => trackButtonClick('ivclick-reta-hero-learn')} asChild>
            <a href="#clinical-context">
              <ArrowDown className="h-5 w-5 mr-2" />
              Understand the science ↓
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

// ─── IMPORTANT CLINICAL CONTEXT ──────────────────────────
const ClinicalContext = () => (
  <section id="clinical-context" className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Transparency First</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Before reading further, one fact must be stated clearly.
        </h2>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Phase III — Not Yet Approved</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Retatrutide is currently in Phase III clinical trials. It is not yet FDA-approved or EMA-approved for commercial use as a weight management drug.
                </p>
              </div>
            </div>

            <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
              <p>
                It is available at Healthi Life as a physician-prescribed peptide under the same regulatory framework as other research-grade molecules used in precision medicine — <strong className="text-foreground">legal in Thailand under physician prescription</strong>, sourced from certified suppliers, prescribed exclusively after full clinical assessment.
              </p>
              <p>
                We present the Phase II trial data accurately and without distortion. We do not overstate what is known. We do not understate what the data shows. Every guest who receives retatrutide at Healthi Life does so with <strong className="text-foreground">full informed consent</strong>, a complete understanding of where the evidence stands, and active physician monitoring throughout.
              </p>
              <p className="text-foreground font-medium">
                This is the most promising molecule in metabolic medicine right now. It is also the one that demands the highest standard of clinical oversight. We provide both.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// ─── WHAT IS RETATRUTIDE ─────────────────────────────────
const WhatIsRetatrutide = () => (
  <section id="what-is-retatrutide" className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">The Science</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          What is retatrutide?
        </h2>

        <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
          <p>
            Retatrutide is a <strong className="text-foreground">triple receptor agonist</strong> — a single molecule that simultaneously activates three distinct hormonal pathways: GLP-1 (glucagon-like peptide-1), GIP (glucose-dependent insulinotropic polypeptide), and the glucagon receptor. It was developed to go beyond what dual agonists like tirzepatide can achieve by adding a third mechanism — glucagon receptor activation — that none of its predecessors target.
          </p>
          <p>
            The addition of the glucagon receptor component is the critical innovation. Glucagon receptor activation in the liver and adipose tissue drives significant <strong className="text-foreground">fat mobilization and energy expenditure</strong>. At the doses used in retatrutide, the glucagon component increases the rate at which stored fat is broken down and used as fuel — on top of the appetite and insulin effects of GLP-1 and GIP.
          </p>
          <p>
            The result in Phase II: body weight reductions that exceed anything previously documented in the incretin class. Not modestly. Significantly.
          </p>
        </div>

        {/* 3 Mechanisms */}
        <h3 className="text-xl md:text-2xl font-bold text-foreground mt-12 mb-6">How it works — 3 simultaneous mechanisms</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: Brain,
              title: "GLP-1 Receptor Activation",
              subtitle: "Appetite & Glucose",
              description: "Identical mechanism to semaglutide. Acts on hypothalamic satiety centers, reduces appetite neurochemically, stimulates glucose-dependent insulin secretion, slows gastric emptying. The foundation of the incretin effect — now one of three components.",
            },
            {
              icon: Activity,
              title: "GIP Receptor Activation",
              subtitle: "Fat Metabolism & Insulin Sensitivity",
              description: "Identical mechanism to the GIP component of tirzepatide. Enhances fat metabolism in adipose tissue, improves insulin sensitivity through a distinct pathway from GLP-1, and — critically — appears to reduce the gastrointestinal side effects of GLP-1 stimulation when combined.",
            },
            {
              icon: Flame,
              title: "Glucagon Receptor Activation",
              subtitle: "Energy Expenditure & Fat Mobilization",
              description: "The third mechanism — and the differentiator. Glucagon receptor activation stimulates lipolysis: the breakdown of stored triglycerides into free fatty acids used for energy. It increases resting energy expenditure — the body burns more calories at rest. This explains why retatrutide's results exceed the dual agonist class.",
            },
          ].map((m, i) => (
            <Card key={i} className="group hover:shadow-medium transition-all duration-300 border-border">
              <div className="bg-primary/5 p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <m.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{m.title}</h4>
                    <p className="text-xs text-primary/70">{m.subtitle}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Molecular specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { label: "Class", value: "Triple Receptor Agonist" },
            { label: "Targets", value: "GLP-1 / GIP / Glucagon" },
            { label: "Half-life", value: "~6 days" },
            { label: "Route", value: "SC · Weekly" },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4 text-center shadow-soft">
              <div className="text-sm md:text-base font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            { label: "Trial Status", value: "Phase III Ongoing" },
            { label: "Approval", value: "Not Yet FDA/EMA" },
            { label: "Status TH", value: "Legal · Physician Rx" },
            { label: "Prescription", value: "Dr. First (MD)" },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4 text-center shadow-soft">
              <div className="text-sm md:text-base font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── PHASE II DATA ───────────────────────────────────────
const PhaseIIData = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">The Clinical Evidence</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          What the trial actually showed — accurately presented.
        </h2>
        <p className="text-muted-foreground text-base mb-10 leading-relaxed">
          The Phase II retatrutide trial was published in the <strong className="text-foreground">New England Journal of Medicine</strong> in June 2023. It is the most significant weight loss trial result published in the modern era of incretin medicine.
        </p>

        {/* Trial design */}
        <Card className="border-border mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#F5EDDC' }}>
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Trial Design</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Randomized, double-blind, placebo-controlled Phase II trial. 338 participants. Adults with obesity (BMI 30–50) or overweight (BMI 27–50) with at least one weight-related comorbidity. No type 2 diabetes. 48-week treatment period. Multiple dose cohorts tested.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results by dose */}
        <h3 className="text-lg font-bold text-foreground mb-4">Key results by dose cohort (48 weeks):</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {[
            { dose: "1 mg/wk", result: "8.7%" },
            { dose: "4 mg/wk", result: "17.5%" },
            { dose: "8 mg/wk", result: "22.8%" },
            { dose: "12 mg/wk", result: "24.2%" },
            { dose: "Placebo", result: "2.1%" },
          ].map((d, i) => (
            <div key={i} className={`bg-card border rounded-lg p-4 text-center shadow-soft ${i === 3 ? 'border-primary/40 ring-2 ring-primary/20' : 'border-border'}`}>
              <div className="text-xl md:text-2xl font-bold text-primary">{d.result}</div>
              <div className="text-xs text-muted-foreground mt-1">{d.dose}</div>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <h3 className="text-lg font-bold text-foreground mb-4">For context — direct comparison with published trial data:</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { molecule: "Semaglutide 2.4 mg", trial: "STEP 1, 68 weeks", result: "14.9%", receptors: "GLP-1" },
            { molecule: "Tirzepatide 15 mg", trial: "SURMOUNT-1, 72 weeks", result: "20.9%", receptors: "GLP-1 + GIP" },
            { molecule: "Retatrutide 12 mg", trial: "Phase II, 48 weeks", result: "24.2%", receptors: "GLP-1 + GIP + Glucagon" },
          ].map((c, i) => (
            <Card key={i} className={`border-border ${i === 2 ? 'ring-2 ring-primary/20 border-primary/30' : ''}`}>
              <CardContent className="p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{c.result}</div>
                <h4 className="font-bold text-foreground text-sm mb-1">{c.molecule}</h4>
                <p className="text-xs text-muted-foreground">{c.trial}</p>
                <Badge variant="secondary" className="text-xs mt-2">{c.receptors}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Caveats */}
        <h3 className="text-lg font-bold text-foreground mb-4">Three important caveats presented with full transparency:</h3>
        <div className="space-y-3 mb-8">
          {[
            { num: "1", title: "Phase II vs. Phase III", text: "Phase II trials are smaller and shorter than Phase III. The 24.2% figure comes from a 338-person trial. Phase III trials involve thousands of participants and longer follow-up. Results may differ at scale." },
            { num: "2", title: "Timeline difference", text: "Semaglutide and tirzepatide data are from 68–72 week trials. Retatrutide Phase II ran 48 weeks. The comparison is directionally informative — not directly equivalent." },
            { num: "3", title: "Ongoing monitoring", text: "Phase III safety and efficacy data will further define the risk-benefit profile. Prescribing retatrutide today means prescribing on Phase II data — which is why physician oversight and active monitoring are non-negotiable at Healthi Life." },
          ].map((c, i) => (
            <Card key={i} className="border-border">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-sm font-bold text-primary">{c.num}</div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">{c.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">{c.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <blockquote className="border-l-4 border-primary/40 pl-6 py-3 mb-8 rounded-r-lg" style={{ backgroundColor: '#F5EDDC' }}>
          <p className="text-foreground font-medium italic text-sm md:text-base">
            "We present these numbers with full context because our guests make better decisions with accurate information than with selective statistics."
          </p>
        </blockquote>

        {/* Additional findings */}
        <h3 className="text-lg font-bold text-foreground mb-4">Additional Phase II findings:</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "26% reduction in waist circumference (highest dose cohort)",
            "Significant improvements in fasting glucose, insulin, and HbA1c",
            "Favorable lipid profile changes — LDL and triglyceride reduction",
            "Blood pressure reduction observed across all cohorts",
            "Side effect profile: predominantly GI, manageable with titration",
            "Low dropout rates across dose cohorts",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── COMPARISON TABLE ────────────────────────────────────
const ComparisonSection = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">The Comparison</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Understanding where retatrutide sits in the incretin class.
        </h2>

        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-muted-foreground font-semibold"></th>
                <th className="text-center p-3 text-foreground font-bold">Semaglutide</th>
                <th className="text-center p-3 text-foreground font-bold">Tirzepatide</th>
                <th className="text-center p-3 text-primary font-bold bg-primary/5 rounded-t-lg">Retatrutide</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Receptors targeted", s: "GLP-1", t: "GLP-1 + GIP", r: "GLP-1 + GIP + Glucagon" },
                { label: "Avg. weight reduction", s: "~15–17%", t: "~20–22%", r: "~24% (Phase II)" },
                { label: "Trial duration", s: "68–72 weeks", t: "72 weeks", r: "48 weeks" },
                { label: "Approval status", s: "FDA approved", t: "FDA approved", r: "Phase III — not yet approved" },
                { label: "Energy expenditure", s: "Indirect", t: "Moderate", r: "Direct — glucagon-driven" },
                { label: "CV outcome data", s: "SELECT — 20% MACE reduction", t: "Ongoing (SURPASS-CVOT)", r: "Phase III — pending" },
                { label: "Available at HL", s: "Yes", t: "Yes", r: "Yes — physician Rx" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="p-3 text-foreground font-medium text-xs">{row.label}</td>
                  <td className="p-3 text-center text-muted-foreground text-xs">{row.s}</td>
                  <td className="p-3 text-center text-muted-foreground text-xs">{row.t}</td>
                  <td className="p-3 text-center text-primary font-medium text-xs bg-primary/5">{row.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-muted-foreground space-y-4 text-base leading-relaxed">
          <p>
            The clinical decision between these three molecules is not a ranking exercise. It is an indication assessment. Retatrutide is not automatically the right choice because it produces the largest weight loss. It is the right choice for <strong className="text-foreground">specific candidates</strong> — those who have not achieved target response on semaglutide or tirzepatide, those with the most significant metabolic burden, and those who, after full informed consent, choose the most advanced option available under close physician supervision.
          </p>
        </div>

        <blockquote className="mt-8 border-l-4 border-primary/40 pl-6 py-3 rounded-r-lg" style={{ backgroundColor: '#F5EDDC' }}>
          <p className="text-foreground font-medium italic text-sm md:text-base">
            "More powerful is not always better. It is better for the right candidate. That determination happens in the consultation room — not on this page."
          </p>
        </blockquote>
      </div>
    </div>
  </section>
);

// ─── WHO THIS IS FOR ─────────────────────────────────────
const WhoIsFor = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">Indications</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Retatrutide is not the first choice for every guest. Here is who it is most appropriate for.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card className="border-border overflow-hidden hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary/60">PROFILE 01</span>
                  <h3 className="text-base font-bold text-foreground">The Non-Responder to GLP-1</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                You have been on semaglutide — properly titrated, properly monitored — and your response has plateaued below your clinical target. Your metabolic burden requires a more powerful intervention. Adding a second and third receptor pathway may produce the response the single-agonist could not.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border overflow-hidden hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary/60">PROFILE 02</span>
                  <h3 className="text-base font-bold text-foreground">The High-Burden Metabolic Guest</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                BMI significantly above 35. Multiple metabolic comorbidities — insulin resistance, dyslipidemia, hypertension, visceral adiposity. A guest for whom the magnitude of metabolic reset required is proportional to the magnitude of what retatrutide can offer.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border overflow-hidden hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FlaskConical className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary/60">PROFILE 03</span>
                  <h3 className="text-base font-bold text-foreground">The Informed Frontier Guest</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Metabolically sophisticated. Has reviewed the Phase II data, understands the approval status, and wants access to the most advanced incretin option available under physician supervision. Seeks maximum metabolic intervention with maximum clinical oversight.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Who should NOT */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="h-6 w-6 text-destructive" />
              <h3 className="text-lg font-bold text-foreground">Who should NOT start with retatrutide</h3>
            </div>
            <ul className="space-y-2">
              {[
                "Guests with no prior GLP-1 therapy experience — semaglutide or tirzepatide is the appropriate starting point",
                "Guests with significant cardiovascular history pending Phase III cardiovascular outcome data",
                "Guests unwilling or unable to commit to the monitoring protocol — more powerful molecule, more mandatory oversight",
                "Guests with identified contraindications from the GLP-1 class that apply equally here",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// ─── MUSCLE MASS IMPERATIVE ──────────────────────────────
const MuscleMass = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Critical Clinical Note</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          The stronger the weight loss signal, the more important muscle preservation becomes.
        </h2>

        <div className="text-muted-foreground space-y-4 mb-8 text-base leading-relaxed">
          <p>
            If 25–39% of weight lost on semaglutide can be lean mass in unmonitored protocols — the same risk exists at higher magnitude with retatrutide. At 24% total body weight reduction, the lean mass risk is proportionally larger. A guest losing 20 kg on retatrutide could lose <strong className="text-foreground">5–8 kg of lean mass</strong> without a muscle preservation protocol.
          </p>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-6">At Healthi Life, every retatrutide protocol includes:</h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Scale, title: "InBody Tracking", desc: "Body composition scan at baseline, week 8, month 3, and month 6 — tracking fat mass and lean mass separately." },
            { icon: Utensils, title: "Protein Prescription", desc: "Individualized to lean body mass — not generic guidelines." },
            { icon: Dumbbell, title: "Resistance Training", desc: "Integrated from day one — adapted to physical capacity." },
            { icon: Syringe, title: "BPC-157 Integration", desc: "When indicated — tissue repair and anabolic environment support." },
            { icon: Activity, title: "Dose Management", desc: "Calibrated to fat loss rate — not maximum tolerated dose as default." },
          ].map((item, i) => (
            <Card key={i} className="border-border">
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mb-3" style={{ backgroundColor: '#F5EDDC' }}>
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-bold text-foreground text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <blockquote className="mt-8 border-l-4 border-primary/40 pl-6 py-3 rounded-r-lg" style={{ backgroundColor: '#F5EDDC' }}>
          <p className="text-foreground font-medium italic text-sm md:text-base">
            "The goal is not the largest number on the weight loss chart. The goal is the best body composition outcome — which requires protecting what should not be lost."
          </p>
        </blockquote>
      </div>
    </div>
  </section>
);

// ─── WHY DOCTOR ──────────────────────────────────────────
const whyDoctorReasons = [
  {
    icon: FileText,
    number: "01",
    title: "Full Informed Consent",
    description: "Every guest prescribed retatrutide receives a complete explanation of the Phase II data, the Phase III status, the known side effect profile, the unknowns, and the monitoring protocol. No prescription is written without documented informed consent.",
  },
  {
    icon: AlertTriangle,
    number: "02",
    title: "Contraindication Screening",
    description: "All GLP-1 class contraindications apply: MTC, MEN2, pancreatitis, severe renal impairment. Additionally, the glucagon receptor component requires assessment in guests with significant hepatic conditions or hypoglycemia-associated disorders.",
  },
  {
    icon: Microscope,
    number: "03",
    title: "Baseline Metabolic Panel",
    description: "Fasting glucose, HbA1c, full lipid panel, liver enzymes, kidney function, CRP, fasting insulin, InBody. The most comprehensive metabolic baseline in the incretin class — because the molecule demands it.",
  },
  {
    icon: CalendarCheck,
    number: "04",
    title: "Active Monitoring Protocol",
    description: "More frequent check-ins than semaglutide or tirzepatide. Biomarker review at week 8 is mandatory. Body composition tracking at every review. Any significant adverse signal triggers immediate protocol reassessment.",
  },
  {
    icon: Target,
    number: "05",
    title: "Exit Strategy — Pre-Planned",
    description: "The transition off retatrutide is defined before the protocol begins. Stopping an advanced incretin without a plan produces advanced regain. The exit is part of the prescription.",
  },
];

const WhyDoctor = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Medical Oversight</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Retatrutide requires the highest standard of clinical oversight in the incretin class.
        </h2>

        <div className="text-muted-foreground space-y-4 mb-6 text-base leading-relaxed">
          <p>
            Retatrutide is Phase III. It is the most powerful molecule in its class. It is available at Healthi Life under physician prescription with full informed consent and active monitoring. It is not available as a self-prescribed, unmonitored protocol — under any circumstances.
          </p>
        </div>

        <blockquote className="border-l-4 border-primary/40 pl-6 py-3 mb-8 rounded-r-lg" style={{ backgroundColor: '#F5EDDC' }}>
          <p className="text-foreground font-medium italic">
            "The more powerful the tool, the more important the hand holding it."
          </p>
        </blockquote>

        <h3 className="text-lg font-bold text-foreground mb-6">5 non-negotiable clinical requirements:</h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyDoctorReasons.map((r, i) => (
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
                {["MD — Licensed Physician", "Specialist: Dermatology", "Metabolic & Anti-Aging Medicine", "Peptides & Regenerative Protocols", "Healthi Life — Ekkamai, Bangkok"].map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-5">
                <p className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">Prescription Authority</p>
                <p className="text-sm text-foreground">
                  All retatrutide protocols at Healthi Life are written, titrated, and monitored by Dr. First personally.
                </p>
              </div>

              <blockquote className="border-l-4 border-primary pl-4 py-2 mb-5 bg-primary/5 rounded-r-lg">
                <p className="text-sm text-foreground italic font-medium">
                  "Retatrutide is the most powerful metabolic tool I currently prescribe. That is precisely why I require the most complete workup before writing a single dose."
                </p>
              </blockquote>

              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  Dr. First's approach to retatrutide is built on one principle: the power of the molecule must be matched by the precision of the protocol. He does not prescribe retatrutide as a first-line option, as a default for guests seeking maximum results, or without a complete metabolic baseline and formal informed consent process.
                </p>
                <p>
                  His clinical lens spans both the internal metabolic markers (glucose, insulin, lipid, inflammatory) and the visible biological outputs (body composition, skin quality, fat redistribution) that retatrutide's triple mechanism affects across multiple systems simultaneously.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {["Advanced Metabolic Medicine", "Triple Agonist Protocols", "Body Composition Tracking", "Informed Consent", "Active Monitoring"].map((tag, i) => (
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
    title: "Consultation + Informed Consent",
    description: "Full medical history. Prior GLP-1 therapy history and response. Indication assessment. Contraindication screening. Complete informed consent — Phase II data, Phase III status, known and unknown risks. 60 min in-clinic — this consultation is not available as WhatsApp pre-consult only.",
  },
  {
    icon: Microscope,
    day: "Day 1–5",
    title: "Full Metabolic Workup",
    description: "Fasting glucose, HbA1c, full lipid panel, liver enzymes (ALT, AST, GGT), kidney function (eGFR, creatinine), lipase, amylase, CRP, fasting insulin, thyroid panel (TSH, fT3, fT4). InBody — lean mass and fat mass baseline.",
  },
  {
    icon: ClipboardCheck,
    day: "Day 5–10",
    title: "Protocol Written",
    description: "Starting dose confirmed. Multi-step titration schedule. Injection protocol. Protein prescription. Resistance training integration. Muscle preservation protocol activated. Written PDF delivered. WhatsApp monitoring channel opened. Emergency contact protocol established.",
  },
  {
    icon: CalendarCheck,
    day: "Week 8",
    title: "Mandatory Mid-Protocol Review",
    description: "Full metabolic panel recheck. InBody reassessment — fat mass vs. lean mass ratio confirmed. Side effect review. Dose adjustment decision. Any signal outside acceptable parameters triggers immediate reassessment.",
  },
  {
    icon: Target,
    day: "Month 3–6",
    title: "Monitoring & Exit Strategy",
    description: "Quarterly biomarker reviews. Exit strategy activated when clinical targets reached — maintenance dose, cycling to less potent molecule, or structured discontinuation with lifestyle consolidation. Full body composition and metabolic panel at protocol end. 90-day post-protocol follow-up.",
  },
];

const ProtocolSection = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Step by Step</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          What a retatrutide protocol looks like at Healthi Life.
        </h2>
        <p className="text-lg text-muted-foreground">
          The most advanced protocol in our metabolic medicine offering — structured with proportionally rigorous oversight.
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
    </div>
  </section>
);

// ─── CTA BLOCK ───────────────────────────────────────────
const CTABlock = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Start Here</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          The most advanced consultation in our metabolic offering.
        </h2>
        <p className="text-lg text-muted-foreground mb-10">
          Retatrutide requires the most complete workup we conduct. The consultation is longer. The baseline is more comprehensive. The monitoring is more frequent. This is not a protocol for everyone — which is exactly why it produces results unlike anything else.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {[
            { icon: FileText, label: "Full Informed Consent", desc: "You will understand exactly what the Phase II data shows, what is still unknown, and what the monitoring protocol requires." },
            { icon: Stethoscope, label: "Physician-Supervised", desc: "Dr. First personally reviews every retatrutide candidacy. No exceptions. No delegation." },
            { icon: Microscope, label: "Comprehensive Baseline", desc: "The most complete pre-protocol workup in our metabolic offering. Your biology is fully mapped before dose one." },
            { icon: Dumbbell, label: "Muscle Preservation", desc: "InBody tracking at every review point. Protein prescription. Resistance integration. Fat lost — not muscle." },
            { icon: Target, label: "Exit Strategy Pre-Planned", desc: "Discontinuation or transition protocol defined before the first injection. Stopping is managed — not abandoned." },
          ].map((g, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4 shadow-soft text-center">
              <g.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <h4 className="font-bold text-foreground text-sm">{g.label}</h4>
              <p className="text-xs text-muted-foreground mt-1">{g.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-reta-cta-whatsapp')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Book via WhatsApp
            </a>
          </Button>
          <Button size="lg" variant="outline" onClick={() => trackButtonClick('ivclick-reta-cta-email')} asChild>
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
    q: "Is retatrutide approved? Is it legal in Thailand?",
    a: "Retatrutide is currently in Phase III clinical trials and is not yet approved by the FDA or EMA as a commercial pharmaceutical. It is legal in Thailand when prescribed by a licensed physician — the same regulatory framework that governs other physician-prescribed research-grade peptides and molecules used in precision medicine. At Healthi Life, retatrutide is prescribed exclusively by Dr. First (MD) following full informed consent, comprehensive metabolic workup, and active monitoring throughout the protocol.",
  },
  {
    q: "How does retatrutide compare to semaglutide and tirzepatide?",
    a: "Semaglutide activates one receptor (GLP-1) and produces approximately 15–17% body weight reduction over 68 weeks. Tirzepatide activates two receptors (GLP-1 + GIP) and produces approximately 20–22% over 72 weeks. Retatrutide activates three receptors (GLP-1 + GIP + Glucagon) and produced 24.2% body weight reduction at 48 weeks in Phase II. The glucagon receptor component — absent in both predecessors — drives additional fat mobilization and energy expenditure that explains the superior results. The comparison is directionally valid with the caveats noted: Phase II vs. Phase III, and different trial durations.",
  },
  {
    q: "Should I start with retatrutide or semaglutide?",
    a: "For most guests with no prior GLP-1 therapy, semaglutide or tirzepatide is the appropriate starting point. Retatrutide is best positioned for: guests who have not achieved target response on prior GLP-1 therapy, guests with significant metabolic burden requiring a more powerful intervention, and informed guests who — after full consent discussion with Dr. First — choose the most advanced option available. Starting with the most powerful molecule first is not always the right clinical decision. Dr. First will make this assessment in your consultation.",
  },
  {
    q: "What are the side effects of retatrutide?",
    a: "The Phase II trial reported a side effect profile consistent with the GLP-1 class: nausea, vomiting, constipation, and diarrhea — predominantly during titration and dose escalation. These were generally manageable and led to low dropout rates in the trial. The glucagon component did not introduce significant new adverse signals in Phase II. Serious adverse events were rare. Because this is Phase II data, the full long-term safety profile will be further defined by Phase III. All known risks are reviewed in detail during your informed consent consultation with Dr. First.",
  },
  {
    q: "Will I lose muscle mass?",
    a: "The muscle loss risk exists with all incretin class molecules and is proportionally significant at the weight loss magnitudes retatrutide produces. At 24% body weight reduction, the lean mass risk is substantial in unmonitored protocols. At Healthi Life, every retatrutide protocol includes mandatory InBody tracking at baseline, week 8, month 3, and month 6 — distinguishing fat loss from lean mass loss throughout. Protein prescription and resistance integration are built into the protocol from day one. This is not optional. It is a clinical requirement.",
  },
  {
    q: "What happens when I stop retatrutide?",
    a: "Based on the STEP 4 semaglutide data — the best available proxy — stopping incretin therapy without lifestyle consolidation produces significant weight regain. At the weight loss magnitudes retatrutide produces, the regain risk without a managed exit is proportionally higher. Every retatrutide protocol at Healthi Life includes a pre-planned exit strategy: defined transition to maintenance dose or less potent molecule, lifestyle anchoring, nutritional consolidation, and a 90-day post-protocol follow-up. Stopping is managed — not abandoned.",
  },
  {
    q: "How much does a retatrutide protocol cost?",
    a: "Retatrutide protocol pricing reflects the additional clinical requirements: extended initial consultation, comprehensive metabolic workup, more frequent monitoring appointments, and active follow-up throughout. Pricing is disclosed at your first appointment. We do not publish price lists. Contact us via WhatsApp or email to schedule your consultation and receive a pre-consult overview of what the protocol involves.",
  },
];

const RetaFaq = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Questions</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Answered directly — including the difficult ones.
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
const RetaFooter = () => (
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
          {["Semaglutide", "GLP-1 Overview", "Tirzepatide", "BPC-157", "Longevity Program"].map((link, i) => (
            <Badge key={i} variant="secondary" className="text-xs">{link}</Badge>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── DISCLAIMER ──────────────────────────────────────────
const RetaDisclaimer = () => (
  <section className="py-8 bg-muted/50">
    <div className="container px-4 sm:px-6 lg:px-8">
      <p className="text-xs text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
        <strong>Medical Disclaimer:</strong> This page is for informational purposes only and does not constitute medical advice, diagnosis, or treatment recommendation. Retatrutide is currently in Phase III clinical trials and is not approved by the FDA, EMA, or equivalent regulatory bodies as a commercial weight management pharmaceutical. All clinical data referenced on this page is sourced from the Phase II randomized controlled trial published in the New England Journal of Medicine (June 2023) and is presented accurately with appropriate context regarding trial phase and limitations. Individual results will vary. Retatrutide at Healthi Life is prescribed exclusively by licensed physicians following a formal medical consultation, full informed consent process, contraindication screening, and comprehensive metabolic workup. All treatments carry risks reviewed in detail during your physician consultation. This page does not constitute a recommendation that retatrutide is appropriate for any individual without prior physician assessment. Consult a licensed physician before beginning any new therapeutic protocol.
      </p>
    </div>
  </section>
);

// ─── MAIN PAGE ───────────────────────────────────────────
const Retatrutide = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <PeptideSEO
      title="Retatrutide Bangkok | Triple Agonist Weight Loss – Healthi Life"
      description="Retatrutide triple receptor agonist therapy in Bangkok. 24.2% weight reduction (Phase II). GLP-1+GIP+Glucagon. Physician-supervised. Full informed consent."
      path="/Retatrutide"
      peptideName="Retatrutide"
      procedureDescription="Retatrutide triple receptor agonist (GLP-1/GIP/Glucagon) therapy for advanced weight management, metabolic reset, and fat mobilization."
      faqs={faqs}
    />
    <main className="flex-grow">
      <RetaHero />
      <ClinicalContext />
      <WhatIsRetatrutide />
      {/* CTA 1 — Post-Science */}
      <section className="py-10 md:py-14 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl font-semibold text-foreground mb-2">Ready to explore the most advanced option in metabolic medicine?</p>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">Speak with our medical concierge to understand if retatrutide is right for your profile.</p>
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-reta-cta1-whatsapp')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Talk to Your Medical Concierge
            </a>
          </Button>
        </div>
      </section>
      <PhaseIIData />
      <ComparisonSection />
      {/* CTA 2 — Post-Evidence */}
      <section className="py-10 md:py-14 border-y border-border bg-card/50">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl font-semibold text-foreground mb-2">24.2% body weight reduction. Phase II. 48 weeks. The data is clear.</p>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">Dr. First will assess your candidacy and design your protocol based on a full metabolic workup.</p>
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-reta-cta2-whatsapp')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Talk Now
            </a>
          </Button>
        </div>
      </section>
      <WhoIsFor />
      <MuscleMass />
      <WhyDoctor />
      {/* CTA 3 — Post-Medical Oversight */}
      <section className="py-10 md:py-14 bg-primary/5">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl font-semibold text-foreground mb-2">The most powerful molecule. The most rigorous oversight.</p>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">Every retatrutide protocol starts with a comprehensive workup with Dr. First.</p>
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-reta-cta3-whatsapp')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Talk to Your Medical Concierge
            </a>
          </Button>
        </div>
      </section>
      <DrFirstSection />
      <ProtocolSection />
      <CTABlock />
      <RetaFaq />
      <RetaFooter />
      <RetaDisclaimer />
    </main>
    <Footer />
    <Suspense fallback={null}>
      <WhatsAppWidget />
    </Suspense>
  </div>
);

export default Retatrutide;
