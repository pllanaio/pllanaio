"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLocale } from "@/components/locale-provider";

type LegalSection = {
  id: string;
  title: string;
  children: ReactNode;
};

const legalChrome = {
  de: {
    eyebrow: "Rechtliches",
    back: "← Zurück zur Startseite",
    contents: "Inhalt",
    updatedAt: "Stand: Juni 2026",
  },
  en: {
    eyebrow: "Legal",
    back: "← Back to homepage",
    contents: "Contents",
    updatedAt: "Last updated: June 2026",
  },
  sq: {
    eyebrow: "Ligjore",
    back: "← Kthehu në faqen kryesore",
    contents: "Përmbajtja",
    updatedAt: "Përditësuar: Qershor 2026",
  },
};

export function LegalPage({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  updatedAt?: string;
  sections: LegalSection[];
}) {
  const { locale } = useLocale();
  const chrome = legalChrome[locale];

  return (
    <main className="min-h-screen bg-background px-6 py-24 text-foreground">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-muted-foreground transition hover:text-foreground">
          {chrome.back}
        </Link>

        <header className="mt-16 border-b border-border pb-16">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">{eyebrow ?? chrome.eyebrow}</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">{title}</h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-muted-foreground">{description}</p>
          <p className="mt-8 text-sm text-muted-foreground">{updatedAt ?? chrome.updatedAt}</p>
        </header>

        <div className="grid gap-16 py-16 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-medium text-foreground">{chrome.contents}</p>
            <nav className="mt-5 space-y-3" aria-label={`${title} Inhaltsverzeichnis`}>
              {sections.map((section, index) => (
                <a key={section.id} href={`#${section.id}`} className="block text-sm text-muted-foreground transition hover:text-foreground">
                  {String(index + 1).padStart(2, "0")} · {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="space-y-14">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 border-b border-border pb-14 last:border-b-0">
                <p className="text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">{section.title}</h2>
                <div className="mt-6 space-y-5 leading-8 text-muted-foreground">{section.children}</div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
