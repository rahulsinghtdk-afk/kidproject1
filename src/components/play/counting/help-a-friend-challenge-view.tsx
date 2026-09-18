"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  adventureMotionVariants,
  adventureTransition,
} from "@/lib/motion/adventure-motion";
import type { HelpAFriendChallenge } from "@/data/counting/help-a-friend/challenges";
import {
  COUNTING_OBJECT_EMOJI,
  giveMeRequest,
  objectLabelPlural,
} from "@/data/counting/object-kinds";
import { getPoolObjectLayout } from "@/lib/counting/pool-object-layouts";
import { helpAFriendRequestInstruction } from "@/lib/audio";
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
import { PlayCompanionCharacter } from "./play-companion-character";
import { CharacterGiftZone } from "./character-gift-zone";
import { CountingPlaymat } from "./counting-playmat";
import { DraggableGiftObject } from "./draggable-gift-object";
import { GiftQuantityCounter } from "./gift-quantity-counter";
import { PlayProgressIndicator } from "./play-progress-indicator";
import { PressToConfirmPad } from "./press-to-confirm-pad";
import { HearAgainButton } from "./hear-again-button";

type HelpAFriendChallengeViewProps = {
  challenge: HelpAFriendChallenge;
  challengeIndex: number;
  totalChallenges: number;
  isLastChallenge?: boolean;
  onComplete: () => void;
};

function HelpAFriendChallengeView({
  challenge,
  challengeIndex,
  totalChallenges,
  isLastChallenge = false,
  onComplete,
}: HelpAFriendChallengeViewProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const audio = useAudio();
  const dropTargetRef = useRef<HTMLDivElement>(null);
  const thatsEnoughSpokenRef = useRef(false);
  const [instructionVisualKey, setInstructionVisualKey] = useState(0);
  const emoji = COUNTING_OBJECT_EMOJI[challenge.objectKind];
  const layouts = useMemo(
    () => getPoolObjectLayout(challenge.available),
    [challenge.available]
  );
  const requestAriaLabel = giveMeRequest(
    challenge.requested,
    challenge.objectKind
  );
  const requestObjectPhrase = `${objectLabelPlural(
    challenge.objectKind,
    challenge.requested
  )}!`;

  const [givenIds, setGivenIds] = useState<number[]>([]);
  const [counterEmphasis, setCounterEmphasis] = useState(false);
  const [gentleFull, setGentleFull] = useState(false);
  const [pressNudge, setPressNudge] = useState(false);

  const givenCount = givenIds.length;
  const quotaMet = givenCount >= challenge.requested;

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

  const companionMood = celebrating
    ? "celebrate"
    : gentleFull
      ? "gentle-full"
      : givenCount > 0
        ? "encouraging"
        : "requesting";

  const collectedEmojis = givenIds.map(() => emoji);

  const requestInstruction = useMemo(
    () => helpAFriendRequestInstruction(challenge),
    [challenge]
  );

  const bumpInstructionVisual = useCallback(() => {
    setInstructionVisualKey((key) => key + 1);
  }, []);

  const { registerInteraction, hearAgain } = useChallengeInstruction(
    requestInstruction,
    {
      active: challengeInstructionsActive && requestInstruction !== null,
      onHearAgain: bumpInstructionVisual,
    }
  );

  useEffect(() => {
    thatsEnoughSpokenRef.current = false;
  }, [challenge.id]);

  const finishChallenge = useCallback(() => {
    beginSuccessCelebration();
  }, [beginSuccessCelebration]);

  const handlePressConfirm = useCallback(() => {
    if (playLocked) return;

    registerInteraction();

    if (givenCount === challenge.requested) {
      finishChallenge();
      return;
    }

    setPressNudge(true);
    window.setTimeout(() => setPressNudge(false), 500);
  }, [
    playLocked,
    challenge.requested,
    finishChallenge,
    givenCount,
    registerInteraction,
  ]);

  const handleDeliver = useCallback(
    (index: number): boolean => {
      if (playLocked) return false;

      if (givenIds.includes(index) || givenCount >= challenge.requested) {
        return false;
      }

      registerInteraction();
      const nextCount = givenCount + 1;
      if (nextCount >= challenge.requested) {
        audio.playFinalInteraction();
      } else {
        audio.playInteraction();
      }

      setGivenIds((prev) => [...prev, index]);

      setCounterEmphasis(true);
      window.setTimeout(() => setCounterEmphasis(false), 400);
      return true;
    },
    [
      audio,
      playLocked,
      challenge.requested,
      givenCount,
      givenIds,
      registerInteraction,
    ]
  );

  const handleRejectDelivery = useCallback(() => {
    if (!quotaMet) return;

    if (!thatsEnoughSpokenRef.current) {
      thatsEnoughSpokenRef.current = true;
      audio.playThatsEnough();
    }

    setGentleFull(true);
    window.setTimeout(() => setGentleFull(false), 700);
  }, [audio, quotaMet]);

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

      <div className="relative flex min-h-0 flex-1 flex-col gap-4 landscape:flex-row landscape:items-start landscape:gap-5">
        {!playLocked ? (
          <div
            className="flex w-full flex-col items-center gap-3 landscape:sticky landscape:top-4 landscape:w-[min(100%,13rem)] landscape:shrink-0"
          >
            <CharacterGiftZone
              ref={dropTargetRef}
              mood={companionMood}
              requestQuantity={challenge.requested}
              requestObjectPhrase={requestObjectPhrase}
              requestAriaLabel={requestAriaLabel}
              collectedEmojis={collectedEmojis}
              instructionVisualKey={instructionVisualKey}
              className="w-full"
            />
            {requestInstruction ? (
              <HearAgainButton onPress={hearAgain} />
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-1 flex-col gap-4">
          {!playLocked ? (
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              <GiftQuantityCounter
                given={givenCount}
                requested={challenge.requested}
                emphasize={counterEmphasis}
              />
              <PressToConfirmPad
                disabled={playLocked}
                nudge={pressNudge}
                onPress={handlePressConfirm}
              />
            </div>
          ) : null}

          <motion.div
            className="relative w-full flex-1"
            variants={
              showCelebrationScene ? adventureMotionVariants.successPop : undefined
            }
            initial="initial"
            animate={showCelebrationScene ? "animate" : undefined}
          >
            <CountingPlaymat objectKind={challenge.objectKind}>
              {Array.from({ length: challenge.available }, (_, index) => (
                <DraggableGiftObject
                  key={`${challenge.id}-gift-${index}`}
                  emoji={emoji}
                  index={index}
                  layout={layouts[index]}
                  disabled={playLocked || givenIds.includes(index)}
                  dropTargetRef={dropTargetRef}
                  onDeliver={handleDeliver}
                  onRejectDelivery={handleRejectDelivery}
                />
              ))}
            </CountingPlaymat>
          </motion.div>
        </div>

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

export { HelpAFriendChallengeView };
