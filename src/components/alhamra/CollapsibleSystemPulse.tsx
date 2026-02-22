import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { Wifi, Zap, TrendingUp, ChevronLeft, ChevronRight, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CollapsibleSystemPulse = () => {
  const { language, dir } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { count: savingsCount, ref: savingsRef } = useCountUp({ end: 2.4, duration: 2500, decimals: 1 });
  const { count: backupCount, ref: backupRef } = useCountUp({ end: 12, duration: 2000 });

  const metrics = [
    {
      id: "connectivity", icon: Wifi,
      label: { en: "Connectivity", ar: "الاتصال" },
      status: { en: "Dual Fiber Active", ar: "ألياف مزدوجة نشطة" },
      detail: { en: "All Major ISPs", ar: "جميع مزودي الخدمة" },
      value: 100,
    },
    {
      id: "power", icon: Zap,
      label: { en: "Backup Power", ar: "الطاقة الاحتياطية" },
      status: { en: "Full Capacity", ar: "سعة كاملة" },
      detail: { en: "Redundant Generators", ar: "مولدات احتياطية" },
      isBackup: true,
    },
    {
      id: "savings", icon: TrendingUp,
      label: { en: "Cost Efficiency", ar: "كفاءة التكلفة" },
      status: { en: "Annual Savings", ar: "التوفير السنوي" },
      isSavings: true,
    },
  ];

  const CollapseIcon = dir === "rtl" 
    ? (isCollapsed ? ChevronLeft : ChevronRight) 
    : (isCollapsed ? ChevronRight : ChevronLeft);

  return (
    <motion.aside
      initial={{ opacity: 0, x: dir === "rtl" ? -50 : 50 }}
      animate={{ opacity: 1, x: 0, width: isCollapsed ? "auto" : "18rem" }}
      transition={{ duration: 0.4 }}
      className={`fixed top-1/2 -translate-y-1/2 z-40 hidden lg:block ${
        dir === "rtl" ? "left-4" : "right-4"
      }`}
    >
      <div className="relative liquid-glass bg-background/90 shadow-xl">
        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute top-1/2 -translate-y-1/2 w-6 h-12 bg-background/90 border border-silk-gold/20 flex items-center justify-center hover:bg-silk-gold/10 transition-colors rounded-sm ${
            dir === "rtl" ? "right-full border-r-0" : "left-full border-l-0"
          }`}
          aria-label={isCollapsed ? "Expand panel" : "Collapse panel"}
        >
          <CollapseIcon className="w-4 h-4 text-champagne" />
        </button>

        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.div key="collapsed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4">
              <div className="flex flex-col items-center gap-3">
                <Activity className="w-5 h-5 text-silk-gold" />
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-green-500" />
              </div>
            </motion.div>
          ) : (
            <motion.div key="expanded" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 space-y-6">
              {/* Header */}
              <div className="border-b border-silk-gold/15 pb-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-champagne mb-1">
                  {language === "en" ? "System Pulse" : "نبض النظام"}
                </h3>
                <p className="text-sm text-foreground font-light">
                  {language === "en" ? "Smart Infrastructure" : "البنية التحتية الذكية"}
                </p>
              </div>

              {/* Metrics */}
              <div className="space-y-5">
                {metrics.map((metric, index) => {
                  const IconComponent = metric.icon;
                  return (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 flex items-center justify-center bg-silk-gold/10 border border-silk-gold/15 rounded-lg">
                            <IconComponent className="w-4 h-4 text-silk-gold" />
                          </div>
                          <span className="text-sm text-foreground">{metric.label[language]}</span>
                        </div>
                        {metric.value && (
                          <span className="text-xs text-green-500 font-medium">{metric.status[language]}</span>
                        )}
                      </div>

                      {metric.id === "connectivity" && (
                        <div className="space-y-1">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((bar) => (
                              <motion.div key={bar} initial={{ height: 4 }} animate={{ height: 4 + bar * 4 }} transition={{ duration: 0.3, delay: 0.2 + bar * 0.1 }} className="flex-1 bg-green-500 rounded-sm" />
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground">{metric.detail[language]}</p>
                        </div>
                      )}

                      {metric.isBackup && (
                        <div ref={backupRef} className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Progress value={(backupCount / 12) * 100} className="h-2 flex-1" />
                            <span className="text-sm font-medium text-foreground tabular-nums">{backupCount}h</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{metric.detail[language]}</p>
                        </div>
                      )}

                      {metric.isSavings && (
                        <div ref={savingsRef} className="space-y-1">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-light text-silk-gold tabular-nums">{savingsCount}</span>
                            <span className="text-sm text-muted-foreground">{language === "en" ? "Million KWD" : "مليون د.ك"}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{language === "en" ? "Saved for public/private budgets" : "تم توفيرها للميزانيات العامة/الخاصة"}</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Live Indicator */}
              <div className="border-t border-silk-gold/15 pt-4 flex items-center gap-2">
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs text-muted-foreground">{language === "en" ? "All Systems Operational" : "جميع الأنظمة تعمل"}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

export default CollapsibleSystemPulse;
