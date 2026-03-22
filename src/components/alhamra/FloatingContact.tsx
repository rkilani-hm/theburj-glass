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
    { icon: Phone, label: "Call",    value: "+965 2227 5000", href: "tel:+96522275000", isRoute: false },
    { icon: Mail,  label: "Email",   value: "leasing@alhamratower.com", href: "mailto:leasing@alhamratower.com", isRoute: false },
    { icon: MapPin,label: "Visit",   value: "Sharq, Kuwait City", href: "/location", isRoute: true },
  ];

  return (
    <div className={`fixed bottom-8 ${isRTL ? "left-6" : "right-6"} z-40`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mb-4 flex flex-col gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {options.map((opt, i) => {
              const inner = (
                <motion.div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                  style={{
                    background: "rgba(10,10,10,0.92)",
                    backdropFilter: "blur(30px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    minWidth: 210,
                  }}
                  initial={{ opacity: 0, x: isRTL ? -20 : 20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -20 : 20, y: 10 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ background: "rgba(20,20,20,0.95)", borderColor: "rgba(201,169,110,0.2)" }}
                >
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: 32, height: 32, borderRadius: 50,
                      background: "rgba(201,169,110,0.1)",
                      border: "1px solid rgba(201,169,110,0.2)",
                    }}
                  >
                    <opt.icon size={13} style={{ color: "hsl(var(--silk-gold))" }} />
                  </div>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 2 }}>
                      {opt.label}
                    </p>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", fontWeight: 300, letterSpacing: "0.02em" }}>
                      {opt.value}
                    </p>
                  </div>
                </motion.div>
              );

              return opt.isRoute
                ? <Link key={opt.label} to={opt.href} onClick={() => setIsOpen(false)}>{inner}</Link>
                : <a key={opt.label} href={opt.href}>{inner}</a>;
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center"
        style={{
          width: 48, height: 48,
          background: isOpen ? "rgba(201,169,110,0.15)" : "rgba(10,10,10,0.9)",
          backdropFilter: "blur(30px)",
          border: `1px solid ${isOpen ? "rgba(201,169,110,0.35)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: 50,
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          transition: "all 0.3s ease",
        }}
        whileHover={{
          background: "rgba(201,169,110,0.12)",
          borderColor: "rgba(201,169,110,0.3)",
          scale: 1.05,
        }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={16} style={{ color: "hsl(var(--silk-gold))" }} />
              </motion.div>
            : <motion.div key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Phone size={14} style={{ color: "rgba(255,255,255,0.6)" }} />
              </motion.div>
          }
        </AnimatePresence>

        {/* Pulse ring — only when closed */}
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(201,169,110,0.3)" }}
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", repeatDelay: 1 }}
          />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingContact;
