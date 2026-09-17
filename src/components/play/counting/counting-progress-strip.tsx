import { cn } from "@/lib/utils";

type CountingProgressStripProps = {
  total: number;
  filledCount: number;
  className?: string;
};

/** Gem-style slots — fill as the child counts (no numerals). */
function CountingProgressStrip({
  total,
  filledCount,
  className,
}: CountingProgressStripProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 rounded-[var(--adventure-radius-full)]",
        "border border-adventure-border/80 bg-adventure-surface/75 px-4 py-2.5 shadow-[inset_0_1px_4px_rgb(55_65_81_/_0.05)]",
        className
      )}
      aria-hidden
    >
      {Array.from({ length: total }, (_, index) => {
        const filled = index < filledCount;
        return (
          <span
            key={index}
            className={cn(
              "size-4 rotate-45 rounded-[0.35rem] border-2 transition-all duration-[var(--adventure-duration-normal)]",
              filled
                ? "scale-110 border-adventure-border bg-adventure-primary shadow-[var(--adventure-shadow-sm)]"
                : "border-adventure-border/70 bg-adventure-surface-elevated/90"
            )}
          />
        );
      })}
    </div>
  );
}

export { CountingProgressStrip };
