"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CelebrationEffectsFrameProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Tall celebration zone — fills upper/middle play area; keeps Next region clean.
 */
function CelebrationEffectsFrame({
  className,
  children,
}: CelebrationEffectsFrameProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 top-0 h-[min(88%,44rem)] w-[min(98%,38rem)] -translate-x-1/2 overflow-visible",
        "sm:h-[min(90%,46rem)] sm:w-[min(98%,40rem)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export { CelebrationEffectsFrame };
