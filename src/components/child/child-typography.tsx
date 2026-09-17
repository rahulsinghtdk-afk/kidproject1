import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const childHeadingVariants = cva(
  "font-[family-name:var(--font-adventure)] text-adventure-text",
  {
    variants: {
      level: {
        1: "text-[length:var(--adventure-text-3xl)] font-semibold leading-[var(--adventure-leading-tight)] tracking-tight",
        2: "text-[length:var(--adventure-text-2xl)] font-semibold leading-[var(--adventure-leading-tight)]",
        3: "text-[length:var(--adventure-text-xl)] font-medium leading-[var(--adventure-leading-tight)]",
      },
    },
    defaultVariants: {
      level: 1,
    },
  }
);

const childTextVariants = cva(
  "font-[family-name:var(--font-adventure)] text-adventure-text",
  {
    variants: {
      size: {
        body: "text-[length:var(--adventure-text-md)] leading-[var(--adventure-leading-relaxed)]",
        large:
          "text-[length:var(--adventure-text-lg)] leading-[var(--adventure-leading-normal)]",
        label:
          "text-[length:var(--adventure-text-sm)] font-medium text-adventure-text-muted leading-[var(--adventure-leading-normal)]",
      },
    },
    defaultVariants: {
      size: "body",
    },
  }
);

type ChildHeadingProps = React.ComponentProps<"h1"> &
  VariantProps<typeof childHeadingVariants> & {
    as?: "h1" | "h2" | "h3";
  };

function ChildHeading({
  className,
  level = 1,
  as,
  ...props
}: ChildHeadingProps) {
  const Tag = as ?? (level === 2 ? "h2" : level === 3 ? "h3" : "h1");

  return (
    <Tag
      className={cn(childHeadingVariants({ level, className }))}
      {...props}
    />
  );
}

type ChildTextProps = React.ComponentProps<"p"> &
  VariantProps<typeof childTextVariants>;

function ChildText({ className, size, ...props }: ChildTextProps) {
  return (
    <p className={cn(childTextVariants({ size, className }))} {...props} />
  );
}

export { ChildHeading, ChildText, childHeadingVariants, childTextVariants };
