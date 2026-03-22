import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import alHamraLogo from "@/assets/al-hamra-logo.png";

/* ── nav data ── */
const NAV = [
  {
    key: "tower", label: { en: "The Tower", ar: "البرج" },
    items: [
      { href: "/tower",              label: { en: "Overview",             ar: "نظرة عامة" } },
      { href: "/tower/rising",       label: { en: "Rising",               ar: "الصعود" } },
      { href: "/tower/design",       label: { en: "Design & Engineering", ar: "التصميم والهندسة" } },
      { href: "/tower/recognition",  label: { en: "Awards",               ar: "الجوائز" } },
      { href: "/tower/sustainability", label: { en: "Sustainability",      ar: "الاستدامة" } },
    ],
  },
  {
    key: "business", label: { en: "Business", ar: "الأعمال" },
    items: [
      { href: "/business/workplace-experience", label: { en: "Workplace",            ar: "تجربة مكان العمل" } },
      { href: "/business/office-spaces",        label: { en: "Office Spaces",        ar: "المساحات المكتبية" } },
      { href: "/business/vertical-transportation", label: { en: "Vertical Transport", ar: "النقل العمودي" } },
      { href: "/business/connectivity",         label: { en: "Connectivity",         ar: "الاتصال" } },
    ],
  },
  {
    key: "experience", label: { en: "Experience", ar: "التجربة" },
    items: [
      { href: "/services",             label: { en: "Services & Facilities", ar: "الخدمات والمرافق" } },
      { href: "/location",             label: { en: "Location & Access",     ar: "الموقع والوصول" } },
    ],
  },
  {
    key: "leasing", label: { en: "Leasing", ar: "التأجير" },
    items: [
      { href: "/leasing/opportunities", label: { en: "Opportunities", ar: "فرص التأجير" } },
      { href: "/leasing/inquiry",       label: { en: "Inquiry",       ar: "استفسار" } },
      { href: "/leasing/downloads",     label: { en: "Downloads",     ar: "التنزيلات" } },
      { href: "/leasing/contact",       label: { en: "Contact",       ar: "التواصل" } },
    ],
  },
];

