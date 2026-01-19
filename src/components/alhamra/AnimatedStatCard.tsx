import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { LucideIcon } from "lucide-react";

interface AnimatedStatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  delay?: number;
  decimals?: number;
  color?: "primary" | "emerald" | "amber" | "blue";
}

const AnimatedStatCard = ({
  value,
  suffix = "",
  prefix = "",
  label,
  description,
  icon: Icon,
  delay = 0,
  decimals = 0,
  color = "primary",
}: AnimatedStatCardProps) => {
  const { count, ref, isInView } = useCountUp({ 
    end: value, 
    duration: 2000, 
    delay: delay * 100,
    decimals 
  });

  const colorClasses = {
    primary: "text-primary border-primary/20 bg-primary/5",
    emerald: "text-emerald-600 border-emerald-500/20 bg-emerald-500/5",
    amber: "text-amber-600 border-amber-500/20 bg-amber-500/5",
    blue: "text-blue-600 border-blue-500/20 bg-blue-500/5",
  };

  const iconColorClasses = {
    primary: "text-primary",
    emerald: "text-emerald-600",
    amber: "text-amber-600",
    blue: "text-blue-600",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative p-8 border rounded-lg ${colorClasses[color]} overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
    >
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-current opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-500" />
      
      {Icon && (
        <Icon className={`w-8 h-8 mb-4 ${iconColorClasses[color]}`} strokeWidth={1.5} />
      )}
      
      <div className="relative">
        <p className="text-4xl lg:text-5xl font-light mb-2 tabular-nums">
          {prefix}{count.toLocaleString()}{suffix}
        </p>
        <p className="text-sm font-medium uppercase tracking-widest opacity-80 mb-2">
          {label}
        </p>
        {description && (
          <p className="text-xs opacity-60 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Animated Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-current opacity-30"
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : {}}
        transition={{ duration: 2, delay: delay * 0.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
};

export default AnimatedStatCard;