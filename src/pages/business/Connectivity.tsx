import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { Globe, Shield, Zap, Award } from "lucide-react";
import towerAerialDay from "@/assets/tower-aerial-day.png";
import cityLandscape from "@/assets/city-landscape.jpg";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";

const Connectivity = () => {
  const { t } = useLanguage();
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: contentRef, isInView: contentInView } = useScrollReveal();

  const integrations = [
    { icon: Globe, title: t("business.advantage1.title") || "Global Connectivity", desc: t("business.advantage1.desc") || "High-speed fiber infrastructure connecting you to global markets" },
    { icon: Shield, title: t("business.advantage2.title") || "Enterprise Security", desc: t("business.advantage2.desc") || "Multi-layer security systems with 24/7 monitoring" },
    { icon: Zap, title: t("business.advantage3.title") || "Reliable Power", desc: t("business.advantage3.desc") || "Redundant power systems ensuring uninterrupted operations" },
    { icon: Award, title: t("business.advantage4.title") || "Prestigious Address", desc: t("business.advantage4.desc") || "Kuwait's most recognized business address" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        <section className="bg-background relative">
          {/* Header */}
          <div className="py-section texture-noise">
            <div className="container mx-auto px-6 lg:px-12">
              <motion.div
                ref={headerRef}
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-border" />
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">04</span>
                </div>
                <h2 className="text-headline font-light tracking-wide text-foreground mb-8">
                  {t("business.global.title") || "A Global Business Address"}
                </h2>
              </motion.div>

              <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 items-center mt-12">
                <motion.div
                  initial="hidden"
                  animate={contentInView ? "visible" : "hidden"}
                  variants={revealVariants.slideLeft}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-6"
                >
                  <p className="text-body-lg text-muted-foreground leading-relaxed">
                    {t("business.global.p1") || "Al Hamra Tower hosts the headquarters of Kuwait's leading corporations and international enterprises. The address signals prestige, stability, and forward-thinking vision."}
                  </p>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {t("business.global.p2") || "With direct access to major transportation networks and proximity to government institutions, the tower offers unmatched connectivity for businesses operating at the highest level."}
                  </p>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {t("business.global.p3") || "From financial services to technology companies, energy giants to consulting firms—Al Hamra Tower serves as the command center for enterprises that shape the region's economy."}
                  </p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate={contentInView ? "visible" : "hidden"}
                  variants={revealVariants.slideRight}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="aspect-[3/4] overflow-hidden group">
                    <img src={towerAerialDay} alt="Tower aerial view" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="aspect-[3/4] overflow-hidden group mt-8">
                    <img src={cityLandscape} alt="Kuwait city landscape" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Integration Cards */}
          <div className="py-section bg-secondary">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {integrations.map((item, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    animate={contentInView ? "visible" : "hidden"}
                    variants={revealVariants.fadeUp}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="p-8 bg-background border border-border hover:border-foreground transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 border border-border flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                      <item.icon size={24} className="text-muted-foreground transition-colors duration-300 group-hover:text-background" />
                    </div>
                    <h4 className="text-lg font-medium text-foreground mb-3">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Connectivity;
