"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  CELEBRATION_COMPOSITION_EASE,
  CELEBRATION_ENTRANCE_SEC,
} from "@/lib/motion/celebration-composition-motion";
import { cn } from "@/lib/utils";

type CelebrationBubbleSpec = {
  left: string;
  top: string;
  sizeRem: number;
  fillVar: string;
  edgeVar: string;
  entranceIndex: number;
  driftDuration: number;
};

/** Twenty bubbles — edges and mid-zone; sizes bumped for readability. */
const CELEBRATION_BUBBLES: CelebrationBubbleSpec[] = [
  { left: "6%", top: "10%", sizeRem: 1.65, fillVar: "--adventure-celebration-bubble-sky", edgeVar: "--adventure-celebration-bubble-sky-edge", entranceIndex: 0, driftDuration: 6.2 },
  { left: "94%", top: "9%", sizeRem: 1.75, fillVar: "--adventure-celebration-bubble-pink", edgeVar: "--adventure-celebration-bubble-pink-edge", entranceIndex: 1, driftDuration: 5.8 },
  { left: "4%", top: "26%", sizeRem: 1.85, fillVar: "--adventure-celebration-bubble-green", edgeVar: "--adventure-celebration-bubble-green-edge", entranceIndex: 2, driftDuration: 6.8 },
  { left: "96%", top: "24%", sizeRem: 1.9, fillVar: "--adventure-celebration-bubble-yellow", edgeVar: "--adventure-celebration-bubble-yellow-edge", entranceIndex: 3, driftDuration: 6.5 },
  { left: "8%", top: "42%", sizeRem: 1.7, fillVar: "--adventure-celebration-bubble-violet", edgeVar: "--adventure-celebration-bubble-violet-edge", entranceIndex: 4, driftDuration: 7 },
  { left: "92%", top: "40%", sizeRem: 1.8, fillVar: "--adventure-celebration-bubble-orange", edgeVar: "--adventure-celebration-bubble-orange-edge", entranceIndex: 5, driftDuration: 5.5 },
  { left: "5%", top: "58%", sizeRem: 2, fillVar: "--adventure-celebration-bubble-sky", edgeVar: "--adventure-celebration-bubble-sky-edge", entranceIndex: 6, driftDuration: 6.4 },
  { left: "95%", top: "56%", sizeRem: 1.95, fillVar: "--adventure-celebration-bubble-pink", edgeVar: "--adventure-celebration-bubble-pink-edge", entranceIndex: 7, driftDuration: 6.9 },
  { left: "10%", top: "72%", sizeRem: 1.6, fillVar: "--adventure-celebration-bubble-green", edgeVar: "--adventure-celebration-bubble-green-edge", entranceIndex: 8, driftDuration: 5.9 },
  { left: "90%", top: "70%", sizeRem: 1.72, fillVar: "--adventure-celebration-bubble-yellow", edgeVar: "--adventure-celebration-bubble-yellow-edge", entranceIndex: 9, driftDuration: 6.6 },
  { left: "7%", top: "86%", sizeRem: 1.55, fillVar: "--adventure-celebration-bubble-orange", edgeVar: "--adventure-celebration-bubble-orange-edge", entranceIndex: 10, driftDuration: 7.2 },
  { left: "93%", top: "84%", sizeRem: 1.68, fillVar: "--adventure-celebration-bubble-violet", edgeVar: "--adventure-celebration-bubble-violet-edge", entranceIndex: 11, driftDuration: 6.1 },
  { left: "22%", top: "18%", sizeRem: 1.5, fillVar: "--adventure-celebration-bubble-pink", edgeVar: "--adventure-celebration-bubble-pink-edge", entranceIndex: 12, driftDuration: 5.7 },
  { left: "78%", top: "17%", sizeRem: 1.58, fillVar: "--adventure-celebration-bubble-green", edgeVar: "--adventure-celebration-bubble-green-edge", entranceIndex: 13, driftDuration: 6.3 },
  { left: "26%", top: "34%", sizeRem: 1.62, fillVar: "--adventure-celebration-bubble-yellow", edgeVar: "--adventure-celebration-bubble-yellow-edge", entranceIndex: 14, driftDuration: 6.7 },
  { left: "74%", top: "33%", sizeRem: 1.7, fillVar: "--adventure-celebration-bubble-sky", edgeVar: "--adventure-celebration-bubble-sky-edge", entranceIndex: 15, driftDuration: 5.6 },
  { left: "24%", top: "52%", sizeRem: 1.75, fillVar: "--adventure-celebration-bubble-orange", edgeVar: "--adventure-celebration-bubble-orange-edge", entranceIndex: 16, driftDuration: 7.1 },
  { left: "76%", top: "51%", sizeRem: 1.82, fillVar: "--adventure-celebration-bubble-violet", edgeVar: "--adventure-celebration-bubble-violet-edge", entranceIndex: 17, driftDuration: 6.8 },
  { left: "28%", top: "68%", sizeRem: 1.52, fillVar: "--adventure-celebration-bubble-sky", edgeVar: "--adventure-celebration-bubble-sky-edge", entranceIndex: 18, driftDuration: 5.8 },
  { left: "72%", top: "67%", sizeRem: 1.6, fillVar: "--adventure-celebration-bubble-pink", edgeVar: "--adventure-celebration-bubble-pink-edge", entranceIndex: 19, driftDuration: 6.5 },
];

