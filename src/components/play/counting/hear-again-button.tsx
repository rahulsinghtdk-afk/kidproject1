"use client";

import { Volume2 } from "lucide-react";
import { ChildButton } from "@/components/child";
import { cn } from "@/lib/utils";

type HearAgainButtonProps = {
  onPress: () => void;
  className?: string;
};

/** Replays the current spoken instruction (child-sized control). */
function HearAgainButton({ onPress, className }: HearAgainButtonProps) {
  return (
    <ChildButton
      type="button"
      variant="secondary"
      size="large"
      className={cn(
        "min-h-[3.75rem] min-w-[3.75rem] gap-2 px-5 shadow-[var(--adventure-shadow-sm)]",
        className
      )}
      onClick={onPress}
      aria-label="Hear again"
    >
      <Volume2 className="size-8 shrink-0" strokeWidth={2.25} aria-hidden />
      <span className="sr-only">Hear again</span>
    </ChildButton>
  );
}

export { HearAgainButton };
