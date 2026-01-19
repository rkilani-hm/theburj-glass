import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeYear?: string;
  afterYear?: string;
}

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  beforeYear,
  afterYear,
}: BeforeAfterSliderProps) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleClick = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] overflow-hidden cursor-ew-resize select-none group"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt={afterLabel || "After"}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* After Label */}
        <div className={`absolute bottom-6 ${isArabic ? 'left-6' : 'right-6'} bg-foreground/80 backdrop-blur-sm px-4 py-2`}>
          {afterYear && (
            <p className="text-xs text-background/70 uppercase tracking-[0.2em]">{afterYear}</p>
          )}
          <p className="text-sm font-medium text-background">{afterLabel}</p>
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel || "Before"}
          className="w-full h-full object-cover sepia-[0.3]"
          draggable={false}
        />
        {/* Before Label */}
        <div className={`absolute bottom-6 ${isArabic ? 'right-6' : 'left-6'} bg-background/80 backdrop-blur-sm px-4 py-2`}>
          {beforeYear && (
            <p className="text-xs text-foreground/70 uppercase tracking-[0.2em]">{beforeYear}</p>
          )}
          <p className="text-sm font-medium text-foreground">{beforeLabel}</p>
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-background cursor-ew-resize z-10 group-hover:w-1.5 transition-all duration-200"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleMouseDown}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* Handle Grip */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-background rounded-full flex items-center justify-center shadow-lg border border-border"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-1">
            <svg 
              className="w-3 h-3 text-foreground rotate-180" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <svg 
              className="w-3 h-3 text-foreground" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Instruction Overlay (shows briefly) */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <div className="bg-foreground/60 backdrop-blur-sm px-6 py-3 rounded-full">
          <p className="text-sm text-background tracking-wide">
            {isArabic ? "اسحب للمقارنة" : "Drag to compare"}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BeforeAfterSlider;