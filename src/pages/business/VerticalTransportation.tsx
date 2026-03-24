import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import towerNightHud from "@/assets/tower-night-hud.png";
import towerVertical from "@/assets/som-tower-vertical.jpg";

import { useHeroTheme } from "@/contexts/HeroThemeContext";
import EditableText from "@/components/admin/EditableText";
const R = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 26 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
};

const SPECS = [
  { n: "43",  l: "Total Elevators",       d: "Serving all 80 floors including mechanical and refuge levels" },
  { n: "10",  l: "High-Speed Passenger",  d: "Express shuttles to upper floors — travel time under 45 seconds to floor 80" },
  { n: "4",   l: "Service Lifts",         d: "Dedicated freight and service access, separate from tenant circulation" },
  { n: "29",  l: "Refuge Floors",         d: "Two refuge floors at levels 29 and 54 per international life-safety standards" },
];

const ZONES = [
  { floors: "B3 – 5",   title: "Podium & Lobby",   desc: "Ground arrival, mall access, and parking connection." },
  { floors: "6 – 28",   title: "Lower Office Zone",  desc: "Low-rise express and local elevator banks." },
  { floors: "29 – 53",  title: "Mid Office Zone",    desc: "Mid-zone express banks with sky lobby transfer at floor 29." },
  { floors: "54 – 73",  title: "Upper Office Zone",  desc: "Upper-zone express with sky lobby transfer at floor 54." },
  { floors: "74 – 75",  title: "Executive Floors",   desc: "Dedicated private lift access — restricted to floor 74 & 75 tenants." },
  { floors: "76+",      title: "Technical & Pinnacle", desc: "Mechanical floors, Sky Lounge at 351m, observation at summit." },
];

export default function VerticalTransportation() {
  useHeroTheme("dark");

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", overflowX: "hidden" }}>
      <Header />
      <main>

        {/* Hero */}
        <section style={{ position: "relative", height: "60vh", minHeight: 420, overflow: "hidden" }}>
          <img src={towerNightHud} alt="Al Hamra Tower elevators" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.90) 0%, rgba(10,10,10,0.2) 55%, transparent 80%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} className="container-fluid">
            <div style={{ paddingBottom: "clamp(2.5rem, 5vw, 5rem)" }}>
              <motion.p className="eyebrow-light" style={{ marginBottom: 14 }}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                <EditableText cms="vt.eyebrow" oneLine tag="p" className="eyebrow-light" />
              </motion.p>
              <div style={{ overflow: "hidden" }}>
                <motion.h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 7rem)", fontWeight: 300, lineHeight: 0.96, letterSpacing: "-0.03em", color: "#fff", margin: 0 }}
                  initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  <EditableText cms="vt.headline" oneLine tag="h1" />
                </motion.h1>
              </div>
            </div>
          </div>
        </section>

        {/* Key stats */}
        <section style={{ background: "var(--limestone)", padding: "clamp(5rem, 10vw, 10rem) 0" }}>
          <div className="container-fluid">
            <div className="grid lg:grid-cols-12 gap-12 mb-16">
              <div className="lg:col-span-5">
                <R><p className="eyebrow" style={{ marginBottom: 18 }}><EditableText cms="vt.sys.label" oneLine tag="p" className="eyebrow" /></p></R>
                <R delay={0.08}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 4.5rem)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--black)" }}>
                    <EditableText cms="vt.sys.h" oneLine tag="h2" />
                  </h2>
                </R>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 lg:pt-14">
                <R delay={0.18}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--graphite)" }}>
                    Al Hamra Tower's destination dispatch system groups passengers travelling to 
                    adjacent floors into the same car — eliminating unnecessary stops and 
                    reducing average wait times to under 30 seconds during peak hours. 
                    With 43 lifts across six zones, circulation in a building of 80 floors 
                    remains swift, silent, and dignified.
                  </p>
                </R>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--rule-light)" }}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
                {SPECS.map((s, i) => (
                  <R key={s.n} delay={i * 0.07}>
                    <div style={{ padding: "clamp(2rem, 4vw, 3.5rem) 0", borderBottom: "1px solid var(--rule-light)", paddingLeft: i > 0 ? "clamp(1.5rem, 3vw, 3rem)" : 0, borderLeft: i > 0 ? "1px solid var(--rule-light)" : "none" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 5.5rem)", fontWeight: 300, color: "var(--black)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 10 }}>{s.n}</div>
                      <p className="eyebrow" style={{ marginBottom: 8 }}>{s.l}</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, lineHeight: 1.65, color: "var(--stone)" }}>{s.d}</p>
                    </div>
                  </R>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Zoning table + image */}
        <section style={{ background: "#fff", padding: "clamp(5rem, 10vw, 10rem) 0" }}>
          <div className="container-fluid">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

              {/* Zoning list */}
              <div className="lg:col-span-7">
                <R style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
                  <p className="eyebrow" style={{ marginBottom: 16 }}><EditableText cms="vt.zones.label" oneLine tag="p" className="eyebrow" /></p>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 3.8rem)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.025em", color: "var(--black)" }}>
                    <EditableText cms="vt.zones.h" oneLine tag="h2" />
                  </h2>
                </R>
                <div style={{ borderTop: "1px solid var(--rule-light)" }}>
                  {ZONES.map((z, i) => (
                    <R key={z.floors} delay={i * 0.05}>
                      <div className="grid grid-cols-12 gap-4 items-start"
                        style={{ padding: "clamp(1.2rem, 2.5vw, 2rem) 0", borderBottom: "1px solid var(--rule-light)" }}>
                        <div className="col-span-3">
                          <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--ash)" }}>{z.floors}</span>
                        </div>
                        <div className="col-span-9">
                          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--black)", marginBottom: 4 }}>{z.title}</p>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "var(--stone)", lineHeight: 1.6 }}>{z.desc}</p>
                        </div>
                      </div>
                    </R>
                  ))}
                </div>
              </div>

              {/* Sticky image */}
              <div className="lg:col-span-5 lg:sticky" style={{ top: "calc(var(--nav-h) + 2rem)" }}>
                <R delay={0.12}>
                  <div style={{ aspectRatio: "2/3", overflow: "hidden" }}>
                    <motion.img src={towerVertical} alt="Al Hamra Tower vertical" loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      whileHover={{ scale: 1.04 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
                  </div>
                  <p className="eyebrow" style={{ marginTop: 14 }}>80 Above-Ground Floors</p>
                </R>
              </div>
            </div>

            <R delay={0.1} style={{ marginTop: "clamp(3rem, 5vw, 4rem)" }}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link to="/leasing/inquiry" className="btn-primary">Enquire About Space</Link>
                <Link to="/business/office-spaces" className="btn-ghost-dark">Office Configurations →</Link>
              </div>
            </R>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
