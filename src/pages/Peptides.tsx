import { lazy, Suspense, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Star, Award, MapPin, Clock, MessageCircle, Shield, Stethoscope,
  FlaskConical, Activity, Dumbbell, Flame, Heart, Users, Globe,
  Phone, Mail, ArrowRight, CheckCircle2, Play, Timer, Microscope,
  CalendarCheck, RefreshCw, ClipboardCheck, UserCheck, Beaker,
  Sparkles, Brain, Zap, HeartPulse, ShieldCheck, Monitor
} from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";
import heroImage from "@/assets/clinic-exterior.webp";
import clinicInterior from "@/assets/clinic-interior.jpg";
import drPetchImage from "@/assets/dr-petch.jpg";
import drFirstImage from "@/assets/dr-first.jpg";
import logoWhite from "@/assets/healthilife-logo-white.png";
import { Link } from "react-router-dom";

const WhatsAppWidget = lazy(() => import("@/components/WhatsAppWidget"));

const SectionLoader = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// ─── HERO ────────────────────────────────────────────────
const PeptideHero = () => (
  <section className="relative min-h-screen flex items-center pt-16 md:pt-20">
    <div className="absolute inset-0 z-0">
      <img
        src={heroImage}
        alt="Healthi-Life Peptide Therapy Clinic Bangkok"
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
        {/* Award Badge */}
        <div className="animate-fade-in mb-6">
          <Badge className="bg-gradient-medical text-primary-foreground px-4 py-2 text-xs md:text-sm">
            <Award className="h-4 w-4 mr-2" />
            Best Regenerative Medicine Clinic 2025 – Asia-Pacific
          </Badge>
        </div>

        <h1 className="animate-fade-in-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 md:mb-3 leading-[1.15]">
          Peptide Therapy Programs
        </h1>
        <h3 className="animate-fade-in-up text-xl sm:text-2xl md:text-3xl font-semibold mb-4 md:mb-6">
          <span className="bg-gradient-medical bg-clip-text text-transparent">
            Restore Energy, Metabolism & Recovery
          </span>
        </h3>
        <div className="animate-fade-in-up text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl">
          <p className="mb-3">Protocols designed by <strong className="text-foreground">Doctor First</strong> to support:</p>
          <ul className="space-y-1.5">
            <li>• fat loss & metabolic health</li>
            <li>• muscle recovery & performance</li>
            <li>• healthy aging & longevity</li>
          </ul>
        </div>

        {/* Trust Signals */}
        <div className="animate-fade-in-up flex flex-wrap items-center gap-4 md:gap-6 mb-8">
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium">5.0 Google Reviews</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Ekkamai, Bangkok</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Mon-Sat: 11 AM – 7 PM</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="animate-scale-in flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-peptide-hero-whatsapp')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Talk with Us on WhatsApp
            </a>
          </Button>
          <Button size="lg" variant="outline" onClick={() => trackButtonClick('ivclick-peptide-hero-book')} asChild>
            <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" />
              Book Now
            </a>
          </Button>
        </div>

        {/* Location Info */}
        <p className="animate-fade-in mt-8 text-sm text-muted-foreground">
          📍 Bangkok's Premium IV Therapy Destination at EKKAMAI 10
        </p>
      </div>
    </div>
  </section>
);

