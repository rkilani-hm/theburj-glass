import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { X } from "lucide-react";
import constructionFoundation from "@/assets/construction-foundation.jpg";
import constructionSteel from "@/assets/construction-steel.jpg";
import constructionFacade from "@/assets/construction-facade.jpg";
import towerSunset from "@/assets/tower-sunset.png";

interface ConstructionPhase {
  id: string;
  titleKey: string;
  captionKey: string;
  descriptionKey: string;
  detailsKey: string;
  significanceKey: string;
  year: string;
  progress: number; // 0 to 1 - how much of tower is built
  image: string;
}

const ConstructionStory = () => {
  const { t, language } = useLanguage();
  const isArabic = language === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPhase, setSelectedPhase] = useState<ConstructionPhase | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const phases: ConstructionPhase[] = [
    {
      id: "foundation",
      titleKey: "construction.phase1.title",
      captionKey: "construction.phase1.caption",
      descriptionKey: "construction.phase1.description",
      detailsKey: "construction.phase1.details",
      significanceKey: "construction.phase1.significance",
      year: "2005-2006",
      progress: 0.1,
      image: constructionFoundation,
    },
    {
      id: "core",
      titleKey: "construction.phase2.title",
      captionKey: "construction.phase2.caption",
      descriptionKey: "construction.phase2.description",
      detailsKey: "construction.phase2.details",
      significanceKey: "construction.phase2.significance",
      year: "2007",
      progress: 0.35,
      image: constructionSteel,
    },
    {
      id: "rise",
      titleKey: "construction.phase3.title",
      captionKey: "construction.phase3.caption",
      descriptionKey: "construction.phase3.description",
      detailsKey: "construction.phase3.details",
      significanceKey: "construction.phase3.significance",
      year: "2008-2009",
      progress: 0.65,
      image: constructionSteel,
    },
    {
      id: "cladding",
      titleKey: "construction.phase4.title",
      captionKey: "construction.phase4.caption",
      descriptionKey: "construction.phase4.description",
      detailsKey: "construction.phase4.details",
      significanceKey: "construction.phase4.significance",
      year: "2009-2010",
      progress: 0.85,
      image: constructionFacade,
    },
    {
      id: "complete",
      titleKey: "construction.phase5.title",
      captionKey: "construction.phase5.caption",
      descriptionKey: "construction.phase5.description",
      detailsKey: "construction.phase5.details",
      significanceKey: "construction.phase5.significance",
      year: "2011",
      progress: 1.0,
      image: towerSunset,
    },
  ];

  // Calculate which phase is active based on scroll
  const phaseProgress = useTransform(scrollYProgress, [0, 1], [0, phases.length - 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-muted/30 via-background to-muted/30"
      style={{ height: `${(phases.length + 1) * 100}vh` }}
    >
      {/* Section Header */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Tower SVG Visualization */}
            <div className={`relative flex justify-center ${isArabic ? "lg:order-2" : ""}`}>
              <TowerVisualization scrollProgress={scrollYProgress} />
            </div>

            {/* Phase Content */}
            <div className={`space-y-8 ${isArabic ? "lg:order-1 text-right" : ""}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm uppercase tracking-widest text-primary mb-4">
                  {t("construction.sectionLabel")}
                </p>
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-6">
                  {t("construction.sectionTitle")}
                </h2>
              </motion.div>

              {/* Phase Cards */}
              <PhaseCards
                phases={phases}
                scrollProgress={scrollYProgress}
                onPhaseClick={setSelectedPhase}
                isArabic={isArabic}
              />

              {/* Progress Indicator */}
              <ProgressIndicator
                phases={phases}
                scrollProgress={scrollYProgress}
                isArabic={isArabic}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Phase Detail Modal */}
      <AnimatePresence>
        {selectedPhase && (
          <PhaseModal
            phase={selectedPhase}
            onClose={() => setSelectedPhase(null)}
            isArabic={isArabic}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// Tower SVG Visualization Component
const TowerVisualization = ({
  scrollProgress,
}: {
  scrollProgress: any;
}) => {
  const [isComplete, setIsComplete] = useState(false);
  
  // Transform scroll progress to tower height reveal - the mask Y position
  // At scroll 0: mask starts at y=430 (tower hidden), at scroll 1: mask at y=40 (tower fully revealed)
  const maskY = useTransform(scrollProgress, [0, 1], [430, 40]);
  const glowOpacity = useTransform(scrollProgress, [0, 0.1, 0.9, 1], [0.8, 0.4, 0.4, 0.8]);
  const glowY = useTransform(scrollProgress, [0, 1], [420, 40]);
  const craneOpacity = useTransform(scrollProgress, [0, 0.1, 0.85, 0.95], [0, 1, 1, 0]);
  const heightMarkerOpacity = useTransform(scrollProgress, [0.8, 1], [0, 1]);
  const completionOpacity = useTransform(scrollProgress, [0.92, 0.98], [0, 1]);
  
  // Track completion state for celebration effect
  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (value: number) => {
      if (value >= 0.95 && !isComplete) {
        setIsComplete(true);
      } else if (value < 0.9 && isComplete) {
        setIsComplete(false);
      }
    });
    return () => unsubscribe();
  }, [scrollProgress, isComplete]);
  
  // Floor line opacities
  const floorLineOpacities = Array.from({ length: 20 }).map((_, i) => 
    useTransform(scrollProgress, [i * 0.04, i * 0.04 + 0.08], [0, 1])
  );

  return (
    <div className="relative w-full max-w-sm aspect-[1/2]">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-200/50 via-transparent to-stone-100/30 rounded-lg" />
      
      <svg
        viewBox="0 0 200 450"
        className="w-full h-full"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          {/* Tower Gradient */}
          <linearGradient id="towerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.85" />
          </linearGradient>

          {/* Glow Filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Clip path for tower reveal */}
          <clipPath id="towerClip">
            <motion.rect
              x="0"
              width="200"
              height="450"
              style={{ y: maskY }}
            />
          </clipPath>
        </defs>

        {/* Ground/Foundation - always visible */}
        <rect x="40" y="430" width="120" height="15" fill="hsl(var(--muted))" />
        <rect x="50" y="428" width="100" height="4" fill="hsl(var(--border))" />

        {/* Tower Silhouette with Clip Reveal */}
        <g clipPath="url(#towerClip)">
          {/* Main Tower Body - Al Hamra's distinctive carved form */}
          <path
            d="M70 430 
               L70 120 
               Q70 80, 85 60 
               L85 45 
               Q100 30, 115 45 
               L115 60 
               Q130 80, 130 120 
               L130 430 
               Z"
            fill="url(#towerGradient)"
            className="drop-shadow-lg"
          />

          {/* Carved Section (Al Hamra's signature asymmetric cut) */}
          <path
            d="M115 430 
               L115 200 
               Q130 180, 145 200 
               L145 320 
               Q135 350, 125 380 
               L125 430 
               Z"
            fill="hsl(var(--background))"
            opacity="0.3"
          />

          {/* Floor Lines */}
          {floorLineOpacities.map((lineOpacity, i) => (
            <motion.line
              key={i}
              x1="72"
              y1={425 - i * 18}
              x2="128"
              y2={425 - i * 18}
              stroke="hsl(var(--background))"
              strokeWidth="0.5"
              style={{ opacity: lineOpacity }}
            />
          ))}

          {/* Tower Crown Detail */}
          <path
            d="M92 50 L100 35 L108 50"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            opacity="0.8"
          />
        </g>

        {/* Rising Glow Effect - follows the construction line */}
        <motion.line
          x1="70"
          x2="130"
          y1="0"
          y2="0"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          filter="url(#glow)"
          style={{
            y: glowY,
            opacity: glowOpacity,
          }}
        />

        {/* Construction Crane (visible during building phases) */}
        <motion.g style={{ opacity: craneOpacity }}>
          <line x1="155" y1="100" x2="155" y2="300" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
          <line x1="140" y1="110" x2="180" y2="110" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
          <line x1="155" y1="110" x2="100" y2="130" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 2" />
        </motion.g>

        {/* Completion Celebration - Shimmer Effect */}
        <motion.g style={{ opacity: completionOpacity }}>
          {/* Shimmer gradient overlay */}
          <defs>
            <linearGradient id="shimmerGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              <animate attributeName="y1" values="100%;-100%;100%" dur="2s" repeatCount="indefinite" />
              <animate attributeName="y2" values="200%;0%;200%" dur="2s" repeatCount="indefinite" />
            </linearGradient>
          </defs>
          
          {/* Shimmer overlay on tower */}
          <path
            d="M70 430 
               L70 120 
               Q70 80, 85 60 
               L85 45 
               Q100 30, 115 45 
               L115 60 
               Q130 80, 130 120 
               L130 430 
               Z"
            fill="url(#shimmerGradient)"
          />
        </motion.g>

        {/* Celebration Pulse Rings */}
        <AnimatePresence>
          {isComplete && (
            <>
              <motion.circle
                cx="100"
                cy="40"
                r="10"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                initial={{ r: 10, opacity: 0.8, strokeWidth: 2 }}
                animate={{ r: 60, opacity: 0, strokeWidth: 0.5 }}
                transition={{ duration: 1.5, ease: "easeOut", repeat: Infinity, repeatDelay: 0.5 }}
              />
              <motion.circle
                cx="100"
                cy="40"
                r="10"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                initial={{ r: 10, opacity: 0.6, strokeWidth: 2 }}
                animate={{ r: 80, opacity: 0, strokeWidth: 0.5 }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.3, repeat: Infinity, repeatDelay: 0.5 }}
              />
              <motion.circle
                cx="100"
                cy="40"
                r="10"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                initial={{ r: 10, opacity: 0.4, strokeWidth: 1.5 }}
                animate={{ r: 100, opacity: 0, strokeWidth: 0.3 }}
                transition={{ duration: 2.1, ease: "easeOut", delay: 0.6, repeat: Infinity, repeatDelay: 0.5 }}
              />
            </>
          )}
        </AnimatePresence>
      </svg>

      {/* Height Marker */}
      <motion.div
        className="absolute right-0 top-1/4 flex items-center gap-2 text-sm text-muted-foreground"
        style={{ opacity: heightMarkerOpacity }}
      >
        <span className="w-8 h-px bg-primary" />
        <span className="font-light">412m</span>
      </motion.div>

      {/* Completion Badge */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            className="absolute -top-2 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-xs font-medium tracking-wider uppercase shadow-lg"
              animate={{ 
                boxShadow: [
                  "0 0 0 0 hsla(var(--primary), 0.4)",
                  "0 0 0 10px hsla(var(--primary), 0)",
                  "0 0 0 0 hsla(var(--primary), 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Complete
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Phase Cards Component
const PhaseCards = ({
  phases,
  scrollProgress,
  onPhaseClick,
  isArabic,
}: {
  phases: ConstructionPhase[];
  scrollProgress: any;
  onPhaseClick: (phase: ConstructionPhase) => void;
  isArabic: boolean;
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      {phases.map((phase, index) => {
        const phaseStart = index / phases.length;
        const phaseEnd = (index + 1) / phases.length;

        return (
          <PhaseCard
            key={phase.id}
            phase={phase}
            index={index}
            scrollProgress={scrollProgress}
            phaseStart={phaseStart}
            phaseEnd={phaseEnd}
            onClick={() => onPhaseClick(phase)}
            isArabic={isArabic}
          />
        );
      })}
    </div>
  );
};

const PhaseCard = ({
  phase,
  index,
  scrollProgress,
  phaseStart,
  phaseEnd,
  onClick,
  isArabic,
}: {
  phase: ConstructionPhase;
  index: number;
  scrollProgress: any;
  phaseStart: number;
  phaseEnd: number;
  onClick: () => void;
  isArabic: boolean;
}) => {
  const { t } = useLanguage();

  const isActive = useTransform(scrollProgress, (value: number) => {
    return value >= phaseStart && value < phaseEnd + 0.05;
  });

  const opacity = useTransform(scrollProgress, [phaseStart - 0.1, phaseStart, phaseEnd, phaseEnd + 0.1], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollProgress, [phaseStart - 0.05, phaseStart, phaseEnd, phaseEnd + 0.05], [0.98, 1, 1, 0.98]);
  const bgOpacity = useTransform(scrollProgress, [phaseStart - 0.05, phaseStart, phaseEnd, phaseEnd + 0.05], [0, 1, 1, 0]);

  return (
    <motion.div
      className="relative group cursor-pointer"
      style={{ opacity, scale }}
      onClick={onClick}
      whileHover={{ x: isArabic ? -4 : 4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Active Background */}
      <motion.div
        className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
        style={{ opacity: bgOpacity }}
      />

      <div className={`p-4 rounded-lg border border-transparent hover:border-border transition-colors ${isArabic ? "pr-6" : "pl-6"}`}>
        {/* Phase Number & Year */}
        <div className={`flex items-center gap-3 mb-2 ${isArabic ? "flex-row-reverse" : ""}`}>
          <span className="text-xs font-medium uppercase tracking-widest text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="w-4 h-px bg-border" />
          <span className="text-xs text-muted-foreground">{phase.year}</span>
        </div>

        {/* Caption */}
        <p className="text-sm font-medium text-foreground mb-1">
          {t(phase.captionKey)}
        </p>

        {/* Description */}
        <motion.p
          className="text-sm text-muted-foreground leading-relaxed line-clamp-2"
          style={{
            opacity: useTransform(scrollProgress, [phaseStart, phaseStart + 0.05], [0.6, 1]),
          }}
        >
          {t(phase.descriptionKey)}
        </motion.p>

        {/* Tap for more indicator */}
        <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {t("construction.tapForDetails")}
        </p>
      </div>
    </motion.div>
  );
};

// Progress Indicator Component
const ProgressIndicator = ({
  phases,
  scrollProgress,
  isArabic,
}: {
  phases: ConstructionPhase[];
  scrollProgress: any;
  isArabic: boolean;
}) => {
  const { t } = useLanguage();

  return (
    <div className={`flex items-center gap-2 pt-4 ${isArabic ? "flex-row-reverse" : ""}`}>
      {phases.map((phase, index) => {
        const phaseProgress = index / (phases.length - 1);

        return (
          <motion.div
            key={phase.id}
            className="flex items-center gap-2"
          >
            <motion.div
              className="relative"
              style={{
                opacity: useTransform(
                  scrollProgress,
                  [phaseProgress - 0.1, phaseProgress],
                  [0.3, 1]
                ),
              }}
            >
              {/* Node */}
              <motion.div
                className="w-2 h-2 rounded-full bg-primary"
                style={{
                  scale: useTransform(
                    scrollProgress,
                    [phaseProgress - 0.05, phaseProgress, phaseProgress + 0.15],
                    [0.8, 1.3, 1]
                  ),
                }}
              />
            </motion.div>

            {/* Connector */}
            {index < phases.length - 1 && (
              <motion.div
                className="h-px w-6 lg:w-10 bg-border"
                style={{
                  scaleX: useTransform(
                    scrollProgress,
                    [phaseProgress, (index + 1) / (phases.length - 1)],
                    [0, 1]
                  ),
                  transformOrigin: isArabic ? "right" : "left",
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

// Phase Detail Modal
const PhaseModal = ({
  phase,
  onClose,
  isArabic,
}: {
  phase: ConstructionPhase;
  onClose: () => void;
  isArabic: boolean;
}) => {
  const { t } = useLanguage();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="relative aspect-video">
          <img
            src={phase.image}
            alt={t(phase.titleKey)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Year Badge */}
          <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded">
            {phase.year}
          </div>
        </div>

        {/* Content */}
        <div className={`p-6 space-y-4 ${isArabic ? "text-right" : ""}`}>
          <div>
            <p className="text-sm uppercase tracking-widest text-primary mb-1">
              {t(phase.captionKey)}
            </p>
            <h3 className="text-2xl font-light tracking-wide">
              {t(phase.titleKey)}
            </h3>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {t(phase.detailsKey)}
          </p>

          {/* Significance */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm font-medium text-foreground mb-2">
              {t("construction.significance")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t(phase.significanceKey)}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConstructionStory;
