const ADVENTURE_MUSIC_STORAGE_KEY = "adventure-music-enabled";

const musicListeners = new Set<() => void>();

function readMusicEnabled(): boolean {
  if (typeof window === "undefined") {
    return true;
  }
  try {
    const stored = window.localStorage.getItem(ADVENTURE_MUSIC_STORAGE_KEY);
    if (stored === null) {
      return true;
    }
    return stored === "true";
  } catch {
    return true;
  }
}

function writeMusicEnabled(enabled: boolean): void {
  try {
    window.localStorage.setItem(ADVENTURE_MUSIC_STORAGE_KEY, String(enabled));
    musicListeners.forEach((listener) => listener());
  } catch {
    /* ignore quota / private mode */
  }
}

function subscribeMusicEnabled(listener: () => void): () => void {
  musicListeners.add(listener);
  return () => {
    musicListeners.delete(listener);
  };
}

function getMusicEnabledServerSnapshot(): boolean {
  return true;
}

export {
  ADVENTURE_MUSIC_STORAGE_KEY,
  getMusicEnabledServerSnapshot,
  readMusicEnabled,
  subscribeMusicEnabled,
  writeMusicEnabled,
};
