import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import LegacyFadeHero from "@/components/alhamra/LegacyFadeHero";
import ConstructionStory from "@/components/alhamra/ConstructionStory";
import PerspectiveSection from "@/components/alhamra/PerspectiveSection";

const Rising = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-20">
        {/* Legacy Fade Hero - Cinematic B&W to Color transition */}
        <LegacyFadeHero />
        
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
