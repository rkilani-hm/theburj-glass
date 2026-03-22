import { useRef, useState, useEffect, memo } from "react";
import Header from "@/components/alhamra/Header";
import HeroSection from "@/components/alhamra/HeroSection";
import Footer from "@/components/alhamra/Footer";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import useCountUp from "@/hooks/useCountUp";

gsap.registerPlugin(ScrollTrigger);

/* ── Assets ── */
import somTowerSkyline    from "@/assets/som-tower-skyline.jpg";
import interiorLobby      from "@/assets/interior-lobby.jpg";
import towerFacade        from "@/assets/tower-facade-twisted.png";
import towerLowAngle      from "@/assets/tower-lowangle-clouds.png";
import towerAerialDay     from "@/assets/tower-aerial-day.png";
import towerAerialSunset  from "@/assets/tower-aerial-sunset.png";
import lobbyArches        from "@/assets/lobby-arches.jpg";
import somLobby           from "@/assets/som-lobby.jpg";
import officeCorr         from "@/assets/office-corridor.jpg";
import cityView           from "@/assets/city-view-interior.jpg";
import entranceDusk       from "@/assets/entrance-dusk.jpg";
import somObservation     from "@/assets/som-observation.jpg";

/* ─────────────────────────────────────────────────────
   SHARED PRIMITIVES
   ───────────────────────────────────────────────────── */

/** GSAP-powered text curtain — each line slides up from behind */
const CurtainText = memo(({ lines, size = "clamp(2rem, 4vw, 4.5rem)", delay = 0 }: {
  lines: string[]; size?: string; delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(".curtain-line");
    gsap.fromTo(els,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.1, delay,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 86%", toggleActions: "play none none none" },
      }
    );
  }, [delay]);
  return (
    <div ref={ref}>
      {lines.map((l, i) => (
        <div key={i} style={{ overflow: "hidden", lineHeight: 1.06 }}>
          <div className="curtain-line" style={{ fontFamily: "var(--font-display)", fontSize: size, fontWeight: 400, letterSpacing: "-0.025em", color: "#0C0C0B" }}>
            {l}
          </div>
        </div>
      ))}
    </div>
  );
});
CurtainText.displayName = "CurtainText";

/** GSAP fade+rise */
const Reveal = memo(({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 1, delay, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none none" } }
    );
  }, [delay]);
  return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>;
});
Reveal.displayName = "Reveal";

/** Framer parallax image with clip-path reveal */
const WipeImage = memo(({ src, alt, aspectRatio = "4/3", strength = 18, delay = 0, className = "" }: {
  src: string; alt: string; aspectRatio?: string; strength?: number; delay?: number; className?: string;
}) => {
  const ref  = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], [`${strength}%`, `-${strength}%`]);
  const y    = useSpring(rawY, { stiffness: 70, damping: 28 });
  return (
    <div ref={ref} className={className} style={{ aspectRatio, overflow: "hidden" }}>
      <motion.div style={{ width: "100%", height: "100%" }}
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={seen ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img src={src} alt={alt} loading="lazy"
          style={{ y, scale: 1.22, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </motion.div>
    </div>
  );
});
WipeImage.displayName = "WipeImage";

/** Line draws left→right with GSAP */
const DrawLine = memo(({ delay = 0 }: { delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelector(".line-inner"),
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, delay, ease: "power3.out", transformOrigin: "left",
        scrollTrigger: { trigger: ref.current, start: "top 90%", toggleActions: "play none none none" } }
    );
  }, [delay]);
  return (
    <div ref={ref} style={{ height: 1, background: "#E8E8E5", overflow: "hidden" }}>
      <div className="line-inner" style={{ height: "100%", background: "#0C0C0B", transform: "scaleX(0)" }} />
    </div>
  );
});
DrawLine.displayName = "DrawLine";

/* ─────────────────────────────────────────────────────
   § 1 — ABOUT
   ───────────────────────────────────────────────────── */
