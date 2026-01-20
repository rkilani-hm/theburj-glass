import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
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
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const towerSubItems = [
    { key: "nav.tower.overview", href: "/tower", label: { en: "Overview", ar: "نظرة عامة" } },
    { key: "nav.tower.origins", href: "/tower/origins", label: { en: "Origins", ar: "البدايات" } },
    { key: "nav.tower.rising", href: "/tower/rising", label: { en: "Rising", ar: "الصعود" } },
    { key: "nav.tower.architecture", href: "/tower/architecture", label: { en: "Architecture & Design", ar: "الهندسة والتصميم" } },
    { key: "nav.tower.engineering", href: "/tower/engineering", label: { en: "Engineering", ar: "الهندسة الإنشائية" } },
    { key: "nav.tower.recognition", href: "/tower/recognition", label: { en: "Recognition", ar: "الجوائز" } },
  ];

  const connectSubItems = [
    { key: "nav.leasing", href: "/leasing", label: { en: "Leasing", ar: "التأجير" } },
    { key: "nav.location", href: "/location", label: { en: "Location", ar: "الموقع" } },
    { key: "nav.contact", href: "/contact", label: { en: "Contact", ar: "التواصل" } },
  ];

  const navItems = [
    { key: "nav.perspective", href: "/perspective" },
    { key: "nav.sustainability", href: "/tower/sustainability", label: { en: "Sustainability", ar: "الاستدامة" } },
    { key: "nav.business", href: "/business" },
    { key: "nav.services", href: "/services" },
    { key: "nav.legacy", href: "/legacy" },
  ];

  const isActive = (href: string) => location.pathname === href;
  const isTowerActive = location.pathname.startsWith("/tower");
  const isConnectActive = ["/leasing", "/location", "/contact"].includes(location.pathname);

  // Show light text on home page when not scrolled
  const showLightText = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <span className={`text-xl lg:text-2xl font-light tracking-[0.2em] uppercase transition-colors duration-500 ${
                showLightText ? "text-charcoal-900" : "text-foreground"
              }`}>
                Al Hamra
              </span>
              <span className={`block text-[10px] tracking-[0.3em] uppercase mt-0.5 transition-colors duration-500 ${
                showLightText ? "text-charcoal-700" : "text-muted-foreground"
              }`}>
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
                className={`flex items-center gap-1 text-sm tracking-wide transition-colors duration-300 ${
                  showLightText
                    ? isTowerActive
                      ? "text-charcoal-900"
                      : "text-charcoal-700 hover:text-charcoal-900"
                    : isTowerActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("nav.tower")}
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ${towerDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 pt-2 transition-all duration-300 ${
                  towerDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="bg-background/95 backdrop-blur-md border border-border shadow-lg min-w-[220px]">
                  {towerSubItems.map((item) => (
                    <Link
                      key={item.key}
                      to={item.href}
                      className={`block px-5 py-3 text-sm tracking-wide transition-colors duration-300 border-b border-border/50 last:border-0 ${
                        isActive(item.href)
                          ? "text-foreground bg-muted/50"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      }`}
                    >
                      {item.label[language]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className={`text-sm tracking-wide transition-colors duration-300 ${
                  showLightText
                    ? isActive(item.href)
                      ? "text-charcoal-900"
                      : "text-charcoal-700 hover:text-charcoal-900"
                    : isActive(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
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
                className={`flex items-center gap-1 text-sm tracking-wide transition-colors duration-300 ${
                  showLightText
                    ? isConnectActive
                      ? "text-charcoal-900"
                      : "text-charcoal-700 hover:text-charcoal-900"
                    : isConnectActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("nav.connect")}
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ${connectDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full right-0 pt-2 transition-all duration-300 ${
                  connectDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="bg-background/95 backdrop-blur-md border border-border shadow-lg min-w-[180px]">
                  {connectSubItems.map((item) => (
                    <Link
                      key={item.key}
                      to={item.href}
                      className={`block px-5 py-3 text-sm tracking-wide transition-colors duration-300 border-b border-border/50 last:border-0 ${
                        isActive(item.href)
                          ? "text-foreground bg-muted/50"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      }`}
                    >
                      {item.label[language]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-6">
            <button
              onClick={toggleLanguage}
              className={`px-4 py-2 text-sm tracking-wider border transition-colors duration-300 ${
                showLightText
                  ? "border-charcoal-400 hover:bg-charcoal-100/50 text-charcoal-900"
                  : "border-border hover:bg-muted text-foreground"
              }`}
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
          <nav className="py-6 border-t border-border bg-background/95 backdrop-blur-md">
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
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    mobileTowerOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-4 pb-2 space-y-1">
                    {towerSubItems.map((item) => (
                      <Link
                        key={item.key}
                        to={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`block py-2 text-base transition-colors duration-300 border-l-2 pl-4 ${
                          isActive(item.href)
                            ? "text-foreground border-foreground"
                            : "text-muted-foreground hover:text-foreground border-transparent hover:border-muted"
                        }`}
                      >
                        {item.label[language]}
                      </Link>
                    ))}
                  </div>
                </div>
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
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    mobileConnectOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-4 pb-2 space-y-1">
                    {connectSubItems.map((item) => (
                      <Link
                        key={item.key}
                        to={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`block py-2 text-base transition-colors duration-300 border-l-2 pl-4 ${
                          isActive(item.href)
                            ? "text-foreground border-foreground"
                            : "text-muted-foreground hover:text-foreground border-transparent hover:border-muted"
                        }`}
                      >
                        {item.label[language]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
