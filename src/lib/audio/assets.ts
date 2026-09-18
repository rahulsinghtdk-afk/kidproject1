/**
 * Semantic audio asset registry. Paths only — files live under `public/`.
 * Games and the audio manager refer to keys here, not raw filenames.
 */

export type MusicThemeConfig = {
  id: string;
  name: string;
  musicAsset: string;
};

/**
 * Parent theme picker and per-game overrides will select from here later.
 * `game.musicThemeOverride` can point at a theme id when that ships.
 */
export const MUSIC_THEMES = {
  magicRoundabout: {
    id: "magicRoundabout",
    name: "Magic Roundabout",
    musicAsset: "/audio/music/magic-roundabout.mp3",
  },
} as const satisfies Record<string, MusicThemeConfig>;

export type MusicThemeId = keyof typeof MUSIC_THEMES;

/** Default Little Adventure background theme (MVP — one track). */
export const DEFAULT_MUSIC_THEME_ID: MusicThemeId = "magicRoundabout";

export function getDefaultMusicTheme(): MusicThemeConfig {
  return MUSIC_THEMES[DEFAULT_MUSIC_THEME_ID];
}

export function resolveMusicThemeSrc(themeId: MusicThemeId = DEFAULT_MUSIC_THEME_ID): string {
  return MUSIC_THEMES[themeId].musicAsset;
}

export const AUDIO_ASSET_PATHS = {
  music: {
    magicRoundabout: MUSIC_THEMES.magicRoundabout.musicAsset,
    /** Active default background track (alias — do not hard-code paths elsewhere). */
    theme: resolveMusicThemeSrc(),
  },
  voice: {
    countTouchEachApple: "/audio/voice/count-touch-each-apple.mp3",
    countTouchEachStar: "/audio/voice/count-touch-each-star.mp3",
    countTouchEachBalloon: "/audio/voice/count-touch-each-balloon.mp3",
    countTouchEachBall: "/audio/voice/count-touch-each-ball.mp3",
    countHowMany: "/audio/voice/count-how-many.mp3",
    goodJob: "/audio/voice/good-job.mp3",
    goodJobWithName: "/audio/voice/good-job-with-name.mp3",
    goodJobFinal: "/audio/voice/good-job-final.mp3",
    tryAgain: "/audio/voice/try-again.mp3",
    thatsEnough: "/audio/voice/thats-enough.mp3",
    giveMe2Apples: "/audio/voice/give-me-2-apples.mp3",
    giveMe4Stars: "/audio/voice/give-me-4-stars.mp3",
    giveMe3Balls: "/audio/voice/give-me-3-balls.mp3",
    clickHereToProceed: "/audio/voice/click-here-to-proceed.mp3",
  },
  effects: {
    interaction: "/audio/effects/interaction-ting.mp3",
    interactionFinal: "/audio/effects/final-interaction-ting.mp3",
    success: "/audio/effects/success.mp3",
    transition: "/audio/effects/transition.mp3",
  },
} as const;

export type AudioEffectKey = keyof typeof AUDIO_ASSET_PATHS.effects;

export type AudioVoiceKey = keyof typeof AUDIO_ASSET_PATHS.voice;

export function resolveAudioPath(path: string): string {
  return path;
}
