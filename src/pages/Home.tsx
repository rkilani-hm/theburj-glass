import Header from "@/components/alhamra/Header";
import HeroSection from "@/components/alhamra/HeroSection";
import Footer from "@/components/alhamra/Footer";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

import towerAerialSunset from "@/assets/tower-aerial-sunset.png";
import somTowerSkyline from "@/assets/som-tower-skyline.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import skylineReflection from "@/assets/skyline-reflection.png";
import kuwaitSkylineNight from "@/assets/kuwait-skyline-night.png";

/* Floating glass blobs for spatial depth */
const FloatingBlobs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-64 h-64 rounded-full"
      style={{
        background: "radial-gradient(circle, hsl(43 72% 49% / 0.06) 0%, transparent 70%)",
        filter: "blur(50px)",
        top: "30%",
        right: "10%",
      }}
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-48 h-48 rounded-full"
      style={{
        background: "radial-gradient(circle, hsl(270 30% 50% / 0.04) 0%, transparent 70%)",
        filter: "blur(40px)",
        bottom: "20%",
        left: "5%",
      }}
      animate={{ y: [0, 15, 0] }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const Home = () => {
  const { t } = useLanguage();
  const { ref: introRef, isInView: introInView } = useScrollReveal();
  const { ref: featuresRef, isInView: featuresInView } = useScrollReveal();
  const { ref: linksRef, isInView: linksInView } = useScrollReveal();
  const { ref: ctaRef, isInView: ctaInView } = useScrollReveal();

  const features = [
    { number: "412m", label: t("stats.height"), description: t("stats.height.desc") },
    { number: "70+", label: t("stats.floors"), description: t("stats.floors.desc") },
    { number: "24m", label: t("stats.sqm"), description: t("stats.sqm.desc") },
  ];

  const pageLinks = [
    {
      title: t("home.link.tower.title") || "The Tower",
      subtitle: t("home.link.tower.subtitle") || "Architecture & Engineering",
      image: somTowerSkyline,
      link: "/tower",
    },
    {
      title: t("home.link.business.title") || "Business",
      subtitle: t("home.link.business.subtitle") || "Workspace & Enterprise",
      image: interiorLobby,
      link: "/business",
    },
    {
      title: t("home.link.experience.title") || "Experience",
      subtitle: t("home.link.experience.subtitle") || "Services & Sustainability",
      image: skylineReflection,
      link: "/services",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />

        {/* Introduction with Liquid Glass Card */}
        <section className="py-24 md:py-32 bg-background relative">
          <FloatingBlobs />
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div ref={introRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial="hidden"
                animate={introInView ? "visible" : "hidden"}
                variants={revealVariants.slideLeft}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-silk-gold/40" />
                  <span className="text-xs uppercase tracking-[0.3em] text-champagne">
                    {t("home.about")}
                  </span>
                </div>
                <h2 className="text-headline font-light tracking-wide text-foreground mb-8">
                  {t("home.intro.title")}
                </h2>
                <p className="text-body-lg text-muted-foreground leading-relaxed mb-8">
                  {t("home.intro.p1")}
                </p>
                <Link 
                  to="/tower" 
                  className="inline-flex items-center gap-3 px-6 py-3 liquid-glass-subtle text-foreground hover:text-silk-gold transition-colors group"
                >
                  <span className="text-sm uppercase tracking-wider">{t("home.explore.tower")}</span>
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
                <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                  <img
                    src={towerAerialSunset}
                    alt="Al Hamra Tower aerial view at sunset"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                </div>
                {/* Gold corner accent */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-silk-gold/20 rounded-xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats — Liquid Glass Cards */}
        <section className="py-20 md:py-28 bg-secondary/50 relative">
          <div className="container mx-auto px-6 lg:px-12">
            <div ref={featuresRef} className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={featuresInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                  className="liquid-glass-subtle p-8 text-center lg:text-left cursor-default group hover:border-silk-gold/40 transition-all duration-500"
                >
                  <motion.p 
                    className="text-5xl lg:text-6xl font-light text-foreground mb-2 tracking-tight group-hover:text-silk-gold transition-colors duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={featuresInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: "easeOut" }}
                  >
                    {feature.number}
                  </motion.p>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3 group-hover:text-foreground transition-colors duration-300">
                    {feature.label}
                  </p>
                  <motion.div 
                    className="w-8 h-px bg-silk-gold/30 mb-3 mx-auto lg:mx-0 transition-all duration-500 group-hover:w-16 group-hover:bg-silk-gold"
                    initial={{ scaleX: 0 }}
                    animate={featuresInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                    style={{ originX: 0 }}
                  />
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Pages — Compact Glass Grid */}
        <section className="py-24 md:py-32 bg-background relative">
          <FloatingBlobs />
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <motion.div
              ref={linksRef}
              initial={{ opacity: 0, y: 30 }}
              animate={linksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-px bg-silk-gold/40" />
                <span className="text-xs uppercase tracking-[0.3em] text-champagne">
                  {t("home.links.label") || "Explore"}
                </span>
                <div className="w-12 h-px bg-silk-gold/40" />
              </div>
              <h2 className="text-headline font-light tracking-wide text-foreground">
                {t("home.links.title") || "Arrive. Ascend. Belong."}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {pageLinks.map((page, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={linksInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.15 }}
                >
                  <Link to={page.link} className="block group">
                    <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                      <img
                        src={page.image}
                        alt={page.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                      
                      {/* Liquid glass label at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="liquid-glass px-5 py-4">
                          <span className="text-xs uppercase tracking-[0.2em] text-white/60 block mb-1">
                            {page.subtitle}
                          </span>
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-light text-white">{page.title}</h3>
                            <ArrowRight size={16} className="text-silk-gold transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={kuwaitSkylineNight}
              alt="Kuwait skyline at night"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/60" />
          </div>
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div ref={ctaRef} className="py-24 lg:py-32">
              <div className="max-w-2xl">
                <motion.div
                  initial="hidden"
                  animate={ctaInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-silk-gold/40" />
                    <span className="text-xs uppercase tracking-[0.3em] text-silk-gold-light/70">
                      {t("home.cta.label")}
                    </span>
                  </div>

                  <h2 className="text-headline font-light tracking-wide text-white mb-6">
                    {t("home.cta.title")}
                  </h2>

                  <p className="text-body-lg text-white/70 mb-10 max-w-xl">
                    {t("home.cta.desc")}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <Link 
                      to="/leasing"
                      className="liquid-glass inline-flex items-center justify-center gap-3 px-8 py-4 text-white hover:bg-white/10 transition-colors group"
                    >
                      <span className="text-sm uppercase tracking-wider">{t("home.cta.leasing")}</span>
                      <ArrowRight size={16} className="text-silk-gold transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link 
                      to="/contact"
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 rounded-xl text-white hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-sm uppercase tracking-wider">{t("home.cta.contact")}</span>
                    </Link>
                  </div>

                  {/* Contact Quick Info */}
                  <div className="flex flex-wrap gap-8 pt-8 border-t border-silk-gold/20">
                    <div className="flex items-center gap-3 text-white/50">
                      <Phone size={14} className="text-silk-gold/60" />
                      <span className="text-sm">+965 2227 5000</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/50">
                      <Mail size={14} className="text-silk-gold/60" />
                      <span className="text-sm">leasing@alhamratower.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/50">
                      <MapPin size={14} className="text-silk-gold/60" />
                      <span className="text-sm">Sharq, Kuwait City</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
