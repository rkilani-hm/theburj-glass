/**
 * Al Hamra Business Tower — Home Page
 * Design: Monochromatic editorial architecture magazine
 * Dark hero → White editorial → Dark stats → White interior → Dark awards → White leasing
 */

import { useRef, useState, useEffect, memo } from "react";
import Header from "@/components/alhamra/Header";
import HeroSection from "@/components/alhamra/HeroSection";
import Footer from "@/components/alhamra/Footer";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import useCountUp from "@/hooks/useCountUp";

gsap.registerPlugin(ScrollTrigger);

/* ── Assets ── */
import somTowerSkyline    from "@/assets/som-tower-skyline.jpg";
import somTowerDetail     from "@/assets/som-tower-detail.jpg";
import somTowerVertical   from "@/assets/som-tower-vertical.jpg";
import somTowerNight      from "@/assets/som-tower-night.jpg";
import towerFacade        from "@/assets/tower-facade-twisted.png";
import towerBW1           from "@/assets/tower-bw-1.png";
import towerBWDetail      from "@/assets/tower-bw-detail.png";
import towerLowangle      from "@/assets/tower-lowangle-clouds.png";
import towerClouds        from "@/assets/tower-clouds-aerial.png";
import towerNightIllum    from "@/assets/tower-night-illuminated.jpg";
import towerAerialGulf    from "@/assets/tower-aerial-gulf.jpg";
import towerAerialSunset  from "@/assets/tower-aerial-sunset.png";
import towerAerialDay     from "@/assets/tower-aerial-day.png";
import towerStreetCtx     from "@/assets/tower-street-context.jpg";
import towerCityCtx       from "@/assets/tower-city-context.jpg";
import lobbyArches        from "@/assets/lobby-arches.jpg";
import somLobby           from "@/assets/som-lobby.jpg";
import interiorLobby      from "@/assets/interior-lobby.jpg";
import officeCorr         from "@/assets/office-corridor.jpg";
import interiorOffice     from "@/assets/interior-office.jpg";
import cityView           from "@/assets/city-view-interior.jpg";
import entranceDusk       from "@/assets/entrance-dusk.jpg";
import entranceNight      from "@/assets/entrance-night-facade.jpg";
import kuwaitSkylineNight from "@/assets/kuwait-skyline-water-night.jpg";
import waterfrontPromen   from "@/assets/waterfront-promenade.jpg";
import skylinePark        from "@/assets/skyline-park-panorama.jpg";
import heroVideo          from "@/assets/hero-video.mp4";

/* ═══════════════════════════════════════════════════════
   ANIMATION PRIMITIVES
   ═══════════════════════════════════════════════════════ */

/** GSAP scroll-triggered text curtain — line by line */
const CurtainText = memo(({ lines, size = "clamp(2.4rem, 5vw, 5.5rem)", delay = 0, color = "var(--ink)" }: {
  lines: string[]; size?: string; delay?: number; color?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(".c-line");
    gsap.fromTo(els, { yPercent: 108, opacity: 0 }, {
      yPercent: 0, opacity: 1, duration: 1.15, stagger: 0.11, delay,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none none" },
    });
  }, [delay]);
  return (
    <div ref={ref}>
      {lines.map((l, i) => (
        <div key={i} style={{ overflow: "hidden", lineHeight: 1.04 }}>
          <div className="c-line" style={{ fontFamily: "var(--font-serif)", fontSize: size, fontWeight: 400, letterSpacing: "-0.025em", color, opacity: 0 }}>
            {l}
          </div>
        </div>
      ))}
    </div>
  );
});
CurtainText.displayName = "CurtainText";

/** GSAP fade + rise */
const Reveal = memo(({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, { opacity: 0, y: 34 }, {
      opacity: 1, y: 0, duration: 1.05, delay,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none none" },
    });
  }, [delay]);
  return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>;
});
Reveal.displayName = "Reveal";

