import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import alHamraLogo from "@/assets/al-hamra-logo.png";

/* ── Nav structure: each main item has optional sub-items ── */
const NAV = [
  {
    label: { en: "The Tower", ar: "البرج" },
    href: "/tower",
    sub: [
      { label: { en: "Overview",      ar: "نظرة عامة" }, href: "/tower"                   },
      { label: { en: "Rising",        ar: "الصعود"    }, href: "/tower/rising"            },
      { label: { en: "Design",        ar: "التصميم"   }, href: "/tower/design"            },
      { label: { en: "Sustainability", ar: "الاستدامة"}, href: "/tower/sustainability"    },
      { label: { en: "Recognition",   ar: "الجوائز"   }, href: "/tower/recognition"       },
    ],
  },
  {
    label: { en: "Business", ar: "الأعمال" },
    href: "/business/workplace-experience",
    sub: [
      { label: { en: "Workplace",         ar: "تجربة مكان العمل" }, href: "/business/workplace-experience"    },
      { label: { en: "Office Spaces",     ar: "المكاتب"           }, href: "/business/office-spaces"          },
      { label: { en: "Vertical Transport",ar: "النقل العمودي"    }, href: "/business/vertical-transportation" },
      { label: { en: "Connectivity",      ar: "الاتصال"           }, href: "/business/connectivity"           },
    ],
  },
  {
    label: { en: "Leasing", ar: "التأجير" },
    href: "/leasing/opportunities",
    sub: [
      { label: { en: "Opportunities", ar: "فرص التأجير" }, href: "/leasing/opportunities" },
      { label: { en: "Inquiry",       ar: "استفسار"     }, href: "/leasing/inquiry"       },
      { label: { en: "Downloads",     ar: "التنزيلات"   }, href: "/leasing/downloads"     },
      { label: { en: "Contact",       ar: "التواصل"     }, href: "/leasing/contact"       },
    ],
  },
  {
    label: { en: "Location", ar: "الموقع" },
    href: "/location",
    sub: [
      { label: { en: "Location & Access", ar: "الموقع والوصول" }, href: "/location" },
      { label: { en: "Services",          ar: "الخدمات"        }, href: "/services" },
    ],
  },
  {
    label: { en: "Contact", ar: "التواصل" },
    href: "/leasing/contact",
    sub: [],
  },
];

