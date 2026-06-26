"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Hellen Modus aktivieren" : "Dunklen Modus aktivieren"}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative z-[120] inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-premium transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <Sun className="h-4 w-4 scale-100 opacity-100 transition dark:scale-0 dark:opacity-0" />
      <Moon className="absolute h-4 w-4 scale-0 opacity-0 transition dark:scale-100 dark:opacity-100" />
    </button>
  );
}