const AboutSection = () => {
  const { t } = useLanguage();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useSpring(useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]), { stiffness: 60, damping: 24 });

  return (
    <section className="section" style={{ background: "#fff" }}>
      <div className="container-fluid">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-20">
          <div className="lg:col-span-5">
            <Reveal><p className="label" style={{ color: "#767672", marginBottom: 20 }}>About Al Hamra</p></Reveal>
            <CurtainText delay={0.1} lines={["We bring architecture", "to life through", "precision and permanence."]} size="clamp(1.9rem, 3.5vw, 4rem)" />
          </div>
          <div className="lg:col-span-7 lg:pt-20">
            <Reveal delay={0.25} style={{ maxWidth: 540 }}>
              <p style={{ fontSize: "1.02rem", lineHeight: 1.88, fontWeight: 300, color: "#767672", marginBottom: 32 }}>
                {t("home.intro.p1") || "Al Hamra Tower stands as Kuwait's most significant architectural achievement — a structure of absolute presence, designed to endure beyond trends and cycles."}
              </p>
              <Link to="/tower" className="btn-arrow">Who we are</Link>
            </Reveal>
          </div>
        </div>

        {/* Full-bleed parallax image */}
        <Reveal>
          <div ref={imgRef} style={{ height: "clamp(300px, 56vw, 740px)", overflow: "hidden" }}>
            <motion.img src={somTowerSkyline} alt="Al Hamra Tower" loading="lazy"
              style={{ y: imgY, scale: 1.15, width: "100%", height: "120%", objectFit: "cover", top: "-10%" }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────
   § 2 — COLLECTION (4-col)
   ───────────────────────────────────────────────────── */
const CollectionSection = () => {
  const { t } = useLanguage();
  const cards = [
    { title: "The Tower",  sub: "Architecture",  img: towerFacade,   href: "/tower" },
    { title: "Business",   sub: "Workspaces",     img: interiorLobby, href: "/business/workplace-experience" },
    { title: "Leasing",    sub: "Opportunities",  img: officeCorr,    href: "/leasing/opportunities" },
    { title: "Experience", sub: "Services",       img: lobbyArches,   href: "/services" },
  ];
  return (
    <section className="section" style={{ background: "#F5F5F3" }}>
      <div className="container-fluid">
        <div className="flex items-end justify-between mb-14">
          <div>
            <Reveal><p className="label" style={{ marginBottom: 16, color: "#767672" }}>Explore</p></Reveal>
            <CurtainText delay={0.08} lines={[t("home.links.title") || "Arrive. Ascend. Belong."]} size="clamp(2rem, 3.5vw, 4rem)" />
          </div>
          <Reveal delay={0.15} className="hidden sm:block">
            <Link to="/tower" className="btn-arrow">View all</Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((c, i) => (
            <Reveal key={c.href} delay={i * 0.08}>
              <Link to={c.href} className="block group">
                <div style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}>
                  <motion.img src={c.img} alt={c.title} loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    whileHover={{ scale: 1.06 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
                  <motion.div className="absolute inset-0 flex flex-col justify-end p-5"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.58) 0%, transparent 58%)" }}
                    initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                    <p className="label" style={{ color: "rgba(255,255,255,0.55)", marginBottom: 4 }}>{c.sub}</p>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 400, letterSpacing: "-0.015em", color: "#fff" }}>{c.title}</p>
                  </motion.div>
                </div>
                <div style={{ paddingTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p className="label" style={{ color: "#AAAAAA", marginBottom: 4 }}>{c.sub}</p>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 400, letterSpacing: "-0.01em" }}>{c.title}</p>
                  </div>
                  <motion.span className="label" style={{ color: "#AAAAAA" }} whileHover={{ x: 6 }} transition={{ duration: 0.3 }}>→</motion.span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────
   § 3 — STATS
   ───────────────────────────────────────────────────── */
const StatRow = ({ value, unit, label, desc, index = 0 }: {
  value: number; unit: string; label: string; desc: string; index?: number;
}) => {
  const { count, ref, isInView } = useCountUp({ end: value, duration: 2000, delay: index * 120 });
  return (
    <div ref={ref}>
      <DrawLine delay={index * 0.1} />
      <motion.div className="grid grid-cols-12 gap-4 items-center" style={{ padding: "24px 0" }}
        initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}>
        <div className="col-span-4 flex items-end gap-1.5">
          <span className="stat-number">{count}</span>
          {unit && <span style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 300, color: "#767672", paddingBottom: 6 }}>{unit}</span>}
        </div>
        <div className="col-span-4">
          <p className="label">{label}</p>
        </div>
        <div className="col-span-4 hidden sm:block">
          <p style={{ fontSize: "0.84rem", lineHeight: 1.6, fontWeight: 300, color: "#AAAAAA" }}>{desc}</p>
        </div>
      </motion.div>
    </div>
  );
};

