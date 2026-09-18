"use client";

import { ChildButton } from "@/components/child";
import { cn } from "@/lib/utils";
import { HearAgainMegaphoneIcon } from "./hear-again-megaphone-icon";

type HearAgainButtonProps = {
  onPress: () => void;
  className?: string;
};

/** Replays the current spoken instruction (child-sized control). */
function HearAgainButton({ onPress, className }: HearAgainButtonProps) {
  return (
    <ChildButton
      type="button"
      variant="orange"
      size="default"
      className={cn(
        "min-h-[var(--adventure-touch-min)] gap-1.5 rounded-[var(--adventure-radius-full)] px-4",
        "text-[length:var(--adventure-text-md)] shadow-[var(--adventure-shadow-md)]",
        className
      )}
      onClick={onPress}
      aria-label="Hear again"
    >
      <HearAgainMegaphoneIcon className="size-7" />
      <span className="font-[family-name:var(--font-adventure)] font-bold tracking-wide">
        Again
      </span>
    </ChildButton>
  );
}

export { HearAgainButton };
