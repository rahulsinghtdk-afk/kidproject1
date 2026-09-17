import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const childCardVariants = cva(
  [
    "font-[family-name:var(--font-adventure)] text-adventure-text",
    "rounded-[var(--adventure-radius-xl)]",
    "border-2 border-adventure-border",
  ],
  {
    variants: {
      variant: {
        elevated:
          "bg-adventure-surface shadow-[var(--adventure-shadow-md)]",
        flat: "bg-adventure-surface-elevated shadow-none",
        interaction:
          "bg-adventure-surface-elevated shadow-[var(--adventure-shadow-sm)] min-h-[var(--adventure-touch-min)]",
      },
      padding: {
        default: "p-6",
        roomy: "p-8",
        compact: "p-4",
      },
    },
    defaultVariants: {
      variant: "elevated",
      padding: "default",
    },
  }
);

type ChildCardProps = React.ComponentProps<"div"> &
  VariantProps<typeof childCardVariants>;

function ChildCard({
  className,
  variant,
  padding,
  ...props
}: ChildCardProps) {
  return (
    <div
      data-slot="child-card"
      className={cn(childCardVariants({ variant, padding, className }))}
      {...props}
    />
  );
}

export { ChildCard, childCardVariants };
