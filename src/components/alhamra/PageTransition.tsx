import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "tween" as const,
  ease: "easeInOut" as const,
  duration: 0.4,
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
