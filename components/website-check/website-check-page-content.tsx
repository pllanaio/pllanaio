"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Code2, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Button } from "@/components/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLocale } from "@/components/locale-provider";
import { WebsiteCheckTool } from "@/components/website-check/website-check-tool";
import { getWebsiteCheckTranslation } from "@/lib/website-check/i18n";

const featureIcons = [Workflow, Sparkles, ShieldCheck, Code2];

export function WebsiteCheckPageContent({ marketing }: { marketing?: string }) {
  const { locale } = useLocale();
  const t = getWebsiteCheckTranslation(locale);

  return (
    <main className="relative min-h-[100dvh] overflow-hidden text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-3 text-sm font-semibold tracking-[-0.02em]"><Image src="/logo.png" alt="Leon Pllana IT-Solutions Logo" width={32} height={32} className="h-8 w-8 shrink-0 rounded-xl" priority /><span className="truncate">Leon Pllana IT-Solutions</span></Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Website check navigation"><Link href="#website-check" className="text-sm text-muted-foreground transition hover:text-foreground">{t.nav.check}</Link><Link href="#was-wird-geprueft" className="text-sm text-muted-foreground transition hover:text-foreground">{t.nav.scope}</Link><Link href="#faq" className="text-sm text-muted-foreground transition hover:text-foreground">{t.nav.faq}</Link></nav>
          <div className="flex items-center gap-2"><div className="hidden md:block"><LanguageSwitcher /></div><div className="hidden sm:block"><ThemeToggle /></div><Button asChild size="sm"><Link href="/#kontakt">{t.nav.consulting}</Link></Button></div>
        </div>
      </header>

      <section className="relative isolate px-4 pb-20 pt-32 sm:px-6 sm:pb-28 sm:pt-40">
        <div className="gradient-grid absolute inset-0 -z-10 opacity-45" /><div className="absolute left-1/2 top-24 -z-10 h-[32rem] w-[32rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="mx-auto max-w-7xl text-center">
          {marketing === "confirmed" && <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-800 dark:text-emerald-200" role="status">{t.hero.confirmed}</div>}
          {marketing === "invalid" && <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-amber-900 dark:text-amber-200" role="status">{t.hero.invalid}</div>}
          <h1 className="text-balance mx-auto max-w-5xl text-5xl font-semibold tracking-[-0.07em] sm:text-7xl lg:text-8xl">{t.hero.title}</h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-2xl sm:leading-9">{t.hero.text}</p>
          <ul className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground" aria-label={t.hero.trustLabel}>{t.hero.trust.map((item) => <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />{item}</li>)}</ul>
        </div>
        <div id="website-check" className="mx-auto mt-12 max-w-7xl scroll-mt-28"><WebsiteCheckTool /></div>
      </section>

      <section id="was-wird-geprueft" className="premium-frame bg-muted/30 px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl"><p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{t.scope.eyebrow}</p><h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">{t.scope.title}</h2><div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{t.scope.cards.map(([title, text], index) => { const Icon = featureIcons[index]; return <article key={title} className="bg-card p-7 sm:p-8"><span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-muted/45"><Icon className="h-5 w-5" aria-hidden="true" /></span><h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em]">{title}</h3><p className="mt-4 leading-7 text-muted-foreground">{text}</p></article>; })}</div></div>
      </section>

      <section className="px-4 py-24 sm:px-6 sm:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"><div><p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{t.importance.eyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">{t.importance.title}</h2></div><div className="grid gap-4">{t.importance.items.map(([title, text]) => <article key={title} className="rounded-3xl border border-border bg-card/80 p-7 shadow-premium backdrop-blur-xl"><h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3><p className="mt-3 leading-7 text-muted-foreground">{text}</p></article>)}</div></div></section>

      <section id="faq" className="border-y border-border bg-muted/30 px-4 py-24 sm:px-6 sm:py-32"><div className="mx-auto max-w-4xl"><p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{t.faq.eyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">{t.faq.title}</h2><div className="mt-12 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card/90 shadow-premium">{t.faq.items.map(([question, answer]) => <details key={question} className="group p-6 open:bg-muted/30 sm:p-7"><summary className="cursor-pointer list-none pr-8 text-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{question}</summary><p className="mt-4 leading-7 text-muted-foreground">{answer}</p></details>)}</div><div className="mt-12 text-center"><Button asChild size="lg"><Link href="/#kontakt">{t.faq.cta} <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></div></section>

      <footer className="border-t border-border px-6 py-10"><div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"><div><p>© {new Date().getFullYear()} Leon Pllana IT-Solutions</p><p className="mt-1">Innovation in every Step.</p></div><nav className="flex flex-wrap gap-4" aria-label="Legal links"><Link href="/impressum" className="transition hover:text-foreground">{t.footer.imprint}</Link><Link href="/datenschutz" className="transition hover:text-foreground">{t.footer.privacy}</Link><Link href="/agb" className="transition hover:text-foreground">{t.footer.terms}</Link><Link href="/cookie-richtlinie" className="transition hover:text-foreground">{t.footer.cookies}</Link></nav></div></footer>
    </main>
  );
}
