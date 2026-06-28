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
    setVisible(current !== "accepted" && current !== "declined");

    const openSettings = () => {
      setVisible(true);
      setSettingsOpen(true);
      setAnalytics(hasAnalyticsConsent());
    };

    window.addEventListener("pllana-open-cookie-settings", openSettings);
    return () => window.removeEventListener("pllana-open-cookie-settings", openSettings);
  }, []);

  function saveConsent(value: Consent) {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent("pllana-cookie-consent", { detail: value }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-border bg-background/95 p-5 shadow-premium backdrop-blur-xl sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-lg font-semibold tracking-[-0.03em]">{cookie.title}</p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{cookie.text}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <Link href="/cookie-richtlinie" className="underline-offset-4 hover:text-foreground hover:underline">
                {t.legal.cookies}
              </Link>
              <Link href="/datenschutz" className="underline-offset-4 hover:text-foreground hover:underline">
                {t.legal.privacy}
              </Link>
            </div>
            {settingsOpen ? (
              <div className="mt-5 grid gap-3 rounded-2xl border border-border bg-muted/30 p-4 text-left">
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
          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
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
