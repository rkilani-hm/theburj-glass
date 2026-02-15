import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, FileText, Image, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import officeCorridor from "@/assets/office-corridor.jpg";
import cityViewInterior from "@/assets/city-view-interior.jpg";
import towerTopClouds from "@/assets/tower-top-clouds.png";
import cityLandscape from "@/assets/city-landscape.jpg";

const Downloads = () => {
  const { language } = useLanguage();
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();

  const downloadItems = [
    {
      icon: FileText,
      title: language === "en" ? "Corporate Brochure" : "كتيب الشركة",
      desc: language === "en" ? "Complete overview of Al Hamra Tower — architecture, services, and leasing information." : "نظرة شاملة على برج الحمراء — الهندسة المعمارية والخدمات ومعلومات التأجير.",
      format: "PDF • 12 MB",
    },
    {
      icon: Image,
      title: language === "en" ? "Floor Plans" : "مخططات الطوابق",
      desc: language === "en" ? "Detailed floor plan layouts for executive, full-floor, and corporate headquarters configurations." : "مخططات تفصيلية للطوابق للتكوينات التنفيذية والطابق الكامل ومقار الشركات.",
      format: "PDF • 8 MB",
    },
    {
      icon: BookOpen,
      title: language === "en" ? "Media Kit" : "الملف الإعلامي",
      desc: language === "en" ? "High-resolution images, logos, and press materials for media use." : "صور عالية الدقة وشعارات ومواد صحفية للاستخدام الإعلامي.",
      format: "ZIP • 45 MB",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        <section className="py-20 lg:py-32 bg-background texture-noise">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={headerRef}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-border" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">03</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-8">
                {language === "en" ? "Downloads" : "التنزيلات"}
              </h1>
              <p className="text-body-lg text-muted-foreground max-w-2xl">
                {language === "en"
                  ? "Access brochures, floor plans, and media materials for Al Hamra Tower."
                  : "الوصول إلى الكتيبات ومخططات الطوابق والمواد الإعلامية لبرج الحمراء."}
              </p>
            </motion.div>

            <div className="space-y-0">
              {downloadItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={headerInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="group border-t border-border py-10 first:border-t-0"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-1">
                      <div className="w-12 h-12 border border-border flex items-center justify-center transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                        <item.icon size={20} className="text-muted-foreground transition-colors duration-300 group-hover:text-background" />
                      </div>
                    </div>
                    <div className="lg:col-span-4">
                      <h3 className="text-xl font-medium text-foreground mb-1">{item.title}</h3>
                      <span className="text-xs text-muted-foreground/70 tracking-wider">{item.format}</span>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="lg:col-span-2 flex justify-end">
                      <button className="group/btn flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-[0.15em] hover:bg-primary/90 transition-all duration-300">
                        <span>{language === "en" ? "Download" : "تحميل"}</span>
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-24 lg:py-32 bg-secondary">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl lg:text-4xl font-light tracking-tight mb-12">
              {language === "en" ? "Workspace Gallery" : "معرض مساحات العمل"}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[officeCorridor, cityViewInterior, towerTopClouds].map((src, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="aspect-[4/3] overflow-hidden group relative">
                  <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-6 aspect-[21/9] overflow-hidden group relative">
              <img src={cityLandscape} alt="Kuwait City landscape" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Downloads;
