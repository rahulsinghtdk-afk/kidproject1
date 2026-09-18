"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  CELEBRATION_COMPOSITION_EASE,
  CELEBRATION_ENTRANCE_SEC,
} from "@/lib/motion/celebration-composition-motion";
import { cn } from "@/lib/utils";

type SparkleKind = "four" | "five" | "diamond";

type SparkleSpec = {
  left: string;
  top: string;
  kind: SparkleKind;
  color: string;
  sizePx: number;
  rotate: number;
  entranceIndex: number;
  twinkleDuration: number;
};

const SPARKLES: SparkleSpec[] = [
  { left: "14%", top: "10%", kind: "four", color: "var(--adventure-celebration-gold-sparkle)", sizePx: 24, rotate: -12, entranceIndex: 0, twinkleDuration: 2.6 },
  { left: "36%", top: "5%", kind: "five", color: "var(--adventure-celebration-gold)", sizePx: 20, rotate: 8, entranceIndex: 1, twinkleDuration: 3.1 },
  { left: "64%", top: "5%", kind: "four", color: "var(--adventure-celebration-gold-sparkle)", sizePx: 22, rotate: 10, entranceIndex: 2, twinkleDuration: 2.9 },
  { left: "86%", top: "10%", kind: "diamond", color: "var(--adventure-celebration-bubble-sky)", sizePx: 16, rotate: 45, entranceIndex: 3, twinkleDuration: 3.4 },
  { left: "24%", top: "20%", kind: "five", color: "var(--adventure-celebration-gold-light)", sizePx: 18, rotate: -6, entranceIndex: 4, twinkleDuration: 2.8 },
  { left: "76%", top: "19%", kind: "four", color: "var(--adventure-celebration-gold-sparkle)", sizePx: 23, rotate: 14, entranceIndex: 5, twinkleDuration: 3.2 },
  { left: "28%", top: "52%", kind: "diamond", color: "var(--adventure-celebration-bubble-pink)", sizePx: 15, rotate: 0, entranceIndex: 6, twinkleDuration: 3.5 },
  { left: "72%", top: "51%", kind: "five", color: "var(--adventure-celebration-gold)", sizePx: 19, rotate: -10, entranceIndex: 7, twinkleDuration: 2.7 },
  { left: "42%", top: "62%", kind: "four", color: "var(--adventure-celebration-gold-sparkle)", sizePx: 21, rotate: 6, entranceIndex: 8, twinkleDuration: 3 },
  { left: "58%", top: "66%", kind: "diamond", color: "var(--adventure-celebration-bubble-violet)", sizePx: 14, rotate: 45, entranceIndex: 9, twinkleDuration: 3.3 },
];

function SparkleShape({
  kind,
  color,
  sizePx,
}: {
  kind: SparkleKind;
  color: string;
  sizePx: number;
}) {
  const glow = `drop-shadow(0 0 8px color-mix(in srgb, ${color} 60%, transparent))`;

  if (kind === "five") {
    return (
      <svg
        width={sizePx}
        height={sizePx}
        viewBox="0 0 24 24"
        className="block"
        style={{ filter: glow }}
        aria-hidden
      >
        <path
          d="M12 1.5 L14.6 9.2 L22.5 12 L14.6 14.8 L12 22.5 L9.4 14.8 L1.5 12 L9.4 9.2 Z"
          fill={color}
        />
      </svg>
    );
  }

  if (kind === "diamond") {
    return (
      <svg
        width={sizePx}
        height={sizePx}
        viewBox="0 0 16 16"
        className="block"
        style={{ filter: glow }}
        aria-hidden
      >
        <path d="M8 0 L14 8 L8 16 L2 8 Z" fill={color} />
      </svg>
    );
  }

  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="0 0 24 24"
      className="block"
      style={{ filter: glow }}
      aria-hidden
    >
      <path
        d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
        fill={color}
      />
    </svg>
  );
}

type CelebrationSparklesProps = {
  className?: string;
};

function CelebrationSparkles({ className }: CelebrationSparklesProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-[4]", className)}
      aria-hidden
    >
      {SPARKLES.map((sparkle, index) => {
        const entranceDelay =
          CELEBRATION_ENTRANCE_SEC.sparkleStart +
          sparkle.entranceIndex * CELEBRATION_ENTRANCE_SEC.sparkleStagger;

        return (
          <motion.div
            key={`sparkle-${index}`}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              rotate: sparkle.rotate,
            }}
            initial={
              reducedMotion
                ? { opacity: 0.95, scale: 1 }
                : { opacity: 0, scale: 0.4 }
            }
            animate={
              reducedMotion
                ? { opacity: 0.95, scale: 1 }
                : {
                    opacity: [0.55, 1, 0.65, 0.95],
                    scale: [0.85, 1.18, 0.92, 1.1],
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
                      duration: sparkle.twinkleDuration,
                      delay: entranceDelay + 0.12,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                  }
            }
          >
            <SparkleShape
              kind={sparkle.kind}
              color={sparkle.color}
              sizePx={sparkle.sizePx}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export { CelebrationSparkles };
