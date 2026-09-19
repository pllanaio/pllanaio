"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";

const footerHeadings = {
  de: { topics: "Themen", legal: "Rechtliches" },
  en: { topics: "Topics", legal: "Legal" },
  sq: { topics: "Tema", legal: "Ligjore" },
} as const;

const pageLabels = {
  de: [
    ["Leistungen", "/leistungen"],
    ["Pakete", "/pakete"],
    ["Strategische Digitalisierung", "/strategische-digitalisierung"],
    ["Kompetenzen", "/kompetenzen"],
    ["Referenzen", "/referenzen"],
    ["IT-Risiken", "/it-risiken"],
    ["Über uns", "/ueber-uns"],
    ["FAQ", "/faq"],
  ],
  en: [
    ["Services", "/leistungen"],
    ["Packages", "/pakete"],
    ["Strategic digitalisation", "/strategische-digitalisierung"],
    ["Capabilities", "/kompetenzen"],
    ["References", "/referenzen"],
    ["IT risks", "/it-risiken"],
    ["About", "/ueber-uns"],
    ["FAQ", "/faq"],
  ],
  sq: [
    ["Shërbimet", "/leistungen"],
    ["Paketat", "/pakete"],
    ["Digjitalizim strategjik", "/strategische-digitalisierung"],
    ["Kompetencat", "/kompetenzen"],
    ["Referencat", "/referenzen"],
    ["Rreziqet IT", "/it-risiken"],
    ["Rreth nesh", "/ueber-uns"],
    ["FAQ", "/faq"],
  ],
} as const;

export function SiteFooter() {
  const { t, locale } = useLocale();

  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 text-sm text-muted-foreground lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="font-medium text-foreground">Leon Pllana IT-Solutions</p>
          <p className="mt-2">{t.footerClaim}</p>
          <Link href="/website-check" className="mt-5 inline-flex font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">{t.websiteCheck.footer}</Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <nav aria-label={t.navigation.footer}>
            <p className="mb-3 font-medium text-foreground">{footerHeadings[locale].topics}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-3">
              {pageLabels[locale].map(([label, href]) => <Link key={href} href={href} className="transition hover:text-foreground">{label}</Link>)}
            </div>
          </nav>
          <nav aria-label="Rechtliches">
            <p className="mb-3 font-medium text-foreground">{footerHeadings[locale].legal}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-3">
              <Link href="/impressum" className="transition hover:text-foreground">{t.legal.imprint}</Link>
              <Link href="/datenschutz" className="transition hover:text-foreground">{t.legal.privacy}</Link>
              <Link href="/agb" className="transition hover:text-foreground">{t.legal.terms}</Link>
              <Link href="/cookie-richtlinie" className="transition hover:text-foreground">{t.legal.cookies}</Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-border pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Leon Pllana IT-Solutions
      </div>
    </footer>
  );
}
