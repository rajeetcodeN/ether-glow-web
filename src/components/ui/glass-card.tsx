import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className, hover = true }: GlassCardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
      className={cn(
        "glass rounded-xl p-6 transition-all duration-300",
        hover && "hover:glow-orange cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
