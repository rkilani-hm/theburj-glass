import Header from "@/components/alhamra/Header";
import ContactSection from "@/components/alhamra/ContactSection";
import Footer from "@/components/alhamra/Footer";

const Contact = () => {
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

export default Contact;
