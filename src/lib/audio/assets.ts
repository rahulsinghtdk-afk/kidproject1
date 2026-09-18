/**
 * Semantic audio asset registry. Paths only — add real files under `public/` later.
 * Games and the audio manager refer to keys here, not raw filenames.
 */
export const AUDIO_ASSET_PATHS = {
  music: {
    theme: "/audio/music/game-theme.mp3",
  },
  voice: {
    instructionPlaceholder: "/audio/voice/instruction-placeholder.mp3",
    goodJob: "/audio/voice/good-job.mp3",
    goodJobWithName: "/audio/voice/good-job-with-name.mp3",
    tryAgain: "/audio/voice/try-again.mp3",
  },
  effects: {
    interaction: "/audio/effects/interaction-soft.mp3",
    interactionFinal: "/audio/effects/interaction-final.mp3",
    success: "/audio/effects/success.mp3",
    transition: "/audio/effects/transition.mp3",
  },
} as const;

export type AudioEffectKey = keyof typeof AUDIO_ASSET_PATHS.effects;

export type AudioVoiceKey = keyof typeof AUDIO_ASSET_PATHS.voice;

export function resolveAudioPath(path: string): string {
  return path;
}
