"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChildButton, ChildHeading } from "@/components/child";
import {
  adventureMotionVariants,
  adventureTransition,
} from "@/lib/motion/adventure-motion";
import {
  COUNT_CHOOSE_ANSWER_CUE_DELAY_MS,
  countChooseAnswerRevealDelayMs,
} from "@/lib/counting/count-choose-question-timing";
import { cn } from "@/lib/utils";
import { CountChooseAnswerCue } from "./count-choose-answer-cue";
import { HearAgainButton } from "./hear-again-button";

const answerVariants = ["primary", "orange", "secondary"] as const;

type CountChooseQuestionPanelProps = {
  instructionVisualKey: number;
  answerChoices: number[];
  challengeId: string;
  nudgeAnswers: boolean;
  onHearAgain: () => void;
  onAnswer: (choice: number) => void;
  onAnswerChoicesRevealed?: () => void;
};

function CountChooseQuestionPanel({
  instructionVisualKey,
  answerChoices,
  challengeId,
  nudgeAnswers,
  onHearAgain,
  onAnswer,
  onAnswerChoicesRevealed,
}: CountChooseQuestionPanelProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [showAnswerCue, setShowAnswerCue] = useState(false);
  const [showAnswerChoices, setShowAnswerChoices] = useState(false);
  const onAnswerChoicesRevealedRef = useRef(onAnswerChoicesRevealed);
  useLayoutEffect(() => {
    onAnswerChoicesRevealedRef.current = onAnswerChoicesRevealed;
  });

  useEffect(() => {
    const cueTimer = window.setTimeout(() => {
      setShowAnswerCue(true);
    }, COUNT_CHOOSE_ANSWER_CUE_DELAY_MS);

    const revealTimer = window.setTimeout(() => {
      setShowAnswerChoices(true);
      setShowAnswerCue(false);
      onAnswerChoicesRevealedRef.current?.();
    }, countChooseAnswerRevealDelayMs());

    return () => {
      window.clearTimeout(cueTimer);
      window.clearTimeout(revealTimer);
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-3 px-1">
      <motion.div
        key={`how-many-${instructionVisualKey}`}
        className="relative w-full max-w-lg px-2"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={adventureTransition.normal}
      >
        <div className="flex justify-center pr-[5.75rem] text-center sm:pr-[6.25rem]">
          <ChildHeading level={2} as="h2" className="text-balance">
            How many?
          </ChildHeading>
        </div>
        <HearAgainButton
          onPress={onHearAgain}
          className="absolute right-0 top-1/2 -translate-y-1/2"
        />
      </motion.div>

      <CountChooseAnswerCue visible={showAnswerCue} />

      {showAnswerChoices ? (
        <motion.div
          className="w-full"
          initial={{
            opacity: 0,
            y: reducedMotion ? 0 : 10,
            scale: reducedMotion ? 1 : 0.97,
          }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
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
                key={`${challengeId}-choice-${choice}-${choiceIndex}`}
                variant={answerVariants[choiceIndex % answerVariants.length]}
                size="large"
                className="min-h-[4.5rem] w-full tabular-nums text-[length:var(--adventure-text-2xl)] shadow-[var(--adventure-shadow-sm)]"
                onClick={() => onAnswer(choice)}
              >
                {choice}
              </ChildButton>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <div
          className="mx-auto min-h-[5.5rem] w-full max-w-lg rounded-[var(--adventure-radius-2xl)] border-2 border-dashed border-adventure-border/50 bg-[color-mix(in_srgb,var(--adventure-secondary)_6%,var(--adventure-surface))]"
          aria-hidden
        />
      )}
    </div>
  );
}

export { CountChooseQuestionPanel };
