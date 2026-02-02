import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import LegacySection from "@/components/alhamra/LegacySection";
import ConstructionStory from "@/components/alhamra/ConstructionStory";
import PerspectiveSection from "@/components/alhamra/PerspectiveSection";

const Rising = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-20">
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