const StatsSection = () => (
  <section className="section" style={{ background: "#fff" }}>
    <div className="container-fluid">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
        <div className="lg:col-span-4">
          <Reveal><p className="label" style={{ marginBottom: 18, color: "#767672" }}>By the numbers</p></Reveal>
          <CurtainText delay={0.1} lines={["Defining", "Kuwait's skyline"]} size="clamp(1.8rem, 3vw, 3.5rem)" />
        </div>
      </div>
      <StatRow value={413}  unit="m"  label="Total height"   desc="Among the tallest in the Gulf"             index={0} />
      <StatRow value={80}   unit="+"  label="Office floors"  desc="Premium Grade-A commercial floor plates"   index={1} />
      <StatRow value={24}   unit="K+" label="sq.m GLA"       desc="Leasable office space across the tower"    index={2} />
      <StatRow value={2011} unit=""   label="Year completed" desc="A permanent fixture of Kuwait's skyline"   index={3} />
      <DrawLine delay={0.4} />
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────
   § 4 — SHOWROOM / INTERIOR
   ───────────────────────────────────────────────────── */
const ShowroomSection = () => {
  const rightRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: rightRef, offset: ["start end", "end start"] });
  const rY = useSpring(useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]), { stiffness: 60, damping: 22 });
  return (
    <section className="section" style={{ background: "#F5F5F3" }}>
      <div className="container-fluid">
        <div className="grid lg:grid-cols-2 gap-3 lg:gap-5">
          <div className="flex flex-col gap-3 lg:gap-5">
            <Reveal><WipeImage src={cityView}     alt="Interior view" aspectRatio="4/5" strength={12} /></Reveal>
            <Reveal delay={0.1}><WipeImage src={entranceDusk} alt="Entrance at dusk" aspectRatio="4/3" strength={10} /></Reveal>
          </div>
          <div className="flex flex-col gap-8 lg:pt-20">
            <Reveal><p className="label" style={{ color: "#767672" }}>Interior</p></Reveal>
            <CurtainText delay={0.15} lines={["A place where", "precision meets purpose."]} size="clamp(1.8rem, 3vw, 3.5rem)" />
            <Reveal delay={0.28} style={{ maxWidth: 380 }}>
              <p style={{ fontSize: "1rem", lineHeight: 1.88, fontWeight: 300, color: "#767672", marginBottom: 28 }}>
                The triple-height lobby sets the tone: soaring arches, curated lighting, and materials that speak of permanence.
              </p>
              <Link to="/business/workplace-experience" className="btn-arrow">Workplace experience</Link>
            </Reveal>
            <Reveal delay={0.12}>
              <div ref={rightRef} style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                <motion.img src={somLobby} alt="Lobby" loading="lazy"
                  style={{ y: rY, scale: 1.22, width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────
   § 5 — TESTIMONIALS
   ───────────────────────────────────────────────────── */
const TESTIMONIALS = [
  { quote: "Al Hamra Tower represents a singular achievement in Gulf commercial architecture — presence, permanence, and an unrivalled workplace environment.", author: "Senior Partner", company: "Regional Architecture Firm", initials: "SP" },
  { quote: "The quality of the office environment is second to none in Kuwait City. Our team's productivity has measurably improved since relocating here.", author: "Chief Executive", company: "Financial Services Firm", initials: "CE" },
  { quote: "There is no comparable address in Kuwait. Al Hamra Tower signals to clients and talent alike that you are serious about what you do.", author: "Managing Director", company: "Professional Services", initials: "MD" },
];

const TestimonialsSection = () => {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];
  return (
    <section className="section" style={{ borderTop: "1px solid #E8E8E5", borderBottom: "1px solid #E8E8E5" }}>
      <div className="container-fluid">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <Reveal><p className="label" style={{ marginBottom: 20, color: "#767672" }}>Client stories</p></Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "-0.02em", color: "#0C0C0B" }}>{String(idx + 1).padStart(2, "0")}</span>
                <span style={{ color: "#AAAAAA", fontSize: "0.8rem" }}>/</span>
                <span className="label">{String(TESTIMONIALS.length).padStart(2, "0")}</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {TESTIMONIALS.map((_, i) => (
                  <motion.button key={i} onClick={() => setIdx(i)}
                    style={{ height: 2, background: i === idx ? "#0C0C0B" : "#E8E8E5", border: "none", cursor: "pointer", padding: 0 }}
                    animate={{ width: i === idx ? 28 : 8 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} />
                ))}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div key={idx}
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <blockquote style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2.4vw, 2.2rem)", lineHeight: 1.32, letterSpacing: "-0.015em", fontWeight: 400, color: "#0C0C0B", marginBottom: 28 }}>
                  "{t.quote}"
                </blockquote>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 42, height: 42, background: "#EDEDE9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "0.95rem", color: "#767672", flexShrink: 0 }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.88rem", fontWeight: 400, color: "#0C0C0B" }}>{t.author}</p>
                    <p className="label">{t.company}</p>
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

/* ─────────────────────────────────────────────────────
   § 6 — FEATURED PROJECTS
   ───────────────────────────────────────────────────── */
const ProjectsSection = () => {
  const projects = [
    { img: towerAerialSunset, title: "The Sculptural Form",   sub: "Architecture & Engineering", href: "/tower/design"          },
    { img: towerLowAngle,     title: "Rising to 413 Metres",  sub: "Construction Story",         href: "/tower/rising"          },
    { img: somObservation,    title: "Views Across Kuwait",   sub: "Perspective & Location",     href: "/location"              },
    { img: towerAerialDay,    title: "Leasing Opportunities", sub: "Grade-A Office Space",       href: "/leasing/opportunities" },
  ];
  return (
    <section className="section" style={{ background: "#fff" }}>
      <div className="container-fluid">
        <div className="flex items-end justify-between mb-14">
          <div>
            <Reveal><p className="label" style={{ marginBottom: 16, color: "#767672" }}>Featured</p></Reveal>
            <CurtainText delay={0.1} lines={["Each story tells of", "collaboration and precision."]} size="clamp(2rem, 3.5vw, 4rem)" />
          </div>
          <Reveal delay={0.15} className="hidden sm:block">
            <Link to="/tower" className="btn-arrow">View all</Link>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {projects.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.08}>
              <Link to={p.href} className="block group">
                <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                  <motion.img src={p.img} alt={p.title} loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    whileHover={{ scale: 1.06 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
                </div>
                <div style={{ paddingTop: 14 }}>
                  <DrawLine delay={0.05 + i * 0.07} />
                  <p className="label" style={{ marginTop: 12, marginBottom: 6, color: "#AAAAAA" }}>{p.sub}</p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 400, letterSpacing: "-0.01em" }}>{p.title}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────
   § 7 — CTA
   ───────────────────────────────────────────────────── */
const CTASection = () => (
  <section className="section" style={{ borderTop: "1px solid #E8E8E5" }}>
    <div className="container-fluid">
      <div className="grid lg:grid-cols-12 items-center gap-8">
        <div className="lg:col-span-7">
          <CurtainText delay={0} lines={["Where vision meets", "execution"]} size="clamp(2.4rem, 5vw, 5.5rem)" />
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.2} style={{ maxWidth: 440 }}>
            <p style={{ fontSize: "1rem", lineHeight: 1.84, fontWeight: 300, color: "#767672", marginBottom: 32 }}>
              Every great tenancy begins with understanding what your organisation truly needs. Begin the conversation today.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link to="/leasing/opportunities" className="btn-solid">Get in touch →</Link>
              <Link to="/tower" className="btn-outline">Our approach</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────
   HOME PAGE
   ───────────────────────────────────────────────────── */
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
