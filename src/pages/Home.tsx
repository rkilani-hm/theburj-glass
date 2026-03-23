/**
 * Al Hamra Tower — Home Page
 * Monolithic Limestone design. Dark → Light → Dark alternation.
 * Every section earns its place.
 */
import { useRef, useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/alhamra/Header";
import HeroSection from "@/components/alhamra/HeroSection";
import Footer from "@/components/alhamra/Footer";
import useCountUp from "@/hooks/useCountUp";

gsap.registerPlugin(ScrollTrigger);

/* ── Assets ── */
import towerFull      from "@/assets/tower-full-blue-sky.png";
import towerFacade    from "@/assets/tower-facade-twisted.png";
import towerAerial    from "@/assets/tower-aerial-day.png";
import towerBW        from "@/assets/tower-bw-1.png";
import towerNight     from "@/assets/tower-night-illuminated.jpg";
import somLobby       from "@/assets/som-lobby.jpg";
import interiorLobby  from "@/assets/interior-lobby.jpg";
import cityView       from "@/assets/city-view-interior.jpg";
import somObservation from "@/assets/som-observation.jpg";
import officeCorr     from "@/assets/office-corridor.jpg";
import entranceDusk   from "@/assets/entrance-dusk.jpg";
import somSkyline     from "@/assets/som-tower-skyline.jpg";
import aerialGulf     from "@/assets/tower-aerial-gulf.jpg";
import towerDetail    from "@/assets/som-tower-detail.jpg";

/* ═══════════════════════════════
   ANIMATION PRIMITIVES
   ═══════════════════════════════ */

/** Lines of text reveal upward — for headlines */
const LineReveal = memo(({ lines, size, weight = 400, color = "var(--black)", delay = 0, italic = false }: {
  lines: string[]; size: string; weight?: number; color?: string; delay?: number; italic?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(".lr-line");
    gsap.fromTo(els,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.1, delay,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 86%", once: true } }
    );
  }, [delay]);
  return (
    <div ref={ref}>
      {lines.map((l, i) => (
        <div key={i} style={{ overflow: "hidden", lineHeight: 1.04 }}>
          <div className="lr-line" style={{
            fontFamily: "var(--font-display)",
            fontSize: size,
            fontWeight: weight,
            color,
            letterSpacing: "-0.025em",
            fontStyle: italic ? "italic" : "normal",
          }}>
            {l}
          </div>
        </div>
      ))}
    </div>
  );
});
LineReveal.displayName = "LineReveal";

/** Fade + rise on scroll enter */
const Reveal = memo(({ children, delay = 0, className = "", style = {} }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 1, delay,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } }
    );
  }, [delay]);
  return <div ref={ref} className={className} style={{ opacity: 0, ...style }}>{children}</div>;
});
Reveal.displayName = "Reveal";

/** Clip-path image wipe */
const WipeImage = memo(({ src, alt, ratio = "3/4", strength = 15, delay = 0, style = {} }: {
  src: string; alt: string; ratio?: string; strength?: number; delay?: number; style?: React.CSSProperties;
}) => {
  const ref  = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress: sp } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rawY = useTransform(sp, [0, 1], [`${strength}%`, `-${strength}%`]);
  const y    = useSpring(rawY, { stiffness: 65, damping: 25 });
  return (
    <div ref={ref} style={{ aspectRatio: ratio, overflow: "hidden", ...style }}>
      <motion.div style={{ width: "100%", height: "100%" }}
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={seen ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img src={src} alt={alt} loading="lazy"
          style={{ y, scale: 1.22, width: "100%", height: "100%", objectFit: "cover" }} />
      </motion.div>
    </div>
  );
});
WipeImage.displayName = "WipeImage";

/** Horizontal hairline draws left → right */
const DrawLine = memo(({ delay = 0, color = "var(--black)" }: { delay?: number; color?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelector(".dl-inner"),
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, delay,
        ease: "power3.out", transformOrigin: "left",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true } }
    );
  }, [delay]);
  return (
    <div ref={ref} style={{ height: 1, background: "rgba(0,0,0,0.08)", overflow: "hidden" }}>
      <div className="dl-inner" style={{ height: "100%", background: color, transform: "scaleX(0)" }} />
    </div>
  );
});
DrawLine.displayName = "DrawLine";

