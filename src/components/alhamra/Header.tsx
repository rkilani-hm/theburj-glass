import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import alHamraLogo from "@/assets/al-hamra-logo.png";

const PRIMARY_NAV = [
  { label: { en: "The Tower",  ar: "البرج"  },  href: "/tower"                         },
  { label: { en: "Business",   ar: "الأعمال" },  href: "/business/workplace-experience"  },
  { label: { en: "Leasing",    ar: "التأجير" },  href: "/leasing/opportunities"          },
  { label: { en: "Location",   ar: "الموقع"  },  href: "/location"                       },
  { label: { en: "Contact",    ar: "التواصل" },  href: "/leasing/contact"                },
];

const SECONDARY_NAV = [
  { label: { en: "Overview",      ar: "نظرة عامة" }, href: "/tower"                   },
  { label: { en: "Rising",        ar: "الصعود"     }, href: "/tower/rising"            },
  { label: { en: "Design",        ar: "التصميم"    }, href: "/tower/design"            },
  { label: { en: "Sustainability", ar: "الاستدامة" }, href: "/tower/sustainability"    },
  { label: { en: "Office Spaces", ar: "المكاتب"    }, href: "/business/office-spaces"  },
  { label: { en: "Inquiry",       ar: "استفسار"    }, href: "/leasing/inquiry"         },
  { label: { en: "Downloads",     ar: "التنزيلات"  }, href: "/leasing/downloads"       },
  { label: { en: "Services",      ar: "الخدمات"    }, href: "/services"                },
];

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  const currentPage = (() => {
    const all = [...PRIMARY_NAV, ...SECONDARY_NAV];
    const sorted = all.slice().sort((a, b) => b.href.length - a.href.length);
    const match = sorted.find(n => isActive(n.href));
    if (match) return match.label[language];
    return language === "en" ? "Home" : "الرئيسية";
  })();

  const navColor = (active: boolean) =>
    active ? "#1A1A1A" : "#767676";

  return (
    <div
      ref={menuRef}
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "0 clamp(1rem, 4vw, 2rem) clamp(0.75rem, 2vw, 1rem)",
        pointerEvents: "none",
      }}
    >
      {/* ══════════════════════════════════════════════════════
          POPUP MENU PANEL — floats directly above the pill
          Same width as the pill, anchored to it
          ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 12,  scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              bottom: "calc(100% - 0.4rem)",   /* sits just above pill */
              left: "clamp(1rem, 4vw, 2rem)",
              right: "clamp(1rem, 4vw, 2rem)",
              maxWidth: 640,
              margin: "0 auto",
              background: "#FFFFFF",
              border: "1px solid #E8E8E8",
              borderRadius: 20,
              boxShadow: "0 16px 64px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              overflow: "hidden",
              pointerEvents: "auto",
            }}
          >
            {/* Inner content grid */}
            <div style={{ padding: "28px 28px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

              {/* Left col: primary nav */}
              <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {PRIMARY_NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "9px 0",
                        borderBottom: "1px solid #F0F0F0",
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
                        fontWeight: 400,
                        letterSpacing: "-0.015em",
                        color: isActive(item.href) ? "#1A1A1A" : "#888",
                        transition: "color 0.2s",
                        textDecoration: "none",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#1A1A1A")}
                      onMouseLeave={e => (e.currentTarget.style.color = isActive(item.href) ? "#1A1A1A" : "#888")}
                    >
                      <span>{item.label[language]}</span>
                      {isActive(item.href) && (
                        <span style={{ fontSize: "10px", color: "#767676" }}>→</span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Right col: secondary links + contact */}
              <motion.div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                <div>
                  <p style={{
                    fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "#AAAAAA", marginBottom: 10,
                  }}>
                    Quick links
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {SECONDARY_NAV.map(item => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setOpen(false)}
                        style={{
                          fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300,
                          letterSpacing: "0.04em", color: "#999", padding: "5px 0",
                          transition: "color 0.18s", textDecoration: "none",
                          borderBottom: "1px solid #F5F5F5",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#1A1A1A")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#999")}
                      >
                        {item.label[language]}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div style={{ paddingTop: 4 }}>
                  <p style={{
                    fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "#AAAAAA", marginBottom: 8,
                  }}>
                    Contact
                  </p>
                  <a href="tel:+96522275000"
                    style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "11px",
                      fontWeight: 300, color: "#999", marginBottom: 4, transition: "color 0.18s", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#1A1A1A")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#999")}
                  >
                    +965 2227 5000
                  </a>
                  <a href="mailto:leasing@alhamratower.com"
                    style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "10px",
                      fontWeight: 300, color: "#AAAAAA", transition: "color 0.18s", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#1A1A1A")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#AAAAAA")}
                  >
                    leasing@alhamratower.com
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Bottom CTA bar */}
            <div style={{
              borderTop: "1px solid #F0F0F0",
              padding: "14px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#FAFAF8",
            }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#AAAAAA", letterSpacing: "0.08em" }}>
                Sharq District, Kuwait City
              </p>
              <Link
                to="/leasing/opportunities"
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400,
                  letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A1A1A",
                  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.6")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                Get in touch →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          FLOATING PILL
          ══════════════════════════════════════════════════════ */}
      <div
        style={{
          width: "100%",
          maxWidth: 640,
          height: 52,
          background: "#FFFFFF",
          border: "1px solid #E8E8E8",
          borderRadius: 9999,
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: open
            ? "0 4px 24px rgba(0,0,0,0.12)"
            : "0 4px 24px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(1rem, 2vw, 1.5rem)",
          pointerEvents: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <Link to="/" onClick={() => setOpen(false)} style={{ flexShrink: 0 }}>
          <motion.img
            src={alHamraLogo}
            alt="Al Hamra Tower"
            style={{ height: 28, width: "auto", objectFit: "contain" }}
            whileHover={{ opacity: 0.65 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        {/* Center quick links (desktop) */}
        <nav className="hidden lg:flex" style={{ gap: 24, alignItems: "center" }}>
          {PRIMARY_NAV.slice(0, 4).map(item => (
            <Link
              key={item.href}
              to={item.href}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: navColor(isActive(item.href)),
                transition: "color 0.22s ease",
                textDecoration: "none",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1A1A1A")}
              onMouseLeave={e => (e.currentTarget.style.color = navColor(isActive(item.href)))}
            >
              {item.label[language]}
            </Link>
          ))}
        </nav>

        {/* Right: lang + current page toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={toggleLanguage}
            style={{
              fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#767676", cursor: "pointer", background: "none", border: "none", padding: 0,
              transition: "color 0.22s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#1A1A1A")}
            onMouseLeave={e => (e.currentTarget.style.color = "#767676")}
          >
            {language === "en" ? "عربي" : "EN"}
          </button>

          {/* Current page / Close toggle */}
          <button
            onClick={() => setOpen(v => !v)}
            style={{
              fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: open ? "#767676" : "#1A1A1A",
              cursor: "pointer", background: "none", border: "none", padding: 0,
              transition: "color 0.22s",
              minWidth: 52,
              textAlign: "right",
            }}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span key="close"
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: "block" }}
                >
                  Close
                </motion.span>
              ) : (
                <motion.span key="page"
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: "block" }}
                >
                  {currentPage}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
}
