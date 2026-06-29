"use client";

import { useLocale } from "@/components/locale-provider";

const hintText = {
  de: ["Nach links oder rechts wischen,", "um unsere Referenzen zu entdecken."],
  en: ["Swipe left or right", "to discover our references."],
  sq: ["Rrëshqit majtas ose djathtas", "për të zbuluar referencat tona."],
};

export function PartnerSwipeHint() {
  const { locale } = useLocale();
  const [lineOne, lineTwo] = hintText[locale];

  return (
    <p className="mx-auto mt-5 max-w-xs px-6 text-center text-sm leading-6 text-muted-foreground/80 md:hidden">
      {lineOne}
      <br />
      {lineTwo}
    </p>
  );
}
