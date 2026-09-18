"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChildHeading } from "@/components/child";
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
  countAndChooseTouchPhaseInstruction,
  countHowManyInstruction,
} from "@/lib/audio";
import { useAudio } from "@/hooks/use-audio";
import { useChallengeCelebrationProgression } from "@/hooks/use-challenge-celebration-progression";
import { useChallengeInstruction } from "@/hooks/use-challenge-instruction";
import { ChallengeGoodJobMessage } from "@/components/play/challenge-good-job-message";
import { ChallengeNextGuidance } from "@/components/play/challenge-next-guidance";
import {
  MASCOT_CELEBRATION_ANCHOR,
} from "@/lib/motion/celebration-motion";
import { CelebrationBalloons } from "@/components/play/celebration-balloons";
import { CelebrationEffectsFrame } from "@/components/play/celebration-effects-frame";
import { CelebrationSparkles } from "@/components/play/celebration-sparkles";
import { CelebrationBubbles } from "./celebration-bubbles";
import { CountableObject } from "./countable-object";
import { CountingPlaymat } from "./counting-playmat";
import { PlayCompanionCharacter } from "./play-companion-character";
import { PlayProgressIndicator } from "./play-progress-indicator";
import { TouchCountCounter } from "./touch-count-counter";
import { HearAgainButton } from "./hear-again-button";
import { CountChooseQuestionPanel } from "./count-choose-question-panel";

type CountingChallengeViewProps = {
  challenge: CountAndChooseChallenge;
  challengeIndex: number;
  totalChallenges: number;
  isLastChallenge?: boolean;
  onComplete: () => void;
};

