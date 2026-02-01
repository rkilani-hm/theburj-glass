import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { Building2, ShoppingBag, Car } from "lucide-react";

const IntegratedEcosystemSection = () => {
  const { t } = useLanguage();
  const { ref: sectionRef, isInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView } = useScrollReveal();

  const pillars = [
    {
      icon: Building2,
      title: t("tower.ecosystem.business.title"),
      stat: t("tower.ecosystem.business.floors"),
      substat: t("tower.ecosystem.business.area"),
      desc: t("tower.ecosystem.business.desc"),
    },
    {
      icon: ShoppingBag,
      title: t("tower.ecosystem.shopping.title"),
      stat: t("tower.ecosystem.shopping.levels"),
      substat: t("tower.ecosystem.shopping.brands"),
      desc: t("tower.ecosystem.shopping.desc"),
    },
    {
      icon: Car,
      title: t("tower.ecosystem.parking.title"),
      stat: t("tower.ecosystem.parking.floors"),
      substat: t("tower.ecosystem.parking.feature"),
      desc: t("tower.ecosystem.parking.desc"),
    },
  ];

  return (
    <section className="py-section bg-secondary texture-noise">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("tower.ecosystem.label")}
            </span>
            <div className="w-12 h-px bg-border" />
          </div>
          <h2 className="text-headline font-light tracking-wide text-foreground mb-6">
            {t("tower.ecosystem.title")}
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            {t("tower.ecosystem.intro")}
          </p>
        </motion.div>

        {/* Three Pillars Grid */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={index}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group p-8 bg-background border border-border hover:border-foreground/30 transition-all duration-500 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center bg-secondary border border-border mb-6 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-light text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {pillar.title}
                </h3>

                {/* Stats */}
                <div className="mb-6 space-y-1">
                  <p className="text-2xl font-light text-foreground">
                    {pillar.stat}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {pillar.substat}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default IntegratedEcosystemSection;
