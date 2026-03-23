/**
 * Tower Overview — /tower
 * Landing page for the Tower section. New design system only.
 */
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";

import towerFull     from "@/assets/tower-full-blue-sky.png";
import towerFacade   from "@/assets/tower-facade-twisted.png";
import towerBW2      from "@/assets/tower-bw-2.png";
import towerAerial   from "@/assets/tower-aerial-day.png";
import towerLow      from "@/assets/tower-lowangle-clouds.png";
import towerNight    from "@/assets/tower-night-illuminated.jpg";
import towerSkyline  from "@/assets/som-tower-skyline.jpg";

/* ── shared mini-reveal ── */
const R = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  );
};

export default function Tower() {
  /* Hero parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "28%"]), { stiffness: 55, damping: 22 });
  const heroOp = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const SUB_PAGES = [
    { label: "Origins",           sub: "Founded 2004",                  href: "/tower/origins",       img: towerBW2     },
    { label: "Rising",            sub: "Construction 2005–2011",         href: "/tower/rising",        img: towerFacade  },
    { label: "Design & Engineering", sub: "SOM — Bisht form",           href: "/tower/design",        img: towerLow     },
    { label: "Sustainability",    sub: "Climate-responsive architecture", href: "/tower/sustainability",img: towerAerial  },
    { label: "Awards",            sub: "Time Magazine 2011 and beyond",  href: "/tower/recognition",   img: towerNight   },
    { label: "Dashboard",         sub: "Building specifications",        href: "/tower/dashboard",     img: towerSkyline },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", overflowX: "hidden" }}>
      <Header />

      {/* ── Hero ── */}
      <section ref={heroRef} style={{ position: "relative", height: "90svh", minHeight: 560, overflow: "hidden" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
          <img src={towerFull} alt="Al Hamra Tower" style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 15%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.4) 45%, rgba(10,10,10,0.55) 100%)" }} />
        </motion.div>
        <motion.div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: heroOp }}
          className="container-fluid" >
          <div style={{ paddingBottom: "clamp(3rem, 6vw, 6rem)", maxWidth: 820 }}>
            <motion.p className="eyebrow-light" style={{ marginBottom: 20 }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
              Al Hamra Tower · Kuwait City · 412m
            </motion.p>
            <div style={{ overflow: "hidden" }}>
              <motion.h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 9vw, 10rem)", fontWeight: 300, lineHeight: 0.9, letterSpacing: "-0.035em", color: "#fff", margin: 0 }}
                initial={{ y: "105%" }} animate={{ y: 0 }}
                transition={{ duration: 1.15, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                The Tower
              </motion.h1>
            </div>
            <motion.p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(0.88rem, 1vw, 0.98rem)", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.42)", maxWidth: 480, marginTop: 24 }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}>
              Kuwait's tallest building. The world's tallest sculpted concrete tower. 
              A landmark defined by removal — a quarter of each floor carved away, 
              spiralling upward like the bisht it was born from.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ── Identity ── */}
      <section style={{ background: "#fff", padding: "clamp(6rem, 12vw, 12rem) 0" }}>
        <div className="container-fluid">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <R><p className="eyebrow" style={{ marginBottom: 20 }}>Identity</p></R>
              <R delay={0.08}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 4.5rem)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--black)" }}>
                  A landmark carved from conviction.
                </h2>
              </R>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
              <R delay={0.18}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--graphite)", marginBottom: 20 }}>
                  Designed by Skidmore, Owings &amp; Merrill, Al Hamra Tower stands as Kuwait's 
                  most significant architectural achievement. At 412 metres, it is the tallest 
                  building in Kuwait and the tallest sculpted concrete tower ever constructed.
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--stone)", marginBottom: 36 }}>
                  Its form emerged from a single architectural gesture — removing a quarter of 
                  each floor plate from the south side, shifting from west to east as the tower 
                  rises. The result: a monolithic Jura limestone wall facing the desert sun, 
                  framed by graceful glass facades that capture the Gulf and the city skyline.
                </p>
                <Link to="/tower/design" className="btn-arrow">Design &amp; Engineering</Link>
              </R>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ marginTop: "clamp(4rem, 8vw, 8rem)", borderTop: "1px solid var(--rule-light)" }}>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {[
                { v: "412m",     l: "Height",           d: "Kuwait's tallest structure" },
                { v: "80",       l: "Floors",            d: "Above-ground office levels" },
                { v: "195,000",  l: "m² Total Area",     d: "Office + retail + amenities" },
                { v: "2011",     l: "Completed",         d: "November opening" },
              ].map((s, i) => (
                <R key={s.l} delay={i * 0.07}>
                  <div style={{ padding: "clamp(2rem, 4vw, 3rem) 0", paddingLeft: i > 0 ? "clamp(1.5rem, 3vw, 3rem)" : 0, borderLeft: i > 0 ? "1px solid var(--rule-light)" : "none" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 5.5rem)", fontWeight: 300, lineHeight: 1, letterSpacing: "-0.04em", color: "var(--black)", marginBottom: 8 }}>
                      {s.v}
                    </div>
                    <p className="eyebrow" style={{ marginBottom: 6 }}>{s.l}</p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "var(--ash)" }}>{s.d}</p>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-bleed tower with quote ── */}
      <section style={{ position: "relative", height: "clamp(400px, 55vw, 700px)", overflow: "hidden" }}>
        <motion.img src={towerNight} alt="Al Hamra Tower at night"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
          initial={{ scale: 1.06 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 2.8, ease: "easeOut" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.3) 60%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <R>
            <blockquote style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2.8vw, 2.8rem)", fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.82)", textAlign: "center", maxWidth: 720, padding: "0 2rem", lineHeight: 1.4, letterSpacing: "-0.01em" }}>
              "The purity of its form, expressed by a simple operation of removal,<br />makes the tower a timeless, elegant marker in the heart of Kuwait City."
            </blockquote>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", textAlign: "center", marginTop: 24 }}>
              Skidmore, Owings &amp; Merrill — Project Description
            </p>
          </R>
        </div>
      </section>

      {/* ── Sub-page navigation ── */}
      <section style={{ background: "var(--limestone)", padding: "clamp(6rem, 12vw, 12rem) 0" }}>
        <div className="container-fluid">
          <R style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Explore the Tower</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 4.5rem)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--black)" }}>
              Every story begins here.
            </h2>
          </R>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SUB_PAGES.map((p, i) => (
              <R key={p.href} delay={i * 0.07}>
                <Link to={p.href} style={{ display: "block", cursor: "pointer" }}>
                  <div style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative", marginBottom: 14 }}>
                    <motion.img src={p.img} alt={p.label} loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" }}
                      whileHover={{ scale: 1.05 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 50%)", opacity: 0, transition: "opacity 0.3s" }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "0")} />
                  </div>
                  <p className="eyebrow" style={{ marginBottom: 6 }}>{p.sub}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--black)" }}>{p.label}</h3>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "var(--ash)" }}>→</span>
                  </div>
                </Link>
              </R>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
