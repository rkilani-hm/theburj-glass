import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./contexts/LanguageContext";
import PageLayout from "./layouts/PageLayout";
import PageTransition from "./components/alhamra/PageTransition";
import ScrollToTop from "./components/alhamra/ScrollToTop";
import FloatingContact from "./components/alhamra/FloatingContact";
import Home from "./pages/Home";
import Tower from "./pages/Tower";
import Origins from "./pages/tower/Origins";
import Making from "./pages/tower/Making";
import Architecture from "./pages/tower/Architecture";
import Engineering from "./pages/tower/Engineering";
import Recognition from "./pages/tower/Recognition";
import Perspective from "./pages/Perspective";
import Business from "./pages/Business";
import Services from "./pages/Services";
import Legacy from "./pages/Legacy";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import Leasing from "./pages/Leasing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/tower" element={<PageTransition><Tower /></PageTransition>} />
        <Route path="/tower/origins" element={<PageTransition><Origins /></PageTransition>} />
        <Route path="/tower/making" element={<PageTransition><Making /></PageTransition>} />
        <Route path="/tower/architecture" element={<PageTransition><Architecture /></PageTransition>} />
        <Route path="/tower/engineering" element={<PageTransition><Engineering /></PageTransition>} />
        <Route path="/tower/recognition" element={<PageTransition><Recognition /></PageTransition>} />
        <Route path="/perspective" element={<PageTransition><Perspective /></PageTransition>} />
        <Route path="/business" element={<PageTransition><Business /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/legacy" element={<PageTransition><Legacy /></PageTransition>} />
        <Route path="/location" element={<PageTransition><Location /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/leasing" element={<PageTransition><Leasing /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PageLayout>
            <AnimatedRoutes />
          </PageLayout>
          <FloatingContact />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
