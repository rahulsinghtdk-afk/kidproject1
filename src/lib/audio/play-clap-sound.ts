import { readMusicEnabled } from "@/lib/storage/adventure-music";

/** Mascot clap + roam before advancing to the next challenge. */
export const CLAP_CELEBRATION_MS = 3800;
export const CLAP_CELEBRATION_MS_REDUCED = 1100;

let sharedContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined" || !readMusicEnabled()) {
    return null;
  }

  try {
    const AudioCtx =
      window.AudioContext ??
      (window as Window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) {
      return null;
    }

    if (!sharedContext) {
      sharedContext = new AudioCtx();
    }

    if (sharedContext.state === "suspended") {
      void sharedContext.resume();
    }

    return sharedContext;
  } catch {
    return null;
  }
}

function playFilteredNoise(
  ctx: AudioContext,
  startTime: number,
  durationSec: number,
  volume: number,
  filterType: BiquadFilterType,
  frequency: number,
  q: number
): void {
  const sampleCount = Math.floor(ctx.sampleRate * durationSec);
  const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
  const samples = buffer.getChannelData(0);

  for (let i = 0; i < sampleCount; i += 1) {
    const t = i / sampleCount;
    const envelope = Math.exp(-t * 6) * (1 - t * 0.35);
    samples[i] = (Math.random() * 2 - 1) * envelope;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.value = frequency;
  filter.Q.value = q;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + durationSec);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  source.start(startTime);
  source.stop(startTime + durationSec + 0.03);
}

/** One clap = low body thump + crisp slap + tiny ring. */
function playSingleClap(ctx: AudioContext, startTime: number, intensity: number): void {
  const v = intensity;
  playFilteredNoise(ctx, startTime, 0.07, v * 0.55, "lowpass", 320, 0.9);
  playFilteredNoise(ctx, startTime, 0.055, v * 0.42, "bandpass", 1800, 1.1);
  playFilteredNoise(ctx, startTime + 0.004, 0.04, v * 0.28, "highpass", 2200, 0.8);

  const ping = ctx.createOscillator();
  ping.type = "sine";
  ping.frequency.setValueAtTime(720, startTime);
  ping.frequency.exponentialRampToValueAtTime(520, startTime + 0.04);

  const pingGain = ctx.createGain();
  pingGain.gain.setValueAtTime(0.0001, startTime);
  pingGain.gain.exponentialRampToValueAtTime(v * 0.12, startTime + 0.004);
  pingGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.05);

  ping.connect(pingGain);
  pingGain.connect(ctx.destination);
  ping.start(startTime);
  ping.stop(startTime + 0.06);
}

function playCheerChime(ctx: AudioContext, startTime: number): void {
  const notes = [
    { freq: 523.25, delay: 0, vol: 0.14 },
    { freq: 659.25, delay: 0.07, vol: 0.12 },
    { freq: 783.99, delay: 0.14, vol: 0.11 },
    { freq: 1046.5, delay: 0.22, vol: 0.1 },
  ];

  for (const note of notes) {
    const t = startTime + note.delay;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = note.freq;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(note.vol, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.32);
  }
}

/** Claps + cheer chime when sound is enabled (no voice). */
export function playCelebrationSound(): void {
  const ctx = getAudioContext();
  if (!ctx) {
    return;
  }

  const now = ctx.currentTime;
  const clapTimes = [0, 0.18, 0.36];
  clapTimes.forEach((offset, index) => {
    const intensity = 0.48 + index * 0.04;
    playSingleClap(ctx, now + offset, intensity);
  });
  playCheerChime(ctx, now + 0.52);
}

/** @deprecated Use playCelebrationSound */
export function playClapSound(): void {
  playCelebrationSound();
}
