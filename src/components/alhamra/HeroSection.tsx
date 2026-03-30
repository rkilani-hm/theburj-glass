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
      background: "#f5f5f0", overflow: "hidden",
    }}>
      {/* Video */}
      <motion.div style={{ position: "absolute", inset: 0, scale, transformOrigin: "center" }}>
        <video src={heroVideo} autoPlay muted loop playsInline preload="auto"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%",
            filter: "brightness(1.05) contrast(1.02) saturate(0.95)" }} />
        <div style={{ position: "absolute", inset: 0, background: [
          "linear-gradient(to top, rgba(245,245,240,0.85) 0%, rgba(245,245,240,0.18) 30%, transparent 52%)",
          "linear-gradient(to bottom, rgba(245,245,240,0.22) 0%, transparent 18%)",
        ].join(", ") }} />
      </motion.div>

      {/* Content */}
      <motion.div style={{ position: "absolute", inset: 0, zIndex: 2, y: contentY, opacity: rawOpacity as any,
        display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div className="container-fluid" style={{ paddingBottom: "clamp(5rem, 9vw, 8rem)" }}>

          {/* Divider line */}
          <motion.div style={{ height: 1, background: "rgba(10,10,10,0.14)", marginBottom: "clamp(1.5rem,3vw,2.5rem)", maxWidth: 480 }}
            initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} />

          {/* Grid: headline left, CTAs right */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(2rem,5vw,5rem)", alignItems: "flex-end" }}>

            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
                <EditableText cms="hero.eyebrow" tag="p" style={{
                  fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.26em",
                  textTransform: "uppercase", color: "rgba(10,10,10,0.50)",
                  marginBottom: "clamp(0.8rem,1.5vw,1.2rem)",
                }} oneLine />
              </motion.div>

              <div style={{ overflow: "hidden" }}>
                <motion.div initial={{ y: "105%" }} animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}>
                  <EditableText cms="hero.headline" tag="h1" style={{
                    fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem,6.5vw,6.5rem)",
                    fontWeight: 300, lineHeight: 1.0, letterSpacing: "-0.03em",
                    color: "#0A0A0A", margin: 0,
                  }} oneLine />
                </motion.div>
              </div>

              <div style={{ overflow: "hidden" }}>
                <motion.div initial={{ y: "105%" }} animate={{ y: 0 }}
                  transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                  <EditableText cms="hero.subheadline" tag="p" style={{
                    fontFamily: "var(--font-display)", fontStyle: "italic",
                    fontSize: "clamp(1.4rem,3.2vw,3.2rem)", fontWeight: 300, lineHeight: 1.1,
                    letterSpacing: "-0.01em", color: "rgba(10,10,10,0.48)",
                    margin: "0 0 clamp(1.2rem,2.5vw,2rem)",
                  }} oneLine />
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}>
                <EditableText cms="hero.tagline" tag="p" style={{
                  fontFamily: "var(--font-sans)", fontSize: "clamp(0.72rem,0.85vw,0.82rem)",
                  fontWeight: 300, lineHeight: 1.82, color: "rgba(10,10,10,0.40)",
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
                padding: "12px 24px", background: "#0A0A0A",
                fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 400,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "#FFFFFF",
                whiteSpace: "nowrap", transition: "background 0.22s",
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#1a1a1a")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#0A0A0A")}>
                <EditableText cms="hero.cta.primary" oneLine />
              </Link>
              <Link to="/tower" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "12px 24px", background: "transparent",
                border: "1px solid rgba(10,10,10,0.25)",
                fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 400,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(10,10,10,0.70)", whiteSpace: "nowrap", transition: "border-color 0.22s, color 0.22s",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(10,10,10,0.50)"; el.style.color = "#0A0A0A"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(10,10,10,0.25)"; el.style.color = "rgba(10,10,10,0.70)"; }}>
                <EditableText cms="hero.cta.secondary" oneLine />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats strip */}
        <motion.div style={{ borderTop: "1px solid rgba(10,10,10,0.10)" }}
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
                  borderLeft: i > 0 ? "1px solid rgba(10,10,10,0.08)" : "none",
                  display: "flex", alignItems: "center", gap: "clamp(0.6rem,1.2vw,1rem)",
                }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.9rem,1.6vw,1.35rem)", fontWeight: 300, color: "rgba(10,10,10,0.78)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{s.num}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(10,10,10,0.35)", whiteSpace: "nowrap" }}>{s.label}</span>
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
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "7px", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(10,10,10,0.30)", writingMode: "vertical-rl" }}>Scroll</span>
        <div style={{ width: 1, height: 42, background: "rgba(10,10,10,0.12)", overflow: "hidden" }}>
          <motion.div style={{ width: "100%", height: "100%", background: "rgba(10,10,10,0.55)" }}
            animate={{ y: ["-100%", "200%"] }} transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </motion.div>
    </section>
  );
}
