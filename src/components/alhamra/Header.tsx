/**
 * Header — Adaptive color + full mobile menu
 *
 * Desktop: transparent nav → solid on scroll, color adapts to hero theme
 * Mobile:  hamburger button → full-screen slide-down overlay
 */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useHeroThemeValue } from "@/contexts/HeroThemeContext";
import alHamraLogo from "@/assets/al-hamra-logo.png";

const NAV = [
  { label: { en: "The Tower",  ar: "البرج"    }, href: "/tower",
    sub: [
      { en: "Overview",             ar: "نظرة عامة", href: "/tower" },
      { en: "Origins",              ar: "النشأة",    href: "/tower/origins" },
      { en: "Rising",               ar: "الصعود",    href: "/tower/rising" },
      { en: "Design & Engineering", ar: "التصميم",   href: "/tower/design" },
      { en: "Sustainability",       ar: "الاستدامة", href: "/tower/sustainability" },
      { en: "Awards",               ar: "الجوائز",   href: "/tower/recognition" },
    ],
  },
  { label: { en: "Business",   ar: "الأعمال"  }, href: "/business/workplace-experience",
    sub: [
      { en: "Workplace",          ar: "بيئة العمل",  href: "/business/workplace-experience" },
      { en: "Office Spaces",      ar: "المكاتب",     href: "/business/office-spaces" },
      { en: "Vertical Transport", ar: "المصاعد",     href: "/business/vertical-transportation" },
      { en: "Connectivity",       ar: "الاتصال",     href: "/business/connectivity" },
    ],
  },
  { label: { en: "Experience", ar: "التجربة"  }, href: "/services",
    sub: [
      { en: "Services & Facilities", ar: "الخدمات", href: "/services" },
      { en: "Location & Access",     ar: "الموقع",  href: "/location" },
    ],
  },
  { label: { en: "Leasing",    ar: "التأجير"  }, href: "/leasing/opportunities",
    sub: [
      { en: "Opportunities", ar: "الفرص",      href: "/leasing/opportunities" },
      { en: "Inquiry",       ar: "استفسار",    href: "/leasing/inquiry" },
      { en: "Downloads",     ar: "التنزيلات",  href: "/leasing/downloads" },
      { en: "Contact",       ar: "التواصل",    href: "/leasing/contact" },
    ],
  },
];

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const heroDark  = useHeroThemeValue();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const location = useLocation();
  const desktopTimer = useRef<ReturnType<typeof setTimeout>>();

  /* Scroll detection */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Close menus on route change */
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
    setExpandedMobile(null);
  }, [location.pathname]);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  /* Desktop dropdown hover */
  const openMenu  = (k: string) => { clearTimeout(desktopTimer.current); setActiveMenu(k); };
  const closeMenu = () => { desktopTimer.current = setTimeout(() => setActiveMenu(null), 160); };

  /* ── Color tokens ── */
  const onDark    = !scrolled && heroDark && !mobileOpen;
  const navBg     = scrolled || mobileOpen ? "rgba(255,255,255,0.97)" : "transparent";
  const navShadow = scrolled ? "0 1px 0 rgba(0,0,0,0.07)" : "none";
  const logoFilter= onDark ? "brightness(0) invert(1)" : "none";

  const linkC = (active: boolean) =>
    scrolled
      ? (active ? "#2C4A6E" : "var(--ink-light)")
      : onDark
        ? (active ? "#fff" : "rgba(255,255,255,0.72)")
        : (active ? "#2C4A6E" : "var(--ink-light)");
  const linkHover = () => onDark ? "#fff" : "var(--ink)";
  const underlineC = onDark ? "#fff" : "#2C4A6E";
  const langC = scrolled ? "var(--ink-light)" : (onDark ? "rgba(255,255,255,0.62)" : "var(--ink-light)");

  /* Hamburger line color — always contrasts with nav bg */
  const burgerC = (scrolled || mobileOpen) ? "var(--ink)" : (onDark ? "#fff" : "var(--ink)");

  const ctaBg    = scrolled ? "#2C4A6E" : (onDark ? "rgba(255,255,255,0.95)" : "#2C4A6E");
  const ctaColor = scrolled ? "#fff"    : (onDark ? "#1E3552"               : "#fff");

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{ background: navBg, boxShadow: navShadow }}
        style={{ backdropFilter: (scrolled || mobileOpen) ? "blur(20px)" : "none" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="container-fluid flex items-center justify-between"
          style={{ height: "var(--nav-h)" }}>

          {/* Logo */}
          <Link to="/" style={{ flexShrink: 0, lineHeight: 0, zIndex: 2 }}>
            <motion.img
              src={alHamraLogo} alt="Al Hamra Tower"
              animate={{ filter: mobileOpen ? "none" : logoFilter }}
              transition={{ duration: 0.3 }}
              style={{ height: 32, width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map(item => (
              <div key={item.href} style={{ position: "relative" }}
                onMouseEnter={() => openMenu(item.label.en)}
                onMouseLeave={closeMenu}>
                <Link to={item.href} style={{
                  fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: linkC(isActive(item.href)), transition: "color 0.22s", paddingBottom: 2,
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = linkHover())}
                  onMouseLeave={e => (e.currentTarget.style.color = linkC(isActive(item.href)))}
                >{item.label[language]}</Link>

                {isActive(item.href) && (
                  <motion.div layoutId="nav-ul" style={{
                    position: "absolute", bottom: -2, left: 0, right: 0,
                    height: 1, background: underlineC, transition: "background 0.3s",
                  }} />
                )}

                <AnimatePresence>
                  {activeMenu === item.label.en && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      onMouseEnter={() => openMenu(item.label.en)}
                      onMouseLeave={closeMenu}
                      style={{
                        position: "absolute", top: "calc(100% + 14px)",
                        left: "50%", transform: "translateX(-50%)",
                        background: "rgba(255,255,255,0.98)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(0,0,0,0.08)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                        padding: "6px 0", minWidth: 220, zIndex: 100,
                      }}
                    >
                      {item.sub.map(sub => (
                        <Link key={sub.href} to={sub.href}
                          onClick={() => setActiveMenu(null)}
                          style={{
                            display: "block", padding: "10px 20px",
                            fontFamily: "var(--font-sans)", fontSize: "11px",
                            fontWeight: 300, letterSpacing: "0.06em",
                            color: isActive(sub.href) ? "#2C4A6E" : "var(--ink-light)",
                            transition: "color 0.15s, background 0.15s",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = "#2C4A6E"; e.currentTarget.style.background = "rgba(44,74,110,0.04)"; }}
                          onMouseLeave={e => { e.currentTarget.style.color = isActive(sub.href) ? "#2C4A6E" : "var(--ink-light)"; e.currentTarget.style.background = "transparent"; }}
                        >{sub[language as "en" | "ar"]}</Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* ── Right: language + CTA (desktop) + hamburger (mobile) ── */}
          <div className="flex items-center gap-4">

            {/* Language toggle — always visible */}
            <button onClick={toggleLanguage} style={{
              fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400,
              letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer",
              background: "none", border: "none", padding: 0,
              color: mobileOpen ? "var(--ink-light)" : langC,
              transition: "color 0.22s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = mobileOpen ? "var(--ink)" : linkHover())}
              onMouseLeave={e => (e.currentTarget.style.color = mobileOpen ? "var(--ink-light)" : langC)}
            >{language === "en" ? "عربي" : "EN"}</button>

            {/* CTA — desktop only */}
            <Link to="/leasing/opportunities"
              className="hidden lg:inline-flex items-center"
              style={{
                gap: 8, padding: "10px 20px",
                fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.14em", textTransform: "uppercase",
                background: ctaBg, color: ctaColor,
                transition: "opacity 0.25s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >Leasing Inquiries</Link>

            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "4px 0 4px 4px",
                display: "flex", flexDirection: "column",
                justifyContent: "center", gap: 5,
                width: 28, height: 28,
              }}
            >
              <motion.span style={{ display: "block", height: 1.5, background: burgerC, transformOrigin: "center", borderRadius: 1 }}
                animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} />
              <motion.span style={{ display: "block", height: 1.5, background: burgerC, borderRadius: 1 }}
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }} />
              <motion.span style={{ display: "block", height: 1.5, background: burgerC, transformOrigin: "center", borderRadius: 1 }}
                animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════════
          MOBILE MENU OVERLAY
          Full-screen, slides down from header
          ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: "var(--nav-h)",
              left: 0, right: 0, bottom: 0,
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(24px)",
              zIndex: 49,
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="container-fluid" style={{ paddingTop: "clamp(2rem, 5vw, 3rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)" }}>

              {/* Primary nav items */}
              <nav style={{ borderTop: "1px solid var(--rule-light)" }}>
                {NAV.map((item, i) => (
                  <motion.div key={item.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Parent item row */}
                    <div style={{ borderBottom: "1px solid var(--rule-light)" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0" }}>
                        <Link to={item.href} onClick={() => setMobileOpen(false)} style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.6rem, 6vw, 2.2rem)",
                          fontWeight: 400, letterSpacing: "-0.02em",
                          color: isActive(item.href) ? "var(--ink)" : "var(--graphite)",
                          flex: 1,
                        }}>
                          {item.label[language]}
                        </Link>

                        {/* Expand / collapse sub items */}
                        <button
                          onClick={() => setExpandedMobile(expandedMobile === item.label.en ? null : item.label.en)}
                          style={{
                            background: "none", border: "none", cursor: "pointer",
                            padding: "4px 0 4px 16px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          aria-label="Toggle sub-menu"
                        >
                          <motion.span
                            style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "18px", color: "var(--ash)", lineHeight: 1 }}
                            animate={{ rotate: expandedMobile === item.label.en ? 45 : 0 }}
                            transition={{ duration: 0.25 }}
                          >+</motion.span>
                        </button>
                      </div>

                      {/* Sub items — animated expand */}
                      <AnimatePresence>
                        {expandedMobile === item.label.en && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            style={{ overflow: "hidden" }}
                          >
                            <div style={{ paddingBottom: 16, paddingLeft: "clamp(1rem, 4vw, 2rem)" }}>
                              {item.sub.map((sub, si) => (
                                <motion.div key={sub.href}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: si * 0.04, duration: 0.28 }}
                                >
                                  <Link to={sub.href} onClick={() => setMobileOpen(false)} style={{
                                    display: "block", padding: "9px 0",
                                    fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300,
                                    letterSpacing: "0.04em",
                                    color: isActive(sub.href) ? "var(--ink)" : "var(--stone)",
                                    borderBottom: "1px solid var(--rule-light)",
                                    transition: "color 0.15s",
                                  }}>
                                    {sub[language as "en" | "ar"]}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTA + contact */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                style={{ marginTop: "clamp(2rem, 5vw, 3rem)", display: "flex", flexDirection: "column", gap: 14 }}
              >
                <Link to="/leasing/opportunities" onClick={() => setMobileOpen(false)} style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "16px", background: "#2C4A6E", color: "#fff",
                  fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                }}>
                  Leasing Inquiries →
                </Link>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 8, borderTop: "1px solid var(--rule-light)" }}>
                  <a href="tel:+96522270222" style={{
                    fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300,
                    color: "var(--graphite)", display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ash)", minWidth: 60 }}>Leasing</span>
                    +965 222 70 222
                  </a>
                  <a href="mailto:leasing@alhamra.com.kw" style={{
                    fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300,
                    color: "var(--stone)", display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ash)", minWidth: 60 }}>Email</span>
                    leasing@alhamra.com.kw
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
