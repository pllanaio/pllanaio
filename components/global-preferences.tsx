"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { CookieSettingsButton } from "@/components/cookie-banner";
import { DarkVeilBackground } from "@/components/dark-veil-background";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocale } from "@/components/locale-provider";
import "@/components/mobile-performance.css";

const websiteCheckLabels = {
  de: {
    hero: "Website kostenlos prüfen",
    footer: "Website-Check",
  },
  en: {
    hero: "Check your website for free",
    footer: "Website check",
  },
  sq: {
    hero: "Kontrolloni faqen falas",
    footer: "Kontrolli i faqes",
  },
} as const;

export function GlobalPreferences() {
  const { t, locale } = useLocale();
  const [heroActions, setHeroActions] = useState<Element | null>(null);
  const [footerNavigation, setFooterNavigation] = useState<Element | null>(null);
  const websiteCheck = websiteCheckLabels[locale];

  useEffect(() => {
    setHeroActions(document.querySelector("main > section:first-of-type .mt-10.flex"));
    setFooterNavigation(document.querySelector("footer nav"));
  }, []);

  return (
    <>
      <DarkVeilBackground />

      {heroActions &&
        createPortal(
          <Button asChild size="lg">
            <Link href="/website-check">
              {websiteCheck.hero} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>,
          heroActions,
        )}

      {footerNavigation &&
        createPortal(
          <Link href="/website-check" className="transition hover:text-foreground">
            {websiteCheck.footer}
          </Link>,
          footerNavigation,
        )}

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
