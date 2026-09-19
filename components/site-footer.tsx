"use client";

import Link from "next/link";
import { Instagram, Linkedin, MessageCircle, Music2 } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { socialLinks } from "@/lib/site-content";

const footerHeadings = {
  de: { topics: "Themen", legal: "Rechtliches", social: "Direkt Kontakt aufnehmen" },
  en: { topics: "Topics", legal: "Legal", social: "Get in touch directly" },
  sq: { topics: "Tema", legal: "Ligjore", social: "Kontakto direkt" },
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
          <div className="mt-7">
            <p className="text-sm font-medium text-foreground">{footerHeadings[locale].social}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background transition hover:bg-muted hover:text-foreground"><Linkedin className="h-4 w-4" aria-hidden="true" /></a>
              <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background transition hover:bg-muted hover:text-foreground"><MessageCircle className="h-4 w-4" aria-hidden="true" /></a>
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background transition hover:bg-muted hover:text-foreground"><Instagram className="h-4 w-4" aria-hidden="true" /></a>
              <a href={socialLinks.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background transition hover:bg-muted hover:text-foreground"><Music2 className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
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
