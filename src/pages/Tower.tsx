import Header from "@/components/alhamra/Header";
import TowerHeroSection from "@/components/alhamra/TowerHeroSection";
import IntegratedEcosystemSection from "@/components/alhamra/IntegratedEcosystemSection";
import SmartInfrastructureSection from "@/components/alhamra/SmartInfrastructureSection";
import ServiceExcellenceSection from "@/components/alhamra/ServiceExcellenceSection";
import TrustSignalsSection from "@/components/alhamra/TrustSignalsSection";
import PresenceSection from "@/components/alhamra/PresenceSection";
import AwardsSection from "@/components/alhamra/AwardsSection";
import Footer from "@/components/alhamra/Footer";

const Tower = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Core Identity Hero */}
        <TowerHeroSection />
        
        {/* Integrated Ecosystem - Three Pillars */}
        <IntegratedEcosystemSection />
        
        {/* Smart Infrastructure */}
        <SmartInfrastructureSection />
        
        {/* Service Excellence */}
        <ServiceExcellenceSection />
        
        {/* Trust Signals - ISO Certifications */}
        <TrustSignalsSection />
        
        {/* Detailed Tower Content */}
        <PresenceSection />
        
        {/* Awards & Recognition */}
        <AwardsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Tower;
