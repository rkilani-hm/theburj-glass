import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "nav.tower", href: "#presence" },
    { key: "nav.perspective", href: "#perspective" },
    { key: "nav.business", href: "#business" },
    { key: "nav.services", href: "#services" },
    { key: "nav.legacy", href: "#continuity" },
    { key: "nav.location", href: "#location" },
    { key: "nav.contact", href: "#contact" },
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
              <span className="text-xl lg:text-2xl font-light tracking-[0.2em] uppercase text-foreground">
                Al Hamra
              </span>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-0.5">
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
                className="relative text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                {t(item.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-6">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 text-sm tracking-wider border border-border hover:bg-muted transition-all duration-300"
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
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-300"
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
