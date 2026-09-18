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
};

const SPARKLES: SparkleSpec[] = [
  { left: "18%", top: "8%", kind: "four", color: "var(--adventure-celebration-gold-sparkle)", sizePx: 22, rotate: -12, entranceIndex: 0 },
  { left: "38%", top: "4%", kind: "five", color: "var(--adventure-celebration-gold)", sizePx: 18, rotate: 8, entranceIndex: 1 },
  { left: "62%", top: "4%", kind: "four", color: "var(--adventure-celebration-gold-sparkle)", sizePx: 20, rotate: 10, entranceIndex: 2 },
  { left: "82%", top: "8%", kind: "diamond", color: "var(--adventure-celebration-bubble-sky)", sizePx: 14, rotate: 45, entranceIndex: 3 },
  { left: "26%", top: "16%", kind: "five", color: "var(--adventure-celebration-gold-light)", sizePx: 16, rotate: -6, entranceIndex: 4 },
  { left: "74%", top: "15%", kind: "four", color: "var(--adventure-celebration-gold-sparkle)", sizePx: 21, rotate: 14, entranceIndex: 5 },
  { left: "32%", top: "52%", kind: "diamond", color: "var(--adventure-celebration-bubble-pink)", sizePx: 13, rotate: 0, entranceIndex: 6 },
  { left: "68%", top: "51%", kind: "five", color: "var(--adventure-celebration-gold)", sizePx: 17, rotate: -10, entranceIndex: 7 },
  { left: "44%", top: "58%", kind: "four", color: "var(--adventure-celebration-gold-sparkle)", sizePx: 19, rotate: 6, entranceIndex: 8 },
  { left: "56%", top: "62%", kind: "diamond", color: "var(--adventure-celebration-bubble-violet)", sizePx: 12, rotate: 45, entranceIndex: 9 },
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
  const glow = `drop-shadow(0 0 6px color-mix(in srgb, ${color} 55%, transparent))`;

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
                    scale: [0.85, 1.15, 0.92, 1.08],
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
                      duration: 2.8,
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
