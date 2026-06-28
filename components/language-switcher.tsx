"use client";

import { locales } from "@/lib/i18n";
import { useLocale } from "@/components/locale-provider";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <label className="flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-2 text-xs font-medium text-muted-foreground backdrop-blur transition hover:text-foreground">
      <span aria-hidden="true">🌐</span>
      <span className="sr-only">Sprache auswählen</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as typeof locale)}
        className="bg-transparent text-xs font-medium outline-none"
        aria-label="Sprache auswählen"
      >
        {locales.map((item) => (
          <option key={item.code} value={item.code}>
            {item.flag} {item.short}
          </option>
        ))}
      </select>
    </label>
  );
}
