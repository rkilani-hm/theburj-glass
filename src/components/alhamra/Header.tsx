import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import alHamraLogo from "@/assets/al-hamra-logo.png";

const NAV = [
  { key: "tower", label: { en: "The Tower", ar: "البرج" }, items: [
    { href: "/tower",               label: { en: "Overview",             ar: "نظرة عامة" } },
    { href: "/tower/rising",        label: { en: "Rising",               ar: "الصعود" } },
    { href: "/tower/design",        label: { en: "Design & Engineering", ar: "التصميم والهندسة" } },
    { href: "/tower/recognition",   label: { en: "Awards",               ar: "الجوائز" } },
    { href: "/tower/sustainability", label: { en: "Sustainability",       ar: "الاستدامة" } },
  ]},
  { key: "business", label: { en: "Business", ar: "الأعمال" }, items: [
    { href: "/business/workplace-experience",   label: { en: "Workplace",         ar: "تجربة مكان العمل" } },
    { href: "/business/office-spaces",          label: { en: "Office Spaces",     ar: "المساحات المكتبية" } },
    { href: "/business/vertical-transportation",label: { en: "Vertical Transport",ar: "النقل العمودي" } },
    { href: "/business/connectivity",           label: { en: "Connectivity",      ar: "الاتصال" } },
  ]},
  { key: "experience", label: { en: "Experience", ar: "التجربة" }, items: [
    { href: "/services",  label: { en: "Services & Facilities", ar: "الخدمات والمرافق" } },
    { href: "/location",  label: { en: "Location & Access",     ar: "الموقع والوصول" } },
  ]},
  { key: "leasing", label: { en: "Leasing", ar: "التأجير" }, items: [
    { href: "/leasing/opportunities", label: { en: "Opportunities", ar: "فرص التأجير" } },
    { href: "/leasing/inquiry",       label: { en: "Inquiry",       ar: "استفسار" } },
    { href: "/leasing/downloads",     label: { en: "Downloads",     ar: "التنزيلات" } },
    { href: "/leasing/contact",       label: { en: "Contact",       ar: "التواصل" } },
  ]},
];

