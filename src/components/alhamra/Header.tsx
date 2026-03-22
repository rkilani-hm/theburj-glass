import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import alHamraLogo from "@/assets/al-hamra-logo.png";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: { en: "The Tower", ar: "البرج" }, href: "/tower" },
  { label: { en: "Business",  ar: "الأعمال" }, href: "/business/workplace-experience" },
  { label: { en: "Leasing",   ar: "التأجير" }, href: "/leasing/opportunities" },
  { label: { en: "Location",  ar: "الموقع" }, href: "/location" },
  { label: { en: "Contact",   ar: "التواصل" }, href: "/leasing/contact" },
];

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
          borderBottom: scrolled ? "1px solid hsl(var(--border))" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="container-fluid flex items-center justify-between" style={{ height: scrolled ? 60 : 72, transition: "height 0.4s ease" }}>

          {/* Logo */}
          <Link to="/">
            <img src={alHamraLogo} alt="Al Hamra Tower"
              style={{ height: scrolled ? 36 : 44, width: "auto", objectFit: "contain", transition: "height 0.4s ease" }} />
          </Link>

          {/* Desktop nav — fluid.glass style: simple horizontal list */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map(n => (
              <Link key={n.href} to={n.href}
                className="label transition-colors duration-200"
                style={{ color: isActive(n.href) ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))", letterSpacing: "0.1em" }}
                onMouseEnter={e => (e.currentTarget.style.color = "hsl(var(--foreground))")}
                onMouseLeave={e => (e.currentTarget.style.color = isActive(n.href) ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))")}
              >
                {n.label[language]}
              </Link>
            ))}
          </nav>

          {/* Right: lang + CTA */}
          <div className="flex items-center gap-4">
            <button onClick={toggleLanguage}
              className="label transition-colors duration-200 hover:text-foreground"
              style={{ color: "hsl(var(--muted-foreground))", background: "none", border: "none", cursor: "pointer" }}>
              {language === "en" ? "عربي" : "EN"}
            </button>

            <Link to="/leasing/opportunities" className="btn-solid hidden lg:inline-flex" style={{ padding: "10px 22px" }}>
              Get in touch
            </Link>

            {/* Mobile burger */}
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — full-screen, fluid.glass style */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden flex flex-col justify-between"
            style={{ background: "#fff", paddingTop: 72 }}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container-fluid py-12 flex flex-col gap-2">
              {NAV.map((n, i) => (
                <motion.div key={n.href}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={n.href} onClick={() => setMenuOpen(false)}
                    className="block py-4 font-serif font-light border-b"
                    style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.02em", borderColor: "hsl(var(--border))",
                      color: isActive(n.href) ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
                  >
                    {n.label[language]}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="container-fluid py-8 flex items-center justify-between" style={{ borderTop: "1px solid hsl(var(--border))" }}>
              <a href="tel:+96522275000" className="label text-muted-foreground hover:text-foreground transition-colors">+965 2227 5000</a>
              <button onClick={toggleLanguage} className="label text-muted-foreground hover:text-foreground transition-colors"
                style={{ background: "none", border: "none", cursor: "pointer" }}>
                {language === "en" ? "عربي" : "English"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
