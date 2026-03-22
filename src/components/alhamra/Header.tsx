import { useState, useEffect } from "react";
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
  { label: { en: "Overview",       ar: "نظرة عامة"  }, href: "/tower"                          },
  { label: { en: "Rising",         ar: "الصعود"      }, href: "/tower/rising"                   },
  { label: { en: "Design",         ar: "التصميم"     }, href: "/tower/design"                   },
  { label: { en: "Sustainability",  ar: "الاستدامة"  }, href: "/tower/sustainability"            },
  { label: { en: "Office Spaces",  ar: "المكاتب"     }, href: "/business/office-spaces"         },
  { label: { en: "Inquiry",        ar: "استفسار"     }, href: "/leasing/inquiry"                },
  { label: { en: "Downloads",      ar: "التنزيلات"   }, href: "/leasing/downloads"              },
  { label: { en: "Services",       ar: "الخدمات"     }, href: "/services"                       },
];

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  /* ── Derive current page label ── */
  const currentPage = (() => {
    const all = [...PRIMARY_NAV, ...SECONDARY_NAV];
    // Find deepest match (most specific path first)
    const sorted = all.slice().sort((a, b) => b.href.length - a.href.length);
    const match = sorted.find(n => isActive(n.href));
    if (match) return match.label[language];
    return language === "en" ? "Home" : "الرئيسية";
  })();

  const navColor = (active: boolean) =>
    open
      ? active ? "#FAFAF8" : "#555"
      : active ? "#1A1A1A" : "#767676";

  return (
    <>
      {/* ════════════════════════════════════════════════
          FULL-SCREEN OVERLAY
          ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "#111111", paddingBottom: "calc(var(--nav-h) + 1.25rem)" }}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{   clipPath: "inset(100% 0% 0% 0%)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex-1 overflow-y-auto container-fluid py-16 lg:py-24">
              <div className="grid lg:grid-cols-12 gap-16 items-start">

                {/* Left: large serif nav */}
                <nav className="lg:col-span-7 flex flex-col gap-1">
                  {PRIMARY_NAV.map((item, i) => (
                    <motion.div key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-4 py-3 border-b"
                        style={{ borderColor: "#1E1E1E" }}
                      >
                        <span style={{
                          fontFamily: "var(--font-sans)", fontSize: "10px",
                          color: "#444", letterSpacing: "0.1em", minWidth: 22, paddingTop: 6,
                        }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="font-serif font-light transition-colors duration-300"
                          style={{
                            fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
                            lineHeight: 1.1,
                            letterSpacing: "-0.025em",
                            color: isActive(item.href) ? "#FAFAF8" : "#444",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#FAFAF8")}
                          onMouseLeave={e => (e.currentTarget.style.color = isActive(item.href) ? "#FAFAF8" : "#444")}
                        >
                          {item.label[language]}
                        </span>
                        <span className="ml-auto self-center font-sans font-light opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"
                          style={{ color: "#FAFAF8", fontSize: "1rem" }}>
                          →
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Right: secondary + contact */}
                <div className="lg:col-span-5 flex flex-col gap-10">
                  <motion.nav className="flex flex-col gap-3"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.2em",
                      textTransform: "uppercase", color: "#444", marginBottom: 8 }}>
                      Quick links
                    </p>
                    {SECONDARY_NAV.map(item => (
                      <Link key={item.href} to={item.href} onClick={() => setOpen(false)}
                        style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300,
                          letterSpacing: "0.05em", color: "#555", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#FAFAF8")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#555")}
                      >
                        {item.label[language]}
                      </Link>
                    ))}
                  </motion.nav>

                  <div style={{ height: 1, background: "#1E1E1E" }} />

                  <motion.div className="flex flex-col gap-3"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.2em",
                      textTransform: "uppercase", color: "#444" }}>
                      Contact
                    </p>
                    {[
                      { text: "+965 2227 5000",            href: "tel:+96522275000" },
                      { text: "leasing@alhamratower.com",  href: "mailto:leasing@alhamratower.com" },
                    ].map(c => (
                      <a key={c.href} href={c.href}
                        style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300,
                          letterSpacing: "0.04em", color: "#555", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#FAFAF8")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#555")}
                      >
                        {c.text}
                      </a>
                    ))}
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300, color: "#444" }}>
                      Sharq District, Kuwait City
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Link to="/leasing/opportunities" onClick={() => setOpen(false)}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 10,
                        padding: "12px 24px", background: "#FAFAF8", color: "#1A1A1A",
                        fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400,
                        letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.25s",
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#E8E8E8")}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#FAFAF8")}
                    >
                      Get in touch →
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════
          FLOATING PILL — centered, smaller, no burger
          ════════════════════════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0 clamp(1rem, 4vw, 2rem) clamp(0.75rem, 2vw, 1rem)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 640,           /* ← smaller pill */
            height: 52,              /* ← slimmer height */
            background: open ? "#111111" : "#FFFFFF",
            border: `1px solid ${open ? "#222" : "#E8E8E8"}`,
            borderRadius: 9999,
            transition: "background 0.5s ease, border-color 0.5s ease",
            boxShadow: open
              ? "0 8px 48px rgba(0,0,0,0.55)"
              : "0 4px 24px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 clamp(1rem, 2vw, 1.5rem)",
            pointerEvents: "auto",
          }}
        >
          {/* ── Logo ── */}
          <Link to="/" onClick={() => setOpen(false)} style={{ flexShrink: 0 }}>
            <motion.img
              src={alHamraLogo}
              alt="Al Hamra Tower"
              style={{
                height: 28,
                width: "auto",
                objectFit: "contain",
                filter: open ? "brightness(0) invert(1)" : "none",
                transition: "filter 0.4s ease",
              }}
              whileHover={{ opacity: 0.65 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* ── Center quick links (desktop only) ── */}
          <nav className="hidden lg:flex items-center gap-6">
            {PRIMARY_NAV.slice(0, 4).map(item => (
              <Link key={item.href} to={item.href}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",           /* ← smaller */
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: navColor(isActive(item.href)),
                  transition: "color 0.22s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = open ? "#FAFAF8" : "#1A1A1A")}
                onMouseLeave={e => (e.currentTarget.style.color = navColor(isActive(item.href)))}
              >
                {item.label[language]}
              </Link>
            ))}
          </nav>

          {/* ── Right: language + toggle ── */}
          <div className="flex items-center gap-4">

            {/* Language */}
            <button
              onClick={toggleLanguage}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: navColor(false),
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
                transition: "color 0.22s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = open ? "#FAFAF8" : "#1A1A1A")}
              onMouseLeave={e => (e.currentTarget.style.color = navColor(false))}
            >
              {language === "en" ? "عربي" : "EN"}
            </button>

            {/* ── Toggle: shows current page name (closed) or "Close" (open) ── */}
            <button
              onClick={() => setOpen(v => !v)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: open ? "#FAFAF8" : "#1A1A1A",
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
                transition: "color 0.3s ease",
                minWidth: 56,
                textAlign: "right",
              }}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.span key="close"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "block" }}
                  >
                    Close
                  </motion.span>
                ) : (
                  <motion.span key="page"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.18 }}
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
    </>
  );
}
