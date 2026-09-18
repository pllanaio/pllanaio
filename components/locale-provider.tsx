"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, dictionary, getLocale, type Locale } from "@/lib/i18n";
import { pushDataLayer } from "@/lib/tracking";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof dictionary[Locale];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedLocale = params.get("lang");

    if (requestedLocale === "de" || requestedLocale === "en" || requestedLocale === "sq") {
      setLocaleState(requestedLocale);
      window.localStorage.setItem("pllana-locale", requestedLocale);
      document.documentElement.lang = requestedLocale;
      pushDataLayer("language_init", { language: requestedLocale, source: "url" });
      return;
    }

    const saved = getLocale(window.localStorage.getItem("pllana-locale"));
    if (saved !== defaultLocale) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
      pushDataLayer("language_init", { language: saved, source: "saved" });
      return;
    }

    const browserLanguage = window.navigator.language.toLowerCase();
    if (browserLanguage.startsWith("en")) {
      setLocaleState("en");
      document.documentElement.lang = "en";
      pushDataLayer("language_init", { language: "en", source: "browser" });
      return;
    }
    if (browserLanguage.startsWith("sq")) {
      setLocaleState("sq");
      document.documentElement.lang = "sq";
      pushDataLayer("language_init", { language: "sq", source: "browser" });
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem("pllana-locale", nextLocale);
    document.documentElement.lang = nextLocale;

    const url = new URL(window.location.href);
    if (nextLocale === defaultLocale) {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", nextLocale);
    }
    window.history.replaceState({}, "", url);

    pushDataLayer("language_change", { language: nextLocale });
  };

  const value = useMemo(
    () => ({ locale, setLocale, t: dictionary[locale] }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}
