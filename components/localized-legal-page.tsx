"use client";

import { LegalPage } from "@/components/legal-page";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";

type LocalizedLegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

type LocalizedLegalContent = {
  title: string;
  description: string;
  sections: LocalizedLegalSection[];
};

export function LocalizedLegalPage({ content }: { content: Record<Locale, LocalizedLegalContent> }) {
  const { locale } = useLocale();
  const page = content[locale];

  return (
    <LegalPage
      title={page.title}
      description={page.description}
      sections={page.sections.map((section) => ({
        id: section.id,
        title: section.title,
        children: section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>),
      }))}
    />
  );
}
