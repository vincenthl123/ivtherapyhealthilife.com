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
  Moon, Dumbbell, Clock, RefreshCw
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
const CJCHero = () => (
  <section className="relative min-h-screen flex items-center pt-16 md:pt-20">
    <div className="absolute inset-0 z-0">
      <img
        src={heroImage}
        alt="CJC-1295 & Ipamorelin Therapy at Healthi Life Bangkok"
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
            Anti-Aging & Longevity · Performance & Recovery · Physician-Led
          </Badge>
        </div>

        <h1 className="animate-fade-in-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-[1.15]">
          Growth hormone, restored.{" "}
          <span className="bg-gradient-medical bg-clip-text text-transparent">
            Sleep, recovery, and biological age — optimized.
          </span>
        </h1>

        <p className="animate-fade-in-up text-base md:text-lg text-muted-foreground mb-4 max-w-2xl">
          CJC-1295 and Ipamorelin are the two most prescribed growth hormone secretagogues in physician-led anti-aging medicine. Used together, they restore the growth hormone pulse your body produced naturally at 25 — without the risks of direct HGH administration.
        </p>

        {/* Stats row */}
        <div className="animate-fade-in-up grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { value: "2x", label: "GH pulse amplitude restored vs. baseline" },
            { value: "GH + IGF-1", label: "Two markers simultaneously elevated" },
            { value: "Weekly SC", label: "Once or twice weekly injection" },
            { value: "Rx", label: "Prescription-only · Physician oversight required" },
          ].map((s, i) => (
            <div key={i} className="bg-card/80 backdrop-blur border border-border rounded-lg p-3 text-center shadow-soft">
              <div className="text-lg md:text-xl font-bold text-primary">{s.value}</div>
              <div className="text-[10px] text-muted-foreground mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>


        <div className="animate-scale-in flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-cjc-hero-whatsapp')} asChild>
            <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Book a Consultation
            </a>
          </Button>
          <Button size="lg" variant="outline" onClick={() => trackButtonClick('ivclick-cjc-hero-learn')} asChild>
            <a href="#what-is-cjc">
              <ArrowDown className="h-5 w-5 mr-2" />
              Understand the protocol ↓
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

// ─── WHAT IS GH SECRETAGOGUE THERAPY ─────────────────────
const WhatIsCJC = () => (
  <section id="what-is-cjc" className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">The Science</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          What are CJC-1295 and Ipamorelin?
        </h2>

        <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
          <p>
            Growth hormone declines progressively after age 30 — approximately 15% per decade. By 50, most adults produce less than half the growth hormone they did at their peak. The downstream effects are measurable: increased visceral fat, reduced lean muscle mass, slower recovery, disrupted sleep architecture, accelerated skin aging, and declining cognitive sharpness.
          </p>
          <p>
            <strong className="text-foreground">CJC-1295 and Ipamorelin are growth hormone secretagogues</strong> — molecules that stimulate your pituitary gland to produce and release more of your own growth hormone. They do not replace GH. They restore the signal.
          </p>
          <p>
            What makes the combination clinically superior to either molecule alone: <strong className="text-foreground">CJC-1295 extends the duration of GH release</strong> (the pulse width), while <strong className="text-foreground">Ipamorelin amplifies the amplitude</strong> of each pulse and triggers release at the right time. Together, they recreate the youthful GH pulsatility pattern — the biological rhythm your body lost with age.
          </p>
          <p className="text-foreground font-medium">
            This is not a shortcut. It is a restoration.
          </p>
        </div>

        {/* The Two Molecules */}
        <h3 className="text-xl md:text-2xl font-bold text-foreground mt-12 mb-6">How It Works — The Two Molecules</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="group hover:shadow-medium transition-all duration-300 border-border">
            <div className="bg-primary/5 p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Syringe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">CJC-1295</h4>
                  <p className="text-xs text-muted-foreground">GHRH Analogue · Sustained GH Release</p>
                </div>
              </div>
            </div>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                CJC-1295 is a synthetic analogue of Growth Hormone Releasing Hormone (GHRH). It binds to GHRH receptors in the pituitary and signals the gland to prepare and release growth hormone. Its modified structure gives it a half-life of 6–8 days — far longer than native GHRH — allowing once or twice weekly dosing. It raises baseline IGF-1 levels, the primary downstream marker of GH activity, over a sustained period.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-medium transition-all duration-300 border-border">
            <div className="bg-primary/5 p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FlaskConical className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">IPAMORELIN</h4>
                  <p className="text-xs text-muted-foreground">Selective GHRP · Clean GH Pulse</p>
                </div>
              </div>
            </div>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ipamorelin is a selective Growth Hormone Releasing Peptide (GHRP). It mimics ghrelin and binds to specific receptors in the pituitary and hypothalamus, triggering a sharp, clean pulse of growth hormone release. It is the most selective GHRP available — it does not significantly stimulate cortisol or prolactin (a key advantage over older GHRPs like GHRP-2 or GHRP-6). It amplifies the GH pulse at the right moment without hormonal noise.
              </p>
            </CardContent>
          </Card>
        </div>

        <blockquote className="mt-6 border-l-4 border-primary pl-6 py-4 bg-secondary/30 rounded-r-lg">
          <p className="text-foreground font-medium italic text-sm md:text-base">
            <strong>Why the combination:</strong> CJC-1295 alone produces a sustained, moderate GH increase. Ipamorelin alone produces a sharp pulse but limited duration. Combined, they recreate both the amplitude and the rhythm of youthful GH secretion — synergy that neither achieves independently.
          </p>
        </blockquote>

        {/* Molecule specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { label: "CJC-1295 Class", value: "GHRH Analogue" },
            { label: "Ipamorelin Class", value: "Selective GHRP" },
            { label: "CJC-1295 Half-life", value: "~6–8 days" },
            { label: "Ipamorelin Half-life", value: "~2 hours (pulse)" },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4 text-center shadow-soft">
              <div className="text-sm md:text-base font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            { label: "Route", value: "Subcutaneous (SC)" },
            { label: "Frequency", value: "2–3x / week" },
            { label: "Optimal Timing", value: "Before sleep" },
            { label: "Cycle", value: "3–12 months" },
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

// ─── DUAL POSITIONING ────────────────────────────────────
const DualPositioning = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">Two Indications · One Biological Mechanism</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Anti-aging & longevity. Performance & recovery.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Two guest profiles. One underlying physiology. The protocol adapts — the mechanism does not.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* INDICATION 01 */}
          <Card className="border-border overflow-hidden hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary/60">INDICATION 01</span>
                  <h3 className="text-lg font-bold text-foreground">Anti-Aging & Longevity</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                For guests focused on reversing or slowing measurable markers of biological aging. Growth hormone is one of the most significant hormonal axes to decline with age. Restoring it — not to supraphysiological levels, but to the range of a healthy 30-year-old — produces systemic effects across skin, metabolism, cognition, and cardiovascular health.
              </p>
              <ul className="space-y-2">
                {[
                  "Reduction in visceral and subcutaneous fat — particularly abdominal",
                  "Lean muscle preservation and improved body composition",
                  "Skin thickness, collagen density, and elasticity improvement",
                  "IGF-1 restoration to age-optimized reference range",
                  "Improved lipid profile and cardiovascular risk markers",
                  "Biological age reduction as measured by composite biomarker panels",
                  "Compatible with NAD+, BPC-157, and hormonal longevity stacks",
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
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary/60">INDICATION 02</span>
                  <h3 className="text-lg font-bold text-foreground">Performance & Recovery</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                For guests who are physically active — athletes, executives with high physical demands, or anyone whose recovery has noticeably slowed. The GH axis governs tissue repair, sleep quality, and the anabolic environment that determines how fast the body rebuilds between efforts.
              </p>
              <ul className="space-y-2">
                {[
                  "Deep sleep enhancement — GH is primarily secreted during slow-wave sleep",
                  "Accelerated soft tissue repair — tendons, ligaments, muscle micro-tears",
                  "Faster recovery between training sessions or high-demand periods",
                  "Reduced joint discomfort associated with GH decline",
                  "Improved body composition — lean mass up, fat mass down",
                  "Mental clarity and sustained energy across demanding days",
                  "Synergistic with BPC-157 for musculoskeletal repair protocols",
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

        {/* CTA */}
        <div className="max-w-2xl mx-auto mt-14 text-center">
          <p className="text-muted-foreground mb-5 text-base">
            Not sure which indication applies to you? Let our physician assess your hormonal profile personally.
          </p>
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-cjc-mid-cta-1')} asChild>
            <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Talk to Your Medical Concierge
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

// ─── WHY NOT DIRECT HGH ─────────────────────────────────
const advantages = [
  {
    icon: Activity,
    number: "01",
    title: "Pulsatility Preserved",
    description: "Natural GH is released in pulses — primarily at night during deep sleep. Secretagogues restore this rhythm. Constant exogenous HGH eliminates it and creates receptor desensitization.",
  },
  {
    icon: Shield,
    number: "02",
    title: "Self-Regulating System",
    description: "The pituitary acts as a governor. It will not release more GH than the hypothalamus authorizes. This safety mechanism is eliminated with direct HGH administration.",
  },
  {
    icon: RefreshCw,
    number: "03",
    title: "No Negative Feedback Suppression",
    description: "Exogenous HGH tells the hypothalamus to stop producing GHRH — permanently suppressing endogenous GH production over time. Secretagogues have the opposite effect.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Superior Safety Profile for Long-Term Use",
    description: "The side effect profile of CJC-1295 + Ipamorelin at therapeutic doses is significantly more favorable than direct HGH — particularly for guests on 6–12 month longevity protocols.",
  },
];

const WhyNotHGH = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">The Clinical Case</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Why not just take HGH directly?
        </h2>

        <div className="text-muted-foreground space-y-4 mb-6 text-base leading-relaxed">
          <p>
            This is the first question most informed guests ask. The answer is both clinical and strategic.
          </p>
          <p>
            Direct recombinant HGH (synthetic human growth hormone) bypasses the pituitary entirely. It floods the system with exogenous GH — suppressing your body's natural production through negative feedback, elevating IGF-1 beyond physiological ranges, and carrying risks: fluid retention, carpal tunnel syndrome, potential insulin resistance, and — in susceptible individuals — accelerated proliferation of pre-existing abnormal cells.
          </p>
        </div>

        <blockquote className="border-l-4 border-primary/40 pl-6 py-3 mb-8 rounded-r-lg" style={{ backgroundColor: '#F5EDDC' }}>
          <p className="text-foreground font-medium italic">
            "Direct HGH tells your body to stop producing its own. Secretagogues tell your body to produce more of its own — in pulse, in rhythm, within the limits of your own pituitary's capacity."
          </p>
        </blockquote>

        <p className="text-muted-foreground mb-8 text-base leading-relaxed">
          CJC-1295 + Ipamorelin work within the body's natural feedback loops. The pituitary can only release so much — the system self-regulates. IGF-1 rises within a physiological range. Cortisol and prolactin remain unaffected (with Ipamorelin). Endogenous production is preserved and stimulated — not replaced and suppressed.
        </p>
        <p className="text-foreground font-medium mb-8">
          For long-term use — particularly in longevity protocols — this distinction is not a minor clinical preference. It is the difference between restoration and replacement.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {advantages.map((a, i) => (
            <Card key={i} className="border-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#F5EDDC' }}>
                    <a.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary/60">{a.number}</span>
                </div>
                <h4 className="font-bold text-foreground text-sm mb-1">{a.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{a.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── WHY DOCTOR ──────────────────────────────────────────
const risks = [
  {
    icon: Microscope,
    number: "01",
    title: "Baseline IGF-1 Assessment",
    description: "Before prescribing, IGF-1 must be measured. Some individuals already have elevated IGF-1 — prescribing secretagogues without this data is clinically irresponsible. The target range is optimization, not supraphysiological elevation.",
  },
  {
    icon: AlertTriangle,
    number: "02",
    title: "Contraindication Screening",
    description: "Active malignancy or history of hormone-sensitive cancers requires careful assessment. Diabetic retinopathy, active proliferative conditions, and certain pituitary disorders require workup before prescribing.",
  },
  {
    icon: Clock,
    number: "03",
    title: "Dosing and Timing Protocol",
    description: "The timing of Ipamorelin administration — particularly for deep sleep optimization — matters. Dose stacking, injection timing relative to meals, and cycle length all affect outcomes.",
  },
  {
    icon: Activity,
    number: "04",
    title: "Monitoring IGF-1 and Response Markers",
    description: "Mid-cycle IGF-1 reassessment confirms the protocol is working within target range. Body composition tracking (InBody) quantifies lean mass and fat mass changes. Without this data, the protocol is blind.",
  },
  {
    icon: Pill,
    number: "05",
    title: "Interaction with Other Protocols",
    description: "CJC-1295 + Ipamorelin interacts with existing hormonal environments — particularly if the guest is on testosterone, thyroid medication, insulin-sensitizing agents, or other peptide protocols.",
  },
];

const WhyDoctor = () => (
  <section className="py-16 md:py-24 bg-gradient-subtle">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Medical Oversight</Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Why physician supervision is non-negotiable.
        </h2>

        <div className="text-muted-foreground space-y-4 mb-6 text-base leading-relaxed">
          <p>
            Growth hormone secretagogue therapy is available online, on grey markets, and through unregulated channels. The compounds exist. What is absent is the clinical context that determines whether they help or harm.
          </p>
        </div>

        <blockquote className="border-l-4 border-primary/40 pl-6 py-3 mb-8 rounded-r-lg" style={{ backgroundColor: '#F5EDDC' }}>
          <p className="text-foreground font-medium italic">
            "Raising IGF-1 without knowing your baseline is not optimization. It is an uncontrolled experiment with a hormone axis that governs cellular growth."
          </p>
        </blockquote>

        <p className="text-muted-foreground mb-4 text-base leading-relaxed">
          The critical concern: IGF-1 — the primary downstream marker elevated by GH secretagogues — is a growth signal. In a healthy body, restoring it to youthful physiological levels is protective and beneficial. In a body with undetected malignancy or significant pre-existing conditions, unchecked elevation requires medical assessment. This is not a reason to avoid the therapy. It is a reason to begin with a physician.
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

        {/* CTA */}
        <div className="mt-12 p-6 md:p-8 rounded-2xl border border-primary/20 bg-primary/5 text-center">
          <p className="text-foreground font-semibold text-lg mb-2">
            Don't self-prescribe. Talk to a physician who understands the GH axis.
          </p>
          <p className="text-muted-foreground text-sm mb-5">
            One WhatsApp message. Direct access to our medical concierge.
          </p>
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-cjc-mid-cta-2')} asChild>
            <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer">
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
                {["MD — Licensed Physician", "Specialist: Dermatology", "Peptides & Regenerative Medicine", "Cosmetic & Anti-Aging Protocols", "Healthi Life — Ekkamai, Bangkok"].map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-5">
                <p className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">Prescription Authority</p>
                <p className="text-sm text-foreground">
                  All growth hormone secretagogue protocols at Healthi Life are written, titrated, and monitored by Dr. First personally.
                </p>
              </div>

              <blockquote className="border-l-4 border-primary pl-4 py-2 mb-5 bg-primary/5 rounded-r-lg">
                <p className="text-sm text-foreground italic font-medium">
                  "Every CJC-1295 + Ipamorelin protocol begins with your IGF-1. We optimize within your biology — not against it."
                </p>
              </blockquote>

              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  Dr. First oversees the full peptide and anti-aging vertical at Healthi Life. Growth hormone secretagogue therapy sits at the intersection of his two areas of deepest clinical focus: peptide pharmacology and systemic anti-aging. His background in dermatology — which is fundamentally a discipline of systemic biological aging made visible on the surface — gives him a precise lens for GH axis restoration: skin quality, collagen density, fat redistribution, and inflammatory markers are all downstream GH targets he tracks in parallel.
                </p>
                <p>
                  No CJC-1295 + Ipamorelin protocol at Healthi Life is prescribed without a baseline IGF-1, a contraindication screen, and a defined monitoring plan. The injection is the last step — not the first.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {["Peptide Therapy", "Biomarker-First", "IGF-1 Optimization", "Monitored Protocol"].map((tag, i) => (
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
    description: "Medical history, goals, indication assessment. Dr. First reviews your case personally. 45 min in-clinic or pre-consult via WhatsApp. Contraindication screening completed.",
  },
  {
    icon: Microscope,
    day: "Day 1–4",
    title: "Hormonal & Metabolic Workup",
    description: "IGF-1 baseline (mandatory), GH stimulation markers, fasting glucose, HbA1c, thyroid panel, lipid panel, body composition (InBody). Full hormonal context established.",
  },
  {
    icon: ClipboardCheck,
    day: "Day 4–7",
    title: "Protocol Written",
    description: "CJC-1295 and Ipamorelin doses defined. Injection timing set (pre-sleep standard). Cycle duration confirmed. PDF protocol delivered. WhatsApp support opened. Self-injection training if needed.",
  },
  {
    icon: CalendarCheck,
    day: "Week 6–8",
    title: "Mid-Cycle Review",
    description: "IGF-1 reassessment. Body composition recheck (InBody). Sleep quality and recovery self-report. Dose adjustment if IGF-1 outside target range. Side effect review.",
  },
  {
    icon: Activity,
    day: "Month 3–12",
    title: "Long-Term Protocol & Stack",
    description: "Continuation or cycling decision with Dr. First. GH protocol stacked with broader longevity program if indicated — NAD+, BPC-157, hormonal optimization. Annual IGF-1 review calendar set.",
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
          From first contact to measurable results — five structured steps with zero ambiguity.
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
          Your journey starts with a single conversation. No commitment — just clarity.
        </p>
        <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-cjc-mid-cta-3')} asChild>
          <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer">
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
          One consultation. Your growth hormone axis, properly assessed.
        </h2>
        <p className="text-lg text-muted-foreground mb-10">
          Whether your goal is reversing biological age or recovering faster — the first step is a physician who understands the GH axis completely.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {[
            { icon: Stethoscope, label: "Physician-Supervised", desc: "Dr. First reviews every case before any prescription is written. No exceptions." },
            { icon: Microscope, label: "IGF-1 Baseline Mandatory", desc: "No protocol is prescribed without knowing your starting hormonal position." },
            { icon: Shield, label: "Legal in Thailand", desc: "GH secretagogues are legal when prescribed by a licensed physician. Fully compliant." },
            { icon: ClipboardCheck, label: "Written Protocol + Monitoring", desc: "Every prescription documented. Mid-cycle IGF-1 recheck included." },
            { icon: RefreshCw, label: "Pulsatility-Preserving", desc: "We restore your GH rhythm — we do not replace it. Endogenous production stays intact." },
          ].map((g, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4 shadow-soft text-center">
              <g.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <h4 className="font-bold text-foreground text-sm">{g.label}</h4>
              <p className="text-xs text-muted-foreground mt-1">{g.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-cjc-cta-whatsapp')} asChild>
            <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Book via WhatsApp
            </a>
          </Button>
          <Button size="lg" variant="outline" onClick={() => trackButtonClick('ivclick-cjc-cta-email')} asChild>
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
    q: "Is CJC-1295 + Ipamorelin legal in Thailand?",
    a: "Yes. CJC-1295 and Ipamorelin are legal in Thailand when prescribed by a licensed physician. Neither molecule is classified as a controlled substance. At Healthi Life, all growth hormone secretagogue protocols are written exclusively by Dr. First (MD), ensuring full legal and medical compliance. We do not dispense these peptides without prior medical consultation, baseline IGF-1 assessment, and formal prescription.",
  },
  {
    q: "How is this different from taking HGH directly?",
    a: "Direct recombinant HGH bypasses your pituitary entirely, suppresses your natural GH production through negative feedback, and carries a significantly higher risk profile — particularly for long-term use. CJC-1295 + Ipamorelin stimulate your own pituitary to produce more GH — in pulse, in rhythm, within your body's natural feedback limits. IGF-1 rises within a physiological range. Endogenous production is preserved and enhanced, not replaced. For longevity use, this distinction is clinically significant.",
  },
  {
    q: "How quickly will I notice results?",
    a: "The timeline depends on your baseline IGF-1 and primary indication. Sleep quality improvements are often the earliest signal — reported within 2–4 weeks as deep sleep architecture improves. Body composition changes — visible lean mass increase and fat reduction — typically emerge at 6–10 weeks. IGF-1 elevation is measurable at the mid-cycle biomarker check (week 6–8). Full body composition results are assessed at the end of the first 3-month cycle.",
  },
  {
    q: "What are the side effects?",
    a: "CJC-1295 + Ipamorelin has a favorable side effect profile compared to direct HGH. The most commonly reported effects are: mild water retention in the first weeks (dose-dependent and transient), injection site redness (common to all SC peptides and typically brief), vivid dreams or deeper sleep (a sign the protocol is working — Ipamorelin stimulates GH release during sleep), and occasional mild fatigue in the first days of the protocol. Cortisol and prolactin are not significantly elevated by Ipamorelin — a key advantage over older GHRPs. Serious adverse events are rare at therapeutic doses and are screened for in the pre-prescription workup.",
  },
  {
    q: "Can I use this alongside other Healthi Life protocols?",
    a: "Yes — CJC-1295 + Ipamorelin is one of the most commonly stacked protocols in our longevity programs. It combines well with NAD+ IV therapy (cellular energy + GH axis = synergistic anti-aging), BPC-157 (GH secretagogues improve the anabolic environment for tissue repair), and hormonal optimization protocols. Stacking decisions are made by Dr. First based on your full biomarker profile — never by default or by request alone.",
  },
  {
    q: "How much does the protocol cost?",
    a: "Protocol pricing depends on cycle length, dosing frequency, and whether CJC-1295 + Ipamorelin is prescribed as a standalone intervention or as part of a broader longevity program. Consultation and protocol fees are disclosed at your first appointment. We do not publish price lists — every guest receives a personalized protocol based on their IGF-1 baseline and clinical goals, not a standard package. Contact us via WhatsApp or email to schedule your initial consultation.",
  },
];

const CJCFaq = () => (
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
const CJCFooter = () => (
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
        <strong>Medical Disclaimer:</strong> This page is for informational purposes only and does not constitute medical advice, diagnosis, or treatment recommendation. CJC-1295 and Ipamorelin protocols at Healthi Life are prescribed exclusively by licensed physicians following a formal medical consultation, baseline IGF-1 assessment, and contraindication screening. Individual results vary significantly. All statistics referenced are from published clinical research and do not represent guaranteed individual outcomes. Growth hormone secretagogue therapy carries risks that are reviewed in detail during your physician consultation. Healthi Life does not prescribe these protocols to individuals with identified contraindications. Consult a licensed physician before beginning any new therapeutic protocol.
      </p>
    </div>
  </section>
);

// ─── MAIN PAGE ───────────────────────────────────────────
const CJC1295Ipamorelin = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <PeptideSEO
      title="CJC-1295 + Ipamorelin Bangkok | Growth Hormone – Healthi Life"
      description="CJC-1295 & Ipamorelin growth hormone restoration in Bangkok. 2x GH pulse amplitude. Anti-aging, recovery, sleep optimization. Dr. First supervised. Book now."
      path="/CJC-1295-Ipamorelin"
      peptideName="CJC-1295 + Ipamorelin"
      procedureDescription="CJC-1295 and Ipamorelin growth hormone secretagogue therapy for GH restoration, anti-aging, body composition optimization, sleep improvement, and recovery."
      faqs={faqs}
    />
    <main className="flex-grow">
      <CJCHero />
      <WhatIsCJC />
      {/* CTA 1 — Post-Science */}
      <section className="py-10 md:py-14 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl font-semibold text-foreground mb-2">Ready to restore your growth hormone axis?</p>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">Speak with our medical concierge to understand if CJC-1295 + Ipamorelin is right for your goals.</p>
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-cjc-cta1-whatsapp')} asChild>
            <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Talk to Your Medical Concierge
            </a>
          </Button>
        </div>
      </section>
      <DualPositioning />
      <WhyNotHGH />
      {/* CTA 2 — Post-HGH Comparison */}
      <section className="py-10 md:py-14 border-y border-border bg-card/50">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl font-semibold text-foreground mb-2">Restoration, not replacement. The smarter path to GH optimization.</p>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">Dr. First designs your protocol based on your IGF-1 baseline. Start the conversation now.</p>
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-cjc-cta2-whatsapp')} asChild>
            <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Talk Now
            </a>
          </Button>
        </div>
      </section>
      <WhyDoctor />
      {/* CTA 3 — Post-Medical Oversight */}
      <section className="py-10 md:py-14 bg-primary/5">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl font-semibold text-foreground mb-2">Physician-led from day one. IGF-1 baseline mandatory.</p>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">Every protocol starts with a full hormonal workup with Dr. First.</p>
          <Button size="lg" className="group" onClick={() => trackButtonClick('ivclick-cjc-cta3-whatsapp')} asChild>
            <a href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Talk to Your Medical Concierge
            </a>
          </Button>
        </div>
      </section>
      <DrFirstSection />
      <ProtocolSection />
      <CTABlock />
      <CJCFaq />
      <CJCFooter />
      <Disclaimer />
    </main>
    <Footer />
    <Suspense fallback={null}>
      <WhatsAppWidget />
    </Suspense>
  </div>
);

export default CJC1295Ipamorelin;
