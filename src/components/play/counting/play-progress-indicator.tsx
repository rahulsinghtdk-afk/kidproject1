import { cn } from "@/lib/utils";

type PlayProgressIndicatorProps = {
  total: number;
  currentIndex: number;
  className?: string;
};

function PlayProgressIndicator({
  total,
  currentIndex,
  className,
}: PlayProgressIndicatorProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-2.5", className)}
      aria-label={`Step ${currentIndex + 1} of ${total}`}
      role="img"
    >
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          aria-hidden
          className={cn(
            "size-3 rounded-full border-2 border-adventure-border transition-colors duration-[var(--adventure-duration-normal)]",
            index === currentIndex
              ? "bg-adventure-primary scale-110"
              : index < currentIndex
                ? "bg-adventure-success/70"
                : "bg-adventure-surface"
          )}
        />
      ))}
    </div>
  );
}

export { PlayProgressIndicator };
