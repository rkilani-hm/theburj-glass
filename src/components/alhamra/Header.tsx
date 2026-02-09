import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [towerDropdownOpen, setTowerDropdownOpen] = useState(false);
  const [connectDropdownOpen, setConnectDropdownOpen] = useState(false);
  // Mobile accordion states
  const [mobileTowerOpen, setMobileTowerOpen] = useState(false);
  const [mobileConnectOpen, setMobileConnectOpen] = useState(false);
  const location = useLocation();
  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const towerSubItems = [
    { key: "nav.tower.bydina", href: "/tower", label: { en: "The Tower by Dina", ar: "البرج بواسطة دينا" } },
    { key: "nav.tower.dashboard", href: "/tower/dashboard", label: { en: "Technical Dashboard", ar: "لوحة التحكم الفنية" } },
    { key: "nav.tower.rising", href: "/tower/rising", label: { en: "Rising", ar: "الصعود" } },
    { key: "nav.tower.architecture", href: "/tower/architecture", label: { en: "Architectural Design", ar: "التصميم المعماري" } },
    { key: "nav.tower.engineering", href: "/tower/engineering", label: { en: "Structural Design", ar: "التصميم الإنشائي" } },
    { key: "nav.tower.recognition", href: "/tower/recognition", label: { en: "Awards", ar: "الجوائز" } },
  ];

  const connectSubItems = [
    { key: "nav.location", href: "/location", label: { en: "Location & Accessibility", ar: "الموقع والوصول" } },
    { key: "nav.leasing", href: "/leasing", label: { en: "Leasing", ar: "التأجير" } },
    { key: "nav.contact", href: "/contact", label: { en: "Contact Us", ar: "تواصل معنا" } },
  ];

  const navItems = [
    { key: "nav.business", href: "/business" },
    { key: "nav.services", href: "/services" },
    { key: "nav.sustainability", href: "/tower/sustainability", label: { en: "Sustainability", ar: "الاستدامة" } },
  ];

  const isActive = (href: string) => location.pathname === href;
  const isTowerActive = location.pathname.startsWith("/tower");
  const isConnectActive = ["/leasing", "/location", "/contact"].includes(location.pathname);

  // Always use dark text - backgrounds are always light (images or white)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
        scrolled
          ? "glass border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <span className={`text-xl lg:text-2xl font-semibold tracking-[0.2em] uppercase transition-colors duration-500 text-charcoal-dark
              }`}>
                Al Hamra
              </span>
              <span className="block text-[10px] tracking-[0.3em] uppercase mt-0.5 transition-colors duration-500 text-charcoal-light">
                Tower
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Tower Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setTowerDropdownOpen(true)}
              onMouseLeave={() => setTowerDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isTowerActive
                    ? "text-charcoal-dark"
                    : "text-charcoal-light hover:text-charcoal-dark"
                }`}
              >
                {t("nav.tower")}
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ${towerDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {towerDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-2"
                  >
                    <div className="glass border border-border/50 shadow-lg min-w-[220px] overflow-hidden">
                      {towerSubItems.map((item, index) => (
                        <motion.div
                          key={item.key}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <Link
                            to={item.href}
                            className={`block px-5 py-3 text-sm tracking-wide transition-all duration-300 border-b border-border/50 last:border-0 border-l-2 ${
                              isActive(item.href)
                                ? "text-foreground bg-muted/50 border-l-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:translate-x-1 border-l-transparent hover:border-l-foreground/50"
                            }`}
                          >
                            {item.label[language]}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isActive(item.href)
                    ? "text-charcoal-dark"
                    : "text-charcoal-light hover:text-charcoal-dark"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}

            {/* Connect Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setConnectDropdownOpen(true)}
              onMouseLeave={() => setConnectDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isConnectActive
                    ? "text-charcoal-dark"
                    : "text-charcoal-light hover:text-charcoal-dark"
                }`}
              >
                {t("nav.connect")}
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ${connectDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {connectDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 pt-2"
                  >
                    <div className="glass border border-border/50 shadow-lg min-w-[180px] overflow-hidden">
                      {connectSubItems.map((item, index) => (
                        <motion.div
                          key={item.key}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <Link
                            to={item.href}
                            className={`block px-5 py-3 text-sm tracking-wide transition-all duration-300 border-b border-border/50 last:border-0 border-l-2 ${
                              isActive(item.href)
                                ? "text-foreground bg-muted/50 border-l-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:translate-x-1 border-l-transparent hover:border-l-foreground/50"
                            }`}
                          >
                            {item.label[language]}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-6">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 text-sm tracking-wider border border-charcoal/20 hover:bg-charcoal/5 text-charcoal-dark transition-colors duration-300"
            >
              {language === "en" ? "عربي" : "EN"}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 hover:bg-muted transition-colors duration-300"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out-expo ${
            menuOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-6 border-t border-border/50 glass">
            <div className="flex flex-col gap-2">
              {/* Tower Section - Collapsible */}
              <div>
                <button
                  onClick={() => setMobileTowerOpen(!mobileTowerOpen)}
                  className={`w-full flex items-center justify-between py-3 text-lg transition-colors duration-300 ${
                    isTowerActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span>{t("nav.tower")}</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-300 ${mobileTowerOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileTowerOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pb-2 space-y-1">
                        {towerSubItems.map((item, index) => (
                          <motion.div
                            key={item.key}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <Link
                              to={item.href}
                              onClick={() => setMenuOpen(false)}
                              className={`block py-2 text-base transition-all duration-300 border-l-2 pl-4 ${
                                isActive(item.href)
                                  ? "text-foreground border-foreground"
                                  : "text-muted-foreground hover:text-foreground border-transparent hover:border-foreground/50"
                              }`}
                            >
                              {item.label[language]}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-px bg-border" />

              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`py-3 text-lg transition-colors duration-300 ${
                    isActive(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}

              <div className="h-px bg-border" />

              {/* Connect Section - Collapsible */}
              <div>
                <button
                  onClick={() => setMobileConnectOpen(!mobileConnectOpen)}
                  className={`w-full flex items-center justify-between py-3 text-lg transition-colors duration-300 ${
                    isConnectActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span>{t("nav.connect")}</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-300 ${mobileConnectOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileConnectOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pb-2 space-y-1">
                        {connectSubItems.map((item, index) => (
                          <motion.div
                            key={item.key}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <Link
                              to={item.href}
                              onClick={() => setMenuOpen(false)}
                              className={`block py-2 text-base transition-all duration-300 border-l-2 pl-4 ${
                                isActive(item.href)
                                  ? "text-foreground border-foreground"
                                  : "text-muted-foreground hover:text-foreground border-transparent hover:border-foreground/50"
                              }`}
                            >
                              {item.label[language]}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
