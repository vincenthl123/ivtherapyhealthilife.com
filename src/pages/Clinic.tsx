import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Phone, MessageCircle, Mail, Star } from "lucide-react";
import logo from "@/assets/healthilife-logo.png";
import clinicExterior from "@/assets/clinic-exterior.webp";
import clinicInterior from "@/assets/clinic-interior.jpg";
import treatmentRoom from "@/assets/treatment-room.webp";
import { trackButtonClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/66919991744?text=HealthiLife%20Clinic%20Enquiry";
const PHONE = "+66 91 999 1744";
const ADDRESS = "94 Ekkamai 10 Alley, Khlong Tan Nuea, Watthana, Bangkok 10110";
const MAPS_URL = "https://maps.google.com/?q=Healthi-Life+Ekkamai+Bangkok";

const Clinic = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>HealthiLife Clinic Bangkok – Ekkamai Wellness Center</title>
        <meta
          name="description"
          content="HealthiLife Clinic in Bangkok (Ekkamai). Visit our wellness center for consultations and IV wellness services. Open Mon–Sat, 11 AM – 7 PM."
        />
        <link rel="canonical" href="https://ivtherapyhealthilife.com/clinic" />
        <meta name="robots" content="index, follow" />
        {/* No aggressive claims; brand-only landing for paid search */}
      </Helmet>

      {/* Simple Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/clinic" className="flex items-center" aria-label="HealthiLife">
            <img src={logo} alt="HealthiLife Clinic Bangkok" className="h-8 md:h-10 w-auto" />
          </a>
          <div className="flex items-center gap-2">
            <Button
              id="ivclick-clinic-header-call"
              variant="outline"
              size="sm"
              onClick={() => trackButtonClick("ivclick-clinic-header-call")}
              asChild
            >
              <a href="tel:+66919991744" aria-label="Call HealthiLife">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </a>
            </Button>
            <Button
              id="ivclick-clinic-header-whatsapp"
              size="sm"
              onClick={() => trackButtonClick("ivclick-clinic-header-whatsapp")}
              asChild
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={clinicExterior}
            alt="HealthiLife Clinic exterior at Ekkamai, Bangkok"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/40" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
              Welcome to HealthiLife
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              HealthiLife Clinic Bangkok
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              A wellness center in the heart of Ekkamai. Speak with our team to learn
              more about our services and book a consultation.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                id="ivclick-clinic-hero-whatsapp"
                size="lg"
                onClick={() => trackButtonClick("ivclick-clinic-hero-whatsapp")}
                asChild
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Message us on WhatsApp
                </a>
              </Button>
              <Button
                id="ivclick-clinic-hero-call"
                size="lg"
                variant="outline"
                onClick={() => trackButtonClick("ivclick-clinic-hero-call")}
                asChild
              >
                <a href="tel:+66919991744">
                  <Phone className="h-5 w-5 mr-2" />
                  {PHONE}
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Ekkamai, Bangkok</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Mon–Sat: 11 AM – 7 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>5.0 Google Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About HealthiLife</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                HealthiLife is a wellness center based in Ekkamai, Bangkok. Our team
                provides personalized consultations in a calm, modern environment
                designed for comfort and privacy.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We invite you to visit us, meet our team, and discuss how we can support
                your wellness goals.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-soft">
              <img
                src={clinicInterior}
                alt="HealthiLife Clinic interior reception, Bangkok"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services overview – conservative wording */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
            <p className="text-muted-foreground">
              Speak with our team to learn more about each service and whether it may
              be suitable for you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Wellness Consultations",
                desc: "One-on-one conversations with our team to understand your goals.",
              },
              {
                title: "IV Wellness Services",
                desc: "A range of intravenous wellness drips administered by trained staff.",
              },
              {
                title: "Lifestyle & Recovery",
                desc: "Personalized guidance focused on hydration, recovery, and daily wellness.",
              },
            ].map((s) => (
              <Card key={s.title} className="p-6 bg-background border-border">
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-soft order-2 md:order-1">
              <img
                src={treatmentRoom}
                alt="HealthiLife Clinic treatment room, Ekkamai Bangkok"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Visit Our Clinic</h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground text-sm">{ADDRESS}</p>
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm hover:underline inline-block mt-1"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Opening Hours</p>
                    <p className="text-muted-foreground text-sm">Monday – Saturday: 11 AM – 7 PM</p>
                    <p className="text-muted-foreground text-sm">Sunday: Closed</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a
                      href="tel:+66919991744"
                      className="text-muted-foreground text-sm hover:text-primary"
                    >
                      {PHONE}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground text-sm hover:text-primary"
                    >
                      Message us on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <Button
                id="ivclick-clinic-visit-whatsapp"
                size="lg"
                onClick={() => trackButtonClick("ivclick-clinic-visit-whatsapp")}
                asChild
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Get in Touch
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-border py-8 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            © {new Date().getFullYear()} HealthiLife Clinic Bangkok. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Service provided by Healthi-Life Group.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Clinic;
