import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { Wifi, Zap, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SystemPulseSidebar = () => {
  const { language, dir } = useLanguage();
  const { count: savingsCount, ref: savingsRef } = useCountUp({ end: 2.4, duration: 2500, decimals: 1 });
  const { count: backupCount, ref: backupRef } = useCountUp({ end: 12, duration: 2000 });
  
  const metrics = [
    {
      id: "connectivity",
      icon: Wifi,
      label: { en: "Connectivity", ar: "الاتصال" },
      status: { en: "Dual Fiber Active", ar: "ألياف مزدوجة نشطة" },
      detail: { en: "All Major ISPs", ar: "جميع مزودي الخدمة" },
      value: 100,
      color: "bg-green-500",
    },
    {
      id: "power",
      icon: Zap,
      label: { en: "Backup Power", ar: "الطاقة الاحتياطية" },
      status: { en: "Full Capacity", ar: "سعة كاملة" },
      detail: { en: "Redundant Generators", ar: "مولدات احتياطية" },
      value: 100,
      isBackup: true,
    },
    {
      id: "savings",
      icon: TrendingUp,
      label: { en: "Cost Efficiency", ar: "كفاءة التكلفة" },
      status: { en: "Annual Savings", ar: "التوفير السنوي" },
      isSavings: true,
    },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: dir === "rtl" ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`fixed top-1/2 -translate-y-1/2 z-40 w-72 hidden lg:block ${
        dir === "rtl" ? "left-4" : "right-4"
      }`}
    >
      <div className="bg-card/95 backdrop-blur-md border border-border shadow-xl p-6 space-y-6">
        {/* Header */}
        <div className="border-b border-border pb-4">
          <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
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
                transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                className="space-y-2"
              >
                {/* Label Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-secondary border border-border">
                      <IconComponent className="w-4 h-4 text-foreground" />
                    </div>
                    <span className="text-sm text-foreground">{metric.label[language]}</span>
                  </div>
                  {metric.value && (
                    <span className="text-xs text-green-500 font-medium">
                      {metric.status[language]}
                    </span>
                  )}
                </div>

                {/* Connectivity Gauge */}
                {metric.id === "connectivity" && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((bar) => (
                        <motion.div
                          key={bar}
                          initial={{ height: 4 }}
                          animate={{ height: 4 + bar * 4 }}
                          transition={{ duration: 0.3, delay: 0.6 + bar * 0.1 }}
                          className="flex-1 bg-green-500 rounded-sm"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.detail[language]}</p>
                  </div>
                )}

                {/* Power Status */}
                {metric.isBackup && (
                  <div ref={backupRef} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Progress value={(backupCount / 12) * 100} className="h-2 flex-1" />
                      <span className="text-sm font-medium text-foreground tabular-nums">
                        {backupCount}h
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.detail[language]}</p>
                  </div>
                )}

                {/* Savings Counter */}
                {metric.isSavings && (
                  <div ref={savingsRef} className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-light text-primary tabular-nums">
                        {savingsCount}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {language === "en" ? "Million KWD" : "مليون د.ك"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {language === "en" 
                        ? "Saved for public/private budgets" 
                        : "تم توفيرها للميزانيات العامة/الخاصة"}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Live Indicator */}
        <div className="border-t border-border pt-4 flex items-center gap-2">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green-500"
          />
          <span className="text-xs text-muted-foreground">
            {language === "en" ? "All Systems Operational" : "جميع الأنظمة تعمل"}
          </span>
        </div>
      </div>
    </motion.aside>
  );
};

export default SystemPulseSidebar;
