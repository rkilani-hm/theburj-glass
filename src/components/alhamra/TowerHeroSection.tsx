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
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 max-w-4xl mx-auto"
        >
          {/* Label - 7-Star Overline */}
          <motion.div
            variants={revealVariants.fadeUp}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="w-16 hairline" />
            <span className="overline">
              {t("tower.hero.label")}
            </span>
            <div className="w-16 hairline" />
          </motion.div>

          {/* Headline - Tighter tracking */}
          <motion.h1
            variants={revealVariants.fadeUp}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground"
          >
            {t("tower.hero.headline")}
          </motion.h1>

          {/* Height */}
          <motion.p
            variants={revealVariants.fadeUp}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="text-2xl md:text-3xl font-light text-foreground/80"
          >
            {t("tower.hero.height")}
          </motion.p>

          {/* Identity Statement */}
          <motion.p
            variants={revealVariants.fadeUp}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="text-base text-muted-foreground max-w-2xl mx-auto"
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
