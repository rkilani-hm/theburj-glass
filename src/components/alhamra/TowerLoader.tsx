import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TowerLoader = ({ durationMs = 2500, onComplete }: { durationMs?: number; onComplete?: () => void; theme?: string }) => {
  const [visible, setVisible] = useState(true);
  const [count, setCount]     = useState(0);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (durationMs * 0.65), 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 412));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const t1 = setTimeout(() => setVisible(false), durationMs - 600);
    const t2 = setTimeout(() => onComplete?.(), durationMs);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [durationMs, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>

          {/* Thin progress line at very top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gray-100 overflow-hidden">
            <motion.div className="h-full bg-foreground"
              initial={{ width: "0%" }} animate={{ width: "100%" }}
              transition={{ duration: durationMs / 1000 - 0.4, ease: "linear", delay: 0.2 }} />
          </div>

          <motion.div className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* SVG tower outline */}
            <svg viewBox="0 0 50 160" style={{ width: 36, height: 115 }} fill="none">
              <motion.path d="M25 160 L17 132 L14 96 L16 64 L20 40 L23 22 L24.5 10 L25 0"
                stroke="#141414" strokeWidth="0.8" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} />
              <motion.path d="M25 160 L33 132 L36 96 L34 64 L30 40 L27 22 L25.5 10 L25 0"
                stroke="#141414" strokeWidth="0.8" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} />
              {[140, 114, 88, 66, 46, 30, 15].map((y, i) => (
                <motion.line key={y} x1={17 + i * 0.6} y1={y} x2={33 - i * 0.6} y2={y}
                  stroke="#999" strokeWidth="0.4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.07 }} />
              ))}
            </svg>

            <div className="flex flex-col items-center gap-3">
              <div className="flex items-end gap-1.5">
                <span className="font-serif font-light text-foreground"
                  style={{ fontSize: "3.2rem", lineHeight: 1, letterSpacing: "-0.04em" }}>{count}</span>
                <span className="text-muted-foreground font-light mb-1.5" style={{ fontSize: "1rem" }}>m</span>
              </div>
              <motion.div className="hairline mx-auto" style={{ width: 48 }}
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }} />
              <motion.p className="label text-muted-foreground" style={{ letterSpacing: "0.2em" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.7 }}>
                Al Hamra Tower
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TowerLoader;
