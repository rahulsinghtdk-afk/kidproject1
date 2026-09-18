import { CLAP_CELEBRATION_MS } from "@/lib/audio/play-clap-sound";

/** Shared rhythm: long holds, slow glides between clap spots. */
export const CELEBRATION_BEAT_TIMES = [0, 0.15, 0.38, 0.52, 0.75, 0.88, 1, 1] as const;

export const CELEBRATION_EASE = [0.42, 0, 0.2, 1] as const;

export const CELEBRATION_DURATION_SEC = CLAP_CELEBRATION_MS / 1000;

/** Primary celebration pose — visible immediately with the rest of the scene. */
export const MASCOT_CELEBRATION_ANCHOR = {
  left: "46%",
  top: "40%",
} as const;

export const MASCOT_PATH = {
  left: ["72%", "72%", "46%", "46%", "28%", "28%", "46%", "46%"] as const,
  top: ["60%", "60%", "40%", "40%", "52%", "52%", "38%", "38%"] as const,
  rotate: [0, 0, -3, -3, 4, 4, -2, -2] as const,
};