/* ── Desktop dropdown ── */
const DropdownMenu = ({
  items, isOpen, language,
}: {
  items: { href: string; label: { en: string; ar: string } }[];
  isOpen: boolean;
  language: "en" | "ar";
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -6, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-full left-0 pt-3 z-50"
        style={{ minWidth: 220 }}
      >
        <div
          style={{
            background: "rgba(10,10,10,0.92)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05) inset",
          }}
        >
          {/* Gold top accent */}
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)" }} />
          {items.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18, delay: i * 0.04 }}
            >
              <Link
                to={item.href}
                className="group flex items-center justify-between px-5 py-3 transition-all duration-200"
                style={{ borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,169,110,0.06)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span
                  className="text-white/60 group-hover:text-white/90 transition-colors duration-200"
                  style={{ fontSize: "12px", letterSpacing: "0.08em", fontWeight: 300 }}
                >
                  {item.label[language]}
                </span>
                <span className="text-silk-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ fontSize: 10 }}>→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ════════════════════════════════════════
   HEADER — iOS Adaptive Glass Nav
   ════════════════════════════════════════ */
const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen]     = useState(false);
  const [openKey,  setOpenKey]      = useState<string | null>(null);
  const [mobileOpenKey, setMobileOpenKey] = useState<string | null>(null);
  const [scrollY, setScrollY]       = useState(0);
  const location = useLocation();
  const { scrollY: motionScrollY }  = useScroll();

  useMotionValueEvent(motionScrollY, "change", (v) => setScrollY(v));

  const scrolled   = scrollY > 40;
  const atTop      = scrollY < 10;

  /* Close menu on route change */
  useEffect(() => { setMenuOpen(false); setOpenKey(null); }, [location.pathname]);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  /* Header glass style — more opaque as user scrolls */
  const headerBg = scrolled
    ? "rgba(8,8,8,0.88)"
    : "rgba(8,8,8,0.0)";
  const headerBlur = scrolled ? "blur(40px) saturate(180%)" : "blur(0px)";
  const headerBorder = scrolled
    ? "1px solid rgba(255,255,255,0.06)"
    : "1px solid transparent";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: headerBg,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
          borderBottom: headerBorder,
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
        }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between" style={{ height: scrolled ? 64 : 80, transition: "height 0.4s ease" }}>

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center group shrink-0">
              <motion.img
                src={alHamraLogo}
                alt="Al Hamra Tower"
                style={{ height: scrolled ? 40 : 52, transition: "height 0.4s ease", width: "auto", objectFit: "contain" }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3 }}
              />
            </Link>

            {/* ── Desktop Nav — iOS pill style ── */}
            <nav className="hidden lg:flex items-center">
              {/* Central glass pill container */}
              <div
                className="flex items-center gap-1 px-2 py-1.5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 50,
                  backdropFilter: "blur(20px)",
                }}
              >
                {NAV.map((nav) => {
                  const active = nav.items.some(i => isActive(i.href));
                  return (
                    <div
                      key={nav.key}
                      className="relative"
                      onMouseEnter={() => setOpenKey(nav.key)}
                      onMouseLeave={() => setOpenKey(null)}
                    >
                      <button
                        className="flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 group"
                        style={{
                          background: active || openKey === nav.key ? "rgba(201,169,110,0.12)" : "transparent",
                          fontSize: "12px",
                          letterSpacing: "0.08em",
                          fontWeight: 300,
                          color: active ? "hsl(var(--silk-gold))" : openKey === nav.key ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
                          transition: "all 0.25s ease",
                        }}
                      >
                        <span>{nav.label[language]}</span>
                        <ChevronDown
                          size={11}
                          style={{
                            transform: openKey === nav.key ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.25s ease",
                            opacity: 0.6,
                          }}
                        />
                      </button>
                      <DropdownMenu items={nav.items} isOpen={openKey === nav.key} language={language} />
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-3">
              {/* Language toggle */}
              <motion.button
                onClick={toggleLanguage}
                className="hidden sm:flex items-center justify-center"
                style={{
                  width: 36, height: 36,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 50,
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 400,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                whileHover={{ background: "rgba(201,169,110,0.12)", borderColor: "rgba(201,169,110,0.3)", color: "hsl(var(--silk-gold))" }}
                whileTap={{ scale: 0.95 }}
              >
                {language === "en" ? "ع" : "EN"}
              </motion.button>

              {/* Leasing CTA */}
              <Link
                to="/leasing/opportunities"
                className="hidden lg:flex items-center gap-2 px-4 py-2 transition-all duration-300"
                style={{
                  background: "rgba(201,169,110,0.1)",
                  border: "1px solid rgba(201,169,110,0.25)",
                  borderRadius: 50,
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  fontWeight: 300,
                  color: "hsl(var(--silk-gold))",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,169,110,0.2)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,169,110,0.4)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,169,110,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,169,110,0.25)";
                }}
              >
                Enquire
              </Link>

              {/* Mobile hamburger */}
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex items-center justify-center"
                style={{
                  width: 36, height: 36,
                  background: menuOpen ? "rgba(201,169,110,0.12)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${menuOpen ? "rgba(201,169,110,0.25)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 50,
                  color: menuOpen ? "hsl(var(--silk-gold))" : "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                whileTap={{ scale: 0.94 }}
              >
                <AnimatePresence mode="wait">
                  {menuOpen
                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={16} /></motion.div>
                    : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={16} /></motion.div>
                  }
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Full-Screen Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden flex flex-col"
            style={{
              background: "rgba(6,6,6,0.97)",
              backdropFilter: "blur(40px)",
              paddingTop: 80,
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Gold top border */}
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent 5%, rgba(201,169,110,0.4) 50%, transparent 95%)" }} />

            <div className="flex-1 overflow-y-auto px-6 py-8">
              {NAV.map((nav, ni) => (
                <motion.div
                  key={nav.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ni * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-2"
                >
                  <button
                    className="w-full flex items-center justify-between py-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                    onClick={() => setMobileOpenKey(mobileOpenKey === nav.key ? null : nav.key)}
                  >
                    <span
                      className="font-serif font-light"
                      style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.85)", letterSpacing: "-0.01em" }}
                    >
                      {nav.label[language]}
                    </span>
                    <ChevronDown
                      size={16}
                      style={{
                        color: "rgba(201,169,110,0.6)",
                        transform: mobileOpenKey === nav.key ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileOpenKey === nav.key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="py-2 pl-4">
                          {nav.items.map((item, ii) => (
                            <motion.div
                              key={item.href}
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: ii * 0.05, duration: 0.3 }}
                            >
                              <Link
                                to={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3 py-3 group"
                                style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                              >
                                <span
                                  style={{
                                    width: 4, height: 4, borderRadius: "50%",
                                    background: isActive(item.href) ? "hsl(var(--silk-gold))" : "rgba(255,255,255,0.2)",
                                    flexShrink: 0, transition: "background 0.2s",
                                  }}
                                />
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: 300,
                                    letterSpacing: "0.06em",
                                    color: isActive(item.href) ? "hsl(var(--silk-gold))" : "rgba(255,255,255,0.5)",
                                    textTransform: "uppercase",
                                    transition: "color 0.2s",
                                  }}
                                >
                                  {item.label[language]}
                                </span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Bottom contact strip */}
            <div className="px-6 py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="label-subtle text-white/30 mb-1">Direct line</p>
                  <a href="tel:+96522275000" className="text-white/70 hover:text-silk-gold transition-colors" style={{ fontSize: "0.9rem" }}>
                    +965 2227 5000
                  </a>
                </div>
                <motion.button
                  onClick={toggleLanguage}
                  className="px-5 py-2.5 rounded-full"
                  style={{
                    background: "rgba(201,169,110,0.1)",
                    border: "1px solid rgba(201,169,110,0.25)",
                    fontSize: "12px",
                    letterSpacing: "0.12em",
                    color: "hsl(var(--silk-gold))",
                    textTransform: "uppercase",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === "en" ? "عربي" : "English"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