/* ═══════════════════════════════
   § 1 — THE STORY
   Dark section, full immersion
   ═══════════════════════════════ */
const StorySection = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useSpring(useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]), { stiffness: 55, damping: 22 });

  return (
    <section style={{ background: "#0A0A0A", padding: "clamp(6rem, 12vw, 12rem) 0" }}>
      <div className="container-fluid">
        {/* Header row */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
          <div className="lg:col-span-6">
            <Reveal style={{ marginBottom: 20 }}>
              <p className="eyebrow-light">The Architecture</p>
            </Reveal>
            <LineReveal
              lines={["A form", "carved from", "the desert sun."]}
              size="clamp(2.5rem, 5vw, 6rem)"
              color="rgba(255,255,255,0.92)"
              delay={0.1}
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-20">
            <Reveal delay={0.2}>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.88,
                color: "rgba(255,255,255,0.40)",
                marginBottom: 32,
              }}>
                Designed by Skidmore, Owings &amp; Merrill, Al Hamra Tower's form emerged 
                from a single mathematical gesture — removing a quarter of each floor, spiralling 
                from west to east as the building rises. The south facade becomes a monolithic 
                Jura limestone wall, an architectural bisht draped over the Kuwait skyline.
              </p>
              <Link to="/tower/design" className="btn-arrow-white">
                The Design Story
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Full-bleed tower image */}
        <Reveal>
          <div ref={imgRef} style={{ height: "clamp(400px, 65vw, 900px)", overflow: "hidden", position: "relative" }}>
            <motion.img
              src={towerFull}
              alt="Al Hamra Tower against blue sky"
              loading="eager"
              style={{
                y: imgY,
                scale: 1.12,
                width: "100%",
                height: "120%",
                objectFit: "cover",
                objectPosition: "center top",
                top: "-10%",
                position: "absolute",
              }}
            />
            {/* Caption overlay */}
            <div style={{
              position: "absolute",
              bottom: 32,
              left: 32,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}>
              <span className="eyebrow-light">Al Hamra Tower, Kuwait City</span>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 2vw, 2rem)",
                color: "rgba(255,255,255,0.60)",
                fontWeight: 300,
                letterSpacing: "-0.015em",
                fontStyle: "italic",
              }}>
                412.6 metres — 80 floors
              </span>
            </div>
          </div>
        </Reveal>

        {/* Three facts below image */}
        <div className="grid lg:grid-cols-3 gap-0 mt-1">
          {[
            { num: "500,000", unit: "tons", fact: "of concrete pumped vertically — the largest in Gulf construction history" },
            { num: "84,000", unit: "m²",   fact: "of Jura limestone facade — the world's tallest stone-clad tower" },
            { num: "289",    unit: "piles", fact: "driven 22–27 metres deep into Kuwait City bedrock" },
          ].map((f, i) => (
            <div key={i} style={{
              padding: "clamp(2rem, 4vw, 3.5rem)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <Reveal delay={i * 0.08}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 12 }}>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                    fontWeight: 300,
                    color: "#fff",
                    letterSpacing: "-0.04em",
                  }}>{f.num}</span>
                  <span style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.1em",
                  }}>{f.unit}</span>
                </div>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.35)",
                }}>{f.fact}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════
   § 2 — KEY STATISTICS
   White section with giant numbers
   ═══════════════════════════════ */
const StatCounter = ({ value, suffix = "", label, desc, index = 0 }: {
  value: number; suffix?: string; label: string; desc: string; index?: number;
}) => {
  const { count, ref, isInView } = useCountUp({ end: value, duration: 2000, delay: index * 150 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ padding: "clamp(2rem, 4vw, 3.5rem) 0" }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 10 }}>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 7vw, 8rem)",
          fontWeight: 300,
          lineHeight: 1,
          letterSpacing: "-0.045em",
          color: "var(--black)",
        }}>{count}</span>
        {suffix && (
          <span style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.8rem, 1.2vw, 1.2rem)",
            fontWeight: 300,
            color: "var(--stone)",
            paddingBottom: 8,
          }}>{suffix}</span>
        )}
      </div>
      <p className="eyebrow" style={{ marginBottom: 8 }}>{label}</p>
      <p style={{
        fontFamily: "var(--font-sans)",
        fontSize: "13px",
        fontWeight: 300,
        lineHeight: 1.65,
        color: "var(--stone)",
        maxWidth: 260,
      }}>{desc}</p>
    </motion.div>
  );
};

