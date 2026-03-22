import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import heroTower   from "@/assets/tower-full-blue-sky.png";
import skylineBg   from "@/assets/kuwait-skyline-day.png";

/* ── Altitude counter ── */
const AltitudeCounter = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now();
      const dur = 2000;
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(e * 412));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="flex items-end gap-2"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className="font-serif leading-none text-sky-dark"
        style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 300, letterSpacing: "-0.04em" }}
      >
        {count}
      </span>
      <span
        className="mb-2 text-sky font-light"
        style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", letterSpacing: "0.1em" }}
      >
        m
      </span>
    </motion.div>
  );
};

/* ── Parallax sky particles (subtle dust motes) ── */
const DustMotes = () => {
  const motes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: `${15 + Math.random() * 70}%`,
    delay: Math.random() * 8,
    dur: 10 + Math.random() * 8,
    size: 1.5 + Math.random() * 2,
    drift: (Math.random() - 0.5) * 40,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {motes.map(m => (
        <motion.div key={m.id} className="absolute rounded-full"
          style={{ left: m.x, bottom: "20%", width: m.size, height: m.size, background: "rgba(74,107,138,0.25)" }}
          animate={{ y: [0, -100], x: [0, m.drift], opacity: [0, 0.6, 0], scale: [1, 0.4] }}
          transition={{ duration: m.dur, delay: m.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

/* ════════════════════════════════════════════════════
   HERO — Light limestone, 3D tower, scroll parallax
   ════════════════════════════════════════════════════ */
const HeroSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [textIdx, setTextIdx] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const towerScale     = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.3]),  { stiffness: 60, damping: 20 });
  const towerY         = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]),  { stiffness: 80, damping: 25 });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.4], [0, -50]);

  const headlines = [t("hero.headline"), t("hero.headline2")];
  useEffect(() => {
    const id = setInterval(() => setTextIdx(i => (i + 1) % headlines.length), 6000);
    return () => clearInterval(id);
  }, [headlines.length]);

  return (
    <section
      ref={containerRef}
      className="relative flex items-center overflow-hidden"
      style={{ height: "100svh", minHeight: 600, background: "hsl(var(--background))" }}
    >
      {/* Subtle arch grid */}
      <div className="absolute inset-0 arch-grid opacity-60 pointer-events-none" />

      {/* Sky blue ambient glow — top */}
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 100% at 60% 0%, rgba(74,107,138,0.07) 0%, transparent 70%)" }} />

      {/* Dust motes */}
      <DustMotes />

      {/* ── Tower parallax ── */}
      <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
        <motion.div
          style={{ scale: towerScale, y: towerY, x: "-50%" }}
          className="absolute bottom-0 left-1/2"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <img
            src={heroTower}
            alt="Al Hamra Tower"
            style={{
              height: "90vh",
              width: "auto",
              objectFit: "contain",
              objectPosition: "bottom",
              filter: "drop-shadow(0 0 60px rgba(74,107,138,0.10)) brightness(1.02) contrast(1.02)",
              maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
            }}
          />
        </motion.div>

        {/* Ground fade */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          style={{ height: "40vh", background: "linear-gradient(to top, hsl(var(--background)) 0%, rgba(250,250,247,0.7) 40%, transparent 100%)" }} />
      </div>

      {/* ── Content — left side ── */}
      <motion.div
        className="relative z-20 container mx-auto px-6 lg:px-14 w-full"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-lg">
          {/* Overline */}
          <motion.div className="flex items-center gap-4 mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="sky-line animate-line-draw" style={{ animationDelay: "0.6s" }} />
            <span className="overline">Kuwait City</span>
          </motion.div>

          {/* Altitude number */}
          <AltitudeCounter />

          <motion.p className="label-subtle text-muted-foreground mb-8 mt-1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            Metres above ground level
          </motion.p>

          {/* Rotating headline */}
          <div style={{ minHeight: "3.2rem", overflow: "hidden", marginBottom: "1.5rem" }}>
            <AnimatePresence mode="wait">
              <motion.h1 key={textIdx}
                className="font-serif font-light text-foreground"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.3rem)", lineHeight: 1.25, letterSpacing: "-0.01em" }}
                initial={{ opacity: 0, filter: "blur(6px)", y: 12 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(4px)", y: -10 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {headlines[textIdx]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* CTAs */}
          <motion.div className="flex items-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="/leasing/opportunities"
              className="glass-sky px-6 py-3 text-sky-dark hover:text-sky transition-all duration-300 group inline-flex items-center gap-3"
              style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", fontWeight: 400 }}
            >
              <span>Explore Leasing</span>
              <motion.span className="text-sky" animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
            </a>
            <a href="/tower"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none" }}
            >
              The Tower
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Right stat column ── */}
      <motion.div
        className="absolute right-8 lg:right-14 bottom-20 z-20 flex flex-col items-end gap-3"
        style={{ opacity: contentOpacity as any }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {[{ v: "413", u: "m", l: "Height" }, { v: "80+", u: "", l: "Floors" }, { v: "2011", u: "", l: "Completed" }].map((s, i) => (
          <motion.div key={s.l} className="text-right"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.1 + i * 0.1, duration: 0.7 }}
          >
            <div className="flex items-baseline justify-end gap-1">
              <span className="font-serif font-light text-foreground/75" style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}>{s.v}</span>
              {s.u && <span className="text-sky text-xs">{s.u}</span>}
            </div>
            <p className="label-subtle text-stone-warm" style={{ fontSize: "8px" }}>{s.l}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8, duration: 0.8 }}
      >
        <span className="label-subtle text-muted-foreground/60" style={{ fontSize: "9px" }}>{t("hero.scroll") || "Scroll"}</span>
        <div className="relative w-px h-12 overflow-hidden rounded-full" style={{ background: "hsl(var(--border))" }}>
          <motion.div className="absolute top-0 left-0 w-full"
            style={{ background: "linear-gradient(180deg, hsl(var(--sky)), transparent)", height: "100%" }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <ChevronDown size={14} className="text-stone-warm" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
