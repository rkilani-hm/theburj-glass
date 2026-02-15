import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";

const Inquiry = () => {
  const { t } = useLanguage();
  const { ref: formRef, isInView: formInView } = useScrollReveal();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        <section className="bg-background">
          <div className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-border" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">02</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-8">
                {t("contact.title") || "Get in Touch"}
              </h1>
              <p className="text-body-lg text-muted-foreground max-w-2xl">
                {t("contact.intro")}
              </p>
            </motion.div>

            <motion.form
              ref={formRef}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl space-y-10"
            >
              <div className="grid md:grid-cols-2 gap-10">
                <div className="group">
                  <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300"
                    placeholder={t("contact.name.placeholder") || "Your name"}
                  />
                </div>
                <div className="group">
                  <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                    {t("contact.email")}
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300"
                    placeholder={t("contact.email.placeholder") || "your@email.com"}
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                  {t("contact.subject")}
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300"
                  placeholder={t("contact.subject.placeholder") || "Subject of inquiry"}
                />
              </div>

              <div className="group">
                <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                  {t("contact.message")}
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
                  placeholder={t("contact.message.placeholder") || "Your message"}
                />
              </div>

              <button
                type="button"
                className="group flex items-center gap-4 px-10 py-5 bg-primary text-primary-foreground text-sm uppercase tracking-[0.15em] hover:bg-primary/90 transition-all duration-300"
              >
                <span>{t("contact.submit")}</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Inquiry;
