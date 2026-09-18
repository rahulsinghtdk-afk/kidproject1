import type { AudioDefaults, MusicDuckingStrength } from "./types";

/** Internal defaults — not exposed in child or parent UI yet. */
export const DEFAULT_AUDIO_CONFIG: AudioDefaults = {
  channels: {
    music: { enabled: true, volume: 0.55 },
    voice: { enabled: true, volume: 0.88 },
    effects: { enabled: true, volume: 0.42 },
  },
  ducking: {
    strength: "strong",
    fadeMs: 420,
    levels: {
      strong: 0.14,
      medium: 0.32,
      light: 0.52,
    },
  },
  fades: {
    musicInMs: 900,
    musicOutMs: 650,
    musicContextMs: 480,
  },
  musicContext: {
    levels: {
      home: 1,
      /** Play hub, games, and completion — ~20% of home music level. */
      play: 0.2,
    },
  },
};

export function getDuckingMultiplier(
  strength: MusicDuckingStrength,
  ducking: AudioDefaults["ducking"]
): number {
  return ducking.levels[strength];
}
