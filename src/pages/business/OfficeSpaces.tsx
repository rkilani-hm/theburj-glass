import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import lobbyArches   from "@/assets/lobby-arches.jpg";
import aerialGulf    from "@/assets/tower-aerial-gulf.jpg";
import entranceDusk  from "@/assets/entrance-dusk.jpg";
import towerAerialN  from "@/assets/tower-aerial-north.jpg";

import { useHeroTheme } from "@/contexts/HeroThemeContext";
const R = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
};

const CONFIGS = [
  {
    n: "01", title: "Executive Suite",
    size: "250 – 500 m²", floors: "Select floors",
    desc: "Corner positions with panoramic Gulf views. Private reception area and executive amenities. Suitable for C-suite offices or boutique professional firms.",
    features: ["Corner position", "Arabian Gulf views", "Private reception"],
  },
  {
    n: "02", title: "Full Floor Headquarters",
    size: "1,200 – 2,300 m²", floors: "Floors 6 – 73",
    desc: "Entire floor plates with dedicated elevator lobbies. 360° views of Kuwait City and the Gulf. Full branding integration and signage rights available.",
    features: ["Dedicated elevator lobby", "360° panoramic views", "Full branding rights"],
  },
  {
    n: "03", title: "Executive Floors 74 & 75",
    size: "By arrangement", floors: "327 – 338m elevation",
    desc: "The highest business address in Kuwait. Reserved for organisations that lead. Two floors at the summit, above the clouds on most mornings.",
    features: ["Highest floors in Kuwait", "Below-cloud elevation", "Exclusive address"],
  },
  {
    n: "04", title: "Multi-Floor Corporate Campus",
    size: "3,000+ m²", floors: "Contiguous blocks",
    desc: "Contiguous multi-floor configurations with internal connecting staircases. Headquarters-scale presence with dedicated reception floors and full signage rights.",
    features: ["Internal staircases", "Dedicated reception floor", "Compound signage"],
  },
];

export default function OfficeSpaces() {
  useHeroTheme("dark");

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", overflowX: "hidden" }}>
      <Header />
      <main>

        {/* Hero */}
        <section style={{ position: "relative", height: "65vh", minHeight: 440, overflow: "hidden" }}>
          <img src={lobbyArches} alt="Al Hamra Tower lobby arches" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.2) 55%, transparent 80%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} className="container-fluid">
            <div style={{ paddingBottom: "clamp(2.5rem, 5vw, 5rem)" }}>
              <motion.p className="eyebrow-light" style={{ marginBottom: 14 }}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                Business · Office Spaces
              </motion.p>
              <div style={{ overflow: "hidden" }}>
                <motion.h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 7rem)", fontWeight: 300, lineHeight: 0.96, letterSpacing: "-0.03em", color: "#fff", margin: 0 }}
                  initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  Kuwait's finest offices.
                </motion.h1>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications overview */}
        <section style={{ background: "#fff", padding: "clamp(5rem, 10vw, 10rem) 0" }}>
          <div className="container-fluid">
            <div className="grid lg:grid-cols-12 gap-12 mb-16">
              <div className="lg:col-span-5">
                <R><p className="eyebrow" style={{ marginBottom: 18 }}>Floor Specifications</p></R>
                <R delay={0.08}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 4.5rem)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--black)" }}>
                    Every floor plate designed for performance.
                  </h2>
                </R>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
                <R delay={0.18}>
                  <div className="grid grid-cols-2 gap-8">
                    {[
                      { v: "2,300 m²", l: "Typical floor area" },
                      { v: "3.2m",     l: "Ceiling height" },
                      { v: "Column-free", l: "Layout flexibility" },
                      { v: "270°",     l: "Gulf view angle" },
                    ].map(s => (
                      <div key={s.l}>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 300, letterSpacing: "-0.03em", color: "var(--black)", marginBottom: 6 }}>{s.v}</div>
                        <p className="eyebrow">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </R>
              </div>
            </div>

            {/* Config cards */}
            <div style={{ borderTop: "1px solid var(--rule-light)" }}>
              {CONFIGS.map((c, i) => (
                <R key={c.n} delay={i * 0.06}>
                  <div style={{ padding: "clamp(2rem, 4vw, 3.5rem) 0", borderBottom: "1px solid var(--rule-light)" }}
                    className="grid lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-1">
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", color: "var(--ash)" }}>{c.n}</span>
                    </div>
                    <div className="lg:col-span-3">
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--black)", marginBottom: 8 }}>{c.title}</h3>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300, color: "var(--stone)" }}>{c.floors}</p>
                    </div>
                    <div className="lg:col-span-4">
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.78, color: "var(--graphite)" }}>{c.desc}</p>
                    </div>
                    <div className="lg:col-span-3">
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 300, letterSpacing: "-0.02em", color: "var(--black)", marginBottom: 14 }}>{c.size}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {c.features.map(f => (
                          <p key={f} style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300, color: "var(--stone)", display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ width: 4, height: 4, background: "var(--ash)", borderRadius: "50%", flexShrink: 0 }} />{f}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="lg:col-span-1" style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>
                      <Link to="/leasing/inquiry" style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ash)", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--black)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--ash)")}>
                        Enquire →
                      </Link>
                    </div>
                  </div>
                </R>
              ))}
            </div>

            <R delay={0.1}>
              <div style={{ marginTop: "clamp(3rem, 5vw, 4rem)", display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link to="/leasing/inquiry" className="btn-primary">Request Floor Plans</Link>
                <Link to="/leasing/opportunities" className="btn-ghost-dark">Leasing Overview →</Link>
              </div>
            </R>
          </div>
        </section>

        {/* Two-image feature */}
        <section style={{ background: "var(--black)", padding: "clamp(5rem, 10vw, 10rem) 0" }}>
          <div className="container-fluid">
            <div className="grid lg:grid-cols-2 gap-3">
              <R>
                <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                  <motion.img src={aerialGulf} alt="Al Hamra Tower aerial Gulf view" loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    whileHover={{ scale: 1.04 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
                </div>
                <p className="eyebrow-light" style={{ marginTop: 14 }}>Northern Gulf Views</p>
              </R>
              <R delay={0.1}>
                <div style={{ aspectRatio: "4/3", overflow: "hidden", marginTop: "clamp(2rem, 4vw, 4rem)" }}>
                  <motion.img src={entranceDusk} alt="Al Hamra Tower entrance at dusk" loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    whileHover={{ scale: 1.04 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
                </div>
                <p className="eyebrow-light" style={{ marginTop: 14 }}>Street-Level Entrance</p>
              </R>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
