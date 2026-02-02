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
      position: { x: "65%", y: "15%" },
      title: { en: "413M HEIGHT", ar: "ارتفاع ٤١٣م" },
      subtitle: { en: "80 FLOORS", ar: "٨٠ طابق" },
      side: "right" as const,
    },
    {
      id: "floorplate",
      position: { x: "20%", y: "40%" },
      title: { en: "2,300 SQM", ar: "٢,٣٠٠ م²" },
      subtitle: { en: "FLOORPLATE", ar: "مساحة الطابق" },
      side: "left" as const,
    },
    {
      id: "fiber",
      position: { x: "68%", y: "50%" },
      title: { en: "FIBER OPTIC", ar: "ألياف ضوئية" },
      subtitle: { en: "BACKBONE", ar: "العمود الفقري" },
      side: "right" as const,
    },
    {
      id: "power",
      position: { x: "15%", y: "65%" },
      title: { en: "DUAL POWER", ar: "طاقة مزدوجة" },
      subtitle: { en: "REDUNDANCY", ar: "التكرار" },
      side: "left" as const,
    },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Background Image with Light Overlay */}
      <div className="absolute inset-0">
        <img
          src={towerBackground}
          alt="Al Hamra Tower"
          className="h-full w-full object-cover object-center"
          style={{ imageRendering: "crisp-edges" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/50" />
      </div>

      {/* Subtle light scanline effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.02]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,100,150,0.1) 2px, rgba(0,100,150,0.1) 4px)",
        }}
      />

      {/* Header */}
      <Header />

      {/* Dashboard Title */}
      <motion.div
        className="absolute top-28 left-1/2 -translate-x-1/2 z-30 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h1 className="text-lg lg:text-xl font-mono uppercase tracking-[0.3em] text-slate-700">
          {language === "en" ? "TECHNICAL DASHBOARD" : "لوحة التحكم الفنية"}
        </h1>
        <div className="h-px w-32 mx-auto mt-2 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
      </motion.div>

      {/* Floating Hotspots */}
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

      {/* Grid overlay for HUD effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-5 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,120,180,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,120,180,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Footer Navigation */}
      <DashboardFooter language={language} />
    </div>
  );
};

export default Dashboard;
