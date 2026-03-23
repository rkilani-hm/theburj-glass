import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";

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

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 0", background: "transparent",
  border: "none", borderBottom: "1px solid var(--rule-light)",
  fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 300,
  color: "var(--black)", outline: "none", transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 400,
  letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ash)", display: "block", marginBottom: 4,
};

export default function Inquiry() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#fff", overflowX: "hidden" }}>
      <Header />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <section style={{ padding: "clamp(5rem, 10vw, 10rem) 0" }}>
          <div className="container-fluid">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

              {/* Left — header */}
              <div className="lg:col-span-4 lg:sticky" style={{ top: "calc(var(--nav-h) + 2rem)", alignSelf: "start" }}>
                <R><p className="eyebrow" style={{ marginBottom: 18 }}>Leasing · Inquiry</p></R>
                <R delay={0.08}>
                  <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 4.5rem)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--black)", marginBottom: 24 }}>
                    Tell us what you need.
                  </h1>
                </R>
                <R delay={0.15}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: "var(--graphite)", marginBottom: 32 }}>
                    Our leasing team responds within 24 hours. All inquiries are confidential.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "20px 0", borderTop: "1px solid var(--rule-light)", borderBottom: "1px solid var(--rule-light)" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ash)" }}>Direct contact</p>
                    <a href="tel:+96522270222" style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 300, letterSpacing: "-0.01em", color: "var(--black)", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--stone)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--black)")}>
                      +965 222 70 222
                    </a>
                    <a href="mailto:leasing@alhamra.com.kw" style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "var(--ash)", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--black)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--ash)")}>
                      leasing@alhamra.com.kw
                    </a>
                  </div>
                </R>
              </div>

              {/* Right — form */}
              <div className="lg:col-span-7 lg:col-start-6">
                {sent ? (
                  <R>
                    <div style={{ padding: "clamp(3rem, 6vw, 6rem)", background: "var(--limestone)", textAlign: "center" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 300, color: "var(--black)", marginBottom: 20 }}>✓</div>
                      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--black)", marginBottom: 16 }}>Inquiry received.</h2>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 300, color: "var(--graphite)", marginBottom: 32 }}>
                        Our leasing team will contact you within 24 hours.
                      </p>
                      <Link to="/leasing/opportunities" className="btn-ghost-dark">Back to Leasing →</Link>
                    </div>
                  </R>
                ) : (
                  <R delay={0.1}>
                    <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                      <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                          <label style={labelStyle}>Company Name *</label>
                          <input required style={inputStyle} placeholder="Your organisation"
                            onFocus={e => (e.target.style.borderBottomColor = "var(--black)")}
                            onBlur={e => (e.target.style.borderBottomColor = "var(--rule-light)")} />
                        </div>
                        <div>
                          <label style={labelStyle}>Contact Person *</label>
                          <input required style={inputStyle} placeholder="Full name"
                            onFocus={e => (e.target.style.borderBottomColor = "var(--black)")}
                            onBlur={e => (e.target.style.borderBottomColor = "var(--rule-light)")} />
                        </div>
                        <div>
                          <label style={labelStyle}>Email Address *</label>
                          <input required type="email" style={inputStyle} placeholder="work@company.com"
                            onFocus={e => (e.target.style.borderBottomColor = "var(--black)")}
                            onBlur={e => (e.target.style.borderBottomColor = "var(--rule-light)")} />
                        </div>
                        <div>
                          <label style={labelStyle}>Phone Number</label>
                          <input style={inputStyle} placeholder="+965 XXXX XXXX"
                            onFocus={e => (e.target.style.borderBottomColor = "var(--black)")}
                            onBlur={e => (e.target.style.borderBottomColor = "var(--rule-light)")} />
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>Space Requirements</label>
                        <div className="grid sm:grid-cols-2 gap-4" style={{ marginTop: 12 }}>
                          {["250–500 m²", "500–1,200 m²", "Full floor (1,200–2,300 m²)", "Multi-floor (3,000+ m²)"].map(opt => (
                            <label key={opt} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                              <input type="radio" name="size" value={opt}
                                style={{ accentColor: "var(--black)", width: 14, height: 14 }} />
                              <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "var(--graphite)" }}>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>Preferred Timeline</label>
                        <input style={inputStyle} placeholder="e.g. Q3 2025 or Immediately"
                          onFocus={e => (e.target.style.borderBottomColor = "var(--black)")}
                          onBlur={e => (e.target.style.borderBottomColor = "var(--rule-light)")} />
                      </div>
                      <div>
                        <label style={labelStyle}>Additional Requirements</label>
                        <textarea rows={4} style={{ ...inputStyle, resize: "none", borderBottom: "1px solid var(--rule-light)" }}
                          placeholder="Floor preferences, special requirements, questions..."
                          onFocus={e => (e.target.style.borderBottomColor = "var(--black)")}
                          onBlur={e => (e.target.style.borderBottomColor = "var(--rule-light)")} />
                      </div>
                      <div>
                        <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                          Submit Inquiry →
                        </button>
                      </div>
                    </form>
                  </R>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
