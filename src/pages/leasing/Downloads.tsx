import { useRef } from "react";
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

const DOCS = [
  { cat: "Overview",       title: "Building Overview Brochure",     desc: "Architecture, amenities, and specifications summary.",    pages: "12 pages", format: "PDF" },
  { cat: "Overview",       title: "Amenities & Facilities Guide",    desc: "Sky Lounge, Health Club, Parking, and all tenant services.", pages: "8 pages",  format: "PDF" },
  { cat: "Floor Plans",    title: "Typical Floor Layout",           desc: "Standard office floor — column-free 2,300 m² plate.",     pages: "2 pages",  format: "PDF" },
  { cat: "Floor Plans",    title: "Executive Suites Plan",          desc: "250–500 m² corner configurations.",                       pages: "2 pages",  format: "PDF" },
  { cat: "Floor Plans",    title: "Executive Floors 74 & 75",       desc: "Summit level layouts at 327–338m.",                       pages: "4 pages",  format: "PDF" },
  { cat: "Technical",      title: "MEP Specifications",             desc: "Mechanical, electrical, and plumbing technical data.",     pages: "20 pages", format: "PDF" },
  { cat: "Technical",      title: "Connectivity & IT Infrastructure", desc: "Fibre, power, substations, and smart building specs.",   pages: "10 pages", format: "PDF" },
  { cat: "Technical",      title: "Fit-Out Design Guide",           desc: "Standards and requirements for tenant fit-outs.",          pages: "24 pages", format: "PDF" },
];

export default function Downloads() {
  const categories = [...new Set(DOCS.map(d => d.cat))];

  return (
    <div style={{ minHeight: "100vh", background: "#fff", overflowX: "hidden" }}>
      <Header />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <section style={{ padding: "clamp(5rem, 10vw, 10rem) 0" }}>
          <div className="container-fluid">

            {/* Header */}
            <div className="grid lg:grid-cols-12 gap-12 mb-16">
              <div className="lg:col-span-5">
                <R><p className="eyebrow" style={{ marginBottom: 18 }}>Leasing · Downloads</p></R>
                <R delay={0.08}>
                  <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 4.5rem)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--black)" }}>
                    Technical documents &amp; floor plans.
                  </h1>
                </R>
              </div>
              <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
                <R delay={0.15}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: "var(--graphite)", marginBottom: 28 }}>
                    All documents below are available to registered leasing inquiries. 
                    Submit an inquiry to receive access credentials and a personalised 
                    document pack from our leasing team.
                  </p>
                  <Link to="/leasing/inquiry" className="btn-primary">Request Full Document Access</Link>
                </R>
              </div>
            </div>

            {/* Document list by category */}
            {categories.map((cat, ci) => (
              <div key={cat} style={{ marginBottom: "clamp(3rem, 5vw, 4rem)" }}>
                <R delay={ci * 0.04}>
                  <p className="eyebrow" style={{ marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid var(--rule-light)" }}>{cat}</p>
                </R>
                {DOCS.filter(d => d.cat === cat).map((doc, i) => (
                  <R key={doc.title} delay={0.04 + i * 0.04}>
                    <div className="grid lg:grid-cols-12 gap-6 items-center"
                      style={{ padding: "clamp(1.2rem, 2.5vw, 2rem) 0", borderBottom: "1px solid var(--rule-light)" }}>
                      <div className="lg:col-span-5">
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--black)", marginBottom: 6 }}>{doc.title}</h3>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "var(--stone)" }}>{doc.desc}</p>
                      </div>
                      <div className="lg:col-span-2">
                        <span className="eyebrow">{doc.pages}</span>
                      </div>
                      <div className="lg:col-span-2">
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ash)", padding: "5px 10px", border: "1px solid var(--rule-light)" }}>{doc.format}</span>
                      </div>
                      <div className="lg:col-span-3" style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Link to="/leasing/inquiry"
                          style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ash)", transition: "color 0.2s" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "var(--black)")}
                          onMouseLeave={e => (e.currentTarget.style.color = "var(--ash)")}>
                          Request →
                        </Link>
                      </div>
                    </div>
                  </R>
                ))}
              </div>
            ))}

            <R delay={0.1}>
              <div style={{ marginTop: "clamp(3rem, 5vw, 4rem)", padding: "clamp(2rem, 4vw, 4rem)", background: "var(--limestone)", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--black)", marginBottom: 8 }}>Need a custom pack?</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 300, color: "var(--graphite)" }}>
                    Our leasing team can prepare a tailored document package for your specific requirements.
                  </p>
                </div>
                <Link to="/leasing/contact" className="btn-ghost-dark">Contact Leasing →</Link>
              </div>
            </R>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
