import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/al-hamra-hero.mp4";
import EditableText from "@/components/admin/EditableText";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rawScale   = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const rawY       = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const scale      = useSpring(rawScale, { stiffness: 55, damping: 22 });
  const contentY   = useSpring(rawY,     { stiffness: 55, damping: 22 });

  return (
    <section ref={ref} style={{
      position: "relative", width: "100%", height: "100svh", minHeight: 600,
      background: "#080806", overflow: "hidden",
    }}>
      {/* Video */}
      <motion.div style={{ position: "absolute", inset: 0, scale, transformOrigin: "center" }}>
        <video src={heroVideo} autoPlay muted loop playsInline preload="auto"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%",
            filter: "brightness(1.1) contrast(1.04) saturate(0.9)" }} />
        <div style={{ position: "absolute", inset: 0, background: [
          "linear-gradient(to top, rgba(8,8,6,0.88) 0%, rgba(8,8,6,0.22) 30%, transparent 52%)",
          "linear-gradient(to bottom, rgba(8,8,6,0.28) 0%, transparent 18%)",
        ].join(", ") }} />
      </motion.div>

      {/* Content */}
      <motion.div style={{ position: "absolute", inset: 0, zIndex: 2, y: contentY, opacity: rawOpacity as any,
        display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div className="container-fluid" style={{ paddingBottom: "clamp(5rem, 9vw, 8rem)" }}>

          {/* Divider line */}
          <motion.div style={{ height: 1, background: "rgba(255,255,255,0.14)", marginBottom: "clamp(1.5rem,3vw,2.5rem)", maxWidth: 480 }}
            initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} />

          {/* Grid: headline left, CTAs right */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(2rem,5vw,5rem)", alignItems: "flex-end" }}>

            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
                <EditableText cms="hero.eyebrow" tag="p" style={{
                  fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.26em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.40)",
                  marginBottom: "clamp(0.8rem,1.5vw,1.2rem)",
                }} oneLine />
              </motion.div>

              <div style={{ overflow: "hidden" }}>
                <motion.div initial={{ y: "105%" }} animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}>
                  <EditableText cms="hero.headline" tag="h1" className="text-slate-950 font-sans text-xl" style={{
                    fontWeight: 300, lineHeight: 1.0, letterSpacing: "-0.03em",
                    margin: 0,
                  }} oneLine />
                </motion.div>
              </div>

              <div style={{ overflow: "hidden" }}>
                <motion.div initial={{ y: "105%" }} animate={{ y: 0 }}
                  transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                  <EditableText cms="hero.subheadline" tag="p" className="font-sans text-xl text-slate-950" style={{
                    fontStyle: "italic",
                    fontWeight: 300, lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    margin: "0 0 clamp(1.2rem,2.5vw,2rem)",
                  }} oneLine />
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}>
                <EditableText cms="hero.tagline" tag="p" style={{
                  fontFamily: "var(--font-sans)", fontSize: "clamp(0.72rem,0.85vw,0.82rem)",
                  fontWeight: 300, lineHeight: 1.82, color: "rgba(255,255,255,0.36)",
                  maxWidth: 380, margin: 0,
                }} multiline />
              </motion.div>
            </div>

            {/* Right: CTAs */}
            <motion.div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}>
              <Link to="/leasing/opportunities" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "12px 24px", background: "#FFFFFF",
                fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 400,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "#0A0A0A",
                whiteSpace: "nowrap", transition: "background 0.22s",
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#EDEDE9")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#FFFFFF")}>
                <EditableText cms="hero.cta.primary" oneLine />
              </Link>
              <Link to="/tower" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "12px 24px", background: "transparent",
                border: "1px solid rgba(255,255,255,0.20)",
                fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 400,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.70)", whiteSpace: "nowrap", transition: "border-color 0.22s, color 0.22s",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.50)"; el.style.color = "#fff"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.20)"; el.style.color = "rgba(255,255,255,0.70)"; }}>
                <EditableText cms="hero.cta.secondary" oneLine />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats strip */}
        <motion.div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.7 }}>
          <div className="container-fluid">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "clamp(0.8rem,1.5vw,1.2rem) 0" }}>
              {[
                { num: "412 m", label: "Height"    },
                { num: "80",    label: "Floors"    },
                { num: "43",    label: "Elevators" },
                { num: "2011",  label: "Completed" },
              ].map((s, i) => (
                <div key={i} style={{
                  paddingLeft: i > 0 ? "clamp(1rem,2.5vw,2.5rem)" : 0,
                  borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  display: "flex", alignItems: "center", gap: "clamp(0.6rem,1.2vw,1rem)",
                }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.9rem,1.6vw,1.35rem)", fontWeight: 300, color: "rgba(255,255,255,0.78)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{s.num}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", whiteSpace: "nowrap" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div style={{
        position: "absolute", right: "clamp(1.5rem,3vw,2.5rem)", bottom: "clamp(5rem,9vw,7.5rem)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 3,
        opacity: rawOpacity as any,
      }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "7px", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", writingMode: "vertical-rl" }}>Scroll</span>
        <div style={{ width: 1, height: 42, background: "rgba(255,255,255,0.10)", overflow: "hidden" }}>
          <motion.div style={{ width: "100%", height: "100%", background: "rgba(255,255,255,0.55)" }}
            animate={{ y: ["-100%", "200%"] }} transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </motion.div>
    </section>
  );
}
