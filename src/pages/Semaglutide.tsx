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
  BarChart3, FileText, Utensils, BicepsFlexed
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
const SemaHero = () => (
  <section className="relative min-h-screen flex items-center pt-16 md:pt-20">
    <div className="absolute inset-0 z-0">
      <img
        src={heroImage}
        alt="Semaglutide Weight Management at Healthi Life Bangkok"
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
            <Scale className="h-4 w-4 mr-2" />
            Weight Management & Metabolic Reset · Physician-Led · Bangkok
          </Badge>
        </div>

        <h1 className="animate-fade-in-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-[1.15]">
          Semaglutide.{" "}
          <span className="bg-gradient-medical bg-clip-text text-transparent">
            The science behind the result.
          </span>
        </h1>

        <p className="animate-fade-in-up text-base md:text-lg text-muted-foreground mb-4 max-w-2xl">
          Not a trend. Not a shortcut. The most clinically studied weight management molecule in history — now available as a physician-prescribed protocol at Healthi Life Bangkok.
        </p>

        {/* Stats row */}
        <div className="animate-fade-in-up grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { value: "15–17%", label: "Average body weight reduction (STEP trials, 72 weeks)" },
            { value: "40+", label: "Phase III randomized controlled trials published" },
            { value: "20%", label: "Reduction in major cardiovascular events (SELECT, 2023)" },
            { value: "Rx", label: "Prescription-only · Medical supervision required" },
          ].map((s, i) => (
            <div key={i} className="bg-card/80 backdrop-blur border border-border rounded-lg p-3 text-center shadow-soft">
              <div className="text-lg md:text-xl font-bold text-primary">{s.value}</div>
              <div className="text-[10px] text-muted-foreground mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        <blockquote className="animate-fade-in-up border-l-4 border-primary/40 pl-4 py-2 mb-6 rounded-r-lg" style={{ backgroundColor: '#F5EDDC' }}>
          <p className="text-foreground font-medium italic text-sm">
            "Semaglutide does not override willpower. It corrects the neurochemistry that was working against it."
          </p>
        </blockquote>

        <div className="animate-scale-in flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-sema-hero-whatsapp')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Book a Consultation
            </a>
          </Button>
          <Button size="lg" variant="outline" onClick={() => trackButtonClick('ivclick-sema-hero-learn')} asChild>
            <a href="#what-is-semaglutide">
              <ArrowDown className="h-5 w-5 mr-2" />
              Understand the protocol ↓
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

// ─── WHAT IS SEMAGLUTIDE ─────────────────────────────────
const WhatIsSemaglutide = () => (
  <section id="what-is-semaglutide" className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">The Science</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          What is semaglutide?
        </h2>

        <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
          <p>
            Semaglutide is a <strong className="text-foreground">GLP-1 receptor agonist</strong> — a synthetic molecule that mimics glucagon-like peptide-1, a hormone your gut naturally produces after eating. It was originally developed for type 2 diabetes management. What the clinical trials revealed over a decade of research was something far larger: a molecule that simultaneously resets appetite regulation, corrects insulin resistance, reduces visceral fat, and protects the cardiovascular system.
          </p>
          <p>
            It is not a stimulant. It is not a suppressant in the crude sense. It is a <strong className="text-foreground">hormonal signal correction</strong> — one that addresses the biological root of why losing weight is so difficult for so many people, and why keeping it off has historically been nearly impossible without sustained pharmaceutical support.
          </p>
          <p>
            Semaglutide has approximately 94% amino acid homology to native human GLP-1. Its structural modification gives it a half-life of approximately 7 days — allowing once-weekly subcutaneous injection. It is the most studied molecule in its class, with outcome data spanning cardiovascular endpoints, neurological markers, liver disease, kidney function, and sleep apnea.
          </p>
        </div>

        {/* 4 Mechanisms */}
        <h3 className="text-xl md:text-2xl font-bold text-foreground mt-12 mb-6">What it does — 4 simultaneous mechanisms</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              icon: Brain,
              title: "Appetite Neurochemistry Correction",
              description: "Semaglutide acts on GLP-1 receptors in the hypothalamus — the brain's hunger and satiety center. It reduces the neurochemical drive to eat, lowers food reward signaling, and increases the feeling of fullness after smaller meals. Average caloric intake reduction in trials: 20–35%. This is not willpower. This is pharmacology correcting a dysregulated signal.",
            },
            {
              icon: Activity,
              title: "Insulin Sensitivity & Glucose Regulation",
              description: "Stimulates glucose-dependent insulin secretion from the pancreas and suppresses excess glucagon. Blood glucose stabilizes. Insulin resistance — the underlying metabolic condition in most overweight adults — begins to reverse. HbA1c measurably improves even in non-diabetic guests.",
            },
            {
              icon: Clock,
              title: "Gastric Emptying — Slowed",
              description: "Food moves more slowly from the stomach to the small intestine. Post-meal glucose spikes are blunted. Satiety is extended. The cycle of rapid hunger return after meals — a key driver of overconsumption — is interrupted.",
            },
            {
              icon: Flame,
              title: "Visceral Fat Mobilization",
              description: "Semaglutide preferentially reduces visceral adipose tissue — the metabolically active fat stored around internal organs that drives cardiovascular risk, inflammation, and insulin resistance. Scale weight matters. What matters more is where the fat comes from.",
            },
          ].map((m, i) => (
            <Card key={i} className="group hover:shadow-medium transition-all duration-300 border-border">
              <div className="bg-primary/5 p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <m.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground text-sm">{m.title}</h4>
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
            { label: "Class", value: "GLP-1 Receptor Agonist" },
            { label: "Structure", value: "94% GLP-1 Homology" },
            { label: "Half-life", value: "~7 days" },
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
            { label: "Starting Dose", value: "0.25 mg/week" },
            { label: "Maintenance", value: "1.0–2.4 mg/week" },
            { label: "Titration", value: "4-week increments" },
            { label: "Cycle", value: "6–18 months" },
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

// ─── WHO THIS IS FOR ─────────────────────────────────────
const WhoIsFor = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">Indications</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Semaglutide is not for everyone. Here is who benefits most.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The honest clinical picture: semaglutide produces significant, sustained results in the right candidate — and modest or no results in the wrong one. Indication assessment is the first conversation at Healthi Life, not an afterthought.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Profile 01 */}
          <Card className="border-border overflow-hidden hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary/60">PROFILE 01</span>
                  <h3 className="text-base font-bold text-foreground">The Metabolic Plateau</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                You have tried — seriously, consistently — and the weight does not move, or does not stay moved. Your biology is working against you through insulin resistance, leptin dysfunction, or a chronically elevated appetite set-point. Semaglutide corrects the signal your body has stopped sending correctly.
              </p>
              <p className="text-xs text-muted-foreground italic">
                <strong className="text-foreground">Markers of fit:</strong> BMI 27+ with metabolic comorbidity, history of weight cycling, elevated fasting insulin or HbA1c below diabetic threshold.
              </p>
            </CardContent>
          </Card>

          {/* Profile 02 */}
          <Card className="border-border overflow-hidden hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary/60">PROFILE 02</span>
                  <h3 className="text-base font-bold text-foreground">The Executive Metabolic Reset</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                High-performing, high-stress, low-sleep profile. Cortisol-driven fat accumulation — particularly abdominal. Weight accumulated gradually over years despite discipline. Semaglutide resets the metabolic environment while the lifestyle protocol is rebuilt.
              </p>
              <p className="text-xs text-muted-foreground italic">
                <strong className="text-foreground">Markers of fit:</strong> Elevated CRP, central adiposity on InBody, disrupted glucose curve, high-demand professional schedule.
              </p>
            </CardContent>
          </Card>

          {/* Profile 03 */}
          <Card className="border-border overflow-hidden hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary/60">PROFILE 03</span>
                  <h3 className="text-base font-bold text-foreground">Cardiovascular Risk Reduction</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Not primarily seeking weight loss — seeking the documented cardiovascular protection of semaglutide. The SELECT trial (2023) demonstrated a 20% reduction in major adverse cardiovascular events in this population. The weight loss is a secondary benefit.
              </p>
              <p className="text-xs text-muted-foreground italic">
                <strong className="text-foreground">Markers of fit:</strong> BMI 27+ with established CV disease or significant risk factors, lipid dysregulation, hypertension, family history.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Who is NOT */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="h-6 w-6 text-destructive" />
              <h3 className="text-lg font-bold text-foreground">Who is NOT an ideal candidate</h3>
            </div>
            <ul className="space-y-2">
              {[
                "Personal or family history of medullary thyroid carcinoma or MEN2 syndrome — absolute contraindication",
                "Active pancreatitis or significant pancreatitis history",
                "Severe renal impairment (eGFR below threshold)",
                "Individuals expecting results without nutritional and lifestyle anchoring — semaglutide amplifies good habits; it does not replace them",
                "Guests seeking a short-term solution — the protocol requires 6–18 months for durable metabolic change",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="max-w-2xl mx-auto mt-14 text-center">
          <p className="text-muted-foreground mb-5 text-base">
            Not sure if you're the right candidate? Let our physician assess your metabolic profile personally.
          </p>
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-sema-mid-cta-1')} asChild>
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

// ─── CLINICAL EVIDENCE ───────────────────────────────────
const ClinicalEvidence = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">The Data</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          What 40+ clinical trials actually showed.
        </h2>
        <p className="text-muted-foreground text-base mb-10 leading-relaxed">
          This is not a trend molecule. Semaglutide has one of the most robust evidence bases of any pharmaceutical in metabolic medicine.
        </p>

        <div className="space-y-6">
          {[
            {
              trial: "STEP 1 Trial (2021)",
              detail: "N=1,961 · 68 weeks",
              description: "Non-diabetic adults with obesity (BMI 30+) or overweight with comorbidities. Semaglutide 2.4 mg weekly vs. placebo.",
              results: ["14.9% average body weight reduction vs. 2.4% placebo", "86% achieved at least 5% weight loss", "50% achieved at least 15% weight loss"],
            },
            {
              trial: "STEP 4 Trial (2021)",
              detail: "N=803 · withdrawal design",
              description: "Participants who achieved weight loss on semaglutide were randomized to continue or switch to placebo.",
              results: ["Those who continued lost an additional 7.9% body weight", "Those who switched to placebo regained 6.9% within 48 weeks", "Confirms: the molecule must be sustained or the lifestyle must be consolidated"],
            },
            {
              trial: "SELECT Trial (2023)",
              detail: "N=17,604 · 34 months",
              description: "Overweight or obese adults with established cardiovascular disease — no diabetes. Semaglutide 2.4 mg weekly vs. placebo.",
              results: ["20% reduction in major adverse cardiovascular events", "First trial to demonstrate CV mortality benefit in non-diabetic population", "Changed clinical framing: from weight drug to cardiovascular medicine"],
            },
            {
              trial: "SUSTAIN-6 Trial",
              detail: "Cardiovascular outcomes in T2D",
              description: "Cardiovascular outcomes in type 2 diabetes population.",
              results: ["26% reduction in cardiovascular events", "39% reduction in new or worsening nephropathy", "First signal of renal protective effects"],
            },
          ].map((t, i) => (
            <Card key={i} className="border-border hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#F5EDDC' }}>
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-bold text-foreground">{t.trial}</h3>
                      <Badge variant="secondary" className="text-xs">{t.detail}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{t.description}</p>
                    <ul className="space-y-1">
                      {t.results.map((r, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emerging data */}
        <div className="mt-8 p-6 bg-primary/5 border border-primary/10 rounded-xl">
          <h4 className="font-bold text-foreground mb-3">Emerging data:</h4>
          <ul className="space-y-2">
            {[
              "FLOW trial — significant reduction in kidney disease progression in CKD patients",
              "OASIS trials — sleep apnea improvement in obese patients",
              "Neurological signals — ongoing trials examining Alzheimer's and Parkinson's disease risk reduction",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <TestTube2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <blockquote className="mt-8 border-l-4 border-primary/40 pl-6 py-3 rounded-r-lg" style={{ backgroundColor: '#F5EDDC' }}>
          <p className="text-foreground font-medium italic text-sm md:text-base">
            "The molecule was approved for diabetes. The trials revealed a cardiovascular drug, a renal drug, and potentially a neurological drug. Weight loss was the signal that led medicine to look deeper."
          </p>
        </blockquote>
      </div>
    </div>
  </section>
);

// ─── MUSCLE MASS PROBLEM ─────────────────────────────────
const MuscleMass = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Critical Clinical Note</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          The most important thing most semaglutide providers do not tell you.
        </h2>

        <div className="text-muted-foreground space-y-4 mb-8 text-base leading-relaxed">
          <p>
            Semaglutide reduces body weight. In unmonitored protocols, a significant portion of that weight loss is lean muscle mass — not just fat. Clinical trials report that approximately <strong className="text-foreground">25–39% of total weight lost</strong> on GLP-1 therapy can be lean mass in guests without structured muscle preservation protocols.
          </p>
          <p>
            For a guest losing 15 kg over 12 months, that could mean <strong className="text-foreground">4–6 kg of muscle lost</strong> alongside 9–11 kg of fat. The scale shows success. The InBody tells a different story.
          </p>
          <p>
            <strong className="text-foreground">Why this matters for longevity:</strong> muscle mass is the single strongest predictor of longevity outcomes in adults over 40. Sarcopenia accelerates metabolic decline, increases fall risk, reduces insulin sensitivity, and shortens healthspan. Losing muscle to lose fat is a longevity negative — regardless of how good the final weight looks.
          </p>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-6">What Healthi Life does differently:</h3>
        <p className="text-muted-foreground mb-6 text-base leading-relaxed">
          Every semaglutide protocol includes a parallel muscle preservation strategy — not as an optional add-on, but as a non-negotiable clinical component.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Scale, title: "InBody Tracking", desc: "Body composition tracking at baseline, week 8, and month 3/6 — distinguishing fat loss from lean mass loss." },
            { icon: Utensils, title: "Protein Prescription", desc: "Individualized to lean body mass, not generic guidelines." },
            { icon: Dumbbell, title: "Resistance Training", desc: "Integrated protocol adapted to the guest's schedule and physical baseline." },
            { icon: Syringe, title: "BPC-157 Integration", desc: "When indicated — tissue repair and anabolic environment support." },
            { icon: Activity, title: "Dose Management", desc: "Semaglutide dose titrated to produce fat loss without excessive lean mass depletion." },
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
            "Losing 15% of body weight means nothing if 30% of what you lost was muscle. We track both. We protect both."
          </p>
        </blockquote>
      </div>
    </div>
  </section>
);

// ─── WHY DOCTOR ──────────────────────────────────────────
const whyDoctorReasons = [
  {
    icon: AlertTriangle,
    number: "01",
    title: "No Contraindication Screening",
    description: "Medullary thyroid carcinoma history and MEN2 syndrome are absolute contraindications that are frequently not screened for in non-physician settings. Pancreatitis risk factors, renal impairment, and medication interactions require workup before the first dose.",
  },
  {
    icon: TrendingDown,
    number: "02",
    title: "No Titration Protocol",
    description: "Starting at the maintenance dose without proper titration produces severe nausea, vomiting, and protocol dropout within weeks. Most unmonitored guests who report 'semaglutide didn't work' did not fail the molecule. They failed the titration.",
  },
  {
    icon: BicepsFlexed,
    number: "03",
    title: "No Muscle Preservation",
    description: "Unmonitored semaglutide use without body composition tracking and muscle preservation strategy produces significant lean mass loss alongside fat loss. The scale improves. The biology does not.",
  },
  {
    icon: Microscope,
    number: "04",
    title: "No Monitoring — Labs and Response",
    description: "Mid-protocol HbA1c, lipid panel, kidney function, and body composition reassessment are required to confirm the protocol is producing the intended metabolic outcome — and not creating unintended consequences.",
  },
  {
    icon: Target,
    number: "05",
    title: "No Exit Strategy",
    description: "Stopping semaglutide without a defined maintenance protocol and lifestyle consolidation produces predictable weight regain. The STEP 4 trial documented this clearly. The exit from the molecule requires as much clinical planning as the entry.",
  },
];

const WhyDoctor = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Medical Oversight</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Why physician supervision is not optional.
        </h2>

        <div className="text-muted-foreground space-y-4 mb-6 text-base leading-relaxed">
          <p>
            Semaglutide is widely available — through online pharmacies, grey-market channels, compounding pharmacies with minimal oversight, and medspas staffed by non-physicians. The molecule is the same. The clinical intelligence around it is not.
          </p>
        </div>

        <blockquote className="border-l-4 border-primary/40 pl-6 py-3 mb-8 rounded-r-lg" style={{ backgroundColor: '#F5EDDC' }}>
          <p className="text-foreground font-medium italic">
            "The guests who fail on semaglutide outside physician care do not fail because the molecule stopped working. They fail because no one was watching."
          </p>
        </blockquote>

        <h3 className="text-lg font-bold text-foreground mb-6">What goes wrong without medical supervision:</h3>

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

        {/* CTA */}
        <div className="mt-12 p-6 md:p-8 rounded-2xl border border-primary/20 bg-primary/5 text-center">
          <p className="text-foreground font-semibold text-lg mb-2">
            Don't self-prescribe. Talk to a physician who understands metabolic medicine.
          </p>
          <p className="text-muted-foreground text-sm mb-5">
            One WhatsApp message. Direct access to our medical concierge.
          </p>
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-sema-mid-cta-2')} asChild>
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
                {["MD — Licensed Physician", "Specialist: Dermatology", "Metabolic & Anti-Aging Medicine", "Peptides & Regenerative Protocols", "Healthi Life — Ekkamai, Bangkok"].map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-5">
                <p className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">Prescription Authority</p>
                <p className="text-sm text-foreground">
                  All semaglutide protocols at Healthi Life are written, titrated, and monitored by Dr. First personally.
                </p>
              </div>

              <blockquote className="border-l-4 border-primary pl-4 py-2 mb-5 bg-primary/5 rounded-r-lg">
                <p className="text-sm text-foreground italic font-medium">
                  "Semaglutide is the most powerful metabolic tool I prescribe. Which is exactly why I require a full workup before I prescribe it."
                </p>
              </blockquote>

              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  Dr. First oversees all metabolic and anti-aging protocols at Healthi Life. His clinical approach to semaglutide is grounded in two principles: indication precision and body composition protection. He does not prescribe semaglutide as a weight-loss shortcut. He prescribes it as a metabolic reset tool — one that requires a defined starting point, a monitored trajectory, and a planned endpoint.
                </p>
                <p>
                  His background in dermatology provides a parallel clinical lens: skin quality, collagen density, and facial volume are all measurable downstream markers of the metabolic and hormonal environment that semaglutide directly affects. He tracks both the internal and visible outcomes throughout the protocol.
                </p>
                <p>
                  No semaglutide prescription at Healthi Life is written without a fasting glucose, HbA1c, lipid panel, kidney function, and InBody body composition baseline. The injection is the last step — not the first.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {["Metabolic Reset", "Biomarker-First", "Body Composition Tracking", "Monitored Protocol"].map((tag, i) => (
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
    description: "Full medical history. Indication assessment. Contraindication screening. Weight history, metabolic history, medication review. Dr. First reviews your case personally. 45 min in-clinic or WhatsApp pre-consult.",
  },
  {
    icon: Microscope,
    day: "Day 1–4",
    title: "Metabolic Workup",
    description: "Fasting glucose, HbA1c, full lipid panel, kidney function (eGFR, creatinine), liver enzymes, thyroid panel, CRP, fasting insulin. InBody body composition — lean mass and fat mass baseline before the first dose.",
  },
  {
    icon: ClipboardCheck,
    day: "Day 4–7",
    title: "Protocol Written",
    description: "Starting dose confirmed (0.25 mg). Titration schedule defined — 4-week increments. Injection technique. Nutrition protocol and protein targets set. Resistance training guidance. PDF delivered. WhatsApp channel opened.",
  },
  {
    icon: CalendarCheck,
    day: "Week 8",
    title: "Mid-Protocol Review",
    description: "HbA1c and fasting glucose recheck. InBody reassessment — confirming fat loss vs. lean mass preservation ratio. Side effect review. Dose adjustment if needed. Continuation confirmed.",
  },
  {
    icon: Target,
    day: "Month 3–18",
    title: "Continuation & Exit Strategy",
    description: "Long-term trajectory defined. Quarterly biomarker reviews. Exit strategy when goal achieved — lifestyle anchoring, protein and resistance protocol locked in, maintenance dose or cycling plan. Transition off managed carefully.",
  },
];

const ProtocolSection = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Step by Step</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          What your semaglutide protocol looks like.
        </h2>
        <p className="text-lg text-muted-foreground">
          From first contact to active metabolic reset — five structured steps. No guesswork. No shortcuts.
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

      {/* CTA */}
      <div className="max-w-2xl mx-auto mt-14 text-center">
        <p className="text-muted-foreground mb-5 text-base">
          Your metabolic reset starts with a single conversation. No commitment — just clarity.
        </p>
        <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-sema-mid-cta-3')} asChild>
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
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Start Here</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          One consultation. Your metabolism, properly assessed.
        </h2>
        <p className="text-lg text-muted-foreground mb-10">
          The first step is not a prescription. It is a workup. We do not prescribe until we know where you are starting.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {[
            { icon: Stethoscope, label: "Physician-Supervised", desc: "Dr. First reviews every case before any prescription is written. No exceptions." },
            { icon: Microscope, label: "Full Metabolic Workup First", desc: "Fasting glucose, HbA1c, lipid panel, kidney function, InBody — before the first dose." },
            { icon: Dumbbell, label: "Muscle Preservation Built In", desc: "Body composition tracking and protein protocol from day one. Fat loss — not muscle loss." },
            { icon: Shield, label: "Legal in Thailand", desc: "Semaglutide is legal when prescribed by a licensed physician. Fully compliant." },
            { icon: Target, label: "Exit Strategy Included", desc: "The end of the protocol is planned before it begins. Stopping is managed, not abandoned." },
          ].map((g, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4 shadow-soft text-center">
              <g.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <h4 className="font-bold text-foreground text-sm">{g.label}</h4>
              <p className="text-xs text-muted-foreground mt-1">{g.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-sema-cta-whatsapp')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Book via WhatsApp
            </a>
          </Button>
          <Button size="lg" variant="outline" onClick={() => trackButtonClick('ivclick-sema-cta-email')} asChild>
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
    q: "Is semaglutide legal in Thailand?",
    a: "Yes. Semaglutide is legal in Thailand when prescribed by a licensed physician. It is not classified as a controlled substance. At Healthi Life, all semaglutide protocols are written exclusively by Dr. First (MD), ensuring full regulatory and medical compliance. We do not dispense semaglutide without prior medical consultation, full metabolic workup, and formal prescription.",
  },
  {
    q: "How much weight will I lose?",
    a: "The STEP clinical trials reported an average of 14.9–17.4% body weight reduction over 68–72 weeks at the 2.4 mg maintenance dose. Individual results depend on baseline metabolic status, adherence to nutritional guidance, protocol duration, and starting dose. At Healthi Life, we track body composition — not just weight — so results are measured in fat lost and muscle preserved, not only kilograms on a scale.",
  },
  {
    q: "Will I regain the weight when I stop?",
    a: "The STEP 4 trial documented clear weight regain when semaglutide was stopped without lifestyle consolidation — an average of 6.9% body weight regained within 48 weeks. This is why exit strategy is a non-negotiable part of every protocol at Healthi Life. The goal is not permanent pharmaceutical dependence. It is a metabolic reset that — when supported by the right nutritional and behavioral anchoring — can be sustained beyond the molecule. Your exit is planned before your protocol begins.",
  },
  {
    q: "What are the side effects?",
    a: "The most common side effects are gastrointestinal: nausea, reduced appetite, occasional vomiting, constipation, and diarrhea — predominantly during the titration phase and dose increases. These are dose-dependent and improve significantly as the body adapts. Proper titration (starting at 0.25 mg and increasing every 4 weeks) is the most effective strategy for minimizing them. Serious adverse events — acute pancreatitis, gallbladder disease — are rare and are screened for prior to prescription. The absolute contraindications (personal or family history of medullary thyroid carcinoma, MEN2 syndrome) are identified in your initial workup.",
  },
  {
    q: "I have tried semaglutide before and it did not work. Why would this be different?",
    a: "In the large majority of cases, semaglutide failure outside physician care traces to one of three causes: inadequate titration (dose increased too fast, causing intolerable side effects and dropout), no muscle preservation protocol (the guest lost lean mass alongside fat and felt worse despite weight loss), or no monitoring (dose was too low to produce response and was never adjusted). At Healthi Life, all three are addressed from day one. If you have a previous semaglutide history, Dr. First will review it in detail before prescribing.",
  },
  {
    q: "How much does a semaglutide protocol cost?",
    a: "Protocol pricing depends on duration, maintenance dose reached, and whether semaglutide is prescribed as a standalone metabolic protocol or integrated into a broader longevity program. Consultation and protocol fees are disclosed at your first appointment. We do not publish price lists — every protocol is personalized to your metabolic baseline and goals. Contact us via WhatsApp or email to schedule your initial consultation and receive a pre-consult overview.",
  },
];

const SemaFaq = () => (
  <section className="py-16 md:py-24 bg-background">
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
const SemaFooter = () => (
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
          {["GLP-1 Overview", "Tirzepatide", "BPC-157", "Longevity Program"].map((link, i) => (
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
        <strong>Medical Disclaimer:</strong> This page is for informational purposes only and does not constitute medical advice, diagnosis, or treatment recommendation. Semaglutide protocols at Healthi Life are prescribed exclusively by licensed physicians following a formal medical consultation, contraindication screening, and full metabolic workup. Individual results vary significantly. All statistics and trial data referenced are from published peer-reviewed clinical research and do not represent guaranteed individual outcomes. Semaglutide carries risks that are reviewed in detail during your physician consultation. Healthi Life does not prescribe semaglutide to individuals with identified contraindications. The brand names of semaglutide-containing pharmaceuticals are not referenced on this page. Consult a licensed physician before beginning any new therapeutic protocol.
      </p>
    </div>
  </section>
);

// ─── MAIN PAGE ───────────────────────────────────────────
const Semaglutide = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <SemaHero />
      <WhatIsSemaglutide />
      {/* CTA 1 — Post-Science */}
      <section className="py-10 md:py-14 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl font-semibold text-foreground mb-2">Ready to understand your metabolic baseline?</p>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">Speak with our medical concierge to understand if semaglutide is right for your goals.</p>
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-sema-cta1-whatsapp')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Talk to Your Medical Concierge
            </a>
          </Button>
        </div>
      </section>
      <WhoIsFor />
      <ClinicalEvidence />
      {/* CTA 2 — Post-Evidence */}
      <section className="py-10 md:py-14 border-y border-border bg-card/50">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl font-semibold text-foreground mb-2">40+ trials. 17,000+ patients studied. The data speaks for itself.</p>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">Dr. First designs your protocol based on your full metabolic workup. Start the conversation now.</p>
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-sema-cta2-whatsapp')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Talk Now
            </a>
          </Button>
        </div>
      </section>
      <MuscleMass />
      <WhyDoctor />
      {/* CTA 3 — Post-Medical Oversight */}
      <section className="py-10 md:py-14 bg-primary/5">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl font-semibold text-foreground mb-2">Physician-led from day one. Full metabolic workup mandatory.</p>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">Every protocol starts with a complete workup with Dr. First.</p>
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-sema-cta3-whatsapp')} asChild>
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
      <SemaFaq />
      <SemaFooter />
      <Disclaimer />
    </main>
    <Footer />
    <Suspense fallback={null}>
      <WhatsAppWidget />
    </Suspense>
  </div>
);

export default Semaglutide;
