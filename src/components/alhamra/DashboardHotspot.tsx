import { motion } from "framer-motion";

interface DashboardHotspotProps {
  position: { x: string; y: string };
  title: { en: string; ar: string };
  subtitle?: { en: string; ar: string };
  side: "left" | "right";
  language: "en" | "ar";
  delay?: number;
  onClick?: () => void;
}

const DashboardHotspot = ({
  position,
  title,
  subtitle,
  side,
  language,
  delay = 0,
  onClick,
}: DashboardHotspotProps) => {
  const isRTL = language === "ar";
  const adjustedSide = isRTL ? (side === "left" ? "right" : "left") : side;

  return (
    <motion.div
      className="absolute z-30 flex items-center"
      style={{ top: position.y, left: position.x }}
      initial={{ opacity: 0, x: adjustedSide === "left" ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: delay * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`flex items-center gap-0 ${
          adjustedSide === "right" ? "flex-row-reverse" : ""
        }`}
      >
        {/* Pulsing dot that connects to tower */}
        <motion.div 
          className="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: delay * 0.15 + 0.3 }}
        >
          <div className="w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.8)]" />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-sky-400 animate-ping opacity-75" />
        </motion.div>

        {/* Leader line */}
        <motion.div
          className="relative"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: delay * 0.15 + 0.4 }}
          style={{ transformOrigin: adjustedSide === "left" ? "right" : "left" }}
        >
          <div 
            className={`w-20 h-px ${adjustedSide === "left" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-sky-500 to-sky-300`}
          />
        </motion.div>

        {/* Label Container - Clickable */}
        <motion.button
          onClick={onClick}
          className="relative px-4 py-2.5 bg-white/90 backdrop-blur-xl border border-sky-400/50 rounded-lg
                     shadow-lg shadow-sky-100/50 hover:shadow-xl hover:shadow-sky-200/50
                     hover:border-sky-500 hover:bg-white cursor-pointer
                     transition-all duration-300 group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: delay * 0.15 + 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-sky-500 rounded-tl-lg group-hover:w-3 group-hover:h-3 transition-all" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-sky-500 rounded-tr-lg group-hover:w-3 group-hover:h-3 transition-all" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-sky-500 rounded-bl-lg group-hover:w-3 group-hover:h-3 transition-all" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-sky-500 rounded-br-lg group-hover:w-3 group-hover:h-3 transition-all" />

          <div className={`${isRTL ? "text-right" : "text-left"}`}>
            <p className="text-sm font-mono font-bold text-slate-800 tracking-wide whitespace-nowrap group-hover:text-sky-700 transition-colors">
              {title[language]}
            </p>
            {subtitle && (
              <p className="text-xs font-mono text-sky-600 mt-0.5">
                {subtitle[language]}
              </p>
            )}
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DashboardHotspot;