const StatsSection = () => (
  <section style={{ background: "var(--limestone)", overflow: "hidden" }}>
    <div className="container-fluid">
      {/* Section label row */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "clamp(5rem, 10vw, 10rem)",
        paddingBottom: "clamp(1.5rem, 3vw, 3rem)",
        borderBottom: "1px solid var(--rule-light)",
      }}>
        <Reveal>
          <p className="eyebrow">By the Numbers</p>
        </Reveal>
        <Reveal delay={0.1}>
          <LineReveal
            lines={["Kuwait's vertical city"]}
            size="clamp(1.2rem, 2vw, 2.2rem)"
            color="var(--graphite)"
            weight={400}
            italic
          />
        </Reveal>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {[
          { value: 412,  suffix: "m",    label: "Total Height",      desc: "Tallest building in Kuwait. 40th tallest globally." },
          { value: 80,   suffix: "",     label: "Floors",             desc: "Above-ground levels of premium commercial space." },
          { value: 43,   suffix: "",     label: "Elevators",          desc: "Including destination dispatch system." },
          { value: 2000, suffix: "+",    label: "Parking Spaces",     desc: "Across 11 below-grade levels." },
        ].map((s, i) => (
          <div key={i} style={{
            borderLeft: i > 0 ? "1px solid var(--rule-light)" : "none",
            paddingLeft: i > 0 ? "clamp(1.5rem, 3vw, 3rem)" : 0,
          }}>
            <StatCounter {...s} index={i} />
          </div>
        ))}
      </div>

      {/* Awards note */}
      <div style={{
        borderTop: "1px solid var(--rule-light)",
        paddingTop: "clamp(2rem, 4vw, 3.5rem)",
        paddingBottom: "clamp(5rem, 10vw, 10rem)",
        display: "flex",
        flexWrap: "wrap",
        gap: "clamp(2rem, 4vw, 4rem)",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Reveal>
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 2vw, 2.2rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--graphite)",
            maxWidth: 560,
            lineHeight: 1.4,
          }}>
            "Named one of the Best Inventions of 2011 — Time Magazine."
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Link to="/tower/recognition" className="btn-ghost-dark">
            Awards & Recognition →
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════
   § 3 — AWARDS MARQUEE
   Continuous scroll strip
   ═══════════════════════════════ */
