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
  { label: { en: "Overview",       ar: "نظرة عامة" }, href: "/tower"                  },
  { label: { en: "Rising",         ar: "الصعود"    }, href: "/tower/rising"           },
  { label: { en: "Design",         ar: "التصميم"   }, href: "/tower/design"           },
  { label: { en: "Sustainability",  ar: "الاستدامة" }, href: "/tower/sustainability"  },
  { label: { en: "Office Spaces",  ar: "المكاتب"   }, href: "/business/office-spaces" },
  { label: { en: "Inquiry",        ar: "استفسار"   }, href: "/leasing/inquiry"        },
  { label: { en: "Downloads",      ar: "التنزيلات" }, href: "/leasing/downloads"      },
  { label: { en: "Services",       ar: "الخدمات"   }, href: "/services"               },
];

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
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
    return match ? match.label[language] : (language === "en" ? "Home" : "الرئيسية");
  })();

  return (
    /*
     * Outer: fixed to bottom, full-width centering wrapper.
     * pointer-events:none so the padding areas are click-through.
     */
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        padding: "0 clamp(1rem, 4vw, 2rem) clamp(0.75rem, 2vw, 1rem)",
        pointerEvents: "none",
      }}
    >
      {/*
       * Inner: this is the SINGLE positioned ancestor for both the pill
       * AND the popup card.  It is exactly as wide as the pill (maxWidth 640).
       * position:relative here so popup's position:absolute is relative to IT.
       */}
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 640,
          pointerEvents: "auto",   /* re-enable clicks for the whole widget */
        }}
      >
        {/* ══════════════════════════════════════════════════
            POPUP CARD — positioned above the pill
            bottom: 100% puts its bottom flush with pill top,
            then we add a 6px gap with marginBottom on the card.
            ══════════════════════════════════════════════════ */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{   opacity: 0, y: 10,  scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                bottom: "calc(100% + 6px)",  /* 6px gap above the pill */
                left: 0,
                right: 0,
                background: "#FFFFFF",
                border: "1px solid #E8E8E8",
                borderRadius: 20,
                boxShadow: "0 16px 64px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                overflow: "hidden",
                zIndex: 10,
              }}
            >
              {/* Two-column content */}
              <div
                style={{
                  padding: "24px 24px 20px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                }}
              >
                {/* Left: primary serif nav */}
                <nav style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {PRIMARY_NAV.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 0",
                          borderBottom: "1px solid #F2F2F2",
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.15rem",
                          fontWeight: 400,
                          letterSpacing: "-0.015em",
                          color: isActive(item.href) ? "#1A1A1A" : "#AAAAAA",
                          transition: "color 0.18s",
                          textDecoration: "none",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#1A1A1A")}
                        onMouseLeave={e => (e.currentTarget.style.color = isActive(item.href) ? "#1A1A1A" : "#AAAAAA")}
                      >
                        <span>{item.label[language]}</span>
                        {isActive(item.href) && (
                          <span style={{ fontSize: "10px", color: "#BBBBBB" }}>→</span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Right: secondary links + contact */}
                <motion.div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12, duration: 0.35 }}
                >
                  {/* Quick links */}
                  <div>
                    <p style={{
                      fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.2em",
                      textTransform: "uppercase", color: "#BBBBBB", marginBottom: 8,
                    }}>
                      Quick links
                    </p>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {SECONDARY_NAV.map(item => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setOpen(false)}
                          style={{
                            fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300,
                            letterSpacing: "0.03em", color: "#AAAAAA", padding: "4px 0",
                            borderBottom: "1px solid #F5F5F5",
                            transition: "color 0.15s", textDecoration: "none",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#1A1A1A")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#AAAAAA")}
                        >
                          {item.label[language]}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div>
                    <p style={{
                      fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.2em",
                      textTransform: "uppercase", color: "#BBBBBB", marginBottom: 8,
                    }}>
                      Contact
                    </p>
                    <a href="tel:+96522275000"
                      style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "11px",
                        fontWeight: 300, color: "#AAAAAA", marginBottom: 3,
                        transition: "color 0.15s", textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#1A1A1A")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#AAAAAA")}
                    >
                      +965 2227 5000
                    </a>
                    <a href="mailto:leasing@alhamratower.com"
                      style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "10px",
                        fontWeight: 300, color: "#BBBBBB",
                        transition: "color 0.15s", textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#1A1A1A")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#BBBBBB")}
                    >
                      leasing@alhamratower.com
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Bottom CTA strip */}
              <div style={{
                borderTop: "1px solid #F0F0F0",
                padding: "12px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#FAFAF8",
              }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#BBBBBB", letterSpacing: "0.06em" }}>
                  Sharq District, Kuwait City
                </p>
                <Link
                  to="/leasing/opportunities"
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#1A1A1A", textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 5,
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.55")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  Get in touch →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════
            FLOATING PILL
            ══════════════════════════════════════════════════ */}
        <div
          style={{
            width: "100%",
            height: 52,
            background: "#FFFFFF",
            border: "1px solid #E8E8E8",
            borderRadius: 9999,
            boxShadow: open
              ? "0 4px 20px rgba(0,0,0,0.10)"
              : "0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
            transition: "box-shadow 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 clamp(1rem, 2vw, 1.5rem)",
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
              whileHover={{ opacity: 0.6 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* Center links — desktop only */}
          <nav className="hidden lg:flex" style={{ alignItems: "center", gap: 24 }}>
            {PRIMARY_NAV.slice(0, 4).map(item => (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400,
                  letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
                  color: isActive(item.href) ? "#1A1A1A" : "#767676",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1A1A1A")}
                onMouseLeave={e => (e.currentTarget.style.color = isActive(item.href) ? "#1A1A1A" : "#767676")}
              >
                {item.label[language]}
              </Link>
            ))}
          </nav>

          {/* Language + page toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={toggleLanguage}
              style={{
                fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#767676", cursor: "pointer", background: "none", border: "none", padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1A1A1A")}
              onMouseLeave={e => (e.currentTarget.style.color = "#767676")}
            >
              {language === "en" ? "عربي" : "EN"}
            </button>

            <button
              onClick={() => setOpen(v => !v)}
              style={{
                fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: open ? "#AAAAAA" : "#1A1A1A",
                cursor: "pointer", background: "none", border: "none", padding: 0,
                transition: "color 0.2s",
                minWidth: 48,
                textAlign: "right",
              }}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.span key="close"
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.14 }}
                    style={{ display: "block" }}
                  >
                    Close
                  </motion.span>
                ) : (
                  <motion.span key="page"
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.14 }}
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
    </div>
  );
}
