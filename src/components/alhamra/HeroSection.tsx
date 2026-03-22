import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import towerFull from "@/assets/tower-full-blue-sky.png";   // poster fallback

const HeroSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const videoScale     = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY       = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-black"
      style={{ height: "calc(100svh - var(--nav-h))", minHeight: 560 }}
    >
      {/* ── Full-bleed video — parallax scale on scroll ── */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <video
          src={heroVideo}
          poster={towerFull}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
          }}
        />
        {/* Bottom-up white fade — fluid.glass style, text reads clearly */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.5) 25%, rgba(255,255,255,0.1) 55%, transparent 75%)",
          }}
        />
        {/* Subtle left vignette for headline contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.25) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      {/* ── Content — bottom left, fluid.glass layout ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 container-fluid pb-16 lg:pb-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div style={{ maxWidth: 820 }}>

          {/* Overline */}
          <motion.p
            className="label"
            style={{ color: "#767676", marginBottom: 20 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Kuwait City — 412 m
          </motion.p>

          {/* Giant Cormorant headline */}
          <motion.h1
            className="font-serif font-light"
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#1A1A1A",
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("hero.headline") || "Al Hamra Business Tower"}
          </motion.h1>

          {/* Subline + CTA row */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontSize: "clamp(0.88rem, 1.15vw, 1rem)",
                lineHeight: 1.75,
                fontWeight: 300,
                color: "#767676",
                maxWidth: 420,
              }}
            >
              {t("hero.subline") ||
                "A sculptural landmark designed for performance, prestige, and long-term corporate value."}
            </p>
            <a
              href="/leasing/opportunities"
              className="btn-arrow"
              style={{ flexShrink: 0 }}
            >
              Explore leasing
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator — right edge ── */}
      <motion.div
        className="absolute right-8 bottom-8 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{ opacity: contentOpacity as any }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#767676",
            writingMode: "vertical-rl",
          }}
        >
          Scroll to explore
        </span>
        <div
          style={{
            width: 1,
            height: 52,
            background: "#E8E8E8",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{ width: "100%", height: "100%", background: "#1A1A1A" }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
