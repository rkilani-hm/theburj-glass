import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/alhamra/Header";
import HeroSection from "@/components/alhamra/HeroSection";
import PresenceSection from "@/components/alhamra/PresenceSection";
import PerspectiveSection from "@/components/alhamra/PerspectiveSection";
import BusinessSection from "@/components/alhamra/BusinessSection";
import ServicesSection from "@/components/alhamra/ServicesSection";
import ContinuitySection from "@/components/alhamra/ContinuitySection";
import LocationSection from "@/components/alhamra/LocationSection";
import ContactSection from "@/components/alhamra/ContactSection";
import Footer from "@/components/alhamra/Footer";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Header />
        <main>
          <HeroSection />
          <PresenceSection />
          <PerspectiveSection />
          <BusinessSection />
          <ServicesSection />
          <ContinuitySection />
          <LocationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
