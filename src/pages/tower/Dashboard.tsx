import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/alhamra/Header";
import DashboardHotspot from "@/components/alhamra/DashboardHotspot";
import SystemVitalityPanel from "@/components/alhamra/SystemVitalityPanel";
import NetworkStatusPanel from "@/components/alhamra/NetworkStatusPanel";
import DashboardFooter from "@/components/alhamra/DashboardFooter";
import { motion } from "framer-motion";
import towerBackground from "@/assets/tower-daylight-hud.png";

const Dashboard = () => {
  const { language } = useLanguage();

  const hotspots = [
    {
      id: "height",
      position: { x: "calc(50% + 180px)", y: "12%" },
      title: { en: "413M HEIGHT", ar: "ارتفاع ٤١٣م" },
      subtitle: { en: "80 FLOORS", ar: "٨٠ طابق" },
      side: "right" as const,
    },
    {
      id: "floorplate",
      position: { x: "calc(50% - 280px)", y: "35%" },
      title: { en: "2,300 SQM", ar: "٢,٣٠٠ م²" },
      subtitle: { en: "FLOORPLATE", ar: "مساحة الطابق" },
      side: "left" as const,
    },
    {
      id: "fiber",
      position: { x: "calc(50% + 180px)", y: "55%" },
      title: { en: "FIBER OPTIC", ar: "ألياف ضوئية" },
      subtitle: { en: "BACKBONE", ar: "العمود الفقري" },
      side: "right" as const,
    },
    {
      id: "power",
      position: { x: "calc(50% - 280px)", y: "70%" },
      title: { en: "DUAL POWER", ar: "طاقة مزدوجة" },
      subtitle: { en: "REDUNDANCY", ar: "التكرار" },
      side: "left" as const,
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Header - Fixed at top, not overlapping tower */}
      <Header />

      {/* Main Dashboard Content */}
      <div className="relative pt-20 pb-24 h-screen overflow-hidden">
        {/* Dashboard Title */}
        <motion.div
          className="absolute top-24 left-1/2 -translate-x-1/2 z-30 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-lg lg:text-xl font-mono uppercase tracking-[0.3em] text-slate-700">
            {language === "en" ? "TECHNICAL DASHBOARD" : "لوحة التحكم الفنية"}
          </h1>
          <div className="h-px w-32 mx-auto mt-2 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        </motion.div>

        {/* Tower Image Container - Centered, full height visible */}
        <div className="absolute inset-0 top-20 bottom-20 flex items-center justify-center">
          <motion.div
            className="relative h-full max-h-[calc(100vh-200px)] aspect-[9/16]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={towerBackground}
              alt="Al Hamra Tower"
              className="h-full w-full object-contain drop-shadow-2xl"
              style={{ imageRendering: "crisp-edges" }}
            />
          </motion.div>
        </div>

        {/* Subtle grid overlay for HUD effect */}
        <div 
          className="absolute inset-0 pointer-events-none z-5 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,120,180,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,120,180,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating Hotspots with leader lines */}
        {hotspots.map((hotspot, index) => (
          <DashboardHotspot
            key={hotspot.id}
            position={hotspot.position}
            title={hotspot.title}
            subtitle={hotspot.subtitle}
            side={hotspot.side}
            language={language}
            delay={index + 1}
          />
        ))}

        {/* System Vitality Panel (Left) */}
        <SystemVitalityPanel language={language} />

        {/* Network Status Panel (Right) */}
        <NetworkStatusPanel language={language} />
      </div>

      {/* Footer Navigation */}
      <DashboardFooter language={language} />
    </div>
  );
};

export default Dashboard;
