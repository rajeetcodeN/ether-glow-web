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
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "glass-enhanced rounded-2xl p-6 transition-all duration-500 relative overflow-hidden group",
        hover && "hover:depth-shadow-hover cursor-pointer",
        className
      )}
    >
      {/* Shimmer effect on hover */}
      {hover && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        >
          <div className="absolute inset-0 shimmer rounded-2xl" />
        </motion.div>
      )}
      
      {/* Animated border gradient */}
      {hover && (
        <>
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(135deg, rgba(255,106,0,0.15), rgba(0,212,255,0.1), rgba(179,71,255,0.1))",
            }}
          />
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-[hsl(var(--accent-purple))]/5" />
          </div>
        </>
      )}
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
