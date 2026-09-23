"use client";

import { useCallback, useMemo } from "react";
import { getAudioManager } from "@/lib/audio";
import type { AudioChannel, InstructionAudioRef, MusicContext } from "@/lib/audio";

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

  const playGoodJob = useCallback(() => {
    manager.playGoodJob();
  }, [manager]);

  const playThatsEnough = useCallback(() => {
    manager.playThatsEnough();
  }, [manager]);

  const playTransition = useCallback(() => {
    manager.playTransition();
  }, [manager]);

  const playInstruction = useCallback(
    (
      ref: InstructionAudioRef,
      options?: { onStart?: () => void; onEnd?: () => void }
    ) => {
      manager.playInstruction(ref, options);
    },
    [manager]
  );

  const replayInstruction = useCallback(() => {
    manager.replayInstruction();
  }, [manager]);

  const playFinalSuccess = useCallback(
    (childName?: string, options?: { finalAdventure?: boolean }) => {
      manager.playFinalSuccess(childName, options);
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

  const setMusicContext = useCallback(
    (context: MusicContext) => {
      manager.setMusicContext(context);
    },
    [manager]
  );

  return useMemo(
    () => ({
      playInteraction,
      playFinalInteraction,
      playSuccess,
      playRetry,
      playGoodJob,
      playThatsEnough,
      playTransition,
      playInstruction,
      replayInstruction,
      playFinalSuccess,
      startMusic,
      stopMusic,
      unlockFromUserGesture,
      setChannelVolume,
      setChannelEnabled,
      setMusicContext,
    }),
    [
      playInteraction,
      playFinalInteraction,
      playSuccess,
      playRetry,
      playGoodJob,
      playThatsEnough,
      playTransition,
      playInstruction,
      replayInstruction,
      playFinalSuccess,
      startMusic,
      stopMusic,
      unlockFromUserGesture,
      setChannelVolume,
      setChannelEnabled,
      setMusicContext,
    ]
  );
}
