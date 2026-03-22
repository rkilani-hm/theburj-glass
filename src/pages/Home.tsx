import { useRef, useState } from "react";
import Header from "@/components/alhamra/Header";
import HeroSection from "@/components/alhamra/HeroSection";
import Footer from "@/components/alhamra/Footer";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import useCountUp from "@/hooks/useCountUp";

import somTowerSkyline   from "@/assets/som-tower-skyline.jpg";
import interiorLobby     from "@/assets/interior-lobby.jpg";
import towerFacade       from "@/assets/tower-facade-twisted.png";
import towerLowAngle     from "@/assets/tower-lowangle-clouds.png";
import towerAerialDay    from "@/assets/tower-aerial-day.png";
import towerAerialSunset from "@/assets/tower-aerial-sunset.png";
import lobbyArches       from "@/assets/lobby-arches.jpg";
import somLobby          from "@/assets/som-lobby.jpg";
import officeCorr        from "@/assets/office-corridor.jpg";
import skylinePark       from "@/assets/skyline-park-panorama.jpg";
import cityView          from "@/assets/city-view-interior.jpg";
import entranceDusk      from "@/assets/entrance-dusk.jpg";
import towerBW           from "@/assets/tower-bw-1.png";
import somObservation    from "@/assets/som-observation.jpg";

/* ── Fade-in on scroll ── */
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
};