function CountingChallengeView({
  challenge,
  challengeIndex,
  totalChallenges,
  isLastChallenge = false,
  onComplete,
}: CountingChallengeViewProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const audio = useAudio();
  const emoji = COUNTING_OBJECT_EMOJI[challenge.objectKind];
  const layouts = useMemo(
    () => challenge.positions ?? getObjectLayout(challenge.count),
    [challenge.count, challenge.positions]
  );
  const answerChoices = useMemo(
    () => shuffledAnswerChoices(challenge.choices, challenge.id),
    [challenge.choices, challenge.id]
  );

  const [countedOrder, setCountedOrder] = useState<number[]>([]);
  const [nudgeAnswers, setNudgeAnswers] = useState(false);
  const [counterEmphasis, setCounterEmphasis] = useState(false);
  const [instructionVisualKey, setInstructionVisualKey] = useState(0);
  const [replayTapHints, setReplayTapHints] = useState(false);
  const [answerChoicesRevealed, setAnswerChoicesRevealed] = useState(false);
  const handleAnswerChoicesRevealed = useCallback(() => {
    setAnswerChoicesRevealed(true);
  }, []);

  const countedSet = useMemo(() => new Set(countedOrder), [countedOrder]);
  const touchCount = countedOrder.length;
  const allCounted = touchCount >= challenge.count;
  const showTapHint = touchCount === 0;

  const {
    celebrating,
    showCelebrationScene,
    showNextGuidance,
    challengeInstructionsActive,
    playLocked,
    beginSuccessCelebration,
    handleNext,
  } = useChallengeCelebrationProgression({
    isLastChallenge,
    reducedMotion,
    onAdvance: onComplete,
  });

  const questionPhaseActive = allCounted && !playLocked;

  const companionMood = celebrating
    ? "celebrate"
    : questionPhaseActive
      ? answerChoicesRevealed
        ? "encouraging"
        : "requesting"
      : "curious";

  const currentInstruction = useMemo(
    () =>
      allCounted
        ? countHowManyInstruction()
        : countAndChooseTouchPhaseInstruction(challenge),
    [allCounted, challenge]
  );

  const bumpInstructionVisual = useCallback(() => {
    setInstructionVisualKey((key) => key + 1);
    if (!allCounted) {
      setReplayTapHints(true);
    }
  }, [allCounted]);

  const { registerInteraction, hearAgain } = useChallengeInstruction(
    currentInstruction,
    {
      active: challengeInstructionsActive,
      onHearAgain: bumpInstructionVisual,
    }
  );

  const handleObjectTap = useCallback(
    (index: number) => {
      if (playLocked) return;
      if (countedSet.has(index)) return;

      registerInteraction();
      setReplayTapHints(false);
      const willCompleteTouchPhase = touchCount + 1 >= challenge.count;
      if (willCompleteTouchPhase) {
        audio.playFinalInteraction();
      } else {
        audio.playInteraction();
      }

      setCountedOrder((prev) => {
        if (prev.includes(index)) return prev;
        return [...prev, index];
      });
      setCounterEmphasis(true);
      window.setTimeout(() => setCounterEmphasis(false), 400);
    },
    [
      audio,
      playLocked,
      challenge.count,
      countedSet,
      registerInteraction,
      touchCount,
    ]
  );

  const handleAnswer = useCallback(
    (choice: number) => {
      if (playLocked || !allCounted) return;

      registerInteraction();

      if (choice === challenge.count) {
        beginSuccessCelebration();
        return;
      }

      audio.playRetry();
      setNudgeAnswers(true);
      window.setTimeout(() => setNudgeAnswers(false), 500);
    },
    [
      allCounted,
      audio,
      beginSuccessCelebration,
      playLocked,
      challenge.count,
      registerInteraction,
    ]
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
            {!allCounted ? (
              <motion.div
                key={`touch-each-${instructionVisualKey}`}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
                animate={{ opacity: playLocked ? 0 : 1, y: 0 }}
                transition={adventureTransition.normal}
                className={playLocked ? "pointer-events-none sr-only" : undefined}
              >
                <ChildHeading level={2} as="h2" className="text-balance">
                  {touchEachPrompt(challenge.objectKind)}
                </ChildHeading>
              </motion.div>
            ) : null}

            {!playLocked ? (
              <div className="flex flex-wrap items-center justify-center gap-4">
                <TouchCountCounter
                  count={touchCount}
                  emphasize={counterEmphasis}
                />
                {!allCounted ? <HearAgainButton onPress={hearAgain} /> : null}
              </div>
            ) : null}
          </div>

          <motion.div
            className="relative w-full flex-1"
            variants={
              showCelebrationScene ? adventureMotionVariants.successPop : undefined
            }
            initial="initial"
            animate={showCelebrationScene ? "animate" : undefined}
          >
            <CountingPlaymat objectKind={challenge.objectKind}>
              {Array.from({ length: challenge.count }, (_, index) => (
                <CountableObject
                  key={`${challenge.id}-${index}`}
                  emoji={emoji}
                  index={index}
                  layout={layouts[index]}
                  counted={countedSet.has(index)}
                  showIdleHint={showTapHint || replayTapHints}
                  celebrating={celebrating}
                  onTap={handleObjectTap}
                />
              ))}
            </CountingPlaymat>
          </motion.div>

          {questionPhaseActive ? (
            <CountChooseQuestionPanel
              key={`${challenge.id}-how-many`}
              challengeId={challenge.id}
              instructionVisualKey={instructionVisualKey}
              answerChoices={answerChoices}
              nudgeAnswers={nudgeAnswers}
              onHearAgain={hearAgain}
              onAnswer={handleAnswer}
              onAnswerChoicesRevealed={handleAnswerChoicesRevealed}
            />
          ) : null}
        </div>

        {!playLocked ? (
          <div className="flex justify-center landscape:w-[8.5rem] landscape:items-end landscape:pb-4">
            <PlayCompanionCharacter mood={companionMood} />
          </div>
        ) : null}

        {showCelebrationScene ? (
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            <CelebrationEffectsFrame>
              <CelebrationBalloons className="z-[1]" />
              <CelebrationBubbles className="z-[2]" />
              <CelebrationSparkles />
              <ChallengeGoodJobMessage visible partOfCelebrationScene />
            </CelebrationEffectsFrame>

            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: MASCOT_CELEBRATION_ANCHOR.left,
                top: MASCOT_CELEBRATION_ANCHOR.top,
              }}
            >
              <PlayCompanionCharacter mood="celebrate" clapping={celebrating} />
            </div>
          </div>
        ) : null}

        {showNextGuidance ? (
          <ChallengeNextGuidance onNext={handleNext} />
        ) : null}
      </div>
    </motion.div>
  );
}

export { CountingChallengeView };
