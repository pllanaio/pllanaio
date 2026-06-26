"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-label={isDark ? "Hellen Modus aktivieren" : "Dunklen Modus aktivieren"}
      aria-pressed={isDark}
      className="h-10 w-10 shrink-0 touch-manipulation p-0"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun className="h-4 w-4 scale-100 opacity-100 transition dark:scale-0 dark:opacity-0" />
      <Moon className="absolute h-4 w-4 scale-0 opacity-0 transition dark:scale-100 dark:opacity-100" />
    </Button>
  );
}