/* ── Parallax image ── */
const ParallaxImg = ({ src, alt, style = {} }: { src: string; alt: string; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  return (
    <div ref={ref} className="w-full h-full overflow-hidden">
      <motion.img src={src} alt={alt} style={{ y, scale: 1.14, width: "100%", height: "100%", objectFit: "cover", ...style }} />
    </div>
  );
};

/* ── Section: About Fluid Glass (§2) ── */
const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <section className="section bg-white">
      <div className="container-fluid">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label text-muted-foreground mb-6">About Al Hamra</p>
              <h2 className="font-serif font-light text-foreground"
                style={{ fontSize: "clamp(2rem, 4vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
                We bring architecture to life through precision and permanence.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:pt-16">
            <Reveal delay={0.1}>
              <p className="text-muted-foreground font-light mb-8" style={{ fontSize: "1.05rem", lineHeight: 1.85, maxWidth: 540 }}>
                {t("home.intro.p1") || "Al Hamra Tower stands as Kuwait's most significant architectural achievement — a structure of absolute presence, designed to endure beyond trends and cycles. Rising from the heart of Kuwait City, it commands attention through restraint."}
              </p>
              <Link to="/tower" className="btn-arrow">Who we are</Link>
            </Reveal>
          </div>
        </div>

        {/* Full-bleed image below intro — exactly like fluid.glass */}
        <Reveal delay={0.15} className="mt-16">
          <div style={{ height: "clamp(300px, 55vw, 700px)", overflow: "hidden" }}>
            <ParallaxImg src={somTowerSkyline} alt="Al Hamra Tower" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ── Section: Project Collection (§3) — 4-column card grid like fluid.glass ── */
const CollectionSection = () => {
  const { t } = useLanguage();
  const cards = [
    { title: "The Tower",    sub: "Architecture", img: towerFacade,    href: "/tower" },
    { title: "Business",     sub: "Workspaces",   img: interiorLobby,  href: "/business/workplace-experience" },
    { title: "Leasing",      sub: "Opportunities",img: officeCorr,     href: "/leasing/opportunities" },
    { title: "Experience",   sub: "Services",     img: lobbyArches,    href: "/services" },
  ];

  return (
    <section className="section" style={{ background: "#f9f9f7" }}>
      <div className="container-fluid">
        <div className="flex items-end justify-between mb-12">
          <Reveal>
            <p className="label text-muted-foreground mb-3">Explore</p>
            <h2 className="font-serif font-light text-foreground"
              style={{ fontSize: "clamp(2rem, 3.5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
              {t("home.links.title") || "Arrive. Ascend. Belong."}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/tower" className="btn-arrow hidden sm:inline-flex">View all</Link>
          </Reveal>
        </div>

        {/* 4-col card grid — fluid.glass style, NO rounded corners */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((card, i) => (
            <Reveal key={card.href} delay={i * 0.08}>
              <Link to={card.href} className="block group">
                <div style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}>
                  <motion.img src={card.img} alt={card.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    whileHover={{ scale: 1.04 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
                  {/* Hover overlay */}
                  <motion.div className="absolute inset-0 flex flex-col justify-end p-5"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }}
                    initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}>
                    <p className="label" style={{ color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>{card.sub}</p>
                    <p className="font-serif font-light text-white" style={{ fontSize: "1.2rem", letterSpacing: "-0.01em" }}>{card.title}</p>
                  </motion.div>
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <div>
                    <p className="label text-muted-foreground mb-1">{card.sub}</p>
                    <p className="font-serif font-light" style={{ fontSize: "1.1rem", letterSpacing: "-0.01em" }}>{card.title}</p>
                  </div>
                  <span className="label text-muted-foreground" style={{ transform: "translateX(0)", transition: "transform 0.3s ease" }}>→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Section: Stats ── */
const StatItem = ({ value, unit, label, desc, delay = 0 }: { value: number; unit: string; label: string; desc: string; delay?: number }) => {
  const { count, ref, isInView } = useCountUp({ end: value, duration: 1800, delay: delay * 1000 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="py-8 border-b" style={{ borderColor: "hsl(var(--border))" }}
    >
      <div className="flex items-end gap-1.5 mb-2">
        <span className="font-serif font-light text-foreground"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1, letterSpacing: "-0.03em" }}>{count}</span>
        <span className="text-muted-foreground font-light mb-1" style={{ fontSize: "1.2rem" }}>{unit}</span>
      </div>
      <p className="label text-muted-foreground mb-2">{label}</p>
      <p className="text-muted-foreground font-light" style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>{desc}</p>
    </motion.div>
  );
};

const StatsSection = () => (
  <section className="section bg-white">
    <div className="container-fluid">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="label text-muted-foreground mb-4">By the numbers</p>
            <h2 className="font-serif font-light"
              style={{ fontSize: "clamp(1.8rem, 3vw, 3.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              Defining<br />Kuwait's skyline
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <div className="border-t" style={{ borderColor: "hsl(var(--border))" }}>
            <StatItem value={413} unit="m"  label="Total height"    desc="Among the tallest buildings in the Gulf region" delay={0}   />
            <StatItem value={80}  unit="+"  label="Office floors"   desc="Premium Grade-A commercial floor plates"       delay={0.1} />
            <StatItem value={24}  unit="K+" label="sq.m GLA"        desc="Leasable office space across the tower"        delay={0.2} />
            <StatItem value={2011} unit=""  label="Year completed"  desc="A permanent fixture of the Kuwait City skyline" delay={0.3} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── Section: Showroom/Interior — like fluid.glass showroom ── */
const ShowroomSection = () => (
  <section className="section" style={{ background: "#f5f5f3" }}>
    <div className="container-fluid">
      <div className="grid lg:grid-cols-2 gap-3">
        {/* Left: tall stacked images */}
        <div className="flex flex-col gap-3">
          <Reveal>
            <div style={{ aspectRatio: "4/5", overflow: "hidden" }}>
              <ParallaxImg src={cityView} alt="Interior" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
              <ParallaxImg src={entranceDusk} alt="Entrance" />
            </div>
          </Reveal>
        </div>

        {/* Right: text + tall image */}
        <div className="flex flex-col gap-8 lg:pt-16">
          <Reveal>
            <p className="label text-muted-foreground mb-4">Interior</p>
            <h2 className="font-serif font-light text-foreground mb-6"
              style={{ fontSize: "clamp(1.8rem, 3vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              A place where<br />precision meets purpose.
            </h2>
            <p className="text-muted-foreground font-light mb-8" style={{ fontSize: "1rem", lineHeight: 1.85, maxWidth: 380 }}>
              The triple-height lobby sets the tone: soaring arches, curated lighting, and materials that speak of permanence. Every detail designed for organisations that lead.
            </p>
            <Link to="/business/workplace-experience" className="btn-arrow">Workplace experience</Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
              <ParallaxImg src={somLobby} alt="Lobby" />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

/* ── Section: Testimonials — numbered like fluid.glass ── */
const TESTIMONIALS = [
  {
    quote: "Al Hamra Tower represents a singular achievement in Gulf commercial architecture — presence, permanence, and an unrivalled workplace environment.",
    author: "Senior Partner", company: "Regional Architecture Firm", initials: "SP",
  },
  {
    quote: "The quality of the office environment and management is second to none in Kuwait City. Our team's productivity has measurably improved since relocating here.",
    author: "Chief Executive", company: "Financial Services Firm", initials: "CE",
  },
  {
    quote: "There is no comparable address in Kuwait. Al Hamra Tower signals to clients and talent alike that you are serious about what you do.",
    author: "Managing Director", company: "Professional Services", initials: "MD",
  },
];

const TestimonialsSection = () => {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];

  return (
    <section className="section border-t" style={{ borderColor: "hsl(var(--border))" }}>
      <div className="container-fluid">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="label text-muted-foreground mb-6">Client stories</p>
              {/* Numbered navigation — fluid.glass style */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-serif font-light text-foreground" style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>/</span>
                <span className="label text-muted-foreground">{String(TESTIMONIALS.length).padStart(2, "0")}</span>
              </div>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)}
                    className="transition-all duration-300"
                    style={{ width: i === idx ? 28 : 8, height: 2, background: i === idx ? "#111" : "#ddd", border: "none", cursor: "pointer", padding: 0 }} />
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div key={idx}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="font-serif font-light text-foreground mb-8"
                  style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)", lineHeight: 1.3, letterSpacing: "-0.015em" }}>
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center"
                    style={{ width: 44, height: 44, background: "#f0f0ee", fontFamily: "var(--font-display)", fontSize: "1rem", color: "#666" }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-light text-foreground" style={{ fontSize: "0.9rem" }}>{t.author}</p>
                    <p className="label text-muted-foreground">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Section: Approach / Featured projects ── */
const ProjectsSection = () => {
  const projects = [
    { img: towerAerialSunset, title: "The Sculptural Form",     sub: "Architecture & Engineering",  href: "/tower/design" },
    { img: towerLowAngle,     title: "Rising to 413 Metres",   sub: "Construction Story",           href: "/tower/rising" },
    { img: somObservation,    title: "Views Across Kuwait",     sub: "Perspective & Location",       href: "/location" },
    { img: towerAerialDay,    title: "Leasing Opportunities",   sub: "Grade-A Office Space",         href: "/leasing/opportunities" },
  ];

  return (
    <section className="section" style={{ borderTop: "1px solid hsl(var(--border))" }}>
      <div className="container-fluid">
        <div className="flex items-end justify-between mb-12">
          <Reveal>
            <p className="label text-muted-foreground mb-3">Featured</p>
            <h2 className="font-serif font-light"
              style={{ fontSize: "clamp(2rem, 3.5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
              Each story tells of<br />collaboration and precision.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/tower" className="btn-arrow hidden sm:inline-flex">View all</Link>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {projects.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.07}>
              <Link to={p.href} className="block group">
                <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                  <motion.img src={p.img} alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    whileHover={{ scale: 1.04 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
                </div>
                <div className="pt-4 border-t mt-0" style={{ borderColor: "hsl(var(--border))" }}>
                  <p className="label text-muted-foreground mb-1.5">{p.sub}</p>
                  <p className="font-serif font-light" style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}>{p.title}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Section: CTA strip ── */
const CTASection = () => (
  <section className="section border-t border-b" style={{ borderColor: "hsl(var(--border))" }}>
    <div className="container-fluid">
      <div className="grid lg:grid-cols-12 items-center gap-8">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="font-serif font-light text-foreground"
              style={{ fontSize: "clamp(2rem, 4vw, 4.5rem)", lineHeight: 1.0, letterSpacing: "-0.025em" }}>
              Where vision meets<br />execution
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-start">
          <Reveal delay={0.1}>
            <p className="text-muted-foreground font-light mb-6" style={{ fontSize: "1rem", lineHeight: 1.8 }}>
              Every great tenancy begins with understanding what your organisation truly needs. Begin the conversation today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/leasing/opportunities" className="btn-solid">Get in touch →</Link>
              <Link to="/tower" className="btn-outline">Our approach</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════════
   HOME PAGE
   ════════════════════════════════════════ */
const Home = () => (
  <div className="min-h-screen bg-white overflow-x-hidden">
    <Header />
    <main>
      <HeroSection />
      <AboutSection />
      <CollectionSection />
      <StatsSection />
      <ShowroomSection />
      <TestimonialsSection />
      <ProjectsSection />
      <CTASection />
    </main>
    <Footer />
  </div>
);

export default Home;