// ─── TRUST BANNER ────────────────────────────────────────
const PeptideTrustBanner = () => {
  const stats = [
    {
      icon: Star,
      value: "5.0",
      label: "Google Rating",
      extra: (
        <div className="flex ml-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      ),
    },
    { icon: Users, value: "2,000+", label: "Patients Treated" },
    { icon: Globe, value: "50+", label: "Countries Served" },
    { icon: Shield, value: "ISO · GMP", label: "Certified Lab" },
    { icon: Award, value: "Best Clinic", label: "2025 Asia-Pacific" },
  ];

  return (
    <section className="py-6 bg-secondary/50 border-y border-border">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-base font-bold text-foreground">{s.value}</span>
                  {s.extra}
                </div>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── SERVICES / PROGRAMS ─────────────────────────────────
const programs = [
  {
    icon: Brain,
    subtitle: "6–12 Months — Healthy Aging — Mitochondrial Support",
    title: "CELLULAR LONGEVITY PROTOCOL",
    tagline: "Healthy Aging & Metabolic Resilience",
    description: "A structured longevity program designed to support biological aging markers, mitochondrial performance, and metabolic resilience through personalized peptide protocols.",
    tags: ["Healthy aging support", "Mitochondrial performance", "Recovery quality", "Sleep optimization"],
    clientsReport: [
      "Better sleep quality and recovery rhythm",
      "Improved energy stability",
      "Improved metabolic resilience",
      "Support for systemic balance",
    ],
    includes: ["Doctor consultation", "Baseline lab review", "Personalized peptide plan", "Monitoring and follow-up reviews"],
    price: "From 40,000 THB",
    duration: "6–12 months",
  },
  {
    icon: HeartPulse,
    subtitle: "3–6 Months — Recovery — Tissue Resilience",
    title: "RECOVERY & REGENERATION PROTOCOL",
    tagline: "Recovery Support & Movement Restoration",
    description: "A doctor-guided recovery program focused on tissue resilience, inflammation management, and structured return-to-performance capacity.",
    tags: ["Recovery support", "Inflammation management", "Tissue resilience", "Movement restoration"],
    clientsReport: [
      "Faster recovery support",
      "Improved mobility and resilience",
      "Reduced inflammatory burden",
      "Better return-to-performance capacity",
    ],
    includes: ["Medical assessment", "Functional and symptom review", "Personalized recovery protocol", "Progress tracking and review"],
    price: "From 40,000 THB",
    duration: "3–6 months",
  },
  {
    icon: Flame,
    subtitle: "6–12 Months — Fat Loss — Metabolic Flexibility",
    title: "METABOLIC RESET & WEIGHT OPTIMIZATION",
    tagline: "Sustainable Fat Loss & Metabolic Health",
    description: "A medically supervised body composition strategy targeting sustainable fat reduction, appetite regulation, and improved metabolic flexibility.",
    tags: ["Fat reduction support", "Appetite regulation", "Insulin sensitivity", "Body composition"],
    clientsReport: [
      "Visible body composition change",
      "Improved appetite control",
      "Better insulin sensitivity markers",
      "More stable energy and metabolic function",
    ],
    includes: ["Physician assessment", "Metabolic lab review", "Body composition tracking", "Personalized plan with medical follow-up"],
    price: "From 40,000 THB",
    duration: "6–12 months",
  },
  {
    icon: Dumbbell,
    subtitle: "6–12 Months — Lean Mass — Performance Capacity",
    title: "LEAN MUSCLE & PERFORMANCE OPTIMIZATION",
    tagline: "Performance Support & Body Recomposition",
    description: "A performance-oriented peptide program designed to support lean muscle, training recovery, and optimized body composition under medical supervision.",
    tags: ["Lean muscle support", "Training recovery", "Injury risk reduction", "Performance capacity"],
    clientsReport: [
      "Lean muscle support",
      "Better training recovery",
      "Reduced injury risk",
      "Improved sleep and recovery rhythm",
    ],
    includes: ["Medical consultation", "Biomarker review", "Personalized performance framework", "Ongoing monitoring and review"],
    price: "From 40,000 THB",
    duration: "6–12 months",
  },
];

const PeptidePrograms = () => (
  <section id="services" className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      {/* Individual Peptide Cards */}
      <div className="mb-16 md:mb-20">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">Key Peptides Used in Our Programs</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Flame, name: "GLP-1", useCase: "Weight Loss", benefit: "Appetite control, fat loss", bullets: ["Appetite suppression", "Sustainable fat loss", "Metabolic regulation"] },
            { icon: Dumbbell, name: "CJC-1295 + Ipamorelin", useCase: "Muscle / Anti-Aging", benefit: "Growth hormone stimulation", bullets: ["Lean muscle support", "Anti-aging benefits", "Recovery enhancement"] },
            { icon: HeartPulse, name: "BPC-157", useCase: "Recovery", benefit: "Tissue repair", bullets: ["Tissue regeneration", "Gut healing support", "Inflammation reduction"] },
            { icon: Shield, name: "Thymosin Alpha-1", useCase: "Immune / Longevity", benefit: "Immune modulation", bullets: ["Immune system support", "Longevity optimization", "Systemic resilience"] },
            { icon: Zap, name: "Epithalon", useCase: "Anti-Aging", benefit: "Telomere support", bullets: ["Telomere lengthening", "Cellular longevity", "DNA repair support"] },
            { icon: Brain, name: "Selank / Semax", useCase: "Brain Optimization", benefit: "Cognition & stress", bullets: ["Cognitive enhancement", "Stress reduction", "Mental clarity"] },
          ].map((peptide) => (
            <Card key={peptide.name} className="border-border hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-medical flex items-center justify-center">
                    <peptide.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-primary">{peptide.useCase}</span>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{peptide.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{peptide.benefit}</p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {peptide.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full group" onClick={() => trackButtonClick(`ivclick-peptide-${peptide.name.toLowerCase().replace(/\s+/g, '-')}`)} asChild>
                  <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Talk with Doctor
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Programs Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Peptide Therapy Programs
        </h2>
        <p className="text-lg text-muted-foreground">
          Restore energy, support metabolism, and improve recovery with doctor-supervised peptide protocols designed by Dr First.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {programs.map((p) => (
          <Card key={p.title} className="border-border hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
            {/* Top subtitle banner */}
            <div className="bg-secondary/70 px-6 py-3 flex items-center gap-2">
              <p.icon className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">{p.subtitle}</span>
            </div>

            <CardContent className="flex-grow p-6 space-y-5">
              {/* Title & tagline */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">{p.title}</h3>
                <p className="text-sm font-medium bg-gradient-medical bg-clip-text text-transparent">{p.tagline}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs font-normal">
                    <Sparkles className="h-3 w-3 mr-1 text-primary" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* What Most Clients Report */}
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-foreground">What Most Clients Report</span>
                </div>
                <ul className="space-y-1.5">
                  {p.clientsReport.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Includes */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Program Includes</h4>
                <ul className="space-y-1.5">
                  {p.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div className="pt-2">
                <p className="text-2xl font-bold text-foreground">{p.price}</p>
                <p className="text-xs text-muted-foreground">{p.duration} · Pricing confirmed after doctor consultation</p>
              </div>

              {/* CTA */}
              <Button className="w-full group" size="lg" onClick={() => trackButtonClick(`ivclick-peptide-${p.title.toLowerCase().replace(/\s+/g, '-')}`)} asChild>
                <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Book Your Medical Review
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground italic">
          Starting from 40,000 THB depending on program duration, medical evaluation, and personalization level. Detailed treatment recommendations and pricing are provided after doctor consultation.
        </p>
      </div>
  </section>
);

// ─── CLINIC PRESENTATION ─────────────────────────────────
const ClinicPresentation = () => (
  <section className="py-16 md:py-24 bg-secondary/30">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            A Medical Approach to Peptide Therapy
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            At Healthi-Life, peptide therapy is delivered as part of a structured medical program — not as an over-the-counter wellness shortcut. Each patient pathway is doctor-supervised, lab-monitored, personalized, and integrated with nutrition, recovery, and lifestyle guidance.
          </p>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Our goal is to build safe, coherent, and medically governed programs that align with each patient's physiology, goals, and response over time.
          </p>
          <ul className="space-y-3">
            {[
              "Doctor-supervised medical programs",
              "Personalized after consultation and lab review",
              "Structured in monitored phases",
              "Integrated with nutrition, training, recovery, and lifestyle recommendations",
              "Designed for premium, high-touch medical support",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground font-medium">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={clinicInterior}
            alt="Healthi-Life Clinic Interior - Premium Medical Environment"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
);

// ─── MEDICAL TEAM ────────────────────────────────────────
const PeptideMedicalTeam = () => {
  const doctors = [
    {
      name: "Dr. Petch",
      title: "Longevity & Regenerative Medicine Physician",
      desc: "Expert in personalized longevity medicine, metabolic optimization, and structured treatment planning.",
      image: drPetchImage,
    },
    {
      name: "Dr. First",
      title: "Functional & Preventive Health Physician",
      desc: "Focused on biomarker interpretation, recovery strategy, and personalized health optimization.",
      image: drFirstImage,
    },
  ];

  return (
    <section id="doctors" className="py-16 md:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Medical Team</h2>
          <p className="text-lg text-muted-foreground">
            Your peptide program begins with a physician-led consultation to assess your goals, medical history, current biomarkers, and suitability for treatment.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {doctors.map((doc) => (
            <Card key={doc.name} className="border-border overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{doc.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{doc.title}</p>
                <p className="text-sm text-muted-foreground">{doc.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── WHY CHOOSE US ───────────────────────────────────────
const PeptideWhyUs = () => {
  const points = [
    { icon: Stethoscope, title: "Doctor First", desc: "Every program starts with medical evaluation, not product selection." },
    { icon: UserCheck, title: "Personalized Programs", desc: "Your plan is adapted to your biomarkers, goals, history, and response." },
    { icon: Microscope, title: "Lab-Monitored", desc: "We use clinical review and follow-up testing to guide decisions." },
    { icon: Sparkles, title: "Premium Experience", desc: "Online or onsite consultation, concierge-style support, and structured follow-up." },
    { icon: Heart, title: "Integrated Care", desc: "Programs are supported with nutrition, recovery, and performance guidance." },
    { icon: ShieldCheck, title: "Medical Governance", desc: "Treatment pathways are supervised and reviewed by experienced doctors." },
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Patients Choose Healthi-Life</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((p) => (
            <Card key={p.title} className="border-border text-center p-6 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-medical flex items-center justify-center mb-4">
                <p.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── VIDEO TESTIMONIALS ──────────────────────────────────
const PeptideVideoTestimonials = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Patient Experience</h2>
        <p className="text-lg text-muted-foreground">
          Hear from patients who chose Healthi-Life for medically guided recovery, longevity, and metabolic optimization.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-video bg-muted rounded-xl flex items-center justify-center border border-border">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Play className="h-8 w-8 text-primary ml-1" />
              </div>
              <p className="text-sm text-muted-foreground">Video Testimonial {i}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── PROCESS ─────────────────────────────────────────────
const PeptideProcess = () => {
  const steps = [
    { icon: CalendarCheck, title: "Book Your Consultation", desc: "Choose an online or onsite consultation with a Healthi-Life doctor." },
    { icon: ClipboardCheck, title: "Medical Assessment", desc: "We review your health history, symptoms, goals, and treatment suitability." },
    { icon: Microscope, title: "Blood Tests & Baseline Review", desc: "Relevant labs and health markers are assessed to personalize your program." },
    { icon: FlaskConical, title: "Personalized 3, 6, or 12-Month Plan", desc: "Your doctor builds a tailored treatment roadmap based on your profile and objectives." },
    { icon: Monitor, title: "Follow-Up & Monitoring", desc: "You receive structured check-ins, medical review, and plan adjustments where appropriate." },
    { icon: RefreshCw, title: "Review & Renew", desc: "At the end of the program cycle, your results are reviewed and your next phase is decided with the doctor." },
  ];

  return (
    <section id="process" className="py-16 md:py-24 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How the Program Works</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="relative bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-medical flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {i + 1}
                </div>
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground italic max-w-2xl mx-auto">
          Please note that peptide therapies are prepared through certified partner pharmacies and laboratories. Advance notice is required before treatment scheduling.
        </p>
      </div>
    </section>
  );
};

// ─── FAQ ─────────────────────────────────────────────────
const PeptideFAQ = () => {
  const faqs = [
    { q: "Is peptide therapy suitable for everyone?", a: "No. Suitability depends on your medical history, health goals, lab findings, and physician review." },
    { q: "Do I need a consultation before starting?", a: "Yes. All peptide programs begin with an online or onsite consultation with a doctor." },
    { q: "Are programs standardized or personalized?", a: "Programs are personalized. Treatment decisions are based on medical review, biomarkers, and your goals." },
    { q: "How long does a peptide program last?", a: "Programs may be structured over 3, 6, or 12 months depending on the clinical objective and physician recommendation." },
    { q: "Will I need blood tests?", a: "In many cases, yes. Baseline and follow-up labs help guide personalization and monitoring." },
    { q: "Are the detailed protocol formulas published online?", a: "No. Healthi-Life does not publicly disclose its complete medical protocol architecture." },
    { q: "Are these treatments intended to diagnose or cure disease?", a: "No. These therapies are intended to support health, wellness, and quality of life under medical supervision. They are not intended to diagnose, treat, cure, or prevent any disease." },
    { q: "Are peptide products stocked onsite?", a: "No. Peptides are prepared and shipped through certified partner pharmacies and laboratories. Please allow a minimum of 5 working days before scheduled therapy." },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="group bg-card border border-border rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-secondary/30 transition-colors">
                <span className="font-semibold text-foreground text-left pr-4">{faq.q}</span>
                <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-5 pb-5">
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── TESTIMONIALS ────────────────────────────────────────
const PeptideTestimonials = () => {
  const testimonials = [
    { text: "The process felt structured, medical, and highly personalized.", author: "Patient" },
    { text: "I appreciated the doctor supervision and follow-up rather than a generic wellness approach.", author: "Patient" },
    { text: "Healthi-Life made the entire experience feel premium, clear, and safe.", author: "Patient" },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Patients Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <Card key={i} className="border-border p-6 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-4">"{t.text}"</p>
              <p className="text-sm font-medium text-foreground">— Verified {t.author}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CONTACT / CTA ───────────────────────────────────────
const PeptideContact = () => (
  <section id="contact" className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Book Your Peptide Consultation</h2>
        <p className="text-lg text-muted-foreground">
          Speak with our medical team to assess your goals and determine whether a personalized peptide program is appropriate for you.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact CTAs */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Button size="lg" className="w-full group" onClick={() => trackButtonClick('ivclick-peptide-contact-whatsapp')} asChild>
              <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp Us
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full" onClick={() => trackButtonClick('ivclick-peptide-contact-book')} asChild>
              <a href="https://wa.me/66919991744?text=I%27d%20like%20to%20book%20a%20peptide%20consultation" target="_blank" rel="noopener noreferrer">
                <CalendarCheck className="h-5 w-5 mr-2" />
                Book Consultation
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full" onClick={() => trackButtonClick('ivclick-peptide-contact-callback')} asChild>
              <a href="https://wa.me/66919991744?text=Please%20call%20me%20back%20about%20peptide%20programs" target="_blank" rel="noopener noreferrer">
                <Phone className="h-5 w-5 mr-2" />
                Request Call Back
              </a>
            </Button>
          </div>
          <div className="p-6 bg-secondary/50 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">94 Ekkamai 10 Alley, Watthana, Bangkok</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">Mon–Sat: 11 AM – 7 PM</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">info@healthi-life.com</span>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <Card className="border-border">
          <CardContent className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Your full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="Your country" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input id="whatsapp" placeholder="+66..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal">Primary Goal</Label>
              <Input id="goal" placeholder="e.g. Longevity, Recovery, Weight Optimization..." />
            </div>
            <div className="space-y-2">
              <Label>Preferred Consultation Type</Label>
              <RadioGroup defaultValue="online" className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="font-normal">Online</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="onsite" id="onsite" />
                  <Label htmlFor="onsite" className="font-normal">Onsite</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time</Label>
              <Input id="time" placeholder="e.g. Weekday mornings, Afternoon..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Any additional information..." rows={3} />
            </div>
            <Button className="w-full" size="lg" onClick={() => trackButtonClick('ivclick-peptide-form-submit')}>
              <MessageCircle className="h-5 w-5 mr-2" />
              Submit Inquiry
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// ─── FOOTER ──────────────────────────────────────────────
const PeptideFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src={logoWhite} alt="Healthi-Life" className="h-8 w-auto mb-4" />
            <p className="text-background/80 text-sm">
              Bangkok's premium longevity center for doctor-supervised peptide therapy, IV drips, and regenerative medicine.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <div className="space-y-2 text-sm text-background/70">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 94 Ekkamai 10, Watthana, Bangkok</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +66 91 999 1744</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@healthi-life.com</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm text-background/70">
              <Link to="/" className="block hover:text-background transition-colors">Home — IV Therapy</Link>
              <Link to="/peptides" className="block hover:text-background transition-colors">Peptide Programs</Link>
              <Link to="/price-list" className="block hover:text-background transition-colors">Price List</Link>
              <a href="https://wa.me/66919991744" target="_blank" rel="noopener noreferrer" className="block hover:text-background transition-colors">Book a Consultation</a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/20 pt-6">
          <p className="text-xs text-background/50 mb-4 leading-relaxed max-w-4xl">
            <strong>Medical Disclaimer:</strong> Peptide therapies offered at Healthi-Life Longevity Center are intended to support health, wellness, and quality of life. These therapies are not intended to diagnose, treat, cure, or prevent any disease, and should not replace medical advice from your primary care physician or specialist. Results may vary depending on individual health status, age, and compliance with lifestyle recommendations. We do not stock peptide medications on-site. All peptides are prepared and shipped from certified partner pharmacies and laboratories. Please allow a minimum of 5 working days for ordering and delivery before your scheduled therapy.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-background/50">
            <p>© {currentYear} Healthi-Life. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-background transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ─── SEO ─────────────────────────────────────────────────
const PeptideSEO = () => {
  useEffect(() => {
    document.title = "Peptide Therapy Bangkok | Doctor-Supervised Longevity Programs | Healthi-Life";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover doctor-supervised peptide therapy programs in Bangkok for longevity, recovery, metabolic optimization, and performance. Personalized consultation required.');
    }

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Is peptide therapy suitable for everyone?", "acceptedAnswer": { "@type": "Answer", "text": "No. Suitability depends on your medical history, health goals, lab findings, and physician review." } },
        { "@type": "Question", "name": "Do I need a consultation before starting?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All peptide programs begin with an online or onsite consultation with a doctor." } },
        { "@type": "Question", "name": "How long does a peptide program last?", "acceptedAnswer": { "@type": "Answer", "text": "Programs may be structured over 3, 6, or 12 months depending on the clinical objective and physician recommendation." } },
        { "@type": "Question", "name": "Are peptide products stocked onsite?", "acceptedAnswer": { "@type": "Answer", "text": "No. Peptides are prepared and shipped through certified partner pharmacies and laboratories. Please allow a minimum of 5 working days before scheduled therapy." } },
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => { script.remove(); };
  }, []);

  return null;
};

// ─── MAIN PAGE ───────────────────────────────────────────
const Peptides = () => (
  <div className="min-h-screen flex flex-col">
    <PeptideSEO />
    <Header />
    <main className="flex-grow">
      <PeptideHero />
      <PeptideTrustBanner />
      <PeptidePrograms />
      <ClinicPresentation />
      <PeptideMedicalTeam />
      <PeptideWhyUs />
      <PeptideVideoTestimonials />
      <PeptideProcess />
      <PeptideFAQ />
      <PeptideTestimonials />
      <PeptideContact />
    </main>
    <PeptideFooter />
    <Suspense fallback={null}>
      <WhatsAppWidget />
    </Suspense>
  </div>
);

export default Peptides;
