import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TowerLoaderProps { durationMs?: number; onComplete?: () => void; theme?: "light" | "dark"; }

const TowerLoader = ({ durationMs = 2500, onComplete }: TowerLoaderProps) => {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = durationMs * 0.65;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(e * 412));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const out  = setTimeout(() => setVisible(false), durationMs - 700);
    const done = setTimeout(() => onComplete?.(), durationMs);
    return () => { clearTimeout(out); clearTimeout(done); };
  }, [durationMs, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "hsl(var(--background))" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Sky ambient */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(74,107,138,0.06) 0%, transparent 70%)" }} />
          <div className="absolute inset-0 arch-grid opacity-50 pointer-events-none" />

          <motion.div className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* SVG tower drawing */}
            <svg viewBox="0 0 60 180" style={{ width: 42, height: 140 }} fill="none">
              <motion.path d="M30 180 L22 148 L18 110 L20 74 L24 46 L27 26 L29 12 L30 0"
                stroke="hsl(var(--sky))" strokeWidth="1" fill="none"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} />
              <motion.path d="M30 180 L38 148 L42 110 L40 74 L36 46 L33 26 L31 12 L30 0"
                stroke="hsl(var(--sky))" strokeWidth="1" fill="none"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.32 }} />
              {[158, 128, 98, 72, 50, 32, 16].map((y, i) => (
                <motion.line key={y} x1={22 + i * 0.8} y1={y} x2={38 - i * 0.8} y2={y}
                  stroke="hsl(var(--sky-light))" strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.07 }} />
              ))}
              <motion.circle cx="30" cy="0" r="2" fill="hsl(var(--sky))"
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.8] }}
                transition={{ duration: 0.5, delay: 1.8 }} />
            </svg>

            {/* Counter */}
            <div className="flex items-end gap-1.5">
              <span className="font-serif font-light text-sky-dark"
                style={{ fontSize: "2.8rem", lineHeight: 1, letterSpacing: "-0.04em" }}>{count}</span>
              <span className="text-sky font-light mb-1" style={{ fontSize: "0.9rem", letterSpacing: "0.1em" }}>m</span>
            </div>

            {/* Line */}
            <motion.div style={{ height: 1, width: 64, background: "linear-gradient(90deg, transparent, hsl(var(--sky-light)), transparent)", transformOrigin: "center" }}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 1.1 }} />

            {/* Brand */}
            <motion.div className="flex flex-col items-center gap-1.5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }}
            >
              <p className="font-serif font-light text-foreground/60" style={{ fontSize: "0.75rem", letterSpacing: "0.32em", textTransform: "uppercase" }}>Al Hamra Tower</p>
              <p className="font-light text-muted-foreground/50" style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>Kuwait City</p>
            </motion.div>
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 overflow-hidden rounded-full"
            style={{ width: 100, height: 2, background: "hsl(var(--border))" }}>
            <motion.div style={{ height: "100%", background: "hsl(var(--sky-light))", borderRadius: 1 }}
              initial={{ width: "0%" }} animate={{ width: "100%" }}
              transition={{ duration: durationMs / 1000 - 0.5, ease: "linear", delay: 0.2 }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TowerLoader;
