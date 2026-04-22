import React, { lazy, Suspense, useEffect, useState } from "react";
import Header from "@/components/Header";
import MedicalTeam from "@/components/MedicalTeam";
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
  Sparkles, Brain, Zap, HeartPulse, ShieldCheck, Monitor, ChevronDown,
  Moon, Syringe, Pill, Eye
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackButtonClick } from "@/lib/tracking";
import { useLanguage } from "@/lib/i18n";
import heroImage from "@/assets/clinic-exterior.webp";
import clinicTreatmentRoom from "@/assets/premium-iv-lounge.jpg";
import drFirstPortrait from "@/assets/dr-first-portrait.jpg";
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
const PeptideHero = () => {
  const { t } = useLanguage();
  return (
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
          <div className="animate-fade-in mb-6">
            <Badge className="bg-gradient-medical text-primary-foreground px-4 py-2 text-xs md:text-sm">
              <Award className="h-4 w-4 mr-2" />
              {t("pep.hero.badge")}
            </Badge>
          </div>

          <h1 className="animate-fade-in-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 md:mb-3 leading-[1.15]">
            {t("pep.hero.title")}
          </h1>
          <h3 className="animate-fade-in-up text-xl sm:text-2xl md:text-3xl font-semibold mb-4 md:mb-6">
            <span className="bg-gradient-medical bg-clip-text text-transparent">
              {t("pep.hero.subtitle")}
            </span>
          </h3>
          <div className="animate-fade-in-up text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl">
            <ul className="space-y-1.5">
              <li>• {t("pep.hero.bullet1")}</li>
              <li>• {t("pep.hero.bullet2")}</li>
              <li>• {t("pep.hero.bullet3")}</li>
            </ul>
          </div>

          <div className="animate-fade-in-up flex flex-wrap items-center gap-4 md:gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium">{t("pep.hero.reviews")}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{t("pep.hero.location")}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{t("pep.hero.hours")}</span>
            </div>
          </div>

          <div className="animate-scale-in flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-peptide-hero-whatsapp')} asChild>
              <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                {t("pep.hero.cta1")}
              </a>
            </Button>
            <Button size="lg" variant="outline" onClick={() => trackButtonClick('ivclick-peptide-hero-book')} asChild>
              <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                {t("pep.hero.cta2")}
              </a>
            </Button>
          </div>

          <p className="animate-fade-in mt-8 text-sm text-muted-foreground">
            {t("pep.hero.locationInfo")}
          </p>
        </div>
      </div>
    </section>
  );
};

