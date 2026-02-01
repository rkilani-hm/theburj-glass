import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { Sparkles, Shield, Settings, Gauge, Clock } from "lucide-react";

const ServiceExcellenceSection = () => {
  const { t } = useLanguage();
  const { ref: sectionRef, isInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView } = useScrollReveal();

  const services = [
    {
      icon: Sparkles,
      title: t("tower.service.polishing"),
    },
    {
      icon: Shield,
      title: t("tower.service.security"),
    },
    {
      icon: Settings,
      title: t("tower.service.bms"),
    },
    {
      icon: Gauge,
      title: t("tower.service.energy"),
    },
    {
      icon: Clock,
      title: t("tower.service.operations"),
    },
  ];

  return (
    <section className="py-section bg-secondary">
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
              {t("tower.service.label")}
            </span>
          </div>
          <h2 className="text-headline font-light tracking-wide text-foreground mb-6">
            {t("tower.service.title")}
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl">
            {t("tower.service.intro")}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="group p-6 bg-background border border-border hover:border-foreground/30 transition-all duration-500 text-center"
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center bg-secondary border border-border mb-4 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceExcellenceSection;
