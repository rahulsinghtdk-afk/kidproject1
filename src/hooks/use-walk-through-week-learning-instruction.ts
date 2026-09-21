"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useAudio } from "@/hooks/use-audio";
import type { WeekdayId } from "@/data/walk-through-week/default-week-events";
import { WALK_CYCLE_TAP_COUNT } from "@/lib/walk-through-week/week-walk-navigation";
import {
  walkThroughWeekEventInstruction,
  walkThroughWeekTapToMoveForwardInstruction,
  walkThroughWeekThisIsInstruction,
  walkThroughWeekTodayInstruction,
  walkThroughWeekTomorrowInstruction,
} from "@/lib/audio/voice-instructions";
import { getAudioManager } from "@/lib/audio";

/** Brief delay so audio unlock from Play navigation can finish (matches home guidance). */
export const WTW_LEARNING_OPENING_VOICE_DELAY_MS = 800;

/** Pause after instruction before "Tap to move forward." (Walk Through the Week). */
export const WTW_TAP_FORWARD_VOICE_DELAY_MS = 2000;

type UseWalkThroughWeekLearningInstructionOptions = {
  /** Device's actual current weekday — never changes in session. */
  realTodayWeekdayId: WeekdayId;
  /** Day shown on the main card (advances through the week). */
  activeWeekdayId: WeekdayId;
  /** Increments each time the child walks to the next day (0 = opening only). */
  walkStep: number;
};

type UseWalkThroughWeekLearningInstructionResult = {
  /** False while step voice is playing; true after "Tap to move forward" finishes. */
  isDayCardTapEnabled: boolean;
};

/**
 * Learning Mode voice: opening once; step 1 tomorrow + event; steps 2–6 "This is…";
 * step 7 (cycle complete) is silent.
 */
