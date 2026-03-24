import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import officeCorr      from "@/assets/office-corridor.jpg";
import towerAerialDay  from "@/assets/tower-aerial-day.png";
import interiorLobby   from "@/assets/interior-lobby.jpg";
import panoramaCity    from "@/assets/panorama-city.jpg";

import { useHeroTheme } from "@/contexts/HeroThemeContext";
import EditableText from "@/components/admin/EditableText";
const R = ({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} style={style}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
};

export default function WorkplaceExperience() {
  useHeroTheme("dark");

  const PILLARS = [
    { n: "01", title: "Premium Office Floors", body: "2,300 m² per floor. Column-free layouts with 3.2m ceiling heights and floor-to-ceiling glass. Gulf views from every direction." },
    { n: "02", title: "Sky Lounge & Corridors", body: "Glass-enclosed sky corridors with panoramic views connect the tower's upper sections. The Sky Lounge at 351m is Kuwait's highest dining destination." },
    { n: "03", title: "Smart Infrastructure",   body: "Honeywell-certified building automation. Fibre optic backbone, 5 substations, 100% power redundancy. Zero tolerance for downtime." },
    { n: "04", title: "Managed Services",       body: "World-class facilities management 24/7. Concierge, security, maintenance — everything handled so your team can focus on work." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", overflowX: "hidden" }}>
      <Header />
      <main>

        {/* Hero */}
        <section style={{ position: "relative", height: "70vh", minHeight: 480, overflow: "hidden" }}>
          <img src={officeCorr} alt="Al Hamra Tower office" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.80) 0%, rgba(10,10,10,0.25) 55%, transparent 80%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} className="container-fluid">
            <div style={{ paddingBottom: "clamp(3rem, 5vw, 5rem)" }}>
              <motion.p className="eyebrow-light" style={{ marginBottom: 16 }}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                <EditableText cms="wp.eyebrow" oneLine tag="p" className="eyebrow-light" />
              </motion.p>
              <div style={{ overflow: "hidden" }}>
                <motion.h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 7vw, 7rem)", fontWeight: 300, lineHeight: 0.96, letterSpacing: "-0.03em", color: "#fff", margin: 0 }}
                  initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  <EditableText cms="wp.headline" oneLine tag="h1" />
                </motion.h1>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section style={{ background: "#fff", padding: "clamp(5rem, 10vw, 10rem) 0" }}>
          <div className="container-fluid">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
              <div className="lg:col-span-5">
                <R><p className="eyebrow" style={{ marginBottom: 18 }}><EditableText cms="wp.env.label" oneLine tag="p" className="eyebrow" /></p></R>
                <R delay={0.08}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 4.5rem)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--black)" }}>
                    <EditableText cms="wp.env.h" oneLine tag="h2" />
                  </h2>
                </R>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
                <R delay={0.18}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--graphite)", marginBottom: 20 }}>
                    Al Hamra Tower hosts Kuwait's leading corporations, government ministries, 
                    and international embassies. At 92% occupancy, this is not just an office building — 
                    it is Kuwait's most important business community.
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--stone)", marginBottom: 36 }}>
                    From the column-free floor plates to the 24-metre lamella lobby, 
                    every decision was made to create an environment where serious work happens.
                  </p>
                  <Link to="/business/office-spaces" className="btn-arrow"><EditableText cms="wp.env.cta" oneLine /></Link>
                </R>
              </div>
            </div>

            {/* Pillars */}
            <div style={{ borderTop: "1px solid var(--rule-light)" }}>
              <div className="grid lg:grid-cols-2 gap-0">
                {PILLARS.map((p, i) => (
                  <R key={p.n} delay={i * 0.07}>
                    <div style={{ padding: "clamp(2rem, 4vw, 3.5rem)", borderBottom: "1px solid var(--rule-light)", borderLeft: i % 2 === 1 ? "1px solid var(--rule-light)" : "none" }}>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", color: "var(--ash)", marginBottom: 16 }}>{p.n}</div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--black)", marginBottom: 14 }}>{p.title}</h3>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, lineHeight: 1.72, color: "var(--stone)" }}>{p.body}</p>
                    </div>
                  </R>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats dark strip */}
        <section style={{ background: "var(--black)", padding: "clamp(4rem, 8vw, 8rem) 0" }}>
          <div className="container-fluid">
            <div className="grid grid-cols-3 gap-0">
              {[
                { v: "92%",  l: "Occupancy Rate",  d: "Consistently in-demand" },
                { v: "120+", l: "Tenants",          d: "Embassies, ministries, multinationals" },
                { v: "24/7", l: "Operations",       d: "Round-the-clock building services" },
              ].map((s, i) => (
                <R key={s.l} delay={i * 0.08}>
                  <div style={{ textAlign: "center", padding: "clamp(2rem, 4vw, 3rem)", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#fff", letterSpacing: "-0.04em", marginBottom: 10 }}>{s.v}</div>
                    <p className="eyebrow-light" style={{ marginBottom: 6 }}>{s.l}</p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.28)" }}>{s.d}</p>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* Image feature */}
        <section style={{ background: "var(--limestone)", padding: "clamp(5rem, 10vw, 10rem) 0" }}>
          <div className="container-fluid">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <R>
                <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                  <motion.img src={panoramaCity} alt="Kuwait city panorama from Al Hamra" loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    whileHover={{ scale: 1.04 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
                </div>
              </R>
              <R delay={0.12}>
                <p className="eyebrow" style={{ marginBottom: 20 }}><EditableText cms="wp.addr.label" oneLine tag="p" className="eyebrow" /></p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 4rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--black)", marginBottom: 24 }}>
                  <EditableText cms="wp.addr.h" oneLine tag="h2" />
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.88, color: "var(--graphite)", marginBottom: 32 }}>
                  Al Sharq District. Adjacent to the diplomatic quarter and government institutions. 
                  Minutes from Kuwait International Airport. The location is as deliberate as the architecture.
                </p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <Link to="/location" className="btn-ghost-dark">Location &amp; Access →</Link>
                  <Link to="/leasing/opportunities" className="btn-primary">Leasing Inquiries</Link>
                </div>
              </R>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
