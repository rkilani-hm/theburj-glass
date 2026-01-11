import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";

const LetterDrop = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const letters = text.split("");
  
  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + index * 0.05,
            ease: [0.25, 0.46, 0.45, 0.94],
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
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-left px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-display font-light tracking-wide text-foreground">
          <LetterDrop text={t("hero.headline")} delay={0.5} />
        </h1>
        <p className="mt-6 text-body-lg text-black font-light tracking-wide">
          <LetterDrop text={t("hero.subline")} delay={1.2} />
        </p>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t("hero.scroll") || "Scroll"}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent animate-line-grow origin-top" />
        <ChevronDown size={16} className="text-muted-foreground animate-bounce" style={{ animationDuration: "2s" }} />
      </motion.div>

      {/* Architectural Grid Overlay (subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] architectural-grid" />
    </section>
  );
};

export default HeroSection;
