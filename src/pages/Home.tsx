import { useRef, useState } from "react";
import Header from "@/components/alhamra/Header";
import HeroSection from "@/components/alhamra/HeroSection";
import Footer from "@/components/alhamra/Footer";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from "framer-motion";
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
import cityView          from "@/assets/city-view-interior.jpg";
import entranceDusk      from "@/assets/entrance-dusk.jpg";
import somObservation    from "@/assets/som-observation.jpg";

/* ─────────────────────────────────────────────────────────
   ANIMATION PRIMITIVES
   ───────────────────────────────────────────────────────── */

/** Cormorant headline: each line reveals like a curtain rolling up */
const SplitReveal = ({
  lines,
  delay = 0,
  size = "clamp(2rem, 4vw, 4.5rem)",
}: {
  lines: string[];
  delay?: number;
  size?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: "hidden", lineHeight: 1.08 }}>
          <motion.h2
            className="font-serif font-light text-foreground"
            style={{ fontSize: size, letterSpacing: "-0.025em", margin: 0 }}
            initial={{ y: "105%" }}
            animate={inView ? { y: 0 } : { y: "105%" }}
            transition={{
              duration: 1.1,
              delay: delay + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.h2>
        </div>
      ))}
    </div>
  );
};

/** Label fades + slides up */
const FadeLabel = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/** Body text: word-by-word opacity wave */
const FadeText = ({
  children,
  delay = 0,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/** Image: clip-path wipe from bottom + parallax inside */
const WipeImage = ({
  src,
  alt,
  aspectRatio = "4/3",
  parallaxStrength = 18,
  delay = 0,
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
  parallaxStrength?: number;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${parallaxStrength}%`, `-${parallaxStrength}%`]
  );
  const y = useSpring(rawY, { stiffness: 80, damping: 30 });

  return (
    <div ref={ref} style={{ aspectRatio, overflow: "hidden" }}>
      <motion.div
        style={{ width: "100%", height: "100%" }}
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={src}
          alt={alt}
          style={{
            y,
            scale: 1.22,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </motion.div>
    </div>
  );
};

/** Card: slides up + slight X offset, staggered */
const CardReveal = ({
  children,
  index = 0,
  xOffset = 0,
}: {
  children: React.ReactNode;
  index?: number;
  xOffset?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, x: xOffset, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      transition={{
        duration: 1.0,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

/** Horizontal line draws from left to right */
const DrawLine = ({ delay = 0 }: { delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} style={{ height: 1, background: "#E8E8E8", overflow: "hidden" }}>
      <motion.div
        style={{ height: "100%", background: "#1A1A1A", transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   § 1 — ABOUT
   ───────────────────────────────────────────────────────── */
const AboutSection = () => {
  const { t } = useLanguage();

  /* The full-bleed image scrolls continuously */
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: imgProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useSpring(
    useTransform(imgProgress, [0, 1], ["10%", "-10%"]),
    { stiffness: 60, damping: 24 }
  );

  return (
    <section className="section bg-white" style={{ overflow: "hidden" }}>
      <div className="container-fluid">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-16 lg:mb-24">
          {/* Headline — curtain reveal */}
          <div className="lg:col-span-5">
            <FadeLabel delay={0}>
              <p className="label text-muted-foreground mb-7">About Al Hamra</p>
            </FadeLabel>
            <SplitReveal
              delay={0.1}
              lines={["We bring architecture", "to life through", "precision and permanence."]}
              size="clamp(1.8rem, 3.5vw, 4rem)"
            />
          </div>

          {/* Body + CTA — slides up after headline */}
          <div className="lg:col-span-7 lg:pt-20">
            <FadeText delay={0.3} style={{ maxWidth: 540 }}>
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.88,
                  fontWeight: 300,
                  color: "#767676",
                  marginBottom: 32,
                }}
              >
                {t("home.intro.p1") ||
                  "Al Hamra Tower stands as Kuwait's most significant architectural achievement — a structure of absolute presence, designed to endure beyond trends and cycles. Rising from the heart of Kuwait City, it commands attention through restraint."}
              </p>
              <Link to="/tower" className="btn-arrow">
                Who we are
              </Link>
            </FadeText>
          </div>
        </div>

        {/* Full-bleed image — continuous parallax + clip reveal */}
        <div
          ref={imgRef}
          style={{ height: "clamp(300px, 58vw, 760px)", overflow: "hidden", position: "relative" }}
        >
          <WipeImage
            src={somTowerSkyline}
            alt="Al Hamra Tower skyline"
            aspectRatio="unset"
            parallaxStrength={0}
            delay={0.15}
          />
          {/* Override the WipeImage inner img with our own scroll-driven y */}
          <motion.img
            src={somTowerSkyline}
            alt=""
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "120%",
              objectFit: "cover",
              top: "-10%",
              y: imgY,
            }}
          />
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
   § 2 — COLLECTION (4-col card grid)
   ───────────────────────────────────────────────────────── */
const CollectionSection = () => {
  const { t } = useLanguage();
  const cards = [
    { title: "The Tower",  sub: "Architecture",   img: towerFacade,   href: "/tower" },
    { title: "Business",   sub: "Workspaces",      img: interiorLobby, href: "/business/workplace-experience" },
    { title: "Leasing",    sub: "Opportunities",   img: officeCorr,    href: "/leasing/opportunities" },
    { title: "Experience", sub: "Services",        img: lobbyArches,   href: "/services" },
  ];

  return (
    <section className="section" style={{ background: "#F5F5F3" }}>
      <div className="container-fluid">
        {/* Section header — staggered */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <FadeLabel>
              <p className="label text-muted-foreground mb-4">Explore</p>
            </FadeLabel>
            <SplitReveal
              delay={0.08}
              lines={[t("home.links.title") || "Arrive. Ascend. Belong."]}
              size="clamp(2rem, 3.5vw, 4rem)"
            />
          </div>
          <FadeText delay={0.2} className="hidden sm:block">
            <Link to="/tower" className="btn-arrow">
              View all
            </Link>
          </FadeText>
        </div>

        {/* 4-col grid — each card slides up + in from its X position */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((card, i) => (
            <CardReveal key={card.href} index={i} xOffset={i * 8}>
              <Link to={card.href} className="block group">
                <div
                  style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}
                >
                  <motion.img
                    src={card.img}
                    alt={card.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* Dark overlay slides up on hover */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-5"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p
                      className="label"
                      style={{ color: "rgba(255,255,255,0.55)", marginBottom: 4 }}
                    >
                      {card.sub}
                    </p>
                    <p
                      className="font-serif font-light text-white"
                      style={{ fontSize: "1.2rem", letterSpacing: "-0.01em" }}
                    >
                      {card.title}
                    </p>
                  </motion.div>
                </div>

                {/* Metadata below card — animates separately */}
                <motion.div
                  className="pt-4 flex items-center justify-between"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                >
                  <div>
                    <p className="label text-muted-foreground mb-1">{card.sub}</p>
                    <p
                      className="font-serif font-light"
                      style={{ fontSize: "1.1rem", letterSpacing: "-0.01em" }}
                    >
                      {card.title}
                    </p>
                  </div>
                  <motion.span
                    className="label"
                    style={{ color: "#767676" }}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </Link>
            </CardReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
   § 3 — STATS
   ───────────────────────────────────────────────────────── */
const StatRow = ({
  value,
  unit,
  label,
  desc,
  index = 0,
}: {
  value: number;
  unit: string;
  label: string;
  desc: string;
  index?: number;
}) => {
  const { count, ref, isInView } = useCountUp({
    end: value,
    duration: 2000,
    delay: index * 120,
  });

  return (
    <div ref={ref}>
      <DrawLine delay={index * 0.1} />
      <motion.div
        className="py-8 grid grid-cols-12 gap-4 items-center"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.9,
          delay: index * 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Number */}
        <div className="col-span-4 flex items-end gap-1.5">
          <span
            className="font-serif font-light text-foreground"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 4rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {count}
          </span>
          <span
            className="text-muted-foreground font-light"
            style={{ fontSize: "1.1rem", paddingBottom: 4 }}
          >
            {unit}
          </span>
        </div>

        {/* Label */}
        <div className="col-span-4">
          <p className="label text-muted-foreground">{label}</p>
        </div>

        {/* Desc */}
        <div className="col-span-4 hidden sm:block">
          <p
            className="text-muted-foreground font-light"
            style={{ fontSize: "0.85rem", lineHeight: 1.6 }}
          >
            {desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const StatsSection = () => (
  <section className="section bg-white">
    <div className="container-fluid">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
        <div className="lg:col-span-4">
          <FadeLabel>
            <p className="label text-muted-foreground mb-5">By the numbers</p>
          </FadeLabel>
          <SplitReveal
            delay={0.1}
            lines={["Defining", "Kuwait's skyline"]}
            size="clamp(1.8rem, 3vw, 3.5rem)"
          />
        </div>
      </div>
      <div>
        <StatRow value={413}  unit="m"  label="Total height"   desc="Among the tallest in the Gulf region"          index={0} />
        <StatRow value={80}   unit="+"  label="Office floors"  desc="Premium Grade-A commercial floor plates"       index={1} />
        <StatRow value={24}   unit="K+" label="sq.m GLA"       desc="Leasable office space across the tower"        index={2} />
        <StatRow value={2011} unit=""   label="Year completed" desc="A permanent fixture of Kuwait City's skyline"  index={3} />
        <DrawLine delay={0.4} />
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────
   § 4 — SHOWROOM / INTERIOR
   ───────────────────────────────────────────────────────── */
const ShowroomSection = () => {
  /* Right image travels faster than left — depth illusion */
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: lP } = useScroll({ target: leftRef,  offset: ["start end", "end start"] });
  const { scrollYProgress: rP } = useScroll({ target: rightRef, offset: ["start end", "end start"] });

  const lY = useSpring(useTransform(lP, [0, 1], ["12%", "-12%"]), { stiffness: 60, damping: 22 });
  const rY = useSpring(useTransform(rP, [0, 1], ["18%", "-18%"]), { stiffness: 60, damping: 22 });

  return (
    <section className="section" style={{ background: "#F5F5F3" }}>
      <div className="container-fluid">
        <div className="grid lg:grid-cols-2 gap-3 lg:gap-5">

          {/* Left column: two stacked images */}
          <div className="flex flex-col gap-3 lg:gap-5">
            <CardReveal index={0}>
              <div style={{ aspectRatio: "4/5", overflow: "hidden" }}>
                <motion.img
                  ref={leftRef as any}
                  src={cityView}
                  alt="Interior"
                  style={{
                    y: lY,
                    scale: 1.2,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </CardReveal>

            <CardReveal index={1}>
              <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                <motion.img
                  src={entranceDusk}
                  alt="Entrance at dusk"
                  style={{ scale: 1.12, width: "100%", height: "100%", objectFit: "cover" }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </CardReveal>
          </div>

          {/* Right column: text block then tall image */}
          <div className="flex flex-col gap-8 lg:pt-20">
            <FadeText delay={0.1}>
              <p className="label text-muted-foreground mb-5">Interior</p>
            </FadeText>

            <SplitReveal
              delay={0.18}
              lines={["A place where", "precision meets purpose."]}
              size="clamp(1.8rem, 3vw, 3.5rem)"
            />

            <FadeText delay={0.3} style={{ maxWidth: 380 }}>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.88,
                  fontWeight: 300,
                  color: "#767676",
                  marginBottom: 32,
                }}
              >
                The triple-height lobby sets the tone: soaring arches, curated lighting, and
                materials that speak of permanence. Every detail designed for organisations
                that lead.
              </p>
              <Link to="/business/workplace-experience" className="btn-arrow">
                Workplace experience
              </Link>
            </FadeText>

            {/* Tall image — faster parallax creates depth against left col */}
            <CardReveal index={2}>
              <div ref={rightRef} style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                <motion.img
                  src={somLobby}
                  alt="Lobby arches"
                  style={{
                    y: rY,
                    scale: 1.22,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </CardReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
   § 5 — TESTIMONIALS
   ───────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote:
      "Al Hamra Tower represents a singular achievement in Gulf commercial architecture — presence, permanence, and an unrivalled workplace environment.",
    author: "Senior Partner",
    company: "Regional Architecture Firm",
    initials: "SP",
  },
  {
    quote:
      "The quality of the office environment and management is second to none in Kuwait City. Our team's productivity has measurably improved since relocating here.",
    author: "Chief Executive",
    company: "Financial Services Firm",
    initials: "CE",
  },
  {
    quote:
      "There is no comparable address in Kuwait. Al Hamra Tower signals to clients and talent alike that you are serious about what you do.",
    author: "Managing Director",
    company: "Professional Services",
    initials: "MD",
  },
];

const TestimonialsSection = () => {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];

  return (
    <section
      className="section"
      style={{ borderTop: "1px solid #E8E8E8", borderBottom: "1px solid #E8E8E8" }}
    >
      <div className="container-fluid">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: counter + dots */}
          <div className="lg:col-span-4">
            <FadeLabel>
              <p className="label text-muted-foreground mb-6">Client stories</p>
            </FadeLabel>
            <FadeText delay={0.1}>
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="font-serif font-light text-foreground"
                  style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span style={{ color: "#767676", fontSize: "0.8rem" }}>/</span>
                <span className="label text-muted-foreground">
                  {String(TESTIMONIALS.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setIdx(i)}
                    style={{
                      height: 2,
                      background: i === idx ? "#1A1A1A" : "#ddd",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    animate={{ width: i === idx ? 28 : 8 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </div>
            </FadeText>
          </div>

          {/* Right: quote — AnimatePresence cross-fade */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Quote slides in from the right col — large serif */}
                <div style={{ overflow: "hidden", marginBottom: 32 }}>
                  <motion.blockquote
                    className="font-serif font-light text-foreground"
                    style={{
                      fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)",
                      lineHeight: 1.32,
                      letterSpacing: "-0.015em",
                    }}
                    initial={{ y: "30%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    "{t.quote}"
                  </motion.blockquote>
                </div>

                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      background: "#F0F0EE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      color: "#666",
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "#1A1A1A" }}>
                      {t.author}
                    </p>
                    <p className="label text-muted-foreground">{t.company}</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
   § 6 — FEATURED PROJECTS
   Each card has a different entry direction: alternating Y / X
   ───────────────────────────────────────────────────────── */
const ProjectsSection = () => {
  const projects = [
    { img: towerAerialSunset, title: "The Sculptural Form",   sub: "Architecture & Engineering", href: "/tower/design"             },
    { img: towerLowAngle,     title: "Rising to 413 Metres",  sub: "Construction Story",         href: "/tower/rising"             },
    { img: somObservation,    title: "Views Across Kuwait",   sub: "Perspective & Location",     href: "/location"                 },
    { img: towerAerialDay,    title: "Leasing Opportunities", sub: "Grade-A Office Space",       href: "/leasing/opportunities"    },
  ];

  return (
    <section className="section bg-white">
      <div className="container-fluid">
        <div className="flex items-end justify-between mb-14">
          <div>
            <FadeLabel>
              <p className="label text-muted-foreground mb-4">Featured</p>
            </FadeLabel>
            <SplitReveal
              delay={0.1}
              lines={["Each story tells of", "collaboration and precision."]}
              size="clamp(2rem, 3.5vw, 4rem)"
            />
          </div>
          <FadeText delay={0.2} className="hidden sm:block">
            <Link to="/tower" className="btn-arrow">
              View all
            </Link>
          </FadeText>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {projects.map((p, i) => (
            <CardReveal key={p.href} index={i}>
              <Link to={p.href} className="block group">
                {/* Image — inner parallax on hover + scroll */}
                <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                  <motion.img
                    src={p.img}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>

                {/* Metadata — line draws then text fades */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{ paddingTop: 16 }}
                >
                  <DrawLine delay={0.05 + i * 0.08} />
                  <p
                    className="label text-muted-foreground"
                    style={{ marginTop: 14, marginBottom: 6 }}
                  >
                    {p.sub}
                  </p>
                  <p
                    className="font-serif font-light"
                    style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}
                  >
                    {p.title}
                  </p>
                </motion.div>
              </Link>
            </CardReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────
   § 7 — CTA STRIP
   ───────────────────────────────────────────────────────── */
const CTASection = () => (
  <section
    className="section"
    style={{ borderTop: "1px solid #E8E8E8", borderBottom: "1px solid #E8E8E8" }}
  >
    <div className="container-fluid">
      <div className="grid lg:grid-cols-12 items-center gap-8">
        <div className="lg:col-span-7">
          <SplitReveal
            delay={0}
            lines={["Where vision meets", "execution"]}
            size="clamp(2.2rem, 4.5vw, 5rem)"
          />
        </div>

        <div className="lg:col-span-5">
          <FadeText delay={0.2} style={{ maxWidth: 440 }}>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.82,
                fontWeight: 300,
                color: "#767676",
                marginBottom: 32,
              }}
            >
              Every great tenancy begins with understanding what your organisation truly
              needs. Begin the conversation today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/leasing/opportunities" className="btn-solid">
                Get in touch →
              </Link>
              <Link to="/tower" className="btn-outline">
                Our approach
              </Link>
            </div>
          </FadeText>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────
   HOME PAGE
   ───────────────────────────────────────────────────────── */
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