export function useWalkThroughWeekLearningInstruction({
  realTodayWeekdayId,
  activeWeekdayId,
  walkStep,
}: UseWalkThroughWeekLearningInstructionOptions): UseWalkThroughWeekLearningInstructionResult {
  const audio = useAudio();
  const openingPlayedRef = useRef(false);
  const lastWalkStepVoicedRef = useRef(0);
  const pendingVoiceTimerRef = useRef<number | null>(null);
  /** Walk step whose voice sequence (through tap-forward) has finished. */
  const [completedVoiceWalkStep, setCompletedVoiceWalkStep] = useState(-1);

  const isDayCardTapEnabled =
    walkStep >= WALK_CYCLE_TAP_COUNT ||
    completedVoiceWalkStep === walkStep;

  const clearPendingVoiceTimer = useCallback(() => {
    if (pendingVoiceTimerRef.current !== null) {
      window.clearTimeout(pendingVoiceTimerRef.current);
      pendingVoiceTimerRef.current = null;
    }
  }, []);

  const markVoiceGuidanceCompleteForStep = useCallback((step: number) => {
    setCompletedVoiceWalkStep(step);
  }, []);

  const todayInstruction = useMemo(
    () => walkThroughWeekTodayInstruction(realTodayWeekdayId),
    [realTodayWeekdayId]
  );
  const openingEventInstruction = useMemo(
    () => walkThroughWeekEventInstruction(realTodayWeekdayId),
    [realTodayWeekdayId]
  );
  const tomorrowInstruction = useMemo(
    () => walkThroughWeekTomorrowInstruction(activeWeekdayId),
    [activeWeekdayId]
  );
  const thisIsInstruction = useMemo(
    () => walkThroughWeekThisIsInstruction(activeWeekdayId),
    [activeWeekdayId]
  );
  const tapInstruction = useMemo(
    () => walkThroughWeekTapToMoveForwardInstruction(),
    []
  );

  const playTapForwardAfterDelay = useCallback(
    (step: number) => {
      clearPendingVoiceTimer();
      pendingVoiceTimerRef.current = window.setTimeout(() => {
        pendingVoiceTimerRef.current = null;
        audio.playInstruction(tapInstruction, {
          onEnd: () => markVoiceGuidanceCompleteForStep(step),
        });
      }, WTW_TAP_FORWARD_VOICE_DELAY_MS);
    },
    [
      audio,
      clearPendingVoiceTimer,
      markVoiceGuidanceCompleteForStep,
      tapInstruction,
    ]
  );

  const playInstructionThenTapForward = useCallback(
    (step: number, dayInstruction: { src: string }) => {
      audio.playInstruction(dayInstruction, {
        onEnd: () => {
          playTapForwardAfterDelay(step);
        },
      });
    },
    [audio, playTapForwardAfterDelay]
  );

  const playOpeningInstructionSequence = useCallback(() => {
    audio.playInstruction(todayInstruction, {
      onEnd: () => {
        audio.playInstruction(openingEventInstruction, {
          onEnd: () => {
            playTapForwardAfterDelay(0);
          },
        });
      },
    });
  }, [
    audio,
    openingEventInstruction,
    playTapForwardAfterDelay,
    todayInstruction,
  ]);

  const playTomorrowInstructionSequence = useCallback(
    (step: number) => {
      audio.playInstruction(tomorrowInstruction, {
        onEnd: () => {
          playTapForwardAfterDelay(step);
        },
      });
    },
    [audio, playTapForwardAfterDelay, tomorrowInstruction]
  );

  const playOpeningRef = useRef(playOpeningInstructionSequence);
  const playTomorrowRef = useRef(playTomorrowInstructionSequence);

  useLayoutEffect(() => {
    playOpeningRef.current = playOpeningInstructionSequence;
    playTomorrowRef.current = playTomorrowInstructionSequence;
  }, [playOpeningInstructionSequence, playTomorrowInstructionSequence]);

  useEffect(() => {
    const manager = getAudioManager();
    manager.warmVoiceClip(todayInstruction.src);
    manager.warmVoiceClip(openingEventInstruction.src);
    manager.warmVoiceClip(tomorrowInstruction.src);
    manager.warmVoiceClip(thisIsInstruction.src);
    manager.warmVoiceClip(tapInstruction.src);
  }, [
    openingEventInstruction.src,
    tapInstruction.src,
    thisIsInstruction.src,
    todayInstruction.src,
    tomorrowInstruction.src,
  ]);

  useEffect(() => {
    if (openingPlayedRef.current || walkStep !== 0) {
      return;
    }

    const manager = getAudioManager();
    manager.unlockFromUserGesture();
    manager.warmVoiceClip(todayInstruction.src);
    manager.warmVoiceClip(openingEventInstruction.src);
    manager.warmVoiceClip(tapInstruction.src);

    const timer = window.setTimeout(() => {
      if (openingPlayedRef.current || walkStep !== 0) {
        return;
      }
      openingPlayedRef.current = true;
      lastWalkStepVoicedRef.current = 0;
      playOpeningRef.current();
    }, WTW_LEARNING_OPENING_VOICE_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    openingEventInstruction.src,
    realTodayWeekdayId,
    tapInstruction.src,
    todayInstruction.src,
    walkStep,
  ]);

  useEffect(() => {
    if (walkStep === 0 || walkStep === lastWalkStepVoicedRef.current) {
      return;
    }
    lastWalkStepVoicedRef.current = walkStep;

    if (walkStep === 1) {
      playTomorrowRef.current(1);
      return;
    }

    if (walkStep >= 2 && walkStep < WALK_CYCLE_TAP_COUNT) {
      playInstructionThenTapForward(walkStep, thisIsInstruction);
    }
  }, [playInstructionThenTapForward, thisIsInstruction, walkStep]);

  useEffect(() => {
    return () => {
      clearPendingVoiceTimer();
    };
  }, [clearPendingVoiceTimer]);

  return { isDayCardTapEnabled };
}
