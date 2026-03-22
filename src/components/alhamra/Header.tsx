/**
 * Al Hamra Tower — Bottom Navigation
 * Inspired exactly by fluid.glass:
 *   - Fixed bar at BOTTOM of screen
 *   - "Menu" text toggle (not a hamburger icon)
 *   - Full-screen dark overlay slides UP from bar
 *   - Left column: large serif nav items
 *   - Right column: secondary links + contact
 *   - fluid.glass exact colors: #FFFFFF · #1A1A1A · #767676
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import alHamraLogo from "@/assets/al-hamra-logo.png";

/* Primary nav items — large serif in overlay (left col) */
const PRIMARY_NAV = [
  { label: { en: "The Tower",   ar: "البرج"       }, href: "/tower"                        },
  { label: { en: "Business",    ar: "الأعمال"      }, href: "/business/workplace-experience" },
  { label: { en: "Leasing",     ar: "التأجير"      }, href: "/leasing/opportunities"         },
  { label: { en: "Location",    ar: "الموقع"       }, href: "/location"                      },
  { label: { en: "Contact",     ar: "التواصل"      }, href: "/leasing/contact"               },
];

/* Secondary links — small labels in overlay (right col) */
const SECONDARY_NAV = [
  { label: { en: "Overview",       ar: "نظرة عامة"     }, href: "/tower"                          },
  { label: { en: "Rising",         ar: "الصعود"         }, href: "/tower/rising"                   },
  { label: { en: "Design",         ar: "التصميم"        }, href: "/tower/design"                   },
  { label: { en: "Sustainability",  ar: "الاستدامة"     }, href: "/tower/sustainability"            },
  { label: { en: "Office Spaces",  ar: "المكاتب"        }, href: "/business/office-spaces"         },
  { label: { en: "Inquiry",        ar: "استفسار"        }, href: "/leasing/inquiry"                },
  { label: { en: "Downloads",      ar: "التنزيلات"      }, href: "/leasing/downloads"              },
  { label: { en: "Services",       ar: "الخدمات"        }, href: "/services"                       },
];

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [open, setOpen]   = useState(false);
  const location = useLocation();

  /* Close on route change */
  useEffect(() => { setOpen(false); }, [location.pathname]);

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <>
      {/* ════════════════════════════════════════════════
          FULL-SCREEN OVERLAY — slides up from bottom bar
          fluid.glass dark overlay: #111111 bg
          ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{
              background: "#111111",
              paddingBottom: "var(--nav-h)",
            }}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{   clipPath: "inset(100% 0% 0% 0%)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex-1 overflow-y-auto container-fluid py-16 lg:py-24">
              <div className="grid lg:grid-cols-12 gap-16 items-start h-full">

                {/* ── Left col: large serif primary nav ── */}
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
                        {/* Counter — fluid.glass style */}
                        <span style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "11px",
                          color: "#444",
                          letterSpacing: "0.1em",
                          minWidth: 24,
                          paddingTop: 6,
                        }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Main label */}
                        <span
                          className="font-serif font-light transition-colors duration-300"
                          style={{
                            fontSize: "clamp(2.2rem, 5vw, 5rem)",
                            lineHeight: 1.1,
                            letterSpacing: "-0.025em",
                            color: isActive(item.href) ? "#FAFAF8" : "#444",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#FAFAF8")}
                          onMouseLeave={e => (e.currentTarget.style.color = isActive(item.href) ? "#FAFAF8" : "#444")}
                        >
                          {item.label[language]}
                        </span>

                        {/* Arrow — appears on hover */}
                        <span
                          className="font-sans font-light ml-auto self-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2"
                          style={{ color: "#FAFAF8", fontSize: "1.1rem", transform: "translateX(0)" }}
                        >
                          →
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* ── Right col: secondary links + contact ── */}
                <div className="lg:col-span-5 flex flex-col gap-10">

                  {/* Secondary links */}
                  <motion.nav className="flex flex-col gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.2em",
                      textTransform: "uppercase", color: "#444", marginBottom: 8 }}>
                      Quick links
                    </p>
                    {SECONDARY_NAV.map(item => (
                      <Link key={item.href} to={item.href} onClick={() => setOpen(false)}
                        className="transition-colors duration-200"
                        style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300,
                          letterSpacing: "0.06em", color: "#555" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#FAFAF8")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#555")}
                      >
                        {item.label[language]}
                      </Link>
                    ))}
                  </motion.nav>

                  {/* Divider */}
                  <div style={{ height: 1, background: "#1E1E1E" }} />

                  {/* Contact block */}
                  <motion.div className="flex flex-col gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.2em",
                      textTransform: "uppercase", color: "#444" }}>
                      Contact
                    </p>
                    <a href="tel:+96522275000"
                      style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 300,
                        letterSpacing: "0.04em", color: "#555" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#FAFAF8")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#555")}
                    >
                      +965 2227 5000
                    </a>
                    <a href="mailto:leasing@alhamratower.com"
                      style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300,
                        letterSpacing: "0.04em", color: "#555" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#FAFAF8")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#555")}
                    >
                      leasing@alhamratower.com
                    </a>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "#444" }}>
                      Sharq District, Kuwait City
                    </p>
                  </motion.div>

                  {/* CTA button */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Link to="/leasing/opportunities" onClick={() => setOpen(false)}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 10,
                        padding: "13px 28px",
                        background: "#FAFAF8", color: "#1A1A1A",
                        fontFamily: "var(--font-sans)", fontSize: "12px",
                        fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase",
                        transition: "background 0.25s ease",
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
          BOTTOM NAV BAR — fixed, fluid.glass style
          White bg · hairline top border
          ════════════════════════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          height: "var(--nav-h)",
          background: open ? "#111111" : "#FFFFFF",
          borderTop: `1px solid ${open ? "#1E1E1E" : "#E8E8E8"}`,
          transition: "background 0.5s ease, border-color 0.5s ease",
        }}
      >
        <div
          className="container-fluid h-full flex items-center justify-between"
        >
          {/* ── Left: Logo ── */}
          <Link to="/" onClick={() => setOpen(false)} style={{ flexShrink: 0 }}>
            <motion.img
              src={alHamraLogo}
              alt="Al Hamra Tower"
              style={{
                height: 36,
                width: "auto",
                objectFit: "contain",
                filter: open ? "brightness(0) invert(1)" : "none",
                transition: "filter 0.4s ease",
              }}
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* ── Center: Quick links (desktop only) ── */}
          <nav className="hidden lg:flex items-center gap-8">
            {PRIMARY_NAV.slice(0, 4).map(item => (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: open
                    ? (isActive(item.href) ? "#FAFAF8" : "#555")
                    : (isActive(item.href) ? "#1A1A1A" : "#767676"),
                  transition: "color 0.25s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = open ? "#FAFAF8" : "#1A1A1A")}
                onMouseLeave={e => (e.currentTarget.style.color = open
                  ? (isActive(item.href) ? "#FAFAF8" : "#555")
                  : (isActive(item.href) ? "#1A1A1A" : "#767676"))}
              >
                {item.label[language]}
              </Link>
            ))}
          </nav>

          {/* ── Right: Language + Menu toggle ── */}
          <div className="flex items-center gap-6">

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              style={{
                fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400,
                letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                background: "none", border: "none", padding: 0,
                color: open ? "#555" : "#767676",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = open ? "#FAFAF8" : "#1A1A1A")}
              onMouseLeave={e => (e.currentTarget.style.color = open ? "#555" : "#767676")}
            >
              {language === "en" ? "عربي" : "EN"}
            </button>

            {/* fluid.glass signature: "Menu" text toggle — NOT an icon */}
            <button
              onClick={() => setOpen(v => !v)}
              className="flex items-center gap-2"
              style={{
                fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 400,
                letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                background: "none", border: "none", padding: 0,
                color: open ? "#FAFAF8" : "#1A1A1A",
                transition: "color 0.3s ease",
              }}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.span key="close"
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    Close
                  </motion.span>
                ) : (
                  <motion.span key="menu"
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    Menu
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Animated burger lines — fluid.glass style */}
              <div className="flex flex-col gap-1 justify-center" style={{ width: 18, height: 14 }}>
                <motion.span
                  style={{ display: "block", height: 1, background: open ? "#FAFAF8" : "#1A1A1A", transformOrigin: "center", transition: "background 0.3s ease" }}
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.span
                  style={{ display: "block", height: 1, background: open ? "#FAFAF8" : "#1A1A1A", transition: "background 0.3s ease" }}
                  animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  style={{ display: "block", height: 1, background: open ? "#FAFAF8" : "#1A1A1A", transformOrigin: "center", transition: "background 0.3s ease" }}
                  animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
