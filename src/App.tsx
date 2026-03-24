import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./contexts/LanguageContext";
import { HeroThemeProvider } from "./contexts/HeroThemeContext";
import { CMSProvider } from "./contexts/CMSContext";
import AdminToolbar from "./components/admin/AdminToolbar";
import PageLayout from "./layouts/PageLayout";
import PageTransition from "./components/alhamra/PageTransition";
import ScrollToTop from "./components/alhamra/ScrollToTop";
import FloatingContact from "./components/alhamra/FloatingContact";

const Home                   = lazy(() => import("./pages/Home"));
const Tower                  = lazy(() => import("./pages/Tower"));
const Origins                = lazy(() => import("./pages/tower/Origins"));
const Rising                 = lazy(() => import("./pages/tower/Rising"));
const DesignEngineering      = lazy(() => import("./pages/tower/DesignEngineering"));
const Sustainability         = lazy(() => import("./pages/tower/Sustainability"));
const Recognition            = lazy(() => import("./pages/tower/Recognition"));
const Dashboard              = lazy(() => import("./pages/tower/Dashboard"));
const Business               = lazy(() => import("./pages/Business"));
const WorkplaceExperience    = lazy(() => import("./pages/business/WorkplaceExperience"));
const OfficeSpaces           = lazy(() => import("./pages/business/OfficeSpaces"));
const VerticalTransportation = lazy(() => import("./pages/business/VerticalTransportation"));
const Connectivity           = lazy(() => import("./pages/business/Connectivity"));
const Services               = lazy(() => import("./pages/Services"));
const Location               = lazy(() => import("./pages/Location"));
const LeasingOpportunities   = lazy(() => import("./pages/leasing/Opportunities"));
const LeasingInquiry         = lazy(() => import("./pages/leasing/Inquiry"));
const LeasingDownloads       = lazy(() => import("./pages/leasing/Downloads"));
const LeasingContactPage     = lazy(() => import("./pages/leasing/Contact"));
const Presentation           = lazy(() => import("./pages/Presentation"));
const NotFound               = lazy(() => import("./pages/NotFound"));
const AdminLogin             = lazy(() => import("./pages/admin/Login"));

const PageLoading = () => <div style={{ minHeight: "100svh", background: "#fff" }} />;

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"          element={<PageTransition><Home /></PageTransition>} />
        <Route path="/tower"     element={<PageTransition><Tower /></PageTransition>} />
        <Route path="/tower/origins"        element={<PageTransition><Origins /></PageTransition>} />
        <Route path="/tower/rising"         element={<PageTransition><Rising /></PageTransition>} />
        <Route path="/tower/design"         element={<PageTransition><DesignEngineering /></PageTransition>} />
        <Route path="/tower/architecture"   element={<Navigate to="/tower/design" replace />} />
        <Route path="/tower/engineering"    element={<Navigate to="/tower/design" replace />} />
        <Route path="/tower/sustainability" element={<PageTransition><Sustainability /></PageTransition>} />
        <Route path="/tower/recognition"    element={<PageTransition><Recognition /></PageTransition>} />
        <Route path="/tower/dashboard"      element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/perspective"          element={<Navigate to="/tower/rising" replace />} />
        <Route path="/legacy"               element={<Navigate to="/tower/rising" replace />} />
        <Route path="/business"             element={<Navigate to="/business/workplace-experience" replace />} />
        <Route path="/business/workplace-experience"    element={<PageTransition><WorkplaceExperience /></PageTransition>} />
        <Route path="/business/office-spaces"           element={<PageTransition><OfficeSpaces /></PageTransition>} />
        <Route path="/business/vertical-transportation" element={<PageTransition><VerticalTransportation /></PageTransition>} />
        <Route path="/business/connectivity"            element={<PageTransition><Connectivity /></PageTransition>} />
        <Route path="/services"             element={<PageTransition><Services /></PageTransition>} />
        <Route path="/location"             element={<PageTransition><Location /></PageTransition>} />
        <Route path="/leasing"              element={<Navigate to="/leasing/opportunities" replace />} />
        <Route path="/leasing/opportunities" element={<PageTransition><LeasingOpportunities /></PageTransition>} />
        <Route path="/leasing/inquiry"      element={<PageTransition><LeasingInquiry /></PageTransition>} />
        <Route path="/leasing/downloads"    element={<PageTransition><LeasingDownloads /></PageTransition>} />
        <Route path="/leasing/contact"      element={<PageTransition><LeasingContactPage /></PageTransition>} />
        <Route path="/contact"              element={<Navigate to="/leasing/contact" replace />} />
        <Route path="/presentation"         element={<Presentation />} />
        <Route path="/admin"                element={<AdminLogin />} />
        <Route path="*"                     element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CMSProvider>
      <LanguageProvider>
        <HeroThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <PageLayout>
                <Suspense fallback={<PageLoading />}>
                  <AnimatedRoutes />
                </Suspense>
              </PageLayout>
              <FloatingContact />
              {/* Global admin toolbar — renders only when isAdmin=true */}
              <AdminToolbar />
            </BrowserRouter>
          </TooltipProvider>
        </HeroThemeProvider>
      </LanguageProvider>
    </CMSProvider>
  </QueryClientProvider>
);

export default App;
