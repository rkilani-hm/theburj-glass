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
