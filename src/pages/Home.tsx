import { useRef } from "react";
import Header from "@/components/alhamra/Header";
import HeroSection from "@/components/alhamra/HeroSection";
import Footer from "@/components/alhamra/Footer";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import useCountUp from "@/hooks/useCountUp";

/* ── assets ── */
import towerAerialSunset from "@/assets/tower-aerial-sunset.png";
import somTowerSkyline   from "@/assets/som-tower-skyline.jpg";
import interiorLobby     from "@/assets/interior-lobby.jpg";
import skylineReflection from "@/assets/skyline-reflection.png";
import kuwaitSkylineNight from "@/assets/kuwait-skyline-night.png";
import towerFacadeTwisted from "@/assets/tower-facade-twisted.png";
import towerLowAngle      from "@/assets/tower-lowangle-clouds.png";
import lobbyArches        from "@/assets/lobby-arches.jpg";
import towerAerialDay     from "@/assets/tower-aerial-day.png";
import skylinePark        from "@/assets/skyline-park-panorama.jpg";
import officeCorr         from "@/assets/office-corridor.jpg";

/* ── Section header ── */
const SectionLabel = ({ label, title, center = false }: { label: string; title: string; center?: boolean }) => (
  <div className={`mb-14 ${center ? "text-center" : ""}`}>
    <div className={`flex items-center gap-4 mb-5 ${center ? "justify-center" : ""}`}>
      {!center && <span className="gold-line" style={{ width: 32 }} />}
      <span className="overline">{label}</span>
      {center && <span className="gold-line" style={{ width: 32, transform: "scaleX(-1)" }} />}
      {center && <span className="gold-line" style={{ width: 32 }} />}
    </div>
    <h2 className="font-serif font-light text-foreground"
      style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
      {title}
    </h2>
  </div>
);

