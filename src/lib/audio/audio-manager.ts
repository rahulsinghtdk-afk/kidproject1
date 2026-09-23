import { AUDIO_ASSET_PATHS, type AudioEffectKey } from "./assets";
import { DEFAULT_AUDIO_CONFIG, getDuckingMultiplier } from "./config";
import { getLoadedHowler, loadHowler } from "./howler-loader";
import {
  readMusicEnabled,
  subscribeMusicEnabled,
} from "@/lib/storage/adventure-music";
import type {
  AudioChannel,
  AudioDefaults,
  InstructionAudioRef,
  MusicContext,
} from "./types";

type ManagedHowl = import("howler").Howl;
type HowlWithSrc = ManagedHowl & { _src?: string | string[] };
type HowlerWithRegistry = import("howler").HowlerGlobal & {
  _howls?: HowlWithSrc[];
};

type VoicePlaybackOptions = {
  onStart?: () => void;
  onEnd?: () => void;
};

/** Survives HMR so we do not spawn duplicate looping theme tracks. */
const GLOBAL_MUSIC_HOWL_KEY = "__littleAdventureMusicHowl";

function getRegisteredHowls(
  mod: NonNullable<Awaited<ReturnType<typeof loadHowler>>>
): HowlWithSrc[] {
  return (mod.Howler as HowlerWithRegistry)._howls ?? [];
}

function isThemeMusicSrc(src: unknown, themePath: string): boolean {
  if (!src) {
    return false;
  }
  const paths = Array.isArray(src) ? src : [src];
  return paths.some(
    (path) => typeof path === "string" && path === themePath
  );
}

class AudioManager {
  private config: AudioDefaults = {
    ...DEFAULT_AUDIO_CONFIG,
    musicContext: {
      levels: { ...DEFAULT_AUDIO_CONFIG.musicContext.levels },
    },
  };
  private unlocked = false;
  private unlockPromise: Promise<void> | null = null;
  private masterEnabled = true;
  private musicHowl: ManagedHowl | null = null;
  private musicPlaying = false;
  private musicDuckActive = false;
  private effectHowls = new Map<string, ManagedHowl>();
  /** Preloaded voice clips keyed by src — avoids unload/reload races when chaining. */
  private voiceHowls = new Map<string, ManagedHowl>();
  private activeVoiceHowl: ManagedHowl | null = null;
  private voicePlaybackGeneration = 0;
  private voicePlaying = false;
  private lastInstruction: InstructionAudioRef | null = null;
  private unsubscribeMaster: (() => void) | null = null;
  private boundToRuntime = false;
  private musicContext: MusicContext = "home";

  constructor() {
    if (typeof window !== "undefined") {
      this.masterEnabled = readMusicEnabled();
    }
  }

  /** Wire master mute to existing child music toggle storage (Audio ON/OFF path). */
  bindToAppRuntime(): void {
    if (typeof window === "undefined") {
      return;
    }
    this.masterEnabled = readMusicEnabled();
    this.unsubscribeMaster?.();
    this.unsubscribeMaster = subscribeMusicEnabled(() => {
      this.syncChildAudioPreference();
    });
  }

  setBoundToRuntime(): void {
    if (this.boundToRuntime) {
      return;
    }
    this.boundToRuntime = true;
    this.bindToAppRuntime();
  }

  /** Apply child Audio ON/OFF from localStorage (music, voice, effects). */
  syncChildAudioPreference(): void {
    this.masterEnabled = readMusicEnabled();
    this.applyMasterEnabled();
  }

  getConfig(): Readonly<AudioDefaults> {
    return this.config;
  }

  setChannelVolume(channel: AudioChannel, volume: number): void {
    const clamped = Math.max(0, Math.min(1, volume));
    this.config = {
      ...this.config,
      channels: {
        ...this.config.channels,
        [channel]: {
          ...this.config.channels[channel],
          volume: clamped,
        },
      },
    };
    this.applyChannelVolumes();
  }

