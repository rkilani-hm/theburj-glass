import Header from "@/components/alhamra/Header";
import ContinuitySection from "@/components/alhamra/ContinuitySection";
import Footer from "@/components/alhamra/Footer";

const Legacy = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        <ContinuitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Legacy;
