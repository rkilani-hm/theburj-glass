/**
 * Al Hamra Tower — Home Page
 * LIGHT PALETTE throughout. White / Warm Stone surfaces.
 * Only the hero video is dark. Every section after is light.
 */
import { useRef, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/alhamra/Header";
import HeroSection from "@/components/alhamra/HeroSection";
import Footer from "@/components/alhamra/Footer";
import useCountUp from "@/hooks/useCountUp";

gsap.registerPlugin(ScrollTrigger);

import towerFacade     from "@/assets/tower-facade-twisted.png";
import towerAerialDay  from "@/assets/tower-aerial-day.png";
import towerNight      from "@/assets/tower-night-illuminated.jpg";
import somLobby        from "@/assets/som-lobby.jpg";
import interiorLobby   from "@/assets/interior-lobby.jpg";
import cityView        from "@/assets/city-view-interior.jpg";
import somObservation  from "@/assets/som-observation.jpg";
import officeCorr      from "@/assets/office-corridor.jpg";
import somTowerSkyline from "@/assets/som-tower-skyline.jpg";
import towerDetail     from "@/assets/som-tower-detail.jpg";

/* ══════════════════ ANIMATION PRIMITIVES ══════════════════ */

const LineReveal = memo(({ lines, size, color = "var(--ink)", italic = false, delay = 0 }: {
  lines: string[]; size: string; color?: string; italic?: boolean; delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(".lr");
    gsap.fromTo(els,
      { yPercent: 108, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.09, delay,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 87%", once: true } }
    );
  }, [delay]);
  return (
    <div ref={ref}>
      {lines.map((l, i) => (
        <div key={i} style={{ overflow: "hidden", lineHeight: 1.06 }}>
          <div className="lr" style={{
            fontFamily: "var(--font-display)", fontSize: size, fontWeight: 400,
            color, letterSpacing: "-0.025em",
            fontStyle: italic ? "italic" : "normal",
          }}>{l}</div>
        </div>
      ))}
    </div>
  );
});
LineReveal.displayName = "LineReveal";

const Reveal = memo(({ children, delay = 0, style = {}, className = "" }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.95, delay,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } }
    );
  }, [delay]);
  return <div ref={ref} className={className} style={{ opacity: 0, ...style }}>{children}</div>;
});
Reveal.displayName = "Reveal";

const WipeImage = memo(({ src, alt, ratio = "4/3", strength = 12, delay = 0, style = {} }: {
  src: string; alt: string; ratio?: string; strength?: number; delay?: number; style?: React.CSSProperties;
}) => {
  const ref  = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress: sp } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rawY = useTransform(sp, [0, 1], [`${strength}%`, `-${strength}%`]);
  const y    = useSpring(rawY, { stiffness: 65, damping: 26 });
  return (
    <div ref={ref} style={{ aspectRatio: ratio, overflow: "hidden", ...style }}>
      <motion.div style={{ width: "100%", height: "100%" }}
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={seen ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
        transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img src={src} alt={alt} loading="lazy"
          style={{ y, scale: 1.20, width: "100%", height: "100%", objectFit: "cover" }} />
      </motion.div>
    </div>
  );
});
WipeImage.displayName = "WipeImage";

const DrawLine = memo(({ delay = 0, color = "var(--ink)" }: { delay?: number; color?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelector(".dl"),
      { scaleX: 0 },
      { scaleX: 1, duration: 1.3, delay, ease: "power3.out", transformOrigin: "left",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true } }
    );
  }, [delay]);
  return (
    <div ref={ref} style={{ height: 1, background: "var(--border)", overflow: "hidden" }}>
      <div className="dl" style={{ height: "100%", background: color, transform: "scaleX(0)" }} />
    </div>
  );
});
DrawLine.displayName = "DrawLine";

/* ══════════════════ § 1 — ABOUT / INTRO ══════════════════
   White background. Editorial 2-col layout.              */
