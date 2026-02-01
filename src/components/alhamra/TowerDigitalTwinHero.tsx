import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import towerVertical from "@/assets/som-tower-vertical.jpg";

interface HotspotData {
  id: string;
  position: { top: string; left: string };
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  details: { en: string; ar: string };
  icon: string;
}

const hotspots: HotspotData[] = [
  {
    id: "apex",
    position: { top: "8%", left: "52%" },
    title: { en: "The Apex", ar: "القمة" },
    subtitle: { en: "413 Meters", ar: "٤١٣ متر" },
    details: { 
      en: "Kuwait's tallest sculpted skyscraper, piercing the clouds as a symbol of national ambition.", 
      ar: "أطول ناطحة سحاب منحوتة في الكويت، تخترق الغيوم كرمز للطموح الوطني." 
    },
    icon: "▲",
  },
  {
    id: "core",
    position: { top: "40%", left: "48%" },
    title: { en: "The Core", ar: "القلب" },
    subtitle: { en: "80 Floors", ar: "٨٠ طابقاً" },
    details: { 
      en: "Premium office spaces with 2,300 sqm floorplates designed for maximum flexibility and efficiency.", 
      ar: "مساحات مكتبية متميزة بمساحة ٢,٣٠٠ م² مصممة لأقصى درجات المرونة والكفاءة." 
    },
    icon: "◈",
  },
  {
    id: "foundation",
    position: { top: "78%", left: "50%" },
    title: { en: "The Foundation", ar: "الأساس" },
    subtitle: { en: "16 Levels", ar: "١٦ مستوى" },
    details: { 
      en: "Shopping Center (5 luxury levels) and Parking Complex (11 smart, air-conditioned floors).", 
      ar: "مركز تسوق (٥ طوابق فاخرة) ومجمع مواقف (١١ طابقاً ذكياً ومكيفاً)." 
    },
    icon: "▬",
  },
];

const TowerDigitalTwinHero = () => {
  const { language, dir } = useLanguage();
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 architectural-grid" />
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-12 h-px bg-border" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {language === "en" ? "Digital Twin" : "التوأم الرقمي"}
          </span>
          <div className="w-12 h-px bg-border" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-foreground text-center mb-12"
        >
          {language === "en" ? "Interactive Tower Dashboard" : "لوحة البرج التفاعلية"}
        </motion.h1>

        {/* Tower Visualization Container */}
        <div className="relative flex justify-center">
          {/* Tower Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-sm md:max-w-md lg:max-w-lg"
          >
            <div className="relative aspect-[9/16] rounded-sm overflow-hidden shadow-2xl">
              <img
                src={towerVertical}
                alt="Al Hamra Tower Digital Twin"
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20" />

              {/* Hotspots */}
              {hotspots.map((hotspot, index) => (
                <motion.div
                  key={hotspot.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                  className="absolute z-10"
                  style={{ top: hotspot.position.top, left: hotspot.position.left }}
                >
                  {/* Pulsing Dot */}
                  <motion.button
                    onMouseEnter={() => setActiveHotspot(hotspot.id)}
                    onMouseLeave={() => setActiveHotspot(null)}
                    onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
                    className="relative group cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                  >
                    {/* Outer pulse ring */}
                    <motion.div
                      className="absolute -inset-3 rounded-full bg-primary/30"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Middle pulse ring */}
                    <motion.div
                      className="absolute -inset-2 rounded-full bg-primary/40"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 0.2, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                      }}
                    />
                    {/* Core dot */}
                    <div className="relative w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg group-hover:bg-foreground transition-colors duration-300" />
                  </motion.button>

                  {/* Floating Data Card */}
                  <AnimatePresence>
                    {activeHotspot === hotspot.id && (
                      <motion.div
                        initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: dir === "rtl" ? 20 : -20, scale: 0.9 }}
                        transition={{ duration: 0.25 }}
                        className={`absolute z-20 w-64 p-4 bg-card/95 backdrop-blur-md border border-border shadow-xl ${
                          dir === "rtl" ? "right-8" : "left-8"
                        } top-1/2 -translate-y-1/2`}
                      >
                        {/* Card Header */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-lg text-primary">{hotspot.icon}</span>
                          <div>
                            <h3 className="text-sm font-medium text-foreground">
                              {hotspot.title[language]}
                            </h3>
                            <p className="text-lg font-light text-primary">
                              {hotspot.subtitle[language]}
                            </p>
                          </div>
                        </div>
                        {/* Card Body */}
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {hotspot.details[language]}
                        </p>
                        {/* Accent line */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          {language === "en" 
            ? "Hover or tap on the glowing points to explore" 
            : "مرر أو اضغط على النقاط المتوهجة للاستكشاف"}
        </motion.p>
      </div>
    </section>
  );
};

export default TowerDigitalTwinHero;
