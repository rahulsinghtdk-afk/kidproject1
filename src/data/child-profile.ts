/**
 * Child display name for personalized voice lines (e.g. "Good Job, [Name]!").
 * Parent UI will write this later; games read only.
 */
const CHILD_DISPLAY_NAME_STORAGE_KEY = "adventure-child-display-name";

export function readChildDisplayName(): string | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }
  try {
    const stored = window.localStorage.getItem(CHILD_DISPLAY_NAME_STORAGE_KEY);
    const trimmed = stored?.trim();
    return trimmed && trimmed.length > 0 ? trimmed : undefined;
  } catch {
    return undefined;
  }
}

export { CHILD_DISPLAY_NAME_STORAGE_KEY };
