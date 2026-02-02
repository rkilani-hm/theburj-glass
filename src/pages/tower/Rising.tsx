import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import LegacyFadeHero from "@/components/alhamra/LegacyFadeHero";

const Rising = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-20">
        {/* Legacy Fade Hero - Cinematic B&W to Color transition */}
        <LegacyFadeHero />
      </main>
      <Footer />
    </div>
  );
};

export default Rising;
