import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import kuwaitCinemaHistoric from "@/assets/kuwait-cinema-historic.jpg";
import towerNightIlluminated from "@/assets/tower-night-illuminated.jpg";

const Rising = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms
  const section1Y = useTransform(scrollYProgress, [0, 0.5], ["0%", "-20%"]);
  const section1Opacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const section2Y = useTransform(scrollYProgress, [0.3, 0.7], ["30%", "0%"]);
  const section2Opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  const heritageContent = {
    en: {
      label: "01 — THE HERITAGE",
      title: "Where It All Began",
      year: "1958",
      p1: "In 1958, at the height of Kuwait's cultural renaissance, Al Hamra Cinema opened its doors on this very ground. It was more than a theater—it was a gathering place for a nation finding its modern voice.",
      p2: "For decades, families gathered beneath its grand marquee, sharing stories and dreams. The cinema became synonymous with Kuwait's golden age of arts and community.",
      p3: "When the final curtain fell, the land waited. It knew its next chapter would be equally transformative."
    },
    ar: {
      label: "٠١ — التراث",
      title: "حيث بدأ كل شيء",
      year: "١٩٥٨",
      p1: "في عام ١٩٥٨، في ذروة النهضة الثقافية الكويتية، فتحت سينما الحمراء أبوابها على هذه الأرض. لم تكن مجرد مسرح - بل كانت مكان تجمع لأمة تجد صوتها الحديث.",
      p2: "لعقود، تجمعت العائلات تحت لافتتها الكبيرة، يتشاركون القصص والأحلام. أصبحت السينما مرادفة للعصر الذهبي للفنون والمجتمع في الكويت.",
      p3: "عندما أُسدل الستار الأخير، انتظرت الأرض. كانت تعلم أن فصلها القادم سيكون بنفس القدر من التحول."
    }
  };

  const towerContent = {
    en: {
      label: "02 — THE TWISTED ICON",
      title: "Rising Above",
      stat1: { value: "413", unit: "M", label: "HEIGHT" },
      stat2: { value: "80", unit: "", label: "FLOORS" },
      stat3: { value: "2011", unit: "", label: "COMPLETED" },
      p1: "From the same ground that once hosted Kuwait's beloved cinema, Al Hamra Tower now rises 413 meters into the sky—the tallest sculpted tower in the world.",
      p2: "Its iconic twisted form, carved by wind and light, houses 80 floors of premium office space. The tower has become Kuwait's definitive business address, where global enterprises and local champions converge.",
      p3: "A testament to architectural ambition and engineering precision, Al Hamra stands as a bridge between Kuwait's cherished past and its boundless future."
    },
    ar: {
      label: "٠٢ — الأيقونة الملتوية",
      title: "الارتقاء",
      stat1: { value: "٤١٣", unit: "م", label: "الارتفاع" },
      stat2: { value: "٨٠", unit: "", label: "طابق" },
      stat3: { value: "٢٠١١", unit: "", label: "الاكتمال" },
      p1: "من نفس الأرض التي استضافت يوماً سينما الكويت المحبوبة، يرتفع برج الحمراء الآن ٤١٣ متراً في السماء—أطول برج منحوت في العالم.",
      p2: "شكله الأيقوني الملتوي، المنحوت بالرياح والضوء، يضم ٨٠ طابقاً من المساحات المكتبية الفاخرة. أصبح البرج العنوان التجاري الأول في الكويت، حيث تلتقي المؤسسات العالمية والأبطال المحليون.",
      p3: "شاهد على الطموح المعماري والدقة الهندسية، يقف الحمراء جسراً بين ماضي الكويت العزيز ومستقبلها اللامحدود."
    }
  };

  const t = language === "ar" ? heritageContent.ar : heritageContent.en;
  const t2 = language === "ar" ? towerContent.ar : towerContent.en;
  const isRTL = language === "ar";

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      
      <div ref={containerRef} className="relative" style={{ height: "200vh" }}>
        {/* Section 1: The Heritage */}
        <motion.section 
          className="fixed inset-0 w-full h-screen pt-20"
          style={{ y: section1Y, opacity: section1Opacity }}
        >
          {/* Grayscale Background */}
          <div className="absolute inset-0">
            <img 
              src={kuwaitCinemaHistoric}
              alt="Al Hamra Cinema 1958"
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Content Card - Left Side */}
          <div className={`relative z-10 h-full flex items-center ${isRTL ? 'justify-end pr-8 lg:pr-24' : 'justify-start pl-8 lg:pl-24'}`}>
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-xl bg-black/70 backdrop-blur-sm p-8 lg:p-12 border-l-4"
              style={{ borderColor: "#E31E24" }}
              dir={isRTL ? "rtl" : "ltr"}
            >
              <span className="text-xs tracking-[0.3em] text-white/60 uppercase">
                {t.label}
              </span>
              
              <div className="mt-6 flex items-baseline gap-4">
                <span 
                  className="text-7xl lg:text-9xl font-light"
                  style={{ color: "#E31E24" }}
                >
                  {t.year}
                </span>
              </div>

              <h2 className="mt-6 text-3xl lg:text-4xl font-light text-white tracking-wide">
                {t.title}
              </h2>

              <div className="mt-8 space-y-4">
                <p className="text-white/80 leading-relaxed">
                  {t.p1}
                </p>
                <p className="text-white/70 leading-relaxed text-sm">
                  {t.p2}
                </p>
                <p className="text-white/60 leading-relaxed text-sm italic">
                  {t.p3}
                </p>
              </div>

              {/* Scroll Indicator */}
              <motion.div 
                className="mt-12 flex items-center gap-3 text-white/40"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-px h-8 bg-white/30" />
                <span className="text-xs tracking-widest uppercase">Scroll to evolve</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 2: The Twisted Icon */}
        <motion.section 
          className="fixed inset-0 w-full h-screen pt-20"
          style={{ y: section2Y, opacity: section2Opacity }}
        >
          {/* Tower Background */}
          <div className="absolute inset-0">
            <img 
              src={towerNightIlluminated}
              alt="Al Hamra Tower at Night"
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-transparent via-transparent to-white/90`} />
          </div>

          {/* Content Card - Right Side */}
          <div className={`relative z-10 h-full flex items-center ${isRTL ? 'justify-start pl-8 lg:pl-24' : 'justify-end pr-8 lg:pr-24'}`}>
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl bg-white p-8 lg:p-12 shadow-2xl"
              dir={isRTL ? "rtl" : "ltr"}
            >
              <span 
                className="text-xs tracking-[0.3em] uppercase"
                style={{ color: "#E31E24" }}
              >
                {t2.label}
              </span>

              <h2 className="mt-6 text-3xl lg:text-4xl font-light text-black tracking-wide">
                {t2.title}
              </h2>

              {/* Stats Row */}
              <div className="mt-8 grid grid-cols-3 gap-6 py-6 border-y border-black/10">
                {[t2.stat1, t2.stat2, t2.stat3].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl lg:text-4xl font-light text-black">
                        {stat.value}
                      </span>
                      {stat.unit && (
                        <span className="text-sm text-black/60">{stat.unit}</span>
                      )}
                    </div>
                    <span className="text-[10px] tracking-[0.2em] text-black/50 uppercase mt-1 block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <p className="text-black/80 leading-relaxed">
                  {t2.p1}
                </p>
                <p className="text-black/70 leading-relaxed text-sm">
                  {t2.p2}
                </p>
                <p className="text-black/60 leading-relaxed text-sm">
                  {t2.p3}
                </p>
              </div>

              {/* Red Accent Line */}
              <div 
                className="mt-8 h-1 w-16"
                style={{ backgroundColor: "#E31E24" }}
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Progress Indicator */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
          <div className="flex flex-col items-center gap-4">
            <motion.div 
              className="w-2 h-2 rounded-full border border-white/50"
              style={{ 
                backgroundColor: useTransform(scrollYProgress, [0, 0.5], ["#E31E24", "transparent"])
              }}
            />
            <div className="w-px h-16 bg-white/20" />
            <motion.div 
              className="w-2 h-2 rounded-full border border-white/50"
              style={{ 
                backgroundColor: useTransform(scrollYProgress, [0.5, 1], ["transparent", "#E31E24"])
              }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Rising;
