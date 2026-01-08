import { Building2, Users, Server, Headphones } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import officeInterior from "@/assets/interior-office.jpg";
import towerAerialDay from "@/assets/tower-aerial-day.png";
import kuwaitSkylineDay from "@/assets/kuwait-skyline-day.png";

const BusinessSection = () => {
  const { t } = useLanguage();
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: contentRef, isInView: contentInView } = useScrollReveal();
  const { ref: additionalRef, isInView: additionalInView } = useScrollReveal();

  const items = [
    {
      icon: Building2,
      title: t("business.offices"),
      description: t("business.offices.desc"),
    },
    {
      icon: Users,
      title: t("business.environment"),
      description: t("business.environment.desc"),
    },
    {
      icon: Server,
      title: t("business.infrastructure"),
      description: t("business.infrastructure.desc"),
    },
    {
      icon: Headphones,
      title: t("business.support"),
      description: t("business.support.desc"),
    },
  ];

  return (
    <section id="business" className="py-section bg-background relative texture-noise">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <motion.div 
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-px bg-border" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">03</span>
        </motion.div>

        {/* Section Title */}
        <motion.h2 
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-headline font-light tracking-wide text-foreground mb-8"
        >
          {t("business.title")}
        </motion.h2>

        <motion.p 
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-body-lg text-muted-foreground max-w-2xl mb-20"
        >
          {t("business.intro") || "Infrastructure designed for enterprise excellence. Every system engineered with purpose."}
        </motion.p>

        {/* Layout: Image + Grid */}
        <div ref={contentRef} className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Featured Image */}
          <motion.div 
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            variants={revealVariants.slideLeft}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-32">
              <div className="relative group">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={officeInterior}
                    alt="Executive office space"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">
                    {t("business.caption") || "Premium Workspace"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Blocks */}
          <div className="lg:col-span-7">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {items.map((item, index) => (
                <motion.div 
                  key={index} 
                  initial="hidden"
                  animate={contentInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  {/* Number & Icon */}
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-xs text-grey-medium font-mono mt-1">0{index + 1}</span>
                    <div className="w-12 h-12 border border-border flex items-center justify-center transition-all duration-300 group-hover:bg-muted group-hover:border-muted-foreground">
                      <item.icon size={20} className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Underline accent */}
                  <div className="mt-6 w-12 h-px bg-border transition-all duration-500 group-hover:w-24 group-hover:bg-muted-foreground" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Content Section */}
        <div ref={additionalRef} className="mt-32 pt-20 border-t border-border">
          <motion.h3
            initial="hidden"
            animate={additionalInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="text-title font-light text-foreground mb-12"
          >
            {t("business.global.title") || "A Global Business Address"}
          </motion.h3>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate={additionalInView ? "visible" : "hidden"}
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
            </motion.div>

            <motion.div
              initial="hidden"
              animate={additionalInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="aspect-[3/4] overflow-hidden group">
                <img
                  src={towerAerialDay}
                  alt="Tower aerial view"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden group mt-8">
                <img
                  src={kuwaitSkylineDay}
                  alt="Kuwait skyline"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
