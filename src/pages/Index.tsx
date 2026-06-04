import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBanner from "@/components/TrustBanner";
import SEO from "@/components/SEO";

// Lazy load below-fold sections for faster initial paint
const Services = lazy(() => import("@/components/Services"));
const MembershipSection = lazy(() => import("@/components/MembershipSection"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const MedicalTeam = lazy(() => import("@/components/MedicalTeam"));
const Process = lazy(() => import("@/components/Process"));
const VideoTestimonials = lazy(() => import("@/components/VideoTestimonials"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const WhatsAppWidget = lazy(() => import("@/components/WhatsAppWidget"));

// Minimal fallback for lazy sections
const SectionLoader = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO />
      <Header />
      <main className="flex-grow">
        <Hero />
        <TrustBanner />
        <Suspense fallback={<SectionLoader />}>
          <Services>
            <MembershipSection />
          </Services>
          <WhyChooseUs />
          <MedicalTeam />
          <Process />
          <VideoTestimonials />
          <Testimonials />
          <FAQ />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <WhatsAppWidget />
      </Suspense>
    </div>
  );
};

export default Index;
