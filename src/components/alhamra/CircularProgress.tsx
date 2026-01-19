import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";

interface CircularProgressProps {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  suffix?: string;
  delay?: number;
  color?: string;
}

const CircularProgress = ({
  value,
  maxValue = 100,
  size = 160,
  strokeWidth = 8,
  label,
  suffix = "%",
  delay = 0,
  color = "hsl(var(--primary))",
}: CircularProgressProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { count } = useCountUp({ end: value, duration: 2000, delay: delay * 150 });

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (count / maxValue) * circumference;
  const offset = circumference - progress;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: delay * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/20"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 2, delay: delay * 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-light tabular-nums">{count}</span>
          <span className="text-sm text-muted-foreground">{suffix}</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-center text-muted-foreground max-w-[140px]">
        {label}
      </p>
    </motion.div>
  );
};

export default CircularProgress;