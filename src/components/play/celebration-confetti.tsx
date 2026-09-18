"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type ConfettiPiece = {
  left: string;
  color: string;
  shape: "rect" | "dot" | "strip";
  size: number;
  delay: number;
  drift: number;
};

const CONFETTI: ConfettiPiece[] = [
  { left: "12%", color: "var(--adventure-celebration-bubble-yellow)", shape: "rect", size: 6, delay: 0, drift: 8 },
  { left: "22%", color: "var(--adventure-celebration-bubble-pink)", shape: "dot", size: 5, delay: 0.3, drift: -6 },
  { left: "35%", color: "var(--adventure-celebration-bubble-sky)", shape: "strip", size: 7, delay: 0.15, drift: 10 },
  { left: "48%", color: "var(--adventure-celebration-bubble-green)", shape: "rect", size: 5, delay: 0.5, drift: -4 },
  { left: "55%", color: "var(--adventure-primary)", shape: "dot", size: 4, delay: 0.2, drift: 6 },
  { left: "62%", color: "var(--adventure-celebration-bubble-orange)", shape: "strip", size: 6, delay: 0.45, drift: -8 },
  { left: "70%", color: "var(--adventure-celebration-bubble-violet)", shape: "rect", size: 5, delay: 0.1, drift: 5 },
  { left: "78%", color: "var(--adventure-celebration-bubble-yellow)", shape: "dot", size: 5, delay: 0.6, drift: -5 },
  { left: "85%", color: "var(--adventure-celebration-bubble-sky)", shape: "strip", size: 6, delay: 0.35, drift: 7 },
  { left: "40%", color: "var(--adventure-celebration-bubble-pink)", shape: "dot", size: 4, delay: 0.55, drift: -7 },
  { left: "28%", color: "var(--adventure-celebration-bubble-green)", shape: "rect", size: 5, delay: 0.25, drift: 9 },
  { left: "90%", color: "var(--adventure-celebration-bubble-orange)", shape: "dot", size: 4, delay: 0.4, drift: 4 },
];

type CelebrationConfettiProps = {
  className?: string;
};

function CelebrationConfetti({ className }: CelebrationConfettiProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-[72%] overflow-hidden",
        className
      )}
      aria-hidden
    >
      {CONFETTI.map((piece, index) => (
        <motion.div
          key={index}
          className="absolute top-[-8%]"
          style={{ left: piece.left }}
          initial={{ opacity: 0, y: 0, rotate: 0 }}
          animate={
            reducedMotion
              ? { opacity: 0.7, y: "55vh" }
              : {
                  opacity: [0, 1, 1, 0.6, 0],
                  y: ["0%", "28%", "52%", "78%", "100%"],
                  x: [0, piece.drift, piece.drift * 0.6, piece.drift * 1.2, piece.drift],
                  rotate: [0, 45, 120, 200, 280],
                }
          }
          transition={{
            duration: reducedMotion ? 0.01 : 4.2,
            delay: piece.delay,
            repeat: reducedMotion ? 0 : Infinity,
            repeatDelay: 1.8,
            ease: "linear",
          }}
        >
          <span
            className={cn(
              "block",
              piece.shape === "dot" && "rounded-full",
              piece.shape === "rect" && "rounded-[1px]",
              piece.shape === "strip" && "rounded-[2px]"
            )}
            style={{
              width:
                piece.shape === "strip"
                  ? `${piece.size * 0.45}px`
                  : `${piece.size}px`,
              height:
                piece.shape === "strip"
                  ? `${piece.size * 1.35}px`
                  : `${piece.size}px`,
              backgroundColor: piece.color,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export { CelebrationConfetti };
