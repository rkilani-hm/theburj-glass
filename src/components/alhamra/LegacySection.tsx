import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { useRef } from "react";
import { Quote } from "lucide-react";

// Import images
import towerBw1 from "@/assets/tower-bw-1.png";
import towerBw2 from "@/assets/tower-bw-2.png";
import towerAerialSunset from "@/assets/tower-aerial-sunset.png";
import towerCityContext from "@/assets/tower-city-context.jpg";
import somTowerSkyline from "@/assets/som-tower-skyline.jpg";
import kuwaitPanoramaSunset from "@/assets/kuwait-panorama-sunset.png";
import towerNightIlluminated from "@/assets/tower-night-illuminated.jpg";

// Archival images
import kuwaitCinemaHistoric from "@/assets/kuwait-cinema-historic.jpg";
import kuwaitSouqHistoric from "@/assets/kuwait-souq-historic.jpg";
import kuwaitCity1970s from "@/assets/kuwait-city-1970s.jpg";

const LegacySection = () => {
  const { t, language } = useLanguage();
  const isArabic = language === "ar";
  
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: originsRef, isInView: originsInView } = useScrollReveal();
  const { ref: archivalRef, isInView: archivalInView } = useScrollReveal();
  const { ref: foundersRef, isInView: foundersInView } = useScrollReveal();
  const { ref: evolutionRef, isInView: evolutionInView } = useScrollReveal();
  const { ref: designRef, isInView: designInView } = useScrollReveal();
  const { ref: impactRef, isInView: impactInView } = useScrollReveal();
  const { ref: heartRef, isInView: heartInView } = useScrollReveal();

  const archivalImages = [
    { 
      src: kuwaitCinemaHistoric, 
      alt: t("legacy.archival.cinema.alt"),
      caption: t("legacy.archival.cinema.caption"),
      year: "1960s"
    },
    { 
      src: kuwaitSouqHistoric, 
      alt: t("legacy.archival.souq.alt"),
      caption: t("legacy.archival.souq.caption"),
      year: "1950s"
    },
    { 
      src: kuwaitCity1970s, 
      alt: t("legacy.archival.city.alt"),
      caption: t("legacy.archival.city.caption"),
      year: "1970s"
    }
  ];

  const foundersQuotes = [
    {
      quote: t("legacy.founders.quote1"),
      author: t("legacy.founders.author1"),
      role: t("legacy.founders.role1")
    },
    {
      quote: t("legacy.founders.quote2"),
      author: t("legacy.founders.author2"),
      role: t("legacy.founders.role2")
    },
    {
      quote: t("legacy.founders.quote3"),
      author: t("legacy.founders.author3"),
      role: t("legacy.founders.role3")
    }
  ];
  
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const timeline = [
    { 
      year: "1960s", 
      label: t("legacy.timeline.cinema"), 
      desc: t("legacy.timeline.cinema.desc")
    },
    { 
      year: "2005", 
      label: t("legacy.timeline.groundbreaking"), 
      desc: t("legacy.timeline.groundbreaking.desc")
    },
    { 
      year: "2011", 
      label: t("legacy.timeline.completion"), 
      desc: t("legacy.timeline.completion.desc")
    },
    { 
      year: t("legacy.timeline.today"), 
      label: t("legacy.timeline.icon"), 
      desc: t("legacy.timeline.icon.desc")
    },
  ];

  return (
    <section id="legacy" className="bg-background relative overflow-hidden">
      {/* Hero Section with Parallax */}
      <div ref={parallaxRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div 
          style={{ y: parallaxY }}
          className="absolute inset-0 scale-110"
        >
          <img
            src={kuwaitPanoramaSunset}
            alt={t("legacy.hero.alt")}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        </motion.div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
            <motion.div 
              ref={headerRef}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-foreground/60" />
                <span className="text-xs uppercase tracking-[0.3em] text-foreground/80">
                  {t("legacy.label")}
                </span>
              </div>
              <h1 className="text-headline lg:text-display font-light tracking-wide text-foreground mb-6">
                {t("legacy.title")}
              </h1>
              <p className="text-body-lg text-foreground/80 max-w-xl">
                {t("legacy.subtitle")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Origins Section - Cinema to Tower */}
      <div className="py-section bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            ref={originsRef}
            initial="hidden"
            animate={originsInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-title font-light text-foreground mb-4">
              {t("legacy.origins.heading")}
            </h2>
            <div className="w-16 h-px bg-foreground/30" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Then/Now Image Comparison */}
            <motion.div
              initial="hidden"
              animate={originsInView ? "visible" : "hidden"}
              variants={revealVariants.slideLeft}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`relative ${isArabic ? 'lg:order-2' : ''}`}
            >
              <div className="relative">
                {/* Historical image (sepia/vintage treatment) */}
                <div className="aspect-[4/3] overflow-hidden bg-muted/20">
                  <img
                    src={towerBw1}
                    alt={t("legacy.origins.historic.alt")}
                    className="w-full h-full object-cover sepia-[0.3] opacity-90"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {t("legacy.origins.historic.label")}
                    </p>
                  </div>
                </div>
                
                {/* Modern overlay image */}
                <div className="absolute -bottom-8 -right-8 w-2/3 aspect-[3/4] overflow-hidden shadow-2xl border-4 border-background">
                  <img
                    src={towerAerialSunset}
                    alt={t("legacy.origins.modern.alt")}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {t("legacy.origins.modern.label")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Origins Content */}
            <motion.div
              initial="hidden"
              animate={originsInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`space-y-8 ${isArabic ? 'lg:order-1' : ''}`}
            >
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {t("legacy.origins.p1")}
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                {t("legacy.origins.p2")}
              </p>
              
              <blockquote className="relative py-6 my-8">
                <div className={`absolute ${isArabic ? 'right-0' : 'left-0'} top-0 bottom-0 w-px bg-foreground`} />
                <p className={`text-title font-light text-foreground ${isArabic ? 'pr-8' : 'pl-8'}`}>
                  {t("legacy.origins.quote")}
                </p>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Archival Gallery Section */}
      <div className="py-section bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            ref={archivalRef}
            initial="hidden"
            animate={archivalInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
              {t("legacy.archival.label")}
            </span>
            <h2 className="text-title font-light text-foreground mb-4">
              {t("legacy.archival.heading")}
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl">
              {t("legacy.archival.desc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {archivalImages.map((image, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={archivalInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="group relative overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover sepia-[0.4] transition-all duration-700 group-hover:sepia-0 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xl font-light text-background mb-1">{image.year}</p>
                  <p className="text-sm text-background/80">{image.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Founders' Vision Section */}
      <div className="py-section bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            ref={foundersRef}
            initial="hidden"
            animate={foundersInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
              {t("legacy.founders.label")}
            </span>
            <h2 className="text-title font-light text-foreground mb-4">
              {t("legacy.founders.heading")}
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              {t("legacy.founders.desc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {foundersQuotes.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={foundersInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="relative p-8 bg-muted/30 border border-border group hover:border-foreground/20 transition-colors duration-300"
              >
                <Quote className="w-8 h-8 text-foreground/20 mb-6 group-hover:text-foreground/40 transition-colors duration-300" />
                <blockquote className="mb-8">
                  <p className="text-body leading-relaxed text-foreground font-light italic">
                    "{item.quote}"
                  </p>
                </blockquote>
                <footer className="mt-auto">
                  <p className="text-sm font-medium text-foreground">{item.author}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mt-1">{item.role}</p>
                </footer>
              </motion.div>
            ))}
          </div>

          {/* Vision Statement */}
          <motion.div
            initial="hidden"
            animate={foundersInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <blockquote className="max-w-3xl mx-auto relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-px bg-foreground/30" />
              <p className="text-title font-light text-foreground leading-relaxed pt-8">
                {t("legacy.founders.vision")}
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-section bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            ref={evolutionRef}
            initial="hidden"
            animate={evolutionInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-title font-light text-foreground mb-4">
              {t("legacy.evolution.heading")}
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              {t("legacy.evolution.desc")}
            </p>
          </motion.div>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-8 left-0 right-0 h-px bg-border hidden lg:block" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  animate={evolutionInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                  className="relative text-center lg:text-start"
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:flex absolute top-6 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 w-5 h-5 items-center justify-center">
                    <div className="w-4 h-4 bg-background border-2 border-foreground rounded-full" />
                  </div>

                  <div className="lg:pt-16 space-y-3">
                    <p className="text-3xl lg:text-4xl font-light text-foreground tracking-tight">
                      {item.year}
                    </p>
                    <p className="text-sm font-medium uppercase tracking-[0.15em] text-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Design & Achievement Section */}
      <div className="py-section bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              ref={designRef}
              initial="hidden"
              animate={designInView ? "visible" : "hidden"}
              variants={revealVariants.slideLeft}
              transition={{ duration: 0.8 }}
              className={`space-y-8 ${isArabic ? 'lg:order-2' : ''}`}
            >
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                  {t("legacy.design.label")}
                </span>
                <h2 className="text-title font-light text-foreground mb-4">
                  {t("legacy.design.heading")}
                </h2>
                <div className="w-16 h-px bg-foreground/30" />
              </div>
              
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {t("legacy.design.p1")}
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                {t("legacy.design.p2")}
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border">
                <div>
                  <p className="text-3xl lg:text-4xl font-light text-foreground">413m</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                    {t("legacy.stat.height")}
                  </p>
                </div>
                <div>
                  <p className="text-3xl lg:text-4xl font-light text-foreground">77</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                    {t("legacy.stat.floors")}
                  </p>
                </div>
                <div>
                  <p className="text-3xl lg:text-4xl font-light text-foreground">60°</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                    {t("legacy.stat.twist")}
                  </p>
                </div>
                <div>
                  <p className="text-3xl lg:text-4xl font-light text-foreground">#1</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                    {t("legacy.stat.carved")}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={designInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${isArabic ? 'lg:order-1' : ''}`}
            >
              <div className="aspect-[3/4] overflow-hidden group">
                <img
                  src={somTowerSkyline}
                  alt={t("legacy.design.image.alt")}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground italic text-center">
                {t("legacy.design.image.caption")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Urban & Cultural Impact */}
      <div className="py-section bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              ref={impactRef}
              initial="hidden"
              animate={impactInView ? "visible" : "hidden"}
              variants={revealVariants.slideLeft}
              transition={{ duration: 0.8 }}
              className={`${isArabic ? 'lg:order-2' : ''}`}
            >
              <div className="aspect-[16/10] overflow-hidden group">
                <img
                  src={towerNightIlluminated}
                  alt={t("legacy.impact.image.alt")}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={impactInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`space-y-8 ${isArabic ? 'lg:order-1' : ''}`}
            >
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-background/70 mb-4 block">
                  {t("legacy.impact.label")}
                </span>
                <h2 className="text-title font-light text-background mb-4">
                  {t("legacy.impact.heading")}
                </h2>
              </div>
              
              <p className="text-body-lg text-background/80 leading-relaxed">
                {t("legacy.impact.p1")}
              </p>
              <p className="text-body text-background/70 leading-relaxed">
                {t("legacy.impact.p2")}
              </p>

              <div className="pt-6">
                <p className="text-sm uppercase tracking-[0.2em] text-background/60">
                  {t("legacy.impact.recognition")}
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <span className="px-4 py-2 border border-background/30 text-sm text-background/80">
                    CTBUH Award
                  </span>
                  <span className="px-4 py-2 border border-background/30 text-sm text-background/80">
                    MIPIM Finalist
                  </span>
                  <span className="px-4 py-2 border border-background/30 text-sm text-background/80">
                    LEAF Award
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Legacy in the Heart of the City */}
      <div className="py-section bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            ref={heartRef}
            initial="hidden"
            animate={heartInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-title font-light text-foreground mb-4">
              {t("legacy.heart.heading")}
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              {t("legacy.heart.p1")}
            </p>
          </motion.div>

          {/* City Context Gallery */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial="hidden"
              animate={heartInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 aspect-[16/9] overflow-hidden group"
            >
              <img
                src={towerCityContext}
                alt={t("legacy.heart.gallery1.alt")}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              animate={heartInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="aspect-square lg:aspect-auto overflow-hidden group"
            >
              <img
                src={towerBw2}
                alt={t("legacy.heart.gallery2.alt")}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Closing Statement */}
          <motion.div
            initial="hidden"
            animate={heartInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <blockquote className="max-w-2xl mx-auto">
              <p className="text-title font-light text-foreground leading-relaxed">
                {t("legacy.closing.quote")}
              </p>
              <footer className="mt-6 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                {t("legacy.closing.attribution")}
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
