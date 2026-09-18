"use client";

import { cn } from "@/lib/utils";
import type { CountingObjectKind } from "@/data/counting/object-kinds";

const playmatTint: Record<
  CountingObjectKind,
  { hill: string; sky: string; speck: string }
> = {
  apple: {
    sky: "from-adventure-orange/25 via-adventure-surface-elevated/90 to-adventure-green/35",
    hill: "bg-[color-mix(in_srgb,var(--adventure-green)_55%,var(--adventure-orange)_15%)]/55",
    speck: "bg-adventure-orange/45",
  },
  star: {
    sky: "from-adventure-primary/30 via-adventure-surface-elevated/90 to-adventure-secondary/30",
    hill: "bg-adventure-primary/28",
    speck: "bg-adventure-primary/50",
  },
  balloon: {
    sky: "from-adventure-secondary/30 via-adventure-surface-elevated/90 to-adventure-primary/25",
    hill: "bg-adventure-secondary/32",
    speck: "bg-adventure-secondary/55",
  },
  ball: {
    sky: "from-adventure-green/28 via-adventure-surface-elevated/90 to-adventure-primary/22",
    hill: "bg-adventure-green/30",
    speck: "bg-adventure-green/50",
  },
  flower: {
    sky: "from-adventure-secondary/32 via-adventure-surface-elevated/90 to-adventure-orange/22",
    hill: "bg-adventure-secondary/30",
    speck: "bg-adventure-secondary/50",
  },
  butterfly: {
    sky: "from-adventure-primary/28 via-adventure-surface-elevated/90 to-adventure-secondary/35",
    hill: "bg-adventure-primary/26",
    speck: "bg-adventure-primary/45",
  },
  strawberry: {
    sky: "from-adventure-orange/30 via-adventure-surface-elevated/90 to-adventure-secondary/25",
    hill: "bg-adventure-orange/28",
    speck: "bg-adventure-orange/48",
  },
  fish: {
    sky: "from-adventure-primary/35 via-adventure-surface-elevated/90 to-adventure-green/28",
    hill: "bg-adventure-primary/24",
    speck: "bg-adventure-primary/42",
  },
  car: {
    sky: "from-adventure-orange/26 via-adventure-surface-elevated/90 to-adventure-green/30",
    hill: "bg-adventure-orange/26",
    speck: "bg-adventure-green/45",
  },
  cake: {
    sky: "from-adventure-secondary/28 via-adventure-surface-elevated/90 to-adventure-orange/32",
    hill: "bg-adventure-secondary/28",
    speck: "bg-adventure-orange/50",
  },
};

type CountingPlaymatProps = {
  objectKind: CountingObjectKind;
  children: React.ReactNode;
  className?: string;
};

function CountingPlaymat({
  objectKind,
  children,
  className,
}: CountingPlaymatProps) {
  const tint = playmatTint[objectKind];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        "min-h-[min(52vh,22rem)] sm:min-h-[min(48vh,24rem)] landscape:min-h-[min(42vh,18rem)]",
        "rounded-[var(--adventure-radius-2xl)] border-[3px] border-adventure-border-strong/90",
        "shadow-[var(--adventure-shadow-md)]",
        className
      )}
    >
      <div
        className={cn("absolute inset-0 bg-gradient-to-b", tint.sky)}
        aria-hidden
      />
      <div
        className={cn(
          "absolute -bottom-10 left-1/2 h-[45%] w-[130%] -translate-x-1/2 rounded-[var(--adventure-radius-full)]",
          tint.hill
        )}
        aria-hidden
      />
      <div
        className={cn(
          "absolute left-[8%] top-[12%] size-3 rounded-full",
          tint.speck
        )}
        aria-hidden
      />
      <div
        className={cn(
          "absolute right-[10%] top-[18%] size-2 rounded-full opacity-80",
          tint.speck
        )}
        aria-hidden
      />
      <div
        className="absolute right-[6%] top-[8%] size-5 rounded-full bg-adventure-surface/75 shadow-[var(--adventure-shadow-sm)]"
        aria-hidden
      />
      <div
        className="absolute left-[14%] top-[6%] size-4 rounded-full bg-adventure-surface/60"
        aria-hidden
      />

      <div className="relative z-10 h-full min-h-[inherit] px-[8%] py-[10%]">
        <div className="relative mx-auto h-full min-h-[min(40vh,18rem)] w-full max-w-xl landscape:min-h-[min(36vh,16rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}

export { CountingPlaymat };
