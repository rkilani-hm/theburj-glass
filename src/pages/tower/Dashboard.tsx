import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/alhamra/Header";
import DashboardHotspot from "@/components/alhamra/DashboardHotspot";
import HotspotDetailModal from "@/components/alhamra/HotspotDetailModal";
import SystemVitalityPanel from "@/components/alhamra/SystemVitalityPanel";
import NetworkStatusPanel from "@/components/alhamra/NetworkStatusPanel";
import DashboardFooter from "@/components/alhamra/DashboardFooter";
import { motion } from "framer-motion";
import towerBackground from "@/assets/tower-daylight-hud.png";

const Dashboard = () => {
  const { language } = useLanguage();
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  const hotspots = [
    {
      id: "height",
      position: { x: "calc(50% + 120px)", y: "18%" },
      title: { en: "413M HEIGHT", ar: "ارتفاع ٤١٣م" },
      subtitle: { en: "80 FLOORS", ar: "٨٠ طابق" },
      side: "right" as const,
      description: {
        en: "Al Hamra Tower rises 413 meters above Kuwait City, making it the tallest sculpted tower in the world. The unique asymmetric form creates a distinctive silhouette on the skyline.",
        ar: "يرتفع برج الحمراء 413 متراً فوق مدينة الكويت، مما يجعله أطول برج منحوت في العالم. الشكل غير المتماثل الفريد يخلق صورة ظلية مميزة على أفق المدينة."
      },
      specs: [
        { label: { en: "Total Height", ar: "الارتفاع الكلي" }, value: "413m" },
        { label: { en: "Office Floors", ar: "طوابق المكاتب" }, value: "80" },
        { label: { en: "Construction", ar: "البناء" }, value: "2005-2011" },
        { label: { en: "Rank", ar: "الترتيب" }, value: "#1 Kuwait" },
      ],
    },
    {
      id: "floorplate",
      position: { x: "calc(50% - 200px)", y: "38%" },
      title: { en: "2,300 SQM", ar: "٢,٣٠٠ م²" },
      subtitle: { en: "FLOORPLATE", ar: "مساحة الطابق" },
      side: "left" as const,
      description: {
        en: "Each floor offers 2,300 square meters of premium office space with column-free layouts, floor-to-ceiling windows, and panoramic views of the Arabian Gulf and Kuwait City.",
        ar: "يوفر كل طابق 2,300 متر مربع من المساحات المكتبية الفاخرة مع تصميمات خالية من الأعمدة ونوافذ من الأرض إلى السقف وإطلالات بانورامية على الخليج العربي ومدينة الكويت."
      },
      specs: [
        { label: { en: "Floor Area", ar: "مساحة الطابق" }, value: "2,300 m²" },
        { label: { en: "Ceiling Height", ar: "ارتفاع السقف" }, value: "3.2m" },
        { label: { en: "Total GFA", ar: "إجمالي المساحة" }, value: "195,000 m²" },
        { label: { en: "Efficiency", ar: "الكفاءة" }, value: "85%" },
      ],
    },
    {
      id: "fiber",
      position: { x: "calc(50% + 140px)", y: "52%" },
      title: { en: "FIBER OPTIC", ar: "ألياف ضوئية" },
      subtitle: { en: "BACKBONE", ar: "العمود الفقري" },
      side: "right" as const,
      description: {
        en: "State-of-the-art fiber optic infrastructure provides ultra-high-speed connectivity throughout the building, supporting modern business requirements with redundant pathways.",
        ar: "توفر البنية التحتية للألياف الضوئية المتطورة اتصالاً فائق السرعة في جميع أنحاء المبنى، مما يدعم متطلبات الأعمال الحديثة مع مسارات احتياطية."
      },
      specs: [
        { label: { en: "Bandwidth", ar: "عرض النطاق" }, value: "10 Gbps" },
        { label: { en: "Redundancy", ar: "التكرار" }, value: "Dual Path" },
        { label: { en: "Latency", ar: "زمن الوصول" }, value: "<1ms" },
        { label: { en: "Coverage", ar: "التغطية" }, value: "100%" },
      ],
    },
    {
      id: "power",
      position: { x: "calc(50% - 180px)", y: "68%" },
      title: { en: "DUAL POWER", ar: "طاقة مزدوجة" },
      subtitle: { en: "REDUNDANCY", ar: "التكرار" },
      side: "left" as const,
      description: {
        en: "Dual independent power feeds from separate substations ensure uninterrupted operations. Backup generators provide 12 hours of emergency power for critical systems.",
        ar: "تضمن التغذية الكهربائية المزدوجة المستقلة من محطات فرعية منفصلة عمليات متواصلة. توفر المولدات الاحتياطية 12 ساعة من الطاقة الطارئة للأنظمة الحيوية."
      },
      specs: [
        { label: { en: "Power Feeds", ar: "خطوط الطاقة" }, value: "2x" },
        { label: { en: "Backup Duration", ar: "مدة الاحتياطي" }, value: "12 Hours" },
        { label: { en: "Load Capacity", ar: "سعة الحمل" }, value: "25 MVA" },
        { label: { en: "UPS Coverage", ar: "تغطية UPS" }, value: "100%" },
      ],
    },
  ];

  const selectedHotspotData = hotspots.find(h => h.id === selectedHotspot);

  return (
    <div className="relative min-h-screen w-full overflow-y-auto">
      {/* Header - Fixed at top */}
      <Header />

      {/* Tower Image Container - Shows full image */}
      <div className="relative pt-20 pb-24">
        <img
          src={towerBackground}
          alt="Al Hamra Tower"
          className="w-full h-auto object-contain"
          style={{ imageRendering: "crisp-edges" }}
        />
        {/* Light overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40 pointer-events-none" />
      </div>

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
          onClick={() => setSelectedHotspot(hotspot.id)}
        />
      ))}

      {/* Hotspot Detail Modal */}
      <HotspotDetailModal
        isOpen={!!selectedHotspot}
        onClose={() => setSelectedHotspot(null)}
        hotspot={selectedHotspotData || null}
        language={language}
      />

      {/* System Vitality Panel (Left) */}
      <SystemVitalityPanel language={language} />

      {/* Network Status Panel (Right) */}
      <NetworkStatusPanel language={language} />

      {/* Footer Navigation */}
      <DashboardFooter language={language} />
    </div>
  );
};

export default Dashboard;
