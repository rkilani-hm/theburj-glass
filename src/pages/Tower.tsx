import Header from "@/components/alhamra/Header";
import TowerDigitalTwinHero from "@/components/alhamra/TowerDigitalTwinHero";
import SystemPulseSidebar from "@/components/alhamra/SystemPulseSidebar";
import ServiceHubDrawers from "@/components/alhamra/ServiceHubDrawers";
import TrustBadgesFooter from "@/components/alhamra/TrustBadgesFooter";
import AwardsSection from "@/components/alhamra/AwardsSection";
import Footer from "@/components/alhamra/Footer";

const Tower = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      {/* Fixed System Pulse Sidebar */}
      <SystemPulseSidebar />
      
      <main className="pt-24 pb-24">
        {/* Digital Twin Hero with Interactive Hotspots */}
        <TowerDigitalTwinHero />
        
        {/* Interactive Service Hub Drawers */}
        <ServiceHubDrawers />
        
        {/* Awards & Recognition */}
        <AwardsSection />
      </main>
      
      {/* Trust Badges Footer - Fixed at bottom */}
      <TrustBadgesFooter />
      
      {/* Main Footer with padding for trust badges */}
      <div className="pb-20">
        <Footer />
      </div>
    </div>
  );
};

export default Tower;
