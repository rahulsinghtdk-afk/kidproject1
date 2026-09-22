"use client";

import { ChildHeading, ChildText } from "@/components/child";
import { cn } from "@/lib/utils";

type WalkThroughWeekStorybookDayBannerProps = {
  dayName: string;
  eventName: string;
  eventEmoji: string;
  showTomorrowBadge?: boolean;
  className?: string;
};

/**
 * Storybook-style day/event sign for Walk Through the Week (UI only — not artwork).
 */
function WalkThroughWeekStorybookDayBanner({
  dayName,
  eventName,
  eventEmoji,
  showTomorrowBadge = false,
  className,
}: WalkThroughWeekStorybookDayBannerProps) {
  return (
    <div
      className={cn(
        "adventure-wtw-storybook-banner flex w-full flex-col items-center gap-3 px-6 py-5 text-center sm:px-8 sm:py-6",
        className
      )}
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
        className="text-[length:var(--adventure-text-3xl)] uppercase tracking-[0.12em] sm:text-[length:clamp(2rem,7vw,2.75rem)]"
      >
        {dayName}
      </ChildHeading>

      <div
        className="flex items-center justify-center gap-2 rounded-[var(--adventure-radius-full)] bg-adventure-background/50 px-5 py-2"
        aria-hidden
      >
        <span className="text-3xl leading-none sm:text-4xl">{eventEmoji}</span>
        <ChildHeading level={2} as="h3" className="text-adventure-text/90">
          {eventName}
        </ChildHeading>
      </div>
    </div>
  );
}

export { WalkThroughWeekStorybookDayBanner };
