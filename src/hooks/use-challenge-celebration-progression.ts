"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CLAP_CELEBRATION_MS,
  CLAP_CELEBRATION_MS_REDUCED,
  FINAL_CELEBRATION_MS,
  FINAL_CELEBRATION_MS_REDUCED,
} from "@/lib/audio/celebration-timing";
import { clickHereToProceedInstruction } from "@/lib/audio";
import { useAudio } from "@/hooks/use-audio";

export type ChallengeCelebrationPhase = "idle" | "celebrating" | "awaiting-next";

type UseChallengeCelebrationProgressionOptions = {
  isLastChallenge: boolean;
  reducedMotion: boolean;
  onAdvance: () => void;
};

/**
 * Success celebration → optional child-guided Next (normal challenges only).
 * Final challenge auto-advances after the longer celebration beat (existing flow).
 */
export function useChallengeCelebrationProgression({
  isLastChallenge,
  reducedMotion,
  onAdvance,
}: UseChallengeCelebrationProgressionOptions) {
  const audio = useAudio();
  const [phase, setPhase] = useState<ChallengeCelebrationPhase>("idle");
  const celebrationTimerRef = useRef<number | null>(null);

  const clearCelebrationTimer = useCallback(() => {
    if (celebrationTimerRef.current !== null) {
      window.clearTimeout(celebrationTimerRef.current);
      celebrationTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearCelebrationTimer(), [clearCelebrationTimer]);

  const beginSuccessCelebration = useCallback(() => {
    clearCelebrationTimer();
    setPhase("celebrating");
    audio.playSuccess();
    audio.playGoodJob();

    const celebrationMs = isLastChallenge
      ? reducedMotion
        ? FINAL_CELEBRATION_MS_REDUCED
        : FINAL_CELEBRATION_MS
      : reducedMotion
        ? CLAP_CELEBRATION_MS_REDUCED
        : CLAP_CELEBRATION_MS;

    celebrationTimerRef.current = window.setTimeout(() => {
      celebrationTimerRef.current = null;
      if (isLastChallenge) {
        setPhase("idle");
        onAdvance();
        return;
      }
      setPhase("awaiting-next");
      audio.playInstruction(clickHereToProceedInstruction());
    }, celebrationMs);
  }, [
    audio,
    clearCelebrationTimer,
    isLastChallenge,
    onAdvance,
    reducedMotion,
  ]);

  const handleNext = useCallback(() => {
    if (phase !== "awaiting-next") {
      return;
    }
    clearCelebrationTimer();
    setPhase("idle");
    audio.playTransition();
    onAdvance();
  }, [audio, clearCelebrationTimer, onAdvance, phase]);

  const celebrating = phase === "celebrating";
  /** Celebration composition stays mounted through guidance (additive Next). */
  const showCelebrationScene =
    phase === "celebrating" || phase === "awaiting-next";
  const showGoodJob = showCelebrationScene;
  const showNextGuidance = phase === "awaiting-next";
  const challengeInstructionsActive = phase === "idle";
  const playLocked = phase !== "idle";

  return {
    phase,
    celebrating,
    showCelebrationScene,
    showGoodJob,
    showNextGuidance,
    challengeInstructionsActive,
    playLocked,
    beginSuccessCelebration,
    handleNext,
  };
}
