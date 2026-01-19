import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { ChevronDown, ChevronUp } from "lucide-react";

// Import images
import kuwaitCinemaHistoric from "@/assets/kuwait-cinema-historic.jpg";
import kuwaitSouqHistoric from "@/assets/kuwait-souq-historic.jpg";
import kuwaitCity1970s from "@/assets/kuwait-city-1970s.jpg";
import towerBw1 from "@/assets/tower-bw-1.png";
import towerBw2 from "@/assets/tower-bw-2.png";
import towerAerialSunset from "@/assets/tower-aerial-sunset.png";
import somTowerSkyline from "@/assets/som-tower-skyline.jpg";
import towerNightIlluminated from "@/assets/tower-night-illuminated.jpg";
import constructionFoundation from "@/assets/construction-foundation.jpg";
import constructionSteel from "@/assets/construction-steel.jpg";

interface MilestoneData {
  year: string;
  era: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  expandedDetails: string;
  expandedFact: string;
  expandedFactLabel: string;
  archivalImages: { src: string; caption: string }[];
}

const ParallaxHistoryTimeline = () => {
  const { t, language } = useLanguage();
  const isArabic = language === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Progress line animation
  const progressHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  const milestones: MilestoneData[] = [
    {
      year: "1950s",
      era: t("history.timeline.era.heritage"),
      title: t("history.timeline.milestone1.title"),
      description: t("history.timeline.milestone1.desc"),
      image: kuwaitSouqHistoric,
      imageAlt: t("history.timeline.milestone1.alt"),
      expandedDetails: t("history.timeline.milestone1.expanded"),
      expandedFact: t("history.timeline.milestone1.fact"),
      expandedFactLabel: t("history.timeline.milestone1.factLabel"),
      archivalImages: [
        { src: kuwaitCinemaHistoric, caption: t("history.timeline.milestone1.archival1") }
      ]
    },
    {
      year: "1960s",
      era: t("history.timeline.era.culture"),
      title: t("history.timeline.milestone2.title"),
      description: t("history.timeline.milestone2.desc"),
      image: kuwaitCinemaHistoric,
      imageAlt: t("history.timeline.milestone2.alt"),
      expandedDetails: t("history.timeline.milestone2.expanded"),
      expandedFact: t("history.timeline.milestone2.fact"),
      expandedFactLabel: t("history.timeline.milestone2.factLabel"),
      archivalImages: [
        { src: kuwaitSouqHistoric, caption: t("history.timeline.milestone2.archival1") }
      ]
    },
    {
      year: "1970s",
      era: t("history.timeline.era.growth"),
      title: t("history.timeline.milestone3.title"),
      description: t("history.timeline.milestone3.desc"),
      image: kuwaitCity1970s,
      imageAlt: t("history.timeline.milestone3.alt"),
      expandedDetails: t("history.timeline.milestone3.expanded"),
      expandedFact: t("history.timeline.milestone3.fact"),
      expandedFactLabel: t("history.timeline.milestone3.factLabel"),
      archivalImages: [
        { src: kuwaitSouqHistoric, caption: t("history.timeline.milestone3.archival1") }
      ]
    },
    {
      year: "2005",
      era: t("history.timeline.era.vision"),
      title: t("history.timeline.milestone4.title"),
      description: t("history.timeline.milestone4.desc"),
      image: towerBw1,
      imageAlt: t("history.timeline.milestone4.alt"),
      expandedDetails: t("history.timeline.milestone4.expanded"),
      expandedFact: t("history.timeline.milestone4.fact"),
      expandedFactLabel: t("history.timeline.milestone4.factLabel"),
      archivalImages: [
        { src: constructionFoundation, caption: t("history.timeline.milestone4.archival1") },
        { src: constructionSteel, caption: t("history.timeline.milestone4.archival2") }
      ]
    },
    {
      year: "2011",
      era: t("history.timeline.era.completion"),
      title: t("history.timeline.milestone5.title"),
      description: t("history.timeline.milestone5.desc"),
      image: towerAerialSunset,
      imageAlt: t("history.timeline.milestone5.alt"),
      expandedDetails: t("history.timeline.milestone5.expanded"),
      expandedFact: t("history.timeline.milestone5.fact"),
      expandedFactLabel: t("history.timeline.milestone5.factLabel"),
      archivalImages: [
        { src: towerBw2, caption: t("history.timeline.milestone5.archival1") },
        { src: towerNightIlluminated, caption: t("history.timeline.milestone5.archival2") }
      ]
    },
    {
      year: t("history.timeline.today"),
      era: t("history.timeline.era.legacy"),
      title: t("history.timeline.milestone6.title"),
      description: t("history.timeline.milestone6.desc"),
      image: somTowerSkyline,
      imageAlt: t("history.timeline.milestone6.alt"),
      expandedDetails: t("history.timeline.milestone6.expanded"),
      expandedFact: t("history.timeline.milestone6.fact"),
      expandedFactLabel: t("history.timeline.milestone6.factLabel"),
      archivalImages: [
        { src: towerNightIlluminated, caption: t("history.timeline.milestone6.archival1") }
      ]
    }
  ];

  return (
    <div ref={containerRef} className="relative py-section bg-muted/20">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
            {t("history.timeline.label")}
          </span>
          <h2 className="text-title font-light text-foreground mb-4">
            {t("history.timeline.heading")}
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            {t("history.timeline.desc")}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Progress Line - Center */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border hidden lg:block">
            <motion.div
              style={{ height: progressHeight }}
              className="w-full bg-foreground origin-top"
            />
          </div>

          {/* Mobile Progress Line - Left */}
          <div className={`absolute ${isArabic ? 'right-4' : 'left-4'} top-0 bottom-0 w-px bg-border lg:hidden`}>
            <motion.div
              style={{ height: progressHeight }}
              className="w-full bg-foreground origin-top"
            />
          </div>

          {/* Milestones */}
          <div className="space-y-16 lg:space-y-24">
            {milestones.map((milestone, index) => (
              <MilestoneCard
                key={index}
                milestone={milestone}
                index={index}
                isEven={index % 2 === 0}
                isArabic={isArabic}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MilestoneCardProps {
  milestone: MilestoneData;
  index: number;
  isEven: boolean;
  isArabic: boolean;
}

const MilestoneCard = ({ milestone, index, isEven, isArabic }: MilestoneCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, isInView } = useScrollReveal({ margin: "-50px" });
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  // Parallax effect for image
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={revealVariants.fadeUp}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={cardRef}
        className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-start ${
          isEven ? "" : "lg:flex-row-reverse"
        }`}
      >
        {/* Content Side */}
        <motion.div
          variants={isEven ? revealVariants.slideLeft : revealVariants.slideRight}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`relative ${isArabic ? 'lg:text-right' : ''} ${
            isEven ? (isArabic ? 'lg:order-2' : 'lg:order-1') : (isArabic ? 'lg:order-1' : 'lg:order-2')
          } ${isArabic ? 'pr-12' : 'pl-12'} lg:px-0`}
        >
          {/* Mobile Timeline Marker */}
          <div
            className={`absolute ${isArabic ? 'right-0' : 'left-0'} top-0 lg:hidden flex items-center justify-center`}
          >
            <div className="w-8 h-8 bg-background border-2 border-foreground rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-foreground rounded-full" />
            </div>
          </div>

          {/* Era Badge */}
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-muted-foreground bg-muted px-3 py-1 mb-4">
            {milestone.era}
          </span>

          {/* Year */}
          <p className="text-4xl lg:text-5xl font-light text-foreground tracking-tight mb-3">
            {milestone.year}
          </p>

          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-light text-foreground mb-4">
            {milestone.title}
          </h3>

          {/* Description */}
          <p className="text-body text-muted-foreground leading-relaxed">
            {milestone.description}
          </p>

          {/* Expand Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`mt-6 flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-foreground/70 hover:text-foreground transition-colors duration-300 ${isArabic ? 'flex-row-reverse' : ''}`}
            whileHover={{ x: isArabic ? -4 : 4 }}
          >
            <span>{isExpanded ? t("history.timeline.collapse") : t("history.timeline.expand")}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </motion.button>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-6 space-y-6">
                  {/* Extended Details */}
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {milestone.expandedDetails}
                  </p>

                  {/* Fact Callout */}
                  <div className={`p-4 bg-background border-l-2 border-foreground ${isArabic ? 'border-l-0 border-r-2' : ''}`}>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                      {milestone.expandedFactLabel}
                    </p>
                    <p className="text-lg font-light text-foreground">
                      {milestone.expandedFact}
                    </p>
                  </div>

                  {/* Archival Images Grid */}
                  <div className={`grid ${milestone.archivalImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-4 mt-6`}>
                    {milestone.archivalImages.map((img, imgIndex) => (
                      <motion.div
                        key={imgIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + imgIndex * 0.1, duration: 0.4 }}
                        className="group relative overflow-hidden"
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={img.src}
                            alt={img.caption}
                            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${index < 3 ? 'sepia-[0.3]' : ''}`}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <p className="absolute bottom-0 left-0 right-0 p-3 text-xs text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {img.caption}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Connection Line to Center (Desktop) */}
          <div
            className={`hidden lg:block absolute top-8 ${
              isEven ? (isArabic ? 'left-0' : 'right-0') : (isArabic ? 'right-0' : 'left-0')
            } w-16 h-px bg-border`}
          />
        </motion.div>

        {/* Image Side */}
        <motion.div
          variants={isEven ? revealVariants.slideRight : revealVariants.slideLeft}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`relative overflow-hidden ${
            isEven ? (isArabic ? 'lg:order-1' : 'lg:order-2') : (isArabic ? 'lg:order-2' : 'lg:order-1')
          } ${isArabic ? 'mr-12' : 'ml-12'} lg:mx-0`}
        >
          <div className="aspect-[4/3] overflow-hidden group cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <motion.img
              style={{ y: imageY }}
              src={milestone.image}
              alt={milestone.imageAlt}
              className={`w-full h-full object-cover scale-110 transition-all duration-700 group-hover:scale-105 ${
                index < 3 ? 'sepia-[0.3] group-hover:sepia-0' : ''
              }`}
            />
            {/* Hover Overlay with Prompt */}
            <motion.div 
              className="absolute inset-0 bg-foreground/40 flex items-center justify-center transition-opacity duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered && !isExpanded ? 1 : 0 }}
            >
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ChevronDown className="w-8 h-8 text-background mx-auto mb-2" />
                </motion.div>
                <p className="text-sm uppercase tracking-[0.2em] text-background">
                  {t("history.timeline.clickToExplore")}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Desktop Timeline Marker - Center */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-8 items-center justify-center z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: isExpanded ? 1.2 : 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className={`w-12 h-12 bg-background border-2 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${
              isExpanded ? 'border-foreground bg-foreground' : 'border-foreground'
            }`}
          >
            <div className={`w-4 h-4 rounded-full transition-colors duration-300 ${
              isExpanded ? 'bg-background' : 'bg-foreground'
            }`} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ParallaxHistoryTimeline;
