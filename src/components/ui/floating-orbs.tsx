import { motion } from "framer-motion";

export const FloatingOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large orbs */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[hsl(var(--accent-blue))]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-[hsl(var(--accent-purple))]/10 rounded-full blur-3xl"
      />

      {/* Small floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30 - i * 5, 0],
            x: [0, (i % 2 === 0 ? 20 : -20), 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
          className="absolute particle"
          style={{
            top: `${10 + (i * 6)}%`,
            left: `${5 + (i * 7)}%`,
            width: `${4 + (i % 4)}px`,
            height: `${4 + (i % 4)}px`,
            background: i % 3 === 0 
              ? 'hsl(var(--primary))' 
              : i % 3 === 1 
              ? 'hsl(var(--accent-blue))' 
              : 'hsl(var(--accent-purple))',
          }}
        />
      ))}

      {/* Floating geometric shapes */}
      <motion.div
        animate={{
          rotate: 360,
          y: [0, -40, 0],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-1/3 right-1/5 w-24 h-24 border-2 border-primary/20 rounded-lg"
      />
      <motion.div
        animate={{
          rotate: -360,
          y: [0, 30, 0],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-1/3 left-1/6 w-16 h-16 border-2 border-[hsl(var(--accent-blue))]/20 rounded-full"
      />
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-2/3 left-1/2 w-20 h-20 border-2 border-[hsl(var(--accent-purple))]/20"
        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
      />
    </div>
  );
};
