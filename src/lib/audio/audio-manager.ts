import { AUDIO_ASSET_PATHS, type AudioEffectKey } from "./assets";
import { DEFAULT_AUDIO_CONFIG, getDuckingMultiplier } from "./config";
import { loadHowler } from "./howler-loader";
import {
  readMusicEnabled,
  subscribeMusicEnabled,
} from "@/lib/storage/adventure-music";
import type {
  AudioChannel,
  AudioDefaults,
  InstructionAudioRef,
} from "./types";

type ManagedHowl = import("howler").Howl;

type VoicePlaybackOptions = {
  onEnd?: () => void;
};

class AudioManager {
  private config: AudioDefaults = { ...DEFAULT_AUDIO_CONFIG };
  private unlocked = false;
  private unlockPromise: Promise<void> | null = null;
  private masterEnabled = true;
  private musicHowl: ManagedHowl | null = null;
  private musicPlaying = false;
  private musicDuckActive = false;
  private effectHowls = new Map<string, ManagedHowl>();
  private voiceHowl: ManagedHowl | null = null;
  private voicePlaying = false;
  private lastInstruction: InstructionAudioRef | null = null;
  private unsubscribeMaster: (() => void) | null = null;
  private boundToRuntime = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.masterEnabled = readMusicEnabled();
    }
  }

  /** Wire master mute to existing child music toggle storage (Audio ON/OFF path). */
  bindToAppRuntime(): void {
    if (!this.boundToRuntime || typeof window === "undefined") {
      return;
    }
    this.masterEnabled = readMusicEnabled();
    this.unsubscribeMaster?.();
    this.unsubscribeMaster = subscribeMusicEnabled(() => {
      this.masterEnabled = readMusicEnabled();
      this.applyMasterEnabled();
    });
  }

  setBoundToRuntime(): void {
    this.boundToRuntime = true;
    this.bindToAppRuntime();
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
    this.unlockFromUserGesture();
    if (!this.unlockPromise) {
      return false;
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
    this.playVoiceClip(AUDIO_ASSET_PATHS.voice.tryAgain);
  }

  playTransition(): void {
    this.unlockFromUserGesture();
    this.playEffect("transition");
  }

  playInstruction(ref: InstructionAudioRef): void {
    this.unlockFromUserGesture();
    this.lastInstruction = ref;
    this.playVoiceClip(ref.src);
  }

  replayInstruction(): void {
    if (!this.lastInstruction) {
      return;
    }
    this.unlockFromUserGesture();
    this.playVoiceClip(this.lastInstruction.src, { restart: true });
  }

  playFinalSuccess(childName?: string): void {
    this.unlockFromUserGesture();
    const clip =
      childName && childName.trim().length > 0
        ? AUDIO_ASSET_PATHS.voice.goodJobWithName
        : AUDIO_ASSET_PATHS.voice.goodJob;
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
      howl.volume(volume);
      howl.play();
      this.musicPlaying = true;
    } else {
      howl.fade(howl.volume(), volume, this.config.fades.musicInMs);
    }
  }

  stopMusic(): void {
    const howl = this.musicHowl;
    if (!howl || !this.musicPlaying) {
      return;
    }
    const current = howl.volume();
    howl.fade(current, 0, this.config.fades.musicOutMs);
    globalThis.setTimeout(() => {
      howl.stop();
      this.musicPlaying = false;
      this.musicDuckActive = false;
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
      this.stopMusic();
      this.stopVoice();
      this.stopAllEffects();
    }
  }

  private applyChannelVolumes(): void {
    if (this.musicHowl && this.musicPlaying) {
      this.musicHowl.volume(this.effectiveMusicVolume());
    }
    if (this.voiceHowl) {
      this.voiceHowl.volume(this.config.channels.voice.volume);
    }
    for (const howl of this.effectHowls.values()) {
      howl.volume(this.config.channels.effects.volume);
    }
  }

  private effectiveMusicVolume(): number {
    const base = this.config.channels.music.volume;
    if (this.musicDuckActive) {
      return (
        base *
        getDuckingMultiplier(
          this.config.ducking.strength,
          this.config.ducking
        )
      );
    }
    return base;
  }

  private async ensureMusicHowl(): Promise<ManagedHowl | null> {
    if (this.musicHowl) {
      return this.musicHowl;
    }
    const mod = await loadHowler();
    if (!mod) {
      return null;
    }
    this.musicHowl = new mod.Howl({
      src: [AUDIO_ASSET_PATHS.music.theme],
      loop: true,
      preload: true,
      volume: 0,
      html5: false,
      onloaderror: () => {
        /* assets not added yet */
      },
    });
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

      this.duckMusicForVoice();
      howl.stop();
      howl.volume(this.config.channels.voice.volume);
      this.voicePlaying = true;

      howl.once("end", () => {
        this.voicePlaying = false;
        this.restoreMusicAfterVoice();
        options?.onEnd?.();
      });
      howl.once("stop", () => {
        if (!howl.playing()) {
          this.voicePlaying = false;
          this.restoreMusicAfterVoice();
        }
      });
      howl.once("loaderror", () => {
        this.voicePlaying = false;
        this.restoreMusicAfterVoice();
      });

      howl.play();
    });
  }

  private async ensureVoiceHowl(src: string): Promise<ManagedHowl | null> {
    const mod = await loadHowler();
    if (!mod) {
      return null;
    }
    if (this.voiceHowl) {
      this.voiceHowl.unload();
      this.voiceHowl = null;
    }
    this.voiceHowl = new mod.Howl({
      src: [src],
      preload: true,
      volume: this.config.channels.voice.volume,
      html5: true,
      onloaderror: () => {
        /* assets not added yet */
      },
    });
    return this.voiceHowl;
  }

  private stopVoice(): void {
    if (this.voiceHowl) {
      this.voiceHowl.stop();
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
  return sharedManager;
}
