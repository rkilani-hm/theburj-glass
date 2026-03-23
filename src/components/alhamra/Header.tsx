/**
 * Al Hamra Tower — Top Navigation
 * Transparent over hero → solid black on scroll
 * Per specification §12.1
 */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import alHamraLogo from "@/assets/al-hamra-logo.png";

const NAV_ITEMS = [
  {
    label: { en: "The Tower", ar: "البرج" },
    href: "/tower",
    sub: [
      { en: "Overview",           ar: "نظرة عامة",  href: "/tower" },
      { en: "Origins",            ar: "النشأة",      href: "/tower/origins" },
      { en: "Rising",             ar: "الصعود",      href: "/tower/rising" },
      { en: "Design & Engineering",ar: "التصميم",   href: "/tower/design" },
      { en: "Sustainability",     ar: "الاستدامة",   href: "/tower/sustainability" },
      { en: "Awards",             ar: "الجوائز",     href: "/tower/recognition" },
    ],
  },
  {
    label: { en: "Business", ar: "الأعمال" },
    href: "/business/workplace-experience",
    sub: [
      { en: "Workplace",          ar: "بيئة العمل",  href: "/business/workplace-experience" },
      { en: "Office Spaces",      ar: "المكاتب",     href: "/business/office-spaces" },
      { en: "Vertical Transport", ar: "المصاعد",     href: "/business/vertical-transportation" },
      { en: "Connectivity",       ar: "الاتصال",     href: "/business/connectivity" },
    ],
  },
  {
    label: { en: "Experience", ar: "التجربة" },
    href: "/services",
    sub: [
      { en: "Services & Facilities", ar: "الخدمات", href: "/services" },
      { en: "Location & Access",     ar: "الموقع",  href: "/location" },
    ],
  },
  {
    label: { en: "Leasing", ar: "التأجير" },
    href: "/leasing/opportunities",
    sub: [
      { en: "Opportunities", ar: "الفرص",       href: "/leasing/opportunities" },
      { en: "Inquiry",       ar: "استفسار",     href: "/leasing/inquiry" },
      { en: "Downloads",     ar: "التنزيلات",   href: "/leasing/downloads" },
      { en: "Contact",       ar: "التواصل",     href: "/leasing/contact" },
    ],
  },
];

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled]       = useState(false);
  const [activeMenu, setActiveMenu]   = useState<string | null>(null);
  const location = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  /* Detect scroll to switch transparent → solid */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close dropdown on route change */
  useEffect(() => setActiveMenu(null), [location.pathname]);

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  const handleMenuEnter = (label: string) => {
    clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };
  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 180);
  };

  /* Colors based on scroll position */
  const bg    = scrolled ? "rgba(10,10,10,0.97)" : "transparent";
  const textC = scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.90)";

  return (
    <>
      <motion.header
        style={{ background: bg, backdropFilter: scrolled ? "blur(16px)" : "none" }}
        className="fixed top-0 left-0 right-0 z-50"
        animate={{ background: bg }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div
          className="container-fluid flex items-center justify-between"
          style={{ height: "var(--nav-h)" }}
        >
          {/* Logo */}
          <Link to="/" style={{ flexShrink: 0, lineHeight: 0 }}>
            <img
              src={alHamraLogo}
              alt="Al Hamra Tower"
              style={{
                height: 36,
                width: "auto",
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
                opacity: scrolled ? 1 : 0.92,
                transition: "opacity 0.3s",
              }}
            />
          </Link>

          {/* Centre nav — desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                onMouseEnter={() => handleMenuEnter(item.label.en)}
                onMouseLeave={handleMenuLeave}
                style={{ position: "relative" }}
              >
                <Link
                  to={item.href}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    fontWeight: 400,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: isActive(item.href) ? "#fff" : textC,
                    transition: "color 0.2s",
                    paddingBottom: 4,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = isActive(item.href) ? "#fff" : textC)}
                >
                  {item.label[language]}
                </Link>

                {/* Active underline */}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    style={{
                      position: "absolute",
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: 1,
                      background: "#fff",
                    }}
                  />
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {activeMenu === item.label.en && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      onMouseEnter={() => handleMenuEnter(item.label.en)}
                      onMouseLeave={handleMenuLeave}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 20px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(10,10,10,0.97)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        padding: "8px 0",
                        minWidth: 220,
                        zIndex: 100,
                      }}
                    >
                      {item.sub.map((sub) => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          onClick={() => setActiveMenu(null)}
                          style={{
                            display: "block",
                            padding: "10px 20px",
                            fontFamily: "var(--font-sans)",
                            fontSize: "11px",
                            fontWeight: 300,
                            letterSpacing: "0.08em",
                            color: isActive(sub.href)
                              ? "rgba(255,255,255,0.95)"
                              : "rgba(255,255,255,0.45)",
                            transition: "color 0.15s, background 0.15s",
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.color = "rgba(255,255,255,0.95)";
                            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.color = isActive(sub.href)
                              ? "rgba(255,255,255,0.95)"
                              : "rgba(255,255,255,0.45)";
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          {sub[language as "en" | "ar"]}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right: language + CTA */}
          <div className="flex items-center gap-5">
            <button
              onClick={toggleLanguage}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: textC,
                background: "none",
                border: "none",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = textC)}
            >
              {language === "en" ? "عربي" : "EN"}
            </button>

            <Link
              to="/leasing/opportunities"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#0A0A0A",
                background: scrolled ? "#fff" : "rgba(255,255,255,0.92)",
                padding: "10px 22px",
                border: "1px solid transparent",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.78)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = scrolled ? "#fff" : "rgba(255,255,255,0.92)")}
            >
              Leasing Inquiries
            </Link>
          </div>
        </div>

        {/* Bottom border — only when scrolled */}
        {scrolled && (
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
        )}
      </motion.header>

      {/* Spacer so content doesn't hide under the top nav */}
      {/* Not needed — hero is full-viewport and overlay-based */}
    </>
  );
}
