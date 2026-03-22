import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import heroTower from "@/assets/tower-full-blue-sky.png";

/* ── Animated altitude counter ── */
const AltitudeCounter = ({ target = 412, duration = 2200 }: { target?: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(ease(progress) * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-end gap-2"
    >
      <span
        className="font-serif font-light leading-none"
        style={{
          fontSize: "clamp(3.5rem, 9vw, 7rem)",
          color: "hsl(var(--silk-gold))",
          letterSpacing: "-0.03em",
          textShadow: "0 0 80px rgba(201,169,110,0.4)",
        }}
      >
        {count}
      </span>
      <span
        className="mb-2 font-light text-white/40"
        style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", letterSpacing: "0.15em" }}
      >
        m
      </span>
    </motion.div>
  );
};

/* ── Floating glass ambient orbs ── */
const AmbientOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute rounded-full"
      style={{
        width: "50vw", height: "50vw",
        background: "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 65%)",
        filter: "blur(80px)",
        top: "10%", right: "-10%",
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute rounded-full"
      style={{
        width: "40vw", height: "40vw",
        background: "radial-gradient(circle, rgba(120,100,200,0.04) 0%, transparent 65%)",
        filter: "blur(100px)",
        bottom: "5%", left: "-5%",
      }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
    />
  </div>
);

/* ── Scroll indicator ── */
const ScrollIndicator = ({ label }: { label: string }) => (
  <motion.div
    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2.8, duration: 1 }}
  >
    <span className="label-subtle text-white/30" style={{ fontSize: "9px" }}>{label}</span>
    <div className="relative w-px h-14 overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-full"
        style={{ background: "linear-gradient(180deg, hsl(var(--silk-gold)/0.7), transparent)", height: "100%" }}
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
    <ChevronDown size={14} className="text-white/20" />
  </motion.div>
);

/* ── Particle dust ── */
const Particles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: `${10 + Math.random() * 80}%`,
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 8,
    drift: (Math.random() - 0.5) * 60,
    size: 1 + Math.random() * 1.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x, bottom: "15%",
            width: p.size, height: p.size,
            background: "rgba(201,169,110,0.5)",
          }}
          animate={{
            y: [0, -140],
            x: [0, p.drift],
            opacity: [0, 0.8, 0],
            scale: [1, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   HERO SECTION — 3D Tower Parallax + Scroll Zoom
   ══════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [textIndex, setTextIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* Scroll-driven transforms */
  const towerScale     = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const towerY         = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const towerOpacity   = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.35], [0, -60]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.7]);

  /* Spring smoothing */
  const springScale = useSpring(towerScale, { stiffness: 60, damping: 20 });
  const springY     = useSpring(towerY,     { stiffness: 80, damping: 25 });

  /* Headline rotation — 6s (fixed from 20s) */
  const headlines = [
    { en: t("hero.headline"),  ar: t("hero.headline")  },
    { en: t("hero.headline2"), ar: t("hero.headline2") },
  ];

  useEffect(() => {
    const timer = setInterval(() => setTextIndex((i) => (i + 1) % headlines.length), 6000);
    return () => clearInterval(timer);
  }, [headlines.length]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* ── Ambient background ── */}
      <div className="absolute inset-0 arch-grid opacity-20" />
      <AmbientOrbs />
      <Particles />

      {/* ── Scroll darkening overlay ── */}
      <motion.div
        className="absolute inset-0 bg-black z-10"
        style={{ opacity: overlayOpacity }}
      />

      {/* ── 3D Tower (parallax + scroll zoom) ── */}
      <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
        <motion.div
          style={{
            scale: springScale,
            y: springY,
            opacity: towerOpacity,
          }}
          className="absolute bottom-0 left-1/2"
          initial={{ x: "-50%", opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, x: "-50%" }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {/* Tower image — primary with glow */}
          <img
            src={heroTower}
            alt="Al Hamra Tower"
            className="tower-glow"
            style={{
              height: "88vh",
              width: "auto",
              objectFit: "contain",
              objectPosition: "bottom center",
              filter: "drop-shadow(0 0 80px rgba(201,169,110,0.15)) drop-shadow(0 0 200px rgba(201,169,110,0.07)) brightness(0.92) contrast(1.05)",
              maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
            }}
          />
        </motion.div>

        {/* Ground fog gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          style={{
            height: "45vh",
            background: "linear-gradient(to top, #080808 0%, rgba(8,8,8,0.8) 30%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Hero Content ── */}
      <motion.div
        className="relative z-20 w-full container mx-auto px-6 lg:px-12"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="flex flex-col items-start max-w-xl">

          {/* Overline */}
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="gold-line animate-line-draw" style={{ animationDelay: "0.8s" }} />
            <span className="overline tracking-[0.35em]">Kuwait City</span>
          </motion.div>

          {/* Altitude counter */}
          <AltitudeCounter target={412} duration={2000} />

          {/* Label under counter */}
          <motion.p
            className="label-subtle text-white/30 mb-8 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Above ground level
          </motion.p>

          {/* Rotating headline */}
          <div className="min-h-[3.5rem] mb-6" style={{ overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.h1
                key={textIndex}
                className="font-serif font-light text-white"
                style={{ fontSize: "clamp(1.3rem, 2.8vw, 2.2rem)", lineHeight: 1.2, letterSpacing: "-0.01em" }}
                initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(6px)", y: -12 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {headlines[textIndex].en}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* CTA row */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="/leasing/opportunities"
              className="glass-gold px-6 py-3 text-white/90 hover:text-white transition-all duration-300 group flex items-center gap-3"
              style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              <span>Explore Leasing</span>
              <motion.span
                className="text-silk-gold"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </a>
            <a
              href="/tower"
              className="text-white/40 hover:text-white/70 transition-colors duration-300"
              style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              The Tower
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom stat strip ── */}
      <motion.div
        className="absolute bottom-16 right-6 lg:right-12 z-20 flex flex-col items-end gap-1"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 2, ease: [0.16, 1, 0.3, 1] }}
        style={{ opacity: contentOpacity as any }}
      >
        {[
          { value: "413", unit: "m", label: "Height" },
          { value: "80", unit: "+", label: "Floors" },
          { value: "2011", unit: "", label: "Completed" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-baseline justify-end gap-1">
              <span className="font-serif font-light text-white/80" style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
                {stat.value}
              </span>
              <span className="text-silk-gold font-light" style={{ fontSize: "0.75rem" }}>{stat.unit}</span>
            </div>
            <p className="label-subtle text-white/25" style={{ fontSize: "8px" }}>{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator label={t("hero.scroll") || "Scroll"} />
    </section>
  );
};

export default HeroSection;
