"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getAudioManager } from "@/lib/audio";
import {
  getMusicEnabledServerSnapshot,
  readMusicEnabled,
  subscribeMusicEnabled,
  writeMusicEnabled,
} from "@/lib/storage/adventure-music";

function useChildAudioPreference() {
  const enabled = useSyncExternalStore(
    subscribeMusicEnabled,
    readMusicEnabled,
    getMusicEnabledServerSnapshot
  );

  const toggle = useCallback(() => {
    const next = !readMusicEnabled();
    writeMusicEnabled(next);
    const manager = getAudioManager();
    manager.syncChildAudioPreference();
    if (next) {
      manager.unlockFromUserGesture();
    }
  }, []);

  return { enabled, toggle };
}

export { useChildAudioPreference };
