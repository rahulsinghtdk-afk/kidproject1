import { cn } from "@/lib/utils";

type ChildShellProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  footer?: React.ReactNode;
};

/**
 * Full-viewport child-facing layout: Soft Adventure background, safe areas, content column.
 */
function ChildShell({
  children,
  className,
  contentClassName,
  footer,
}: ChildShellProps) {
  return (
    <div
      className={cn(
        "adventure-child-shell relative flex min-h-dvh min-h-full flex-col overflow-x-hidden bg-adventure-bg",
        className
      )}
    >
      <div className="adventure-child-shell__glow" aria-hidden />
      <main
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-col",
          "px-[max(1.25rem,env(safe-area-inset-left))] py-[max(1.5rem,env(safe-area-inset-top))]",
          "pb-[max(1.5rem,env(safe-area-inset-bottom))]",
          "pr-[max(1.25rem,env(safe-area-inset-right))]",
          contentClassName
        )}
      >
        {children}
      </main>
      {footer ? (
        <footer
          className={cn(
            "relative z-10 shrink-0",
            "px-[max(1.25rem,env(safe-area-inset-left))] pb-[max(1.25rem,env(safe-area-inset-bottom))]",
            "pr-[max(1.25rem,env(safe-area-inset-right))]"
          )}
        >
          {footer}
        </footer>
      ) : null}
    </div>
  );
}

export { ChildShell };
