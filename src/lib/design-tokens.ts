/**
 * Soft Adventure design tokens — TypeScript mirror of CSS variables.
 * Source of truth for values is `src/styles/adventure-tokens.css`.
 */

export const ADVENTURE_APP_NAME = "The Little Adventure";

/** CSS custom property names (use with `var(--name)` in styles or getComputedStyle). */
export const adventureCssVars = {
  background: "--adventure-background",
  primary: "--adventure-primary",
  primaryForeground: "--adventure-primary-foreground",
  secondary: "--adventure-secondary",
  secondaryForeground: "--adventure-secondary-foreground",
  green: "--adventure-green",
  greenForeground: "--adventure-green-foreground",
  orange: "--adventure-orange",
  orangeForeground: "--adventure-orange-foreground",
  text: "--adventure-text",
  textMuted: "--adventure-text-muted",
  success: "--adventure-success",
  successForeground: "--adventure-success-foreground",
  surface: "--adventure-surface",
  surfaceElevated: "--adventure-surface-elevated",
  border: "--adventure-border",
  borderStrong: "--adventure-border-strong",
  focusRing: "--adventure-focus-ring",
  touchMin: "--adventure-touch-min",
  radiusSm: "--adventure-radius-sm",
  radiusMd: "--adventure-radius-md",
  radiusLg: "--adventure-radius-lg",
  radiusXl: "--adventure-radius-xl",
  radius2xl: "--adventure-radius-2xl",
  shadowSm: "--adventure-shadow-sm",
  shadowMd: "--adventure-shadow-md",
  shadowLg: "--adventure-shadow-lg",
  durationFast: "--adventure-duration-fast",
  durationNormal: "--adventure-duration-normal",
  durationSlow: "--adventure-duration-slow",
} as const;

/** Tailwind theme color keys mapped in globals.css @theme. */
export const adventureTailwindColors = {
  adventureBg: "adventure-bg",
  adventurePrimary: "adventure-primary",
  adventureSecondary: "adventure-secondary",
  adventureGreen: "adventure-green",
  adventureOrange: "adventure-orange",
  adventureText: "adventure-text",
  adventureSuccess: "adventure-success",
  adventureSurface: "adventure-surface",
  adventureBorder: "adventure-border",
} as const;
