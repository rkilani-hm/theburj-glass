/**
 * HeroSection — 3D Tower + GSAP Scroll Storytelling
 *
 * Architecture:
 * 1. Full-screen video hero (CSS 3D parallax on scroll)
 * 2. Pinned scroll story: 4 panels that swap while scrolling
 *    Panel 1 — "412 Metres" (altitude reveal)
 *    Panel 2 — "Architecture" (facade close-up)
 *    Panel 3 — "The Address" (Kuwait City context)
 *    Panel 4 — "Leasing" (CTA)
 */

import { useEffect, useRef, memo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo    from "@/assets/hero-video.mp4";
import towerFull    from "@/assets/tower-full-blue-sky.png";
import towerNight   from "@/assets/tower-night-illuminated.jpg";
import towerFacade  from "@/assets/tower-facade-twisted.png";
import towerAerial  from "@/assets/tower-aerial-day.png";

gsap.registerPlugin(ScrollTrigger);

/* ── Story chapters ── */
const CHAPTERS = [
  {
    overline: "Al Hamra Tower",
    stat:     "412",
    unit:     "m",
    title:    "Above the\nCity of Kuwait",
    body:     "The tallest building in Kuwait. A permanent fixture of the Gulf skyline since 2011.",
    img:      towerFull,
  },
  {
    overline: "Architecture",
    stat:     "80+",
    unit:     "",
    title:    "Floors of\nPrecision",
    body:     "Sculpted stone facade — every surface tuned to deflect solar heat while maximising panoramic light.",
    img:      towerFacade,
  },
  {
    overline: "The Address",
    stat:     "24K",
    unit:     "m²",
    title:    "Grade-A\nOffice Space",
    body:     "Premium floor plates designed for global headquarters, regional hubs, and ambitious enterprises.",
    img:      towerAerial,
  },
  {
    overline: "Leasing",
    stat:     "2011",
    unit:     "",
    title:    "Completed &\nAvailable Now",
    body:     "Speak with our leasing team and secure your position above Kuwait City.",
    img:      towerNight,
  },
];

const HeroSection = memo(() => {
  const { t } = useLanguage();

  /* Refs */
  const pinWrapRef    = useRef<HTMLDivElement>(null);
  const videoRef      = useRef<HTMLDivElement>(null);
  const panelsRef     = useRef<HTMLDivElement[]>([]);
  const progressRef   = useRef<HTMLDivElement>(null);
  const imgRefs       = useRef<HTMLImageElement[]>([]);
  const numRef        = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current;
      if (!panels.length) return;

      /* ── 1. Hero video — parallax zoom + fade on scroll ── */
      gsap.to(videoRef.current, {
        scale: 1.14,
        ease: "none",
        scrollTrigger: {
          trigger: pinWrapRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1.2,
        },
      });

      /* ── 2. Pin the storytelling wrapper ── */
      ScrollTrigger.create({
        trigger: pinWrapRef.current,
        start: "top top",
        end: `+=${(CHAPTERS.length - 1) * 100}vh`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      /* ── 3. Panel transitions — each chapter snaps in ── */
      panels.forEach((panel, i) => {
        if (i === 0) return; /* first panel is already visible */

        const prevImg = imgRefs.current[i - 1];
        const currImg = imgRefs.current[i];

        /* Chapter crossfade */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapRef.current,
            start: `top+=${i * 100}vh top`,
            end:   `top+=${i * 100 + 80}vh top`,
            scrub: 0.8,
          },
        });

        /* Outgoing panel */
        tl.to(panels[i - 1], { opacity: 0, y: -24, ease: "power2.inOut" }, 0)
          .to(prevImg, { scale: 1.08, ease: "none" }, 0)
          /* Incoming panel */
          .fromTo(panel, { opacity: 0, y: 28 }, { opacity: 1, y: 0, ease: "power2.out" }, 0.1)
          .fromTo(currImg, { scale: 1.06 }, { scale: 1, ease: "none" }, 0);

        /* ── Number count-up for each chapter ── */
        const raw  = CHAPTERS[i].stat.replace(/[^0-9]/g, "");
        const end  = raw ? parseInt(raw, 10) : 0;
        const unit = CHAPTERS[i].unit;
        const suffix = CHAPTERS[i].stat.replace(/[0-9]/g, "");

        if (end && numRef.current) {
          tl.fromTo(
            { val: 0 },
            { val: end },
            {
              duration: 0.6,
              ease: "power2.out",
              onUpdate() { if (numRef.current) numRef.current.textContent = Math.round((this.targets()[0] as any).val).toLocaleString() + suffix; },
            },
            0.15,
          );
        }
      });

      /* ── 4. Progress bar ── */
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        transformOrigin: "left",
        scrollTrigger: {
          trigger: pinWrapRef.current,
          start: "top top",
          end:   `+=${(CHAPTERS.length - 1) * 100}vh`,
          scrub: true,
        },
      });

      /* ── 5. Initial entrance animation ── */
      gsap.from(".hero-overline",  { opacity: 0, y: 16, duration: 0.9, delay: 0.4, ease: "power3.out" });
      gsap.from(".hero-stat",      { opacity: 0, y: 30, duration: 1.0, delay: 0.6, ease: "power3.out" });
      gsap.from(".hero-title",     { opacity: 0, y: 36, duration: 1.1, delay: 0.8, ease: "power3.out" });
      gsap.from(".hero-body",      { opacity: 0, y: 24, duration: 0.9, delay: 1.0, ease: "power3.out" });
      gsap.from(".hero-cta",       { opacity: 0, y: 20, duration: 0.8, delay: 1.2, ease: "power3.out" });
      gsap.from(".hero-scroll-hint",{ opacity: 0,        duration: 0.8, delay: 2.2 });

    }, pinWrapRef);

    return () => ctx.revert();
  }, []);

  return (
    /* Outer wrapper: height = chapters × 100vh, creates scroll space */
    <div style={{ height: `${CHAPTERS.length * 100}svh`, position: "relative" }}>

      {/* ─── PINNED INNER ─────────────────────────────────── */}
      <div ref={pinWrapRef}
        style={{ height: "calc(100svh - var(--nav-h))", position: "relative", overflow: "hidden", background: "#f9f9f7" }}
      >
        {/* ── Background video layer (parallax) ── */}
        <div ref={videoRef} style={{ position: "absolute", inset: 0, transformOrigin: "center center" }}>
          <video
            src={heroVideo}
            poster={towerFull}
            autoPlay muted loop playsInline
            preload="metadata"          /* perf: don't buffer full 20MB on load */
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Gradient veil */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.55) 28%, rgba(255,255,255,0.05) 62%, transparent 80%)",
          }} />
        </div>

        {/* ── Chapter images — overlay, one per chapter ── */}
        {CHAPTERS.map((ch, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0, opacity: i === 0 ? 1 : 0,
            pointerEvents: "none",
          }}>
            <img
              ref={el => { if (el) imgRefs.current[i] = el; }}
              src={ch.img}
              alt={ch.title}
              loading={i === 0 ? "eager" : "lazy"}
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                height: "92%",
                width: "auto",
                maxWidth: "55%",
                objectFit: "contain",
                objectPosition: "bottom right",
                filter: "drop-shadow(-40px 0 80px rgba(0,0,0,0.06))",
                transformOrigin: "bottom right",
              }}
            />
          </div>
        ))}

        {/* ── Chapter text panels ── */}
        {CHAPTERS.map((ch, i) => (
          <div
            key={i}
            ref={el => { if (el) panelsRef.current[i] = el; }}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === 0 ? 1 : 0,
              pointerEvents: i === 0 ? "auto" : "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div className="container-fluid" style={{ paddingBottom: "clamp(3rem, 6vw, 6rem)" }}>
              <div style={{ maxWidth: 680 }}>

                {/* Overline */}
                <p className={`label hero-overline${i > 0 ? "" : ""}`}
                  style={{ marginBottom: 20, color: "#767672" }}>
                  {ch.overline}
                </p>

                {/* Stat number */}
                <div className={`hero-stat`} style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 12, lineHeight: 1 }}>
                  <span className="stat-number" ref={i === 0 ? numRef : undefined}>
                    {ch.stat}
                  </span>
                  {ch.unit && (
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", fontWeight: 300, color: "#767672", paddingBottom: 8 }}>
                      {ch.unit}
                    </span>
                  )}
                </div>

                {/* Title — two lines */}
                <h1 className="hero-title"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.8rem, 7vw, 7.5rem)",
                    fontWeight: 400,
                    lineHeight: 0.96,
                    letterSpacing: "-0.03em",
                    color: "#0C0C0B",
                    marginBottom: 20,
                    whiteSpace: "pre-line",
                  }}>
                  {ch.title}
                </h1>

                {/* Body + CTA row */}
                <div className="hero-body" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(0.88rem, 1vw, 0.95rem)", lineHeight: 1.78, fontWeight: 300, color: "#767672", maxWidth: 380 }}>
                    {ch.body}
                  </p>
                  <a href="/leasing/opportunities" className="btn-arrow hero-cta">
                    {i < CHAPTERS.length - 1 ? "Explore leasing" : "Get in touch"}
                  </a>
                </div>

              </div>
            </div>
          </div>
        ))}

        {/* ── Progress bar — thin line at very top ── */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#F0F0EE", zIndex: 10 }}>
          <div ref={progressRef}
            style={{ height: "100%", background: "#0C0C0B", transformOrigin: "left", transform: "scaleX(0)" }} />
        </div>

        {/* ── Chapter indicators — right side ── */}
        <div style={{
          position: "absolute", right: "clamp(1.5rem, 3vw, 3rem)", bottom: "clamp(2rem, 4vw, 4rem)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          zIndex: 10,
        }}>
          {CHAPTERS.map((_, i) => (
            <div key={i} style={{ width: 1, height: i === 0 ? 32 : 14, background: i === 0 ? "#0C0C0B" : "#D4D4CF", transition: "height 0.4s, background 0.4s" }} />
          ))}
          <p className="hero-scroll-hint label-sm" style={{ writingMode: "vertical-rl", marginTop: 8, color: "#AAAAAA", letterSpacing: "0.15em" }}>
            Scroll
          </p>
        </div>

      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
