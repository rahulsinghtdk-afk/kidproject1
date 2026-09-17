"use client";

import { motion, useReducedMotion } from "motion/react";
import { CLAP_CELEBRATION_MS } from "@/lib/audio/play-clap-sound";
import { cn } from "@/lib/utils";

type CelebrationBubbleSpec = {
  left: string;
  top: string;
  sizeRem: number;
  fillVar: string;
  edgeVar: string;
  delay: number;
};

const CELEBRATION_BUBBLES: CelebrationBubbleSpec[] = [
  {
    left: "8%",
    top: "70%",
    sizeRem: 9.5,
    fillVar: "--adventure-celebration-bubble-yellow",
    edgeVar: "--adventure-celebration-bubble-yellow-edge",
    delay: 0,
  },
  {
    left: "84%",
    top: "66%",
    sizeRem: 10.5,
    fillVar: "--adventure-celebration-bubble-sky",
    edgeVar: "--adventure-celebration-bubble-sky-edge",
    delay: 0.06,
  },
  {
    left: "14%",
    top: "26%",
    sizeRem: 8.5,
    fillVar: "--adventure-celebration-bubble-orange",
    edgeVar: "--adventure-celebration-bubble-orange-edge",
    delay: 0.1,
  },
  {
    left: "78%",
    top: "24%",
    sizeRem: 9,
    fillVar: "--adventure-celebration-bubble-green",
    edgeVar: "--adventure-celebration-bubble-green-edge",
    delay: 0.04,
  },
  {
    left: "46%",
    top: "80%",
    sizeRem: 11,
    fillVar: "--adventure-celebration-bubble-pink",
    edgeVar: "--adventure-celebration-bubble-pink-edge",
    delay: 0.08,
  },
  {
    left: "52%",
    top: "14%",
    sizeRem: 8.75,
    fillVar: "--adventure-celebration-bubble-violet",
    edgeVar: "--adventure-celebration-bubble-violet-edge",
    delay: 0.12,
  },
  {
    left: "6%",
    top: "44%",
    sizeRem: 8.25,
    fillVar: "--adventure-celebration-bubble-sky",
    edgeVar: "--adventure-celebration-bubble-sky-edge",
    delay: 0.14,
  },
  {
    left: "90%",
    top: "46%",
    sizeRem: 9.25,
    fillVar: "--adventure-celebration-bubble-yellow",
    edgeVar: "--adventure-celebration-bubble-yellow-edge",
    delay: 0.02,
  },
];

type CelebrationBubblesProps = {
  className?: string;
};

function CelebrationBubbles({ className }: CelebrationBubblesProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const durationSec = CLAP_CELEBRATION_MS / 1000;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_srgb,var(--adventure-celebration-bubble-yellow)_12%,transparent),transparent_72%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.55, 0.4] }}
        transition={{ duration: durationSec * 0.6, ease: [0.42, 0, 0.2, 1] }}
      />

      {CELEBRATION_BUBBLES.map((bubble, index) => (
        <motion.div
          key={`${bubble.left}-${bubble.top}-${index}`}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: bubble.left, top: bubble.top }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={
            reducedMotion
              ? { scale: 1, opacity: 1, y: 0 }
              : {
                  scale: [0.85, 1.04, 1],
                  opacity: [0, 1, 0.95],
                  y: [0, -4, -6],
                }
          }
          transition={{
            duration: reducedMotion ? 0.35 : durationSec * 0.85,
            delay: reducedMotion ? 0 : bubble.delay,
            ease: [0.42, 0, 0.2, 1],
            times: reducedMotion ? undefined : [0, 0.35, 1],
          }}
        >
          <div
            className="relative rounded-full border-[5px] shadow-[var(--adventure-shadow-md)]"
            style={{
              width: `${bubble.sizeRem}rem`,
              height: `${bubble.sizeRem}rem`,
              borderColor: `var(${bubble.edgeVar})`,
              background: `radial-gradient(circle at 30% 26%, color-mix(in srgb, white 70%, var(${bubble.fillVar})), var(${bubble.fillVar}) 55%, var(${bubble.edgeVar}) 100%)`,
              boxShadow: `0 6px 20px color-mix(in srgb, var(${bubble.fillVar}) 45%, transparent), var(--adventure-shadow-md)`,
            }}
          >
            <div
              className="absolute left-[18%] top-[14%] h-[40%] w-[40%] rounded-full bg-white/70"
              aria-hidden
            />
            <div
              className="absolute inset-[16%] rounded-full border-[3px] border-white/50"
              aria-hidden
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export { CelebrationBubbles };
