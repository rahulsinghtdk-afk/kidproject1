import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const childSurfaceVariants = cva(
  [
    "font-[family-name:var(--font-adventure)]",
    "rounded-[var(--adventure-radius-xl)]",
    "border-2 border-adventure-border",
    "bg-adventure-surface-elevated",
    "shadow-[var(--adventure-shadow-sm)]",
    "focus-visible:outline-[3px] focus-visible:outline-[var(--adventure-focus-ring)] focus-visible:outline-offset-[var(--adventure-focus-offset)]",
  ],
  {
    variants: {
      interactive: {
        true:
          "min-h-[var(--adventure-touch-min)] min-w-[var(--adventure-touch-min)] cursor-pointer transition-shadow duration-[var(--adventure-duration-normal)] hover:shadow-[var(--adventure-shadow-md)] active:shadow-[var(--adventure-shadow-press)]",
        false: "",
      },
      success: {
        true: "adventure-success-state",
        false: "",
      },
    },
    defaultVariants: {
      interactive: false,
      success: false,
    },
  }
);

type ChildSurfaceProps = React.ComponentProps<"div"> &
  VariantProps<typeof childSurfaceVariants>;

function ChildSurface({
  className,
  interactive,
  success,
  ...props
}: ChildSurfaceProps) {
  return (
    <div
      data-slot="child-surface"
      className={cn(childSurfaceVariants({ interactive, success, className }))}
      {...props}
    />
  );
}

export { ChildSurface, childSurfaceVariants };
