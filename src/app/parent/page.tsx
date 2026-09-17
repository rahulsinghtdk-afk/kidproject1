import Link from "next/link";
import { ADVENTURE_APP_NAME } from "@/lib/design-tokens";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ParentPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background px-6 py-12 text-center">
      <div className="max-w-md space-y-3">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Parent area
        </p>
        <h1 className="text-2xl font-semibold text-foreground">
          {ADVENTURE_APP_NAME}
        </h1>
        <p className="text-muted-foreground">
          Settings and progress will live here in a later phase. This is a
          temporary placeholder.
        </p>
      </div>
      <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
        Back to home
      </Link>
    </div>
  );
}
