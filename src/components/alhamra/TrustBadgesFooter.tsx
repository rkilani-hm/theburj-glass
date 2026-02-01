import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Award, Leaf, ShieldCheck } from "lucide-react";

const certifications = [
  {
    icon: Award,
    code: "ISO 9001:2015",
    title: { en: "Quality Management", ar: "إدارة الجودة" },
  },
  {
    icon: Leaf,
    code: "ISO 14001:2015",
    title: { en: "Environmental", ar: "الإدارة البيئية" },
  },
  {
    icon: ShieldCheck,
    code: "ISO 45001:2018",
    title: { en: "Health & Safety", ar: "الصحة والسلامة" },
  },
];

const TrustBadgesFooter = () => {
  const { language } = useLanguage();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-0 left-0 right-0 z-30 bg-card/80 backdrop-blur-md border-t border-border"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Label */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {language === "en" ? "Certified Excellence" : "التميز المعتمد"}
            </span>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-6">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-2 group"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-secondary border border-border group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs font-medium text-foreground">{cert.code}</p>
                    <p className="text-[10px] text-muted-foreground">{cert.title[language]}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-500"
            />
            <span className="text-xs text-muted-foreground">
              {language === "en" ? "Verified 2026" : "موثق ٢٠٢٦"}
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default TrustBadgesFooter;
