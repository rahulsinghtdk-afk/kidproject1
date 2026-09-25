"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useAudio } from "@/hooks/use-audio";
import { CHALLENGE_INSTRUCTION_REPEAT_MS } from "@/hooks/use-challenge-instruction";
import type { InstructionAudioRef } from "@/lib/audio";

const MAX_AUTOMATIC_INSTRUCTION_ATTEMPTS = 3;

type UseHelpAFriendChallengeInstructionOptions = {
  /** When false, no voice or timers (e.g. celebrating). */
  active?: boolean;
  onHearAgain?: () => void;
};

type PlayInstructionArgs = {
  manualAgain: boolean;
};

/**
 * Help a Friend instruction lifecycle: listen-first gate, up to 3 automatic
 * inactivity replays (after each playback ends), unlimited manual Again.
 */
export function useHelpAFriendChallengeInstruction(
  instruction: InstructionAudioRef | null,
  options?: UseHelpAFriendChallengeInstructionOptions
) {
  const active = options?.active ?? true;
  const audio = useAudio();
  const onHearAgainRef = useRef(options?.onHearAgain);
  useLayoutEffect(() => {
    onHearAgainRef.current = options?.onHearAgain;
  });

  const instructionSrc = instruction?.src ?? null;

  const [instructionPlaying, setInstructionPlaying] = useState(false);
  const [taskReady, setTaskReady] = useState(false);

  const inactivityTimerRef = useRef<number | null>(null);
  const automaticPlaysStartedRef = useRef(0);
  const taskStartedRef = useRef(false);
  const activeRef = useRef(active);
  useLayoutEffect(() => {
    activeRef.current = active;
  });

  const instructionGateLocked = instructionPlaying || !taskReady;

  const clearInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current !== null) {
      window.clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  }, []);

  const playInstructionRef = useRef<(args: PlayInstructionArgs) => void>(
    () => {}
  );

  const scheduleInactivityRetry = useCallback(() => {
    clearInactivityTimer();
    if (
      !instructionSrc ||
      !activeRef.current ||
      taskStartedRef.current ||
      automaticPlaysStartedRef.current >= MAX_AUTOMATIC_INSTRUCTION_ATTEMPTS
    ) {
      return;
    }

    inactivityTimerRef.current = window.setTimeout(() => {
      inactivityTimerRef.current = null;
      if (
        !activeRef.current ||
        taskStartedRef.current ||
        automaticPlaysStartedRef.current >= MAX_AUTOMATIC_INSTRUCTION_ATTEMPTS
      ) {
        return;
      }

      automaticPlaysStartedRef.current += 1;
      onHearAgainRef.current?.();
      playInstructionRef.current({ manualAgain: false });
    }, CHALLENGE_INSTRUCTION_REPEAT_MS);
  }, [clearInactivityTimer, instructionSrc]);

  const handleInstructionEnded = useCallback(() => {
    setInstructionPlaying(false);
    setTaskReady(true);

    if (taskStartedRef.current || !activeRef.current) {
      return;
    }

    scheduleInactivityRetry();
  }, [scheduleInactivityRetry]);

  const playInstruction = useCallback(
    ({ manualAgain }: PlayInstructionArgs) => {
      if (!instructionSrc || !activeRef.current) {
        return;
      }

      setInstructionPlaying(true);
      setTaskReady(false);
      clearInactivityTimer();

      const onEnd = () => {
        handleInstructionEnded();
      };

      if (manualAgain) {
        audio.replayInstruction({ onEnd });
        return;
      }

      audio.playInstruction({ src: instructionSrc }, { onEnd });
    },
    [audio, clearInactivityTimer, handleInstructionEnded, instructionSrc]
  );

  useLayoutEffect(() => {
    playInstructionRef.current = playInstruction;
  });

  const beginAutomaticAttempt = useCallback(() => {
    automaticPlaysStartedRef.current += 1;
    playInstruction({ manualAgain: false });
  }, [playInstruction]);

  useEffect(() => {
    automaticPlaysStartedRef.current = 0;
    taskStartedRef.current = false;
    clearInactivityTimer();

    if (!instructionSrc || !active) {
      return clearInactivityTimer;
    }

    beginAutomaticAttempt();

    return clearInactivityTimer;
  }, [active, beginAutomaticAttempt, clearInactivityTimer, instructionSrc]);

  const registerTaskInteraction = useCallback(() => {
    taskStartedRef.current = true;
    clearInactivityTimer();
  }, [clearInactivityTimer]);

  const hearAgain = useCallback(() => {
    if (!instructionSrc || !activeRef.current) {
      return;
    }
    onHearAgainRef.current?.();
    playInstruction({ manualAgain: true });
  }, [instructionSrc, playInstruction]);

  return {
    hearAgain,
    registerTaskInteraction,
    instructionPlaying,
    instructionGateLocked,
  };
}
