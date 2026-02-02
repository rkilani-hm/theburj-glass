import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Building2, Wifi, Zap, LayoutGrid } from "lucide-react";

interface HotspotDetail {
  id: string;
  title: { en: string; ar: string };
  subtitle?: { en: string; ar: string };
  description: { en: string; ar: string };
  specs: Array<{ label: { en: string; ar: string }; value: string }>;
}

interface HotspotDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotspot: HotspotDetail | null;
  language: "en" | "ar";
}

const iconMap: Record<string, React.ReactNode> = {
  height: <Building2 className="w-8 h-8 text-sky-500" />,
  floorplate: <LayoutGrid className="w-8 h-8 text-sky-500" />,
  fiber: <Wifi className="w-8 h-8 text-sky-500" />,
  power: <Zap className="w-8 h-8 text-sky-500" />,
};

const HotspotDetailModal = ({
  isOpen,
  onClose,
  hotspot,
  language,
}: HotspotDetailModalProps) => {
  if (!hotspot) return null;

  const isRTL = language === "ar";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="bg-white/95 backdrop-blur-xl border border-sky-200 shadow-2xl max-w-md"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-sky-50 rounded-xl border border-sky-100">
              {iconMap[hotspot.id] || <Building2 className="w-8 h-8 text-sky-500" />}
            </div>
            <div>
              <DialogTitle className="text-xl font-mono font-bold text-slate-800">
                {hotspot.title[language]}
              </DialogTitle>
              {hotspot.subtitle && (
                <DialogDescription className="text-sky-600 font-mono text-sm mt-1">
                  {hotspot.subtitle[language]}
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Description */}
          <p className="text-slate-600 leading-relaxed">
            {hotspot.description[language]}
          </p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
            {hotspot.specs.map((spec, index) => (
              <motion.div
                key={index}
                className="p-3 bg-slate-50 rounded-lg border border-slate-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-xs text-slate-500 font-mono uppercase tracking-wide">
                  {spec.label[language]}
                </p>
                <p className="text-lg font-bold text-slate-800 mt-1">
                  {spec.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-sm text-slate-500 font-mono">
              {language === "en" ? "SYSTEM STATUS" : "حالة النظام"}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-mono text-green-600">
                {language === "en" ? "OPERATIONAL" : "تشغيلي"}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HotspotDetailModal;