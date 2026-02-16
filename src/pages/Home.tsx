import Header from "@/components/alhamra/Header";
import HeroSection from "@/components/alhamra/HeroSection";
import Footer from "@/components/alhamra/Footer";
import HomeJourneyTimeline from "@/components/alhamra/HomeJourneyTimeline";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

import towerAerialSunset from "@/assets/tower-aerial-sunset.png";
import kuwaitSkylineNight from "@/assets/kuwait-skyline-night.png";
import somTowerDetail from "@/assets/som-tower-detail.jpg";

const Home = () => {
  const { t } = useLanguage();
  const { ref: introRef, isInView: introInView } = useScrollReveal();
  const { ref: manifestoRef, isInView: manifestoInView } = useScrollReveal();
  const { ref: featuresRef, isInView: featuresInView } = useScrollReveal();
  const { ref: ctaRef, isInView: ctaInView } = useScrollReveal();

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

  const quickFacts = [
    { label: t("home.facts.architect"), value: "Skidmore, Owings & Merrill" },
    { label: t("home.facts.completed"), value: "2011" },
    { label: t("home.facts.contractor"), value: "Samsung Engineering" },
    { label: t("home.facts.rank"), value: "#23 Tallest" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />

        {/* Introduction — "A New Center of Gravity" */}
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
                    {t("home.about")}
                  </span>
                </div>
                <h2 className="text-headline font-light tracking-wide text-foreground mb-8">
                  {t("home.intro.title")}
                </h2>
                <p className="text-body-lg text-muted-foreground leading-relaxed mb-6">
                  {t("home.intro.p1")}
                </p>
                <p className="text-body text-muted-foreground leading-relaxed mb-8">
                  {t("home.intro.p2")}
                </p>
                <Link 
                  to="/tower" 
                  className="inline-flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors group"
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

        {/* Quick Facts Bar */}
        <section className="py-8 bg-foreground">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
              {quickFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center py-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-background/60 mb-1">{fact.label}</p>
                  <p className="text-sm lg:text-base text-background font-light">{fact.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Manifesto — "Defying the Impossible" */}
        <section className="py-section bg-background texture-noise">
          <div className="container mx-auto px-6 lg:px-12">
            <div ref={manifestoRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial="hidden"
                animate={manifestoInView ? "visible" : "hidden"}
                variants={revealVariants.slideRight}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative group lg:order-1"
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={somTowerDetail}
                    alt="Al Hamra Tower sculptural facade detail"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-border -z-10" />
              </motion.div>

              <motion.div
                initial="hidden"
                animate={manifestoInView ? "visible" : "hidden"}
                variants={revealVariants.slideLeft}
                transition={{ duration: 0.8 }}
                className="lg:order-0"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-border" />
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {t("home.manifesto.label")}
                  </span>
                </div>
                <h2 className="text-headline font-light tracking-wide text-foreground mb-8">
                  {t("home.manifesto.title")}
                </h2>
                <p className="text-body-lg text-muted-foreground leading-relaxed mb-6">
                  {t("home.manifesto.p1")}
                </p>
                <p className="text-body text-muted-foreground leading-relaxed mb-8">
                  {t("home.manifesto.p2")}
                </p>
                <Link 
                  to="/tower/design-engineering" 
                  className="inline-flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors group"
                >
                  <span className="text-sm uppercase tracking-wider">{t("home.manifesto.label")}</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Journey Timeline Section */}
        <HomeJourneyTimeline />

        {/* CTA Section with Image */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={kuwaitSkylineNight}
              alt="Kuwait skyline at night"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground/70" />
          </div>
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div ref={ctaRef} className="py-24 lg:py-32">
              <div className="max-w-3xl">
                <motion.div
                  initial="hidden"
                  animate={ctaInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <div className="w-12 h-px bg-background/40" />
                  <span className="text-xs uppercase tracking-[0.3em] text-background/60">
                    {t("home.cta.label")}
                  </span>
                </motion.div>

                <motion.h2 
                  initial="hidden"
                  animate={ctaInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-headline font-light tracking-wide text-background mb-6"
                >
                  {t("home.cta.title")}
                </motion.h2>

                <motion.p
                  initial="hidden"
                  animate={ctaInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-body-lg text-background/80 mb-10 max-w-xl"
                >
                  {t("home.cta.desc")}
                </motion.p>

                <motion.div
                  initial="hidden"
                  animate={ctaInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 mb-12"
                >
                  <Link 
                    to="/leasing"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-background text-foreground hover:bg-background/90 transition-colors group"
                  >
                    <span className="text-sm uppercase tracking-wider">{t("home.cta.leasing")}</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link 
                    to="/contact"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-background/40 text-background hover:bg-background/10 transition-colors group"
                  >
                    <span className="text-sm uppercase tracking-wider">{t("home.cta.contact")}</span>
                  </Link>
                </motion.div>

                {/* Contact Quick Info */}
                <motion.div
                  initial="hidden"
                  animate={ctaInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-8 pt-8 border-t border-background/20"
                >
                  <div className="flex items-center gap-3 text-background/70">
                    <Phone size={16} />
                    <span className="text-sm">+965 2227 5000</span>
                  </div>
                  <div className="flex items-center gap-3 text-background/70">
                    <Mail size={16} />
                    <span className="text-sm">leasing@alhamratower.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-background/70">
                    <MapPin size={16} />
                    <span className="text-sm">Sharq, Kuwait City</span>
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
