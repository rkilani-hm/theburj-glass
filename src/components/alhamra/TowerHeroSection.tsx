import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import towerTopClouds from "@/assets/tower-top-clouds.png";

const TowerHeroSection = () => {
  const { t } = useLanguage();
  const { ref: sectionRef, isInView } = useScrollReveal();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={towerTopClouds}
          alt="Al Hamra Tower piercing the clouds"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-4xl mx-auto"
        >
          {/* Label */}
          <motion.div
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="w-12 h-px bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("tower.hero.label")}
            </span>
            <div className="w-12 h-px bg-border" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-foreground"
          >
            {t("tower.hero.headline")}
          </motion.h1>

          {/* Height */}
          <motion.p
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-3xl font-light text-foreground/80"
          >
            {t("tower.hero.height")}
          </motion.p>

          {/* Identity Statement */}
          <motion.p
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-body-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t("tower.hero.identity")}
          </motion.p>
        </motion.div>
      </div>

      {/* Architectural Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] architectural-grid" />
    </section>
  );
};

export default TowerHeroSection;
