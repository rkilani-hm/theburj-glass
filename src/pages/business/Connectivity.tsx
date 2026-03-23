import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import towerDayHud from "@/assets/tower-daylight-hud.png";

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

const SYSTEMS = [
  { n: "01", title: "Fibre Optic Backbone",    body: "Dual-path fibre optic infrastructure running the full height of the tower. Multiple entry points eliminate single-point-of-failure risk. Suitable for financial trading desks and mission-critical operations." },
  { n: "02", title: "Telecom Redundancy",      body: "All major Kuwait telecom providers available throughout the building. No single-provider dependency. Tenants choose their provider or use multiple carriers simultaneously." },
  { n: "03", title: "Smart Building Automation", body: "Honeywell-certified building management system. Centralised monitoring of HVAC, access, power, lifts, and fire systems. Winner of Honeywell's Smartest Building in Kuwait Award." },
  { n: "04", title: "Power Infrastructure",    body: "Five high-voltage substations at levels B2, 4, 27, 52, and 76. 100% standby generator coverage for all critical systems. Zero unplanned outages since opening in 2011." },
  { n: "05", title: "Building-Wide Wi-Fi",     body: "Enterprise-grade wireless coverage in all common areas, lobbies, parking levels, and the Sky Lounge. Managed by the tower's facilities team." },
];

export default function Connectivity() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", overflowX: "hidden" }}>
      <Header />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* Hero */}
        <section style={{ position: "relative", height: "55vh", minHeight: 400, overflow: "hidden" }}>
          <img src={towerDayHud} alt="Al Hamra Tower smart systems" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.2) 55%, transparent 80%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} className="container-fluid">
            <div style={{ paddingBottom: "clamp(2.5rem, 5vw, 5rem)" }}>
              <motion.p className="eyebrow-light" style={{ marginBottom: 14 }}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                Business · Connectivity
              </motion.p>
              <div style={{ overflow: "hidden" }}>
                <motion.h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 7rem)", fontWeight: 300, lineHeight: 0.96, letterSpacing: "-0.03em", color: "#fff", margin: 0 }}
                  initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  Zero tolerance for downtime.
                </motion.h1>
              </div>
            </div>
          </div>
        </section>

        {/* Systems */}
        <section style={{ padding: "clamp(5rem, 10vw, 10rem) 0" }}>
          <div className="container-fluid">
            <div className="grid lg:grid-cols-12 gap-12 mb-16">
              <div className="lg:col-span-5">
                <R><p className="eyebrow" style={{ marginBottom: 18 }}>Technical Infrastructure</p></R>
                <R delay={0.08}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 4.5rem)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--black)" }}>
                    Built for the demands of modern business.
                  </h2>
                </R>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
                <R delay={0.18}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--graphite)" }}>
                    Al Hamra Tower's technical infrastructure was engineered to meet the requirements of 
                    Kuwait's most demanding organisations — government institutions, financial services firms, 
                    and international corporations that cannot afford interruption.
                  </p>
                </R>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--rule-light)" }}>
              {SYSTEMS.map((s, i) => (
                <R key={s.n} delay={i * 0.05}>
                  <div style={{ padding: "clamp(2rem, 4vw, 3rem) 0", borderBottom: "1px solid var(--rule-light)" }}
                    className="grid lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-1">
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", color: "var(--ash)" }}>{s.n}</span>
                    </div>
                    <div className="lg:col-span-4">
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--black)" }}>{s.title}</h3>
                    </div>
                    <div className="lg:col-span-7">
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "var(--graphite)" }}>{s.body}</p>
                    </div>
                  </div>
                </R>
              ))}
            </div>

            {/* Stat highlight */}
            <div style={{ marginTop: "clamp(4rem, 8vw, 8rem)", background: "var(--black)", padding: "clamp(3rem, 6vw, 6rem)" }}>
              <div className="grid lg:grid-cols-3 gap-0">
                {[
                  { v: "100%", l: "Power Redundancy",   d: "5 substations across the tower" },
                  { v: "0",    l: "Unplanned Outages",  d: "Since opening in November 2011" },
                  { v: "24/7", l: "Monitoring",         d: "Centralised building management" },
                ].map((s, i) => (
                  <R key={s.l} delay={i * 0.08}>
                    <div style={{ textAlign: "center", padding: "clamp(1.5rem, 3vw, 2.5rem)", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#fff", letterSpacing: "-0.04em", marginBottom: 10 }}>{s.v}</div>
                      <p className="eyebrow-light" style={{ marginBottom: 6 }}>{s.l}</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.28)" }}>{s.d}</p>
                    </div>
                  </R>
                ))}
              </div>
            </div>

            <R delay={0.1} style={{ marginTop: "clamp(3rem, 5vw, 4rem)" }}>
              <Link to="/leasing/inquiry" className="btn-primary">Discuss Your Requirements</Link>
            </R>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
