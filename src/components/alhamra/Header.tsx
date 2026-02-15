import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import alHamraLogo from "@/assets/al-hamra-logo.png";

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [towerDropdownOpen, setTowerDropdownOpen] = useState(false);
  const [experienceDropdownOpen, setExperienceDropdownOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [leasingDropdownOpen, setLeasingDropdownOpen] = useState(false);
  // Mobile accordion states
  const [mobileTowerOpen, setMobileTowerOpen] = useState(false);
  const [mobileBusinessOpen, setMobileBusinessOpen] = useState(false);
  const [mobileExperienceOpen, setMobileExperienceOpen] = useState(false);
  const [mobileLeasingOpen, setMobileLeasingOpen] = useState(false);
  const location = useLocation();
  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const towerSubItems = [
    { key: "nav.tower.overview", href: "/tower", label: { en: "Overview", ar: "نظرة عامة" } },
    { key: "nav.tower.rising", href: "/tower/rising", label: { en: "Rising", ar: "الصعود" } },
    { key: "nav.tower.design", href: "/tower/design", label: { en: "Design & Engineering", ar: "التصميم والهندسة" } },
    { key: "nav.tower.recognition", href: "/tower/recognition", label: { en: "Awards & Recognition", ar: "الجوائز والتقدير" } },
  ];

  const businessSubItems = [
    { key: "nav.business.workplace", href: "/business/workplace-experience", label: { en: "Workplace Experience", ar: "تجربة مكان العمل" } },
    { key: "nav.business.offices", href: "/business/office-spaces", label: { en: "Office Spaces & Floor Plans", ar: "المساحات المكتبية ومخططات الطوابق" } },
    { key: "nav.business.transport", href: "/business/vertical-transportation", label: { en: "Vertical Transportation", ar: "النقل العمودي" } },
    { key: "nav.business.connectivity", href: "/business/connectivity", label: { en: "Connectivity & Integration", ar: "الاتصال والتكامل" } },
  ];

  const experienceSubItems = [
    { key: "nav.experience.services", href: "/services", label: { en: "Services & Facilities", ar: "الخدمات والمرافق" } },
    { key: "nav.experience.sustainability", href: "/tower/sustainability", label: { en: "Sustainability & Innovation", ar: "الاستدامة والابتكار" } },
    { key: "nav.experience.location", href: "/location", label: { en: "Location & Access", ar: "الموقع والوصول" } },
  ];

  const leasingSubItems = [
    { key: "nav.leasing.opportunities", href: "/leasing/opportunities", label: { en: "Leasing Opportunities", ar: "فرص التأجير" } },
    { key: "nav.leasing.inquiry", href: "/leasing/inquiry", label: { en: "Inquiry", ar: "استفسار" } },
    { key: "nav.leasing.downloads", href: "/leasing/downloads", label: { en: "Downloads", ar: "التنزيلات" } },
    { key: "nav.leasing.contact", href: "/leasing/contact", label: { en: "Contact", ar: "التواصل" } },
  ];

  const isActive = (href: string) => location.pathname === href;
  const isTowerActive = location.pathname.startsWith("/tower") && !location.pathname.startsWith("/tower/sustainability");
  const isBusinessActive = location.pathname.startsWith("/business");
  const isExperienceActive = ["/services", "/tower/sustainability", "/location"].some(p => location.pathname.startsWith(p));
  const isLeasingActive = location.pathname.startsWith("/leasing");

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
            <img 
              src={alHamraLogo} 
              alt="Al Hamra Tower" 
              className="h-14 lg:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-[clamp(1rem,1.5vw,2rem)]">
            {/* Tower Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setTowerDropdownOpen(true)}
              onMouseLeave={() => setTowerDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-[clamp(0.75rem,0.9vw,1rem)] font-semibold tracking-wide whitespace-nowrap transition-colors duration-300 ${
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

            {/* Business Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setBusinessDropdownOpen(true)}
              onMouseLeave={() => setBusinessDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-[clamp(0.75rem,0.9vw,1rem)] font-semibold tracking-wide whitespace-nowrap transition-colors duration-300 ${
                  isBusinessActive
                    ? "text-charcoal-dark"
                    : "text-charcoal-light hover:text-charcoal-dark"
                }`}
              >
                {t("nav.business")}
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ${businessDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {businessDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-2"
                  >
                    <div className="glass border border-border/50 shadow-lg min-w-[260px] overflow-hidden">
                      {businessSubItems.map((item, index) => (
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

            {/* Experience Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setExperienceDropdownOpen(true)}
              onMouseLeave={() => setExperienceDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-[clamp(0.75rem,0.9vw,1rem)] font-semibold tracking-wide whitespace-nowrap transition-colors duration-300 ${
                  isExperienceActive
                    ? "text-charcoal-dark"
                    : "text-charcoal-light hover:text-charcoal-dark"
                }`}
              >
                {language === "en" ? "Experience" : "التجربة"}
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ${experienceDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {experienceDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-2"
                  >
                    <div className="glass border border-border/50 shadow-lg min-w-[220px] overflow-hidden">
                      {experienceSubItems.map((item, index) => (
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

            {/* Leasing Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setLeasingDropdownOpen(true)}
              onMouseLeave={() => setLeasingDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-[clamp(0.75rem,0.9vw,1rem)] font-semibold tracking-wide whitespace-nowrap transition-colors duration-300 ${
                  isLeasingActive
                    ? "text-charcoal-dark"
                    : "text-charcoal-light hover:text-charcoal-dark"
                }`}
              >
                {language === "en" ? "Leasing" : "التأجير"}
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ${leasingDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {leasingDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 pt-2"
                  >
                    <div className="glass border border-border/50 shadow-lg min-w-[220px] overflow-hidden">
                      {leasingSubItems.map((item, index) => (
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

              {/* Business Section - Collapsible */}
              <div>
                <button
                  onClick={() => setMobileBusinessOpen(!mobileBusinessOpen)}
                  className={`w-full flex items-center justify-between py-3 text-lg transition-colors duration-300 ${
                    isBusinessActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span>{t("nav.business")}</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-300 ${mobileBusinessOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileBusinessOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pb-2 space-y-1">
                        {businessSubItems.map((item, index) => (
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

              {/* Experience Section - Collapsible */}
              <div>
                <button
                  onClick={() => setMobileExperienceOpen(!mobileExperienceOpen)}
                  className={`w-full flex items-center justify-between py-3 text-lg transition-colors duration-300 ${
                    isExperienceActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span>{language === "en" ? "Experience" : "التجربة"}</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-300 ${mobileExperienceOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileExperienceOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pb-2 space-y-1">
                        {experienceSubItems.map((item, index) => (
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

              {/* Leasing Section - Collapsible */}
              <div>
                <button
                  onClick={() => setMobileLeasingOpen(!mobileLeasingOpen)}
                  className={`w-full flex items-center justify-between py-3 text-lg transition-colors duration-300 ${
                    isLeasingActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span>{language === "en" ? "Leasing" : "التأجير"}</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-300 ${mobileLeasingOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileLeasingOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pb-2 space-y-1">
                        {leasingSubItems.map((item, index) => (
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
