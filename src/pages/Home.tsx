import { useRef } from "react";
import Header from "@/components/alhamra/Header";
import HeroSection from "@/components/alhamra/HeroSection";
import Footer from "@/components/alhamra/Footer";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import useCountUp from "@/hooks/useCountUp";

import towerAerialSunset  from "@/assets/tower-aerial-sunset.png";
import somTowerSkyline    from "@/assets/som-tower-skyline.jpg";
import interiorLobby      from "@/assets/interior-lobby.jpg";
import skylineReflection  from "@/assets/skyline-reflection.png";
import skylinePark        from "@/assets/skyline-park-panorama.jpg";
import towerFacade        from "@/assets/tower-facade-twisted.png";
import towerLowAngle      from "@/assets/tower-lowangle-clouds.png";
import lobbyArches        from "@/assets/lobby-arches.jpg";
import towerAerialDay     from "@/assets/tower-aerial-day.png";
import officeCorr         from "@/assets/office-corridor.jpg";

/* ── Section label ── */
const SectionLabel = ({ overline, title, center = false }: { overline: string; title: string; center?: boolean }) => (
  <div className={`mb-12 ${center ? "text-center" : ""}`}>
    <div className={`flex items-center gap-4 mb-4 ${center ? "justify-center" : ""}`}>
      {!center && <span className="sky-line" style={{ width: 28 }} />}
      {center && <span className="sky-line" style={{ width: 24, transform: "scaleX(-1)" }} />}
      <span className="overline">{overline}</span>
      {center && <span className="sky-line" style={{ width: 24 }} />}
    </div>
    <h2 className="font-serif font-light text-foreground"
      style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
      {title}
    </h2>
  </div>
);

