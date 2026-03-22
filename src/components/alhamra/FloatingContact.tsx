import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const FloatingContact = () => {
  const [open, setOpen] = useState(false);
  const { dir } = useLanguage();
  const right = dir !== "rtl";

  const items = [
    { label: "Call us",    value: "+965 2227 5000",           href: "tel:+96522275000",               route: false },
    { label: "Email",      value: "leasing@alhamratower.com", href: "mailto:leasing@alhamratower.com", route: false },
    { label: "Visit",      value: "Sharq, Kuwait City",       href: "/location",                       route: true  },
  ];

  return (
    <div className={`fixed bottom-6 ${right ? "right-6" : "left-6"} z-40`}>
      <AnimatePresence>
        {open && (
          <motion.div className="mb-3 flex flex-col gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {items.map((item, i) => {
              const card = (
                <motion.div
                  className="flex items-center gap-3 px-4 py-3 bg-white cursor-pointer"
                  style={{ border: "1px solid hsl(var(--border))", minWidth: 220, transition: "background 0.2s" }}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.06 }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#f5f5f5")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#fff")}
                >
                  <div>
                    <p className="label text-muted-foreground" style={{ fontSize: "9px", marginBottom: 2 }}>{item.label}</p>
                    <p className="font-light text-foreground" style={{ fontSize: "12px" }}>{item.value}</p>
                  </div>
                </motion.div>
              );
              return item.route
                ? <Link key={item.label} to={item.href} onClick={() => setOpen(false)}>{card}</Link>
                : <a key={item.label} href={item.href}>{card}</a>;
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button onClick={() => setOpen(!open)}
        className="flex items-center justify-center"
        style={{ width: 44, height: 44, background: open ? "#111" : "#fff", border: "1px solid hsl(var(--border))",
          cursor: "pointer", transition: "all 0.25s ease",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={e => { if (!open) { (e.currentTarget as HTMLElement).style.background = "#f5f5f5"; }}}
        onMouseLeave={e => { if (!open) { (e.currentTarget as HTMLElement).style.background = "#fff"; }}}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={14} color="#fff" />
              </motion.div>
            : <motion.div key="p" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Phone size={14} color="#666" />
              </motion.div>
          }
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingContact;
