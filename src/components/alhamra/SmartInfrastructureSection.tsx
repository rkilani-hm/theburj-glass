import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { Wifi, Zap, HeadphonesIcon, TrendingUp } from "lucide-react";

const SmartInfrastructureSection = () => {
  const { t } = useLanguage();
  const { ref: sectionRef, isInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView } = useScrollReveal();
  const { ref: calloutRef, isInView: calloutInView } = useScrollReveal();

  const features = [
    {
      icon: Wifi,
      title: t("tower.infra.zerocost"),
      desc: t("tower.infra.fiber"),
    },
    {
      icon: Zap,
      title: t("tower.infra.backup"),
      desc: t("tower.infra.backup.desc"),
    },
    {
      icon: HeadphonesIcon,
      title: t("tower.infra.it"),
      desc: t("tower.infra.it.desc"),
    },
  ];

  return (
    <section className="py-section bg-background texture-noise">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("tower.infra.label")}
            </span>
          </div>
          <h2 className="text-headline font-light tracking-wide text-foreground mb-6">
            {t("tower.infra.title")}
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl">
            {t("tower.infra.intro")}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="group p-6 bg-secondary border border-border hover:border-foreground/30 transition-all duration-500"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-background border border-border mb-4 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-light text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Financial Efficiency Callout */}
        <motion.div
          ref={calloutRef}
          initial="hidden"
          animate={calloutInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6 }}
          className="relative p-8 lg:p-12 bg-secondary border border-border"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 flex items-center justify-center bg-foreground text-background">
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-light text-foreground mb-3">
                {t("tower.infra.efficiency")}
              </h3>
              <p className="text-body-lg text-muted-foreground">
                {t("tower.infra.savings")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SmartInfrastructureSection;