/* ── Stat card with count-up ── */
const StatCard = ({ value, unit, label, desc, delay = 0 }: {
  value: number; unit: string; label: string; desc: string; delay?: number;
}) => {
  const { count, ref, isInView } = useCountUp({ end: value, duration: 1800, delay: delay * 1000 });
  return (
    <motion.div ref={ref}
      className="bg-card rounded-glass p-8 group cursor-default hover-lift"
      style={{ border: "1px solid hsl(var(--border))", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
      initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-end gap-2 mb-3">
        <span className="font-serif font-light text-foreground group-hover:text-sky-dark transition-colors duration-300"
          style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)", lineHeight: 1, letterSpacing: "-0.03em" }}>
          {count}
        </span>
        <span className="text-sky font-light mb-1.5" style={{ fontSize: "1.1rem" }}>{unit}</span>
      </div>
      <p className="label-subtle text-muted-foreground mb-3">{label}</p>
      <div className="mb-3" style={{ height: 1, background: "linear-gradient(90deg, hsl(var(--sky)/0.3), transparent)" }} />
      <p className="text-muted-foreground/80" style={{ fontSize: "0.82rem", lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
    </motion.div>
  );
};

/* ── Parallax image ── */
const ParallaxImage = ({ src, alt, height = "460px" }: { src: string; alt: string; height?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  return (
    <div ref={ref} className="overflow-hidden rounded-glass" style={{ height }}>
      <motion.img src={src} alt={alt} style={{ y, scale: 1.18 }} className="w-full h-full object-cover" />
    </div>
  );
};

/* ── Feature card ── */
const FeatureCard = ({ image, title, subtitle, link, delay = 0 }: {
  image: string; title: string; subtitle: string; link: string; delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.97 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={link} className="block group" style={{ textDecoration: "none" }}>
        <div className="overflow-hidden rounded-glass" style={{ aspectRatio: "3/4" }}>
          <motion.img src={image} alt={title} className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
        </div>
        <div className="mt-4 px-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="label-subtle text-muted-foreground mb-1">{subtitle}</p>
              <h3 className="font-serif font-light text-foreground group-hover:text-sky-dark transition-colors duration-300"
                style={{ fontSize: "1.15rem", letterSpacing: "-0.01em" }}>{title}</h3>
            </div>
            <ArrowRight size={14} className="text-sky opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ── Gallery ── */
const Gallery = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const imgs = [
    { src: towerFacade,   cls: "col-span-2 row-span-2", h: "400px" },
    { src: lobbyArches,   cls: "col-span-1",            h: "192px" },
    { src: officeCorr,    cls: "col-span-1",            h: "192px" },
    { src: towerLowAngle, cls: "col-span-1",            h: "192px" },
    { src: towerAerialDay,cls: "col-span-1",            h: "192px" },
  ];
  return (
    <div ref={ref} className="grid grid-cols-4 gap-3">
      {imgs.map((img, i) => (
        <motion.div key={i} className={`${img.cls} overflow-hidden rounded-glass-sm`} style={{ height: img.h }}
          initial={{ opacity: 0, scale: 0.97 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img src={img.src} alt="Al Hamra Tower" className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
        </motion.div>
      ))}
    </div>
  );
};

/* ════════════════════════════════════════════════════
   HOME PAGE
   ════════════════════════════════════════════════════ */
const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>

        {/* ── HERO ── */}
        <HeroSection />

        {/* ── STATS ── */}
        <section className="section-luxury bg-background relative">
          <div className="absolute inset-0 arch-grid opacity-50 pointer-events-none" />
          <div className="container mx-auto px-6 lg:px-12 relative">
            <SectionLabel overline={t("home.about") || "The Tower"} title={t("home.intro.title") || "A Structure of Absolute Presence"} />
            <div className="grid md:grid-cols-3 gap-5 mb-20">
              <StatCard value={413} unit="m"  label={t("stats.height") || "Height"}    desc="Among the tallest towers in the Gulf region" delay={0}    />
              <StatCard value={80}  unit="+"  label={t("stats.floors") || "Floors"}    desc="Premium Grade-A commercial office floors"   delay={0.1}  />
              <StatCard value={24}  unit="K+" label={t("stats.sqm")    || "sq.m GLA"}  desc="Leasable office space across tower floors"  delay={0.2}  />
            </div>

            {/* Intro section */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-muted-foreground mb-8 leading-relaxed"
                  style={{ fontSize: "1.05rem", lineHeight: 1.95, fontWeight: 300 }}>
                  {t("home.intro.p1") || "Al Hamra Tower stands as Kuwait's most significant architectural achievement — a structure of absolute presence, designed to endure beyond trends and cycles. Rising from the heart of Kuwait City, it commands attention through restraint."}
                </p>
                <Link to="/tower"
                  className="glass-sky inline-flex items-center gap-3 px-7 py-3.5 text-sky-dark hover:text-sky transition-all duration-300 group"
                  style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", fontWeight: 400 }}
                >
                  <span>{t("home.explore.tower") || "Explore the Tower"}</span>
                  <ArrowRight size={13} className="text-sky group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <ParallaxImage src={towerAerialSunset} alt="Al Hamra Tower aerial" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── EXPLORE CARDS ── */}
        <section className="section-luxury" style={{ background: "hsl(var(--secondary))" }}>
          <div className="container mx-auto px-6 lg:px-12">
            <SectionLabel overline={t("home.links.label") || "Explore"} title={t("home.links.title") || "Arrive. Ascend. Belong."} center />
            <div className="grid md:grid-cols-3 gap-8 mt-4">
              <FeatureCard image={somTowerSkyline}   title={t("home.link.tower.title")      || "The Tower"}   subtitle={t("home.link.tower.subtitle")      || "Architecture & Engineering"} link="/tower"    delay={0}   />
              <FeatureCard image={interiorLobby}     title={t("home.link.business.title")   || "Business"}    subtitle={t("home.link.business.subtitle")   || "Workspace & Enterprise"}    link="/business" delay={0.1} />
              <FeatureCard image={skylineReflection} title={t("home.link.experience.title") || "Experience"}  subtitle={t("home.link.experience.subtitle") || "Services & Sustainability"} link="/services" delay={0.2} />
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="section-luxury bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <SectionLabel overline="Gallery" title="Captured in Light" />
            <Gallery />
            <motion.div className="mt-8 flex justify-start"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Link to="/tower/design"
                className="glass inline-flex items-center gap-3 px-7 py-3.5 text-sky-dark hover:text-sky transition-all duration-300 group"
                style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none" }}
              >
                <span>View Architecture</span>
                <ArrowRight size={13} className="text-sky group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── CTA — Skyline panorama ── */}
        <section className="relative overflow-hidden" style={{ minHeight: "65vh" }}>
          <div className="absolute inset-0">
            <motion.img src={skylinePark} alt="Kuwait skyline" className="w-full h-full object-cover"
              initial={{ scale: 1.04 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeOut" }} />
            {/* Light overlay — keeps the image bright but text readable */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(250,250,247,0.95) 0%, rgba(250,250,247,0.75) 45%, rgba(250,250,247,0.35) 100%)" }} />
          </div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="py-24 lg:py-32 max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="sky-line" style={{ width: 24 }} />
                  <span className="overline">{t("home.cta.label") || "Leasing"}</span>
                </div>
                <h2 className="font-serif font-light text-foreground mb-5"
                  style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.4rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                  {t("home.cta.title") || "Claim Your Position Above the City"}
                </h2>
                <p className="text-muted-foreground mb-10"
                  style={{ fontSize: "1rem", lineHeight: 1.9, maxWidth: 440, fontWeight: 300 }}>
                  {t("home.cta.desc") || "Join Kuwait's most prestigious business address. Premium office space designed for organisations that lead."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link to="/leasing/opportunities"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 text-white rounded-full transition-all duration-300 group"
                    style={{ background: "hsl(var(--sky))", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
                      fontWeight: 400, textDecoration: "none", boxShadow: "0 4px 20px rgba(74,107,138,0.3)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "hsl(var(--sky-dark))"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "hsl(var(--sky))"; }}
                  >
                    <span>{t("home.cta.leasing") || "View Leasing Options"}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/leasing/contact"
                    className="glass-sky inline-flex items-center justify-center gap-3 px-8 py-4 text-sky-dark hover:text-sky transition-all duration-300"
                    style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 400, textDecoration: "none" }}
                  >
                    <span>{t("home.cta.contact") || "Speak with Leasing"}</span>
                  </Link>
                </div>

                <div className="flex flex-wrap gap-7 pt-7" style={{ borderTop: "1px solid hsl(var(--border))" }}>
                  {[
                    { icon: Phone,   text: "+965 2227 5000" },
                    { icon: Mail,    text: "leasing@alhamratower.com" },
                    { icon: MapPin,  text: "Sharq, Kuwait City" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-muted-foreground">
                      <Icon size={12} className="text-sky shrink-0" />
                      <span style={{ fontSize: "0.78rem", fontWeight: 300 }}>{text}</span>
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
