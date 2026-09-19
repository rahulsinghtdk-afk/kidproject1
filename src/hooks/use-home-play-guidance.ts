"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAudio } from "@/hooks/use-audio";
import { getAudioManager, pressPlayToEnterGameZoneInstruction } from "@/lib/audio";

/** Delay before the first home Play instruction (target: within ~1s of landing). */
export const HOME_PLAY_GUIDANCE_INITIAL_DELAY_MS = 1000;

/** Gaps between successive voice plays (after initial). At most four plays total. */
export const HOME_PLAY_GUIDANCE_REMINDER_GAPS_MS = [7000, 15000, 30000] as const;

const HOME_PLAY_GUIDANCE_MAX_PLAYS = 1 + HOME_PLAY_GUIDANCE_REMINDER_GAPS_MS.length;

/**
 * Home screen voice guidance: initial instruction plus up to three reminders,
 * then stop. Clears timers on cancel or unmount.
 */
export function useHomePlayGuidance() {
  const audio = useAudio();
  const instruction = useMemo(() => pressPlayToEnterGameZoneInstruction(), []);
  const [guidanceActive, setGuidanceActive] = useState(true);
  const timerRef = useRef<number | null>(null);
  const stoppedRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const cancelGuidance = useCallback(() => {
    if (stoppedRef.current) {
      return;
    }
    stoppedRef.current = true;
    setGuidanceActive(false);
    clearTimer();
  }, [clearTimer]);

  useEffect(() => {
    const manager = getAudioManager();
    manager.unlockFromUserGesture();
    manager.startMusic();
    manager.warmVoiceClip(instruction.src);
  }, [instruction.src]);

  useEffect(() => {
    if (!guidanceActive) {
      return;
    }

    stoppedRef.current = false;
    let playsScheduled = 0;

    const scheduleNext = (delayMs: number) => {
      clearTimer();
      timerRef.current = window.setTimeout(() => {
        if (stoppedRef.current) {
          return;
        }
        audio.playInstruction(instruction);
        playsScheduled += 1;
        if (playsScheduled >= HOME_PLAY_GUIDANCE_MAX_PLAYS) {
          return;
        }
        const gap =
          HOME_PLAY_GUIDANCE_REMINDER_GAPS_MS[playsScheduled - 1] ?? 0;
        scheduleNext(gap);
      }, delayMs);
    };

    scheduleNext(HOME_PLAY_GUIDANCE_INITIAL_DELAY_MS);

    return () => {
      stoppedRef.current = true;
      clearTimer();
    };
  }, [audio, clearTimer, guidanceActive, instruction]);

  return { guidanceActive, cancelGuidance };
}