const Dropdown = ({ items, isOpen, language }: {
  items: { href: string; label: { en: string; ar: string } }[];
  isOpen: boolean; language: "en" | "ar";
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="absolute top-full left-0 pt-3 z-50"
        style={{ minWidth: 220 }}
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0,  scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 16px 48px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
        }}>
          {/* Sky accent top */}
          <div style={{ height: 2, background: "linear-gradient(90deg, transparent, hsl(var(--sky)), transparent)" }} />
          {items.map((item, i) => (
            <motion.div key={item.href}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18, delay: i * 0.04 }}
            >
              <Link to={item.href}
                className="group flex items-center justify-between px-5 py-3 transition-all duration-200"
                style={{ borderBottom: i < items.length - 1 ? "1px solid hsl(var(--border))" : "none", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "hsl(var(--sky-pale))")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span className="text-muted-foreground group-hover:text-sky-dark transition-colors duration-200"
                  style={{ fontSize: "12px", letterSpacing: "0.06em", fontWeight: 300 }}>
                  {item.label[language]}
                </span>
                <span className="text-sky opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ fontSize: 10 }}>→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const [openKey, setOpenKey]           = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [mobileKey, setMobileKey]       = useState<string | null>(null);
  const [scrollY, setScrollY]           = useState(0);
  const location = useLocation();
  const { scrollY: sv } = useScroll();

  useMotionValueEvent(sv, "change", v => setScrollY(v));
  useEffect(() => { setMobileOpen(false); setOpenKey(null); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrolled = scrollY > 40;
  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  const headerBg     = scrolled ? "rgba(250,250,247,0.88)" : "rgba(250,250,247,0)";
  const headerBlur   = scrolled ? "blur(32px) saturate(160%)" : "blur(0px)";
  const headerBorder = scrolled ? "1px solid hsl(var(--border))" : "1px solid transparent";
  const headerShadow = scrolled ? "0 1px 0 hsl(var(--border)), 0 4px 20px rgba(0,0,0,0.04)" : "none";

  return (
    <>
      <motion.header className="fixed top-0 left-0 right-0 z-50"
        style={{ background: headerBg, backdropFilter: headerBlur, WebkitBackdropFilter: headerBlur,
          borderBottom: headerBorder, boxShadow: headerShadow,
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between" style={{ height: scrolled ? 60 : 76, transition: "height 0.4s ease" }}>

            {/* Logo */}
            <Link to="/" className="shrink-0">
              <motion.img src={alHamraLogo} alt="Al Hamra Tower"
                style={{ height: scrolled ? 38 : 48, width: "auto", objectFit: "contain", transition: "height 0.4s ease" }}
                whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}
              />
            </Link>

            {/* Desktop pill nav */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center gap-0.5 px-2 py-1.5 rounded-full"
                style={{ background: "rgba(0,0,0,0.03)", border: "1px solid hsl(var(--border))" }}
              >
                {NAV.map(nav => {
                  const active = nav.items.some(i => isActive(i.href));
                  const hovered = openKey === nav.key;
                  return (
                    <div key={nav.key} className="relative"
                      onMouseEnter={() => setOpenKey(nav.key)}
                      onMouseLeave={() => setOpenKey(null)}
                    >
                      <button className="flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-250"
                        style={{
                          background: active || hovered ? "hsl(var(--sky-pale))" : "transparent",
                          fontSize: "12px", letterSpacing: "0.07em", fontWeight: 300,
                          color: active ? "hsl(var(--sky-dark))" : hovered ? "hsl(var(--sky))" : "hsl(var(--muted-foreground))",
                          border: active ? "1px solid hsl(var(--sky-pale))" : "1px solid transparent",
                          transition: "all 0.22s ease", cursor: "pointer",
                        }}
                      >
                        <span>{nav.label[language]}</span>
                        <ChevronDown size={11} style={{ transform: hovered ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.22s ease", opacity: 0.6 }} />
                      </button>
                      <Dropdown items={nav.items} isOpen={hovered} language={language} />
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <motion.button onClick={toggleLanguage}
                className="hidden sm:flex items-center justify-center"
                style={{ width: 34, height: 34, background: "rgba(0,0,0,0.03)", border: "1px solid hsl(var(--border))", borderRadius: 50,
                  fontSize: "11px", letterSpacing: "0.1em", color: "hsl(var(--muted-foreground))", cursor: "pointer" }}
                whileHover={{ background: "hsl(var(--sky-pale))", borderColor: "hsl(var(--sky-light))", color: "hsl(var(--sky-dark))" }}
                whileTap={{ scale: 0.95 }}
              >
                {language === "en" ? "ع" : "EN"}
              </motion.button>

              <Link to="/leasing/opportunities"
                className="hidden lg:inline-flex items-center gap-2 rounded-full transition-all duration-300"
                style={{ padding: "8px 18px", background: "hsl(var(--sky))", fontSize: "11px", letterSpacing: "0.1em",
                  fontWeight: 400, color: "#ffffff", textTransform: "uppercase", textDecoration: "none",
                  boxShadow: "0 2px 12px rgba(74,107,138,0.25)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "hsl(var(--sky-dark))"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(74,107,138,0.35)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "hsl(var(--sky))"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(74,107,138,0.25)"; }}
              >
                Enquire
              </Link>

              <motion.button onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center"
                style={{ width: 34, height: 34, background: mobileOpen ? "hsl(var(--sky-pale))" : "rgba(0,0,0,0.03)",
                  border: `1px solid ${mobileOpen ? "hsl(var(--sky-light))" : "hsl(var(--border))"}`,
                  borderRadius: 50, color: mobileOpen ? "hsl(var(--sky-dark))" : "hsl(var(--muted-foreground))", cursor: "pointer" }}
                whileTap={{ scale: 0.94 }}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen
                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={15} /></motion.div>
                    : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={15} /></motion.div>
                  }
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-40 lg:hidden flex flex-col"
            style={{ background: "rgba(250,250,247,0.97)", backdropFilter: "blur(32px)", paddingTop: 76 }}
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ height: 2, background: "linear-gradient(90deg, transparent 5%, hsl(var(--sky-light)) 50%, transparent 95%)" }} />

            <div className="flex-1 overflow-y-auto px-6 py-8">
              {NAV.map((nav, ni) => (
                <motion.div key={nav.key} className="mb-1"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ni * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button className="w-full flex items-center justify-between py-4"
                    style={{ borderBottom: "1px solid hsl(var(--border))" }}
                    onClick={() => setMobileKey(mobileKey === nav.key ? null : nav.key)}
                  >
                    <span className="font-serif font-light text-foreground" style={{ fontSize: "1.6rem", letterSpacing: "-0.01em" }}>
                      {nav.label[language]}
                    </span>
                    <ChevronDown size={16} style={{ color: "hsl(var(--sky))", transform: mobileKey === nav.key ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s ease" }} />
                  </button>
                  <AnimatePresence>
                    {mobileKey === nav.key && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="py-2 pl-4">
                          {nav.items.map((item, ii) => (
                            <motion.div key={item.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ii * 0.05 }}>
                              <Link to={item.href} onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 py-3 group"
                                style={{ borderBottom: "1px solid hsl(var(--muted))", textDecoration: "none" }}
                              >
                                <span style={{ width: 4, height: 4, borderRadius: "50%", background: isActive(item.href) ? "hsl(var(--sky))" : "hsl(var(--stone-mid))", flexShrink: 0 }} />
                                <span style={{ fontSize: "13px", fontWeight: 300, letterSpacing: "0.08em", textTransform: "uppercase",
                                  color: isActive(item.href) ? "hsl(var(--sky))" : "hsl(var(--muted-foreground))" }}>
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

            <div className="px-6 py-8" style={{ borderTop: "1px solid hsl(var(--border))" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="label-subtle text-muted-foreground/60 mb-1">Direct line</p>
                  <a href="tel:+96522275000" className="text-foreground hover:text-sky transition-colors" style={{ fontSize: "0.9rem", textDecoration: "none" }}>+965 2227 5000</a>
                </div>
                <motion.button onClick={toggleLanguage}
                  className="rounded-full"
                  style={{ padding: "8px 18px", background: "hsl(var(--sky-pale))", border: "1px solid hsl(var(--sky-light))", fontSize: "12px", letterSpacing: "0.12em", color: "hsl(var(--sky-dark))", textTransform: "uppercase", cursor: "pointer" }}
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
