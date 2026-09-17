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
import {
  COUNTING_OBJECT_EMOJI,
  touchEachPrompt,
  type CountingPrototypeChallenge,
} from "@/data/counting-prototype-challenges";
import { cn } from "@/lib/utils";
import { CountableObject } from "./countable-object";
import { CountingPlaymat } from "./counting-playmat";
import { PlayCompanionCharacter } from "./play-companion-character";
import { PlayProgressIndicator } from "./play-progress-indicator";
import { TouchCountCounter } from "./touch-count-counter";

type CountingChallengeViewProps = {
  challenge: CountingPrototypeChallenge;
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
        window.setTimeout(() => {
          onComplete();
        }, reducedMotion ? 450 : 1000);
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

      <div className="flex flex-1 flex-col gap-4 landscape:flex-row landscape:items-stretch landscape:gap-5">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-8">
            <motion.div
              key={allCounted ? "how-many" : "touch-each"}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={adventureTransition.normal}
            >
              <ChildHeading level={2} as="h2" className="text-balance">
                {allCounted && !celebrating
                  ? "How many?"
                  : touchEachPrompt(challenge.objectKind)}
              </ChildHeading>
            </motion.div>

            <TouchCountCounter
              count={touchCount}
              emphasize={counterEmphasis || celebrating}
            />
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

        <div className="flex justify-center landscape:w-[8.5rem] landscape:items-end landscape:pb-4">
          <PlayCompanionCharacter mood={companionMood} />
        </div>
      </div>
    </motion.div>
  );
}

export { CountingChallengeView };
