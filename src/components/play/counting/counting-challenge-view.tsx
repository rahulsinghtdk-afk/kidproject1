"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChildButton, ChildHeading } from "@/components/child";
import {
  adventureMotionVariants,
  adventureTransition,
} from "@/lib/motion/adventure-motion";
import { getObjectLayout } from "@/lib/counting/object-layouts";
import { shuffledAnswerChoices } from "@/lib/counting/shuffle-choices";
import type { CountAndChooseChallenge } from "@/data/counting/count-and-choose/challenges";
import {
  COUNTING_OBJECT_EMOJI,
  touchEachPrompt,
} from "@/data/counting/object-kinds";
import {
  CLAP_CELEBRATION_MS,
  CLAP_CELEBRATION_MS_REDUCED,
  playCelebrationSound,
} from "@/lib/audio/play-clap-sound";
import {
  CELEBRATION_BEAT_TIMES,
  CELEBRATION_DURATION_SEC,
  CELEBRATION_EASE,
  MASCOT_PATH,
} from "@/lib/motion/celebration-motion";
import { cn } from "@/lib/utils";
import { CelebrationBubbles } from "./celebration-bubbles";
import { CountableObject } from "./countable-object";
import { CountingPlaymat } from "./counting-playmat";
import { PlayCompanionCharacter } from "./play-companion-character";
import { PlayProgressIndicator } from "./play-progress-indicator";
import { TouchCountCounter } from "./touch-count-counter";

type CountingChallengeViewProps = {
  challenge: CountAndChooseChallenge;
  challengeIndex: number;
  totalChallenges: number;
  onComplete: () => void;
};

const answerVariants = ["primary", "orange", "secondary"] as const;

