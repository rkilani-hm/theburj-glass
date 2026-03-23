/**
 * HeroSection — Cinematic dark video hero
 * Design: Full-viewport black, white Cormorant type, GSAP scroll storytelling
 * Architecture: 4 pinned chapters scroll through while tower video plays
 */

import { useEffect, useRef, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo   from "@/assets/hero-video.mp4";
import towerFull   from "@/assets/tower-full-blue-sky.png";
import towerNight  from "@/assets/tower-night-illuminated.jpg";
import towerFacade from "@/assets/som-tower-vertical.jpg";
import towerAerial from "@/assets/tower-aerial-day.png";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    overline: "Kuwait City, 2011",
    headline: "Al Hamra\nBusiness Tower",
    sub: "412 metres above the Arabian Gulf — the tallest sculpted concrete structure ever built.",
    img: towerFull,
  },
  {
    overline: "Architecture",
    headline: "The Form\nOf Removal",
    sub: "Designed by SOM, inspired by the traditional Kuwaiti bisht — a quarter carved from each floor.",
    img: towerFacade,
  },
  {
    overline: "The Address",
    headline: "Kuwait's\nVertical City",
    sub: "80 floors. 84,000m² of Jura limestone façade. Home to Kuwait's leading business community.",
    img: towerAerial,
  },
  {
    overline: "Grade-A Offices",
    headline: "Your Place\nAbove It All",
    sub: "Executive floors 74–75. The highest business address in Kuwait City.",
    img: towerNight,
  },
];

