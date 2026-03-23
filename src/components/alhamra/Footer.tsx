import { Link } from "react-router-dom";
import alHamraLogo from "@/assets/al-hamra-logo.png";

const COLS = [
  {
    title: "The Tower",
    links: [
      { label: "Overview",        href: "/tower" },
      { label: "Origins",         href: "/tower/origins" },
      { label: "Rising",          href: "/tower/rising" },
      { label: "Design & Engineering", href: "/tower/design" },
      { label: "Sustainability",  href: "/tower/sustainability" },
      { label: "Awards",          href: "/tower/recognition" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "Workplace Experience", href: "/business/workplace-experience" },
      { label: "Office Spaces",   href: "/business/office-spaces" },
      { label: "Vertical Transport", href: "/business/vertical-transportation" },
      { label: "Connectivity",    href: "/business/connectivity" },
    ],
  },
  {
    title: "Experience",
    links: [
      { label: "Services & Facilities", href: "/services" },
      { label: "Location & Access", href: "/location" },
    ],
  },
  {
    title: "Leasing",
    links: [
      { label: "Opportunities",  href: "/leasing/opportunities" },
      { label: "Inquiry",        href: "/leasing/inquiry" },
      { label: "Downloads",      href: "/leasing/downloads" },
      { label: "Contact",        href: "/leasing/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.05)" }}>

      {/* Main content */}
      <div className="container-fluid" style={{ paddingTop: "clamp(4rem, 8vw, 8rem)", paddingBottom: "clamp(3rem, 6vw, 6rem)" }}>
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <img
              src={alHamraLogo}
              alt="Al Hamra Tower"
              style={{ height: 38, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", marginBottom: 28 }}
            />
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.2rem",
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.5,
              marginBottom: 36,
              maxWidth: 280,
            }}>
              Kuwait's vertical city — the tallest building in the Gulf.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Corporate",       val: "(+965) 182 9000" },
                { label: "Leasing",         val: "(+965) 222 70 222" },
                { label: "24/7 Helpdesk",   val: "(+965) 222 33 043" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>
                    {c.label}
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.50)" }}>
                    {c.val}
                  </span>
                </div>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 4 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>
                  Address
                </span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
                  Al Sharq, Block 8<br />
                  Jaber Al Mubarak St.<br />
                  Kuwait City, Kuwait
                </span>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {COLS.map(col => (
              <div key={col.title}>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "9px",
                  fontWeight: 400,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.22)",
                  marginBottom: 20,
                }}>
                  {col.title}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.links.map(l => (
                    <Link
                      key={l.href}
                      to={l.href}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "12px",
                        fontWeight: 300,
                        color: "rgba(255,255,255,0.38)",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.80)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container-fluid" style={{ paddingTop: 20, paddingBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em" }}>
              © {new Date().getFullYear()} Al Hamra Real Estate Company K.S.C. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {["Privacy Policy", "Terms of Use", "Sitemap"].map(l => (
                <Link
                  key={l}
                  to="/"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 300, color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