/* ── Animated stat card ── */
const StatCard = ({ value, unit, label, desc, delay = 0 }: {
  value: number; unit: string; label: string; desc: string; delay?: number;
}) => {
  const { count, ref, isInView } = useCountUp({ end: value, duration: 1800, delay: delay * 1000 });

  return (
    <motion.div
      ref={ref}
      className="glass-medium p-8 group cursor-default"
      style={{ borderRadius: "24px" }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div className="flex items-end gap-2 mb-3">
        <span
          className="font-serif font-light text-foreground transition-colors duration-300 group-hover:text-silk-gold"
          style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", lineHeight: 1, letterSpacing: "-0.03em" }}
        >
          {count}
        </span>
        <span className="text-silk-gold font-light mb-2" style={{ fontSize: "1.2rem" }}>{unit}</span>
      </div>
      <p className="label-subtle text-muted-foreground mb-4 group-hover:text-foreground/60 transition-colors">{label}</p>
      <div
        className="mb-4"
        style={{ height: 1, background: "linear-gradient(90deg, rgba(201,169,110,0.5), transparent)" }}
      />
      <p className="text-muted-foreground/70 group-hover:text-muted-foreground transition-colors"
        style={{ fontSize: "0.825rem", lineHeight: 1.6 }}>
        {desc}
      </p>
    </motion.div>
  );
};

/* ── Parallax image section ── */
const ParallaxImage = ({ src, alt, height = "60vh" }: { src: string; alt: string; height?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <div ref={ref} className="overflow-hidden rounded-glass" style={{ height }}>
      <motion.img
        src={src} alt={alt}
        style={{ y, scale: 1.18 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

/* ── Horizontal scroll feature card ── */
const FeatureCard = ({ image, title, subtitle, link, delay = 0 }: {
  image: string; title: string; subtitle: string; link: string; delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={link} className="block group">
        <div className="relative overflow-hidden rounded-glass" style={{ aspectRatio: "3/4" }}>
          <motion.img
            src={image} alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div
              className="liquid-glass px-5 py-4"
              style={{
                background: "rgba(8,8,8,0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="label-subtle text-white/50 mb-1">{subtitle}</p>
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-light text-white" style={{ fontSize: "1.1rem" }}>{title}</h3>
                <motion.span
                  className="text-silk-gold"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ── Full masonry gallery row ── */
const GalleryRow = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const images = [
    { src: towerFacadeTwisted, span: "col-span-2 row-span-2", h: "380px" },
    { src: lobbyArches,        span: "col-span-1",            h: "180px" },
    { src: officeCorr,         span: "col-span-1",            h: "180px" },
    { src: towerLowAngle,      span: "col-span-1",            h: "180px" },
    { src: towerAerialDay,     span: "col-span-1",            h: "180px" },
  ];

  return (
    <div ref={ref} className="grid grid-cols-4 gap-3" style={{ gridAutoRows: "auto" }}>
      {images.map((img, i) => (
        <motion.div
          key={i}
          className={`${img.span} overflow-hidden rounded-glass-sm group cursor-pointer`}
          style={{ height: img.h }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ zIndex: 10 }}
        >
          <motion.img
            src={img.src}
            alt="Al Hamra Tower"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      ))}
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   HOME PAGE
   ════════════════════════════════════════════════════════ */
const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>

        {/* ── HERO ── */}
        <HeroSection />

        {/* ── STATS — Glass cards with count-up ── */}
        <section className="section-luxury bg-background relative">
          <div className="absolute inset-0 arch-grid opacity-30 pointer-events-none" />
          <div className="container mx-auto px-6 lg:px-12 relative">
            <SectionLabel label={t("home.about") || "The Tower"} title={t("home.intro.title") || "A Structure of Absolute Presence"} />
            <div className="grid md:grid-cols-3 gap-5 mb-16">
              <StatCard value={413} unit="m"  label={t("stats.height") || "Height"} desc={t("stats.height.desc") || "Among the tallest in the Gulf region"} delay={0} />
              <StatCard value={80}  unit="+"  label={t("stats.floors") || "Floors"} desc={t("stats.floors.desc") || "Premium commercial office floors"} delay={0.12} />
              <StatCard value={24}  unit="K+" label={t("stats.sqm")    || "sq.m GLA"} desc={t("stats.sqm.desc") || "Grade A leasable office space"} delay={0.24} />
            </div>
            {/* Intro body text */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-muted-foreground leading-relaxed mb-6" style={{ fontSize: "1.05rem", lineHeight: 1.9 }}>
                  {t("home.intro.p1") || "Al Hamra Tower stands as Kuwait's most significant architectural achievement. A structure of absolute presence, designed to endure beyond trends and cycles."}
                </p>
                <Link
                  to="/tower"
                  className="glass-gold inline-flex items-center gap-3 px-6 py-3 text-white/80 hover:text-white transition-all duration-300 group"
                  style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}
                >
                  <span>{t("home.explore.tower") || "Explore the Tower"}</span>
                  <ArrowRight size={14} className="text-silk-gold transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <ParallaxImage src={towerAerialSunset} alt="Al Hamra Tower aerial" height="420px" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── EXPLORE — 3-card grid ── */}
        <section className="section-luxury bg-card/40 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,169,110,0.04) 0%, transparent 70%)" }}
          />
          <div className="container mx-auto px-6 lg:px-12">
            <SectionLabel
              label={t("home.links.label") || "Explore"}
              title={t("home.links.title") || "Arrive. Ascend. Belong."}
              center
            />
            <div className="grid md:grid-cols-3 gap-5">
              <FeatureCard image={somTowerSkyline} title={t("home.link.tower.title") || "The Tower"} subtitle={t("home.link.tower.subtitle") || "Architecture & Engineering"} link="/tower" delay={0} />
              <FeatureCard image={interiorLobby}   title={t("home.link.business.title") || "Business"} subtitle={t("home.link.business.subtitle") || "Workspace & Enterprise"} link="/business" delay={0.1} />
              <FeatureCard image={skylineReflection} title={t("home.link.experience.title") || "Experience"} subtitle={t("home.link.experience.subtitle") || "Services & Sustainability"} link="/services" delay={0.2} />
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="section-luxury bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <SectionLabel label="Gallery" title="Captured in Light" />
            <GalleryRow />
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/tower/design"
                className="glass inline-flex items-center gap-3 px-7 py-3 text-white/70 hover:text-white transition-all duration-300 group"
                style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                <span>View Architecture</span>
                <ArrowRight size={13} className="text-silk-gold group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── CTA — Night skyline full bleed ── */}
        <section className="relative overflow-hidden" style={{ minHeight: "70vh" }}>
          {/* Background */}
          <div className="absolute inset-0">
            <motion.img
              src={kuwaitSkylineNight}
              alt="Kuwait skyline at night"
              className="w-full h-full object-cover"
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>

          {/* Floating gold orb */}
          <div
            className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />

          {/* Content */}
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="py-28 lg:py-36 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="gold-line" style={{ width: 32 }} />
                  <span className="overline text-silk-gold/70">{t("home.cta.label") || "Leasing"}</span>
                </div>
                <h2
                  className="font-serif font-light text-white mb-6"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
                >
                  {t("home.cta.title") || "Claim Your Position Above the City"}
                </h2>
                <p className="text-white/55 mb-10" style={{ fontSize: "1rem", lineHeight: 1.9, maxWidth: "480px" }}>
                  {t("home.cta.desc") || "Join Kuwait's most prestigious business address. Premium office space designed for organisations that lead."}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link
                    to="/leasing/opportunities"
                    className="glass-gold inline-flex items-center justify-center gap-3 px-8 py-4 text-white hover:text-white transition-all duration-300 group"
                    style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}
                  >
                    <span>{t("home.cta.leasing") || "View Leasing Options"}</span>
                    <ArrowRight size={14} className="text-silk-gold group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/leasing/contact"
                    className="glass inline-flex items-center justify-center gap-3 px-8 py-4 text-white/70 hover:text-white transition-all duration-300"
                    style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}
                  >
                    <span>{t("home.cta.contact") || "Speak with Leasing"}</span>
                  </Link>
                </div>

                {/* Contact strip */}
                <div
                  className="flex flex-wrap gap-8 pt-8"
                  style={{ borderTop: "1px solid rgba(201,169,110,0.15)" }}
                >
                  {[
                    { icon: Phone, text: "+965 2227 5000" },
                    { icon: Mail,  text: "leasing@alhamratower.com" },
                    { icon: MapPin, text: "Sharq, Kuwait City" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-white/35">
                      <Icon size={12} className="text-silk-gold/50" />
                      <span style={{ fontSize: "0.8rem" }}>{text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Home;