const AboutSection = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]), { stiffness: 55, damping: 22 });

  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(6rem, 12vw, 12rem) 0" }}>
      <div className="container-fluid">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-20">
          <div className="lg:col-span-5">
            <Reveal style={{ marginBottom: 20 }}>
              <p className="eyebrow">About the Tower</p>
            </Reveal>
            <LineReveal lines={["Carved from", "the desert sun."]} size="clamp(2.2rem, 4vw, 5rem)" delay={0.08} />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-20">
            <Reveal delay={0.18}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.90, color: "var(--ink-light)", marginBottom: 32 }}>
                Designed by Skidmore, Owings &amp; Merrill, Al Hamra Business Tower's form
                emerged from a single architectural gesture — removing a quarter of each floor,
                spiralling upward from west to east. The south facade becomes a monolithic
                Jura limestone wall: the world's tallest sculpted concrete tower, rising
                412 metres above Kuwait City.
              </p>
              <Link to="/tower/design" className="btn-arrow">The Design Story</Link>
            </Reveal>
          </div>
        </div>

        {/* Full-bleed parallax image */}
        <Reveal>
          <div ref={imgRef} style={{ height: "clamp(350px, 58vw, 780px)", overflow: "hidden", position: "relative" }}>
            <motion.img src={somTowerSkyline} alt="Al Hamra Tower skyline" loading="lazy"
              style={{ y, scale: 1.14, width: "100%", height: "120%", objectFit: "cover", objectPosition: "center top", position: "absolute", top: "-10%" }} />
            {/* Light overlay at bottom — no text */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "25%",
              background: "linear-gradient(to top, rgba(255,255,255,0.50), transparent)" }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ══════════════════ § 2 — KEY STATISTICS ══════════════════
   Warm stone background. Giant numbers.                   */
const StatItem = ({ value, suffix = "", label, desc, index = 0 }: {
  value: number; suffix?: string; label: string; desc: string; index?: number;
}) => {
  const { count, ref, isInView } = useCountUp({ end: value, duration: 1800, delay: index * 150 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ padding: "clamp(2rem, 4vw, 3.5rem) 0" }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginBottom: 10 }}>
        <span className="stat-num">{count}</span>
        {suffix && <span style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--ink-light)", paddingBottom: 6 }}>{suffix}</span>}
      </div>
      <p className="eyebrow" style={{ marginBottom: 8 }}>{label}</p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, lineHeight: 1.65, color: "var(--ink-faint)", maxWidth: 240 }}>{desc}</p>
    </motion.div>
  );
};

const StatsSection = () => (
  <section style={{ background: "var(--surface)", padding: "0" }}>
    <div className="container-fluid">
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap",
        paddingTop: "clamp(4rem, 8vw, 8rem)", paddingBottom: "clamp(1.5rem, 3vw, 2.5rem)",
        borderBottom: "1px solid var(--border)" }}>
        <Reveal><p className="eyebrow">By the Numbers</p></Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 1.8vw, 2rem)", fontStyle: "italic", color: "var(--ink-light)", fontWeight: 300 }}>
            The standard for Gulf commercial architecture.
          </p>
        </Reveal>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {[
          { value: 412,  suffix: "m",  label: "Total Height",   desc: "Tallest building in Kuwait. One of the tallest in the world." },
          { value: 80,   suffix: "",   label: "Floors",          desc: "Above-ground levels of premium commercial space." },
          { value: 43,   suffix: "",   label: "Elevators",       desc: "Including destination dispatch system." },
          { value: 2000, suffix: "+",  label: "Parking Spaces",  desc: "Across 11 below-grade levels." },
        ].map((s, i) => (
          <div key={i} style={{
            paddingLeft: i > 0 ? "clamp(1.5rem, 3vw, 3rem)" : 0,
            borderLeft: i > 0 ? "1px solid var(--border)" : "none",
          }}>
            <StatItem {...s} index={i} />
          </div>
        ))}
      </div>
      {/* Awards quote */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24,
        paddingTop: "clamp(2rem, 4vw, 3rem)", paddingBottom: "clamp(4rem, 8vw, 8rem)",
        borderTop: "1px solid var(--border)" }}>
        <Reveal>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2vw, 2.2rem)", fontStyle: "italic", fontWeight: 300, color: "var(--ink-mid)", maxWidth: 560, lineHeight: 1.4 }}>
            "Named one of the Best Inventions of 2011 — Time Magazine."
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <Link to="/tower/recognition" className="btn-outline">Awards & Recognition →</Link>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ══════════════════ § 3 — AWARDS MARQUEE ══════════════════
   Warm stone strip. Subtle, elegant scrolling awards.     */
