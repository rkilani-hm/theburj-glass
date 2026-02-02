import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import GlowingGauge from "./GlowingGauge";

interface SystemVitalityPanelProps {
  language: "en" | "ar";
}

const SystemVitalityPanel = ({ language }: SystemVitalityPanelProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const labels = {
    title: { en: "SYSTEM VITALITY", ar: "حيوية النظام" },
    dualFiber: { en: "DUAL FIBER", ar: "ألياف مزدوجة" },
    fiberStatus: { en: "ACTIVE", ar: "نشط" },
    backupPower: { en: "BACKUP POWER", ar: "طاقة احتياطية" },
    powerStatus: { en: "12H READY", ar: "١٢ ساعة جاهز" },
    networkTraffic: { en: "NETWORK TRAFFIC", ar: "حركة الشبكة" },
  };

  // Mini line graph data points
  const graphData = [30, 45, 35, 60, 50, 70, 55, 80, 65, 75, 85, 70];

  return (
    <motion.div
      ref={ref}
      className="fixed top-28 left-4 lg:left-8 z-40 w-48 lg:w-56"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`relative backdrop-blur-xl border border-slate-200 shadow-lg p-4 lg:p-5 rounded-lg transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 shadow-slate-300/60 border-slate-300" 
          : "bg-white/70 shadow-slate-200/50"
      }`}>
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-sky-500 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-sky-500 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-sky-500 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-sky-500 rounded-br-lg" />

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
          <h3 className="text-xs font-mono font-bold text-sky-600 tracking-wider">
            {labels.title[language]}
          </h3>
        </div>

        {/* Gauges */}
        <div className="flex justify-around gap-2 mb-4">
          <GlowingGauge
            value={100}
            maxValue={100}
            label={labels.dualFiber}
            status={labels.fiberStatus}
            glowColor="#00D4FF"
            size={70}
            language={language}
          />
          <GlowingGauge
            value={100}
            maxValue={100}
            label={labels.backupPower}
            status={labels.powerStatus}
            glowColor="#10B981"
            size={70}
            language={language}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent my-3" />

        {/* Mini Line Graph */}
        <div>
          <p className="text-[10px] font-mono uppercase text-slate-500 mb-2 tracking-wider">
            {labels.networkTraffic[language]}
          </p>
          <div className="h-12 flex items-end gap-0.5">
            {graphData.map((value, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-to-t from-sky-300/50 to-sky-500 rounded-t-sm"
                initial={{ height: 0 }}
                animate={isInView ? { height: `${value}%` } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                style={{
                  boxShadow: "0 0 5px rgba(14,165,233,0.3)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemVitalityPanel;
