"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useAudio } from "@/hooks/use-audio";
import type { InstructionAudioRef } from "@/lib/audio";

/** Delay before the single automatic instruction repeat (sensory-friendly, not rushed). */
export const CHALLENGE_INSTRUCTION_REPEAT_MS = 7200;

type UseChallengeInstructionOptions = {
  /** When false, no voice or timers (e.g. celebrating). */
  active?: boolean;
  onHearAgain?: () => void;
};

/**
 * Plays the current challenge instruction once, schedules one inactivity repeat,
 * and exposes Hear Again + interaction registration. Clears timers on unmount
 * or when `instruction.src` changes.
 */
export function useChallengeInstruction(
  instruction: InstructionAudioRef | null,
  options?: UseChallengeInstructionOptions
) {
  const active = options?.active ?? true;
  const audio = useAudio();
  const autoRepeatedRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const onHearAgainRef = useRef(options?.onHearAgain);
  useLayoutEffect(() => {
    onHearAgainRef.current = options?.onHearAgain;
  });
  const instructionSrc = instruction?.src ?? null;

  const clearRepeatTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleAutoRepeat = useCallback(() => {
    clearRepeatTimer();
    if (!instructionSrc || !active) {
      return;
    }
    timerRef.current = window.setTimeout(() => {
      if (!autoRepeatedRef.current && active) {
        autoRepeatedRef.current = true;
        audio.replayInstruction();
        onHearAgainRef.current?.();
      }
    }, CHALLENGE_INSTRUCTION_REPEAT_MS);
  }, [active, audio, clearRepeatTimer, instructionSrc]);

  useEffect(() => {
    autoRepeatedRef.current = false;
    clearRepeatTimer();
    if (!instructionSrc || !active) {
      return;
    }
    audio.playInstruction({ src: instructionSrc });
    scheduleAutoRepeat();
    return clearRepeatTimer;
  }, [
    active,
    audio,
    clearRepeatTimer,
    instructionSrc,
    scheduleAutoRepeat,
  ]);

  const registerInteraction = useCallback(() => {
    clearRepeatTimer();
  }, [clearRepeatTimer]);

  const hearAgain = useCallback(() => {
    clearRepeatTimer();
    audio.replayInstruction();
    onHearAgainRef.current?.();
  }, [audio, clearRepeatTimer]);

  return { registerInteraction, hearAgain };
}
