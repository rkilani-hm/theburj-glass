import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import PageLayout from "./layouts/PageLayout";
import Home from "./pages/Home";
import Tower from "./pages/Tower";
import Perspective from "./pages/Perspective";
import Business from "./pages/Business";
import Services from "./pages/Services";
import Legacy from "./pages/Legacy";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import Leasing from "./pages/Leasing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tower" element={<Tower />} />
              <Route path="/perspective" element={<Perspective />} />
              <Route path="/business" element={<Business />} />
              <Route path="/services" element={<Services />} />
              <Route path="/legacy" element={<Legacy />} />
              <Route path="/location" element={<Location />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/leasing" element={<Leasing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageLayout>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