/** Clip-path wipe + parallax image */
const WipeImage = memo(({ src, alt, aspectRatio = "4/3", strength = 16, delay = 0, className = "" }: {
  src: string; alt: string; aspectRatio?: string; strength?: number; delay?: number; className?: string;
}) => {
  const ref  = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], [`${strength}%`, `-${strength}%`]);
  const y    = useSpring(rawY, { stiffness: 65, damping: 26 });
  return (
    <div ref={ref} className={className} style={{ aspectRatio, overflow: "hidden" }}>
      <motion.div style={{ width: "100%", height: "100%" }}
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={seen ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}>
        <motion.img src={src} alt={alt} loading="lazy"
          style={{ y, scale: 1.2, width: "100%", height: "100%", objectFit: "cover" }} />
      </motion.div>
    </div>
  );
});
WipeImage.displayName = "WipeImage";

/** Horizontal rule animates from left */
const DrawRule = memo(({ delay = 0, dark = false }: { delay?: number; dark?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelector(".rule-inner"), { scaleX: 0 }, {
      scaleX: 1, duration: 1.4, delay, ease: "power3.out", transformOrigin: "left",
      scrollTrigger: { trigger: ref.current, start: "top 92%", toggleActions: "play none none none" },
    });
  }, [delay]);
  return (
    <div ref={ref} style={{ height: 1, background: dark ? "rgba(250,250,248,0.1)" : "#E0DED9", overflow: "hidden" }}>
      <div className="rule-inner" style={{ height: "100%", background: dark ? "rgba(250,250,248,0.35)" : "var(--ink-60)", transform: "scaleX(0)" }} />
    </div>
  );
});
DrawRule.displayName = "DrawRule";

/* ═══════════════════════════════════════════════════════
   § 1 — TRANSITION BAND (dark → light)
   A single editorial line that signals the change
   ═══════════════════════════════════════════════════════ */
const TransitionBand = () => (
  <section style={{ background: "#111111", padding: "clamp(3rem, 6vw, 6rem) 0" }}>
    <div className="container-fluid">
      <p style={{
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(1.2rem, 2.2vw, 2.4rem)",
        fontWeight: 300,
        fontStyle: "italic",
        letterSpacing: "-0.01em",
        color: "rgba(250,250,248,0.55)",
        maxWidth: 780,
      }}>
        "The tallest sculpted concrete tower in the world — and the only building in Kuwait whose form was inspired by the national dress."
      </p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,250,248,0.25)", marginTop: 28 }}>
        Skidmore, Owings & Merrill — 2011
      </p>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   § 2 — ABOUT / IDENTITY (white)
   ═══════════════════════════════════════════════════════ */
const AboutSection = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useSpring(useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]), { stiffness: 55, damping: 22 });

  return (
    <section className="section-xl" style={{ background: "var(--white)" }}>
      <div className="container-fluid">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-20 lg:mb-32">
          {/* Left: headline */}
          <div className="lg:col-span-5">
            <Reveal><p className="label" style={{ marginBottom: 24 }}>About the Tower</p></Reveal>
            <CurtainText delay={0.1}
              lines={["A National", "Symbol. A", "Vertical City."]}
              size="clamp(2.2rem, 4vw, 4.8rem)" />
          </div>
          {/* Right: body */}
          <div className="lg:col-span-7 lg:pt-24">
            <Reveal delay={0.2}>
              <p style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)", lineHeight: 1.9, fontWeight: 300, color: "var(--ink-40)", marginBottom: 20, maxWidth: 560 }}>
                At 412 metres, Al Hamra Business Tower is the tallest building in Kuwait and the tallest sculpted concrete structure ever constructed. Completed in 2011, it stands as a permanent fixture of the Kuwait City skyline and a symbol of the nation's ambition on the world stage.
              </p>
              <p style={{ fontSize: "clamp(0.9rem, 1vw, 1rem)", lineHeight: 1.88, fontWeight: 300, color: "var(--ink-20)", marginBottom: 36, maxWidth: 520 }}>
                Named by <em>Time</em> magazine as one of the Best Inventions of 2011. Winner of the International Property Awards 2019/2020 for Best Commercial High-Rise. Honeywell's Smartest Building in Kuwait.
              </p>
              <Link to="/tower" className="btn-arrow">
                The tower story
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Full-bleed skyline image */}
        <Reveal>
          <div ref={imgRef} style={{ height: "clamp(320px, 60vw, 800px)", overflow: "hidden" }}>
            <motion.img src={somTowerSkyline} alt="Al Hamra Tower against Kuwait City skyline" loading="eager"
              style={{ y: imgY, scale: 1.12, width: "100%", height: "120%", objectFit: "cover", top: "-10%" }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   § 3 — STATS BAND (dark)
   ═══════════════════════════════════════════════════════ */
const StatItem = ({ value, unit, suffix = "", label, desc, index = 0 }: {
  value: number; unit: string; suffix?: string; label: string; desc: string; index?: number;
}) => {
  const { count, ref, isInView } = useCountUp({ end: value, duration: 2200, delay: index * 140 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ padding: "clamp(2rem, 4vw, 4rem) 0", borderBottom: "1px solid rgba(250,250,248,0.08)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 12 }}>
        <span className="stat-number">{count.toLocaleString()}{suffix}</span>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 300, color: "rgba(250,250,248,0.35)", paddingBottom: 8 }}>{unit}</span>
      </div>
      <p className="label-dark" style={{ marginBottom: 8 }}>{label}</p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "rgba(250,250,248,0.28)", lineHeight: 1.6, maxWidth: 220 }}>{desc}</p>
    </motion.div>
  );
};