const AwardsMarquee = () => {
  const AWARDS = [
    "Time Magazine · Best Inventions 2011",
    "World's Tallest Stone-Clad Tower",
    "CTBUH · Best Tall Building Finalist",
    "International Property Awards 2019 · Best Commercial High-Rise",
    "Honeywell · Smartest Building in Kuwait",
    "ACI Excellence · Concrete Construction 2015",
    "Emporis Skyscraper Award · Global Top 3",
  ];
  const doubled = [...AWARDS, ...AWARDS];
  return (
    <div style={{ background: "var(--surface-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "16px 0", overflow: "hidden" }}>
      <div className="marquee-track">
        {doubled.map((a, i) => (
          <span key={i} style={{
            fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--ink-light)", paddingRight: "3.5rem", whiteSpace: "nowrap",
            display: "inline-flex", alignItems: "center", gap: "3.5rem",
          }}>
            {a}
            <span style={{ color: "var(--border-mid)", fontSize: "6px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════ § 4 — INSIDE THE TOWER ══════════════════
   White background. Tower interior photography.           */
const InsideSection = () => {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: lP } = useScroll({ target: leftRef,  offset: ["start end", "end start"] });
  const { scrollYProgress: rP } = useScroll({ target: rightRef, offset: ["start end", "end start"] });
  const lY = useSpring(useTransform(lP, [0, 1], ["12%", "-12%"]), { stiffness: 55, damping: 22 });
  const rY = useSpring(useTransform(rP, [0, 1], ["18%", "-18%"]), { stiffness: 55, damping: 22 });

  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(6rem, 12vw, 12rem) 0" }}>
      <div className="container-fluid">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-16 lg:mb-20">
          <div className="lg:col-span-5">
            <Reveal style={{ marginBottom: 20 }}><p className="eyebrow">Inside Al Hamra</p></Reveal>
            <LineReveal lines={["A lobby", "that sets the", "tone for everything."]} size="clamp(2rem, 3.8vw, 4.8rem)" delay={0.08} />
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-24">
            <Reveal delay={0.2}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.88, color: "var(--ink-light)", marginBottom: 28 }}>
                The 24-metre-high lobby is a column-free space — made possible by a lamella steel
                roof structure drawn from Middle Eastern vernacular architecture. No pillar
                interrupts the view from the entrance through to the Arabian Gulf.
              </p>
              <Link to="/business/workplace-experience" className="btn-arrow">The Workplace Experience</Link>
            </Reveal>
          </div>
        </div>

        {/* Image grid */}
        <div className="grid lg:grid-cols-12 gap-3">
          <div className="lg:col-span-7">
            <Reveal>
              <div ref={leftRef} style={{ height: "clamp(360px, 52vw, 680px)", overflow: "hidden" }}>
                <motion.img src={somLobby} alt="Al Hamra Tower lobby" loading="lazy"
                  style={{ y: lY, scale: 1.16, width: "100%", height: "120%", objectFit: "cover", position: "relative", top: "-10%" }} />
              </div>
              <div style={{ paddingTop: 14 }}>
                <p className="eyebrow" style={{ marginBottom: 5 }}>The Lobby</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontStyle: "italic", color: "var(--ink-light)" }}>24m column-free lamella structure</p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            <Reveal delay={0.08}>
              <WipeImage src={cityView} alt="Interior views" ratio="4/3" strength={10} delay={0.08} />
              <div style={{ paddingTop: 14 }}>
                <p className="eyebrow" style={{ marginBottom: 5 }}>Gulf Views</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontStyle: "italic", color: "var(--ink-light)" }}>270° panoramas of the Arabian Gulf</p>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div ref={rightRef} style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                <motion.img src={somObservation} alt="Sky Lounge" loading="lazy"
                  style={{ y: rY, scale: 1.16, width: "100%", height: "120%", objectFit: "cover", position: "relative", top: "-10%" }} />
              </div>
              <div style={{ paddingTop: 14 }}>
                <p className="eyebrow" style={{ marginBottom: 5 }}>Sky Lounge</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontStyle: "italic", color: "var(--ink-light)" }}>351m — Kuwait's highest dining</p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Amenities */}
        <div style={{ marginTop: "clamp(4rem, 8vw, 8rem)" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Sky Lounge",     desc: "351 metres elevation. Kuwait's premier dining and event address.", href: "/services" },
              { title: "Health Club",    desc: "State-of-the-art fitness facilities for tower tenants.",           href: "/services" },
              { title: "Sky Corridors", desc: "Glass-enclosed walkways offering panoramic views of the city.",    href: "/services" },
              { title: "Smart Building",desc: "Honeywell-certified. 100% power redundancy. 5 substations.",      href: "/tower/dashboard" },
            ].map((a, i) => (
              <div key={i} style={{
                paddingTop: "clamp(2rem, 3.5vw, 3rem)",
                paddingRight: i < 3 ? "clamp(1.5rem, 3vw, 3rem)" : 0,
              }}>
                <DrawLine delay={i * 0.08} />
                <Reveal delay={i * 0.07} style={{ paddingTop: 22 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 400, color: "var(--ink)", marginBottom: 10 }}>{a.title}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, lineHeight: 1.65, color: "var(--ink-light)", marginBottom: 18 }}>{a.desc}</p>
                  <Link to={a.href} className="btn-arrow" style={{ fontSize: "9px" }}>Learn more</Link>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════ § 6 — BUSINESS CARDS ══════════════════
   White background. Three office card types.              */
const BusinessSection = () => {
  const cards = [
    { img: officeCorr,   label: "Grade-A Offices",   title: "Standard & Executive Floors",
      desc: "2,300 m² per floor. Floor-to-ceiling glass. Arabian Gulf views.", href: "/business/office-spaces", meta: "Floors 6–73" },
    { img: interiorLobby, label: "The Summit",        title: "Executive Floors 74 & 75",
      desc: "The highest business address in Kuwait. For organisations that lead.", href: "/business/office-spaces", meta: "327–338m" },
    { img: towerDetail,   label: "Infrastructure",   title: "Smart Building Systems",
      desc: "Fibre optic backbone, 5 substations, 100% power redundancy.", href: "/business/connectivity", meta: "LEED Compliant" },
  ];
  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(6rem, 12vw, 12rem) 0" }}>
      <div className="container-fluid">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: "clamp(3rem, 6vw, 6rem)" }}>
          <div>
            <Reveal style={{ marginBottom: 18 }}><p className="eyebrow">The Business Address</p></Reveal>
            <LineReveal lines={["Where Kuwait's", "leadership works."]} size="clamp(2rem, 4vw, 5rem)" delay={0.06} />
          </div>
          <Reveal delay={0.14}>
            <Link to="/business/workplace-experience" className="btn-outline">Explore Workspaces →</Link>
          </Reveal>
        </div>
        <div className="grid lg:grid-cols-3 gap-3">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.09}>
              <Link to={c.href} className="block group">
                <div style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative", background: "var(--surface)" }}>
                  <motion.img src={c.img} alt={c.title} loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* Hover overlay */}
                  <motion.div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(15,15,14,0.65) 0%, transparent 55%)",
                    display: "flex", flexDirection: "column", justifyContent: "flex-end",
                    padding: "clamp(1rem, 2vw, 1.5rem)",
                  }}
                    initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 400, color: "#fff", letterSpacing: "-0.01em" }}>{c.title}</p>
                  </motion.div>
                  <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)", padding: "4px 10px" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-mid)" }}>{c.meta}</span>
                  </div>
                </div>
                <div style={{ paddingTop: 16 }}>
                  <DrawLine delay={0.04 + i * 0.06} />
                  <p className="eyebrow" style={{ marginTop: 14, marginBottom: 8 }}>{c.label}</p>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 400, color: "var(--ink)", marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, lineHeight: 1.65, color: "var(--ink-light)", marginBottom: 14 }}>{c.desc}</p>
                  <span className="btn-arrow" style={{ fontSize: "9px" }}>View details</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ══════════════════ § 7 — TOWER AT NIGHT (full-bleed) ══════
   The ONE dark section — a full-bleed night photograph.
   This is intentional: one moment of drama after all light.  */
const NightSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]), { stiffness: 55, damping: 22 });

  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div ref={ref} style={{ height: "clamp(480px, 65vw, 860px)", overflow: "hidden", position: "relative" }}>
        <motion.img src={towerNight} alt="Al Hamra Tower at night" loading="lazy"
          style={{ y, scale: 1.10, width: "100%", height: "120%", objectFit: "cover", objectPosition: "center 30%", position: "absolute", top: "-10%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,12,8,0.88) 0%, rgba(15,12,8,0.30) 40%, transparent 70%)" }} />

        <div style={{ position: "absolute", bottom: "clamp(3rem, 6vw, 6rem)", left: 0, right: 0 }}>
          <div className="container-fluid">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 22 }}>
                    The Address
                  </p>
                </Reveal>
                <LineReveal lines={["The address", "that defines", "Kuwait City."]}
                  size="clamp(2.2rem, 5vw, 6.5rem)" color="rgba(255,255,255,0.88)" delay={0.1} />
                <Reveal delay={0.28}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.80, color: "rgba(255,255,255,0.38)", maxWidth: 480, margin: "24px 0 32px" }}>
                    Al Sharq District, Kuwait City. Adjacent to the Arabian Gulf waterfront,
                    minutes from the diplomatic quarter and Kuwait's central government offices.
                    The location is as deliberate as the architecture.
                  </p>
                  <Link to="/leasing/opportunities" style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "14px 30px", background: "#fff", color: "#0F0F0E",
                    fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400,
                    letterSpacing: "0.14em", textTransform: "uppercase", transition: "background 0.25s",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#F0EDE7")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#fff")}
                  >
                    Enquire About Availability
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════ § 8 — LEASING CTA ══════════════════
   Warm stone background. Clean conversion section.       */