  setChannelEnabled(channel: AudioChannel, enabled: boolean): void {
    this.config = {
      ...this.config,
      channels: {
        ...this.config.channels,
        [channel]: {
          ...this.config.channels[channel],
          enabled,
        },
      },
    };
    if (!enabled) {
      if (channel === "music") {
        this.stopMusic();
      }
      if (channel === "voice") {
        this.stopVoice();
      }
    }
  }

  getMusicContext(): MusicContext {
    return this.musicContext;
  }

  /** Adjust background music level for home vs play (does not restart the track). */
  setMusicContext(
    context: MusicContext,
    options?: { forceApply?: boolean }
  ): void {
    const changed = this.musicContext !== context;
    this.musicContext = context;
    if (changed || options?.forceApply) {
      this.applyMusicContextVolume();
    }
  }

  setDuckingStrength(
    strength: AudioDefaults["ducking"]["strength"]
  ): void {
    this.config = {
      ...this.config,
      ducking: { ...this.config.ducking, strength },
    };
  }

  unlockFromUserGesture(): void {
    if (!this.canPlay()) {
      return;
    }
    if (this.unlocked) {
      return;
    }
    if (!this.unlockPromise) {
      this.unlockPromise = this.performUnlock();
    }
    void this.unlockPromise;
  }

  private async ensureUnlocked(): Promise<boolean> {
    if (!this.canPlay()) {
      return false;
    }
    if (this.unlocked) {
      return true;
    }
    if (!this.unlockPromise) {
      this.unlockPromise = this.performUnlock();
    }
    await this.unlockPromise;
    return this.unlocked;
  }

  playInteraction(): void {
    this.unlockFromUserGesture();
    this.playEffect("interaction");
  }

  playFinalInteraction(): void {
    this.unlockFromUserGesture();
    this.playEffect("interactionFinal");
  }

  playSuccess(): void {
    this.unlockFromUserGesture();
    this.playEffect("success");
  }

  playRetry(): void {
    this.unlockFromUserGesture();
    this.playVoiceClip(AUDIO_ASSET_PATHS.voice.tryAgain, { restart: true });
  }

  playGoodJob(): void {
    this.unlockFromUserGesture();
    this.playVoiceClip(AUDIO_ASSET_PATHS.voice.goodJob, { restart: true });
  }

  playThatsEnough(): void {
    this.unlockFromUserGesture();
    this.playVoiceClip(AUDIO_ASSET_PATHS.voice.thatsEnough);
  }

  playTransition(): void {
    this.unlockFromUserGesture();
    this.playEffect("transition");
  }

  playInstruction(
    ref: InstructionAudioRef,
    options?: VoicePlaybackOptions
  ): void {
    this.unlockFromUserGesture();
    this.lastInstruction = ref;
    this.playVoiceClip(ref.src, {
      restart: true,
      onStart: options?.onStart,
      onEnd: options?.onEnd,
    });
  }

  replayInstruction(): void {
    if (!this.lastInstruction) {
      return;
    }
    this.unlockFromUserGesture();
    this.playVoiceClip(this.lastInstruction.src, { restart: true });
  }

  /** Preload a voice clip so the first instruction plays with minimal delay. */
  warmVoiceClip(src: string): void {
    if (!this.canPlay()) {
      return;
    }
    this.unlockFromUserGesture();
    void this.ensureVoiceHowl(src);
  }

  playFinalSuccess(childName?: string, options?: { finalAdventure?: boolean }): void {
    this.unlockFromUserGesture();
    const trimmed = childName?.trim();
    let clip: string = AUDIO_ASSET_PATHS.voice.goodJob;
    if (options?.finalAdventure) {
      clip =
        trimmed && trimmed.length > 0
          ? AUDIO_ASSET_PATHS.voice.goodJobFinal
          : AUDIO_ASSET_PATHS.voice.goodJob;
    } else if (trimmed && trimmed.length > 0) {
      clip = AUDIO_ASSET_PATHS.voice.goodJobWithName;
    }
    this.playVoiceClip(clip);
  }

  startMusic(): void {
    void this.playMusicWhenReady();
  }

