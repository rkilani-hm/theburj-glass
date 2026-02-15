import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./contexts/LanguageContext";
import PageLayout from "./layouts/PageLayout";
import PageTransition from "./components/alhamra/PageTransition";
import ScrollToTop from "./components/alhamra/ScrollToTop";
import FloatingContact from "./components/alhamra/FloatingContact";
import Home from "./pages/Home";
import Tower from "./pages/Tower";
import Origins from "./pages/tower/Origins";
import Rising from "./pages/tower/Rising";
import DesignEngineering from "./pages/tower/DesignEngineering";
import Sustainability from "./pages/tower/Sustainability";
import Recognition from "./pages/tower/Recognition";
import Dashboard from "./pages/tower/Dashboard";
import Business from "./pages/Business";
import WorkplaceExperience from "./pages/business/WorkplaceExperience";
import OfficeSpaces from "./pages/business/OfficeSpaces";
import VerticalTransportation from "./pages/business/VerticalTransportation";
import Connectivity from "./pages/business/Connectivity";
import Services from "./pages/Services";
import Location from "./pages/Location";
import LeasingContact from "./pages/LeasingContact";
import Presentation from "./pages/Presentation";
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
        <Route path="/tower/rising" element={<PageTransition><Rising /></PageTransition>} />
        <Route path="/tower/design" element={<PageTransition><DesignEngineering /></PageTransition>} />
        <Route path="/tower/architecture" element={<Navigate to="/tower/design" replace />} />
        <Route path="/tower/engineering" element={<Navigate to="/tower/design" replace />} />
        <Route path="/tower/sustainability" element={<PageTransition><Sustainability /></PageTransition>} />
        <Route path="/tower/recognition" element={<PageTransition><Recognition /></PageTransition>} />
        <Route path="/tower/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/perspective" element={<Navigate to="/tower/rising" replace />} />
        <Route path="/legacy" element={<Navigate to="/tower/rising" replace />} />
        <Route path="/business" element={<Navigate to="/business/workplace-experience" replace />} />
        <Route path="/business/workplace-experience" element={<PageTransition><WorkplaceExperience /></PageTransition>} />
        <Route path="/business/office-spaces" element={<PageTransition><OfficeSpaces /></PageTransition>} />
        <Route path="/business/vertical-transportation" element={<PageTransition><VerticalTransportation /></PageTransition>} />
        <Route path="/business/connectivity" element={<PageTransition><Connectivity /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/location" element={<PageTransition><Location /></PageTransition>} />
        <Route path="/leasing" element={<PageTransition><LeasingContact /></PageTransition>} />
        <Route path="/contact" element={<Navigate to="/leasing" replace />} />
        <Route path="/presentation" element={<Presentation />} />
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
