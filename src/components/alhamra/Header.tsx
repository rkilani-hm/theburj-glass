import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = ["presence", "perspective", "business", "services", "continuity", "location", "contact"];
  const activeSection = useScrollSpy(sectionIds, 150);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "nav.tower", href: "#presence", section: "presence" },
    { key: "nav.perspective", href: "#perspective", section: "perspective" },
    { key: "nav.business", href: "#business", section: "business" },
    { key: "nav.services", href: "#services", section: "services" },
    { key: "nav.legacy", href: "#continuity", section: "continuity" },
    { key: "nav.location", href: "#location", section: "location" },
    { key: "nav.contact", href: "#contact", section: "contact" },
  ];

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
          <a href="#" className="flex items-center group">
            <div className="relative">
              <span className={`text-xl lg:text-2xl font-light tracking-[0.2em] uppercase transition-all duration-500 ${
                scrolled ? "text-foreground" : "text-charcoal-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]"
              }`}>
                Al Hamra
              </span>
              <span className={`block text-[10px] tracking-[0.3em] uppercase mt-0.5 transition-all duration-500 ${
                scrolled ? "text-muted-foreground" : "text-charcoal-700 drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]"
              }`}>
                Tower
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`relative text-sm tracking-wide transition-all duration-300 group ${
                  scrolled
                    ? activeSection === item.section
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                    : activeSection === item.section
                      ? "text-charcoal-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]"
                      : "text-charcoal-700 hover:text-charcoal-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]"
                }`}
              >
                {t(item.key)}
                <span
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                    scrolled ? "bg-foreground" : "bg-charcoal-900"
                  } ${activeSection === item.section ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </a>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-6">
            <button
              onClick={toggleLanguage}
              className={`px-4 py-2 text-sm tracking-wider border transition-all duration-300 ${
                scrolled 
                  ? "border-border hover:bg-muted text-foreground" 
                  : "border-charcoal-400 hover:bg-charcoal-100/50 text-charcoal-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]"
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
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-8 border-t border-border">
            <div className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-lg transition-colors duration-300 ${
                    activeSection === item.section
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {t(item.key)}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
