import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { Maximize2, Layers, Settings, LayoutGrid } from "lucide-react";
import lobbyArches from "@/assets/lobby-arches.jpg";
import cityViewInterior from "@/assets/city-view-interior.jpg";
import officeCorridor from "@/assets/office-corridor.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";

const OfficeSpaces = () => {
  const { language } = useLanguage();
  const { ref: heroRef, isInView: heroInView } = useScrollReveal();
  const { ref: plansRef, isInView: plansInView } = useScrollReveal();
  const { ref: flexRef, isInView: flexInView } = useScrollReveal();

  const floorConfigurations = [
    {
      number: "01",
      title: language === "en" ? "Executive Suite" : "جناح تنفيذي",
      size: "250 – 500",
      unit: language === "en" ? "SQM" : "م²",
      desc: language === "en"
        ? "Corner positions with panoramic Gulf views. Private reception and executive amenities."
        : "مواقع ركنية مع إطلالات بانورامية على الخليج. استقبال خاص ومرافق تنفيذية.",
    },
    {
      number: "02",
      title: language === "en" ? "Full Floor Headquarters" : "مقر طابق كامل",
      size: "1,200 – 1,800",
      unit: language === "en" ? "SQM" : "م²",
      desc: language === "en"
        ? "Entire floor plates with dedicated elevator lobbies and 360° views. Full branding integration."
        : "طوابق كاملة مع ردهات مصاعد مخصصة وإطلالات 360 درجة. تكامل كامل للعلامة التجارية.",
    },
    {
      number: "03",
      title: language === "en" ? "Multi-Floor Corporate Campus" : "حرم مؤسسي متعدد الطوابق",
      size: "3,000+",
      unit: language === "en" ? "SQM" : "م²",
      desc: language === "en"
        ? "Contiguous multi-floor configurations with internal staircases, dedicated reception, and signage rights."
        : "تكوينات متعددة الطوابق متصلة مع سلالم داخلية واستقبال مخصص وحقوق لافتات.",
    },
  ];

  const flexibilityFeatures = [
    {
      icon: Maximize2,
      title: language === "en" ? "Column-Free Layouts" : "تخطيطات بدون أعمدة",
      desc: language === "en"
        ? "Open floor plates with minimal structural columns allow maximum flexibility in space planning and furniture layouts."
        : "طوابق مفتوحة بأعمدة هيكلية قليلة تتيح أقصى مرونة في تخطيط المساحات.",
    },
    {
      icon: Layers,
      title: language === "en" ? "3.2m Ceiling Heights" : "ارتفاع سقف 3.2 متر",
      desc: language === "en"
        ? "Generous floor-to-ceiling heights create a sense of openness and allow for raised flooring and suspended ceiling systems."
        : "ارتفاعات سخية من الأرض إلى السقف تخلق إحساسًا بالانفتاح وتسمح بأنظمة الأرضيات المرتفعة.",
    },
    {
      icon: Settings,
      title: language === "en" ? "Fit-Out Support" : "دعم التجهيز",
      desc: language === "en"
        ? "Dedicated project management for tenant fit-outs. Shell-and-core or fully finished options available."
        : "إدارة مشاريع مخصصة لتجهيزات المستأجرين. خيارات هيكل أساسي أو تشطيب كامل.",
    },
    {
      icon: LayoutGrid,
      title: language === "en" ? "Modular Partitioning" : "تقسيم معياري",
      desc: language === "en"
        ? "Pre-engineered partition grid allows rapid reconfiguration as teams grow or organizational needs evolve."
        : "شبكة أقسام مهندسة مسبقًا تتيح إعادة التكوين السريع مع نمو الفرق.",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-section bg-secondary">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={heroRef}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-border" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">02</span>
              </div>
              <h1 className="text-headline font-light tracking-wide text-foreground mb-6">
                {language === "en" ? "Office Spaces & Floor Plans" : "المساحات المكتبية ومخططات الطوابق"}
              </h1>
              <p className="text-body-lg text-muted-foreground max-w-2xl">
                {language === "en"
                  ? "Flexible configurations from executive suites to full-floor headquarters. Every layout is designed around natural light, panoramic views, and operational efficiency."
                  : "تكوينات مرنة من الأجنحة التنفيذية إلى المقرات الكاملة. كل تخطيط مصمم حول الضوء الطبيعي والإطلالات البانورامية والكفاءة التشغيلية."}
              </p>
            </motion.div>

            {/* Interior Showcase Strip */}
            <div className="grid lg:grid-cols-2 gap-6 mb-20">
              <motion.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="aspect-[16/9] overflow-hidden group"
              >
                <img src={cityViewInterior} alt="Executive office with city views" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
              <motion.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="aspect-[16/9] overflow-hidden group"
              >
                <img src={officeCorridor} alt="Premium office corridor" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Floor Configurations - Editorial List */}
        <section className="py-section bg-background texture-noise">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={plansRef}
              initial="hidden"
              animate={plansInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-16 max-w-3xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-px bg-border" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {language === "en" ? "Configurations" : "التكوينات"}
                </span>
              </div>
              <h2 className="text-subheadline font-light tracking-wide text-foreground mb-6">
                {language === "en" ? "Space Configurations" : "تكوينات المساحات"}
              </h2>
              <p className="text-body-lg text-muted-foreground">
                {language === "en"
                  ? "Flexible configurations designed to accommodate businesses of every scale, from boutique operations to multinational headquarters."
                  : "تكوينات مرنة مصممة لاستيعاب الأعمال من كل حجم، من العمليات الصغيرة إلى المقرات المتعددة الجنسيات."}
              </p>
            </motion.div>

            <div className="space-y-0">
              {floorConfigurations.map((plan, index) => (
                <motion.div
                  key={plan.number}
                  initial="hidden"
                  animate={plansInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="group border-t border-border py-12 first:border-t-0"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-1">
                      <span className="text-xs text-muted-foreground tracking-wider">{plan.number}</span>
                    </div>
                    <div className="lg:col-span-4">
                      <h3 className="text-2xl lg:text-3xl font-light tracking-tight mb-3 group-hover:text-foreground/80 transition-colors duration-300">
                        {plan.title}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg text-muted-foreground">{plan.size}</span>
                        <span className="text-sm text-muted-foreground/70">{plan.unit}</span>
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="text-sm text-muted-foreground leading-relaxed">{plan.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              animate={plansInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 pt-12 border-t border-border"
            >
              <p className="text-sm text-muted-foreground max-w-2xl">
                {language === "en"
                  ? "All configurations are subject to availability and can be customized to meet specific operational requirements. Contact our leasing team for detailed floor plans and specifications."
                  : "جميع التكوينات خاضعة للتوفر ويمكن تخصيصها لتلبية المتطلبات التشغيلية المحددة. تواصل مع فريق التأجير للحصول على مخططات تفصيلية."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Flexibility & Fit-Out */}
        <section className="py-section bg-secondary">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={flexRef}
              initial="hidden"
              animate={flexInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-subheadline font-light tracking-wide text-foreground mb-6">
                {language === "en" ? "Flexibility & Fit-Out" : "المرونة والتجهيز"}
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl">
                {language === "en"
                  ? "Workspaces designed to adapt. From shell-and-core to fully finished environments, every detail supports your operational vision."
                  : "مساحات عمل مصممة للتكيف. من الهيكل الأساسي إلى البيئات المكتملة التجهيز، كل تفصيل يدعم رؤيتك التشغيلية."}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {flexibilityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={flexInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="p-8 bg-background border border-border hover:border-foreground transition-all duration-300 group"
                >
                  <div className="w-14 h-14 border border-border flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                    <feature.icon size={24} className="text-muted-foreground transition-colors duration-300 group-hover:text-background" />
                  </div>
                  <h4 className="text-lg font-medium text-foreground mb-3">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Gallery Row */}
            <div className="grid lg:grid-cols-3 gap-6 mt-16">
              <motion.div
                initial="hidden"
                animate={flexInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="aspect-[4/3] overflow-hidden group"
              >
                <img src={lobbyArches} alt="Grand lobby with lamella arches" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
              <motion.div
                initial="hidden"
                animate={flexInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="aspect-[4/3] overflow-hidden group"
              >
                <img src={interiorLobby} alt="Executive lobby interior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
              <motion.div
                initial="hidden"
                animate={flexInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="aspect-[4/3] overflow-hidden group"
              >
                <img src={cityViewInterior} alt="Premium office space" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OfficeSpaces;
