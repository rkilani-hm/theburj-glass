import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const { language } = useLanguage();

  const columns = [
    { title: { en: "The Tower", ar: "البرج" }, links: [
      { label: { en: "Overview",           ar: "نظرة عامة" },        href: "/tower" },
      { label: { en: "Rising",             ar: "الصعود" },            href: "/tower/rising" },
      { label: { en: "Design & Engineering",ar:"التصميم والهندسة" }, href: "/tower/design" },
      { label: { en: "Sustainability",     ar: "الاستدامة" },          href: "/tower/sustainability" },
      { label: { en: "Awards",             ar: "الجوائز" },            href: "/tower/recognition" },
    ]},
    { title: { en: "Business", ar: "الأعمال" }, links: [
      { label: { en: "Workplace Experience",ar: "تجربة مكان العمل" }, href: "/business/workplace-experience" },
      { label: { en: "Office Spaces",      ar: "المساحات المكتبية" }, href: "/business/office-spaces" },
      { label: { en: "Vertical Transport", ar: "النقل العمودي" },    href: "/business/vertical-transportation" },
      { label: { en: "Connectivity",       ar: "الاتصال" },           href: "/business/connectivity" },
    ]},
    { title: { en: "Leasing", ar: "التأجير" }, links: [
      { label: { en: "Opportunities", ar: "فرص التأجير" }, href: "/leasing/opportunities" },
      { label: { en: "Inquiry",       ar: "استفسار" },     href: "/leasing/inquiry" },
      { label: { en: "Downloads",     ar: "التنزيلات" },   href: "/leasing/downloads" },
      { label: { en: "Contact",       ar: "التواصل" },      href: "/leasing/contact" },
      { label: { en: "Location",      ar: "الموقع" },       href: "/location" },
    ]},
  ];

  return (
    <footer className="relative overflow-hidden" style={{ background: "hsl(var(--secondary))", borderTop: "1px solid hsl(var(--border))" }}>

      {/* Sky accent line */}
      <div style={{ height: 3, background: "linear-gradient(90deg, transparent 5%, hsl(var(--sky)) 50%, transparent 95%)" }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 arch-grid opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-12 gap-10 mb-16">

          {/* Brand */}
          <motion.div className="col-span-12 md:col-span-4"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <div className="mb-5">
              <span className="font-serif font-light text-foreground block" style={{ fontSize: "1.5rem", letterSpacing: "0.04em" }}>Al Hamra</span>
              <span className="font-light text-muted-foreground block" style={{ fontSize: "0.6rem", letterSpacing: "0.32em", textTransform: "uppercase", marginTop: 3 }}>Business Tower · Kuwait City</span>
            </div>
            <div className="sky-line mb-5" />
            <p className="text-muted-foreground leading-relaxed mb-7" style={{ fontSize: "0.82rem", lineHeight: 1.9, maxWidth: 260 }}>
              Kuwait's architectural landmark. Rising 412 metres above the city — a place of gravity and ambition.
            </p>
            <div className="flex gap-2.5">
              {["Li", "X", "Ig"].map(s => (
                <motion.a key={s} href="#"
                  className="flex items-center justify-center text-muted-foreground hover:text-sky transition-colors duration-300"
                  style={{ width: 30, height: 30, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 50, fontSize: "10px", textDecoration: "none" }}
                  whileHover={{ background: "hsl(var(--sky-pale))", borderColor: "hsl(var(--sky-light))" }}
                >{s}</motion.a>
              ))}
            </div>
          </motion.div>

          {/* Nav columns */}
          {columns.map((col, ci) => (
            <motion.div key={ci} className="col-span-6 sm:col-span-4 md:col-span-2"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: ci * 0.08 }}
            >
              <p className="overline mb-5">{col.title[language]}</p>
              <nav className="flex flex-col gap-3">
                {col.links.map(link => (
                  <Link key={link.href} to={link.href}
                    className="text-muted-foreground hover:text-sky transition-colors duration-300"
                    style={{ fontSize: "12px", fontWeight: 300, letterSpacing: "0.04em", textDecoration: "none" }}
                  >{link.label[language]}</Link>
                ))}
              </nav>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div className="col-span-12 md:col-span-2"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.28 }}
          >
            <p className="overline mb-5">Contact</p>
            <div className="flex flex-col gap-4">
              {[
                { l: "Phone",    v: "+965 2227 5000",           h: "tel:+96522275000" },
                { l: "Email",    v: "leasing@alhamratower.com", h: "mailto:leasing@alhamratower.com" },
                { l: "Location", v: "Sharq, Kuwait City",       h: "/location" },
              ].map(c => (
                <div key={c.l}>
                  <p className="label-subtle text-muted-foreground/60 mb-1" style={{ fontSize: "8px" }}>{c.l}</p>
                  <a href={c.h} className="text-muted-foreground hover:text-sky transition-colors duration-300"
                    style={{ fontSize: "11px", fontWeight: 300, lineHeight: 1.6, textDecoration: "none" }}>{c.v}</a>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid hsl(var(--border))" }}>
          <p style={{ fontSize: "10px", color: "hsl(var(--muted-foreground))", opacity: 0.7, letterSpacing: "0.08em" }}>
            © 2026 Al Hamra Real Estate Company. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Use"].map(t => (
              <a key={t} href="#" className="text-muted-foreground/60 hover:text-sky transition-colors duration-300"
                style={{ fontSize: "10px", letterSpacing: "0.08em", textDecoration: "none" }}>{t}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Back to top */}
      <motion.button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute right-6 top-6 flex items-center justify-center"
        style={{ width: 34, height: 34, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 50, color: "hsl(var(--sky))", cursor: "pointer" }}
        whileHover={{ background: "hsl(var(--sky-pale))", borderColor: "hsl(var(--sky-light))" }}
        whileTap={{ scale: 0.92 }}
      ><ArrowUp size={13} /></motion.button>
    </footer>
  );
};

export default Footer;
