"use client";

import { useEffect } from "react";
import { getAudioManager } from "@/lib/audio";

/**
 * Invisible client bootstrap: unlock audio after gesture, sync master mute with storage.
 * Mount once near the app root (no visual output).
 */
function AudioRuntime() {
  useEffect(() => {
    const manager = getAudioManager();
    manager.setBoundToRuntime();

    const unlock = () => {
      manager.unlockFromUserGesture();
      manager.startMusic();
    };

    const options: AddEventListenerOptions = { passive: true, once: true };
    window.addEventListener("pointerdown", unlock, options);
    window.addEventListener("keydown", unlock, options);

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  return null;
}

export { AudioRuntime };
