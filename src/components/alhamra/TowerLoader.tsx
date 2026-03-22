import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import towerImg from "@/assets/tower-full-blue-sky.png";

interface TowerLoaderProps {
  durationMs?: number;
  onComplete?: () => void;
  theme?: "light" | "dark";
}

/* SVG tower silhouette line-drawing animation */
const TowerSilhouette = () => (
  <svg
    viewBox="0 0 60 200"
    style={{ width: 48, height: 160, overflow: "visible" }}
    fill="none"
  >
    {/* Tower body — left edge */}
    <motion.path
      d="M30 200 L20 160 L16 120 L18 80 L22 50 L24 30 L26 15 L28 5 L30 0"
      stroke="rgba(201,169,110,0.6)"
      strokeWidth="1"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    />
    {/* Tower body — right edge */}
    <motion.path
      d="M30 200 L40 160 L44 120 L42 80 L38 50 L36 30 L34 15 L32 5 L30 0"
      stroke="rgba(201,169,110,0.6)"
      strokeWidth="1"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
    />
    {/* Floor lines */}
    {[170, 140, 110, 80, 55, 35, 18].map((y, i) => (
      <motion.line
        key={y}
        x1={20 + i * 1} y1={y}
        x2={40 - i * 1} y2={y}
        stroke="rgba(201,169,110,0.3)"
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 + i * 0.08, ease: "easeOut" }}
      />
    ))}
    {/* Spire tip glow */}
    <motion.circle
      cx="30" cy="0"
      r="2"
      fill="rgba(201,169,110,0.9)"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.7] }}
      transition={{ duration: 0.6, delay: 1.9, ease: "easeOut" }}
    />
  </svg>
);

/* Altitude counter during load */
const LoaderCounter = ({ duration }: { duration: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const target = 412;
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 0.7), 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [duration]);

  return (
    <motion.div
      className="flex items-end gap-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <span
        className="font-serif font-light"
        style={{ fontSize: "2.5rem", color: "hsl(var(--silk-gold))", lineHeight: 1, letterSpacing: "-0.03em" }}
      >
        {count}
      </span>
      <span className="text-white/30 mb-1 font-light" style={{ fontSize: "0.9rem", letterSpacing: "0.1em" }}>m</span>
    </motion.div>
  );
};

/* ════════════════════════════════════════
   TOWER LOADER — 2.5s premium entrance
   ════════════════════════════════════════ */
const TowerLoader = ({ durationMs = 2500, onComplete }: TowerLoaderProps) => {
  const [phase, setPhase]     = useState<"in" | "hold" | "out">("in");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // hold after drawing completes
    const holdTimer = setTimeout(() => setPhase("hold"), 600);
    // start exit
    const outTimer  = setTimeout(() => setPhase("out"), durationMs - 700);
    // unmount
    const doneTimer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, durationMs);
    return () => { clearTimeout(holdTimer); clearTimeout(outTimer); clearTimeout(doneTimer); };
  }, [durationMs, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "#080808" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Radial gold glow */}
          <motion.div
            className="absolute"
            style={{
              width: "60vw", height: "60vw",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
            animate={{ scale: [0.8, 1.1, 1], opacity: [0, 1, 0.6] }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Tower drawing */}
          <motion.div
            className="relative flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <TowerSilhouette />

            {/* Brand */}
            <div className="flex flex-col items-center gap-3">
              <LoaderCounter duration={durationMs} />
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: 1, width: 80, background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)", transformOrigin: "center" }}
              />
              <motion.p
                className="font-serif font-light text-white/50"
                style={{ fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                Al Hamra Tower
              </motion.p>
              <motion.p
                className="font-light text-white/25"
                style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                Kuwait City
              </motion.p>
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-10 left-1/2"
            style={{ transform: "translateX(-50%)", width: 120, height: 1, background: "rgba(255,255,255,0.06)", borderRadius: 1, overflow: "hidden" }}
          >
            <motion.div
              style={{ height: "100%", background: "rgba(201,169,110,0.5)", borderRadius: 1 }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: durationMs / 1000 - 0.5, ease: "linear", delay: 0.3 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TowerLoader;