function CountingChallengeView({
  challenge,
  challengeIndex,
  totalChallenges,
  onComplete,
}: CountingChallengeViewProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const emoji = COUNTING_OBJECT_EMOJI[challenge.objectKind];
  const layouts = useMemo(
    () => getObjectLayout(challenge.count),
    [challenge.count]
  );
  const answerChoices = useMemo(
    () => shuffledAnswerChoices(challenge.choices, challenge.id),
    [challenge.choices, challenge.id]
  );

  const [countedOrder, setCountedOrder] = useState<number[]>([]);
  const [celebrating, setCelebrating] = useState(false);
  const [nudgeAnswers, setNudgeAnswers] = useState(false);
  const [counterEmphasis, setCounterEmphasis] = useState(false);

  const countedSet = new Set(countedOrder);
  const touchCount = countedOrder.length;
  const allCounted = touchCount >= challenge.count;
  const showTapHint = touchCount === 0;

  const companionMood = celebrating
    ? "celebrate"
    : allCounted
      ? "encouraging"
      : "curious";

  const handleObjectTap = useCallback(
    (index: number) => {
      if (celebrating) return;
      setCountedOrder((prev) => {
        if (prev.includes(index)) return prev;
        return [...prev, index];
      });
      setCounterEmphasis(true);
      window.setTimeout(() => setCounterEmphasis(false), 400);
    },
    [celebrating]
  );

  const handleAnswer = useCallback(
    (choice: number) => {
      if (celebrating || !allCounted) return;

      if (choice === challenge.count) {
        setCelebrating(true);
        playCelebrationSound();
        window.setTimeout(() => {
          onComplete();
        }, reducedMotion ? CLAP_CELEBRATION_MS_REDUCED : CLAP_CELEBRATION_MS);
        return;
      }

      setNudgeAnswers(true);
      window.setTimeout(() => setNudgeAnswers(false), 500);
    },
    [allCounted, celebrating, challenge.count, onComplete, reducedMotion]
  );

  return (
    <motion.div
      key={challenge.id}
      className="flex w-full flex-1 flex-col gap-4 landscape:gap-3"
      initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
      transition={adventureTransition.normal}
    >
      <PlayProgressIndicator
        total={totalChallenges}
        currentIndex={challengeIndex}
        className="opacity-80"
      />

      <div className="relative flex min-h-0 flex-1 flex-col gap-4 landscape:flex-row landscape:items-stretch landscape:gap-5">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-8">
            <motion.div
              key={allCounted ? "how-many" : "touch-each"}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
              animate={{ opacity: celebrating ? 0 : 1, y: 0 }}
              transition={adventureTransition.normal}
              className={celebrating ? "pointer-events-none sr-only" : undefined}
            >
              <ChildHeading level={2} as="h2" className="text-balance">
                {allCounted ? "How many?" : touchEachPrompt(challenge.objectKind)}
              </ChildHeading>
            </motion.div>

            {!celebrating ? (
              <TouchCountCounter
                count={touchCount}
                emphasize={counterEmphasis}
              />
            ) : null}
          </div>

          <motion.div
            className="relative w-full flex-1"
            variants={celebrating ? adventureMotionVariants.successPop : undefined}
            initial="initial"
            animate={celebrating ? "animate" : undefined}
          >
            <CountingPlaymat objectKind={challenge.objectKind}>
              {Array.from({ length: challenge.count }, (_, index) => (
                <CountableObject
                  key={`${challenge.id}-${index}`}
                  emoji={emoji}
                  index={index}
                  layout={layouts[index]}
                  counted={countedSet.has(index)}
                  showIdleHint={showTapHint}
                  celebrating={celebrating}
                  onTap={handleObjectTap}
                />
              ))}
            </CountingPlaymat>
          </motion.div>

          {allCounted && !celebrating ? (
            <motion.div
              className="w-full px-1"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={adventureTransition.slow}
            >
              <motion.div
                className={cn(
                  "mx-auto grid max-w-lg grid-cols-3 gap-4 sm:gap-5",
                  "rounded-[var(--adventure-radius-2xl)] border-2 border-adventure-border/90",
                  "bg-[color-mix(in_srgb,var(--adventure-secondary)_10%,var(--adventure-surface))] p-4 sm:p-5",
                  "shadow-[inset_0_2px_12px_rgb(55_65_81_/_0.04)]"
                )}
                variants={
                  nudgeAnswers ? adventureMotionVariants.gentleNudge : undefined
                }
                initial="initial"
                animate={nudgeAnswers ? "animate" : undefined}
              >
                {answerChoices.map((choice, choiceIndex) => (
                  <ChildButton
                    key={`${challenge.id}-choice-${choice}-${choiceIndex}`}
                    variant={
                      answerVariants[choiceIndex % answerVariants.length]
                    }
                    size="large"
                    className="min-h-[4.5rem] w-full tabular-nums text-[length:var(--adventure-text-2xl)] shadow-[var(--adventure-shadow-sm)]"
                    onClick={() => handleAnswer(choice)}
                  >
                    {choice}
                  </ChildButton>
                ))}
              </motion.div>
            </motion.div>
          ) : null}
        </div>

        {!celebrating ? (
          <div className="flex justify-center landscape:w-[8.5rem] landscape:items-end landscape:pb-4">
            <PlayCompanionCharacter mood={companionMood} />
          </div>
        ) : null}

        {celebrating ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <CelebrationBubbles className="z-0" />

            <motion.div
              className="absolute z-10"
              initial={{ left: "72%", top: "60%" }}
              animate={
                reducedMotion
                  ? { left: "46%", top: "40%" }
                  : {
                      left: [...MASCOT_PATH.left],
                      top: [...MASCOT_PATH.top],
                      rotate: [...MASCOT_PATH.rotate],
                    }
              }
              transition={{
                duration: CELEBRATION_DURATION_SEC,
                ease: CELEBRATION_EASE,
                times: reducedMotion
                  ? undefined
                  : [...CELEBRATION_BEAT_TIMES],
              }}
              style={{ x: "-50%", y: "-50%" }}
            >
              <PlayCompanionCharacter mood="celebrate" clapping />
            </motion.div>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
}

export { CountingChallengeView };
