export {
  AUDIO_ASSET_PATHS,
  DEFAULT_MUSIC_THEME_ID,
  MUSIC_THEMES,
  getDefaultMusicTheme,
  resolveMusicThemeSrc,
} from "./assets";
export type {
  AudioEffectKey,
  AudioVoiceKey,
  MusicThemeConfig,
  MusicThemeId,
} from "./assets";
export { DEFAULT_AUDIO_CONFIG, getDuckingMultiplier } from "./config";
export {
  clickHereToProceedInstruction,
  countAndChooseTouchPhaseInstruction,
  countHowManyInstruction,
  countTouchEachInstruction,
  helpAFriendRequestInstruction,
  pressPlayToEnterGameZoneInstruction,
  wantMoreInstruction,
} from "./voice-instructions";
export { getAudioManager } from "./audio-manager";
export type {
  AudioChannel,
  AudioChannelConfig,
  AudioDefaults,
  InstructionAudioRef,
  MusicContext,
  MusicDuckingStrength,
} from "./types";
