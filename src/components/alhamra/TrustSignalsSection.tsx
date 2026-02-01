import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { Award, Leaf, ShieldCheck } from "lucide-react";

const TrustSignalsSection = () => {
  const { t } = useLanguage();
  const { ref: sectionRef, isInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView } = useScrollReveal();

  const certifications = [
    {
      icon: Award,
      code: "ISO 9001:2015",
      title: t("tower.trust.iso9001"),
      desc: t("tower.trust.iso9001.desc"),
    },
    {
      icon: Leaf,
      code: "ISO 14001:2015",
      title: t("tower.trust.iso14001"),
      desc: t("tower.trust.iso14001.desc"),
    },
    {
      icon: ShieldCheck,
      code: "ISO 45001:2018",
      title: t("tower.trust.iso45001"),
      desc: t("tower.trust.iso45001.desc"),
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
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("tower.trust.label")}
            </span>
            <div className="w-12 h-px bg-border" />
          </div>
          <h2 className="text-headline font-light tracking-wide text-foreground">
            {t("tower.trust.title")}
          </h2>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <motion.div
                key={index}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="group p-8 bg-secondary border border-border hover:border-foreground/30 transition-all duration-500 text-center"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-background border border-border mb-6 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                  <IconComponent className="w-7 h-7" />
                </div>

                {/* Code */}
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {cert.code}
                </p>

                {/* Title */}
                <h3 className="text-lg font-light text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {cert.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;
