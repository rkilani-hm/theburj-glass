import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { ShoppingBag, Train, Coffee, MapPin } from "lucide-react";
import towerAerialDay from "@/assets/tower-aerial-day.png";
import cityLandscape from "@/assets/city-landscape.jpg";
import waterfrontPromenade from "@/assets/waterfront-promenade.jpg";
import skylineParkPanorama from "@/assets/skyline-park-panorama.jpg";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";

const Connectivity = () => {
  const { language } = useLanguage();
  const { ref: heroRef, isInView: heroInView } = useScrollReveal();
  const { ref: integrationsRef, isInView: integrationsInView } = useScrollReveal();
  const { ref: districtRef, isInView: districtInView } = useScrollReveal();

  const integrations = [
    {
      icon: ShoppingBag,
      title: language === "en" ? "Al Hamra Shopping Center" : "مركز الحمراء التجاري",
      desc: language === "en"
        ? "Direct internal access to a premium retail destination featuring international brands, dining, and lifestyle services — all within the Al Hamra complex."
        : "وصول داخلي مباشر إلى وجهة تسوق متميزة تضم علامات تجارية عالمية ومطاعم وخدمات أسلوب حياة.",
    },
    {
      icon: Coffee,
      title: language === "en" ? "On-Site Amenities" : "المرافق الداخلية",
      desc: language === "en"
        ? "Ground-floor cafés, restaurants, banking services, and business support facilities ensure daily convenience without leaving the complex."
        : "مقاهي ومطاعم وخدمات مصرفية ومرافق دعم أعمال في الطابق الأرضي تضمن الراحة اليومية.",
    },
    {
      icon: Train,
      title: language === "en" ? "Transport Links" : "روابط النقل",
      desc: language === "en"
        ? "Proximity to major arterial roads and Kuwait's developing public transit infrastructure. 11-level car park with 1,100+ spaces and dedicated VIP access."
        : "قرب من الطرق الشريانية الرئيسية والبنية التحتية للنقل العام. موقف سيارات من 11 طابقاً بأكثر من 1,100 مكان.",
    },
    {
      icon: MapPin,
      title: language === "en" ? "District Integration" : "تكامل المنطقة",
      desc: language === "en"
        ? "Positioned in Sharq, Kuwait City's central business district, within walking distance of government ministries, embassies, and the financial corridor."
        : "يقع في منطقة شرق، حي الأعمال المركزي في مدينة الكويت، على مسافة قريبة من الوزارات والسفارات.",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-background relative">
          <div className="py-section texture-noise">
            <div className="container mx-auto px-6 lg:px-12">
              <motion.div
                ref={heroRef}
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-border" />
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">04</span>
                </div>
                <h1 className="text-headline font-light tracking-wide text-foreground mb-8">
                  {language === "en" ? "Connectivity & Integration" : "الاتصال والتكامل"}
                </h1>
                <p className="text-body-lg text-muted-foreground max-w-2xl">
                  {language === "en"
                    ? "Al Hamra Tower is more than an office building — it is the center of a fully integrated urban district connecting retail, dining, transport, and government infrastructure."
                    : "برج الحمراء أكثر من مبنى مكاتب — إنه مركز منطقة حضرية متكاملة تربط التجزئة والمطاعم والنقل والبنية الحكومية."}
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16 items-center mt-12">
                <motion.div
                  initial="hidden"
                  animate={heroInView ? "visible" : "hidden"}
                  variants={revealVariants.slideLeft}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-6"
                >
                  <p className="text-body-lg text-muted-foreground leading-relaxed">
                    {language === "en"
                      ? "The Al Hamra complex integrates a premier shopping center, extensive car parking, and direct connections to Kuwait City's central business corridor — creating a self-contained environment for professionals."
                      : "يدمج مجمع الحمراء مركز تسوق رائد ومواقف سيارات واسعة واتصالات مباشرة بممر الأعمال المركزي في مدينة الكويت."}
                  </p>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {language === "en"
                      ? "With 1,100+ parking spaces across 11 levels, VIP drop-off zones, and proximity to Kuwait's key government institutions, the tower ensures frictionless daily operations for tenants and visitors alike."
                      : "مع أكثر من 1,100 موقف سيارات عبر 11 طابقاً ومناطق إنزال كبار الشخصيات والقرب من المؤسسات الحكومية الرئيسية."}
                  </p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate={heroInView ? "visible" : "hidden"}
                  variants={revealVariants.slideRight}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="aspect-[3/4] overflow-hidden group">
                    <img src={towerAerialDay} alt="Tower aerial view" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="aspect-[3/4] overflow-hidden group mt-8">
                    <img src={cityLandscape} alt="Kuwait city landscape" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Cards */}
        <section className="py-section bg-secondary">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={integrationsRef}
              initial="hidden"
              animate={integrationsInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-subheadline font-light tracking-wide text-foreground mb-6">
                {language === "en" ? "Integrated Ecosystem" : "نظام بيئي متكامل"}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {integrations.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={integrationsInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="p-8 bg-background border border-border hover:border-foreground transition-all duration-300 group"
                >
                  <div className="w-14 h-14 border border-border flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                    <item.icon size={24} className="text-muted-foreground transition-colors duration-300 group-hover:text-background" />
                  </div>
                  <h4 className="text-lg font-medium text-foreground mb-3">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* District Context Gallery */}
        <section className="py-section bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={districtRef}
              initial="hidden"
              animate={districtInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-subheadline font-light tracking-wide text-foreground mb-6">
                {language === "en" ? "The Sharq District" : "منطقة شرق"}
              </h2>
              <p className="text-body text-muted-foreground max-w-2xl">
                {language === "en"
                  ? "Kuwait City's commercial heart — where governance, commerce, and culture converge."
                  : "قلب مدينة الكويت التجاري — حيث تتلاقى الحوكمة والتجارة والثقافة."}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div
                initial="hidden"
                animate={districtInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="aspect-[16/9] overflow-hidden group"
              >
                <img src={waterfrontPromenade} alt="Kuwait waterfront promenade" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
              <motion.div
                initial="hidden"
                animate={districtInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="aspect-[16/9] overflow-hidden group"
              >
                <img src={skylineParkPanorama} alt="Kuwait City panorama" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
            </div>

            {/* District Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {[
                { value: "1,100+", label: language === "en" ? "Parking Spaces" : "مواقف سيارات" },
                { value: "11", label: language === "en" ? "Parking Levels" : "طوابق مواقف" },
                { value: "200+", label: language === "en" ? "Retail Outlets" : "محل تجاري" },
                { value: "5 min", label: language === "en" ? "To Government District" : "إلى الحي الحكومي" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={districtInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl lg:text-4xl font-light text-foreground mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Connectivity;
