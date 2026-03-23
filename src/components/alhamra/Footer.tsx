/**
 * Footer — Light. Warm stone background. Not dark.
 */
import { Link } from "react-router-dom";
import alHamraLogo from "@/assets/al-hamra-logo.png";

const COLS = [
  { title: "The Tower", links: [
    { label: "Overview",            href: "/tower" },
    { label: "Origins",             href: "/tower/origins" },
    { label: "Rising",              href: "/tower/rising" },
    { label: "Design & Engineering",href: "/tower/design" },
    { label: "Sustainability",      href: "/tower/sustainability" },
    { label: "Awards",              href: "/tower/recognition" },
  ]},
  { title: "Business", links: [
    { label: "Workplace Experience",    href: "/business/workplace-experience" },
    { label: "Office Spaces",           href: "/business/office-spaces" },
    { label: "Vertical Transportation", href: "/business/vertical-transportation" },
    { label: "Connectivity",            href: "/business/connectivity" },
  ]},
  { title: "Experience", links: [
    { label: "Services & Facilities", href: "/services" },
    { label: "Location & Access",     href: "/location" },
  ]},
  { title: "Leasing", links: [
    { label: "Opportunities", href: "/leasing/opportunities" },
    { label: "Inquiry",       href: "/leasing/inquiry" },
    { label: "Downloads",     href: "/leasing/downloads" },
    { label: "Contact",       href: "/leasing/contact" },
  ]},
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="container-fluid" style={{ paddingTop: "clamp(4rem, 8vw, 8rem)", paddingBottom: "clamp(3rem, 6vw, 6rem)" }}>
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <img src={alHamraLogo} alt="Al Hamra Tower"
              style={{ height: 34, width: "auto", objectFit: "contain", marginBottom: 24 }} />
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 300,
              fontStyle: "italic", color: "var(--ink-light)", lineHeight: 1.5, marginBottom: 32, maxWidth: 280 }}>
              Kuwait's vertical city — the tallest building in the Gulf.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Corporate",     val: "(+965) 182 9000" },
                { label: "Leasing",       val: "(+965) 222 70 222" },
                { label: "24/7 Helpdesk", val: "(+965) 222 33 043" },
                { label: "Email",         val: "leasing@alhamra.com.kw" },
              ].map(c => (
                <div key={c.label}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-faint)", display: "block", marginBottom: 2 }}>{c.label}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, color: "var(--ink-mid)" }}>{c.val}</span>
                </div>
              ))}
              <div style={{ marginTop: 4 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-faint)", display: "block", marginBottom: 2 }}>Address</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, lineHeight: 1.65, color: "var(--ink-light)" }}>
                  Al Sharq, Block 8<br />Jaber Al Mubarak St., Kuwait City
                </span>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {COLS.map(col => (
              <div key={col.title}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 18 }}>
                  {col.title}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {col.links.map(l => (
                    <Link key={l.href} to={l.href}
                      style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "var(--ink-light)", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-light)")}
                    >{l.label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container-fluid" style={{ paddingTop: 18, paddingBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300, color: "var(--ink-faint)", letterSpacing: "0.05em" }}>
              © {new Date().getFullYear()} Al Hamra Real Estate Company K.S.C. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy Policy", "Terms of Use", "Sitemap"].map(l => (
                <Link key={l} to="/"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 300, color: "var(--ink-faint)", letterSpacing: "0.05em", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--ink-light)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-faint)")}
                >{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
