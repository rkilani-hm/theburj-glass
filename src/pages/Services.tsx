import Header from "@/components/alhamra/Header";
import ServicesSection from "@/components/alhamra/ServicesSection";
import Footer from "@/components/alhamra/Footer";

const Services = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
