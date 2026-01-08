import Header from "@/components/alhamra/Header";
import PresenceSection from "@/components/alhamra/PresenceSection";
import Footer from "@/components/alhamra/Footer";

const Tower = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        <PresenceSection />
      </main>
      <Footer />
    </div>
  );
};

export default Tower;
