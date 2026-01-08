import Header from "@/components/alhamra/Header";
import HeroSection from "@/components/alhamra/HeroSection";
import Footer from "@/components/alhamra/Footer";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import towerAerialSunset from "@/assets/tower-aerial-sunset.png";
import towerCloudsAerial from "@/assets/tower-clouds-aerial.png";
import kuwaitSkylineNight from "@/assets/kuwait-skyline-night.png";
import towerBwAngle from "@/assets/tower-bw-angle.png";
import skylineTwilight from "@/assets/skyline-twilight.png";

const Home = () => {
  const { t } = useLanguage();
  const { ref: introRef, isInView: introInView } = useScrollReveal();
  const { ref: featuresRef, isInView: featuresInView } = useScrollReveal();
  const { ref: galleryRef, isInView: galleryInView } = useScrollReveal();

  const features = [
    {
      number: "412m",
      label: t("stats.height") || "Height",
      description: t("stats.height.desc") || "Kuwait's tallest structure, dominating the skyline"
    },
    {
      number: "77",
      label: t("stats.floors") || "Floors",
      description: t("stats.floors.desc") || "Premium office and commercial spaces"
    },
    {
      number: "195,000",
      label: t("stats.sqm") || "Square Meters",
      description: t("stats.sqm.desc") || "Of leasable premium space"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />

        {/* Introduction Section */}
        <section className="py-section bg-background texture-noise">
          <div className="container mx-auto px-6 lg:px-12">
            <div ref={introRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial="hidden"
                animate={introInView ? "visible" : "hidden"}
                variants={revealVariants.slideLeft}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-border" />
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {t("home.about") || "About"}
                  </span>
                </div>
                <h2 className="text-headline font-light tracking-wide text-foreground mb-8">
                  {t("home.intro.title") || "An Architectural Marvel"}
                </h2>
                <p className="text-body-lg text-muted-foreground leading-relaxed mb-6">
                  {t("home.intro.p1") || "Al Hamra Tower stands as a testament to visionary architecture and engineering excellence. Its distinctive twisting form is not merely aesthetic—it maximizes natural light while minimizing solar heat gain."}
                </p>
                <p className="text-body text-muted-foreground leading-relaxed mb-8">
                  {t("home.intro.p2") || "Completed in 2011, the tower has redefined Kuwait's commercial landscape, offering world-class amenities in an address of unparalleled prestige."}
                </p>
                <Link 
                  to="/tower" 
                  className="inline-flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors group"
                >
                  <span className="text-sm uppercase tracking-wider">{t("home.explore.tower") || "Explore the Tower"}</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div
                initial="hidden"
                animate={introInView ? "visible" : "hidden"}
                variants={revealVariants.slideRight}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative group"
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={towerAerialSunset}
                    alt="Al Hamra Tower aerial view at sunset"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-border -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-section bg-secondary">
          <div className="container mx-auto px-6 lg:px-12">
            <div ref={featuresRef} className="grid md:grid-cols-3 gap-12 lg:gap-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={featuresInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="text-center lg:text-left"
                >
                  <p className="text-5xl lg:text-6xl font-light text-foreground mb-2 tracking-tight">
                    {feature.number}
                  </p>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    {feature.label}
                  </p>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-section bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={galleryRef}
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-12"
            >
              <div className="w-12 h-px bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t("home.gallery") || "Gallery"}
              </span>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial="hidden"
                animate={galleryInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-2 aspect-[16/9] overflow-hidden group"
              >
                <img
                  src={towerCloudsAerial}
                  alt="Tower emerging from clouds"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              <motion.div
                initial="hidden"
                animate={galleryInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="aspect-[4/5] overflow-hidden group"
              >
                <img
                  src={towerBwAngle}
                  alt="Tower architectural detail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              <motion.div
                initial="hidden"
                animate={galleryInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="aspect-square overflow-hidden group"
              >
                <img
                  src={skylineTwilight}
                  alt="Kuwait skyline at twilight"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              <motion.div
                initial="hidden"
                animate={galleryInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-2 aspect-[21/9] overflow-hidden group"
              >
                <img
                  src={kuwaitSkylineNight}
                  alt="Kuwait city at night"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            </div>

            <motion.div
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 text-center"
            >
              <Link 
                to="/perspective" 
                className="inline-flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors group"
              >
                <span className="text-sm uppercase tracking-wider">{t("home.view.all") || "View All Perspectives"}</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