const StatsSection = () => (
  <section style={{ background: "#0A0A0A" }}>
    <div className="container-fluid">
      <div className="grid lg:grid-cols-12 gap-0">
        <div className="lg:col-span-3 lg:pr-12" style={{ padding: "clamp(4rem, 8vw, 8rem) 0", borderBottom: "1px solid rgba(250,250,248,0.08)" }}>
          <Reveal delay={0}>
            <p className="label-dark" style={{ marginBottom: 20 }}>Specifications</p>
          </Reveal>
          <CurtainText delay={0.1} color="var(--white)"
            lines={["By the", "numbers"]}
            size="clamp(1.8rem, 3vw, 3.5rem)" />
        </div>
        <div className="lg:col-span-9 lg:pl-12">
          <div style={{ borderLeft: "1px solid rgba(250,250,248,0.06)", paddingLeft: "clamp(1.5rem, 4vw, 4rem)" }}>
            <div style={{ borderTop: "1px solid rgba(250,250,248,0.08)" }} />
            <StatItem value={412} unit="m"   label="Height above sea level"  desc="Tallest building in Kuwait"              index={0} />
            <StatItem value={80}  unit=""    label="Floors above ground"      desc="Grade-A commercial office floors"        index={1} />
            <StatItem value={84000} unit="m²" label="Jura limestone façade"   desc="Tallest continuous stone facade on Earth" index={2} />
            <StatItem value={43}  unit=""    label="Elevators"                desc="Including destination dispatch system"   index={3} />
            <StatItem value={2000} unit=""   label="Parking spaces"           desc="B1–B4 underground levels"                index={4} />
            <StatItem value={289} unit=""    label="Foundation piles"         desc="1200mm dia., 22–27m deep"                index={5} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   § 4 — THE BISHT FORM (white editorial)
   ═══════════════════════════════════════════════════════ */
const BishtSection = () => (
  <section className="section-xl" style={{ background: "var(--white)" }}>
    <div className="container-fluid">
      {/* Header row */}
      <div className="grid lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-6">
          <Reveal><p className="label" style={{ marginBottom: 24 }}>Design & Engineering</p></Reveal>
          <CurtainText delay={0.1}
            lines={["The Bisht.", "The Form", "of Removal."]}
            size="clamp(2.4rem, 5vw, 5.5rem)" />
        </div>
        <div className="lg:col-span-6 lg:pt-20 flex items-end">
          <Reveal delay={0.2}>
            <p style={{ fontSize: "1rem", lineHeight: 1.88, fontWeight: 300, color: "var(--ink-40)", maxWidth: 480 }}>
              Skidmore, Owings & Merrill took inspiration from the <em>bisht</em> — the traditional Kuwaiti ceremonial robe. The asymmetric form is generated by a single operation: removing a quarter of each floor plate from the south face, rotating counter-clockwise over the building's full height.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Main editorial layout: big image left + text + image right */}
      <div className="grid lg:grid-cols-12 gap-4 mb-4">
        {/* Large facade image */}
        <div className="lg:col-span-7">
          <WipeImage src={towerBW1} alt="Al Hamra Tower facade — twisted Jura limestone" aspectRatio="3/4" strength={14} />
        </div>
        {/* Right: text + smaller image */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "2rem" }}>
            <Reveal delay={0.15}>
              <p className="label" style={{ marginBottom: 16 }}>The Architecture</p>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.88, fontWeight: 300, color: "var(--ink-40)", marginBottom: 24 }}>
                The result eliminates all south-facing office space — the primary source of solar heat gain in Kuwait's extreme desert climate — while meeting programmatic requirements: 25,000 sq ft floor plates, 40-foot lease spans, and 270° views of the Arabian Gulf.
              </p>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.88, fontWeight: 300, color: "var(--ink-40)", marginBottom: 32 }}>
                The 84,000m² facade of Jura limestone creates a monolithic stone presence at the south wall — the same material used in Bavaria's finest architecture — framed by graceful ribbon walls that gesture upward.
              </p>
              <Link to="/tower/design" className="btn-arrow">Design & engineering</Link>
            </Reveal>
          </div>
          <WipeImage src={towerBWDetail} alt="Tower facade detail" aspectRatio="4/3" strength={12} delay={0.15} />
        </div>
      </div>

      {/* Wide detail shot */}
      <div className="grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <WipeImage src={somTowerDetail} alt="SOM Al Hamra Tower architectural detail" aspectRatio="16/9" strength={10} />
        </div>
        <div className="lg:col-span-4 flex flex-col justify-between" style={{ paddingTop: "2rem" }}>
          <div>
            <Reveal delay={0.1}>
              <p className="label" style={{ marginBottom: 16 }}>Structural Innovation</p>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.88, fontWeight: 300, color: "var(--ink-40)", marginBottom: 20 }}>
                289 foundation piles, each 1200mm in diameter and 22–27 metres deep. GPS tracking with three independent antennas monitored the build throughout construction.
              </p>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.88, fontWeight: 300, color: "var(--ink-40)" }}>
                Concrete was pumped to a record height of 400+ metres — an engineering milestone that earned the ACI Excellence in Concrete Construction Award in 2015.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="mt-8">
            <div style={{ display: "flex", gap: 32 }}>
              {[["SOM", "Architect"], ["VDA", "Structural"], ["ACI", "Award 2015"]].map(([abbr, role]) => (
                <div key={abbr}>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: 4 }}>{abbr}</p>
                  <p className="label">{role}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   § 5 — LOBBY / INTERIOR (dark immersive)
   ═══════════════════════════════════════════════════════ */
const LobbySection = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: videoRef, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]), { stiffness: 55, damping: 22 });

  return (
    <section style={{ background: "#111111" }}>
      {/* Full-bleed lobby video/image banner */}
      <div ref={videoRef} style={{ height: "clamp(400px, 65vw, 860px)", overflow: "hidden", position: "relative" }}>
        <motion.img src={lobbyArches} alt="Al Hamra Tower lobby — concrete lamella arches"
          style={{ y, scale: 1.12, width: "100%", height: "120%", objectFit: "cover", top: "-10%", filter: "brightness(0.65)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(17,17,17,0.3) 0%, transparent 30%, rgba(17,17,17,0.6) 100%)" }} />
        {/* Caption overlay */}
        <div style={{ position: "absolute", bottom: "clamp(2rem, 5vw, 5rem)", left: 0, right: 0 }}>
          <div className="container-fluid">
            <p className="label-dark" style={{ marginBottom: 12 }}>Main Lobby — Ground Level</p>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 3vw, 3.2rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--white)", maxWidth: 600 }}>
              An 80-foot lamella vault inspired by the geometric tradition of Middle Eastern architecture.
            </p>
          </div>
        </div>
      </div>

      {/* Interior grid below */}
      <div className="container-fluid section-sm">
        <div className="grid lg:grid-cols-2 gap-3 mb-3">
          <WipeImage src={somLobby} alt="Al Hamra lobby interior" aspectRatio="4/3" strength={14} />
          <WipeImage src={interiorLobby} alt="Al Hamra lobby ceiling" aspectRatio="4/3" strength={14} delay={0.08} />
        </div>
        <div className="grid lg:grid-cols-3 gap-3 mb-16">
          <WipeImage src={officeCorr} alt="Office corridor" aspectRatio="3/4" strength={12} />
          <WipeImage src={interiorOffice} alt="Office interior" aspectRatio="3/4" strength={12} delay={0.07} />
          <WipeImage src={cityView} alt="City view from inside the tower" aspectRatio="3/4" strength={12} delay={0.14} />
        </div>

        {/* Interior copy */}
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <CurtainText delay={0} color="var(--white)"
              lines={["The lobby.", "The light.", "The standard."]}
              size="clamp(1.8rem, 3vw, 3.5rem)" />
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            <Reveal delay={0.15}>
              <p style={{ fontSize: "1rem", lineHeight: 1.9, fontWeight: 300, color: "rgba(250,250,248,0.5)", marginBottom: 20, maxWidth: 520 }}>
                The 24-metre triple-height main lobby connects the building's services to Kuwait City's infrastructure. Concrete columns along the north side slope inward, freed from vertical loads by the lamella bracing system — creating a column-free public space of rare quality.
              </p>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.88, fontWeight: 300, color: "rgba(250,250,248,0.35)", marginBottom: 36, maxWidth: 500 }}>
                The barrel-vault outline and the light filtering through the web of concrete members are reminiscent of Middle Eastern vernacular architecture — a conscious tribute to Kuwait's architectural heritage.
              </p>
              <Link to="/business/workplace-experience" className="btn-arrow-white">
                Workplace experience
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   § 6 — EXTERIOR VIEWS (white, editorial)
   ═══════════════════════════════════════════════════════ */
