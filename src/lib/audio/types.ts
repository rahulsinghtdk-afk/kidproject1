export type AudioChannel = "music" | "voice" | "effects";

export type MusicDuckingStrength = "strong" | "medium" | "light";

export type ChannelSettings = {
  enabled: boolean;
  volume: number;
};

export type AudioChannelConfig = Record<AudioChannel, ChannelSettings>;

export type MusicDuckingConfig = {
  strength: MusicDuckingStrength;
  fadeMs: number;
  /** Music volume multiplier while voice is playing (per strength). */
  levels: Record<MusicDuckingStrength, number>;
};

export type AudioFadeConfig = {
  musicInMs: number;
  musicOutMs: number;
  /** Fade when switching home ↔ play background music level. */
  musicContextMs: number;
};

/** Where the child is in the app — adjusts background music level (not voice ducking). */
export type MusicContext = "home" | "play";

export type MusicContextConfig = {
  /** Multiplier on `channels.music.volume` (home = 1, play ≈ lower). */
  levels: Record<MusicContext, number>;
};

export type AudioDefaults = {
  channels: AudioChannelConfig;
  ducking: MusicDuckingConfig;
  fades: AudioFadeConfig;
  musicContext: MusicContextConfig;
};

export type InstructionAudioRef = {
  /** Registry key or explicit URL; registry keys resolved in the manager. */
  src: string;
};
