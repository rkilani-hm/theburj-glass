import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import towerFull from "@/assets/tower-full-blue-sky.png";

const HeroSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imgScale   = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY      = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white" style={{ height: "100svh", minHeight: 600 }}>

      {/* Full-bleed background image — parallax on scroll */}
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <img src={towerFull} alt="Al Hamra Tower"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        {/* Subtle bottom gradient so text reads */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.3) 35%, transparent 65%)" }} />
      </motion.div>

      {/* Content — bottom left, fluid.glass style */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 container-fluid pb-16 lg:pb-24"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="max-w-3xl">
          {/* Label */}
          <motion.p className="label text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Kuwait City — 412 m
          </motion.p>

          {/* Giant headline — Cormorant style */}
          <motion.h1
            className="font-serif font-light text-foreground"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("hero.headline") || "Al Hamra Business Tower"}
          </motion.h1>

          {/* Subline + CTA row */}
          <motion.div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mt-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-muted-foreground font-light max-w-md"
              style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", lineHeight: 1.7 }}>
              {t("hero.subline") || "A sculptural landmark designed for performance, prestige, and long-term corporate value."}
            </p>
            <a href="/leasing/opportunities" className="btn-arrow shrink-0">
              Explore leasing
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }}
        style={{ opacity: textOpacity as any }}
      >
        <span className="label text-muted-foreground" style={{ fontSize: "9px", writingMode: "vertical-rl", letterSpacing: "0.2em" }}>
          Scroll
        </span>
        <div className="w-px overflow-hidden bg-gray-200" style={{ height: 48 }}>
          <motion.div className="w-full bg-foreground" style={{ height: "100%" }}
            animate={{ y: ["-100%", "200%"] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
