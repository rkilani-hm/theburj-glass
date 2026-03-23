import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import LegacySection from "@/components/alhamra/LegacySection";
import ConstructionStory from "@/components/alhamra/ConstructionStory";
import PerspectiveSection from "@/components/alhamra/PerspectiveSection";

import { useHeroTheme } from "@/contexts/HeroThemeContext";
const Rising = () => {

  useHeroTheme("light");
  return (
    <div style={{ minHeight: "100vh", background: "#fff", overflowX: "hidden" }}>
      <Header />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        {/* Legacy Section - Heritage & Origins */}
        <LegacySection />
        
        {/* Construction Journey - Animated Build Story */}
        <ConstructionStory />
        
        {/* Perspective Section - Views & Visual Studies */}
        <PerspectiveSection />
      </main>
      <Footer />
    </div>
  );
};

export default Rising;