const AwardsMarquee = () => {
  const AWARDS = [
    "Time Magazine · Best Inventions 2011",
    "CTBUH · Best Tall Building Finalist",
    "International Property Awards 2019/20 · Best Commercial High-Rise",
    "Honeywell · Smartest Building in Kuwait",
    "ACI Excellence · Concrete Construction 2015",
    "Emporis Skyscraper Award · Global Top 3",
    "World's Tallest Stone-Clad Tower",
  ];
  const doubled = [...AWARDS, ...AWARDS];

  return (
    <div style={{
      background: "var(--black)",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      padding: "18px 0",
      overflow: "hidden",
    }}>
      <div className="marquee-track">
        {doubled.map((a, i) => (
          <span key={i} style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.30)",
            paddingRight: "4rem",
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            gap: "4rem",
          }}>
            {a}
            <span style={{ color: "rgba(255,255,255,0.12)" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════
   § 4 — INSIDE THE TOWER
   Split-layout interior showcase
   ═══════════════════════════════ */
const InsideSection = () => {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: lP } = useScroll({ target: leftRef,  offset: ["start end", "end start"] });
  const { scrollYProgress: rP } = useScroll({ target: rightRef, offset: ["start end", "end start"] });
  const lY = useSpring(useTransform(lP, [0, 1], ["14%", "-14%"]), { stiffness: 55, damping: 22 });
  const rY = useSpring(useTransform(rP, [0, 1], ["20%", "-20%"]), { stiffness: 55, damping: 22 });

  return (
    <section style={{ background: "#fff", padding: "clamp(6rem, 12vw, 12rem) 0" }}>
      <div className="container-fluid">

        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-20">
          <div className="lg:col-span-5">
            <Reveal style={{ marginBottom: 20 }}>
              <p className="eyebrow">Inside Al Hamra</p>
            </Reveal>
            <LineReveal
              lines={["A lobby", "that sets the", "tone for everything."]}
              size="clamp(2rem, 4vw, 4.8rem)"
              delay={0.08}
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-24">
            <Reveal delay={0.2}>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.88,
                color: "var(--graphite)",
                marginBottom: 28,
              }}>
                The 24-metre-high lobby is a column-free space made possible by a 
                lamella steel roof structure — a technique drawn from Middle Eastern vernacular 
                architecture. No pillar interrupts the view from the entrance to the Arabian Gulf.
              </p>
              <Link to="/business/workplace-experience" className="btn-arrow">
                The Workplace Experience
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Image grid */}
        <div className="grid lg:grid-cols-12 gap-3">
          {/* Left: tall main image */}
          <div className="lg:col-span-7">
            <Reveal>
              <div ref={leftRef} style={{ height: "clamp(400px, 55vw, 700px)", overflow: "hidden" }}>
                <motion.img
                  src={somLobby}
                  alt="Al Hamra Tower lobby"
                  loading="lazy"
                  style={{
                    y: lY,
                    scale: 1.18,
                    width: "100%",
                    height: "120%",
                    objectFit: "cover",
                    top: "-10%",
                    position: "relative",
                  }}
                />
              </div>
              <div style={{ paddingTop: 14 }}>
                <p className="eyebrow" style={{ marginBottom: 4 }}>The Lobby</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--graphite)", fontStyle: "italic" }}>
                  24m column-free lamella structure
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: two stacked images */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <Reveal delay={0.1}>
              <WipeImage src={cityView} alt="Interior views" ratio="4/3" strength={12} delay={0.1} />
              <div style={{ paddingTop: 14 }}>
                <p className="eyebrow" style={{ marginBottom: 4 }}>Gulf Views</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--graphite)", fontStyle: "italic" }}>
                  270° panoramas of the Arabian Gulf
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div ref={rightRef} style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                <motion.img
                  src={somObservation}
                  alt="Sky observation"
                  loading="lazy"
                  style={{
                    y: rY,
                    scale: 1.18,
                    width: "100%",
                    height: "120%",
                    objectFit: "cover",
                    top: "-10%",
                    position: "relative",
                  }}
                />
              </div>
              <div style={{ paddingTop: 14 }}>
                <p className="eyebrow" style={{ marginBottom: 4 }}>Sky Lounge</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--graphite)", fontStyle: "italic" }}>
                  351m — Kuwait's highest dining
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Amenities strip */}
        <div style={{ marginTop: "clamp(4rem, 8vw, 8rem)" }}>
          <DrawLine />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              { title: "Sky Lounge",          desc: "351m. Kuwait's premier dining address at the summit.",     link: "/services" },
              { title: "Health Club",         desc: "State-of-the-art fitness facilities for tower tenants.",    link: "/services" },
              { title: "Sky Corridors",       desc: "Glass-enclosed walkways with panoramic city views.",        link: "/services" },
              { title: "Smart Building",      desc: "Honeywell-certified. 100% power redundancy.",              link: "/tower/dashboard" },
            ].map((a, i) => (
              <div key={i} style={{ padding: "clamp(2rem, 3.5vw, 3rem) 0" }}>
                <DrawLine delay={i * 0.08} />
                <Reveal delay={i * 0.06} style={{ paddingTop: 24 }}>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    color: "var(--black)",
                    marginBottom: 12,
                  }}>{a.title}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, lineHeight: 1.65, color: "var(--stone)", marginBottom: 20 }}>
                    {a.desc}
                  </p>
                  <Link to={a.link} className="btn-arrow" style={{ fontSize: "9px" }}>Learn more</Link>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════
   § 5 — THE BISHT STORY
   Dark editorial section
   ═══════════════════════════════ */