  private async playMusicWhenReady(): Promise<void> {
    if (!this.isChannelAllowed("music")) {
      return;
    }
    const ready = await this.ensureUnlocked();
    if (!ready || !this.isChannelAllowed("music")) {
      return;
    }
    const howl = await this.ensureMusicHowl();
    if (!howl || !this.isChannelAllowed("music")) {
      return;
    }
    const volume = this.effectiveMusicVolume();
    if (!this.musicPlaying) {
      howl.volume(0);
      howl.play();
      howl.fade(0, volume, this.config.fades.musicInMs);
      this.musicPlaying = true;
    } else {
      // Route context may update right after gesture — use context fade, not music-in.
      this.applyMusicContextVolume();
      return;
    }
    this.applyMusicContextVolume();
  }

  stopMusic(options?: { immediate?: boolean }): void {
    const themePath = AUDIO_ASSET_PATHS.music.theme;
    const howl = this.resolveMusicHowl();
    const themeActive =
      Boolean(howl?.playing()) ||
      this.musicPlaying ||
      this.hasPlayingThemeHowl(themePath);

    if (!howl || !themeActive) {
      this.musicPlaying = false;
      this.musicDuckActive = false;
      return;
    }

    if (options?.immediate || !this.masterEnabled) {
      this.stopAllThemeMusicHowls(themePath);
      return;
    }

    const current = howl.volume();
    howl.fade(current, 0, this.config.fades.musicOutMs);
    globalThis.setTimeout(() => {
      this.stopAllThemeMusicHowls(themePath);
    }, this.config.fades.musicOutMs);
  }

