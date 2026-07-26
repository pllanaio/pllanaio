"use client";

import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookie-banner";
import { DarkVeilBackground } from "@/components/dark-veil-background";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocale } from "@/components/locale-provider";

export function GlobalPreferences() {
  const { t } = useLocale();

  return (
    <>
      <style jsx global>{`
        @media (max-width: 767px) {
          :root {
            --muted-foreground: 220 12% 34%;
          }

          .dark {
            --muted-foreground: 220 14% 76%;
          }

          main > section:first-of-type > div:last-child > div:last-child {
            display: none !important;
          }

          main > section:first-of-type {
            min-height: 100svh;
          }

          main > section:not(:first-of-type) {
            content-visibility: auto;
            contain-intrinsic-size: auto 760px;
          }

          .backdrop-blur-xl,
          .backdrop-blur {
            -webkit-backdrop-filter: none !important;
            backdrop-filter: none !important;
          }

          .noise::before {
            display: none;
          }
        }
      `}</style>
      <DarkVeilBackground />
      <div className="fixed bottom-4 right-4 z-[70] flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full border border-border bg-background/90 p-2 text-xs text-muted-foreground shadow-premium backdrop-blur-xl">
        <LanguageSwitcher />
        <Link href="/cookie-richtlinie" className="hidden rounded-full px-3 py-2 transition hover:text-foreground sm:block">
          {t.legal.cookies}
        </Link>
        <span className="hidden h-5 w-px bg-border sm:block" />
        <CookieSettingsButton />
      </div>
    </>
  );
}
