import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import towerAerialSea  from "@/assets/tower-aerial-sea.jpg";
import skylinePark     from "@/assets/skyline-park-panorama.jpg";
import somObservation  from "@/assets/som-observation.jpg";

import { useHeroTheme } from "@/contexts/HeroThemeContext";
import EditableText from "@/components/admin/EditableText";
const R = ({ children, delay = 0, style, className }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} style={style} className={className}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
};

const TYPES = [
  { n: "01", type: "Executive Suite",          size: "250 – 500 m²",  floors: "Select floors",   cta: "Enquire" },
  { n: "02", type: "Full-Floor Headquarters",  size: "1,200 – 2,300 m²", floors: "Floors 6 – 73", cta: "Enquire" },
  { n: "03", type: "Executive Floors 74 & 75", size: "By arrangement", floors: "327 – 338m",      cta: "Enquire" },
  { n: "04", type: "Multi-Floor Campus",       size: "3,000+ m²",     floors: "Contiguous",      cta: "Enquire" },
];

const REASONS = [
  { v: "412m",  l: "Prestige",       d: "Kuwait's tallest address — visible from every part of the city." },
  { v: "92%",   l: "Occupancy",      d: "Consistently in demand. Limited availability at any given time." },
  { v: "2,300", l: "m² per floor",   d: "Kuwait's largest typical floor plate for maximum flexibility." },
  { v: "24/7",  l: "Management",     d: "World-class facilities team. Zero unplanned building outages since 2011." },
];

export default function LeasingOpportunities() {
  useHeroTheme("dark");

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", overflowX: "hidden" }}>
      <Header />
      <main>

        {/* Hero */}
        <section style={{ position: "relative", height: "70vh", minHeight: 480, overflow: "hidden" }}>
          <img src={towerAerialSea} alt="Al Hamra Tower aerial view over the Gulf" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.90) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.5) 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} className="container-fluid">
            <div style={{ paddingBottom: "clamp(3rem, 5vw, 5rem)" }}>
              <motion.p className="eyebrow-light" style={{ marginBottom: 14 }}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                <EditableText cms="lo.eyebrow" oneLine tag="p" className="eyebrow-light" />
              </motion.p>
              <div style={{ overflow: "hidden" }}>
                <motion.h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 7vw, 8rem)", fontWeight: 300, lineHeight: 0.96, letterSpacing: "-0.035em", color: "#fff", margin: 0 }}
                  initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  <EditableText cms="lo.headline" oneLine tag="h1" />
                </motion.h1>
              </div>
            </div>
          </div>
        </section>

        {/* Why Al Hamra */}
        <section style={{ background: "var(--limestone)", padding: "clamp(5rem, 10vw, 10rem) 0" }}>
          <div className="container-fluid">
            <R style={{ marginBottom: "clamp(3rem, 5vw, 5rem)" }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}><EditableText cms="lo.why.label" oneLine tag="p" className="eyebrow" /></p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 4.5rem)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--black)", maxWidth: 640 }}>
                <EditableText cms="lo.why.h" oneLine tag="h2" />
              </h2>
            </R>

            <div style={{ borderTop: "1px solid var(--rule-light)" }}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
                {REASONS.map((r, i) => (
                  <R key={r.l} delay={i * 0.07}>
                    <div style={{ padding: "clamp(2rem, 4vw, 3.5rem) 0", borderBottom: "1px solid var(--rule-light)", paddingLeft: i > 0 ? "clamp(1.5rem, 3vw, 3rem)" : 0, borderLeft: i > 0 ? "1px solid var(--rule-light)" : "none" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: 300, color: "var(--black)", letterSpacing: "-0.04em", marginBottom: 8 }}>{r.v}</div>
                      <p className="eyebrow" style={{ marginBottom: 10 }}>{r.l}</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, lineHeight: 1.65, color: "var(--stone)" }}>{r.d}</p>
                    </div>
                  </R>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Space types */}
        <section style={{ background: "#fff", padding: "clamp(5rem, 10vw, 10rem) 0" }}>
          <div className="container-fluid">
            <R style={{ marginBottom: "clamp(3rem, 5vw, 5rem)" }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}><EditableText cms="lo.types.label" oneLine tag="p" className="eyebrow" /></p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 4.5rem)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--black)" }}>
                <EditableText cms="lo.types.h" oneLine tag="h2" />
              </h2>
            </R>

            <div style={{ borderTop: "1px solid var(--rule-light)" }}>
              {TYPES.map((t, i) => (
                <R key={t.n} delay={i * 0.05}>
                  <div className="grid lg:grid-cols-12 gap-6 items-center"
                    style={{ padding: "clamp(1.5rem, 3vw, 2.5rem) 0", borderBottom: "1px solid var(--rule-light)" }}>
                    <div className="lg:col-span-1">
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", color: "var(--ash)" }}>{t.n}</span>
                    </div>
                    <div className="lg:col-span-4">
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--black)" }}>{t.type}</h3>
                    </div>
                    <div className="lg:col-span-3">
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 300, color: "var(--graphite)", letterSpacing: "-0.015em" }}>{t.size}</p>
                    </div>
                    <div className="lg:col-span-2">
                      <p className="eyebrow">{t.floors}</p>
                    </div>
                    <div className="lg:col-span-2" style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Link to="/leasing/inquiry" style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ash)", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--black)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--ash)")}>
                        {t.cta} →
                      </Link>
                    </div>
                  </div>
                </R>
              ))}
            </div>

            <R delay={0.1} style={{ marginTop: "clamp(3rem, 5vw, 4rem)" }}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link to="/leasing/inquiry" className="btn-primary">Submit an Inquiry</Link>
                <Link to="/leasing/downloads" className="btn-ghost-dark">Download Floor Plans →</Link>
              </div>
            </R>
          </div>
        </section>

        {/* Image pair */}
        <section style={{ background: "var(--black)", padding: "clamp(5rem, 10vw, 10rem) 0" }}>
          <div className="container-fluid">
            <div className="grid lg:grid-cols-2 gap-3">
              <R>
                <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                  <motion.img src={skylinePark} alt="Kuwait skyline from Al Hamra" loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    whileHover={{ scale: 1.04 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
                </div>
                <p className="eyebrow-light" style={{ marginTop: 14 }}>Kuwait City Skyline</p>
              </R>
              <R delay={0.1}>
                <div style={{ aspectRatio: "4/3", overflow: "hidden", marginTop: "clamp(2rem, 4vw, 4rem)" }}>
                  <motion.img src={somObservation} alt="Views from upper floors" loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    whileHover={{ scale: 1.04 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
                </div>
                <p className="eyebrow-light" style={{ marginTop: 14 }}>Upper Floor Views</p>
              </R>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "var(--black)", padding: "clamp(5rem, 10vw, 8rem) 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="container-fluid">
            <div className="grid lg:grid-cols-12 items-center gap-12">
              <div className="lg:col-span-7">
                <R>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 7rem)", fontWeight: 300, lineHeight: 0.96, letterSpacing: "-0.035em", color: "#fff" }}>
                    <EditableText cms="lo.begin.h" oneLine tag="h2" />
                  </h2>
                </R>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <R delay={0.15}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.82, color: "rgba(255,255,255,0.38)", marginBottom: 32 }}>
                    Our leasing team responds within 24 hours. Provide your requirements 
                    and we will prepare a tailored proposal.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <Link to="/leasing/inquiry" className="btn-primary">Submit an Inquiry →</Link>
                    <a href="tel:+96522270222" className="btn-ghost-white">+965 222 70 222</a>
                  </div>
                </R>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
