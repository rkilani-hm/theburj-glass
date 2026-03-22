import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dir } = useLanguage();
  const isRTL = dir === "rtl";

  const options = [
    { icon: Phone, label: "Call",   value: "+965 2227 5000",            href: "tel:+96522275000",              isRoute: false },
    { icon: Mail,  label: "Email",  value: "leasing@alhamratower.com",  href: "mailto:leasing@alhamratower.com",isRoute: false },
    { icon: MapPin,label: "Visit",  value: "Sharq, Kuwait City",        href: "/location",                     isRoute: true  },
  ];

  return (
    <div className={`fixed bottom-8 ${isRTL ? "left-6" : "right-6"} z-40`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div className="mb-3 flex flex-col gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {options.map((opt, i) => {
              const card = (
                <motion.div className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.94)", backdropFilter: "blur(32px) saturate(160%)",
                    WebkitBackdropFilter: "blur(32px) saturate(160%)", border: "1px solid hsl(var(--border))",
                    borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.07)", minWidth: 200 }}
                  initial={{ opacity: 0, x: isRTL ? -20 : 20, y: 8 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  transition={{ delay: i * 0.07, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ borderColor: "hsl(var(--sky-light))", background: "rgba(255,255,255,0.99)" }}
                >
                  <div className="flex items-center justify-center shrink-0"
                    style={{ width: 30, height: 30, borderRadius: 50, background: "hsl(var(--sky-pale))", border: "1px solid hsl(var(--sky-light))" }}>
                    <opt.icon size={13} style={{ color: "hsl(var(--sky))" }} />
                  </div>
                  <div>
                    <p className="label-subtle text-muted-foreground/60" style={{ fontSize: "8px", marginBottom: 2 }}>{opt.label}</p>
                    <p className="text-foreground/80" style={{ fontSize: "12px", fontWeight: 300 }}>{opt.value}</p>
                  </div>
                </motion.div>
              );
              return opt.isRoute
                ? <Link key={opt.label} to={opt.href} onClick={() => setIsOpen(false)} style={{ textDecoration: "none" }}>{card}</Link>
                : <a key={opt.label} href={opt.href} style={{ textDecoration: "none" }}>{card}</a>;
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center"
        style={{
          width: 46, height: 46,
          background: isOpen ? "hsl(var(--sky))" : "rgba(255,255,255,0.9)",
          backdropFilter: "blur(24px)", borderRadius: 50, cursor: "pointer",
          border: `1px solid ${isOpen ? "hsl(var(--sky))" : "hsl(var(--border))"}`,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
        }}
        whileHover={{ background: isOpen ? "hsl(var(--sky-dark))" : "hsl(var(--sky-pale))", borderColor: "hsl(var(--sky-light))", scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={15} style={{ color: "#fff" }} /></motion.div>
            : <motion.div key="p" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Phone size={14} style={{ color: "hsl(var(--sky))" }} /></motion.div>
          }
        </AnimatePresence>
        {!isOpen && (
          <motion.span className="absolute inset-0 rounded-full"
            style={{ border: "1px solid hsl(var(--sky-light))" }}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", repeatDelay: 1 }}
          />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingContact;