const ExteriorSection = () => (
  <section className="section-xl" style={{ background: "var(--white)" }}>
    <div className="container-fluid">
      <div className="grid lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-5">
          <Reveal><p className="label" style={{ marginBottom: 24 }}>The Tower & The City</p></Reveal>
          <CurtainText delay={0.1}
            lines={["From every", "angle,", "a landmark."]}
            size="clamp(2.2rem, 4vw, 4.8rem)" />
        </div>
        <div className="lg:col-span-5 lg:col-start-8 flex items-end">
          <Reveal delay={0.2}>
            <p style={{ fontSize: "1rem", lineHeight: 1.88, fontWeight: 300, color: "var(--ink-40)", maxWidth: 420 }}>
              Whether seen from the Arabian Gulf, the streets of Sharq, or the open desert to the south — Al Hamra Tower reads as a singular, unmistakable form. It has transformed Kuwait City's silhouette permanently.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Asymmetric editorial grid */}
      <div className="grid lg:grid-cols-12 gap-3 mb-3">
        <div className="lg:col-span-8">
          <WipeImage src={towerAerialGulf} alt="Al Hamra Tower from the Arabian Gulf" aspectRatio="16/10" strength={12} />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-3">
          <WipeImage src={entranceDusk} alt="Tower entrance at dusk" aspectRatio="1/1" strength={14} delay={0.06} />
          <WipeImage src={entranceNight} alt="Tower entrance at night" aspectRatio="1/1" strength={14} delay={0.1} />
        </div>
      </div>

      {/* Wide panoramic */}
      <div className="grid lg:grid-cols-12 gap-3 mb-3">
        <div className="lg:col-span-4 flex flex-col gap-3">
          <WipeImage src={towerStreetCtx} alt="Tower from street level" aspectRatio="2/3" strength={16} />
        </div>
        <div className="lg:col-span-8">
          <WipeImage src={kuwaitSkylineNight} alt="Kuwait City skyline at night" aspectRatio="16/9" strength={10} delay={0.06} />
        </div>
      </div>

      {/* Night shot full-bleed */}
      <WipeImage src={somTowerNight} alt="Al Hamra Tower illuminated at night" aspectRatio="21/9" strength={8} delay={0.04} />

      {/* Footer note */}
      <Reveal delay={0.1} className="mt-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {[
            ["The Skyline", "When people think of Kuwait City, they see Al Hamra. A fixture of the skyline for over a decade."],
            ["270° Views", "Office floors are designed to maximise Gulf views — floor-to-ceiling glazing on three sides."],
            ["Sharq District", "Located in Kuwait City's premier business district, minutes from the Gulf Road and government quarter."],
          ].map(([title, text]) => (
            <div key={title}>
              <DrawRule />
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--ink)", margin: "16px 0 10px" }}>{title}</p>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.82, fontWeight: 300, color: "var(--ink-40)" }}>{text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   § 7 — AWARDS MARQUEE (dark)
   ═══════════════════════════════════════════════════════ */
const AWARDS = [
  { title: "Time Magazine", sub: "Best Inventions of 2011" },
  { title: "International Property Awards", sub: "Best Commercial High-Rise 2019/2020" },
  { title: "Honeywell", sub: "Smartest Building in Kuwait" },
  { title: "ACI", sub: "Excellence in Concrete Construction 2015" },
  { title: "CTBUH", sub: "Finalist — Best Tall Building Middle East & Africa" },
  { title: "Architizer A+Awards", sub: "Finalist 2013" },
];

const AwardsSection = () => (
  <section style={{ background: "#0A0A0A", overflow: "hidden" }}>
    {/* Divider */}
    <div className="container-fluid" style={{ paddingTop: "clamp(4rem, 8vw, 8rem)", paddingBottom: "clamp(2rem, 4vw, 4rem)" }}>
      <div className="grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-5">
          <CurtainText delay={0} color="var(--white)"
            lines={["Recognised.", "Awarded.", "Permanent."]}
            size="clamp(2.2rem, 4vw, 4.8rem)" />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal delay={0.15}>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.88, fontWeight: 300, color: "rgba(250,250,248,0.4)" }}>
              In the decade since its completion, Al Hamra has been recognised by the world's leading architectural and property institutions as a benchmark for commercial high-rise design.
            </p>
          </Reveal>
        </div>
      </div>
    </div>

    {/* Full-width marquee */}
    <div style={{ borderTop: "1px solid rgba(250,250,248,0.06)", borderBottom: "1px solid rgba(250,250,248,0.06)", padding: "2.5rem 0", overflow: "hidden" }}>
      <div className="marquee-track">
        {[...AWARDS, ...AWARDS].map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "clamp(3rem, 6vw, 6rem)", padding: "0 clamp(2rem, 4vw, 4rem)", flexShrink: 0 }}>
            <div style={{ width: 1, height: 48, background: "rgba(250,250,248,0.12)" }} />
            <div>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 400, letterSpacing: "-0.01em", color: "rgba(250,250,248,0.8)", whiteSpace: "nowrap" }}>{a.title}</p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(250,250,248,0.3)", marginTop: 4, whiteSpace: "nowrap" }}>{a.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="container-fluid" style={{ paddingBottom: "clamp(4rem, 8vw, 8rem)" }}>
      <Reveal delay={0.1} className="mt-12">
        <Link to="/tower/recognition" className="btn-arrow-white">All awards & recognition</Link>
      </Reveal>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   § 8 — LEASING (white)
   ═══════════════════════════════════════════════════════ */
