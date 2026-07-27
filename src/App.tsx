import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToHash from "@/components/ScrollToHash";
import MobileCTABar from "@/components/MobileCTABar";
import { LanguageProvider } from "@/lib/i18n";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useEffect } from "react";
import { installWaInterceptor } from "@/lib/wa-interceptor";
import { installFilloutInterceptor } from "@/lib/fillout-interceptor";
import { captureAttribution } from "@/lib/attribution";
import { initCurrency } from "@/lib/currency";

// Lazy load pages for better Core Web Vitals
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const Install = lazy(() => import("./pages/Install"));
const PriceList = lazy(() => import("./pages/PriceList"));
const Clinic = lazy(() => import("./pages/Clinic"));
const Merci = lazy(() => import("./pages/Merci"));

const queryClient = new QueryClient();

// Loading fallback for lazy loaded components
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  useEffect(() => {
    captureAttribution();
    initCurrency();
    // Install the global click interceptors — WhatsApp (wa.me) and Fillout
    // booking links — so both the whatsapp_conversion and booking_confirmed
    // conversions attribute to the original ad click.
    const teardownWa = installWaInterceptor();
    const teardownFillout = installFilloutInterceptor();
    return () => {
      teardownWa();
      teardownFillout();
    };
  }, []);
  return (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToHash />
            <MobileCTABar />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/ivtherapybangkok" element={<Index />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/install" element={<Install />} />
                <Route path="/pricing" element={<PriceList />} />
                <Route path="/clinic" element={<Clinic />} />
                {/* Les anciennes URL peptides ne vivent plus ici. Elles sont
                    redirigees au niveau edge (vercel.json) vers
                    information-bangkok.com, le seul site qui porte les peptides.
                    Ne PAS re-ajouter de route peptide dans ce fichier : un
                    <Navigate> est un alias fantome, interdit par la regle SEO 4,
                    et l edge s execute de toute facon avant le routeur React. */}
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                {/* /merci — page d aboutissement du formulaire Fillout. Fillout doit
                    etre configure pour y rediriger apres soumission, sinon la route
                    existe sans jamais etre atteinte. Meme chemin que sur skin. */}
                <Route path="/merci" element={<Merci />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
