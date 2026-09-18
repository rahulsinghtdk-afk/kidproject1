"use client";

import { motion, useReducedMotion } from "motion/react";
import { adventureMotionVariants } from "@/lib/motion/adventure-motion";
import {
  CELEBRATION_DURATION_SEC,
  CELEBRATION_EASE,
} from "@/lib/motion/celebration-motion";
import { cn } from "@/lib/utils";

type CompanionMood =
  | "curious"
  | "encouraging"
  | "celebrate"
  | "requesting"
  | "gentle-full";

type PlayCompanionCharacterProps = {
  mood: CompanionMood;
  /** True after a correct answer — mascot claps in celebration. */
  clapping?: boolean;
  className?: string;
};

const CLAP_DURATION = CELEBRATION_DURATION_SEC;

/** Clap peaks align with mascot hold beats (15%, 52%, 88%). */
const clapTimes = [0, 0.12, 0.15, 0.15, 0.38, 0.52, 0.52, 0.76, 0.88, 1] as const;

const bodyClapY = [0, -5, -7, 0, -6, -8, 0, -7, -11, -5];
const bodyClapScaleX = [1, 1.02, 1.03, 1, 1.02, 1.04, 1, 1.03, 1.05, 1.02];
const bodyClapScaleY = [1, 0.98, 0.96, 1, 0.98, 0.95, 1, 0.97, 1.03, 1];

const leftArmX = [0, 18, 22, 0, 20, 24, 0, 22, -6, -10];
const leftArmY = [0, -12, -16, 0, -14, -18, 0, -16, -20, -24];
const leftArmRotate = [0, -20, -26, 0, -22, -28, 0, -24, -32, -38];

const rightArmX = [0, -18, -22, 0, -20, -24, 0, -22, 6, 10];
const rightArmY = [0, -12, -16, 0, -14, -18, 0, -16, -20, -24];
const rightArmRotate = [0, 20, 26, 0, 22, 28, 0, 24, 32, 38];

const headTilt = [0, -2, -4, 0, -3, -5, 0, -4, -7, -4];

const clapTransition = {
  duration: CLAP_DURATION,
  ease: CELEBRATION_EASE,
  times: [...clapTimes],
};

