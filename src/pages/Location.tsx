import Header from "@/components/alhamra/Header";
import LocationSection from "@/components/alhamra/LocationSection";
import Footer from "@/components/alhamra/Footer";

const Location = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Location;
