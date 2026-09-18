"use client";

import { useCallback, useMemo } from "react";
import { getAudioManager } from "@/lib/audio";
import type { AudioChannel, InstructionAudioRef } from "@/lib/audio";

export function useAudio() {
  const manager = getAudioManager();

  const playInteraction = useCallback(() => {
    manager.playInteraction();
  }, [manager]);

  const playFinalInteraction = useCallback(() => {
    manager.playFinalInteraction();
  }, [manager]);

  const playSuccess = useCallback(() => {
    manager.playSuccess();
  }, [manager]);

  const playRetry = useCallback(() => {
    manager.playRetry();
  }, [manager]);

  const playTransition = useCallback(() => {
    manager.playTransition();
  }, [manager]);

  const playInstruction = useCallback(
    (ref: InstructionAudioRef) => {
      manager.playInstruction(ref);
    },
    [manager]
  );

  const replayInstruction = useCallback(() => {
    manager.replayInstruction();
  }, [manager]);

  const playFinalSuccess = useCallback(
    (childName?: string) => {
      manager.playFinalSuccess(childName);
    },
    [manager]
  );

  const startMusic = useCallback(() => {
    manager.startMusic();
  }, [manager]);

  const stopMusic = useCallback(() => {
    manager.stopMusic();
  }, [manager]);

  const unlockFromUserGesture = useCallback(() => {
    manager.unlockFromUserGesture();
  }, [manager]);

  const setChannelVolume = useCallback(
    (channel: AudioChannel, volume: number) => {
      manager.setChannelVolume(channel, volume);
    },
    [manager]
  );

  const setChannelEnabled = useCallback(
    (channel: AudioChannel, enabled: boolean) => {
      manager.setChannelEnabled(channel, enabled);
    },
    [manager]
  );

  return useMemo(
    () => ({
      playInteraction,
      playFinalInteraction,
      playSuccess,
      playRetry,
      playTransition,
      playInstruction,
      replayInstruction,
      playFinalSuccess,
      startMusic,
      stopMusic,
      unlockFromUserGesture,
      setChannelVolume,
      setChannelEnabled,
    }),
    [
      playInteraction,
      playFinalInteraction,
      playSuccess,
      playRetry,
      playTransition,
      playInstruction,
      replayInstruction,
      playFinalSuccess,
      startMusic,
      stopMusic,
      unlockFromUserGesture,
      setChannelVolume,
      setChannelEnabled,
    ]
  );
}
