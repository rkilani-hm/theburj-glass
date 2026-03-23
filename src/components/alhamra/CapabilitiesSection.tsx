import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { 
  Building2, 
  Wind, 
  Shield, 
  Zap, 
  Thermometer, 
  Eye,
  Layers,
  Compass
} from "lucide-react";

const CapabilitiesSection = () => {
  const { t } = useLanguage();
  const { ref: sectionRef, isInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView } = useScrollReveal();
  const { ref: statsRef, isInView: statsInView } = useScrollReveal();

  const capabilities = [
    {
      icon: Building2,
      title: t("capabilities.structural.title"),
      desc: t("capabilities.structural.desc"),
      stat: "77",
      statLabel: t("capabilities.structural.stat"),
    },
    {
      icon: Wind,
      title: t("capabilities.wind.title"),
      desc: t("capabilities.wind.desc"),
      stat: "250",
      statLabel: t("capabilities.wind.stat"),
    },
    {
      icon: Shield,
      title: t("capabilities.seismic.title"),
      desc: t("capabilities.seismic.desc"),
      stat: "Zone 2",
      statLabel: t("capabilities.seismic.stat"),
    },
    {
      icon: Thermometer,
      title: t("capabilities.thermal.title"),
      desc: t("capabilities.thermal.desc"),
      stat: "40%",
      statLabel: t("capabilities.thermal.stat"),
    },
    {
      icon: Zap,
      title: t("capabilities.power.title"),
      desc: t("capabilities.power.desc"),
      stat: "N+1",
      statLabel: t("capabilities.power.stat"),
    },
    {
      icon: Eye,
      title: t("capabilities.facade.title"),
      desc: t("capabilities.facade.desc"),
      stat: "28,000",
      statLabel: t("capabilities.facade.stat"),
    },
    {
      icon: Layers,
      title: t("capabilities.foundation.title"),
      desc: t("capabilities.foundation.desc"),
      stat: "60m",
      statLabel: t("capabilities.foundation.stat"),
    },
    {
      icon: Compass,
      title: t("capabilities.orientation.title"),
      desc: t("capabilities.orientation.desc"),
      stat: "60°",
      statLabel: t("capabilities.orientation.stat"),
    },
  ];

  const engineeringStats = [
    { value: "85,000", label: t("capabilities.stat1.label"), unit: "m³" },
    { value: "12,500", label: t("capabilities.stat2.label"), unit: t("capabilities.stat2.unit") },
    { value: "52", label: t("capabilities.stat3.label"), unit: t("capabilities.stat3.unit") },
    { value: "1,100", label: t("capabilities.stat4.label"), unit: t("capabilities.stat4.unit") },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background ">
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
              {t("capabilities.label")}
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight font-light tracking-wide text-foreground mb-6">
            {t("capabilities.title")}
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl">
            {t("capabilities.desc")}
          </p>
        </motion.div>

        {/* Engineering Stats Bar */}
        <motion.div
          ref={statsRef}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border mb-20"
        >
          {engineeringStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="bg-secondary p-8 text-center group hover:bg-background transition-colors duration-500 cursor-default"
            >
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-3xl lg:text-4xl font-light text-foreground group-hover:text-primary transition-colors duration-300">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">{stat.unit}</span>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {capabilities.map((capability, index) => {
            const IconComponent = capability.icon;
            return (
              <motion.div
                key={index}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group p-6 bg-background border border-border hover:border-foreground/30 transition-all duration-500 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center bg-secondary border border-border mb-6 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-light text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {capability.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {capability.desc}
                </p>

                {/* Stat */}
                <div className="pt-4 border-t border-border">
                  <span className="text-2xl font-light text-foreground">
                    {capability.stat}
                  </span>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">
                    {capability.statLabel}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
