import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import heroVideo from "@/assets/hero-video.mp4";

const LetterDrop = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const letters = text.split("");
  
  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: delay + index * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

const RotatingText = ({ 
  texts, 
  currentIndex, 
  initialDelay = 0.5 
}: { 
  texts: string[]; 
  currentIndex: number; 
  initialDelay?: number;
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentIndex}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="inline-block"
      >
        <LetterDrop key={`${currentIndex}-${texts[currentIndex]}`} text={texts[currentIndex]} delay={initialDelay} />
      </motion.span>
    </AnimatePresence>
  );
};

/* Floating refractive glass blobs behind content */
const GlassBlobs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-72 h-72 rounded-full"
      style={{
        background: "radial-gradient(circle, hsl(43 72% 49% / 0.08) 0%, transparent 70%)",
        filter: "blur(60px)",
        top: "20%",
        left: "10%",
      }}
      animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-96 h-96 rounded-full"
      style={{
        background: "radial-gradient(circle, hsl(270 40% 50% / 0.06) 0%, transparent 70%)",
        filter: "blur(80px)",
        bottom: "10%",
        right: "5%",
      }}
      animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-48 h-48 rounded-full"
      style={{
        background: "radial-gradient(circle, hsl(200 60% 50% / 0.05) 0%, transparent 70%)",
        filter: "blur(50px)",
        top: "50%",
        right: "30%",
      }}
      animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const HeroContent = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const headlines = [t("hero.headline"), t("hero.headline2")];
  const sublines = [t("hero.subline"), t("hero.subline2")];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 20000);

    return () => {
      clearInterval(interval);
    };
  }, [headlines.length]);

  return (
    <motion.div 
      className="relative z-10 container mx-auto px-6 lg:px-12 w-full flex items-center justify-start"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Liquid Glass Panel */}
      <div className="liquid-glass px-8 py-10 md:px-12 md:py-14 max-w-2xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white drop-shadow-sm">
          <RotatingText texts={headlines} currentIndex={currentIndex} initialDelay={0.8} />
        </h1>
        <p className="mt-6 text-base md:text-lg text-white/80 font-light tracking-wide">
          <RotatingText texts={sublines} currentIndex={currentIndex} initialDelay={1.6} />
        </p>
        {/* Gold accent line */}
        <motion.div 
          className="mt-8 h-px w-24 bg-gradient-to-r from-silk-gold to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 2, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ opacity: 1 }}
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/50 via-transparent to-foreground/30" />
      </div>

      {/* Glass Blobs - Spatial depth */}
      <GlassBlobs />

      {/* Content */}
      <HeroContent />

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-white/50">
          {t("hero.scroll") || "Scroll"}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-silk-gold/50 to-transparent animate-line-grow origin-top" />
        <ChevronDown size={16} className="text-white/40 animate-bounce" style={{ animationDuration: "2s" }} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