const BishtSection = () => {
  const ref  = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useSpring(useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]), { stiffness: 55, damping: 22 });

  return (
    <section style={{ background: "var(--charcoal)", overflow: "hidden" }}>
      <div className="container-fluid" style={{ padding: "clamp(6rem, 12vw, 12rem) clamp(1.25rem, 5vw, 5rem)" }}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Text side */}
          <div>
            <Reveal style={{ marginBottom: 20 }}>
              <p className="eyebrow-light">The Concept</p>
            </Reveal>
            <LineReveal
              lines={["Inspired by", "the bisht."]}
              size="clamp(3rem, 6vw, 7.5rem)"
              color="rgba(255,255,255,0.92)"
              delay={0.1}
            />
            <Reveal delay={0.25} style={{ marginTop: 32 }}>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.88,
                color: "rgba(255,255,255,0.40)",
                marginBottom: 32,
              }}>
                The Kuwaiti bisht — the ceremonial robe of distinction — drapes with 
                effortless gravity. SOM's lead designer Gary Haney found the same 
                quality in the tower's twisted form: a single fluid gesture, wrapping 
                upward, the stone face of the south wall revealed like a figure 
                emerging from cloth.
              </p>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.88,
                color: "rgba(255,255,255,0.40)",
                marginBottom: 40,
              }}>
                It is not coincidental that Kuwait's tallest building resembles 
                Kuwait's most important garment. Architecture and identity 
                converge here, 412 metres above the Arabian Gulf.
              </p>
              <Link to="/tower/design" className="btn-arrow-white">
                The Design Story
              </Link>
            </Reveal>
          </div>

          {/* Image side */}
          <Reveal delay={0.1}>
            <div ref={ref} style={{ aspectRatio: "2/3", overflow: "hidden" }}>
              <motion.img
                src={towerFacade}
                alt="Al Hamra Tower twisted limestone facade"
                loading="lazy"
                style={{
                  y: imgY,
                  scale: 1.18,
                  width: "100%",
                  height: "120%",
                  objectFit: "cover",
                  top: "-10%",
                  position: "relative",
                  filter: "contrast(1.05) brightness(0.9)",
                }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════
   § 6 — BUSINESS HIGHLIGHT
   White, clean, editorial
   ═══════════════════════════════ */
const BusinessSection = () => {
  const cards = [
    {
      img: officeCorr,
      label: "Grade-A Offices",
      title: "Standard & Executive Floors",
      desc: "2,300 m² per floor. Floor-to-ceiling glass. Arabian Gulf views. Your team works best here.",
      href: "/business/office-spaces",
      meta: "Floors 6–73",
    },
    {
      img: interiorLobby,
      label: "The Summit",
      title: "Executive Floors 74 & 75",
      desc: "The highest business address in Kuwait. Reserved for organisations that lead.",
      href: "/business/office-spaces",
      meta: "327–338m",
    },
    {
      img: towerDetail,
      label: "Technical Backbone",
      title: "Connectivity & Infrastructure",
      desc: "Fibre optic backbone, 5 substations, 100% power redundancy, smart building automation.",
      href: "/business/connectivity",
      meta: "LEED Compliant",
    },
  ];

  return (
    <section style={{ background: "var(--limestone)", padding: "clamp(6rem, 12vw, 12rem) 0" }}>
      <div className="container-fluid">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(3rem, 6vw, 6rem)", flexWrap: "wrap", gap: 24 }}>
          <div>
            <Reveal style={{ marginBottom: 18 }}>
              <p className="eyebrow">The Business Address</p>
            </Reveal>
            <LineReveal
              lines={["Where Kuwait's", "leadership works."]}
              size="clamp(2rem, 4vw, 5rem)"
              delay={0.08}
            />
          </div>
          <Reveal delay={0.15}>
            <Link to="/business/workplace-experience" className="btn-ghost-dark">
              Explore Workspaces →
            </Link>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-3">
          {cards.map((c, i) => (
            <Reveal key={c.href + i} delay={i * 0.09}>
              <Link to={c.href} className="block group" style={{ cursor: "pointer" }}>
                <div style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative", marginBottom: 16 }}>
                  <motion.img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* Overlay on hover */}
                  <motion.div
                    style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 55%)",
                      display: "flex", flexDirection: "column", justifyContent: "flex-end",
                      padding: "clamp(1rem, 2vw, 1.5rem)",
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "#fff", fontWeight: 400, letterSpacing: "-0.01em" }}>
                      {c.title}
                    </p>
                  </motion.div>
                  {/* Meta tag */}
                  <div style={{
                    position: "absolute", top: 16, right: 16,
                    background: "rgba(10,10,10,0.7)", backdropFilter: "blur(8px)",
                    padding: "5px 10px",
                  }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
                      {c.meta}
                    </span>
                  </div>
                </div>
                <p className="eyebrow" style={{ marginBottom: 8 }}>{c.label}</p>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--black)", marginBottom: 10 }}>
                  {c.title}
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, lineHeight: 1.65, color: "var(--stone)", marginBottom: 16 }}>
                  {c.desc}
                </p>
                <span className="btn-arrow" style={{ fontSize: "9px" }}>View details</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════
   § 7 — TOWER NIGHT / EXTERIOR
   Full-bleed dark with image
   ═══════════════════════════════ */
const NightSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useSpring(useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]), { stiffness: 55, damping: 22 });

  return (
    <section style={{ background: "var(--black)", overflow: "hidden" }}>
      <div ref={ref} style={{ position: "relative", height: "clamp(500px, 70vw, 900px)", overflow: "hidden" }}>
        <motion.img
          src={towerNight}
          alt="Al Hamra Tower at night"
          loading="lazy"
          style={{
            y: imgY,
            scale: 1.12,
            width: "100%",
            height: "120%",
            objectFit: "cover",
            objectPosition: "center 30%",
            top: "-10%",
            position: "absolute",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 50%, transparent 75%)",
        }} />

        {/* Content overlay */}
        <div style={{ position: "absolute", bottom: "clamp(3rem, 6vw, 6rem)", left: 0, right: 0 }}>
          <div className="container-fluid">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <p className="eyebrow-light" style={{ marginBottom: 20 }}>The Address</p>
                </Reveal>
                <LineReveal
                  lines={["Kuwait's most", "consequential", "building."]}
                  size="clamp(2.5rem, 5.5vw, 6.5rem)"
                  color="rgba(255,255,255,0.90)"
                  delay={0.1}
                />
                <Reveal delay={0.3}>
                  <p style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.95rem",
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.40)",
                    maxWidth: 480,
                    margin: "28px 0 36px",
                  }}>
                    At 92% occupancy, Al Hamra is home to over 120 tenants — embassies, 
                    ministries, regional headquarters, and Kuwait's leading private enterprises. 
                    To work here is to join something permanent.
                  </p>
                  <Link to="/leasing/opportunities" className="btn-primary">
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

/* ═══════════════════════════════
   § 8 — LEASING CTA
   Dark, high-contrast conversion
   ═══════════════════════════════ */
const LeasingCTA = () => (
  <section style={{ background: "var(--black)", padding: "clamp(6rem, 12vw, 12rem) 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
    <div className="container-fluid">
      <div className="grid lg:grid-cols-12 items-center gap-12">
        <div className="lg:col-span-8">
          <Reveal style={{ marginBottom: 20 }}>
            <p className="eyebrow-light">Available Now</p>
          </Reveal>
          <LineReveal
            lines={["Secure your position", "above Kuwait City."]}
            size="clamp(2.8rem, 6vw, 7.5rem)"
            color="rgba(255,255,255,0.90)"
            delay={0.08}
          />
        </div>
        <div className="lg:col-span-4">
          <Reveal delay={0.25}>
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.98rem",
              fontWeight: 300,
              lineHeight: 1.82,
              color: "rgba(255,255,255,0.38)",
              marginBottom: 40,
            }}>
              Standard office floors from 2,300 m². 
              Executive suites on floors 74–75. 
              Speak with our leasing team — response within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Link to="/leasing/opportunities" className="btn-primary">
                View Available Spaces →
              </Link>
              <Link to="/leasing/contact" className="btn-ghost-white">
                Contact Leasing Team
              </Link>
            </div>
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 12 }}>
                Direct Contact
              </p>
              <a href="tel:+96522270222" style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 300,
                letterSpacing: "-0.01em",
                color: "rgba(255,255,255,0.75)",
                display: "block",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
              >
                +965 222 70 222
              </a>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", marginTop: 4 }}>
                WhatsApp · Leasing Office
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════
   HOME PAGE
   ═══════════════════════════════ */
export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--black)", overflowX: "hidden" }}>
      <Header />
      <main>
        <HeroSection />
        <StorySection />
        <StatsSection />
        <AwardsMarquee />
        <InsideSection />
        <BishtSection />
        <BusinessSection />
        <NightSection />
        <LeasingCTA />
      </main>
      <Footer />
    </div>
  );
}
