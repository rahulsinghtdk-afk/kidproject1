import {
  CLAP_CELEBRATION_MS,
  CLAP_CELEBRATION_MS_REDUCED,
} from "./celebration-timing";

export { CLAP_CELEBRATION_MS, CLAP_CELEBRATION_MS_REDUCED };

/**
 * @deprecated Celebration audio is handled by AudioManager.playSuccess().
 * Kept for any legacy imports; does not play sound.
 */
export function playCelebrationSound(): void {
  /* no-op — use useAudio().playSuccess() */
}

/** @deprecated Use playCelebrationSound */
export function playClapSound(): void {
  playCelebrationSound();
}
