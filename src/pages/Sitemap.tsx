import { Link } from "react-router-dom";
import { ExternalLink, ChevronRight, MapPin, Phone, Clock, Activity, Brain, Sparkles, Heart, Zap, Flame } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

// All IV services data for SEO sitemap
const ivServices = {
  popular: [
    { slug: "fat-burner-iv", name: "Fat Burner IV Therapy", price: "4,500 THB", description: "Accelerate metabolism with L-Carnitine & B-vitamins for weight loss", icon: Flame },
    { slug: "nad-plus-100mg", name: "NAD+ IV Therapy 100mg", price: "6,000 THB", description: "Boost energy, repair cells, slow aging with NAD+ infusion", icon: Zap },
    { slug: "nad-plus-250mg", name: "NAD+ IV Therapy 250mg", price: "8,500 THB", description: "Premium dose NAD+ for maximum cellular regeneration", icon: Zap },
    { slug: "glow-revive", name: "Glow Revive IV Therapy", price: "12,000 THB", description: "Skin rejuvenation with placenta extract & antioxidants", icon: Sparkles },
    { slug: "resveratrol-iv", name: "Resveratrol IV Therapy", price: "8,500 THB", description: "Powerful antioxidant for heart health and longevity", icon: Heart },
    { slug: "full-body-detox", name: "Full Body Detox IV", price: "8,500 THB", description: "Complete detoxification and liver support", icon: Activity },
    { slug: "liver-detox", name: "Liver Detox IV Therapy", price: "6,500 THB", description: "Targeted liver cleansing and regeneration", icon: Heart },
    { slug: "curcumin-iv", name: "Curcumin IV Therapy", price: "8,500 THB", description: "Anti-inflammatory powerhouse for joint and gut health", icon: Sparkles },
  ],
  bodyBooster: [
    { slug: "vital-boost-iv", name: "Vital Boost IV", price: "4,500 THB", description: "Essential vitamins for daily energy and immune support" },
    { slug: "athlete-max-iv", name: "Athlete Max IV", price: "5,500 THB", description: "Performance recovery for athletes and fitness enthusiasts" },
    { slug: "party-shield-iv", name: "Party Shield IV", price: "3,500 THB", description: "Pre-party protection and hangover prevention" },
    { slug: "hangover-iv", name: "Hangover Recovery IV", price: "4,500 THB", description: "Rapid hangover relief with hydration and vitamins" },
  ],
  brainBooster: [
    { slug: "time-zone-iv", name: "Time Zone IV", price: "4,500 THB", description: "Combat jet lag and reset your circadian rhythm" },
    { slug: "stress-ease-iv", name: "Stress Ease IV", price: "4,500 THB", description: "Calm anxiety and restore mental balance" },
    { slug: "neuro-boost-iv", name: "Neuro Boost IV", price: "5,500 THB", description: "Enhance focus, memory, and cognitive performance" },
    { slug: "dream-ease-iv", name: "Dream Ease IV", price: "4,500 THB", description: "Improve sleep quality and relaxation" },
  ],
  skinBooster: [
    { slug: "glow-vita-iv", name: "Glow Vita IV", price: "5,500 THB", description: "Vitamin C and glutathione for radiant skin" },
    { slug: "glow-restore-iv", name: "Glow Restore IV", price: "8,500 THB", description: "Deep skin repair with collagen boosters" },
  ],
};

const sitePages = [
  { name: "Home", path: "/", description: "Premium IV Therapy clinic in Bangkok" },
  { name: "Services", path: "/#services", description: "21+ specialized IV drip treatments" },
  { name: "Why Choose Us", path: "/#why-us", description: "Award-winning clinic with certified doctors" },
  { name: "Our Process", path: "/#process", description: "Simple 4-step treatment process" },
  { name: "Testimonials", path: "/#testimonials", description: "250+ 5-star patient reviews" },
  { name: "FAQ", path: "/#faq", description: "Frequently asked questions about IV therapy" },
  { name: "Contact", path: "/#contact", description: "Book appointment via WhatsApp" },
];

const SitemapPage = () => {
  const baseUrl = "https://ivtherapyhealthilife.com";

  return (
    <>
      <Helmet>
        <title>Sitemap | IV Therapy Bangkok – All Services | Healthi-Life</title>
        <meta name="description" content="Complete sitemap of Healthi-Life IV Therapy Bangkok. Browse all 21+ IV drip services including NAD+, Fat Burner, Glow, Hangover IV and more." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${baseUrl}/sitemap`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Sitemap – All IV Therapy Services
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Browse our complete list of IV drip treatments available at Healthi-Life Bangkok. 
                21+ specialized formulas for energy, anti-aging, weight loss, skin glow, and recovery.
              </p>
            </div>

            {/* Main Site Pages */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                Main Pages
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sitePages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="group p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {page.name}
                      </h3>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{page.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Popular IV Drips */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                Popular IV Drips
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {ivServices.popular.map((service) => (
                  <article
                    key={service.slug}
                    className="group p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all duration-300"
                    itemScope
                    itemType="https://schema.org/MedicalProcedure"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-medical flex items-center justify-center">
                        <service.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-foreground" itemProp="name">
                            {service.name}
                          </h3>
                          <span className="text-primary font-bold text-sm">{service.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1" itemProp="description">
                          {service.description}
                        </p>
                        <meta itemProp="procedureType" content="https://schema.org/NoninvasiveProcedure" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Body Booster */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                Body Booster IV Drips
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {ivServices.bodyBooster.map((service) => (
                  <article
                    key={service.slug}
                    className="p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all duration-300"
                    itemScope
                    itemType="https://schema.org/MedicalProcedure"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-foreground" itemProp="name">
                        {service.name}
                      </h3>
                      <span className="text-primary font-bold text-sm">{service.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1" itemProp="description">
                      {service.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* Brain Booster */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                Brain Booster IV Drips
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {ivServices.brainBooster.map((service) => (
                  <article
                    key={service.slug}
                    className="p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all duration-300"
                    itemScope
                    itemType="https://schema.org/MedicalProcedure"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-foreground" itemProp="name">
                        {service.name}
                      </h3>
                      <span className="text-primary font-bold text-sm">{service.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1" itemProp="description">
                      {service.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* Skin Booster */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Skin Booster IV Drips
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {ivServices.skinBooster.map((service) => (
                  <article
                    key={service.slug}
                    className="p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all duration-300"
                    itemScope
                    itemType="https://schema.org/MedicalProcedure"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-foreground" itemProp="name">
                        {service.name}
                      </h3>
                      <span className="text-primary font-bold text-sm">{service.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1" itemProp="description">
                      {service.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* Contact Info */}
            <section className="bg-gradient-subtle rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Address</h3>
                    <p className="text-sm text-muted-foreground">
                      94 Ekkamai 10 Alley, Watthana<br />
                      Bangkok 10110, Thailand
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">WhatsApp</h3>
                    <a 
                      href="https://wa.me/66919991744?text=IV%20Therapy%20Enquiry" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      +66 91 999 1744
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Opening Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Mon–Sat: 11:00 – 19:00<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              {/* External Links */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-3">External Resources</h3>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://maps.app.goo.gl/Uttmbd2da2kBfkZSA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Google Maps
                  </a>
                  <a 
                    href="https://healthi-life.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Healthi-Life Main Site
                  </a>
                </div>
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default SitemapPage;
