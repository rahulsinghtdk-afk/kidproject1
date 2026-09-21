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
    countTouchEachFlower: "/audio/voice/count-touch-each-flower.mp3",
    countTouchEachButterfly: "/audio/voice/count-touch-each-butterfly.mp3",
    countTouchEachStrawberry: "/audio/voice/count-touch-each-strawberry.mp3",
    countTouchEachFish: "/audio/voice/count-touch-each-fish.mp3",
    countTouchEachCar: "/audio/voice/count-touch-each-car.mp3",
    countTouchEachCake: "/audio/voice/count-touch-each-cake.mp3",
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
    /** Generic clip: "Well Done! Do you want more?" (name shown on screen only). */
    wantMore: "/audio/voice/want-more.mp3",
    /** Home — "Press Play to enter the game zone." */
    pressPlay: "/audio/voice/press-play.mp3",
    /** Walk Through the Week — "Today is [day]." (one clip per weekday). */
    walkThroughWeekTodaySunday: "/audio/voice/wtw-today-sunday.mp3",
    walkThroughWeekTodayMonday: "/audio/voice/wtw-today-monday.mp3",
    walkThroughWeekTodayTuesday: "/audio/voice/wtw-today-tuesday.mp3",
    walkThroughWeekTodayWednesday: "/audio/voice/wtw-today-wednesday.mp3",
    walkThroughWeekTodayThursday: "/audio/voice/wtw-today-thursday.mp3",
    walkThroughWeekTodayFriday: "/audio/voice/wtw-today-friday.mp3",
    walkThroughWeekTodaySaturday: "/audio/voice/wtw-today-saturday.mp3",
    /** Walk Through the Week — "Tap to move forward." */
    walkThroughWeekTapToMoveForward:
      "/audio/voice/wtw-tap-to-move-forward.mp3",
    /** Walk Through the Week — "Today we …" event lines (independent of weekday). */
    walkThroughWeekEventSchool: "/audio/voice/wtw-event-school.mp3",
    walkThroughWeekEventChaiShop: "/audio/voice/wtw-event-chai-shop.mp3",
    walkThroughWeekEventCake: "/audio/voice/wtw-event-cake.mp3",
    walkThroughWeekEventPark: "/audio/voice/wtw-event-park.mp3",
    /** Walk Through the Week — "This is [day]." (one clip per weekday). */
    walkThroughWeekThisIsSunday: "/audio/voice/wtw-this-is-sunday.mp3",
    walkThroughWeekThisIsMonday: "/audio/voice/wtw-this-is-monday.mp3",
    walkThroughWeekThisIsTuesday: "/audio/voice/wtw-this-is-tuesday.mp3",
    walkThroughWeekThisIsWednesday: "/audio/voice/wtw-this-is-wednesday.mp3",
    walkThroughWeekThisIsThursday: "/audio/voice/wtw-this-is-thursday.mp3",
    walkThroughWeekThisIsFriday: "/audio/voice/wtw-this-is-friday.mp3",
    walkThroughWeekThisIsSaturday: "/audio/voice/wtw-this-is-saturday.mp3",
    /** Walk Through the Week — "Today is [day]. Tomorrow is [next day]." (one per real today). */
    walkThroughWeekTodayTomorrowSunday:
      "/audio/voice/wtw-today-tomorrow-sunday.mp3",
    walkThroughWeekTodayTomorrowMonday:
      "/audio/voice/wtw-today-tomorrow-monday.mp3",
    walkThroughWeekTodayTomorrowTuesday:
      "/audio/voice/wtw-today-tomorrow-tuesday.mp3",
    walkThroughWeekTodayTomorrowWednesday:
      "/audio/voice/wtw-today-tomorrow-wednesday.mp3",
    walkThroughWeekTodayTomorrowThursday:
      "/audio/voice/wtw-today-tomorrow-thursday.mp3",
    walkThroughWeekTodayTomorrowFriday:
      "/audio/voice/wtw-today-tomorrow-friday.mp3",
    walkThroughWeekTodayTomorrowSaturday:
      "/audio/voice/wtw-today-tomorrow-saturday.mp3",
    /** Walk Through the Week — "Tomorrow is [day]." (tomorrow teaching step). */
    walkThroughWeekTomorrowSunday: "/audio/voice/wtw-tomorrow-sunday.mp3",
    walkThroughWeekTomorrowMonday: "/audio/voice/wtw-tomorrow-monday.mp3",
    walkThroughWeekTomorrowTuesday: "/audio/voice/wtw-tomorrow-tuesday.mp3",
    walkThroughWeekTomorrowWednesday: "/audio/voice/wtw-tomorrow-wednesday.mp3",
    walkThroughWeekTomorrowThursday: "/audio/voice/wtw-tomorrow-thursday.mp3",
    walkThroughWeekTomorrowFriday: "/audio/voice/wtw-tomorrow-friday.mp3",
    walkThroughWeekTomorrowSaturday: "/audio/voice/wtw-tomorrow-saturday.mp3",
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
