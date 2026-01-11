import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "nav.tower", href: "/tower" },
    { key: "nav.perspective", href: "/perspective" },
    { key: "nav.business", href: "/business" },
    { key: "nav.services", href: "/services" },
    { key: "nav.legacy", href: "/legacy" },
    { key: "nav.leasing", href: "/leasing" },
    { key: "nav.location", href: "/location" },
    { key: "nav.contact", href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href;

  // Show light text on home page when not scrolled - use white for better contrast over video
  const showLightText = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <div className="relative">
              <span className={`text-lg md:text-xl lg:text-2xl font-light tracking-[0.15em] md:tracking-[0.2em] uppercase transition-colors duration-500 ${
                showLightText ? "text-white drop-shadow-md" : "text-foreground"
              }`}>
                Al Hamra
              </span>
              <span className={`block text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] uppercase mt-0.5 transition-colors duration-500 ${
                showLightText ? "text-white/80 drop-shadow-sm" : "text-muted-foreground"
              }`}>
                Tower
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className={`text-xs 2xl:text-sm tracking-wide transition-colors duration-300 whitespace-nowrap ${
                  showLightText
                    ? isActive(item.href)
                      ? "text-white font-medium drop-shadow-md"
                      : "text-white/90 hover:text-white drop-shadow-sm"
                    : isActive(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-3 md:gap-6">
            <button
              onClick={toggleLanguage}
              className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm tracking-wider border transition-colors duration-300 ${
                showLightText
                  ? "border-white/50 hover:bg-white/10 text-white drop-shadow-sm"
                  : "border-border hover:bg-muted text-foreground"
              }`}
            >
              {language === "en" ? "عربي" : "EN"}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`xl:hidden p-2 transition-colors duration-300 ${
                showLightText ? "text-white hover:bg-white/10" : "hover:bg-muted"
              }`}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out-expo ${
            menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-8 border-t border-border bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-lg transition-colors duration-300 ${
                    isActive(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
