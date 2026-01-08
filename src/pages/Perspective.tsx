import Header from "@/components/alhamra/Header";
import PerspectiveSection from "@/components/alhamra/PerspectiveSection";
import Footer from "@/components/alhamra/Footer";

const Perspective = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        <PerspectiveSection />
      </main>
      <Footer />
    </div>
  );
};

export default Perspective;