const PILL_H   = 48;
const PILL_BOT = 14;
const GAP      =  6;

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [open, setOpen]         = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);   /* which main item is selected */
  const location = useLocation();
  const pillRef  = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => {
      const handler = (e: MouseEvent) => {
        if (pillRef.current && !pillRef.current.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, 10);
    return () => clearTimeout(id);
  }, [open]);

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  const currentPage = (() => {
    const all = NAV.flatMap(n => [n, ...n.sub]);
    const sorted = all.slice().sort((a, b) => b.href.length - a.href.length);
    const match  = sorted.find(n => isActive(n.href));
    return match ? match.label[language] : (language === "en" ? "Menu" : "القائمة");
  })();

  const activeItem = NAV[activeIdx];

  return (
    <>
      {/* ════════════════════════════════════════════════════
          POPUP — position:fixed, two-panel: main + sub
          ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 10,  scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              bottom: PILL_H + PILL_BOT + GAP,
              left: "50%",
              transform: "translateX(-50%)",
              width: "calc(100vw - clamp(2rem, 8vw, 4rem))",
              maxWidth: 480,
              zIndex: 9999,
              display: "flex",
              gap: 8,
            }}
          >
            {/* ── Main menu card ── */}
            <div style={{
              flex: "0 0 auto",
              width: 180,
              background: "#FFFFFF",
              border: "1px solid #E8E8E8",
              borderRadius: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)",
              overflow: "hidden",
              padding: "8px 0",
            }}>
              {NAV.map((item, i) => {
                const active = activeIdx === i;
                return (
                  <button
                    key={item.href}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => {
                      if (item.sub.length === 0) setOpen(false);
                      else setActiveIdx(i);
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "9px 14px",
                      background: active ? "#F5F5F3" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-serif)",
                      fontSize: "1rem",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      color: active || isActive(item.href) ? "#1A1A1A" : "#999999",
                      textAlign: "left",
                      transition: "background 0.15s, color 0.15s",
                    }}
                  >
                    <span>{item.label[language]}</span>
                    {item.sub.length > 0 && (
                      <span style={{
                        fontSize: "9px",
                        color: active ? "#999" : "#CCCCCC",
                        transition: "color 0.15s",
                      }}>›</span>
                    )}
                  </button>
                );
              })}

              {/* Bottom: contact + CTA */}
              <div style={{ borderTop: "1px solid #F0F0F0", padding: "10px 14px", marginTop: 4 }}>
                <a href="tel:+96522275000"
                  style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "10px",
                    fontWeight: 300, color: "#BBBBBB", marginBottom: 3,
                    transition: "color 0.15s", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#1A1A1A")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#BBBBBB")}
                >
                  +965 2227 5000
                </a>
                <Link to="/leasing/opportunities" onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 400,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#1A1A1A", textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 4,
                    marginTop: 4,
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.5")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  Get in touch →
                </Link>
              </div>
            </div>

            {/* ── Sub-menu card — only when active item has sub-items ── */}
            <AnimatePresence mode="wait">
              {activeItem.sub.length > 0 && (
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{   opacity: 0, x: -4 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    flex: 1,
                    background: "#FFFFFF",
                    border: "1px solid #E8E8E8",
                    borderRadius: 16,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                    padding: "10px 0",
                  }}
                >
                  {/* Sub-menu header */}
                  <div style={{
                    padding: "4px 14px 10px",
                    borderBottom: "1px solid #F0F0F0",
                    marginBottom: 4,
                  }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.18em",
                      textTransform: "uppercase", color: "#CCCCCC" }}>
                      {activeItem.label[language]}
                    </p>
                  </div>

                  {/* Sub-menu items */}
                  {activeItem.sub.map((sub, si) => (
                    <motion.div key={sub.href}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: si * 0.03, duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link to={sub.href} onClick={() => setOpen(false)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "8px 14px",
                          fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300,
                          letterSpacing: "0.02em",
                          color: isActive(sub.href) ? "#1A1A1A" : "#999999",
                          transition: "color 0.15s, background 0.15s",
                          textDecoration: "none",
                          borderBottom: si < activeItem.sub.length - 1 ? "1px solid #F5F5F5" : "none",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = "#1A1A1A";
                          e.currentTarget.style.background = "#F9F9F7";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = isActive(sub.href) ? "#1A1A1A" : "#999999";
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <span>{sub.label[language]}</span>
                        {isActive(sub.href) && (
                          <span style={{ fontSize: "9px", color: "#CCCCCC" }}>●</span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════
          PILL — smaller, fixed, centred
          ════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "fixed",
          bottom: PILL_BOT,
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100vw - clamp(2rem, 8vw, 4rem))",
          maxWidth: 480,
          zIndex: 9999,
        }}
      >
        <div
          ref={pillRef}
          style={{
            height: PILL_H,
            background: "#FFFFFF",
            border: "1px solid #E8E8E8",
            borderRadius: 9999,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ flexShrink: 0, lineHeight: 0 }}>
            <motion.img src={alHamraLogo} alt="Al Hamra Tower"
              style={{ height: 26, width: "auto", objectFit: "contain" }}
              whileHover={{ opacity: 0.6 }} transition={{ duration: 0.2 }}
            />
          </Link>

          {/* Center links — desktop */}
          <nav className="hidden lg:flex" style={{ alignItems: "center", gap: 20 }}>
            {NAV.slice(0, 4).map(item => (
              <Link key={item.href} to={item.href}
                style={{
                  fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400,
                  letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
                  color: isActive(item.href) ? "#1A1A1A" : "#AAAAAA",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1A1A1A")}
                onMouseLeave={e => (e.currentTarget.style.color = isActive(item.href) ? "#1A1A1A" : "#AAAAAA")}
              >
                {item.label[language]}
              </Link>
            ))}
          </nav>

          {/* Right: lang + toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button onClick={toggleLanguage}
              style={{
                fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#AAAAAA", cursor: "pointer", background: "none", border: "none", padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1A1A1A")}
              onMouseLeave={e => (e.currentTarget.style.color = "#AAAAAA")}
            >
              {language === "en" ? "ع" : "EN"}
            </button>

            <button onClick={() => setOpen(v => !v)}
              style={{
                fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: open ? "#AAAAAA" : "#1A1A1A",
                cursor: "pointer", background: "none", border: "none", padding: 0,
                transition: "color 0.2s", minWidth: 44, textAlign: "right",
              }}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.span key="c"
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12 }} style={{ display: "block" }}>
                    Close
                  </motion.span>
                ) : (
                  <motion.span key="p"
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.12 }} style={{ display: "block" }}>
                    {currentPage}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
