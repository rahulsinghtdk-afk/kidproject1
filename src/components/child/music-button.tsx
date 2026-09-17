"use client";

import { Music, Music2 } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";
import { ChildButton } from "./child-button";
import {
  getMusicEnabledServerSnapshot,
  readMusicEnabled,
  subscribeMusicEnabled,
  writeMusicEnabled,
} from "@/lib/storage/adventure-music";
import { cn } from "@/lib/utils";

type MusicButtonProps = {
  className?: string;
};

function MusicButton({ className }: MusicButtonProps) {
  const enabled = useSyncExternalStore(
    subscribeMusicEnabled,
    readMusicEnabled,
    getMusicEnabledServerSnapshot
  );

  const toggle = useCallback(() => {
    writeMusicEnabled(!readMusicEnabled());
  }, []);

  return (
    <ChildButton
      type="button"
      variant={enabled ? "secondary" : "surface"}
      size="default"
      className={cn("gap-2 px-5", !enabled && "opacity-80", className)}
      aria-pressed={enabled}
      aria-label={enabled ? "Music on" : "Music off"}
      onClick={toggle}
    >
      {enabled ? (
        <Music className="size-6 shrink-0" strokeWidth={2} aria-hidden />
      ) : (
        <Music2 className="size-6 shrink-0 opacity-70" strokeWidth={2} aria-hidden />
      )}
      <span className="text-[length:var(--adventure-text-md)]">Music</span>
    </ChildButton>
  );
}

export { MusicButton };
