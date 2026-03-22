import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import kuwaitNight from "@/assets/kuwait-skyline-water-night.jpg";

const Footer = () => {
  const { language } = useLanguage();

  const links = [
    [
      { label: { en: "The Tower",   ar: "البرج" },   href: "/tower" },
      { label: { en: "Rising",      ar: "الصعود" },   href: "/tower/rising" },
      { label: { en: "Design",      ar: "التصميم" },  href: "/tower/design" },
      { label: { en: "Awards",      ar: "الجوائز" },  href: "/tower/recognition" },
    ],
    [
      { label: { en: "Business",    ar: "الأعمال" },  href: "/business/workplace-experience" },
      { label: { en: "Office Spaces",ar:"المكاتب" },  href: "/business/office-spaces" },
      { label: { en: "Connectivity",ar:"الاتصال" },   href: "/business/connectivity" },
    ],
    [
      { label: { en: "Leasing",     ar: "التأجير" },  href: "/leasing/opportunities" },
      { label: { en: "Inquiry",     ar: "استفسار" },  href: "/leasing/inquiry" },
      { label: { en: "Downloads",   ar: "التنزيلات"}, href: "/leasing/downloads" },
      { label: { en: "Location",    ar: "الموقع" },   href: "/location" },
    ],
    [
      { label: { en: "Contact",     ar: "التواصل" },  href: "/leasing/contact" },
      { label: { en: "Sustainability",ar:"الاستدامة"},href: "/tower/sustainability" },
    ],
  ];

  return (
    <footer>
      {/* ── Full-bleed footer image — exactly like fluid.glass ── */}
      <div className="relative overflow-hidden" style={{ height: "clamp(300px, 50vw, 640px)" }}>
        <motion.img src={kuwaitNight} alt="Kuwait skyline"
          className="img-cover animate-ken-burns"
          style={{ objectPosition: "center 40%" }} />
        {/* Overlay with large headline — fluid.glass CTA style */}
        <div className="absolute inset-0 flex flex-col items-start justify-end pb-16 lg:pb-24"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }}>
          <div className="container-fluid w-full flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <h2 className="font-serif font-light text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: 1.0, letterSpacing: "-0.025em", maxWidth: "600px" }}>
              Where vision meets<br />the skyline
            </h2>
            <div className="flex flex-col gap-4">
              <Link to="/leasing/opportunities"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px",
                  background: "#fff", color: "#111", fontSize: "12px", fontWeight: 400,
                  letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.25s ease" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#e8e8e8")}
                onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
              >
                Get in touch →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer nav section ── */}
      <div className="bg-foreground text-white">
        <div className="container-fluid py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">

            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <p className="font-serif font-light mb-2" style={{ fontSize: "1.3rem", letterSpacing: "0.04em" }}>Al Hamra</p>
              <p className="label mb-6" style={{ color: "#666", letterSpacing: "0.2em" }}>Kuwait City</p>
              <div className="flex flex-col gap-2">
                <a href="tel:+96522275000" className="label transition-colors" style={{ color: "#888", letterSpacing: "0.08em" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "#888")}>
                  +965 2227 5000
                </a>
                <a href="mailto:leasing@alhamratower.com" className="label transition-colors" style={{ color: "#888", letterSpacing: "0.08em" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "#888")}>
                  leasing@alhamratower.com
                </a>
              </div>
            </div>

            {/* Nav columns */}
            {links.map((col, ci) => (
              <div key={ci}>
                <nav className="flex flex-col gap-3">
                  {col.map(link => (
                    <Link key={link.href} to={link.href} className="label transition-colors"
                      style={{ color: "#666", letterSpacing: "0.1em", fontSize: "11px" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#666")}
                    >
                      {link.label[language]}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          <div className="hairline mb-8" style={{ background: "#222" }} />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="label" style={{ color: "#444", fontSize: "10px" }}>
              © 2026 Al Hamra Real Estate Company. All rights reserved.
            </p>
            <div className="flex gap-6">
              {[{ label: "Instagram", href: "#" }, { label: "LinkedIn", href: "#" }, { label: "YouTube", href: "#" }].map(s => (
                <a key={s.label} href={s.href} className="label transition-colors"
                  style={{ color: "#444", fontSize: "10px", letterSpacing: "0.1em" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#444")}
                >{s.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
