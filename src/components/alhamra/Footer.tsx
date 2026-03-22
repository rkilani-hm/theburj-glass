import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import towerBW from "@/assets/tower-bw-1.png";

const Footer = () => {
  const { language } = useLanguage();

  const columns = [
    {
      title: { en: "The Tower", ar: "البرج" },
      links: [
        { label: { en: "Overview",           ar: "نظرة عامة" },        href: "/tower" },
        { label: { en: "Rising",             ar: "الصعود" },            href: "/tower/rising" },
        { label: { en: "Design & Engineering", ar: "التصميم والهندسة" }, href: "/tower/design" },
        { label: { en: "Sustainability",     ar: "الاستدامة" },          href: "/tower/sustainability" },
        { label: { en: "Awards",             ar: "الجوائز" },            href: "/tower/recognition" },
      ],
    },
    {
      title: { en: "Business", ar: "الأعمال" },
      links: [
        { label: { en: "Workplace Experience", ar: "تجربة مكان العمل" }, href: "/business/workplace-experience" },
        { label: { en: "Office Spaces",        ar: "المساحات المكتبية" }, href: "/business/office-spaces" },
        { label: { en: "Vertical Transport",   ar: "النقل العمودي" },    href: "/business/vertical-transportation" },
        { label: { en: "Connectivity",         ar: "الاتصال" },           href: "/business/connectivity" },
      ],
    },
    {
      title: { en: "Leasing", ar: "التأجير" },
      links: [
        { label: { en: "Opportunities", ar: "فرص التأجير" }, href: "/leasing/opportunities" },
        { label: { en: "Inquiry",       ar: "استفسار" },     href: "/leasing/inquiry" },
        { label: { en: "Downloads",     ar: "التنزيلات" },   href: "/leasing/downloads" },
        { label: { en: "Contact",       ar: "التواصل" },      href: "/leasing/contact" },
        { label: { en: "Location",      ar: "الموقع" },       href: "/location" },
      ],
    },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Subtle gold top border */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent 5%, rgba(201,169,110,0.2) 50%, transparent 95%)" }} />

      {/* BW tower silhouette — right side */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none select-none"
        style={{ width: "28vw", maxWidth: 380, opacity: 0.035 }}
      >
        <img src={towerBW} alt="" className="w-full h-auto object-contain object-bottom" />
      </div>

      {/* Main grid */}
      <div className="container mx-auto px-6 lg:px-12 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-12 gap-12 mb-20">

          {/* Brand column */}
          <div className="col-span-12 md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <span
                  className="font-serif font-light text-white/80 block"
                  style={{ fontSize: "1.4rem", letterSpacing: "0.06em" }}
                >
                  Al Hamra
                </span>
                <span
                  className="font-light text-white/30 block"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", marginTop: 2 }}
                >
                  Business Tower · Kuwait City
                </span>
              </div>

              <div style={{ height: 1, width: 48, background: "linear-gradient(90deg, rgba(201,169,110,0.4), transparent)", marginBottom: 20 }} />

              <p
                className="text-white/30 leading-relaxed mb-8"
                style={{ fontSize: "0.825rem", lineHeight: 1.9, maxWidth: 260 }}
              >
                Kuwait's architectural landmark. A structure of absolute presence, rising 412 metres above the city.
              </p>

              {/* Social links */}
              <div className="flex gap-3">
                {["Li", "X", "Ig"].map((s) => (
                  <motion.a
                    key={s}
                    href="#"
                    className="flex items-center justify-center"
                    style={{
                      width: 32, height: 32,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 50,
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.35)",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    whileHover={{ background: "rgba(201,169,110,0.1)", borderColor: "rgba(201,169,110,0.25)", color: "hsl(var(--silk-gold))" }}
                  >
                    {s}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Nav columns */}
          {columns.map((col, ci) => (
            <motion.div
              key={ci}
              className="col-span-6 md:col-span-2 lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: ci * 0.1 }}
            >
              <p
                className="mb-5"
                style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,169,110,0.5)", fontWeight: 400 }}
              >
                {col.title[language]}
              </p>
              <nav className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-white/30 hover:text-white/70 transition-colors duration-300"
                    style={{ fontSize: "12px", fontWeight: 300, letterSpacing: "0.04em" }}
                  >
                    {link.label[language]}
                  </Link>
                ))}
              </nav>
            </motion.div>
          ))}

          {/* Contact column */}
          <motion.div
            className="col-span-12 md:col-span-4 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p
              className="mb-5"
              style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,169,110,0.5)", fontWeight: 400 }}
            >
              Contact
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: "Phone", value: "+965 2227 5000", href: "tel:+96522275000" },
                { label: "Email", value: "leasing@alhamratower.com", href: "mailto:leasing@alhamratower.com" },
                { label: "Location", value: "Sharq District\nKuwait City, Kuwait", href: "/location" },
              ].map((c) => (
                <div key={c.label}>
                  <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 4 }}>{c.label}</p>
                  <a
                    href={c.href}
                    className="text-white/45 hover:text-white/75 transition-colors duration-300"
                    style={{ fontSize: "11px", fontWeight: 300, lineHeight: 1.6, whiteSpace: "pre-line" }}
                  >
                    {c.value}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
            © 2026 Al Hamra Real Estate Company. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use"].map((t) => (
              <a key={t} href="#" className="text-white/20 hover:text-white/50 transition-colors duration-300"
                style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll-to-top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute right-8 top-8 flex items-center justify-center"
        style={{
          width: 36, height: 36,
          background: "rgba(201,169,110,0.08)",
          border: "1px solid rgba(201,169,110,0.2)",
          borderRadius: 50,
          color: "rgba(201,169,110,0.5)",
          cursor: "pointer",
        }}
        whileHover={{ background: "rgba(201,169,110,0.15)", color: "hsl(var(--silk-gold))" }}
        whileTap={{ scale: 0.92 }}
        aria-label="Back to top"
      >
        <ArrowUp size={14} />
      </motion.button>
    </footer>
  );
};

export default Footer;
