import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Wrench, 
  Shield, 
  Heart, 
  Settings, 
  Droplets, 
  Cpu,
  Users,
  Sparkles,
  Sofa,
  Stethoscope,
  Building2,
  ChevronDown
} from "lucide-react";

interface ServiceCategory {
  id: string;
  icon: React.ElementType;
  title: { en: string; ar: string };
  services: {
    icon: React.ElementType;
    name: { en: string; ar: string };
    desc: { en: string; ar: string };
  }[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "facilities",
    icon: Wrench,
    title: { en: "Facilities Management", ar: "إدارة المرافق" },
    services: [
      { 
        icon: Settings, 
        name: { en: "Engineering", ar: "الهندسة" }, 
        desc: { en: "24/7 mechanical & electrical", ar: "ميكانيكية وكهربائية ٢٤/٧" } 
      },
      { 
        icon: Droplets, 
        name: { en: "Plumbing", ar: "السباكة" }, 
        desc: { en: "Rapid response maintenance", ar: "صيانة سريعة الاستجابة" } 
      },
      { 
        icon: Cpu, 
        name: { en: "BMS Integration", ar: "تكامل BMS" }, 
        desc: { en: "Smart building automation", ar: "أتمتة المبنى الذكي" } 
      },
    ],
  },
  {
    id: "support",
    icon: Shield,
    title: { en: "Support Services", ar: "خدمات الدعم" },
    services: [
      { 
        icon: Users, 
        name: { en: "Security", ar: "الأمن" }, 
        desc: { en: "Professional 24/7 monitoring", ar: "مراقبة احترافية ٢٤/٧" } 
      },
      { 
        icon: Sparkles, 
        name: { en: "Floor Polishing", ar: "تلميع الأرضيات" }, 
        desc: { en: "Premium marble care", ar: "عناية بالرخام الفاخر" } 
      },
      { 
        icon: Sofa, 
        name: { en: "Furniture Cleaning", ar: "تنظيف الأثاث" }, 
        desc: { en: "Professional upholstery care", ar: "عناية احترافية بالمفروشات" } 
      },
    ],
  },
  {
    id: "wellness",
    icon: Heart,
    title: { en: "Wellness", ar: "الصحة" },
    services: [
      { 
        icon: Stethoscope, 
        name: { en: "Emergency Clinic", ar: "عيادة الطوارئ" }, 
        desc: { en: "On-site medical response", ar: "استجابة طبية في الموقع" } 
      },
      { 
        icon: Building2, 
        name: { en: "Health Clinics", ar: "العيادات الصحية" }, 
        desc: { en: "Premium healthcare providers", ar: "مقدمو رعاية صحية متميزون" } 
      },
    ],
  },
];

const ServiceHubDrawers = () => {
  const { language, dir } = useLanguage();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {language === "en" ? "Service Hub" : "مركز الخدمات"}
            </span>
            <div className="w-12 h-px bg-border" />
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-foreground">
            {language === "en" ? "Comprehensive Support" : "دعم شامل"}
          </h2>
        </motion.div>

        {/* Service Categories - Horizontal Layout */}
        <div className="grid md:grid-cols-3 gap-4">
          {serviceCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            const isExpanded = expandedCategory === category.id;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card border border-border"
              >
                {/* Category Header */}
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-secondary/50 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-secondary border border-border">
                      <CategoryIcon className="w-5 h-5 text-foreground" />
                    </div>
                    <h3 className="text-lg font-light text-foreground">
                      {category.title[language]}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>

                {/* Expanded Services */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-3">
                        {category.services.map((service, sIndex) => {
                          const ServiceIcon = service.icon;
                          return (
                            <motion.div
                              key={sIndex}
                              initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: sIndex * 0.1 }}
                              className="flex items-start gap-3 p-3 bg-secondary/50 border border-border/50"
                            >
                              <div className="w-8 h-8 flex items-center justify-center bg-background border border-border flex-shrink-0">
                                <ServiceIcon className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  {service.name[language]}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {service.desc[language]}
                                </p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceHubDrawers;
