"use client";

import { ChildHeading, ChildText } from "@/components/child";
import { cn } from "@/lib/utils";

type WalkThroughWeekBannerInteraction = "locked" | "ready";

type WalkThroughWeekStorybookDayBannerProps = {
  dayName: string;
  eventName: string;
  eventEmoji: string;
  showTomorrowBadge?: boolean;
  /** Minimal plaque styling when composited over full-bleed environment. */
  inWorld?: boolean;
  /**
   * locked — voice playing; calm, not inviting tap.
   * ready — tap-to-move-forward finished; gentle glow (parent owns the tap).
   */
  interaction?: WalkThroughWeekBannerInteraction;
  className?: string;
};

/**
 * Storybook-style day/event sign for Walk Through the Week (UI only — not artwork).
 * Decorative plaque may later use `walk-through-week-day-banner-artwork.ts` via CSS variable.
 */
function WalkThroughWeekStorybookDayBanner({
  dayName,
  eventName,
  eventEmoji,
  showTomorrowBadge = false,
  inWorld = false,
  interaction = "locked",
  className,
}: WalkThroughWeekStorybookDayBannerProps) {
  return (
    <div
      className={cn(
        "adventure-wtw-storybook-banner flex w-full flex-col items-center text-center",
        inWorld && "adventure-wtw-storybook-banner--in-world",
        interaction === "ready"
          ? "adventure-wtw-storybook-banner--ready"
          : "adventure-wtw-storybook-banner--locked",
        className
      )}
    >
      <div className="adventure-wtw-storybook-banner-plaque" aria-hidden />

      <div
        className="adventure-wtw-storybook-banner-content flex w-full min-h-[var(--adventure-touch-min)] flex-col items-center justify-center gap-2 px-6 py-4 sm:gap-2.5 sm:px-8 sm:py-5"
      >
        {showTomorrowBadge ? (
          <ChildText
            size="label"
            className="rounded-full bg-adventure-orange/20 px-4 py-1 tracking-wide text-adventure-orange uppercase"
          >
            Tomorrow
          </ChildText>
        ) : null}

        <ChildHeading
          level={1}
          as="h2"
          className="text-[length:clamp(2rem,7.2vw,2.85rem)] uppercase tracking-[0.12em]"
        >
          {dayName}
        </ChildHeading>

        <div className="adventure-wtw-storybook-banner-event">
          <span className="text-2xl leading-none sm:text-[1.65rem]" aria-hidden>
            {eventEmoji}
          </span>
          <ChildHeading
            level={3}
            as="h3"
            className="text-[length:var(--adventure-text-lg)] font-medium text-adventure-text/80"
          >
            {eventName}
          </ChildHeading>
        </div>
      </div>
    </div>
  );
}

export { WalkThroughWeekStorybookDayBanner };
export type { WalkThroughWeekBannerInteraction };
