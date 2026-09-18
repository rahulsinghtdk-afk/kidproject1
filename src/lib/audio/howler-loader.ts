type HowlerModule = typeof import("howler");

let howlerModule: HowlerModule | null = null;

export function isClientAudioEnvironment(): boolean {
  return typeof window !== "undefined";
}

export async function loadHowler(): Promise<HowlerModule | null> {
  if (!isClientAudioEnvironment()) {
    return null;
  }
  if (!howlerModule) {
    howlerModule = await import("howler");
  }
  return howlerModule;
}

export function getLoadedHowler(): HowlerModule | null {
  return howlerModule;
}
