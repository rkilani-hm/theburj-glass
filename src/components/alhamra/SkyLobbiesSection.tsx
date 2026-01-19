import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { ArrowUpRight, Compass, Users, Building } from "lucide-react";
import somObservation from "@/assets/som-observation.jpg";
import somLobby from "@/assets/som-lobby.jpg";
import kuwaitPanoramaSunset from "@/assets/kuwait-panorama-sunset.png";
import JourneyTimeline from "./JourneyTimeline";
import ElevatorSystemVisualization from "./ElevatorSystemVisualization";

const SkyLobbiesSection = () => {
  const { t } = useLanguage();
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: contentRef, isInView: contentInView } = useScrollReveal();
  const { ref: featuresRef, isInView: featuresInView } = useScrollReveal();
  const { ref: galleryRef, isInView: galleryInView } = useScrollReveal();

  const features = [
    {
      icon: ArrowUpRight,
      title: t("skylobbies.feature1.title"),
      description: t("skylobbies.feature1.desc"),
    },
    {
      icon: Compass,
      title: t("skylobbies.feature2.title"),
      description: t("skylobbies.feature2.desc"),
    },
    {
      icon: Users,
      title: t("skylobbies.feature3.title"),
      description: t("skylobbies.feature3.desc"),
    },
  ];

  const levels = [
    { floor: "30", label: t("skylobbies.floor30.label"), zone: t("skylobbies.floor30.zone") },
    { floor: "55", label: t("skylobbies.floor55.label"), zone: t("skylobbies.floor55.zone") },
  ];

  return (
    <div className="py-section bg-background relative overflow-hidden">
      {/* Subtle vertical motion indicator */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-30" />
      
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("skylobbies.label")}
            </span>
          </div>

          {/* Section Title */}
          <h2 className="text-subheadline lg:text-headline font-light tracking-wide text-foreground mb-6">
            {t("skylobbies.title")}
          </h2>
          
          <p className="text-body-lg text-muted-foreground max-w-3xl leading-relaxed">
            {t("skylobbies.intro")}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div ref={contentRef} className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
          {/* Image Column */}
          <motion.div
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            variants={revealVariants.slideLeft}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-[4/5] overflow-hidden bg-muted group">
                <img
                  src={somObservation}
                  alt={t("skylobbies.image.alt")}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
              </div>
              
              {/* Floating Floor Indicators */}
              <div className="absolute right-4 top-1/3 flex flex-col gap-3">
                {levels.map((level, index) => (
                  <motion.div
                    key={level.floor}
                    initial="hidden"
                    animate={contentInView ? "visible" : "hidden"}
                    variants={revealVariants.slideLeft}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                    className="bg-background/95 backdrop-blur-sm border border-border px-4 py-3 shadow-lg"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-light text-foreground">{level.floor}</span>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        {t("skylobbies.floor")}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{level.zone}</p>
                  </motion.div>
                ))}
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {t("skylobbies.image.caption")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Subheading */}
              <div>
                <h3 className="text-xl font-medium text-foreground mb-4">
                  {t("skylobbies.connectivity.title")}
                </h3>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {t("skylobbies.connectivity.p1")}
                </p>
              </div>

              <div>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {t("skylobbies.connectivity.p2")}
                </p>
              </div>

              {/* Quote Block */}
              <div className="border-l-2 border-border pl-6 py-4">
                <p className="text-lg text-foreground/80 italic leading-relaxed">
                  {t("skylobbies.quote")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="mb-24">
          <motion.h3
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="text-xl font-medium text-foreground mb-12"
          >
            {t("skylobbies.features.title")}
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 border border-border flex items-center justify-center transition-all duration-300 group-hover:bg-muted group-hover:border-muted-foreground">
                    <feature.icon size={20} className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
                  </div>
                </div>
                <h4 className="text-lg font-medium text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 w-12 h-px bg-border transition-all duration-500 group-hover:w-20 group-hover:bg-muted-foreground" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery Row */}
        <div ref={galleryRef} className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial="hidden"
            animate={galleryInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="aspect-[16/10] overflow-hidden group relative"
          >
            <img
              src={somLobby}
              alt={t("skylobbies.gallery.img1")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-sm text-background uppercase tracking-wider">
                {t("skylobbies.gallery.img1")}
              </span>
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={galleryInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="aspect-[16/10] overflow-hidden group relative"
          >
            <img
              src={kuwaitPanoramaSunset}
              alt={t("skylobbies.gallery.img2")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-sm text-background uppercase tracking-wider">
                {t("skylobbies.gallery.img2")}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial="hidden"
          animate={galleryInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <p className="text-body text-muted-foreground leading-relaxed">
            {t("skylobbies.closing")}
          </p>
        </motion.div>
      </div>

      {/* Journey Timeline */}
      <JourneyTimeline />

      {/* Elevator System Visualization */}
      <ElevatorSystemVisualization />
    </div>
  );
};

export default SkyLobbiesSection;
