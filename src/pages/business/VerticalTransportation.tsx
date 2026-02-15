import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import SkyLobbiesSection from "@/components/alhamra/SkyLobbiesSection";

const VerticalTransportation = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        <SkyLobbiesSection />
      </main>
      <Footer />
    </div>
  );
};

export default VerticalTransportation;
