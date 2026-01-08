import Header from "@/components/alhamra/Header";
import HeroSection from "@/components/alhamra/HeroSection";
import Footer from "@/components/alhamra/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
