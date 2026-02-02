import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wifi, Shield, Activity } from "lucide-react";

interface NetworkStatusPanelProps {
  language: "en" | "ar";
}

const NetworkStatusPanel = ({ language }: NetworkStatusPanelProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const labels = {
    title: { en: "NETWORK STATUS", ar: "حالة الشبكة" },
    network: { en: "Network Status", ar: "حالة الشبكة" },
    networkValue: { en: "100%", ar: "١٠٠٪" },
    security: { en: "Security Protocols", ar: "بروتوكولات الأمان" },
    securityValue: { en: "ACTIVE", ar: "نشط" },
    health: { en: "System Health", ar: "صحة النظام" },
    healthValue: { en: "OPTIMAL", ar: "مثالي" },
  };

  const statusItems = [
    {
      icon: Wifi,
      label: labels.network,
      value: labels.networkValue,
      color: "#00D4FF",
    },
    {
      icon: Shield,
      label: labels.security,
      value: labels.securityValue,
      color: "#10B981",
    },
    {
      icon: Activity,
      label: labels.health,
      value: labels.healthValue,
      color: "#10B981",
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="absolute bottom-28 right-4 lg:right-8 z-40 w-52 lg:w-60"
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-4 lg:p-5">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
          <h3 className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
            {labels.title[language]}
          </h3>
        </div>

        {/* Status Items */}
        <div className="space-y-3">
          {statusItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-2 bg-black/40 border border-white/5"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-center gap-2">
                <item.icon 
                  size={14} 
                  className="text-gray-400"
                  style={{ filter: `drop-shadow(0 0 4px ${item.color})` }}
                />
                <span className="text-[11px] text-gray-400">
                  {item.label[language]}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: item.color }}
                />
                <span
                  className="text-[11px] font-mono font-bold"
                  style={{ color: item.color, textShadow: `0 0 8px ${item.color}` }}
                >
                  {item.value[language]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live indicator */}
        <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-white/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[10px] font-mono uppercase text-red-400 tracking-wider">
            LIVE
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default NetworkStatusPanel;
