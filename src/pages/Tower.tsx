import { useRef } from "react";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import towerFullBlue    from "@/assets/tower-full-blue-sky.png";
import towerNight       from "@/assets/tower-night-illuminated.jpg";
import towerFacade      from "@/assets/tower-facade-twisted.png";
import towerLowAngle    from "@/assets/tower-lowangle-clouds.png";
import towerAerial      from "@/assets/tower-aerial-day.png";
import somLobby         from "@/assets/som-lobby.jpg";
import towerBW2         from "@/assets/tower-bw-2.png";

/* ── Shared types ── */
interface PageHeroProps { title: string; subtitle?: string; image: string; overline: string }

/* ── Page Hero — parallax tower banner ── */
const PageHero = ({ title, subtitle, image, overline }: PageHeroProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative flex items-end overflow-hidden" style={{ height: "88vh", minHeight: 520 }}>
      {/* BG image parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={image} alt={title} className="w-full h-full object-cover" style={{ objectPosition: "center 20%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.5) 40%, rgba(8,8,8,0.15) 100%)" }} />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 container mx-auto px-6 lg:px-12 pb-16 lg:pb-24" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="gold-line" style={{ width: 28 }} />
            <span className="overline">{overline}</span>
          </div>
          <h1 className="font-serif font-light text-white mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/50 max-w-xl" style={{ fontSize: "1.05rem", lineHeight: 1.8, fontWeight: 300 }}>
              {subtitle}
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ── Sub-nav strip ── */
const SubNav = ({ active }: { active: string }) => {
  const links = [
    { label: "Overview",     href: "/tower" },
    { label: "Rising",       href: "/tower/rising" },
    { label: "Design",       href: "/tower/design" },
    { label: "Sustainability", href: "/tower/sustainability" },
    { label: "Recognition",  href: "/tower/recognition" },
  ];
  return (
    <div
      className="sticky top-16 z-30 py-4 px-6"
      style={{
        background: "rgba(8,8,8,0.85)",
        backdropFilter: "blur(30px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container mx-auto overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="px-4 py-2 rounded-full transition-all duration-200"
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 300,
                background: active === l.href ? "rgba(201,169,110,0.12)" : "transparent",
                color: active === l.href ? "hsl(var(--silk-gold))" : "rgba(255,255,255,0.4)",
                border: active === l.href ? "1px solid rgba(201,169,110,0.2)" : "1px solid transparent",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Stat block ── */
const StatBlock = ({ value, unit, label }: { value: string; unit: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-1"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-end gap-1">
        <span className="font-serif font-light text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1, letterSpacing: "-0.03em" }}>{value}</span>
        <span className="text-silk-gold font-light mb-1" style={{ fontSize: "1rem" }}>{unit}</span>
      </div>
      <p className="text-white/35" style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>{label}</p>
    </motion.div>
  );
};

/* ── Reveal text block ── */
const RevealBlock = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ── Horizontal feature row ── */
const FeatureRow = ({
  image, overline, title, body, link, linkLabel, reverse = false
}: {
  image: string; overline: string; title: string; body: string; link: string; linkLabel: string; reverse?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "direction-rtl" : ""}`}>
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className={reverse ? "lg:order-2" : ""}
      >
        <div className="overflow-hidden rounded-glass" style={{ aspectRatio: "4/3" }}>
          <motion.img
            src={image} alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={reverse ? "lg:order-1" : ""}
      >
        <div className="flex items-center gap-4 mb-5">
          <span className="gold-line" style={{ width: 24 }} />
          <span className="overline">{overline}</span>
        </div>
        <h3 className="font-serif font-light text-foreground mb-5" style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.5rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          {title}
        </h3>
        <p className="text-muted-foreground mb-8" style={{ fontSize: "1rem", lineHeight: 1.9, fontWeight: 300 }}>
          {body}
        </p>
        <Link
          to={link}
          className="glass inline-flex items-center gap-3 px-6 py-3 text-white/70 hover:text-white transition-all duration-300 group"
          style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}
        >
          <span>{linkLabel}</span>
          <ArrowRight size={13} className="text-silk-gold group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
};

/* ════════════════════════════════════════
   TOWER OVERVIEW PAGE
   ════════════════════════════════════════ */
const Tower = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* ── Hero ── */}
      <PageHero
        overline="Al Hamra Tower"
        title={t("tower.hero.headline") || "Kuwait's Most Iconic Business Address"}
        subtitle={t("tower.hero.height") || "A sculptural landmark defining Kuwait City's skyline."}
        image={towerFullBlue}
      />

      <SubNav active="/tower" />

      {/* ── Key stats band ── */}
      <section style={{ background: "rgba(14,14,14,0.6)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <StatBlock value="413" unit="m"  label="Total Height" />
            <StatBlock value="80"  unit="+"  label="Office Floors" />
            <StatBlock value="2011" unit=""  label="Year Completed" />
            <StatBlock value="24K" unit="m²" label="Grade-A GLA" />
          </div>
        </div>
      </section>

      {/* ── Identity section ── */}
      <section className="section-luxury bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Large headline */}
            <div className="lg:col-span-5">
              <RevealBlock>
                <div className="flex items-center gap-4 mb-6">
                  <span className="gold-line" style={{ width: 28 }} />
                  <span className="overline">Identity</span>
                </div>
                <h2 className="font-serif font-light text-foreground" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                  {t("tower.hero.identity")?.split(".")[0] || "A landmark of sculpted form and refined function"}
                </h2>
              </RevealBlock>
            </div>

            {/* Body text */}
            <div className="lg:col-span-7">
              <RevealBlock delay={0.15}>
                <p className="text-muted-foreground mb-6" style={{ fontSize: "1.05rem", lineHeight: 2, fontWeight: 300 }}>
                  {t("tower.hero.identity") || "Al Hamra Tower stands as Kuwait's most significant architectural achievement — a structure of absolute presence, designed to endure beyond trends and cycles. Rising approximately 412–413 metres with a sculpted form, the tower blends architectural radiance with climate-responsive engineering."}
                </p>
                <p className="text-muted-foreground/70" style={{ fontSize: "0.9rem", lineHeight: 1.9, fontWeight: 300 }}>
                  Designed to maximize panoramic views while reducing solar heat gain through a performance-driven form, Al Hamra Tower balances openness with environmental efficiency — representing the pinnacle of Gulf commercial architecture.
                </p>
              </RevealBlock>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-bleed tower image ── */}
      <div className="relative overflow-hidden" style={{ height: "60vh" }}>
        <motion.img
          src={towerNight}
          alt="Al Hamra Tower at night"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 30%" }}
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.3) 50%, rgba(8,8,8,0.6) 100%)" }} />
        {/* Quote overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <RevealBlock>
            <blockquote
              className="font-serif font-light italic text-white/80 text-center max-w-2xl px-8"
              style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)", lineHeight: 1.5, letterSpacing: "-0.01em" }}
            >
              "A structure of absolute presence, designed to endure beyond trends."
            </blockquote>
          </RevealBlock>
        </div>
      </div>

      {/* ── Feature rows ── */}
      <section className="section-luxury bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-24">
            <FeatureRow
              image={towerFacade}
              overline="Architecture"
              title="Sculpted for Performance and Presence"
              body="The tower's asymmetrical carved stone facade is more than aesthetic — it is a climate-responsive engineering decision. Each cut and curve is optimised to reduce solar heat gain while maximising natural light penetration through Kuwait's intense sun. A fusion of art and physics."
              link="/tower/design"
              linkLabel="Design & Engineering"
            />
            <FeatureRow
              image={somLobby}
              overline="Interior"
              title="Lobby of Uncompromised Grandeur"
              body="The triple-height entrance lobby sets the tone for the entire tower experience. Soaring stone arches, curated lighting, and precision-crafted finishes signal arrival at a different class of workplace — one designed for organisations that lead rather than follow."
              link="/business/workplace-experience"
              linkLabel="Workplace Experience"
              reverse
            />
            <FeatureRow
              image={towerLowAngle}
              overline="The View"
              title="412 Metres of Perspective"
              body="At full height, Al Hamra Tower offers unrivalled panoramas across Kuwait Bay, the historic city centre, and the Arabian Gulf beyond. From the highest occupied floors, no other structure interrupts the horizon — an experience reserved exclusively for tenants."
              link="/tower/rising"
              linkLabel="The Rising Story"
            />
          </div>
        </div>
      </section>

      {/* ── Integrated ecosystem ── */}
      <section
        className="section-luxury"
        style={{ background: "rgba(10,10,10,0.8)" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <RevealBlock>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-5">
                <span className="gold-line" style={{ width: 24, transform: "scaleX(-1)" }} />
                <span className="overline">{t("tower.ecosystem.label") || "Integrated Destination"}</span>
                <span className="gold-line" style={{ width: 24 }} />
              </div>
              <h2 className="font-serif font-light text-foreground" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", letterSpacing: "-0.025em" }}>
                {t("tower.ecosystem.title") || "An Integrated Mixed-Use Destination"}
              </h2>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: t("tower.ecosystem.business.title") || "Business Tower",
                tag: "Premium Offices",
                desc: t("tower.ecosystem.business.desc") || "Premium office environments with efficient floor plates allowing flexible configurations.",
                icon: "↑",
              },
              {
                title: t("tower.ecosystem.shopping.title") || "Retail & Lifestyle",
                tag: "5 Levels",
                desc: t("tower.ecosystem.shopping.desc") || "Retail, dining, and service amenities reinforce the tower as a complete professional environment.",
                icon: "◈",
              },
              {
                title: t("tower.ecosystem.parking.title") || "Parking Complex",
                tag: "11 Floors",
                desc: t("tower.ecosystem.parking.desc") || "Efficient parking systems and visitor circulation ensure seamless daily experience.",
                icon: "⊡",
              },
            ].map((card, i) => (
              <RevealBlock key={card.title} delay={i * 0.12}>
                <div
                  className="p-8 h-full"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 24,
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,169,110,0.2)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)")}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="flex items-center justify-center text-silk-gold"
                      style={{ width: 40, height: 40, background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 12, fontSize: "1.1rem" }}
                    >
                      {card.icon}
                    </span>
                    <span
                      className="text-silk-gold"
                      style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", background: "rgba(201,169,110,0.08)", padding: "4px 10px", borderRadius: 50, border: "1px solid rgba(201,169,110,0.15)" }}
                    >
                      {card.tag}
                    </span>
                  </div>
                  <h4 className="font-serif font-light text-white/85 mb-3" style={{ fontSize: "1.15rem", letterSpacing: "-0.01em" }}>{card.title}</h4>
                  <p className="text-white/40" style={{ fontSize: "0.85rem", lineHeight: 1.8, fontWeight: 300 }}>{card.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sub-page links row ── */}
      <section className="section-luxury bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <RevealBlock>
            <h2 className="font-serif font-light text-foreground mb-12" style={{ fontSize: "clamp(1.6rem, 3vw, 3rem)", letterSpacing: "-0.02em" }}>
              Continue Exploring
            </h2>
          </RevealBlock>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Rising", sub: "Construction & History", href: "/tower/rising", img: towerBW2 },
              { label: "Design", sub: "Architecture & Engineering", href: "/tower/design", img: towerFacade },
              { label: "Awards", sub: "Regional Recognition", href: "/tower/recognition", img: towerAerial },
              { label: "Sustainability", sub: "Environmental Leadership", href: "/tower/sustainability", img: towerLowAngle },
            ].map((item, i) => (
              <RevealBlock key={item.href} delay={i * 0.08}>
                <Link to={item.href} className="block group">
                  <div className="overflow-hidden rounded-glass" style={{ aspectRatio: "1/1" }}>
                    <motion.img
                      src={item.img} alt={item.label}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-light text-white/80 group-hover:text-white transition-colors" style={{ fontSize: "1.05rem" }}>{item.label}</h4>
                      <ArrowRight size={13} className="text-silk-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <p className="text-white/35 mt-1" style={{ fontSize: "11px", letterSpacing: "0.08em" }}>{item.sub}</p>
                  </div>
                </Link>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tower;
