import Header from "@/components/alhamra/Header";
import BusinessSection from "@/components/alhamra/BusinessSection";
import Footer from "@/components/alhamra/Footer";

const Business = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        <BusinessSection />
      </main>
      <Footer />
    </div>
  );
};

export default Business;
