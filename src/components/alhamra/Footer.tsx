import { Link } from "react-router-dom";
import alHamraLogo from "@/assets/al-hamra-logo.png";
import EditableText from "@/components/admin/EditableText";

const COLS = [
  { title: "The Tower",   links: [
    { label: "Overview",            href: "/tower" },
    { label: "Origins",             href: "/tower/origins" },
    { label: "Rising",              href: "/tower/rising" },
    { label: "Design & Engineering",href: "/tower/design" },
    { label: "Sustainability",      href: "/tower/sustainability" },
    { label: "Awards",              href: "/tower/recognition" },
  ]},
  { title: "Business",    links: [
    { label: "Workplace Experience",    href: "/business/workplace-experience" },
    { label: "Office Spaces",           href: "/business/office-spaces" },
    { label: "Vertical Transportation", href: "/business/vertical-transportation" },
    { label: "Connectivity",            href: "/business/connectivity" },
  ]},
  { title: "Experience",  links: [
    { label: "Services & Facilities", href: "/services" },
    { label: "Location & Access",     href: "/location" },
  ]},
  { title: "Leasing",     links: [
    { label: "Opportunities", href: "/leasing/opportunities" },
    { label: "Inquiry",       href: "/leasing/inquiry" },
    { label: "Downloads",     href: "/leasing/downloads" },
    { label: "Contact",       href: "/leasing/contact" },
  ]},
];

const CONTACTS = [
  { labelKey: "footer.phone1.label", valKey: "footer.phone1.value" },
  { labelKey: "footer.phone2.label", valKey: "footer.phone2.value" },
  { labelKey: "footer.phone3.label", valKey: "footer.phone3.value" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0F0F0E", borderTop: "none" }}>
      <div className="container-fluid" style={{ paddingTop: "clamp(4rem,8vw,8rem)", paddingBottom: "clamp(3rem,6vw,6rem)" }}>
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <img src={alHamraLogo} alt="Al Hamra Tower"
              style={{ height: 34, width: "auto", objectFit: "contain", marginBottom: 24, filter: "brightness(0) invert(1) opacity(0.85)" }} />
            <EditableText cms="footer.tagline" tag="p" style={{
              fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 300,
              fontStyle: "italic", color: "rgba(255,255,255,0.32)", lineHeight: 1.5, marginBottom: 32, maxWidth: 280,
            }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CONTACTS.map(c => (
                <div key={c.valKey}>
                  <EditableText cms={c.labelKey} tag="span" oneLine style={{
                    fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.15em",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.18)", display: "block", marginBottom: 2,
                  }} />
                  <EditableText cms={c.valKey} tag="span" oneLine style={{
                    fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.48)",
                  }} />
                </div>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {COLS.map(col => (
              <div key={col.title}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 18 }}>
                  {col.title}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {col.links.map(l => (
                    <Link key={l.href} to={l.href}
                      style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.38)", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
                    >{l.label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container-fluid" style={{ paddingTop: 18, paddingBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
            <EditableText cms="footer.copyright" tag="p" oneLine style={{
              fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300,
              color: "rgba(255,255,255,0.18)", letterSpacing: "0.05em",
            }} />
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy Policy","Terms of Use","Sitemap"].map(l => (
                <Link key={l} to="/"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 300, color: "rgba(255,255,255,0.18)", letterSpacing: "0.05em", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.40)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.18)")}
                >{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
