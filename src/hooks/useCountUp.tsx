import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
}

export const useCountUp = ({ end, duration = 2000, delay = 0, decimals = 0 }: UseCountUpOptions) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now() + delay;
    const endTime = startTime + duration;

    const animate = () => {
      const now = Date.now();
      
      if (now < startTime) {
        requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((now - startTime) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = easeProgress * end;
      
      setCount(Number(currentValue.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration, delay, decimals]);

  return { count, ref, isInView };
};

export default useCountUp;