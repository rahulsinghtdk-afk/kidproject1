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
};

const CELEBRATION_BUBBLES: CelebrationBubbleSpec[] = [
  {
    left: "6%",
    top: "24%",
    sizeRem: 1.45,
    fillVar: "--adventure-celebration-bubble-sky",
    edgeVar: "--adventure-celebration-bubble-sky-edge",
    entranceIndex: 0,
  },
  {
    left: "94%",
    top: "22%",
    sizeRem: 1.6,
    fillVar: "--adventure-celebration-bubble-pink",
    edgeVar: "--adventure-celebration-bubble-pink-edge",
    entranceIndex: 1,
  },
  {
    left: "3%",
    top: "54%",
    sizeRem: 1.75,
    fillVar: "--adventure-celebration-bubble-green",
    edgeVar: "--adventure-celebration-bubble-green-edge",
    entranceIndex: 2,
  },
  {
    left: "97%",
    top: "52%",
    sizeRem: 1.85,
    fillVar: "--adventure-celebration-bubble-yellow",
    edgeVar: "--adventure-celebration-bubble-yellow-edge",
    entranceIndex: 3,
  },
  {
    left: "12%",
    top: "82%",
    sizeRem: 1.35,
    fillVar: "--adventure-celebration-bubble-violet",
    edgeVar: "--adventure-celebration-bubble-violet-edge",
    entranceIndex: 4,
  },
  {
    left: "88%",
    top: "80%",
    sizeRem: 1.5,
    fillVar: "--adventure-celebration-bubble-orange",
    edgeVar: "--adventure-celebration-bubble-orange-edge",
    entranceIndex: 5,
  },
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
            key={`${bubble.left}-${index}`}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: bubble.left, top: bubble.top }}
            initial={
              reducedMotion
                ? { opacity: 0.65, y: 0, scale: 1 }
                : { opacity: 0, y: 10, scale: 0.88 }
            }
            animate={
              reducedMotion
                ? { opacity: 0.65, y: 0, scale: 1 }
                : {
                    opacity: [0.5, 0.72, 0.58, 0.68],
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
                      duration: 6.5,
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