type CelebrationBubblesProps = {
  className?: string;
};

function CelebrationBubbles({ className }: CelebrationBubblesProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    >
      {CELEBRATION_BUBBLES.map((bubble, index) => {
        const entranceDelay =
          CELEBRATION_ENTRANCE_SEC.bubbleStart +
          bubble.entranceIndex * CELEBRATION_ENTRANCE_SEC.bubbleStagger;

        return (
          <motion.div
            key={`bubble-${index}`}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: bubble.left, top: bubble.top }}
            initial={
              reducedMotion
                ? { opacity: 0.6, y: 0, scale: 1 }
                : { opacity: 0, y: 10, scale: 0.88 }
            }
            animate={
              reducedMotion
                ? { opacity: 0.6, y: 0, scale: 1 }
                : {
                    opacity: [0.48, 0.7, 0.55, 0.65],
                    y: [0, -12, -8, -16, 0],
                    scale: 1,
                  }
            }
            transition={
              reducedMotion
                ? { duration: 0.01 }
                : {
                    opacity: {
                      duration: 0.55,
                      delay: entranceDelay,
                      ease: CELEBRATION_COMPOSITION_EASE,
                    },
                    scale: {
                      duration: 0.5,
                      delay: entranceDelay,
                      ease: CELEBRATION_COMPOSITION_EASE,
                    },
                    y: {
                      duration: bubble.driftDuration,
                      delay: entranceDelay + 0.45,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                  }
            }
          >
            <div
              className="relative rounded-full border-[2.5px] shadow-[0_4px_10px_color-mix(in_srgb,var(--adventure-text)_10%,transparent)]"
              style={{
                width: `${bubble.sizeRem}rem`,
                height: `${bubble.sizeRem}rem`,
                borderColor: `color-mix(in srgb, white 55%, var(${bubble.edgeVar}))`,
                background: `radial-gradient(circle at 28% 22%, color-mix(in srgb, white 88%, var(${bubble.fillVar})), color-mix(in srgb, var(${bubble.fillVar}) 52%, transparent) 70%)`,
                boxShadow: `inset 0 -3px 10px color-mix(in srgb, var(${bubble.fillVar}) 28%, transparent), 0 3px 8px color-mix(in srgb, var(${bubble.fillVar}) 25%, transparent)`,
              }}
            >
              <div
                className="absolute left-[14%] top-[10%] h-[42%] w-[42%] rounded-full bg-white/80"
                aria-hidden
              />
              <div
                className="absolute inset-[16%] rounded-full border-[1.5px] border-white/55"
                aria-hidden
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export { CelebrationBubbles };
