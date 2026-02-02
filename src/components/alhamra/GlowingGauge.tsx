import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface GlowingGaugeProps {
  value: number;
  maxValue: number;
  label: { en: string; ar: string };
  status: { en: string; ar: string };
  glowColor?: string;
  size?: number;
  language: "en" | "ar";
}

const GlowingGauge = ({
  value,
  maxValue,
  label,
  status,
  glowColor = "#00D4FF",
  size = 100,
  language,
}: GlowingGaugeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (count / maxValue) * circumference;
  const offset = circumference - progress;

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(easeProgress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow effect background */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-20 animate-pulse"
          style={{ backgroundColor: glowColor }}
        />
        
        <svg
          className="transform -rotate-90 relative z-10"
          width={size}
          height={size}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(148,163,184,0.3)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle with glow */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={glowColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              filter: `drop-shadow(0 0 6px ${glowColor})`,
            }}
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <span 
            className="text-xl font-mono font-bold text-slate-700"
            style={{ textShadow: `0 0 8px ${glowColor}40` }}
          >
            {count}%
          </span>
        </div>
      </div>
      
      {/* Label */}
      <p className="mt-3 text-xs font-mono uppercase tracking-wider text-sky-600 text-center">
        {label[language]}
      </p>
      
      {/* Status */}
      <div className="flex items-center gap-1.5 mt-1">
        <span 
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: glowColor }}
        />
        <span className="text-[10px] font-mono uppercase text-slate-500">
          {status[language]}
        </span>
      </div>
    </motion.div>
  );
};

export default GlowingGauge;
