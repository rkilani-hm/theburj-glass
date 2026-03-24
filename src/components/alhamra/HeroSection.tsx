/**
 * HeroSection — Video hero, refined overlay
 *
 * Layout: 12-col grid
 * - Top-left:  location tag (small caps)
 * - Centre:    headline block — "Al Hamra / Business Tower" in restrained serif
 * - Bottom-left: single CTA row
 * - Bottom-right: scroll indicator
 * - Bottom strip: 4 stats, hairline-separated
 *
 * Typography intention:
 * - Headline at ~5-6rem (not 10rem) so the building in the video reads
 * - Cormorant weight 300 italic for "Kuwait's most important address"
 * - DM Sans 300 for all supporting text
 */
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/hero-video.mp4";

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
      position: "relative",
      width: "100%",
      height: "100svh",
      minHeight: 600,
      background: "#080806",
      overflow: "hidden",
    }}>

      {/* ── Video ── */}
      <motion.div style={{ position: "absolute", inset: 0, scale, transformOrigin: "center" }}>
        <video
          src={heroVideo}
          autoPlay muted loop playsInline preload="auto"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 18%",
            filter: "brightness(1.1) contrast(1.04) saturate(0.9)",
          }}
        />
        {/* Gradient: gentle bottom darkening only — let mid-frame stay bright */}
        <div style={{
          position: "absolute", inset: 0,
          background: [
            "linear-gradient(to top, rgba(8,8,6,0.88) 0%, rgba(8,8,6,0.22) 30%, transparent 52%)",
            "linear-gradient(to bottom, rgba(8,8,6,0.28) 0%, transparent 18%)",
          ].join(", "),
        }} />
      </motion.div>

      {/* ── Content grid ── */}
      <motion.div
        style={{
          position: "absolute", inset: 0, zIndex: 2,
          y: contentY, opacity: rawOpacity as any,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
        }}
      >
        <div className="container-fluid" style={{ paddingBottom: "clamp(5rem, 9vw, 8rem)" }}>

          {/* ── Divider line above headline ── */}
          <motion.div
            style={{ height: 1, background: "rgba(255,255,255,0.14)", marginBottom: "clamp(1.5rem, 3vw, 2.5rem)", maxWidth: 480 }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* ── Main grid: headline left, CTA right ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "flex-end",
          }}>

            {/* Left: Eyebrow + headline + tagline */}
            <div>
              {/* Eyebrow */}
              <motion.p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "9px",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.40)",
                  marginBottom: "clamp(0.8rem, 1.5vw, 1.2rem)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Kuwait City &nbsp;·&nbsp; 412 Metres &nbsp;·&nbsp; Est. 2011
              </motion.p>

              {/* Headline: "Al Hamra" */}
              <div style={{ overflow: "hidden" }}>
                <motion.h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.8rem, 6.5vw, 6.5rem)",
                    fontWeight: 300,
                    lineHeight: 1.0,
                    letterSpacing: "-0.03em",
                    color: "#FFFFFF",
                    margin: 0,
                  }}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  Al Hamra
                </motion.h1>
              </div>

              {/* Sub-headline: "Business Tower" — serif italic, muted */}
              <div style={{ overflow: "hidden" }}>
                <motion.p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: "clamp(1.4rem, 3.2vw, 3.2rem)",
                    fontWeight: 300,
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    color: "rgba(255,255,255,0.48)",
                    margin: "0 0 clamp(1.2rem, 2.5vw, 2rem)",
                  }}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  Business Tower
                </motion.p>
              </div>

              {/* Tagline */}
              <motion.p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.72rem, 0.85vw, 0.82rem)",
                  fontWeight: 300,
                  lineHeight: 1.82,
                  color: "rgba(255,255,255,0.36)",
                  maxWidth: 380,
                  margin: 0,
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
              >
                Kuwait's tallest building. The world's tallest sculpted
                concrete tower. An architectural landmark designed by
                Skidmore, Owings &amp; Merrill.
              </motion.p>
            </div>

            {/* Right: CTAs stacked vertically */}
            <motion.div
              style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/leasing/opportunities" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "12px 24px",
                background: "#FFFFFF",
                fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 400,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#0A0A0A",
                whiteSpace: "nowrap",
                transition: "background 0.22s",
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#EDEDE9")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#FFFFFF")}
              >
                Leasing Inquiries
              </Link>

              <Link to="/tower" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "12px 24px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.20)",
                fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 400,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.70)",
                whiteSpace: "nowrap",
                transition: "border-color 0.22s, color 0.22s",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.50)"; el.style.color = "#fff"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.20)"; el.style.color = "rgba(255,255,255,0.70)"; }}
              >
                The Tower
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom stat strip ── */}
        <motion.div
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", zIndex: 2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          <div className="container-fluid">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              padding: "clamp(0.8rem, 1.5vw, 1.2rem) 0",
            }}>
              {[
                { num: "412 m",    label: "Height"        },
                { num: "80",       label: "Floors"        },
                { num: "43",       label: "Elevators"     },
                { num: "2011",     label: "Completed"     },
              ].map((s, i) => (
                <div key={i} style={{
                  paddingLeft:  i > 0 ? "clamp(1rem, 2.5vw, 2.5rem)" : 0,
                  borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(0.6rem, 1.2vw, 1rem)",
                }}>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(0.9rem, 1.6vw, 1.35rem)",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.78)",
                    letterSpacing: "-0.02em",
                    whiteSpace: "nowrap",
                  }}>{s.num}</span>
                  <span style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "8px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.28)",
                    whiteSpace: "nowrap",
                  }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator — right side ── */}
      <motion.div
        style={{
          position: "absolute",
          right: "clamp(1.5rem, 3vw, 2.5rem)",
          bottom: "clamp(5rem, 9vw, 7.5rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          zIndex: 3,
          opacity: rawOpacity as any,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span style={{
          fontFamily: "var(--font-sans)",
          fontSize: "7px",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)",
          writingMode: "vertical-rl",
        }}>Scroll</span>
        <div style={{ width: 1, height: 42, background: "rgba(255,255,255,0.10)", overflow: "hidden" }}>
          <motion.div
            style={{ width: "100%", height: "100%", background: "rgba(255,255,255,0.55)" }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
