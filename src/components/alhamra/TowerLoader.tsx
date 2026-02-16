import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import splashVideo from "@/assets/splash-video.mp4";

interface TowerLoaderProps {
  durationMs?: number;
  onComplete?: () => void;
  theme?: "light" | "dark";
}

const TowerLoader = ({
  durationMs = 2400,
  onComplete,
  theme = "light",
}: TowerLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsVisible(false);
      setTimeout(() => onComplete?.(), 800);
    };

    // If video is shorter than durationMs, wait; if longer, let it play fully
    video.addEventListener("ended", handleEnded);

    // Fallback: if video fails to load, complete after durationMs
    const fallbackTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onComplete?.(), 800);
    }, Math.max(durationMs, 8000));

    return () => {
      video.removeEventListener("ended", handleEnded);
      clearTimeout(fallbackTimer);
    };
  }, [durationMs, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <video
            ref={videoRef}
            src={splashVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TowerLoader;