function PlayCompanionCharacter({
  mood,
  clapping = false,
  className,
}: PlayCompanionCharacterProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const isClapping = clapping && !reducedMotion;

  const mouthPath =
    mood === "celebrate" || clapping
      ? "M 44 88 Q 60 106 76 88"
      : mood === "encouraging"
        ? "M 50 90 Q 60 96 70 90"
        : mood === "gentle-full"
          ? "M 52 92 Q 60 88 68 92"
          : mood === "requesting"
            ? "M 46 90 Q 60 102 74 90"
            : "M 48 88 Q 60 98 72 88";

  return (
    <div className={cn("relative flex shrink-0 justify-center", className)}>
      <motion.div
        className="relative flex justify-center"
        aria-hidden
        variants={isClapping ? undefined : adventureMotionVariants.float}
        initial="initial"
        animate={isClapping ? undefined : reducedMotion ? undefined : "animate"}
      >
        <motion.div
          animate={
            isClapping
              ? {
                  y: bodyClapY,
                  scaleX: bodyClapScaleX,
                  scaleY: bodyClapScaleY,
                }
              : clapping && reducedMotion
                ? { scale: [1, 1.05, 1] }
                : undefined
          }
          transition={isClapping ? clapTransition : { duration: 0.5 }}
          style={{ transformOrigin: "center bottom" }}
        >
          <svg
            viewBox="0 0 120 140"
            className="h-[min(22vw,7.5rem)] w-auto drop-shadow-[var(--adventure-shadow-md)] sm:h-[8rem] landscape:h-[7rem]"
            role="img"
            aria-label=""
          >
            <ellipse
              cx="60"
              cy="118"
              rx="42"
              ry="10"
              fill="color-mix(in srgb, var(--adventure-text) 8%, transparent)"
            />

            {isClapping ? (
              <>
                {[0, 1, 2].map((burst) => (
                  <motion.circle
                    key={burst}
                    cx={burst === 0 ? 38 : burst === 1 ? 82 : 60}
                    cy={burst === 2 ? 18 : 52}
                    r="3"
                    fill="var(--adventure-primary)"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0, 0.9, 0],
                      scale: [0, 0, 1.4, 0.2],
                    }}
                    transition={{
                      duration: CLAP_DURATION,
                      times: [0, 0.08 + burst * 0.12, 0.14 + burst * 0.12, 0.22 + burst * 0.12],
                    }}
                  />
                ))}
              </>
            ) : null}

            <ellipse cx="60" cy="78" rx="38" ry="42" fill="var(--adventure-secondary)" />
            <ellipse
              cx="60"
              cy="78"
              rx="38"
              ry="42"
              fill="none"
              stroke="var(--adventure-border-strong)"
              strokeWidth="2.5"
            />

            {isClapping ? (
              <>
                <motion.ellipse
                  cx="40"
                  cy="76"
                  rx="6"
                  ry="4"
                  fill="color-mix(in srgb, var(--adventure-orange) 45%, transparent)"
                  animate={{ opacity: [0, 0.7, 0.7, 0.5] }}
                  transition={{ duration: CLAP_DURATION, times: [0, 0.3, 0.7, 1] }}
                />
                <motion.ellipse
                  cx="80"
                  cy="76"
                  rx="6"
                  ry="4"
                  fill="color-mix(in srgb, var(--adventure-orange) 45%, transparent)"
                  animate={{ opacity: [0, 0.7, 0.7, 0.5] }}
                  transition={{ duration: CLAP_DURATION, times: [0, 0.3, 0.7, 1] }}
                />
              </>
            ) : null}

            <motion.g
              animate={isClapping ? { rotate: headTilt } : undefined}
              transition={clapTransition}
              style={{ transformOrigin: "60px 78px" }}
            >
              {isClapping ? (
                <>
                  <path
                    d="M 44 70 Q 48 66 52 70"
                    fill="none"
                    stroke="var(--adventure-text)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 68 70 Q 72 66 76 70"
                    fill="none"
                    stroke="var(--adventure-text)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  <circle cx="48" cy="72" r="5" fill="var(--adventure-text)" />
                  <circle cx="72" cy="72" r="5" fill="var(--adventure-text)" />
                </>
              )}
              <path
                d={mouthPath}
                fill="none"
                stroke="var(--adventure-text)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </motion.g>

            <motion.g
              animate={isClapping ? { rotate: headTilt } : undefined}
              transition={clapTransition}
              style={{ transformOrigin: "60px 38px" }}
            >
              <ellipse cx="60" cy="38" rx="34" ry="30" fill="var(--adventure-orange)" />
              <ellipse
                cx="60"
                cy="38"
                rx="34"
                ry="30"
                fill="none"
                stroke="var(--adventure-border-strong)"
                strokeWidth="2.5"
              />
              <circle cx="48" cy="36" r="4.5" fill="var(--adventure-text)" />
              <circle cx="72" cy="36" r="4.5" fill="var(--adventure-text)" />
              <path
                d="M 50 48 Q 60 56 70 48"
                fill="none"
                stroke="var(--adventure-text)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <rect
                x="52"
                y="22"
                width="16"
                height="10"
                rx="4"
                fill="var(--adventure-green)"
                stroke="var(--adventure-border-strong)"
                strokeWidth="2"
              />
            </motion.g>

            <motion.g
              animate={
                isClapping
                  ? {
                      x: leftArmX,
                      y: leftArmY,
                      rotate: leftArmRotate,
                    }
                  : undefined
              }
              transition={clapTransition}
              style={{ transformOrigin: "28px 82px" }}
            >
              <ellipse cx="28" cy="82" rx="10" ry="16" fill="var(--adventure-primary)" />
              <ellipse
                cx="28"
                cy="82"
                rx="10"
                ry="16"
                fill="none"
                stroke="var(--adventure-border-strong)"
                strokeWidth="1.5"
              />
            </motion.g>

            <motion.g
              animate={
                isClapping
                  ? {
                      x: rightArmX,
                      y: rightArmY,
                      rotate: rightArmRotate,
                    }
                  : undefined
              }
              transition={clapTransition}
              style={{ transformOrigin: "92px 82px" }}
            >
              <ellipse cx="92" cy="82" rx="10" ry="16" fill="var(--adventure-primary)" />
              <ellipse
                cx="92"
                cy="82"
                rx="10"
                ry="16"
                fill="none"
                stroke="var(--adventure-border-strong)"
                strokeWidth="1.5"
              />
            </motion.g>

            {isClapping ? (
              <motion.g
                animate={{
                  opacity: [0, 0, 0.85, 0, 0.9, 0, 0.95, 0, 0.6, 0],
                  scale: [0.5, 0.5, 1, 0.6, 1.05, 0.6, 1.1, 0.6, 1.2, 0.8],
                }}
                transition={clapTransition}
                style={{ transformOrigin: "60px 68px" }}
              >
                <ellipse cx="60" cy="68" rx="10" ry="4" fill="var(--adventure-primary)" />
                <ellipse
                  cx="60"
                  cy="68"
                  rx="10"
                  ry="4"
                  fill="none"
                  stroke="var(--adventure-border)"
                  strokeWidth="1"
                />
              </motion.g>
            ) : null}
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

export { PlayCompanionCharacter };