// ─── TRUST BANNER ────────────────────────────────────────
const PeptideTrustBanner = () => {
  const { t } = useLanguage();
  const stats = [
    {
      icon: Star,
      value: "5.0",
      label: t("pep.trust.googleRating"),
      extra: (
        <div className="flex ml-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      ),
    },
    { icon: Users, value: "2,000+", label: t("pep.trust.patientsTreated") },
    { icon: Globe, value: "50+", label: t("pep.trust.countriesServed") },
    { icon: Shield, value: "ISO · GMP", label: t("pep.trust.certifiedLab") },
    { icon: Award, value: t("pep.trust.bestClinic"), label: t("pep.trust.bestClinicLabel") },
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

// ─── PEPTIDE CARD RENDERER ───────────────────────────────
const PeptideCard = ({ peptide, t }: { peptide: { icon: any; name: string; useCaseKey: string; benefitKey: string; bulletKeys: string[]; ctaKey: string }; t: (k: string) => string }) => (
  <Card className="border-border hover:shadow-lg transition-shadow duration-300 flex flex-col">
    <CardContent className="p-6 flex flex-col flex-grow">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-medical flex items-center justify-center">
          <peptide.icon className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="text-sm font-semibold text-primary">{t(peptide.useCaseKey)}</span>
      </div>
      <h4 className="text-lg font-bold text-foreground mb-2">{peptide.name}</h4>
      <p className="text-sm text-muted-foreground mb-4">{t(peptide.benefitKey)}</p>
      <ul className="space-y-2 mb-4 flex-grow">
        {peptide.bulletKeys.map((bk) => (
          <li key={bk} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-primary">•</span>
            {t(bk)}
          </li>
        ))}
      </ul>
      <Button variant="outline" className="w-full group mt-4" onClick={() => trackButtonClick(`ivclick-peptide-${peptide.name.toLowerCase().replace(/\s+/g, '-')}`)} asChild>
        <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer">
          <MessageCircle className="h-4 w-4 mr-2" />
          {t(peptide.ctaKey)}
        </a>
      </Button>
    </CardContent>
  </Card>
);

// ─── PEPTIDE DATA ────────────────────────────────────────
// 1. Weight Loss / Sport Performance & Men Health
const weightLossPeptides = [
  { icon: HeartPulse, name: "BPC-157", useCaseKey: "pep.bpc157.useCase", benefitKey: "pep.bpc157.benefit", bulletKeys: ["pep.bpc157.b1", "pep.bpc157.b2", "pep.bpc157.b3"], ctaKey: "pep.programs.talkDoctor" },
  { icon: HeartPulse, name: "TB-500", useCaseKey: "pep.tb500.useCase", benefitKey: "pep.tb500.benefit", bulletKeys: ["pep.tb500.b1", "pep.tb500.b2", "pep.tb500.b3"], ctaKey: "pep.programs.talkDoctor" },
  { icon: Brain, name: "NAD+", useCaseKey: "pep.nad.useCase", benefitKey: "pep.nad.benefit", bulletKeys: ["pep.nad.b1", "pep.nad.b2", "pep.nad.b3"], ctaKey: "pep.programs.talkDoctor" },
  { icon: Dumbbell, name: "CJC-1295", useCaseKey: "pep.cjc1295.useCase", benefitKey: "pep.cjc1295.benefit", bulletKeys: ["pep.cjc1295.b1", "pep.cjc1295.b2", "pep.cjc1295.b3"], ctaKey: "pep.programs.talkDoctor" },
  { icon: Dumbbell, name: "Ipamorelin", useCaseKey: "pep.ipamorelin.useCase", benefitKey: "pep.ipamorelin.benefit", bulletKeys: ["pep.ipamorelin.b1", "pep.ipamorelin.b2", "pep.ipamorelin.b3"], ctaKey: "pep.programs.talkDoctor" },
  { icon: Sparkles, name: "Epithalon", useCaseKey: "pep.epithalon.useCase", benefitKey: "pep.epithalon.benefit", bulletKeys: ["pep.epithalon.b1", "pep.epithalon.b2", "pep.epithalon.b3"], ctaKey: "pep.programs.talkDoctor" },
];

// 2. Growth Hormones
const growthHormonePeptides = [
  { icon: Dumbbell, name: "CJC-1295", useCaseKey: "pep.cjc1295.useCase", benefitKey: "pep.cjc1295.benefit", bulletKeys: ["pep.cjc1295.b1", "pep.cjc1295.b2", "pep.cjc1295.b3"], ctaKey: "pep.programs.bookReview" },
  { icon: Dumbbell, name: "Ipamorelin", useCaseKey: "pep.ipamorelin.useCase", benefitKey: "pep.ipamorelin.benefit", bulletKeys: ["pep.ipamorelin.b1", "pep.ipamorelin.b2", "pep.ipamorelin.b3"], ctaKey: "pep.programs.bookReview" },
];

// 3. Healing, Gut Health & Skin Repair
const healingPeptides = [
  { icon: HeartPulse, name: "BPC-157", useCaseKey: "pep.bpc157.useCase", benefitKey: "pep.bpc157.benefit", bulletKeys: ["pep.bpc157.b1", "pep.bpc157.b2", "pep.bpc157.b3"], ctaKey: "pep.programs.talkToUs" },
  { icon: HeartPulse, name: "BPC-157 (Oral)", useCaseKey: "pep.bpc157oral.useCase", benefitKey: "pep.bpc157oral.benefit", bulletKeys: ["pep.bpc157oral.b1", "pep.bpc157oral.b2", "pep.bpc157oral.b3"], ctaKey: "pep.programs.talkToUs" },
  { icon: HeartPulse, name: "TB-500", useCaseKey: "pep.tb500.useCase", benefitKey: "pep.tb500.benefit", bulletKeys: ["pep.tb500.b1", "pep.tb500.b2", "pep.tb500.b3"], ctaKey: "pep.programs.talkToUs" },
  { icon: Sparkles, name: "GHK-Cu", useCaseKey: "pep.ghkcu.useCase", benefitKey: "pep.ghkcu.benefit", bulletKeys: ["pep.ghkcu.b1", "pep.ghkcu.b2", "pep.ghkcu.b3"], ctaKey: "pep.programs.talkDoctor" },
];

// 4. Anti-Aging
const antiAgingPeptides = [
  { icon: Zap, name: "Epithalon", useCaseKey: "pep.epithalon.useCase", benefitKey: "pep.epithalon.benefit", bulletKeys: ["pep.epithalon.b1", "pep.epithalon.b2", "pep.epithalon.b3"], ctaKey: "pep.programs.bookReview" },
  { icon: Shield, name: "SS-31", useCaseKey: "pep.ss31.useCase", benefitKey: "pep.ss31.benefit", bulletKeys: ["pep.ss31.b1", "pep.ss31.b2", "pep.ss31.b3"], ctaKey: "pep.programs.talkDoctor" },
];

// 5. Sleep Disorder
const sleepPeptides = [
  { icon: Moon, name: "Epithalon", useCaseKey: "pep.epithalon.useCase", benefitKey: "pep.epithalon.benefit", bulletKeys: ["pep.epithalon.b1", "pep.epithalon.b2", "pep.epithalon.b3"], ctaKey: "pep.programs.bookReview" },
];

// 6. Focus / Neuro Function
const neuroPeptides = [
  { icon: Brain, name: "Selank", useCaseKey: "pep.selank.useCase", benefitKey: "pep.selank.benefit", bulletKeys: ["pep.selank.b1", "pep.selank.b2", "pep.selank.b3"], ctaKey: "pep.programs.talkToUs" },
  { icon: Brain, name: "Semax", useCaseKey: "pep.semax.useCase", benefitKey: "pep.semax.benefit", bulletKeys: ["pep.semax.b1", "pep.semax.b2", "pep.semax.b3"], ctaKey: "pep.programs.talkToUs" },
];

// 7. Libido
const libidoPeptides = [
  { icon: Heart, name: "PT-141", useCaseKey: "pep.pt141.useCase", benefitKey: "pep.pt141.benefit", bulletKeys: ["pep.pt141.b1", "pep.pt141.b2", "pep.pt141.b3"], ctaKey: "pep.programs.talkDoctor" },
  { icon: Heart, name: "PT-141 Nasal Spray", useCaseKey: "pep.pt141nasal.useCase", benefitKey: "pep.pt141nasal.benefit", bulletKeys: ["pep.pt141nasal.b1", "pep.pt141nasal.b2", "pep.pt141nasal.b3"], ctaKey: "pep.programs.talkDoctor" },
];

// 8. Boost Fertility
const fertilityPeptides = [
  { icon: HeartPulse, name: "Kisspeptin", useCaseKey: "pep.kisspeptin.useCase", benefitKey: "pep.kisspeptin.benefit", bulletKeys: ["pep.kisspeptin.b1", "pep.kisspeptin.b2", "pep.kisspeptin.b3"], ctaKey: "pep.programs.talkDoctor" },
];

const peptideCategories = [
  { key: "weightLoss", icon: Flame, titleKey: "pep.catName.weightLoss", peptides: weightLossPeptides },
  { key: "growthHormone", icon: Dumbbell, titleKey: "pep.catName.growthHormone", peptides: growthHormonePeptides },
  { key: "healing", icon: HeartPulse, titleKey: "pep.catName.healing", peptides: healingPeptides },
  { key: "antiAging", icon: Sparkles, titleKey: "pep.catName.antiAging", peptides: antiAgingPeptides },
  { key: "sleep", icon: Moon, titleKey: "pep.catName.sleep", peptides: sleepPeptides },
  { key: "neuro", icon: Brain, titleKey: "pep.catName.neuro", peptides: neuroPeptides },
  { key: "libido", icon: Heart, titleKey: "pep.catName.libido", peptides: libidoPeptides },
  { key: "fertility", icon: HeartPulse, titleKey: "pep.catName.fertility", peptides: fertilityPeptides },
];

// ─── SERVICES ─────────────────────────────────────────────

const PeptidePrograms = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Individual Peptide Cards */}
        <div className="mb-16 md:mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">{t("pep.programs.peptidesUsed")}</h3>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-4">{t("pep.programs.peptidesUsedDesc")}</p>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Badge className="bg-gradient-medical text-primary-foreground px-4 py-2 text-sm">
              {t("pep.catalog.onDemand")}
            </Badge>
            <Badge variant="outline" className="border-primary/30 text-primary px-4 py-2 text-sm">
              Designed Program Available
            </Badge>
          </div>

          {peptideCategories.map((cat, catIndex) => (
            <div key={cat.key} className={catIndex < peptideCategories.length - 1 ? "mb-12" : ""}>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <cat.icon className="h-6 w-6 text-primary" />
                {t(cat.titleKey)}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.peptides.map((p) => <PeptideCard key={`${cat.key}-${p.name}`} peptide={p} t={t} />)}
              </div>

              {/* Dr First Quote after first category */}
              {catIndex === 0 && (
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mt-12 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <img
                    src={drFirstPortrait}
                    alt="Dr First - Napat Hunsajarupan, Healthi-Life"
                    className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover object-top shadow-lg flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <blockquote className="text-lg md:text-xl font-semibold text-foreground italic mb-3">
                      {t("pep.drfirst.quote")}
                    </blockquote>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {t("pep.drfirst.desc")}
                    </p>
                    <p className="text-sm font-bold text-primary">{t("pep.drfirst.title")}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// ─── PEPTIDE CATALOG ─────────────────────────────────────
const catalogCategoryKeys = [
  { key: "weightLoss", icon: Flame, peptides: ["BPC-157", "Thymosin Beta-4 (TB-500)", "NAD+", "CJC-1295", "Ipamorelin", "Epithalon"] },
  { key: "growthHormone", icon: Dumbbell, peptides: ["CJC-1295", "Ipamorelin"] },
  { key: "healing", icon: HeartPulse, peptides: ["BPC-157", "Thymosin Beta-4 (TB-500)", "BPC-157 (Oral)", "GHK-Cu"] },
  { key: "antiAging", icon: Sparkles, peptides: ["Epithalon", "NMN", "SS-31 (Elamipretide)"] },
  { key: "sleep", icon: Moon, peptides: ["Epithalon", "DSIP"] },
  { key: "neuro", icon: Brain, peptides: ["Selank", "Semax"] },
  { key: "libido", icon: Heart, peptides: ["PT-141", "PT-141 Nasal Spray", "Oxytocin"] },
  { key: "fertility", icon: HeartPulse, peptides: ["Kisspeptin"] },
];

// Catalog benefits stay in English (medical terms)
const peptideCatalogData: Record<string, { benefits: string; route?: string; frequency?: string }> = {
  "Epithalon": { benefits: "Research suggests it may support healthy aging, sleep quality, and cellular resilience.", route: "Subcutaneous injection", frequency: "Every 2–3 days × 15 injections (per cycle), every 6 months" },
  "NMN": { benefits: "Boosts NAD⁺, enhances energy, metabolism, and longevity", route: "Oral capsule", frequency: "1 tab daily (500 mg)" },
  "MOTS-c": { benefits: "Boosts metabolism, mimics exercise, supports weight loss & energy", route: "Subcutaneous injection", frequency: "Once weekly (10 mg) for 3–4 months, pause for 2 months" },
  "SS-31 (Elamipretide)": { benefits: "Protects mitochondria, reduces oxidative stress, improves muscle strength & endurance", route: "Subcutaneous injection", frequency: "Once daily (5–10 mg) for 3–4 months, pause for 2 months" },
  "CJC-1295": { benefits: "May help support natural growth hormone signaling, recovery, sleep quality, and lean muscle maintenance.", route: "Subcutaneous injection", frequency: "5 days/week (100–200 mcg), fasting 2–3 hours prior" },
  "Ipamorelin": { benefits: "May help support recovery, sleep quality, and metabolic regulation with selective GH signaling.", route: "Subcutaneous injection", frequency: "5 days/week (100–200 mcg), fasting 2–3 hours prior" },
  
  "SLU-PP-332": { benefits: "Enhances mitochondrial efficiency, reduces oxidative stress, supports anti-aging and neuroprotection", route: "Oral capsule", frequency: "1–2 tab daily (500–1000 mcg)" },
  "Tesofensine": { benefits: "Potent appetite suppression, improves satiety control, supports significant fat loss and metabolic regulation", route: "Oral capsule", frequency: "1–2 tab daily (500 mcg)" },
  "BPC-157": { benefits: "Research suggests it may support tendon, ligament, muscle, and gut recovery while helping modulate inflammation.", route: "Subcutaneous injection", frequency: "Once daily (1 mg) for 3–4 months, pause for 2 months" },
  "Thymosin Beta-4 (TB-500)": { benefits: "Research suggests it may support tissue recovery and muscle or tendon resilience.", route: "Subcutaneous injection", frequency: "Once daily (0.5 mg) for 2–3 months, pause for 2 months" },
  "NAD+": { benefits: "Supports cellular energy metabolism and healthy mitochondrial function.", route: "Intravenous infusion", frequency: "Determined individually during consultation" },
  "BPC-157 (Oral)": { benefits: "Supports gut lining repair, reduces GI inflammation, and improves nutrient absorption", route: "Oral capsule", frequency: "1–2 tab daily (500–1000 mcg)" },
  "GHK-Cu": { benefits: "Skin rejuvenation, hair growth stimulation, wound healing, anti-inflammatory", route: "Subcutaneous injection", frequency: "Once daily (2 mg) for 3–4 months, pause for 2 months" },
  "DSIP": { benefits: "Improves sleep quality, reduces nighttime stress, provides stress-protective effects on brain and body", route: "Subcutaneous injection", frequency: "2–12 hours before bedtime (250–500 mcg)" },
  "Selank": { benefits: "Anti-anxiety, mood stabilizer, enhances focus & reduces stress without sedation", route: "Intranasal spray", frequency: "1 spray in each nostril 1–2 times daily (Night time)" },
  "Semax": { benefits: "Cognitive enhancer, neuroprotection, boosts memory, focus & recovery after stress or stroke", route: "Intranasal spray", frequency: "1 spray in each nostril 1–2 times daily (Day time)" },
  "PT-141": { benefits: "Enhances libido and sexual function", route: "Subcutaneous injection", frequency: "As needed, up to 3 times/week, 1–2 hours prior to desired effect (1–2 mg)" },
  "PT-141 Nasal Spray": { benefits: "Enhances libido and sexual function", route: "Intranasal spray", frequency: "1 spray in each nostril once daily" },
  "Oxytocin": { benefits: "Enhances bonding, intimacy, social connection, reduces stress, supports sexual health", route: "Intranasal spray", frequency: "1 spray in each nostril once daily" },
  "Kisspeptin": { benefits: "Stimulates natural release of LH & FSH, boosts testosterone/estrogen balance, supports fertility & libido", route: "Subcutaneous injection", frequency: "Once daily (100–200 mcg) for 3–4 months" },
};

const PeptideCatalog = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("pep.catalog.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            {t("pep.catalog.subtitle")}
          </p>
          <Badge className="bg-gradient-medical text-primary-foreground px-4 py-2 text-sm font-medium">
            {t("pep.catalog.onDemand")}
          </Badge>
        </div>

        <div className="space-y-8">
          {catalogCategoryKeys.map((cat) => (
            <React.Fragment key={cat.key}>
              <div className="border border-border rounded-xl overflow-hidden bg-card">
                <div className="px-6 py-5 flex items-center gap-3 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-medical flex items-center justify-center flex-shrink-0">
                    <cat.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground">{t(`pep.catName.${cat.key}`)}</h3>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {cat.peptides.length} {cat.peptides.length > 1 ? t("pep.catalog.peptides") : t("pep.catalog.peptide")}
                  </Badge>
                </div>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary/40">
                        <th className="px-6 py-3 text-left font-semibold text-foreground">Peptide</th>
                        <th className="px-6 py-3 text-left font-semibold text-foreground">{t("pep.catalog.benefits")}</th>
                        <th className="px-6 py-3 text-left font-semibold text-foreground">{t("pep.catalog.route")}</th>
                        <th className="px-6 py-3 text-left font-semibold text-foreground">{t("pep.catalog.frequency")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.peptides.map((name, i) => {
                        const data = peptideCatalogData[name];
                        if (!data) return null;
                        return (
                          <tr key={name} className={`border-t border-border ${i % 2 === 0 ? 'bg-card' : 'bg-secondary/20'}`}>
                            <td className="px-6 py-4 font-semibold text-foreground whitespace-nowrap">{name}</td>
                            <td className="px-6 py-4 text-muted-foreground">{data.benefits}</td>
                            <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{data.route}</td>
                            <td className="px-6 py-4 text-muted-foreground">{data.frequency}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden divide-y divide-border">
                  {cat.peptides.map((name) => {
                    const data = peptideCatalogData[name];
                    if (!data) return null;
                    return (
                      <div key={name} className="p-4 space-y-2">
                        <h4 className="font-semibold text-foreground">{name}</h4>
                        <p className="text-sm text-muted-foreground">{data.benefits}</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <Badge variant="secondary">{data.route}</Badge>
                          <Badge variant="outline">{data.frequency}</Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="px-6 py-4 border-t border-border bg-secondary/30 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground italic">{t("pep.catalog.onDemand")}</span>
                  <Button size="sm" className="group" onClick={() => trackButtonClick(`ivclick-peptide-catalog-${cat.key}`)} asChild>
                    <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {t("pep.programs.talkToUs")}
                    </a>
                  </Button>
                </div>
              </div>

              {/* Dr First Quote after Weight Loss category */}
              {cat.key === "weightLoss" && (
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <img
                    src={drFirstImage}
                    alt="Dr. Napat Hunsajarupan (First) - Founder & Chief Medical Officer, Healthi-Life"
                    className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover object-top shadow-lg flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <blockquote className="text-base md:text-lg font-medium text-foreground italic mb-3 leading-relaxed">
                      {t("pep.drfirst.quote")}
                    </blockquote>
                    <p className="text-sm font-bold text-primary">{t("pep.drfirst.title")}</p>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CTA SECTION ─────────────────────────────────────────
const PeptideCTA = () => {
  const { t } = useLanguage();
  return (
    <section className="py-12 md:py-16 bg-secondary/20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t("pep.cta.title")}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t("pep.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-peptide-cta-book')} asChild>
              <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                {t("pep.prog.bookReview")}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="group" onClick={() => trackButtonClick('ivclick-peptide-cta-concierge')} asChild>
              <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                {t("pep.cta.whatsapp")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── CLINIC PRESENTATION ─────────────────────────────────
const ClinicPresentation = () => {
  const { t } = useLanguage();
  const points = [
    { icon: Stethoscope, titleKey: "pep.clinic.p1.title", descKey: "pep.clinic.p1.desc" },
    { icon: UserCheck, titleKey: "pep.clinic.p2.title", descKey: "pep.clinic.p2.desc" },
    { icon: RefreshCw, titleKey: "pep.clinic.p3.title", descKey: "pep.clinic.p3.desc" },
    { icon: Heart, titleKey: "pep.clinic.p4.title", descKey: "pep.clinic.p4.desc" },
    { icon: ShieldCheck, titleKey: "pep.clinic.p5.title", descKey: "pep.clinic.p5.desc" },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("pep.clinic.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("pep.clinic.subtitle")}
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="rounded-2xl overflow-hidden shadow-lg sticky top-24">
            <img
              src={clinicTreatmentRoom}
              alt="Healthi-Life Peptide Therapy Treatment Room"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-6">
            {points.map((p) => (
              <div key={p.titleKey} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-medical flex items-center justify-center flex-shrink-0 mt-0.5">
                  <p.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{t(p.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(p.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── WHY PATIENTS CHOOSE ─────────────────────────────────
const PeptideWhyUs = () => {
  const { t } = useLanguage();
  const points = [
    { icon: Stethoscope, titleKey: "pep.why.p1.title", descKey: "pep.why.p1.desc" },
    { icon: UserCheck, titleKey: "pep.why.p2.title", descKey: "pep.why.p2.desc" },
    { icon: Microscope, titleKey: "pep.why.p3.title", descKey: "pep.why.p3.desc" },
    { icon: Sparkles, titleKey: "pep.why.p4.title", descKey: "pep.why.p4.desc" },
    { icon: Heart, titleKey: "pep.why.p5.title", descKey: "pep.why.p5.desc" },
    { icon: ShieldCheck, titleKey: "pep.why.p6.title", descKey: "pep.why.p6.desc" },
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("pep.why.title")}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((p) => (
            <Card key={p.titleKey} className="border-border text-center p-6 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-medical flex items-center justify-center mb-4">
                <p.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{t(p.titleKey)}</h3>
              <p className="text-sm text-muted-foreground">{t(p.descKey)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── PATIENT EXPERIENCE (VIDEO TESTIMONIALS) ─────────────
const PeptideVideoTestimonials = () => {
  const { t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const patientVideos = [
    { id: "0q0ht-nms4w", titleKey: "pep.video.v1.title", subtitleKey: "pep.video.v1.subtitle", descKey: "pep.video.v1.desc" },
    { id: "acuxB5dBjqw", titleKey: "pep.video.v2.title", subtitleKey: "pep.video.v2.subtitle", descKey: "pep.video.v2.desc" },
    { id: "Q0-FuK5CViA", titleKey: "pep.video.v3.title", subtitleKey: "pep.video.v3.subtitle", descKey: "pep.video.v3.desc" },
  ];

  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {t("pep.video.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("pep.video.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("pep.video.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {patientVideos.map((video) => (
              <div
                key={video.id}
                className="group relative cursor-pointer"
                onClick={() => setSelectedVideo(video.id)}
                role="button"
                tabIndex={0}
                aria-label={`Play video: ${t(video.titleKey)}`}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedVideo(video.id)}
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02]">
                  <img src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} alt={t(video.titleKey)} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                      <Play className="h-8 w-8 md:h-10 md:w-10 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-2 py-0.5 bg-primary text-primary-foreground rounded text-xs font-medium mb-2">
                      {t(video.subtitleKey)}
                    </span>
                    <h3 className="font-bold text-white text-sm md:text-base line-clamp-2">{t(video.titleKey)}</h3>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground line-clamp-2">{t(video.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedVideo(null)}>
          <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center" aria-label="Close video">
            <span className="text-white text-2xl">✕</span>
          </button>
          <div className="relative aspect-[9/16] max-h-[85vh] w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Video testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

// ─── HOW THE PROGRAM WORKS ───────────────────────────────
const PeptideProcess = () => {
  const { t } = useLanguage();
  const mainSteps = [
    { icon: CalendarCheck, titleKey: "pep.process.step1.title", descKey: "pep.process.step1.desc" },
    { icon: Microscope, titleKey: "pep.process.step2.title", descKey: "pep.process.step2.desc" },
    { icon: Monitor, titleKey: "pep.process.step3.title", descKey: "pep.process.step3.desc" },
  ];

  const additionalSteps = [
    { icon: ClipboardCheck, titleKey: "pep.process.add1.title", descKey: "pep.process.add1.desc" },
    { icon: FlaskConical, titleKey: "pep.process.add2.title", descKey: "pep.process.add2.desc" },
    { icon: RefreshCw, titleKey: "pep.process.add3.title", descKey: "pep.process.add3.desc" },
  ];

  return (
    <section id="process" className="py-16 md:py-24 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("pep.process.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("pep.process.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {mainSteps.map((step, i) => (
            <Card key={step.titleKey} className="relative border-border p-6 hover:shadow-lg transition-shadow bg-card">
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-medical flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{t(step.titleKey)}</h3>
              <p className="text-sm text-muted-foreground">{t(step.descKey)}</p>
            </Card>
          ))}
        </div>
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
          <h3 className="text-lg font-semibold text-foreground mb-6 text-center">{t("pep.process.next")}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalSteps.map((step) => (
              <div key={step.titleKey} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <step.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1">{t(step.titleKey)}</h4>
                  <p className="text-xs text-muted-foreground">{t(step.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground italic max-w-2xl mx-auto">
          {t("pep.process.disclaimer")}
        </p>
      </div>
    </section>
  );
};

// ─── FAQ ─────────────────────────────────────────────────
const PeptideFAQ = () => {
  const { t } = useLanguage();
  const faqKeys = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("pep.faq.title")}</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqKeys.map((n) => (
            <details key={n} className="group bg-card border border-border rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-secondary/30 transition-colors">
                <span className="font-semibold text-foreground text-left pr-4">{t(`pep.faq.q${n}`)}</span>
                <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-5 pb-5">
                <p className="text-muted-foreground">{t(`pep.faq.a${n}`)}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CLIENT FEEDBACK ─────────────────────────────────────
const PeptideTestimonials = () => {
  const { t } = useLanguage();
  const reviews = [
    { initials: "RM", textKey: "pep.reviews.r1", name: "Richard M.", location: "London, UK" },
    { initials: "SY", textKey: "pep.reviews.r2", name: "Soo-Yeon K.", location: "Seoul, South Korea" },
    { initials: "TW", textKey: "pep.reviews.r3", name: "Thomas W.", location: "Sydney, Australia" },
    { initials: "AL", textKey: "pep.reviews.r4", name: "Anna L.", location: "Munich, Germany" },
    { initials: "JC", textKey: "pep.reviews.r5", name: "James C.", location: "New York, USA" },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 uppercase tracking-wide">
            {t("pep.reviews.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">{t("pep.reviews.title")}</h2>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-3xl font-bold text-foreground">5</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-muted-foreground">{t("pep.reviews.count")}</span>
            <Badge variant="outline" className="border-border gap-1.5 px-3 py-1.5">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              {t("pep.reviews.privateClients")}
            </Badge>
          </div>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-7xl mx-auto">
          {reviews.map((r, i) => (
            <Card key={i} className="relative border-border p-5 flex flex-col">
              <div className="text-primary/20 text-4xl font-serif leading-none mb-2">"</div>
              <div className="absolute -top-3 right-4 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shadow-md">
                {r.initials}
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 flex-grow leading-relaxed">"{t(r.textKey)}"</p>
              <div className="border-t border-border pt-3 mt-auto">
                <p className="text-sm font-bold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.location}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CONTACT / CTA ───────────────────────────────────────
const PeptideContact = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("pep.contact.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("pep.contact.subtitle")}</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <Button size="lg" className="w-full group" onClick={() => trackButtonClick('ivclick-peptide-contact-whatsapp')} asChild>
                <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t("pep.contact.whatsapp")}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full" onClick={() => trackButtonClick('ivclick-peptide-contact-book')} asChild>
                <a href="https://wa.me/66919991744?text=I%27d%20like%20to%20book%20a%20peptide%20consultation" target="_blank" rel="noopener noreferrer">
                  <CalendarCheck className="h-5 w-5 mr-2" />
                  {t("pep.contact.book")}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full" onClick={() => trackButtonClick('ivclick-peptide-contact-callback')} asChild>
                <a href="https://wa.me/66919991744?text=Please%20call%20me%20back%20about%20peptide%20programs" target="_blank" rel="noopener noreferrer">
                  <Phone className="h-5 w-5 mr-2" />
                  {t("pep.contact.callback")}
                </a>
              </Button>
            </div>
            <div className="p-6 bg-secondary/50 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">{t("pep.contact.address")}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{t("pep.contact.hours")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{t("pep.contact.email")}</span>
              </div>
            </div>
          </div>

          <Card className="border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                const fullName = data.get('fullName') || '';
                const country = data.get('country') || '';
                const whatsapp = data.get('whatsapp') || '';
                const email = data.get('email') || '';
                const goal = data.get('goal') || '';
                const consultType = data.get('consultType') || 'online';
                const time = data.get('time') || '';
                const notes = data.get('notes') || '';
                const subject = encodeURIComponent(`Peptide Inquiry — ${fullName}`);
                const body = encodeURIComponent(
                  `Name: ${fullName}\nCountry: ${country}\nWhatsApp: ${whatsapp}\nEmail: ${email}\nGoal: ${goal}\nConsultation: ${consultType}\nPreferred Time: ${time}\nNotes: ${notes}`
                );
                trackButtonClick('ivclick-peptide-form-submit');
                window.location.href = `mailto:contact@healthi-life.com?subject=${subject}&body=${body}`;
              }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t("pep.contact.fullName")}</Label>
                    <Input id="fullName" name="fullName" placeholder={t("pep.contact.fullNamePh")} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">{t("pep.contact.country")}</Label>
                    <Input id="country" name="country" placeholder={t("pep.contact.countryPh")} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">{t("pep.contact.whatsappNum")}</Label>
                    <Input id="whatsapp" name="whatsapp" placeholder="+66..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("pep.contact.emailLabel")}</Label>
                    <Input id="email" name="email" type="email" placeholder={t("pep.contact.emailPh")} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal">{t("pep.contact.goal")}</Label>
                  <Input id="goal" name="goal" placeholder={t("pep.contact.goalPh")} />
                </div>
                <div className="space-y-2">
                  <Label>{t("pep.contact.consultType")}</Label>
                  <RadioGroup defaultValue="online" name="consultType" className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online" className="font-normal">{t("pep.contact.online")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="onsite" id="onsite" />
                      <Label htmlFor="onsite" className="font-normal">{t("pep.contact.onsite")}</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">{t("pep.contact.time")}</Label>
                  <Input id="time" name="time" placeholder={t("pep.contact.timePh")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">{t("pep.contact.notes")}</Label>
                  <Textarea id="notes" name="notes" placeholder={t("pep.contact.notesPh")} rows={3} />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Mail className="h-5 w-5 mr-2" />
                  {t("pep.contact.submit")}
                </Button>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

// ─── FOOTER ──────────────────────────────────────────────
const PeptideFooter = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src={logoWhite} alt="Healthi-Life" className="h-8 w-auto mb-4" />
            <p className="text-background/80 text-sm">{t("pep.footer.desc")}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{t("pep.footer.contact")}</h4>
            <div className="space-y-2 text-sm text-background/70">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 94 Ekkamai 10, Watthana, Bangkok</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +66 91 999 1744</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@healthi-life.com</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{t("pep.footer.quickLinks")}</h4>
            <div className="space-y-2 text-sm text-background/70">
              <Link to="/" className="block hover:text-background transition-colors">{t("pep.footer.home")}</Link>
              <Link to="/peptides-therapy" className="block hover:text-background transition-colors">{t("pep.footer.peptides")}</Link>
              <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer" className="block hover:text-background transition-colors">{t("pep.footer.bookConsult")}</a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/20 pt-6">
          <p className="text-xs text-background/50 mb-4 leading-relaxed max-w-4xl">
            <strong>{t("pep.footer.disclaimer")}</strong> {t("pep.footer.disclaimerText")}
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-background/50">
            <p>© {currentYear} {t("pep.footer.rights")}</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-background transition-colors">{t("pep.footer.privacy")}</a>
              <a href="#" className="hover:text-background transition-colors">{t("pep.footer.terms")}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ─── SEO ─────────────────────────────────────────────────
const PeptideSEO = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const titles: Record<string, string> = {
      en: "Peptide Therapy Bangkok | Doctor-Supervised Longevity Programs | Healthi-Life",
      th: "เปปไทด์บำบัดกรุงเทพ | โปรแกรมอายุยืนดูแลโดยแพทย์ | Healthi-Life",
      ja: "ペプチド療法バンコク | 医師監督の長寿プログラム | Healthi-Life",
    };
    const descriptions: Record<string, string> = {
      en: "Discover doctor-supervised peptide therapy programs in Bangkok for longevity, recovery, metabolic optimization, and performance. Personalized consultation required.",
      th: "ค้นพบโปรแกรมบำบัดเปปไทด์ภายใต้การดูแลของแพทย์ในกรุงเทพ สำหรับอายุยืน การฟื้นตัว เพิ่มประสิทธิภาพการเผาผลาญ และสมรรถภาพ ต้องปรึกษาแพทย์",
      ja: "バンコクで医師監督のペプチド療法プログラムを発見。長寿、回復、代謝最適化、パフォーマンスのために。パーソナライズされた診察が必要です。",
    };

    document.title = titles[language] || titles.en;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[language] || descriptions.en);
    }

    // Peptide-specific schemas
    const peptideSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MedicalWebPage",
          "@id": "https://ivtherapyhealthilife.com/peptides-therapy#page",
          "url": "https://ivtherapyhealthilife.com/peptides-therapy",
          "name": titles[language] || titles.en,
          "description": descriptions[language] || descriptions.en,
          "inLanguage": language,
          "isPartOf": { "@id": "https://ivtherapyhealthilife.com/#website" },
          "about": { "@id": "https://ivtherapyhealthilife.com/#clinic" },
          "breadcrumb": { "@id": "https://ivtherapyhealthilife.com/peptides-therapy#breadcrumb" },
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://ivtherapyhealthilife.com/peptides-therapy#breadcrumb",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ivtherapyhealthilife.com/" },
            { "@type": "ListItem", "position": 2, "name": "Peptide Therapy", "item": "https://ivtherapyhealthilife.com/peptides-therapy" },
          ],
        },
        {
          "@type": "MedicalBusiness",
          "@id": "https://ivtherapyhealthilife.com/peptides-therapy#service",
          "name": "Peptide Therapy — Healthi-Life",
          "url": "https://ivtherapyhealthilife.com/peptides-therapy",
          "description": "Doctor-supervised peptide therapy for longevity, recovery, weight management, and performance optimization.",
          "provider": { "@id": "https://ivtherapyhealthilife.com/#clinic" },
          "medicalSpecialty": ["Peptide Therapy", "Regenerative Medicine", "Longevity Medicine"],
          "availableService": [
            { "@type": "MedicalProcedure", "name": "Cellular Longevity Protocol", "description": "6-12 month protocol for healthy aging & metabolic resilience", "procedureType": "https://schema.org/NoninvasiveProcedure" },
            { "@type": "MedicalProcedure", "name": "Recovery & Regeneration Protocol", "description": "3-6 month recovery protocol for tissue resilience & inflammation management", "procedureType": "https://schema.org/NoninvasiveProcedure" },
            { "@type": "MedicalProcedure", "name": "Metabolic Reset & Weight Optimization", "description": "6-12 month protocol for fat reduction & metabolic flexibility", "procedureType": "https://schema.org/NoninvasiveProcedure" },
            { "@type": "MedicalProcedure", "name": "Lean Muscle & Performance Optimization", "description": "6-12 month protocol for lean muscle & training recovery", "procedureType": "https://schema.org/NoninvasiveProcedure" },
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Peptide Therapy",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Peptide Therapy" }, "price": "40000", "priceCurrency": "THB", "availability": "https://schema.org/InStock" },
            ],
          },
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Is peptide therapy suitable for everyone?", "acceptedAnswer": { "@type": "Answer", "text": "No. Suitability depends on your medical history, health goals, lab findings, and physician review." } },
            { "@type": "Question", "name": "Do I need a consultation before starting?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All peptide therapies begin with an online or onsite consultation with a doctor." } },
            { "@type": "Question", "name": "How long does peptide therapy last?", "acceptedAnswer": { "@type": "Answer", "text": "Treatments may be structured over 3, 6, or 12 months depending on the clinical objective and physician recommendation." } },
            { "@type": "Question", "name": "Are peptide products stocked onsite?", "acceptedAnswer": { "@type": "Answer", "text": "No. Peptides are prepared and shipped through certified partner pharmacies and laboratories. Please allow a minimum of 5 working days before scheduled therapy." } },
            { "@type": "Question", "name": "What peptides are available at Healthi-Life Bangkok?", "acceptedAnswer": { "@type": "Answer", "text": "Healthi-Life offers 18+ medical peptides including BPC-157, TB-500, NAD+, Epithalon, CJC-1295, Ipamorelin, Selank, Semax, PT-141, and more. All are prescribed by physicians based on medical assessment. Protocols and dosages are determined individually during consultation." } },
            { "@type": "Question", "name": "How much does peptide therapy cost in Bangkok?", "acceptedAnswer": { "@type": "Answer", "text": "Peptide therapy at Healthi-Life starts from 40,000 THB. Final pricing depends on treatment duration, medical evaluation, and personalization level. Detailed pricing is provided after doctor consultation." } },
          ],
        },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'schema-peptide';
    script.textContent = JSON.stringify(peptideSchema);
    document.head.appendChild(script);

    // Update og:locale
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      const localeMap: Record<string, string> = { en: 'en_US', th: 'th_TH', ja: 'ja_JP' };
      ogLocale.setAttribute('content', localeMap[language] || 'en_US');
    }

    return () => { script.remove(); };
  }, [language]);

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
      {/* <PeptidePrograms /> */}
      <PeptideCatalog />
      <PeptideCTA />
      
      <MedicalTeam />
      <PeptideWhyUs />
      <PeptideVideoTestimonials />
      
      <PeptideFAQ />
      <PeptideTestimonials />
      
    </main>
    <PeptideFooter />
    <Suspense fallback={null}>
      <WhatsAppWidget />
    </Suspense>
  </div>
);

export default Peptides;
