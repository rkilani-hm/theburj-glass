import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import towerVertical from "@/assets/som-tower-vertical.jpg";
import { Mountain, Layers, Building2 } from "lucide-react";

interface TabData {
  id: string;
  icon: React.ElementType;
  label: { en: string; ar: string };
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  description: { en: string; ar: string };
  stats: {
    value: string;
    label: { en: string; ar: string };
  }[];
  imagePosition: { top: string; height: string };
}

const tabsData: TabData[] = [
  {
    id: "apex",
    icon: Mountain,
    label: { en: "The Apex", ar: "القمة" },
    title: { en: "The Apex", ar: "القمة" },
    subtitle: { en: "Approx. 412–413 meters", ar: "حوالي ٤١٢-٤١٣ متر" },
    description: {
      en: "One of the tallest towers in the region. The crown features the distinctive carved geometry that defines Al Hamra's silhouette against the Arabian Gulf skyline.",
      ar: "أحد أطول الأبراج في المنطقة. يتميز التاج بالهندسة المنحوتة المميزة التي تحدد صورة الحمراء على أفق الخليج العربي."
    },
    stats: [
      { value: "~413m", label: { en: "Total Height", ar: "الارتفاع الكلي" } },
      { value: "#1", label: { en: "Tallest in Kuwait", ar: "الأطول في الكويت" } },
      { value: "24m", label: { en: "Lobby Height", ar: "ارتفاع الردهة" } },
    ],
    imagePosition: { top: "0%", height: "35%" },
  },
  {
    id: "core",
    icon: Layers,
    label: { en: "The Core", ar: "القلب" },
    title: { en: "The Core", ar: "القلب" },
    subtitle: { en: "Largest office floor area in Kuwait City", ar: "أكبر مساحة طابق مكتبي في مدينة الكويت" },
    description: {
      en: "Efficient floor plates allow flexible configurations suitable for single-tenant headquarters or multi-tenant layouts. Each floor offers unobstructed panoramic views of Kuwait City and the Arabian Gulf.",
      ar: "تسمح الطوابق الفعالة بتكوينات مرنة مناسبة لمقرات المستأجر الواحد أو التخطيطات متعددة المستأجرين. يوفر كل طابق إطلالات بانورامية غير محجوبة على مدينة الكويت والخليج العربي."
    },
    stats: [
      { value: "~2,300", label: { en: "sqm Build-Up", ar: "م² مساحة بناء" } },
      { value: "~1,750", label: { en: "sqm Leasable", ar: "م² قابلة للتأجير" } },
      { value: "3", label: { en: "Sky Lobbies", ar: "بهو سماوي" } },
    ],
    imagePosition: { top: "25%", height: "45%" },
  },
  {
    id: "foundation",
    icon: Building2,
    label: { en: "The Foundation", ar: "الأساس" },
    title: { en: "The Foundation", ar: "الأساس" },
    subtitle: { en: "Integrated Retail & Lifestyle", ar: "تجزئة ونمط حياة متكامل" },
    description: {
      en: "Integrated with Al Hamra retail and lifestyle destination. Retail, dining, and service amenities within the complex reinforce the tower as a complete professional environment.",
      ar: "متكامل مع وجهة الحمراء للتجزئة ونمط الحياة. تعزز مرافق التجزئة والمطاعم والخدمات ضمن المجمع البرج كبيئة مهنية متكاملة."
    },
    stats: [
      { value: "5", label: { en: "Retail Levels", ar: "طوابق تجزئة" } },
      { value: "11", label: { en: "Parking Floors", ar: "طوابق مواقف" } },
      { value: "24/7", label: { en: "Access", ar: "وصول" } },
    ],
    imagePosition: { top: "65%", height: "35%" },
  },
];

const TowerTabbedDashboard = () => {
  const { language, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState("apex");

  const activeData = tabsData.find(t => t.id === activeTab) || tabsData[0];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden py-16 lg:py-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 architectural-grid" />
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="w-12 h-px bg-border" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {language === "en" ? "Overview" : "نظرة عامة"}
          </span>
          <div className="w-12 h-px bg-border" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-foreground text-center mb-8"
        >
          {language === "en" ? "Al Hamra Business Tower" : "برج الحمراء للأعمال"}
        </motion.h1>

        {/* Main Dashboard Layout */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Triggers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <TabsList className="bg-card border border-border p-1 h-auto flex-wrap">
              {tabsData.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 text-sm transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label[language]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </motion.div>

          {/* Content Area */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Tower Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-sm overflow-hidden shadow-2xl">
                <img
                  src={towerVertical}
                  alt="Al Hamra Tower"
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/30" />
                
                {/* Highlight Zone Indicator */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-0 right-0 pointer-events-none"
                  style={{
                    top: activeData.imagePosition.top,
                    height: activeData.imagePosition.height,
                  }}
                >
                  <div className="absolute inset-0 border-2 border-primary/60 bg-primary/10" />
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
                </motion.div>
              </div>
            </motion.div>

            {/* Data Card */}
            <div className="order-1 lg:order-2">
              <AnimatePresence mode="wait">
                {tabsData.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, x: dir === "rtl" ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: dir === "rtl" ? 30 : -30 }}
                      transition={{ duration: 0.4 }}
                      className="bg-card border border-border p-8 lg:p-10"
                    >
                      {/* Card Header */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground">
                            <tab.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h2 className="text-2xl lg:text-3xl font-light text-foreground">
                              {tab.title[language]}
                            </h2>
                          </div>
                        </div>
                        <p className="text-lg text-primary font-light">
                          {tab.subtitle[language]}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-8">
                        {tab.description[language]}
                      </p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4">
                        {tab.stats.map((stat, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                            className="text-center p-4 bg-secondary/50 border border-border/50"
                          >
                            <p className="text-2xl lg:text-3xl font-light text-foreground tabular-nums">
                              {stat.value}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                              {stat.label[language]}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Accent Line */}
                      <div className={`absolute top-0 ${dir === "rtl" ? "right-0" : "left-0"} w-1 h-full bg-primary`} />
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default TowerTabbedDashboard;
