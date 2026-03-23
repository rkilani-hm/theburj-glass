/**
 * Header — White nav bar, transparent over hero → solid white on scroll
 * fluid.glass aesthetic: light, refined, barely-there
 */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import alHamraLogo from "@/assets/al-hamra-logo.png";

const NAV = [
  { label: { en: "The Tower",   ar: "البرج"    }, href: "/tower",
    sub: [
      { en: "Overview",              ar: "نظرة عامة", href: "/tower" },
      { en: "Origins",               ar: "النشأة",    href: "/tower/origins" },
      { en: "Rising",                ar: "الصعود",    href: "/tower/rising" },
      { en: "Design & Engineering",  ar: "التصميم",   href: "/tower/design" },
      { en: "Sustainability",        ar: "الاستدامة", href: "/tower/sustainability" },
      { en: "Awards",                ar: "الجوائز",   href: "/tower/recognition" },
    ],
  },
  { label: { en: "Business",    ar: "الأعمال"  }, href: "/business/workplace-experience",
    sub: [
      { en: "Workplace",          ar: "بيئة العمل",  href: "/business/workplace-experience" },
      { en: "Office Spaces",      ar: "المكاتب",     href: "/business/office-spaces" },
      { en: "Vertical Transport", ar: "المصاعد",     href: "/business/vertical-transportation" },
      { en: "Connectivity",       ar: "الاتصال",     href: "/business/connectivity" },
    ],
  },
  { label: { en: "Experience",  ar: "التجربة"  }, href: "/services",
    sub: [
      { en: "Services & Facilities", ar: "الخدمات", href: "/services" },
      { en: "Location & Access",     ar: "الموقع",  href: "/location" },
    ],
  },
  { label: { en: "Leasing",     ar: "التأجير"  }, href: "/leasing/opportunities",
    sub: [
      { en: "Opportunities", ar: "الفرص",     href: "/leasing/opportunities" },
      { en: "Inquiry",       ar: "استفسار",   href: "/leasing/inquiry" },
      { en: "Downloads",     ar: "التنزيلات", href: "/leasing/downloads" },
      { en: "Contact",       ar: "التواصل",   href: "/leasing/contact" },
    ],
  },
];

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled]       = useState(false);
  const [activeMenu, setActiveMenu]   = useState<string | null>(null);
  const location = useLocation();
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setActiveMenu(null); }, [location.pathname]);

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  const open  = (key: string) => { clearTimeout(timer.current); setActiveMenu(key); };
  const close = () => { timer.current = setTimeout(() => setActiveMenu(null), 160); };

  const textColor = (active: boolean) => active ? "var(--ink)" : "var(--ink-light)";

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0)",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
      }}
      style={{ backdropFilter: scrolled ? "blur(20px)" : "none" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="container-fluid flex items-center justify-between" style={{ height: "var(--nav-h)" }}>

        {/* Logo */}
        <Link to="/" style={{ flexShrink: 0, lineHeight: 0 }}>
          <motion.img
            src={alHamraLogo}
            alt="Al Hamra Tower"
            animate={{ filter: scrolled ? "none" : "brightness(0) invert(1)" }}
            transition={{ duration: 0.35 }}
            style={{ height: 34, width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Nav — desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <div key={item.href} style={{ position: "relative" }}
              onMouseEnter={() => open(item.label.en)}
              onMouseLeave={close}
            >
              <Link to={item.href} style={{
                fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: scrolled ? textColor(isActive(item.href)) : (isActive(item.href) ? "#fff" : "rgba(255,255,255,0.75)"),
                transition: "color 0.2s",
                paddingBottom: 2,
              }}>
                {item.label[language]}
              </Link>

              {/* Active underline */}
              {isActive(item.href) && (
                <motion.div layoutId="nav-ul" style={{
                  position: "absolute", bottom: -2, left: 0, right: 0,
                  height: 1,
                  background: scrolled ? "var(--ink)" : "#fff",
                }} />
              )}

              {/* Dropdown */}
              <AnimatePresence>
                {activeMenu === item.label.en && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    onMouseEnter={() => open(item.label.en)}
                    onMouseLeave={close}
                    style={{
                      position: "absolute", top: "calc(100% + 16px)",
                      left: "50%", transform: "translateX(-50%)",
                      background: "rgba(255,255,255,0.98)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid var(--border)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
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
                          color: isActive(sub.href) ? "var(--ink)" : "var(--ink-light)",
                          transition: "color 0.15s, background 0.15s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.background = "var(--surface)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = isActive(sub.href) ? "var(--ink)" : "var(--ink-light)"; e.currentTarget.style.background = "transparent"; }}
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

        {/* Right */}
        <div className="flex items-center gap-5">
          <button onClick={toggleLanguage} style={{
            fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400,
            letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer",
            background: "none", border: "none", padding: 0,
            color: scrolled ? "var(--ink-light)" : "rgba(255,255,255,0.65)",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = scrolled ? "var(--ink)" : "#fff")}
          onMouseLeave={e => (e.currentTarget.style.color = scrolled ? "var(--ink-light)" : "rgba(255,255,255,0.65)")}
          >
            {language === "en" ? "عربي" : "EN"}
          </button>

          <Link to="/leasing/opportunities" className="btn-primary" style={{ fontSize: "10px", padding: "10px 20px" }}>
            Leasing Inquiries
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