const LeasingSection = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: lP } = useScroll({ target: leftRef,  offset: ["start end", "end start"] });
  const { scrollYProgress: rP } = useScroll({ target: rightRef, offset: ["start end", "end start"] });
  const lY = useSpring(useTransform(lP, [0, 1], ["12%", "-12%"]), { stiffness: 55, damping: 22 });
  const rY = useSpring(useTransform(rP, [0, 1], ["18%", "-18%"]), { stiffness: 55, damping: 22 });

  return (
    <section className="section-xl" style={{ background: "var(--white)" }}>
      <div className="container-fluid">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-6">
            <Reveal><p className="label" style={{ marginBottom: 24 }}>Leasing Opportunities</p></Reveal>
            <CurtainText delay={0.1}
              lines={["The highest", "business address", "in Kuwait."]}
              size="clamp(2.2rem, 4.5vw, 5rem)" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <Reveal delay={0.2}>
              <p style={{ fontSize: "1rem", lineHeight: 1.88, fontWeight: 300, color: "var(--ink-40)", marginBottom: 28, maxWidth: 420 }}>
                From standard Grade-A floor plates to the exclusive 74th and 75th floor executive suites — Al Hamra offers Kuwait's most prestigious commercial addresses. Currently available for immediate occupation.
              </p>
              <Link to="/leasing/opportunities" className="btn-arrow">Explore available floors</Link>
            </Reveal>
          </div>
        </div>

        {/* Two-column image layout */}
        <div className="grid lg:grid-cols-2 gap-4 mb-16">
          <div ref={leftRef} style={{ aspectRatio: "4/5", overflow: "hidden" }}>
            <motion.img src={towerAerialSunset} alt="Al Hamra Tower at sunset — leasing"
              style={{ y: lY, scale: 1.2, width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div ref={rightRef} style={{ aspectRatio: "4/5", overflow: "hidden" }}>
            <motion.img src={interiorOffice} alt="Al Hamra office interior — Grade A"
              style={{ y: rY, scale: 1.22, width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        {/* Floor types grid */}
        <Reveal>
          <div className="grid lg:grid-cols-3 gap-4">
            {[
              {
                floors: "Floors 4–73", type: "Standard Office",
                specs: "25,000 sq ft floor plates · 40-ft lease spans · 270° Gulf views",
                href: "/business/office-spaces",
              },
              {
                floors: "Floors 74–75", type: "Executive Suites",
                specs: "The highest business address in Kuwait · Panoramic views · Premium finishes",
                href: "/business/office-spaces",
              },
              {
                floors: "Ground–3F", type: "Retail & Services",
                specs: "Upscale retail · Banking · Premium dining · Concierge services",
                href: "/services",
              },
            ].map(f => (
              <Link key={f.type} to={f.href} className="block group"
                style={{ padding: "clamp(1.5rem, 3vw, 3rem)", border: "1px solid var(--rule-light)", transition: "border-color 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--ink-60)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--rule-light)")}>
                <p className="label" style={{ marginBottom: 16 }}>{f.floors}</p>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: 12 }}>{f.type}</p>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.7, fontWeight: 300, color: "var(--ink-40)", marginBottom: 20 }}>{f.specs}</p>
                <span className="btn-arrow" style={{ fontSize: "10px" }}>View details</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   § 9 — CTA (dark, final section)
   ═══════════════════════════════════════════════════════ */
const CTASection = () => (
  <section style={{ background: "#0A0A0A", position: "relative", overflow: "hidden" }}>
    {/* Background texture — faded tower silhouette */}
    <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
      <img src={towerBW1} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center right" }} />
    </div>
    <div className="container-fluid section-xl" style={{ position: "relative" }}>
      <div className="grid lg:grid-cols-12 items-center gap-16">
        <div className="lg:col-span-7">
          <CurtainText delay={0} color="var(--white)"
            lines={["Your office.", "Above Kuwait.", "Now leasing."]}
            size="clamp(2.4rem, 5.5vw, 6rem)" />
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.2}>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, fontWeight: 300, color: "rgba(250,250,248,0.45)", marginBottom: 16 }}>
              Every great tenancy begins with a conversation. Speak with the Al Hamra leasing team to learn what's available and what's possible.
            </p>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.88, fontWeight: 300, color: "rgba(250,250,248,0.3)", marginBottom: 40 }}>
              Al Sharq, Block 8, Jaber Al Mubarak St. & Al Shuhada'a<br />
              Kuwait City · P.O. Box 83 Safat, 13001
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <Link to="/leasing/opportunities" className="btn-solid-white">Leasing inquiries →</Link>
              <Link to="/leasing/contact"       className="btn-outline-white">Contact the team</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div style={{ background: "#0A0A0A", overflowX: "hidden" }}>
      <Header />
      <main>
        <HeroSection />
        <TransitionBand />
        <AboutSection />
        <StatsSection />
        <BishtSection />
        <LobbySection />
        <ExteriorSection />
        <AwardsSection />
        <LeasingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
