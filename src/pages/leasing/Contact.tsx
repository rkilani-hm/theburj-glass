import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import towerEntranceNight from "@/assets/tower-entrance-night.jpg";

import { useHeroTheme } from "@/contexts/HeroThemeContext";
const R = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
};

const CONTACTS = [
  {
    dept: "Leasing Inquiries",
    primary: "+965 222 70 222",
    primaryLabel: "WhatsApp available",
    secondary: "+965 222 70 200",
    secondaryLabel: "Tower & Mall",
    email: "leasing@alhamra.com.kw",
    note: "Response within 24 hours",
  },
  {
    dept: "Corporate Office",
    primary: "+965 182 9000",
    primaryLabel: "Main line",
    secondary: "+965 222 70 201",
    secondaryLabel: "Direct",
    email: "info@alhamra.com.kw",
    note: "Sunday – Thursday, 8:00 AM – 6:00 PM",
  },
  {
    dept: "24/7 Helpdesk",
    primary: "+965 222 33 043",
    primaryLabel: "Always open",
    secondary: "+965 222 70 300",
    secondaryLabel: "Alternate",
    email: "helpdesk@alhamra.com.kw",
    note: "Building operations & emergencies",
  },
  {
    dept: "Careers",
    primary: null,
    primaryLabel: null,
    secondary: null,
    secondaryLabel: null,
    email: "careers@alhamra.com.kw",
    note: "Send CV directly to this address",
  },
];

export default function LeasingContact() {
  useHeroTheme("dark");

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", overflowX: "hidden" }}>
      <Header />
      <main>

        {/* Hero */}
        <section style={{ position: "relative", height: "50vh", minHeight: 360, overflow: "hidden" }}>
          <img src={towerEntranceNight} alt="Al Hamra Tower entrance at night" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.90) 0%, rgba(10,10,10,0.2) 55%, transparent 80%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} className="container-fluid">
            <div style={{ paddingBottom: "clamp(2.5rem, 5vw, 5rem)" }}>
              <motion.p className="eyebrow-light" style={{ marginBottom: 14 }}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                Leasing · Contact
              </motion.p>
              <div style={{ overflow: "hidden" }}>
                <motion.h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 7rem)", fontWeight: 300, lineHeight: 0.96, letterSpacing: "-0.03em", color: "#fff", margin: 0 }}
                  initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  We are here.
                </motion.h1>
              </div>
            </div>
          </div>
        </section>

        {/* Contact grid */}
        <section style={{ background: "#fff", padding: "clamp(5rem, 10vw, 10rem) 0" }}>
          <div className="container-fluid">
            <div className="grid lg:grid-cols-12 gap-12 mb-16">
              <div className="lg:col-span-4">
                <R><p className="eyebrow" style={{ marginBottom: 18 }}>Get in Touch</p></R>
                <R delay={0.08}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 4.5rem)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--black)" }}>
                    Every inquiry deserves a direct response.
                  </h2>
                </R>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 lg:pt-14">
                <R delay={0.18}>
                  <div style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)", background: "var(--limestone)", marginBottom: 24 }}>
                    <p className="eyebrow" style={{ marginBottom: 10 }}>Address</p>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 300, letterSpacing: "-0.01em", color: "var(--black)", lineHeight: 1.6 }}>
                      Al Hamra Business Tower<br />
                      Al Sharq, Block 8<br />
                      Jaber Al Mubarak Street<br />
                      Kuwait City, Kuwait
                    </p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300, color: "var(--stone)", marginTop: 10 }}>
                      P.O. Box 83 Safat · 13001 Kuwait
                    </p>
                  </div>
                  <Link to="/leasing/inquiry" className="btn-primary">Submit a Leasing Inquiry →</Link>
                </R>
              </div>
            </div>

            {/* Contact cards */}
            <div style={{ borderTop: "1px solid var(--rule-light)" }}>
              <div className="grid lg:grid-cols-2 gap-0">
                {CONTACTS.map((c, i) => (
                  <R key={c.dept} delay={i * 0.07}>
                    <div style={{
                      padding: "clamp(2rem, 4vw, 3.5rem)",
                      borderBottom: "1px solid var(--rule-light)",
                      borderLeft: i % 2 === 1 ? "1px solid var(--rule-light)" : "none",
                    }}>
                      <p className="eyebrow" style={{ marginBottom: 20 }}>{c.dept}</p>

                      {c.primary && (
                        <div style={{ marginBottom: 16 }}>
                          <a href={`tel:${c.primary.replace(/\s/g, "")}`}
                            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 300, letterSpacing: "-0.02em", color: "var(--black)", display: "block", transition: "color 0.2s" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--stone)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--black)")}>
                            {c.primary}
                          </a>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ash)", marginTop: 4 }}>{c.primaryLabel}</p>
                        </div>
                      )}

                      {c.secondary && (
                        <div style={{ marginBottom: 16 }}>
                          <a href={`tel:${c.secondary.replace(/\s/g, "")}`}
                            style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 300, color: "var(--graphite)", display: "block", transition: "color 0.2s" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--black)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--graphite)")}>
                            {c.secondary}
                          </a>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--ash)", marginTop: 2 }}>{c.secondaryLabel}</p>
                        </div>
                      )}

                      <div style={{ marginBottom: 16 }}>
                        <a href={`mailto:${c.email}`}
                          style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "var(--graphite)", display: "block", transition: "color 0.2s" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "var(--black)")}
                          onMouseLeave={e => (e.currentTarget.style.color = "var(--graphite)")}>
                          {c.email}
                        </a>
                      </div>

                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300, color: "var(--ash)", fontStyle: "italic" }}>{c.note}</p>
                    </div>
                  </R>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Map section */}
        <section style={{ background: "var(--black)", padding: "clamp(5rem, 10vw, 8rem) 0" }}>
          <div className="container-fluid">
            <div className="grid lg:grid-cols-12 items-center gap-12">
              <div className="lg:col-span-5">
                <R>
                  <p className="eyebrow-light" style={{ marginBottom: 18 }}>Find Us</p>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 4.5rem)", fontWeight: 300, letterSpacing: "-0.025em", color: "#fff", lineHeight: 1.08, marginBottom: 28 }}>
                    Al Sharq District,<br />Kuwait City.
                  </h2>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 300, color: "rgba(255,255,255,0.38)", lineHeight: 1.82, marginBottom: 32 }}>
                    Located at the intersection of Jaber Al Mubarak Street and Al Shuhada'a — 
                    the heart of Kuwait's commercial and diplomatic district, 
                    five minutes from Kuwait Towers.
                  </p>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <a href="https://maps.google.com/?q=Al+Hamra+Tower+Kuwait" target="_blank" rel="noopener noreferrer" className="btn-ghost-white">
                      Open in Google Maps →
                    </a>
                    <Link to="/location" className="btn-ghost-white">Location &amp; Access</Link>
                  </div>
                </R>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <R delay={0.12}>
                  <div style={{ aspectRatio: "16/9", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <iframe
                      title="Al Hamra Tower location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3478.0!2d47.9727!3d29.3759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9dde57aa6b47%3A0xa5a9f6c5b5f8b6a5!2sAl%20Hamra%20Tower!5e0!3m2!1sen!2skw!4v1"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(90%)" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
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
