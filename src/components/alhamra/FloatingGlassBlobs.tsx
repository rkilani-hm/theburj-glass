import { motion } from "framer-motion";

interface FloatingGlassBlobsProps {
  /** Visual variant — "gold" uses warm silk-gold tones, "cool" uses blue-violet */
  variant?: "gold" | "cool";
  /** Intensity: controls opacity multiplier */
  intensity?: "subtle" | "normal";
}

const FloatingGlassBlobs = ({ variant = "gold", intensity = "normal" }: FloatingGlassBlobsProps) => {
  const opMul = intensity === "subtle" ? 0.6 : 1;

  const blobs =
    variant === "gold"
      ? [
          {
            size: "w-72 h-72",
            bg: `radial-gradient(circle, hsl(43 72% 49% / ${0.07 * opMul}) 0%, transparent 70%)`,
            blur: 60,
            pos: { top: "15%", right: "8%" },
            anim: { y: [0, -24, 0] },
            dur: 16,
          },
          {
            size: "w-56 h-56",
            bg: `radial-gradient(circle, hsl(40 40% 80% / ${0.05 * opMul}) 0%, transparent 70%)`,
            blur: 45,
            pos: { bottom: "25%", left: "5%" },
            anim: { y: [0, 18, 0] },
            dur: 12,
          },
          {
            size: "w-40 h-40",
            bg: `radial-gradient(circle, hsl(43 72% 49% / ${0.04 * opMul}) 0%, transparent 70%)`,
            blur: 35,
            pos: { top: "55%", right: "30%" },
            anim: { y: [0, -12, 0], x: [0, 10, 0] },
            dur: 18,
          },
        ]
      : [
          {
            size: "w-72 h-72",
            bg: `radial-gradient(circle, hsl(220 60% 55% / ${0.05 * opMul}) 0%, transparent 70%)`,
            blur: 60,
            pos: { top: "20%", left: "10%" },
            anim: { y: [0, -20, 0] },
            dur: 14,
          },
          {
            size: "w-48 h-48",
            bg: `radial-gradient(circle, hsl(270 30% 50% / ${0.04 * opMul}) 0%, transparent 70%)`,
            blur: 40,
            pos: { bottom: "20%", right: "8%" },
            anim: { y: [0, 15, 0] },
            dur: 11,
          },
        ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${blob.size}`}
          style={{
            background: blob.bg,
            filter: `blur(${blob.blur}px)`,
            ...blob.pos,
          }}
          animate={blob.anim}
          transition={{ duration: blob.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export default FloatingGlassBlobs;
