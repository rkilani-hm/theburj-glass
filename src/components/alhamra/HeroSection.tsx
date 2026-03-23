/**
 * Hero — Full-screen video. Cinematic gradient overlay — warm not pitch black.
 * After hero, everything goes LIGHT.
 */
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/hero-video.mp4";
import towerFull from "@/assets/tower-full-blue-sky.png";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rawScale   = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const rawY       = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale      = useSpring(rawScale, { stiffness: 60, damping: 20 });
  const contentY   = useSpring(rawY,     { stiffness: 60, damping: 20 });

  return (
    <section ref={ref} style={{
      position: "relative", width: "100%", height: "100svh", minHeight: 560,
      background: "#1A1814", overflow: "hidden",
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
    }}>
      {/* Video */}
      <motion.div style={{ position: "absolute", inset: 0, scale, transformOrigin: "center" }}>
        <video src={heroVideo} poster={towerFull} autoPlay muted loop playsInline preload="metadata"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
        {/* Gradient veil — warm dark, not pure black */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(20,18,15,0.92) 0%, rgba(20,18,15,0.45) 35%, rgba(20,18,15,0.1) 65%, rgba(20,18,15,0.25) 100%)",
        }} />
      </motion.div>

      {/* Content */}
      <motion.div style={{ y: contentY, opacity: rawOpacity, position: "relative", zIndex: 2 }}
        className="container-fluid">
        <div style={{ paddingBottom: "clamp(2rem, 4vw, 4rem)", maxWidth: 900 }}>

          <motion.p
            style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.2em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 14 }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Kuwait City · 412 Metres · Since 2011
          </motion.p>

          {/* Main headline */}
          <div style={{ overflow: "hidden", marginBottom: 6 }}>
            <motion.h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4rem, 11vw, 12rem)",
              fontWeight: 300, lineHeight: 0.90, letterSpacing: "-0.04em",
              color: "#FFFFFF", margin: 0,
            }}
              initial={{ y: "102%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >Al Hamra</motion.h1>
          </div>
          <div style={{ overflow: "hidden", marginBottom: 32 }}>
            <motion.p style={{
              fontFamily: "var(--font-display)", fontStyle: "italic",
              fontSize: "clamp(1.3rem, 3.5vw, 4.5rem)",
              fontWeight: 300, lineHeight: 0.95, letterSpacing: "-0.02em",
              color: "rgba(255,255,255,0.42)", margin: 0,
            }}
              initial={{ y: "102%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >Business Tower</motion.p>
          </div>

          <motion.div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
              fontWeight: 300, lineHeight: 1.78,
              color: "rgba(255,255,255,0.38)", maxWidth: 460, margin: 0,
            }}>
              Kuwait's tallest building. The world's tallest sculpted concrete tower.
              Inspired by the bisht — a symbol rising from the desert.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link to="/tower" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "13px 28px", background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.20)",
                fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.80)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)"; }}
              >
                Explore the Tower →
              </Link>
              <Link to="/leasing/opportunities" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "13px 28px", background: "#fff",
                fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#0F0F0E",
                transition: "background 0.25s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F0EDE7"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
              >
                Leasing Inquiries
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats bar at bottom */}
      <motion.div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        borderTop: "1px solid rgba(255,255,255,0.07)", zIndex: 2,
        opacity: rawOpacity as any,
      }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.7 }}
      >
        <div className="container-fluid">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "14px 0" }}>
            {[
              { num: "412m",  label: "Height" },
              { num: "80",    label: "Floors" },
              { num: "77",    label: "Office Floors" },
              { num: "2011",  label: "Completed" },
            ].map((s, i) => (
              <div key={i} style={{
                paddingLeft: i > 0 ? "clamp(1rem, 2.5vw, 2.5rem)" : 0,
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2vw, 1.6rem)", fontWeight: 300, color: "rgba(255,255,255,0.80)", display: "block", letterSpacing: "-0.03em" }}>{s.num}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", display: "block", marginTop: 2 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div style={{
        position: "absolute", right: "clamp(1.5rem, 3vw, 3rem)", bottom: "clamp(2rem, 4vw, 3.5rem)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 2,
        opacity: rawOpacity as any,
      }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.7 }}
      >
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", writingMode: "vertical-rl" }}>Scroll</span>
        <div style={{ width: 1, height: 44, background: "rgba(255,255,255,0.10)", overflow: "hidden" }}>
          <motion.div style={{ width: "100%", height: "100%", background: "rgba(255,255,255,0.55)" }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </motion.div>
    </section>
  );
}
