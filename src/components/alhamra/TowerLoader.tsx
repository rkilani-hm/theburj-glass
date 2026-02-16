import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface TowerLoaderProps {
  durationMs?: number;
  onComplete?: () => void;
  theme?: "light" | "dark";
}

const TowerLoader = ({
  durationMs = 2200,
  onComplete,
  theme = "light",
}: TowerLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [buildProgress, setBuildProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const startTimeRef = useRef(Date.now());
  const animationFrameRef = useRef<number>();

  // Check if critical assets are loaded
  useEffect(() => {
    const checkAssets = () => {
      // Check if fonts are loaded
      if (document.fonts) {
        document.fonts.ready.then(() => {
          setAssetsLoaded(true);
        });
      } else {
        // Fallback for browsers without font loading API
        setTimeout(() => setAssetsLoaded(true), 500);
      }
    };

    if (document.readyState === "complete") {
      checkAssets();
    } else {
      window.addEventListener("load", checkAssets);
      return () => window.removeEventListener("load", checkAssets);
    }
  }, []);

  // Animation loop for build progress
  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip animation for reduced motion preference
      setBuildProgress(100);
      setIsComplete(true);
      return;
    }

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const buildDuration = durationMs * 0.7; // 70% of duration for building
      const progress = Math.min((elapsed / buildDuration) * 100, 100);
      
      setBuildProgress(progress);

      if (progress >= 100) {
        setIsComplete(true);
      } else {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [durationMs, prefersReducedMotion]);

  // Handle completion and transition
  useEffect(() => {
    if (isComplete && assetsLoaded) {
      const elapsed = Date.now() - startTimeRef.current;
      const remainingTime = Math.max(0, durationMs - elapsed);
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onComplete?.();
        }, 800); // Wait for exit animation
      }, remainingTime + 400); // Add time for completion animation

      return () => clearTimeout(timer);
    }
  }, [isComplete, assetsLoaded, durationMs, onComplete]);

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[hsl(220,15%,8%)]" : "bg-background";
  const fgColor = isDark ? "text-[hsl(40,20%,95%)]" : "text-foreground";
  const mutedColor = isDark ? "text-[hsl(220,8%,60%)]" : "text-muted-foreground";
  const borderColor = isDark ? "border-[hsl(220,12%,20%)]" : "border-border";

  // Floor lines configuration
  const floorCount = 12;
  const floors = Array.from({ length: floorCount }, (_, i) => i);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            filter: "blur(8px)",
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${bgColor}`}
        >
          {/* Architectural grid background */}
          <div className="absolute inset-0 architectural-grid opacity-20" />
          
          {/* Main content container */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Tower SVG with build animation */}
            <div className="relative">
              {/* Glow effect behind tower */}
              <motion.div
                className="absolute inset-0 blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isComplete ? [0.3, 0.5, 0.3] : buildProgress / 500,
                }}
                transition={{ 
                  duration: isComplete ? 1.5 : 0.3,
                  repeat: isComplete ? 0 : undefined,
                }}
                style={{
                  background: isDark 
                    ? `radial-gradient(ellipse at center, hsl(40 20% 95% / 0.15) 0%, transparent 70%)`
                    : `radial-gradient(ellipse at center, hsl(220 15% 15% / 0.08) 0%, transparent 70%)`,
                }}
              />

              {/* Tower container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ 
                  scale: isComplete ? [1, 1.02, 1] : 1,
                  opacity: 1,
                }}
                transition={{ 
                  scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.5 },
                }}
                className="relative"
              >
                <svg 
                  width="64" 
                  height="120" 
                  viewBox="0 0 64 120" 
                  fill="none" 
                  className={fgColor}
                  aria-hidden="true"
                >
                  {/* Definitions for masks and gradients */}
                  <defs>
                    {/* Build reveal mask - animates from bottom to top */}
                    <clipPath id="buildReveal">
                      <motion.rect
                        x="0"
                        y="120"
                        width="64"
                        height="120"
                        initial={{ y: 120 }}
                        animate={{ y: 120 - (buildProgress / 100) * 120 }}
                        transition={{ ease: "linear" }}
                      />
                    </clipPath>

                    {/* Gradient for edge glow */}
                    <linearGradient id="edgeGlow" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                      <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>

                    {/* Light sweep gradient */}
                    <linearGradient id="lightSweep" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                      <stop offset="50%" stopColor="currentColor" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Ghost outline (visible background) */}
                  <g opacity="0.1">
                    <path 
                      d="M32 4L60 28V116H4V28L32 4Z" 
                      stroke="currentColor" 
                      strokeWidth="1"
                      fill="none"
                    />
                  </g>

                  {/* Main tower structure with build reveal */}
                  <g clipPath="url(#buildReveal)">
                    {/* Tower fill */}
                    <path 
                      d="M32 0L64 26V120H0V26L32 0Z" 
                      fill="currentColor" 
                      fillOpacity="0.08"
                    />
                    
                    {/* Tower outline */}
                    <path 
                      d="M32 4L60 28V116H4V28L32 4Z" 
                      stroke="currentColor" 
                      strokeWidth="1.5"
                      fill="none"
                    />

                    {/* Central spine */}
                    <line 
                      x1="32" y1="28" x2="32" y2="116" 
                      stroke="currentColor" 
                      strokeWidth="0.75" 
                      strokeOpacity="0.5" 
                    />

                    {/* Side accents */}
                    <line x1="18" y1="38" x2="18" y2="116" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
                    <line x1="46" y1="38" x2="46" y2="116" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />

                    {/* Floor lines - animated appearance */}
                    {floors.map((floor, index) => {
                      const yPosition = 116 - (index * 7) - 10;
                      const floorProgress = ((buildProgress / 100) * 120);
                      const isRevealed = floorProgress >= (120 - yPosition);
                      
                      return (
                        <motion.line
                          key={floor}
                          x1="8"
                          y1={yPosition}
                          x2="56"
                          y2={yPosition}
                          stroke="currentColor"
                          strokeWidth="0.5"
                          initial={{ opacity: 0, pathLength: 0 }}
                          animate={{ 
                            opacity: isRevealed ? 0.25 : 0,
                            pathLength: isRevealed ? 1 : 0,
                          }}
                          transition={{ duration: 0.2, delay: index * 0.03 }}
                        />
                      );
                    })}

                    {/* Crown detail */}
                    <path 
                      d="M28 8L32 4L36 8" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                      fill="none"
                      strokeOpacity="0.6"
                    />
                  </g>

                  {/* Edge glow line following build progress */}
                  {!prefersReducedMotion && buildProgress < 100 && (
                    <motion.line
                      x1="4"
                      y1={120 - (buildProgress / 100) * 92}
                      x2="60"
                      y2={120 - (buildProgress / 100) * 92}
                      stroke="url(#edgeGlow)"
                      strokeWidth="2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                    />
                  )}

                  {/* Light sweep on completion */}
                  {isComplete && !prefersReducedMotion && (
                    <motion.rect
                      x="-10"
                      y="0"
                      width="20"
                      height="120"
                      fill="url(#lightSweep)"
                      initial={{ x: -20 }}
                      animate={{ x: 84 }}
                      transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                    />
                  )}
                </svg>

                {/* Completion pulse effect */}
                {isComplete && !prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ 
                      opacity: [0, 0.3, 0],
                      scale: [1, 1.3, 1.5],
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div 
                      className={`w-full h-full ${isDark ? 'bg-[hsl(40,20%,95%)]' : 'bg-foreground'} rounded-full opacity-20`}
                    />
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Logo text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              <span className={`text-xl tracking-[0.3em] font-light uppercase ${fgColor}`}>
                Al Hamra
              </span>
              <span className={`text-xs tracking-[0.5em] uppercase ${mutedColor}`}>
                Tower
              </span>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              {/* Progress bar */}
              <div className={`w-32 h-px ${borderColor} border overflow-hidden`}>
                <motion.div
                  className={isDark ? 'h-full bg-[hsl(40,20%,95%)]' : 'h-full bg-foreground'}
                  initial={{ width: "0%" }}
                  animate={{ width: `${buildProgress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              {/* Bilingual loading text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isComplete ? 0 : 0.6 }}
                className={`text-[10px] tracking-[0.25em] uppercase ${mutedColor}`}
              >
                {language === "ar" ? "تحميل" : "Loading"}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TowerLoader;
