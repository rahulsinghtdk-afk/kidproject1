"use client";

import { useCallback, useMemo, useRef, useState } from "react";
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
import { CelebrationBubbles } from "./celebration-bubbles";
import { CharacterGiftZone } from "./character-gift-zone";
import { CountingPlaymat } from "./counting-playmat";
import { DraggableGiftObject } from "./draggable-gift-object";
import { GiftQuantityCounter } from "./gift-quantity-counter";
import { PlayCompanionCharacter } from "./play-companion-character";
import { PlayProgressIndicator } from "./play-progress-indicator";
import { PressToConfirmPad } from "./press-to-confirm-pad";

type HelpAFriendChallengeViewProps = {
  challenge: HelpAFriendChallenge;
  challengeIndex: number;
  totalChallenges: number;
  onComplete: () => void;
};

function HelpAFriendChallengeView({
  challenge,
  challengeIndex,
  totalChallenges,
  onComplete,
}: HelpAFriendChallengeViewProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const dropTargetRef = useRef<HTMLDivElement>(null);
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
  const [celebrating, setCelebrating] = useState(false);
  const [counterEmphasis, setCounterEmphasis] = useState(false);
  const [gentleFull, setGentleFull] = useState(false);
  const [pressNudge, setPressNudge] = useState(false);

  const givenCount = givenIds.length;
  const quotaMet = givenCount >= challenge.requested;

  const companionMood = celebrating
    ? "celebrate"
    : gentleFull
      ? "gentle-full"
      : givenCount > 0
        ? "encouraging"
        : "requesting";

  const collectedEmojis = givenIds.map(() => emoji);

  const finishChallenge = useCallback(() => {
    setCelebrating(true);
    playCelebrationSound();
    window.setTimeout(() => {
      onComplete();
    }, reducedMotion ? CLAP_CELEBRATION_MS_REDUCED : CLAP_CELEBRATION_MS);
  }, [onComplete, reducedMotion]);

  const handlePressConfirm = useCallback(() => {
    if (celebrating) return;

    if (givenCount === challenge.requested) {
      finishChallenge();
      return;
    }

    setPressNudge(true);
    window.setTimeout(() => setPressNudge(false), 500);
  }, [celebrating, challenge.requested, finishChallenge, givenCount]);

  const handleDeliver = useCallback(
    (index: number): boolean => {
      if (celebrating) return false;

      let accepted = false;
      setGivenIds((prev) => {
        if (prev.includes(index) || prev.length >= challenge.requested) {
          return prev;
        }
        accepted = true;
        return [...prev, index];
      });

      if (!accepted) return false;

      setCounterEmphasis(true);
      window.setTimeout(() => setCounterEmphasis(false), 400);
      return true;
    },
    [celebrating, challenge.requested]
  );

  const handleRejectDelivery = useCallback(() => {
    if (!quotaMet) return;

    setGentleFull(true);
    window.setTimeout(() => setGentleFull(false), 700);
  }, [quotaMet]);

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
        {!celebrating ? (
          <CharacterGiftZone
            ref={dropTargetRef}
            mood={companionMood}
            requestQuantity={challenge.requested}
            requestObjectPhrase={requestObjectPhrase}
            requestAriaLabel={requestAriaLabel}
            collectedEmojis={collectedEmojis}
            className="w-full landscape:sticky landscape:top-4 landscape:w-[min(100%,13rem)] landscape:shrink-0"
          />
        ) : null}

        <div className="flex flex-1 flex-col gap-4">
          {!celebrating ? (
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              <GiftQuantityCounter
                given={givenCount}
                requested={challenge.requested}
                emphasize={counterEmphasis}
              />
              <PressToConfirmPad
                disabled={celebrating}
                nudge={pressNudge}
                onPress={handlePressConfirm}
              />
            </div>
          ) : null}

          <motion.div
            className="relative w-full flex-1"
            variants={celebrating ? adventureMotionVariants.successPop : undefined}
            initial="initial"
            animate={celebrating ? "animate" : undefined}
          >
            <CountingPlaymat objectKind={challenge.objectKind}>
              {Array.from({ length: challenge.available }, (_, index) => (
                <DraggableGiftObject
                  key={`${challenge.id}-gift-${index}`}
                  emoji={emoji}
                  index={index}
                  layout={layouts[index]}
                  disabled={celebrating || givenIds.includes(index)}
                  dropTargetRef={dropTargetRef}
                  onDeliver={handleDeliver}
                  onRejectDelivery={handleRejectDelivery}
                />
              ))}
            </CountingPlaymat>
          </motion.div>
        </div>

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
              initial={{ left: "50%", top: "35%" }}
              animate={
                reducedMotion
                  ? { left: "50%", top: "38%" }
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

export { HelpAFriendChallengeView };
