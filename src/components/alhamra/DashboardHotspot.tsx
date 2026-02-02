import { motion } from "framer-motion";

interface DashboardHotspotProps {
  position: { x: string; y: string };
  title: { en: string; ar: string };
  subtitle?: { en: string; ar: string };
  side: "left" | "right";
  language: "en" | "ar";
  delay?: number;
}

const DashboardHotspot = ({
  position,
  title,
  subtitle,
  side,
  language,
  delay = 0,
}: DashboardHotspotProps) => {
  const isRTL = language === "ar";
  const adjustedSide = isRTL ? (side === "left" ? "right" : "left") : side;

  return (
    <motion.div
      className="absolute z-30"
      style={{ top: position.y, left: position.x }}
      initial={{ opacity: 0, x: adjustedSide === "left" ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: delay * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`flex items-center gap-3 ${
          adjustedSide === "right" ? "flex-row-reverse" : ""
        }`}
      >
        {/* Label Container */}
        <div
          className="relative px-4 py-2.5 bg-white/80 backdrop-blur-xl border border-sky-400/50 rounded-lg
                     shadow-lg shadow-sky-100/50 hover:shadow-xl hover:shadow-sky-200/50
                     transition-shadow duration-300"
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-sky-500 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-sky-500 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-sky-500 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-sky-500 rounded-br-lg" />

          <div className={`${isRTL ? "text-right" : "text-left"}`}>
            <p className="text-sm font-mono font-bold text-slate-800 tracking-wide">
              {title[language]}
            </p>
            {subtitle && (
              <p className="text-xs font-mono text-sky-600 mt-0.5">
                {subtitle[language]}
              </p>
            )}
          </div>
        </div>

        {/* Leader line connector */}
        <motion.div
          className={`flex items-center ${adjustedSide === "right" ? "flex-row-reverse" : ""}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: delay * 0.15 + 0.3 }}
          style={{ transformOrigin: adjustedSide === "left" ? "right" : "left" }}
        >
          <div 
            className="w-16 h-px bg-gradient-to-r from-sky-500 to-transparent"
            style={{
              transform: adjustedSide === "right" ? "scaleX(-1)" : "none"
            }}
          />
          <div className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)] animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardHotspot;
