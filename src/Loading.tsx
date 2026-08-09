"use client";

import { motion } from "motion/react";

function LoadingThreeDotsJumping(): React.ReactElement {
  return (
    <div className="flex justify-center items-center gap-1.5">
      {[0, 1, 2].map((i: number) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          animate={{
            y: -10,
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

export default LoadingThreeDotsJumping;