"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const SOFT_BUBBLES = [
  { left: "22%", top: "32%", size: 1.25, delay: 0 },
  { left: "68%", top: "28%", size: 0.95, delay: 0.4 },
  { left: "38%", top: "58%", size: 1.1, delay: 0.2 },
  { left: "58%", top: "62%", size: 0.85, delay: 0.55 },
  { left: "75%", top: "38%", size: 1.05, delay: 0.75 },
  { left: "30%", top: "44%", size: 0.75, delay: 0.9 },
] as const;

type CelebrationSoftBubblesProps = {
  className?: string;
};

function CelebrationSoftBubbles({ className }: CelebrationSoftBubblesProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden
    >
      {SOFT_BUBBLES.map((bubble, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border border-white/55 bg-white/25 shadow-[inset_0_0_12px_rgb(255_255_255_/_0.45)]"
          style={{
            left: bubble.left,
            top: bubble.top,
            width: `${bubble.size}rem`,
            height: `${bubble.size}rem`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            reducedMotion
              ? { opacity: 0.5, y: 0 }
              : {
                  opacity: [0, 0.55, 0.45, 0.5],
                  y: [0, -14, -8, -18],
                  x: [0, 4, -3, 2],
                }
          }
          transition={{
            duration: reducedMotion ? 0.35 : 5.5,
            delay: bubble.delay,
            repeat: reducedMotion ? 0 : Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export { CelebrationSoftBubbles };
