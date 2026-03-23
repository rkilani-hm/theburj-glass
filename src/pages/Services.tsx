import Header from "@/components/alhamra/Header";
import ServicesSection from "@/components/alhamra/ServicesSection";
import Footer from "@/components/alhamra/Footer";

const Services = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", overflowX: "hidden" }}>
      <Header />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
