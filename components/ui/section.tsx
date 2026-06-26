import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-6", className)}>{children}</div>;
}

export function Section({ className, children, ...props }: React.ComponentPropsWithoutRef<"section">) {
  return (
    <section className={cn("px-6 py-28", className)} {...props}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionEyebrow({ className, children }: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p className={cn("mb-5 text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function SectionTitle({ className, children }: React.ComponentPropsWithoutRef<"h2">) {
  return (
    <h2 className={cn("max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl", className)}>
      {children}
    </h2>
  );
}

export function SectionIntro({ className, children }: React.ComponentPropsWithoutRef<"p">) {
  return <p className={cn("mt-6 max-w-2xl text-lg leading-8 text-muted-foreground", className)}>{children}</p>;
}
