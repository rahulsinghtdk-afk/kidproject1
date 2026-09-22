"use client";

import { LittleAdventureCharacter } from "@/components/character/little-adventure-character";
import { cn } from "@/lib/utils";

type WalkThroughWeekMondaySchoolSceneProps = {
  className?: string;
};

/**
 * Static pilot scene: Monday → School (Walk Through the Week).
 * Presentational layers only — no interaction or ambient animation.
 */
function WalkThroughWeekMondaySchoolScene({
  className,
}: WalkThroughWeekMondaySchoolSceneProps) {
  return (
    <div
      className={cn(
        "relative min-h-0 w-full overflow-hidden",
        className
      )}
      aria-hidden
    >
      {/* Background — morning sky blending into page */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-adventure-background via-[color-mix(in_srgb,var(--adventure-secondary)_22%,var(--adventure-background))] to-[color-mix(in_srgb,var(--adventure-green)_18%,var(--adventure-background))]"
        aria-hidden
      />

      {/* Distant hills — background layer */}
      <div
        className="absolute bottom-[48%] left-[-12%] h-[26%] w-[55%] rounded-[var(--adventure-radius-full)] bg-adventure-green/22 blur-[2px]"
        aria-hidden
      />
      <div
        className="absolute bottom-[46%] right-[-15%] h-[28%] w-[58%] rounded-[var(--adventure-radius-full)] bg-[color-mix(in_srgb,var(--adventure-green)_55%,var(--adventure-secondary)_45%)]/18 blur-[2px]"
        aria-hidden
      />

      {/* Minimal clouds */}
      <div
        className="absolute left-[8%] top-[6%] h-3 w-16 rounded-[var(--adventure-radius-full)] bg-adventure-surface/70 sm:h-3.5 sm:w-[4.5rem]"
        aria-hidden
      />
      <div
        className="absolute right-[12%] top-[10%] h-2.5 w-12 rounded-[var(--adventure-radius-full)] bg-adventure-surface/60 sm:h-3 sm:w-14"
        aria-hidden
      />

      {/* Midground schoolyard — recedes toward school */}
      <div
        className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-[color-mix(in_srgb,var(--adventure-green)_42%,var(--adventure-background))] via-[color-mix(in_srgb,var(--adventure-green)_28%,var(--adventure-background))] to-transparent"
        aria-hidden
      />

      {/* Schoolyard pad under building */}
      <div
        className="absolute bottom-[14%] right-[4%] z-[6] h-[16%] w-[46%] max-w-[13rem] rounded-[var(--adventure-radius-full)] bg-[color-mix(in_srgb,var(--adventure-green)_35%,var(--adventure-background))]/80 blur-[1px] landscape:right-[6%] landscape:w-[38%]"
        aria-hidden
      />

      {/* Path — perspective from character toward school entrance */}
      <svg
        className="absolute inset-x-0 bottom-0 z-[10] h-[48%] w-full"
        viewBox="0 0 400 150"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="wtw-school-path-edge" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="color-mix(in srgb, var(--adventure-border) 70%, var(--adventure-text))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="color-mix(in srgb, var(--adventure-border) 55%, var(--adventure-surface-elevated))" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="wtw-school-path-center" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="color-mix(in srgb, var(--adventure-border) 40%, white)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="color-mix(in srgb, var(--adventure-surface-elevated) 80%, white)" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <path
          d="M 8 148 L 168 148 Q 210 118 268 88 L 312 78 L 328 78 L 392 148 Z"
          fill="url(#wtw-school-path-edge)"
        />
        <path
          d="M 28 148 L 148 148 Q 205 122 262 94 L 304 84 L 316 84 L 368 148 Z"
          fill="url(#wtw-school-path-center)"
        />
      </svg>

      {/* Tree — embedded in schoolyard beside school */}
      <div
        className="absolute bottom-[26%] right-[22%] z-[7] landscape:right-[26%] landscape:bottom-[24%]"
        aria-hidden
      >
        <div className="absolute -bottom-1 left-1/2 h-2 w-10 -translate-x-1/2 rounded-[var(--adventure-radius-full)] bg-[color-mix(in_srgb,var(--adventure-green)_45%,var(--adventure-background))]" />
        <div className="mx-auto h-8 w-2.5 rounded-full bg-[color-mix(in_srgb,var(--adventure-orange)_18%,var(--adventure-text))]/30 sm:h-9" />
        <div className="relative -mt-6 flex justify-center">
          <div className="size-11 rounded-[var(--adventure-radius-full)] bg-[color-mix(in_srgb,var(--adventure-green)_75%,white)]/85 sm:size-12" />
          <div className="absolute -left-2.5 top-1 size-8 rounded-[var(--adventure-radius-full)] bg-[color-mix(in_srgb,var(--adventure-green)_80%,white)]/75 sm:size-9" />
          <div className="absolute -right-1.5 top-2.5 size-7 rounded-[var(--adventure-radius-full)] bg-[color-mix(in_srgb,var(--adventure-green)_70%,white)]/70 sm:size-8" />
        </div>
      </div>

      {/* School building — midground, set back on yard */}
      <svg
        className="absolute bottom-[16%] right-[6%] z-[12] h-[50%] w-[46%] max-w-[13.5rem] opacity-[0.98] landscape:right-[8%] landscape:h-[46%] landscape:w-[38%]"
        viewBox="0 0 120 100"
        aria-hidden
      >
        <ellipse
          cx="60"
          cy="96"
          rx="42"
          ry="4"
          fill="var(--adventure-text)"
          opacity="0.08"
        />
        <path
          d="M12 42 60 18 108 42 108 48 12 48Z"
          fill="var(--adventure-orange)"
        />
        <path
          d="M18 44 60 24 102 44"
          fill="none"
          stroke="color-mix(in srgb, var(--adventure-primary) 65%, white)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect
          x="16"
          y="46"
          width="88"
          height="48"
          rx="8"
          fill="var(--adventure-surface-elevated)"
          stroke="color-mix(in srgb, var(--adventure-border) 70%, transparent)"
          strokeWidth="1.5"
        />
        <rect
          x="42"
          y="36"
          width="36"
          height="14"
          rx="5"
          fill="var(--adventure-primary)"
          stroke="color-mix(in srgb, var(--adventure-border) 55%, transparent)"
          strokeWidth="1"
        />
        <path
          d="M60 39 50 43v6h4v-3h12v3h4v-6L60 39Z"
          fill="var(--adventure-text)"
          opacity="0.82"
        />
        <rect
          x="26"
          y="58"
          width="16"
          height="16"
          rx="4"
          fill="color-mix(in srgb, var(--adventure-secondary) 45%, white)"
        />
        <rect
          x="78"
          y="58"
          width="16"
          height="16"
          rx="4"
          fill="color-mix(in srgb, var(--adventure-secondary) 45%, white)"
        />
        <rect
          x="52"
          y="66"
          width="16"
          height="28"
          rx="4"
          fill="color-mix(in srgb, var(--adventure-orange) 22%, var(--adventure-surface))"
        />
        <rect x="50" y="92" width="20" height="2.5" rx="1.25" fill="var(--adventure-border)" opacity="0.7" />
      </svg>

      {/* Foreground grass — near character */}
      <div
        className="absolute bottom-0 left-0 z-[14] h-[22%] w-[55%] bg-gradient-to-tr from-[color-mix(in_srgb,var(--adventure-green)_38%,var(--adventure-background))] via-transparent to-transparent"
        aria-hidden
      />
      <div
        className="absolute bottom-[4%] left-[12%] z-[15] size-3 rounded-[var(--adventure-radius-full)] bg-[color-mix(in_srgb,var(--adventure-green)_50%,white)]/40 sm:size-3.5"
        aria-hidden
      />
      <div
        className="absolute bottom-[8%] left-[22%] z-[15] size-2 rounded-[var(--adventure-radius-full)] bg-[color-mix(in_srgb,var(--adventure-green)_45%,white)]/35"
        aria-hidden
      />

      {/* Character — foreground on path, journey toward school */}
      <div className="absolute bottom-[5%] left-[1%] z-[25] flex flex-col items-center landscape:bottom-[4%] landscape:left-[2%]">
        <div
          className="mb-0.5 h-2.5 w-[min(22vw,5.5rem)] rounded-[var(--adventure-radius-full)] bg-adventure-text/12 blur-[2px]"
          aria-hidden
        />
        <LittleAdventureCharacter
          mood="guiding"
          size="home"
          className="[&_img]:h-[min(34vw,10.5rem)] [&_img]:max-h-[10.5rem] sm:[&_img]:h-[10.75rem] landscape:[&_img]:h-[8.5rem]"
        />
      </div>

      {/* Soft transition into page + learning card below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[30] h-[28%] bg-gradient-to-t from-adventure-background via-adventure-background/85 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[30] h-8 bg-gradient-to-b from-adventure-background to-transparent"
        aria-hidden
      />
    </div>
  );
}

export { WalkThroughWeekMondaySchoolScene };
