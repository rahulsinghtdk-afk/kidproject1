"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  CELEBRATION_COMPOSITION_EASE,
  CELEBRATION_ENTRANCE_SEC,
} from "@/lib/motion/celebration-composition-motion";
import { cn } from "@/lib/utils";

type BalloonSize = "sm" | "md" | "lg";

type BalloonSpec = {
  left: string;
  top: string;
  colorVar: string;
  edgeVar: string;
  size: BalloonSize;
  floatDelay: number;
  entranceIndex: number;
  tilt: number;
  floatDuration: number;
};

const BALLOON_SIZES: Record<
  BalloonSize,
  { body: string; stringH: string }
> = {
  sm: { body: "h-[3.1rem] w-[2.55rem] sm:h-[3.3rem] sm:w-[2.7rem]", stringH: "h-5" },
  md: { body: "h-[3.95rem] w-[3.25rem] sm:h-[4.2rem] sm:w-[3.45rem]", stringH: "h-6" },
  lg: { body: "h-[4.85rem] w-[3.95rem] sm:h-[5.1rem] sm:w-[4.15rem]", stringH: "h-7" },
};

/** Ten balloons framing the celebration — varied sizes, full vertical span. */
const BALLOONS: BalloonSpec[] = [
  {
    left: "2%",
    top: "12%",
    colorVar: "--adventure-celebration-bubble-yellow",
    edgeVar: "--adventure-celebration-bubble-yellow-edge",
    size: "lg",
    floatDelay: 0,
    entranceIndex: 0,
    tilt: -6,
    floatDuration: 5.2,
  },
  {
    left: "98%",
    top: "11%",
    colorVar: "--adventure-celebration-bubble-sky",
    edgeVar: "--adventure-celebration-bubble-sky-edge",
    size: "lg",
    floatDelay: 0.35,
    entranceIndex: 1,
    tilt: 5,
    floatDuration: 5.8,
  },
  {
    left: "20%",
    top: "6%",
    colorVar: "--adventure-celebration-bubble-orange",
    edgeVar: "--adventure-celebration-bubble-orange-edge",
    size: "md",
    floatDelay: 0.15,
    entranceIndex: 2,
    tilt: -3,
    floatDuration: 4.6,
  },
  {
    left: "80%",
    top: "7%",
    colorVar: "--adventure-celebration-bubble-green",
    edgeVar: "--adventure-celebration-bubble-green-edge",
    size: "md",
    floatDelay: 0.45,
    entranceIndex: 3,
    tilt: 4,
    floatDuration: 5.5,
  },
  {
    left: "50%",
    top: "3%",
    colorVar: "--adventure-celebration-bubble-violet",
    edgeVar: "--adventure-celebration-bubble-violet-edge",
    size: "sm",
    floatDelay: 0.55,
    entranceIndex: 4,
    tilt: 0,
    floatDuration: 5.1,
  },
  {
    left: "4%",
    top: "48%",
    colorVar: "--adventure-celebration-bubble-pink",
    edgeVar: "--adventure-celebration-bubble-pink-edge",
    size: "md",
    floatDelay: 0.25,
    entranceIndex: 5,
    tilt: -5,
    floatDuration: 6.1,
  },
  {
    left: "96%",
    top: "46%",
    colorVar: "--adventure-celebration-bubble-violet",
    edgeVar: "--adventure-celebration-bubble-violet-edge",
    size: "md",
    floatDelay: 0.55,
    entranceIndex: 6,
    tilt: 6,
    floatDuration: 4.9,
  },
  {
    left: "10%",
    top: "78%",
    colorVar: "--adventure-celebration-bubble-yellow",
    edgeVar: "--adventure-celebration-bubble-yellow-edge",
    size: "sm",
    floatDelay: 0.65,
    entranceIndex: 7,
    tilt: -4,
    floatDuration: 5.4,
  },
  {
    left: "90%",
    top: "76%",
    colorVar: "--adventure-celebration-bubble-pink",
    edgeVar: "--adventure-celebration-bubble-pink-edge",
    size: "sm",
    floatDelay: 0.8,
    entranceIndex: 8,
    tilt: 3,
    floatDuration: 6.3,
  },
  {
    left: "94%",
    top: "64%",
    colorVar: "--adventure-celebration-bubble-orange",
    edgeVar: "--adventure-celebration-bubble-orange-edge",
    size: "md",
    floatDelay: 0.4,
    entranceIndex: 9,
    tilt: 5,
    floatDuration: 5.7,
  },
];

type CelebrationBalloonsProps = {
  className?: string;
};

function CelebrationBalloons({ className }: CelebrationBalloonsProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    >
      {BALLOONS.map((balloon, index) => {
        const dims = BALLOON_SIZES[balloon.size];
        const entranceDelay =
          CELEBRATION_ENTRANCE_SEC.balloonStart +
          balloon.entranceIndex * CELEBRATION_ENTRANCE_SEC.balloonStagger;

        return (
          <motion.div
            key={`balloon-${index}`}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: balloon.left, top: balloon.top }}
            initial={
              reducedMotion
                ? { opacity: 1, scale: 1, y: 0, rotate: balloon.tilt }
                : { opacity: 0, scale: 0.8, y: 12, rotate: balloon.tilt - 4 }
            }
            animate={
              reducedMotion
                ? { opacity: 1, scale: 1, y: 0, rotate: balloon.tilt }
                : {
                    opacity: 1,
                    scale: 1,
                    y: [0, -7, -11, -7, 0],
                    rotate: [balloon.tilt - 1.5, balloon.tilt + 1.5, balloon.tilt],
                  }
            }
            transition={
              reducedMotion
                ? { duration: 0.01 }
                : {
                    opacity: {
                      duration: 0.45,
                      delay: entranceDelay,
                      ease: CELEBRATION_COMPOSITION_EASE,
                    },
                    scale: {
                      duration: 0.55,
                      delay: entranceDelay,
                      ease: CELEBRATION_COMPOSITION_EASE,
                    },
                    y: {
                      duration: balloon.floatDuration,
                      delay: entranceDelay + 0.35 + balloon.floatDelay,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: balloon.floatDuration + 1.2,
                      delay: entranceDelay + 0.5 + balloon.floatDelay,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                  }
            }
          >
            <div className="relative flex flex-col items-center">
              <div
                className={cn(
                  "relative rounded-[50%_50%_48%_48%]",
                  "shadow-[0_5px_12px_color-mix(in_srgb,var(--adventure-text)_14%,transparent),var(--adventure-shadow-sm)]",
                  dims.body
                )}
                style={{
                  background: `radial-gradient(circle at 32% 26%, color-mix(in srgb, white 58%, var(${balloon.colorVar})), var(${balloon.colorVar}) 55%, var(${balloon.edgeVar}) 100%)`,
                  border: `2px solid var(${balloon.edgeVar})`,
                }}
              >
                <div
                  className="absolute left-[20%] top-[14%] h-[30%] w-[34%] rounded-full bg-white/72"
                  aria-hidden
                />
              </div>
              <div
                className={cn(
                  "mt-0.5 w-px bg-[color-mix(in_srgb,var(--adventure-text)_35%,transparent)]",
                  dims.stringH
                )}
                aria-hidden
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export { CelebrationBalloons };