const HeroSection = memo(() => {
  const pinRef     = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLDivElement>(null);
  const progressRef= useRef<HTMLDivElement>(null);
  const panelRefs  = useRef<HTMLDivElement[]>([]);
  const imgRefs    = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Pin the hero section ── */
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: `+=${(CHAPTERS.length - 1) * 100}vh`,
        pin: true, pinSpacing: true, anticipatePin: 1,
      });

      /* ── Video parallax zoom ── */
      gsap.to(videoRef.current, {
        scale: 1.18, ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top", end: `+=${(CHAPTERS.length - 1) * 100}vh`,
          scrub: 1.5,
        },
      });

      /* ── Progress bar ── */
      gsap.to(progressRef.current, {
        scaleX: 1, ease: "none", transformOrigin: "left",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top", end: `+=${(CHAPTERS.length - 1) * 100}vh`,
          scrub: true,
        },
      });

      /* ── Chapter cross-fades ── */
      CHAPTERS.forEach((_, i) => {
        if (i === 0) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: `top+=${i * 100}vh top`,
            end:   `top+=${i * 100 + 80}vh top`,
            scrub: 0.8,
          },
        });
        tl.to(panelRefs.current[i - 1], { opacity: 0, y: -20, ease: "power2.inOut" }, 0)
          .to(imgRefs.current[i - 1],   { scale: 1.06, ease: "none" }, 0)
          .fromTo(panelRefs.current[i],  { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: "power3.out" }, 0.15)
          .fromTo(imgRefs.current[i],    { scale: 1.06 }, { scale: 1, ease: "none" }, 0.15);
      });

      /* ── Initial entrance ── */
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(".hero-overline", { opacity: 0, y: 12, duration: 0.8, ease: "power3.out" })
        .from(".hero-headline", { opacity: 0, y: 40, duration: 1.2, ease: "power3.out" }, "-=0.5")
        .from(".hero-sub",      { opacity: 0, y: 20, duration: 0.9, ease: "power3.out" }, "-=0.6")
        .from(".hero-cta",      { opacity: 0, y: 16, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .from(".hero-indicator",{ opacity: 0,         duration: 0.6 }, "-=0.2");

    }, pinRef);

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ height: `${CHAPTERS.length * 100}svh`, position: "relative" }}>
      <div ref={pinRef}
        style={{ height: "calc(100svh - var(--nav-h))", position: "relative", overflow: "hidden", background: "#0A0A0A" }}>

        {/* ── Video ── */}
        <div ref={videoRef} style={{ position: "absolute", inset: 0, transformOrigin: "center" }}>
          <video src={heroVideo} poster={towerFull}
            autoPlay muted loop playsInline preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.42 }} />
          {/* Dark vignette */}
          <div style={{ position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.7) 80%, rgba(10,10,10,0.9) 100%)" }} />
          {/* Side vignettes */}
          <div style={{ position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 80% 100% at 50% 50%, transparent 40%, rgba(10,10,10,0.6) 100%)" }} />
        </div>

        {/* ── Tower images — one per chapter ── */}
        {CHAPTERS.map((ch, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, opacity: i === 0 ? 1 : 0, pointerEvents: "none" }}>
            <img ref={el => { if (el) imgRefs.current[i] = el; }}
              src={ch.img} alt=""
              loading={i === 0 ? "eager" : "lazy"}
              style={{
                position: "absolute", right: "clamp(3rem, 8vw, 10rem)", bottom: 0,
                height: "90%", width: "auto", maxWidth: "50%",
                objectFit: "contain", objectPosition: "bottom right",
                filter: "brightness(0.5) contrast(1.1)",
                mixBlendMode: "luminosity",
                transformOrigin: "bottom right",
              }} />
          </div>
        ))}

        {/* ── Chapter panels ── */}
        {CHAPTERS.map((ch, i) => (
          <div key={i}
            ref={el => { if (el) panelRefs.current[i] = el; }}
            style={{
              position: "absolute", inset: 0,
              opacity: i === 0 ? 1 : 0,
              pointerEvents: i === 0 ? "auto" : "none",
              display: "flex", flexDirection: "column", justifyContent: "flex-end",
            }}>
            <div className="container-fluid" style={{ paddingBottom: "clamp(4rem, 8vw, 8rem)" }}>
              <div style={{ maxWidth: 640 }}>

                {/* Overline */}
                <p className={`label-dark hero-overline`} style={{ marginBottom: 28 }}>
                  {ch.overline}
                </p>

                {/* Headline */}
                <h1 className="hero-headline"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(3.2rem, 8vw, 9rem)",
                    fontWeight: 400,
                    lineHeight: 0.92,
                    letterSpacing: "-0.03em",
                    color: "#FAFAF8",
                    whiteSpace: "pre-line",
                    marginBottom: "clamp(1.5rem, 3vw, 3rem)",
                  }}>
                  {ch.headline}
                </h1>

                {/* Sub + CTA row */}
                <div className="hero-sub" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
                  <p style={{ fontSize: "clamp(0.88rem, 1vw, 0.95rem)", lineHeight: 1.78, fontWeight: 300, color: "rgba(250,250,248,0.5)", maxWidth: 380 }}>
                    {ch.sub}
                  </p>
                  <a href="/leasing/opportunities" className="btn-arrow-white hero-cta">
                    {i < CHAPTERS.length - 1 ? "Explore leasing" : "Inquire now"}
                  </a>
                </div>

              </div>
            </div>
          </div>
        ))}

        {/* ── Progress bar at very top ── */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.08)", zIndex: 20 }}>
          <div ref={progressRef} style={{ height: "100%", background: "rgba(250,250,248,0.5)", transformOrigin: "left", transform: "scaleX(0)" }} />
        </div>

        {/* ── Chapter dots — right edge ── */}
        <div className="hero-indicator" style={{
          position: "absolute", right: "clamp(1.5rem, 3vw, 3rem)",
          bottom: "clamp(4rem, 8vw, 8rem)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 10,
        }}>
          {CHAPTERS.map((_, i) => (
            <div key={i} style={{ width: 1, height: i === 0 ? 36 : 12, background: i === 0 ? "rgba(250,250,248,0.6)" : "rgba(250,250,248,0.2)" }} />
          ))}
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,250,248,0.3)", writingMode: "vertical-rl", marginTop: 12 }}>
            Scroll
          </p>
        </div>

      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