const LeasingCTA = () => (
  <section style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", padding: "clamp(6rem, 12vw, 12rem) 0" }}>
    <div className="container-fluid">
      <div className="grid lg:grid-cols-12 items-center gap-12">
        <div className="lg:col-span-7">
          <Reveal style={{ marginBottom: 22 }}><p className="eyebrow">Available Now</p></Reveal>
          <LineReveal lines={["Secure your position", "above Kuwait City."]} size="clamp(2.5rem, 5.5vw, 7rem)" delay={0.06} />
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={0.2}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.82, color: "var(--ink-light)", marginBottom: 36 }}>
              Standard office floors from 2,300 m². Executive suites on floors 74–75.
              Speak with our leasing team — response within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link to="/leasing/opportunities" className="btn-primary">View Available Spaces →</Link>
              <Link to="/leasing/contact" className="btn-outline">Contact Leasing Team</Link>
            </div>
            <div style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid var(--border)" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 10 }}>
                Direct Contact
              </p>
              <a href="tel:+96522270222" style={{
                fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 300,
                letterSpacing: "-0.01em", color: "var(--ink)", display: "block", transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--ink-mid)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--ink)")}
              >
                +965 222 70 222
              </a>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.08em", color: "var(--ink-faint)", marginTop: 4 }}>
                WhatsApp · Leasing Office
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════ HOME PAGE ═══════════════════ */
export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", overflowX: "hidden" }}>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <AwardsMarquee />
        <InsideSection />
        <BusinessSection />
        <NightSection />
        <LeasingCTA />
      </main>
      <Footer />
    </div>
  );
}
