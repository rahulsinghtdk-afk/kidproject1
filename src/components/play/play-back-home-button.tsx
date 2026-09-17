"use client";

import { Home } from "lucide-react";
import { ChildLinkButton } from "@/components/child";
import { cn } from "@/lib/utils";

type PlayBackHomeButtonProps = {
  className?: string;
};

/**
 * Large, friendly home control for play flow — icon-only, tablet-sized.
 */
function PlayBackHomeButton({ className }: PlayBackHomeButtonProps) {
  return (
    <ChildLinkButton
      href="/"
      variant="surface"
      size="icon"
      className={cn(
        "rounded-[var(--adventure-radius-full)] bg-adventure-surface/95 shadow-[var(--adventure-shadow-md)]",
        className
      )}
      aria-label="Back home"
    >
      <Home
        className="size-7 text-adventure-orange"
        strokeWidth={2.25}
        aria-hidden
      />
    </ChildLinkButton>
  );
}

export { PlayBackHomeButton };
