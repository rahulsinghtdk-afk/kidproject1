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
};

export type AudioDefaults = {
  channels: AudioChannelConfig;
  ducking: MusicDuckingConfig;
  fades: AudioFadeConfig;
};

export type InstructionAudioRef = {
  /** Registry key or explicit URL; registry keys resolved in the manager. */
  src: string;
};
