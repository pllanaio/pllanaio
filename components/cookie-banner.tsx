"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/button";
import { useLocale } from "@/components/locale-provider";

type Consent = "accepted" | "declined";

const CONSENT_KEY = "pllana-cookie-consent";

export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(CONSENT_KEY) === "accepted";
}

export function CookieBanner() {
  const { t } = useLocale();
  const cookie = t.cookie;
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    const current = window.localStorage.getItem(CONSENT_KEY);
    let timer: number | undefined;

    if (current !== "accepted" && current !== "declined") {
      timer = window.setTimeout(() => setVisible(true), 2200);
    }

    const openSettings = () => {
      if (timer) window.clearTimeout(timer);
      setVisible(true);
      setSettingsOpen(true);
      setAnalytics(hasAnalyticsConsent());
    };

    window.addEventListener("pllana-open-cookie-settings", openSettings);
    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("pllana-open-cookie-settings", openSettings);
    };
  }, []);

  function saveConsent(value: Consent) {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent("pllana-cookie-consent", { detail: value }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-4xl rounded-[1.5rem] border border-border bg-background/95 p-4 shadow-premium sm:rounded-[2rem] sm:p-6 sm:backdrop-blur-xl">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-base font-semibold tracking-[-0.03em] sm:text-lg">{cookie.title}</p>
            <p className="mt-2 max-w-3xl text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">{cookie.text}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <Link href="/cookie-richtlinie" className="underline-offset-4 hover:text-foreground hover:underline">
                {t.legal.cookies}
              </Link>
              <Link href="/datenschutz" className="underline-offset-4 hover:text-foreground hover:underline">
                {t.legal.privacy}
              </Link>
            </div>
            {settingsOpen ? (
              <div className="mt-4 grid gap-3 rounded-2xl border border-border bg-muted/30 p-3 text-left sm:p-4">
                <label className="flex items-start justify-between gap-4 text-sm">
                  <span>
                    <span className="font-medium">{cookie.necessary}</span>
                    <span className="mt-1 block text-muted-foreground">Erforderlich für Sicherheit, Sprache und Grundfunktionen.</span>
                  </span>
                  <input type="checkbox" checked readOnly className="mt-1" />
                </label>
                <label className="flex items-start justify-between gap-4 text-sm">
                  <span>
                    <span className="font-medium">{cookie.analytics}</span>
                    <span className="mt-1 block text-muted-foreground">Hilft uns, Nutzung anonymisiert auszuwerten und die Website zu verbessern.</span>
                  </span>
                  <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} className="mt-1" />
                </label>
              </div>
            ) : null}
          </div>
          <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-row lg:flex-col">
            <Button onClick={() => saveConsent("accepted")}>{cookie.accept}</Button>
            {settingsOpen ? (
              <Button variant="outline" onClick={() => saveConsent(analytics ? "accepted" : "declined")}>{cookie.save}</Button>
            ) : (
              <Button variant="outline" onClick={() => setSettingsOpen(true)}>{cookie.settings}</Button>
            )}
            <Button variant="ghost" onClick={() => saveConsent("declined")}>{cookie.decline}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  const { t } = useLocale();
  return (
    <button
      type="button"
      className="transition hover:text-foreground"
      onClick={() => window.dispatchEvent(new Event("pllana-open-cookie-settings"))}
    >
      {t.cookie.reopen}
    </button>
  );
}
