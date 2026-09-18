"use client";

import { Music, Music2 } from "lucide-react";
import { ChildButton } from "./child-button";
import { useChildAudioPreference } from "@/hooks/use-child-audio-preference";
import { cn } from "@/lib/utils";

type ChildAudioToggleProps = {
  className?: string;
};

/** Compact music on/off control for play and game screens (icon only, large touch target). */
function ChildAudioToggle({ className }: ChildAudioToggleProps) {
  const { enabled, toggle } = useChildAudioPreference();

  return (
    <ChildButton
      type="button"
      variant={enabled ? "secondary" : "surface"}
      size="icon"
      className={cn(
        "shadow-[var(--adventure-shadow-sm)]",
        !enabled && "opacity-85",
        className
      )}
      aria-pressed={enabled}
      aria-label={enabled ? "Music on" : "Music off"}
      onClick={toggle}
    >
      {enabled ? (
        <Music className="size-7 shrink-0" strokeWidth={2} aria-hidden />
      ) : (
        <Music2 className="size-7 shrink-0 opacity-70" strokeWidth={2} aria-hidden />
      )}
    </ChildButton>
  );
}

export { ChildAudioToggle };
