"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p>© {new Date().getFullYear()} Leon Pllana IT-Solutions</p>
          <p className="mt-1">{t.footerClaim}</p>
        </div>
        <nav className="flex flex-wrap gap-4" aria-label={t.navigation.footer}>
          <Link href="/leistungen" className="transition hover:text-foreground">{t.nav[3]}</Link>
          <Link href="/website-check" className="transition hover:text-foreground">{t.websiteCheck.footer}</Link>
          <Link href="/impressum" className="transition hover:text-foreground">{t.legal.imprint}</Link>
          <Link href="/datenschutz" className="transition hover:text-foreground">{t.legal.privacy}</Link>
          <Link href="/agb" className="transition hover:text-foreground">{t.legal.terms}</Link>
          <Link href="/cookie-richtlinie" className="transition hover:text-foreground">{t.legal.cookies}</Link>
        </nav>
      </div>
    </footer>
  );
}
