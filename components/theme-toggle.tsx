"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function getInitialDarkMode() {
  if (typeof document === "undefined") return false;

  const storedTheme = window.localStorage.getItem("theme");

  if (storedTheme === "dark") return true;
  if (storedTheme === "light") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(isDark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
  window.localStorage.setItem("theme", isDark ? "dark" : "light");
}

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const initialDarkMode = getInitialDarkMode();
    setIsDark(initialDarkMode);
    applyTheme(initialDarkMode);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    applyTheme(next);
    setIsDark(next);
    setTheme(next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      aria-label={isDark ? "Hellen Modus aktivieren" : "Dunklen Modus aktivieren"}
      aria-pressed={isDark}
      onClick={toggleTheme}
      onTouchEnd={(event) => {
        event.preventDefault();
        toggleTheme();
      }}
      className="relative z-50 inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-border bg-background/70 text-foreground shadow-premium backdrop-blur-xl transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
    >
      <Sun className="h-4 w-4 scale-100 opacity-100 transition dark:scale-0 dark:opacity-0" />
      <Moon className="absolute h-4 w-4 scale-0 opacity-0 transition dark:scale-100 dark:opacity-100" />
    </button>
  );
}
