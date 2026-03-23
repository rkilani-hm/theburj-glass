import Header from "@/components/alhamra/Header";
import LocationSection from "@/components/alhamra/LocationSection";
import Footer from "@/components/alhamra/Footer";

const Location = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", overflowX: "hidden" }}>
      <Header />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Location;
