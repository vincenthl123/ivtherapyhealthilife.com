import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/lib/i18n";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useEffect } from "react";
import { installWaInterceptor } from "@/lib/wa-interceptor";

// Lazy load pages for better Core Web Vitals
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const Install = lazy(() => import("./pages/Install"));
const PriceList = lazy(() => import("./pages/PriceList"));
const Clinic = lazy(() => import("./pages/Clinic"));

const queryClient = new QueryClient();

// Loading fallback for lazy loaded components
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/ivtherapybangkok" element={<Index />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/install" element={<Install />} />
                <Route path="/price-list" element={<PriceList />} />
                <Route path="/clinic" element={<Clinic />} />
                {/* Legacy peptide routes — 301 redirect to home */}
                <Route path="/science/peptides-introduction" element={<Navigate to="/" replace />} />
                <Route path="/science/peptides-introduction/" element={<Navigate to="/" replace />} />
                <Route path="/peptides-therapy" element={<Navigate to="/" replace />} />
                <Route path="/therapy-bangkok" element={<Navigate to="/" replace />} />
                <Route path="/peptide/bangkok" element={<Navigate to="/" replace />} />
                <Route path="/BPC-157" element={<Navigate to="/" replace />} />
                <Route path="/GLP-1" element={<Navigate to="/" replace />} />
                <Route path="/CJC-1295-Ipamorelin" element={<Navigate to="/" replace />} />
                <Route path="/Semaglutide" element={<Navigate to="/" replace />} />
                <Route path="/Retatrutide" element={<Navigate to="/" replace />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
