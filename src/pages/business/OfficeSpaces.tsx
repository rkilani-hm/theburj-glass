import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { Globe, Shield, Zap, Award } from "lucide-react";
import lobbyArches from "@/assets/lobby-arches.jpg";
import towerKuwaitTowers from "@/assets/tower-kuwait-towers.jpg";
import skylineParkPanorama from "@/assets/skyline-park-panorama.jpg";
import officeCorridor from "@/assets/office-corridor.jpg";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";

const OfficeSpaces = () => {
  const { t } = useLanguage();
  const { ref: tenantsRef, isInView: tenantsInView } = useScrollReveal();

  const advantages = [
    { icon: Globe, title: t("business.advantage1.title") || "Global Connectivity", desc: t("business.advantage1.desc") || "High-speed fiber infrastructure connecting you to global markets" },
    { icon: Shield, title: t("business.advantage2.title") || "Enterprise Security", desc: t("business.advantage2.desc") || "Multi-layer security systems with 24/7 monitoring" },
    { icon: Zap, title: t("business.advantage3.title") || "Reliable Power", desc: t("business.advantage3.desc") || "Redundant power systems ensuring uninterrupted operations" },
    { icon: Award, title: t("business.advantage4.title") || "Prestigious Address", desc: t("business.advantage4.desc") || "Kuwait's most recognized business address" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        <section className="bg-secondary py-section">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={tenantsRef}
              initial="hidden"
              animate={tenantsInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-border" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">02</span>
              </div>
              <h2 className="text-headline font-light tracking-wide text-foreground mb-6">
                {t("business.advantages.title") || "The Al Hamra Advantage"}
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl">
                {t("business.advantages.desc") || "Beyond workspace—a complete business ecosystem designed to enhance productivity, connectivity, and corporate presence."}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={tenantsInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="p-8 bg-background border border-border hover:border-foreground transition-all duration-300 group"
                >
                  <div className="w-14 h-14 border border-border flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                    <advantage.icon size={24} className="text-muted-foreground transition-colors duration-300 group-hover:text-background" />
                  </div>
                  <h4 className="text-lg font-medium text-foreground mb-3">{advantage.title}</h4>
                  <p className="text-sm text-muted-foreground">{advantage.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Gallery Row */}
            <div className="grid lg:grid-cols-3 gap-6 mt-16">
              <motion.div
                initial="hidden"
                animate={tenantsInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="aspect-[4/3] overflow-hidden group"
              >
                <img src={lobbyArches} alt="Grand lobby with lamella arches" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
              <motion.div
                initial="hidden"
                animate={tenantsInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="aspect-[4/3] overflow-hidden group"
              >
                <img src={towerKuwaitTowers} alt="Tower with Kuwait Towers" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
              <motion.div
                initial="hidden"
                animate={tenantsInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="aspect-[4/3] overflow-hidden group"
              >
                <img src={skylineParkPanorama} alt="Kuwait City panorama" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
              <motion.div
                initial="hidden"
                animate={tenantsInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="lg:col-span-3 aspect-[21/9] overflow-hidden group"
              >
                <img src={officeCorridor} alt="Premium office corridor" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OfficeSpaces;