  private async performUnlock(): Promise<void> {
    const mod = await loadHowler();
    if (!mod) {
      return;
    }
    const ctx = mod.Howler.ctx;
    if (ctx && ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        /* gesture may be required again */
      }
    }
    this.unlocked = true;
  }

  private canPlay(): boolean {
    return typeof window !== "undefined";
  }

  private isChannelAllowed(channel: AudioChannel): boolean {
    return this.masterEnabled && this.config.channels[channel].enabled;
  }

  private async canPlayOnChannel(channel: AudioChannel): Promise<boolean> {
    if (!this.isChannelAllowed(channel)) {
      return false;
    }
    return this.ensureUnlocked();
  }

  private applyMasterEnabled(): void {
    if (!this.masterEnabled) {
      void loadHowler().then((mod) => {
        mod?.Howler.mute(true);
      });
      this.stopMusic({ immediate: true });
      this.stopVoice();
      this.stopAllEffects();
      return;
    }
    void loadHowler().then((mod) => {
      if (mod) {
        mod.Howler.mute(false);
      }
      this.startMusic();
    });
  }

  private applyMusicContextVolume(): void {
    const howl = this.resolveMusicHowl();
    if (!howl) {
      return;
    }
    const target = this.effectiveMusicVolume();
    const fadeMs = this.config.fades.musicContextMs;
    if (howl.playing()) {
      this.musicPlaying = true;
      howl.fade(howl.volume(), target, fadeMs);
      return;
    }
    howl.volume(target);
  }

  private applyChannelVolumes(): void {
    if (this.musicHowl && this.musicPlaying) {
      this.musicHowl.volume(this.effectiveMusicVolume());
    }
    for (const howl of this.voiceHowls.values()) {
      howl.volume(this.config.channels.voice.volume);
    }
    for (const howl of this.effectHowls.values()) {
      howl.volume(this.config.channels.effects.volume);
    }
  }

  private effectiveMusicVolume(): number {
    const base = this.config.channels.music.volume;
    const contextLevel = this.config.musicContext.levels[this.musicContext];
    let volume = base * contextLevel;
    if (this.musicDuckActive) {
      volume *= getDuckingMultiplier(
        this.config.ducking.strength,
        this.config.ducking
      );
    }
    return volume;
  }

  private resolveMusicHowl(): ManagedHowl | null {
    const globalHowl = (
      globalThis as typeof globalThis & {
        [GLOBAL_MUSIC_HOWL_KEY]?: ManagedHowl;
      }
    )[GLOBAL_MUSIC_HOWL_KEY];
    if (globalHowl) {
      this.musicHowl = globalHowl;
    }
    return this.musicHowl;
  }

  private hasPlayingThemeHowl(themePath: string): boolean {
    const mod = getLoadedHowler();
    if (!mod) {
      return false;
    }
    return getRegisteredHowls(mod).some(
      (howl) => isThemeMusicSrc(howl._src, themePath) && howl.playing()
    );
  }

  private stopAllThemeMusicHowls(themePath: string): void {
    const mod = getLoadedHowler();
    if (mod) {
      for (const howl of getRegisteredHowls(mod)) {
        if (!isThemeMusicSrc(howl._src, themePath)) {
          continue;
        }
        howl.stop();
        howl.volume(0);
      }
    }
    const tracked = this.resolveMusicHowl();
    tracked?.stop();
    tracked?.volume(0);
    this.musicPlaying = false;
    this.musicDuckActive = false;
  }

  private dedupeThemeMusicHowls(
    mod: NonNullable<Awaited<ReturnType<typeof loadHowler>>>,
    themePath: string
  ): ManagedHowl | null {
    const globalHowl = (
      globalThis as typeof globalThis & {
        [GLOBAL_MUSIC_HOWL_KEY]?: ManagedHowl;
      }
    )[GLOBAL_MUSIC_HOWL_KEY];

    const themeHowls = getRegisteredHowls(mod).filter((howl) =>
      isThemeMusicSrc(howl._src, themePath)
    );

    if (globalHowl && themeHowls.includes(globalHowl)) {
      for (const howl of themeHowls) {
        if (howl !== globalHowl) {
          howl.stop();
          howl.unload();
        }
      }
      return globalHowl;
    }

    if (themeHowls.length > 0) {
      const keeper = themeHowls[themeHowls.length - 1];
      for (const howl of themeHowls) {
        if (howl !== keeper) {
          howl.stop();
          howl.unload();
        }
      }
      return keeper;
    }

    return null;
  }

  private async ensureMusicHowl(): Promise<ManagedHowl | null> {
    const existing = this.resolveMusicHowl();
    if (existing) {
      return existing;
    }
    const mod = await loadHowler();
    if (!mod) {
      return null;
    }
    const themePath = AUDIO_ASSET_PATHS.music.theme;
    const reused = this.dedupeThemeMusicHowls(mod, themePath);
    if (reused) {
      this.musicHowl = reused;
      (
        globalThis as typeof globalThis & {
          [GLOBAL_MUSIC_HOWL_KEY]?: ManagedHowl;
        }
      )[GLOBAL_MUSIC_HOWL_KEY] = reused;
      return reused;
    }
    this.musicHowl = new mod.Howl({
      src: [themePath],
      loop: true,
      preload: true,
      volume: 0,
      html5: false,
      onloaderror: () => {
        /* assets not added yet */
      },
    });
    (
      globalThis as typeof globalThis & {
        [GLOBAL_MUSIC_HOWL_KEY]?: ManagedHowl;
      }
    )[GLOBAL_MUSIC_HOWL_KEY] = this.musicHowl;
    return this.musicHowl;
  }

  private getEffectHowl(key: AudioEffectKey): Promise<ManagedHowl | null> {
    const path = AUDIO_ASSET_PATHS.effects[key];
    const existing = this.effectHowls.get(path);
    if (existing) {
      return Promise.resolve(existing);
    }
    return loadHowler().then((mod) => {
      if (!mod) {
        return null;
      }
      const howl = new mod.Howl({
        src: [path],
        preload: true,
        volume: this.config.channels.effects.volume,
        onloaderror: () => {
          /* assets not added yet */
        },
      });
      this.effectHowls.set(path, howl);
      return howl;
    });
  }

  private playEffect(key: AudioEffectKey): void {
    void this.canPlayOnChannel("effects").then(async (allowed) => {
      if (!allowed) {
        return;
      }
      const howl = await this.getEffectHowl(key);
      if (!howl || !this.isChannelAllowed("effects")) {
        return;
      }
      howl.volume(this.config.channels.effects.volume);
      howl.stop();
      howl.play();
    });
  }

  private stopAllEffects(): void {
    for (const howl of this.effectHowls.values()) {
      howl.stop();
    }
  }

  private playVoiceClip(
    src: string,
    options?: { restart?: boolean } & VoicePlaybackOptions
  ): void {
    void this.canPlayOnChannel("voice").then(async (allowed) => {
      if (!allowed) {
        return;
      }
      if (this.voicePlaying && !options?.restart) {
        return;
      }
      const howl = await this.ensureVoiceHowl(src);
      if (!howl || !this.isChannelAllowed("voice")) {
        return;
      }

      const generation = ++this.voicePlaybackGeneration;

      const beginPlayback = () => {
        if (generation !== this.voicePlaybackGeneration) {
          return;
        }

        if (this.activeVoiceHowl && this.activeVoiceHowl !== howl) {
          this.activeVoiceHowl.stop();
        }
        this.activeVoiceHowl = howl;

        this.duckMusicForVoice();
        howl.stop();
        howl.volume(this.config.channels.voice.volume);
        this.voicePlaying = true;

        howl.once("end", () => {
          if (generation !== this.voicePlaybackGeneration) {
            return;
          }
          this.voicePlaying = false;
          if (this.activeVoiceHowl === howl) {
            this.activeVoiceHowl = null;
          }
          this.restoreMusicAfterVoice();
          options?.onEnd?.();
        });
        howl.once("stop", () => {
          if (!howl.playing() && generation === this.voicePlaybackGeneration) {
            this.voicePlaying = false;
            this.restoreMusicAfterVoice();
          }
        });
        howl.once("loaderror", () => {
          if (generation !== this.voicePlaybackGeneration) {
            return;
          }
          this.voicePlaying = false;
          if (this.activeVoiceHowl === howl) {
            this.activeVoiceHowl = null;
          }
          this.restoreMusicAfterVoice();
        });

        options?.onStart?.();
        howl.play();
      };

      this.runWhenVoiceHowlReady(howl, beginPlayback, () => {
        if (generation !== this.voicePlaybackGeneration) {
          return;
        }
        this.voicePlaying = false;
        this.restoreMusicAfterVoice();
      });
    });
  }

  private runWhenVoiceHowlReady(
    howl: ManagedHowl,
    onReady: () => void,
    onLoadError?: () => void
  ): void {
    const state = howl.state();
    if (state === "loaded") {
      onReady();
      return;
    }
    howl.once("load", onReady);
    if (onLoadError) {
      howl.once("loaderror", onLoadError);
    }
    if (state === "unloaded") {
      howl.load();
    }
  }

  private async ensureVoiceHowl(src: string): Promise<ManagedHowl | null> {
    const mod = await loadHowler();
    if (!mod) {
      return null;
    }
    const cached = this.voiceHowls.get(src);
    if (cached) {
      return cached;
    }
    const howl = new mod.Howl({
      src: [src],
      preload: true,
      volume: this.config.channels.voice.volume,
      html5: true,
      onloaderror: () => {
        /* missing asset */
      },
    });
    this.voiceHowls.set(src, howl);
    return howl;
  }

  private stopVoice(): void {
    this.voicePlaybackGeneration += 1;
    if (this.activeVoiceHowl) {
      this.activeVoiceHowl.stop();
      this.activeVoiceHowl = null;
    }
    this.voicePlaying = false;
    this.restoreMusicAfterVoice();
  }

  private duckMusicForVoice(): void {
    if (!this.musicHowl || !this.musicPlaying || this.musicDuckActive) {
      return;
    }
    this.musicDuckActive = true;
    const target = this.effectiveMusicVolume();
    this.musicHowl.fade(
      this.musicHowl.volume(),
      target,
      this.config.ducking.fadeMs
    );
  }

  private restoreMusicAfterVoice(): void {
    if (!this.musicDuckActive || !this.musicHowl || !this.musicPlaying) {
      this.musicDuckActive = false;
      return;
    }
    this.musicDuckActive = false;
    const target = this.effectiveMusicVolume();
    this.musicHowl.fade(
      this.musicHowl.volume(),
      target,
      this.config.ducking.fadeMs
    );
  }
}

let sharedManager: AudioManager | null = null;

export function getAudioManager(): AudioManager {
  if (!sharedManager) {
    sharedManager = new AudioManager();
  }
  if (typeof window !== "undefined") {
    sharedManager.setBoundToRuntime();
  }
  return sharedManager;
}
