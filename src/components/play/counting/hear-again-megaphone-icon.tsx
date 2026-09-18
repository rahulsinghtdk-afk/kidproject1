"use client";

import { cn } from "@/lib/utils";

type HearAgainMegaphoneIconProps = {
  className?: string;
};

/** Chunky megaphone — reads as “someone is speaking” for young children. */
function HearAgainMegaphoneIcon({ className }: HearAgainMegaphoneIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <path
        d="M6 12h4l8-6v20l-8-6H6c-1.1 0-2-0.9-2-2v-4c0-1.1 0.9-2 2-2z"
        fill="currentColor"
      />
      <path
        d="M22 11c2.5 1.8 4 4.6 4 8s-1.5 6.2-4 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M26 8c3.5 2.5 5.5 6.2 5.5 11s-2 8.5-5.5 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export { HearAgainMegaphoneIcon };
