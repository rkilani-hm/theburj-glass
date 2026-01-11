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
      label: t("stats.height"),
      description: t("stats.height.desc")
    },
    {
      number: "77",
      label: t("stats.floors"),
      description: t("stats.floors.desc")
    },
    {
      number: "195,000",
      label: t("stats.sqm"),
      description: t("stats.sqm.desc")
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
                  whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                  className="text-center lg:text-left p-8 rounded-sm border border-transparent hover:border-border hover:bg-background/50 transition-colors duration-500 cursor-default group"
                >
                  <motion.p 
                    className="text-5xl lg:text-6xl font-light text-foreground mb-2 tracking-tight transition-colors duration-300 group-hover:text-primary"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={featuresInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: "easeOut" }}
                  >
                    {feature.number}
                  </motion.p>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 transition-colors duration-300 group-hover:text-foreground">
                    {feature.label}
                  </p>
                  <motion.div 
                    className="w-8 h-px bg-border mb-4 mx-auto lg:mx-0 transition-all duration-500 group-hover:w-16 group-hover:bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={featuresInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                    style={{ originX: 0 }}
                  />
                  <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
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
                whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
                className="lg:col-span-2 aspect-[16/9] overflow-hidden group relative cursor-pointer"
              >
                <motion.img
                  src={towerCloudsAerial}
                  alt="Tower emerging from clouds"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={galleryInView ? { scale: 1 } : { scale: 1.1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                <motion.div 
                  className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700"
                  initial={{ width: 0 }}
                  animate={galleryInView ? { width: "30%" } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </motion.div>

              <motion.div
                initial="hidden"
                animate={galleryInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
                className="aspect-[4/5] overflow-hidden group relative cursor-pointer"
              >
                <motion.img
                  src={towerBwAngle}
                  alt="Tower architectural detail"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={galleryInView ? { scale: 1 } : { scale: 1.1 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-primary"
                  initial={{ width: 0 }}
                  animate={galleryInView ? { width: "40%" } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </motion.div>

              <motion.div
                initial="hidden"
                animate={galleryInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
                className="aspect-square overflow-hidden group relative cursor-pointer"
              >
                <motion.img
                  src={skylineTwilight}
                  alt="Kuwait skyline at twilight"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={galleryInView ? { scale: 1 } : { scale: 1.1 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-primary"
                  initial={{ width: 0 }}
                  animate={galleryInView ? { width: "50%" } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </motion.div>

              <motion.div
                initial="hidden"
                animate={galleryInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
                className="lg:col-span-2 aspect-[21/9] overflow-hidden group relative cursor-pointer"
              >
                <motion.img
                  src={kuwaitSkylineNight}
                  alt="Kuwait city at night"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={galleryInView ? { scale: 1 } : { scale: 1.1 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-primary"
                  initial={{ width: 0 }}
                  animate={galleryInView ? { width: "25%" } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
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
