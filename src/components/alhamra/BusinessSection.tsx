import { Building2, Users, Server, Headphones, Globe, Shield, Zap, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import cityViewInterior from "@/assets/city-view-interior.jpg";
import towerAerialDay from "@/assets/tower-aerial-day.png";
import cityLandscape from "@/assets/city-landscape.jpg";
import skylineParkPanorama from "@/assets/skyline-park-panorama.jpg";
import towerKuwaitTowers from "@/assets/tower-kuwait-towers.jpg";
import lobbyArches from "@/assets/lobby-arches.jpg";
import officeCorridor from "@/assets/office-corridor.jpg";
import SkyLobbiesSection from "./SkyLobbiesSection";

const BusinessSection = () => {
  const { t } = useLanguage();
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: contentRef, isInView: contentInView } = useScrollReveal();
  const { ref: additionalRef, isInView: additionalInView } = useScrollReveal();
  const { ref: tenantsRef, isInView: tenantsInView } = useScrollReveal();
  const { ref: statsRef, isInView: statsInView } = useScrollReveal();

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

  const businessStats = [
    { value: "50+", label: t("business.stat1.label") || "Leading Companies", desc: t("business.stat1.desc") || "Regional and multinational tenants" },
    { value: "95%", label: t("business.stat2.label") || "Occupancy Rate", desc: t("business.stat2.desc") || "Consistent high demand" },
    { value: "24/7", label: t("business.stat3.label") || "Operations", desc: t("business.stat3.desc") || "Round-the-clock building services" },
  ];

  const advantages = [
    { icon: Globe, title: t("business.advantage1.title") || "Global Connectivity", desc: t("business.advantage1.desc") || "High-speed fiber infrastructure connecting you to global markets" },
    { icon: Shield, title: t("business.advantage2.title") || "Enterprise Security", desc: t("business.advantage2.desc") || "Multi-layer security systems with 24/7 monitoring" },
    { icon: Zap, title: t("business.advantage3.title") || "Reliable Power", desc: t("business.advantage3.desc") || "Redundant power systems ensuring uninterrupted operations" },
    { icon: Award, title: t("business.advantage4.title") || "Prestigious Address", desc: t("business.advantage4.desc") || "Kuwait's most recognized business address" },
  ];

  return (
    <section id="business" className="bg-background relative">
      {/* Hero Section */}
      <div className="py-section texture-noise">
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
            {t("business.intro") || "Infrastructure designed for enterprise excellence. Every system engineered with purpose, every service calibrated for the demands of modern business."}
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
                      src={cityViewInterior}
                      alt="Executive office with city views"
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
                      <span className="text-xs text-muted-foreground font-mono mt-1">0{index + 1}</span>
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
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-section bg-foreground">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={statsRef}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
              {businessStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={statsInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-5xl lg:text-6xl font-light text-background mb-3">{stat.value}</p>
                  <p className="text-sm uppercase tracking-[0.2em] text-background/80 mb-2">{stat.label}</p>
                  <p className="text-sm text-background/60">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sky Lobbies Section */}
      <SkyLobbiesSection />

      {/* Advantages Grid */}
      <div className="py-section bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={tenantsRef}
            initial="hidden"
            animate={tenantsInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-subheadline font-light text-foreground mb-4">
              {t("business.advantages.title") || "The Al Hamra Advantage"}
            </h3>
            <p className="text-body text-muted-foreground max-w-2xl">
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
              <img
                src={lobbyArches}
                alt="Grand lobby with lamella arches"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              animate={tenantsInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="aspect-[4/3] overflow-hidden group"
            >
              <img
                src={towerKuwaitTowers}
                alt="Tower with Kuwait Towers"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              animate={tenantsInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="aspect-[4/3] overflow-hidden group"
            >
              <img
                src={skylineParkPanorama}
                alt="Kuwait City panorama"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              animate={tenantsInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="lg:col-span-3 aspect-[21/9] overflow-hidden group"
            >
              <img
                src={officeCorridor}
                alt="Premium office corridor"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Global Address Section */}
      <div ref={additionalRef} className="py-section bg-background texture-noise">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h3
            initial="hidden"
            animate={additionalInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="text-subheadline font-light text-foreground mb-12"
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
              <p className="text-body text-muted-foreground leading-relaxed">
                {t("business.global.p3") || "From financial services to technology companies, energy giants to consulting firms—Al Hamra Tower serves as the command center for enterprises that shape the region's economy."}
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
                  src={cityLandscape}
                  alt="Kuwait city landscape"
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