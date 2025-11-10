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
      whileHover={hover ? { y: -8, scale: 1.03 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "glass rounded-xl p-6 transition-all duration-300 relative overflow-hidden group",
        hover && "hover:glow-orange cursor-pointer",
        className
      )}
    >
      {/* Animated border gradient */}
      {hover && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(255,106,0,0.1), rgba(0,212,255,0.1), rgba(179,71,255,0.1))",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
