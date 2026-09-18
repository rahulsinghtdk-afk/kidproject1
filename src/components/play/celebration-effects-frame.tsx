"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CelebrationEffectsFrameProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Upper celebration zone — effects are positioned relative to this frame
 * so the scene feels full without decorating the Next area.
 */
function CelebrationEffectsFrame({
  className,
  children,
}: CelebrationEffectsFrameProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 top-[2%] h-[min(62%,30rem)] w-[min(96%,32rem)] -translate-x-1/2 overflow-visible",
        "sm:top-[3%] sm:h-[min(64%,31rem)] sm:w-[min(94%,34rem)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export { CelebrationEffectsFrame };
