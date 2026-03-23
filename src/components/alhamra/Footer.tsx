import { Link } from "react-router-dom";
import alHamraLogo from "@/assets/al-hamra-logo.png";
import kuwaitSkyline from "@/assets/kuwait-skyline-water-night.jpg";

const NAV = [
  { title: "The Tower", links: [
    { label: "Overview",            href: "/tower" },
    { label: "Origins",             href: "/tower/origins" },
    { label: "Rising",              href: "/tower/rising" },
    { label: "Design & Engineering",href: "/tower/design" },
    { label: "Sustainability",      href: "/tower/sustainability" },
    { label: "Awards",              href: "/tower/recognition" },
  ]},
  { title: "Business", links: [
    { label: "Workplace Experience",href: "/business/workplace-experience" },
    { label: "Office Spaces",       href: "/business/office-spaces" },
    { label: "Vertical Transport",  href: "/business/vertical-transportation" },
    { label: "Connectivity",        href: "/business/connectivity" },
  ]},
  { title: "Leasing", links: [
    { label: "Opportunities",       href: "/leasing/opportunities" },
    { label: "Inquiry",             href: "/leasing/inquiry" },
    { label: "Downloads",           href: "/leasing/downloads" },
    { label: "Contact",             href: "/leasing/contact" },
  ]},
  { title: "Experience", links: [
    { label: "Services",            href: "/services" },
    { label: "Location & Access",   href: "/location" },
  ]},
];

export default function Footer() {
  return (
    <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(250,250,248,0.06)" }}>
      {/* Full-bleed image with address overlay */}
      <div style={{ position: "relative", height: "clamp(300px, 40vw, 500px)", overflow: "hidden" }}>
        <img src={kuwaitSkyline} alt="Kuwait City skyline at night"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.85) 100%)" }} />
        <div style={{ position: "absolute", bottom: "clamp(2rem, 5vw, 5rem)", left: 0, right: 0 }}>
          <div className="container-fluid">
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 5rem)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 0.95, color: "rgba(250,250,248,0.9)" }}>
              Al Hamra<br /><span style={{ fontStyle: "italic", fontWeight: 300 }}>Business Tower</span>
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,250,248,0.35)", marginTop: 20 }}>
              Al Sharq, Kuwait City · 412 Metres · Est. 2011
            </p>
          </div>
        </div>
      </div>

      {/* Nav + contact */}
      <div className="container-fluid" style={{ padding: "clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 5rem)" }}>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Logo + tagline */}
          <div className="lg:col-span-3">
            <img src={alHamraLogo} alt="Al Hamra Tower" style={{ height: 36, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.85, marginBottom: 24 }} />
            <p style={{ fontSize: "0.88rem", lineHeight: 1.75, fontWeight: 300, color: "rgba(250,250,248,0.35)", maxWidth: 220 }}>
              Kuwait's tallest building and the world's tallest sculpted concrete structure.
            </p>
          </div>

          {/* Nav cols */}
          {NAV.map(col => (
            <div key={col.title} className="lg:col-span-2">
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,250,248,0.25)", marginBottom: 20 }}>
                {col.title}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <li key={l.href}>
                    <Link to={l.href}
                      style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, letterSpacing: "0.04em", color: "rgba(250,250,248,0.45)", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "rgba(250,250,248,0.9)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(250,250,248,0.45)")}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(250,250,248,0.06)", paddingTop: "2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <p style={{ fontSize: "11px", fontWeight: 300, color: "rgba(250,250,248,0.22)", letterSpacing: "0.06em" }}>
            © {new Date().getFullYear()} Al Hamra Real Estate Company. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {[["Leasing Inquiry", "/leasing/inquiry"], ["Contact", "/leasing/contact"], ["Downloads", "/leasing/downloads"]].map(([label, href]) => (
              <Link key={href} to={href}
                style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,250,248,0.22)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(250,250,248,0.7)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(250,250,248,0.22)")}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
