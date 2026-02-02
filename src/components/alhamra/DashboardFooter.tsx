import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Shield, Headphones, ArrowLeft } from "lucide-react";

interface DashboardFooterProps {
  language: "en" | "ar";
}

const DashboardFooter = ({ language }: DashboardFooterProps) => {
  const labels = {
    facilities: { en: "FACILITIES MANAGEMENT", ar: "إدارة المرافق" },
    security: { en: "SECURITY PROTOCOLS", ar: "بروتوكولات الأمان" },
    itSupport: { en: "IT SUPPORT SERVICES", ar: "خدمات الدعم الفني" },
    backToTower: { en: "BACK TO TOWER", ar: "العودة للبرج" },
  };

  const buttons = [
    { key: "facilities", icon: Building2, label: labels.facilities },
    { key: "security", icon: Shield, label: labels.security },
    { key: "itSupport", icon: Headphones, label: labels.itSupport },
  ];

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-white/80 backdrop-blur-xl border-t border-slate-200 shadow-lg shadow-slate-200/30">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-2 lg:gap-4">
            {/* Main buttons */}
            <div className="flex items-center gap-2 lg:gap-3 flex-1 overflow-x-auto">
              {buttons.map((button, index) => (
                <motion.button
                  key={button.key}
                  className="flex items-center gap-2 px-3 lg:px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg
                           hover:border-sky-400 hover:bg-sky-50 transition-all duration-300
                           group whitespace-nowrap shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button.icon 
                    size={16} 
                    className="text-slate-500 group-hover:text-sky-600 transition-colors"
                  />
                  <span className="text-[10px] lg:text-xs font-mono uppercase tracking-wider text-slate-600 group-hover:text-sky-600 transition-colors">
                    {button.label[language]}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.3 }}
            >
              <Link
                to="/tower"
                className="flex items-center gap-2 px-4 lg:px-6 py-2.5 bg-sky-500 border border-sky-600 rounded-lg
                         hover:bg-sky-600 transition-all duration-300 group shadow-md shadow-sky-200/50"
              >
                <ArrowLeft 
                  size={16} 
                  className="text-white group-hover:-translate-x-1 transition-transform"
                />
                <span className="text-xs font-mono uppercase tracking-wider text-white">
                  {labels.backToTower[language]}
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardFooter;
