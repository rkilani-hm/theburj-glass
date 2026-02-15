import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import ContactSection from "@/components/alhamra/ContactSection";

const LeasingContact = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default LeasingContact;
