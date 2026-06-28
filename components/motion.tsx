import { cn } from "@/lib/utils";

export function FadeIn({ children, className }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={cn("opacity-100", className)}>{children}</div>;
}
