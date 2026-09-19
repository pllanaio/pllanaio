import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const siteUrl = "https://pllana.io";
const url = `${siteUrl}/faq`;
const title = "FAQ zu Digitalisierung & IT | Leon Pllana IT-Solutions";
const description = "Antworten auf häufige Fragen zu strategischer Digitalisierung, IT-Betreuung, Microsoft 365, Security, Backups, Automatisierung und Zusammenarbeit.";

const faqs = [
  { question: "Was bedeutet strategische Digitalisierung?", answer: "Strategische Digitalisierung beginnt mit Geschäftsprozessen und Zielen. Erst wenn klar ist, wo Zeit verloren geht, Risiken entstehen oder Transparenz fehlt, werden passende Technologien ausgewählt und priorisiert." },
  { question: "Bieten Sie klassische IT-Dienstleistungen an?", answer: "Ja. Microsoft 365, Cloud, Websites, Security, Backup, Software und laufende Betreuung gehören zum Leistungsportfolio. Diese Themen werden jedoch nicht isoliert, sondern im Kontext des Unternehmens und des gewünschten Ergebnisses geplant." },
  { question: "Muss ich bereits wissen, welche Software ich brauche?", answer: "Nein. Eine Beschreibung des Problems, des aktuellen Ablaufs und des gewünschten Ergebnisses reicht für den Einstieg. Die technische Lösung wird anschließend passend zum Prozess ausgewählt." },
  { question: "Können Sie auch mit einem bestehenden IT-Dienstleister zusammenarbeiten?", answer: "Ja. Bestehende Partner können weiterhin Betrieb oder Support übernehmen, während wir beispielsweise Prozessdigitalisierung, Automatisierung, Software, Integrationen oder einzelne Security-Themen ergänzen." },
  { question: "Wie beginnt eine Zusammenarbeit?", answer: "Mit einem Gespräch über Ausgangslage, Ziele, bestehende Systeme und Prioritäten. Daraus entsteht ein klar abgegrenzter nächster Schritt oder ein konkretes Angebot." },
  { question: "Wie gehen Sie mit IT-Security und Backups um?", answer: "Wir betrachten unter anderem Berechtigungen, MFA, Geräte, Backup, Wiederherstellung, Monitoring und Zuständigkeiten. Entscheidend ist nicht nur, dass Sicherungen existieren, sondern dass Wiederherstellung und Verantwortlichkeiten nachvollziehbar sind." },
  { question: "Gibt es feste Pakete für die laufende Betreuung?", answer: "Ja. Web Care, Workplace Care und Cloud & App Care bieten definierte Betreuungsrahmen. Individuelle Software-, Automatisierungs- und Integrationsvorhaben werden passend zum Projekt angeboten." },
  { question: "Was prüft der kostenlose Website-Check?", answer: "Der Website-Check bewertet öffentlich sichtbare technische Signale wie Performance, SEO-Grundlagen, Security-Header, Technologieindikatoren und weitere technische Merkmale. Er ist eine automatisierte Momentaufnahme und ersetzt keine vollständige fachliche oder rechtliche Prüfung." },
  { question: "Arbeiten Sie nur regional?", answer: "Nein. Viele Leistungen können remote erbracht werden. Für regionale Projekte und Vor-Ort-Termine ist Leon Pllana IT-Solutions im Raum Fürstenfeldbruck und München ansässig." },
];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Leon Pllana IT-Solutions", locale: "de_DE", type: "website", images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Leon Pllana IT-Solutions" }] },
  twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/og-image.png`] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      url,
      name: title,
      inLanguage: "de",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "FAQ", item: url },
      ],
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <SiteHeader />
      <main className="min-h-screen bg-background text-foreground">
        <section className="px-6 pb-12 pt-28 sm:pt-36">
          <div className="mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-10 text-sm text-muted-foreground"><ol className="flex gap-2"><li><Link href="/" className="underline underline-offset-4">Startseite</Link></li><li aria-hidden="true">/</li><li aria-current="page">FAQ</li></ol></nav>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">FAQ</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Antworten auf häufige Fragen zu Digitalisierung und IT.</h1>
            <p className="mt-7 text-lg leading-8 text-muted-foreground">Kurze, direkte Antworten zu unserer Arbeitsweise, laufender Betreuung, Security, Backups, Automatisierung und dem Website-Check.</p>
          </div>
        </section>
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-4xl divide-y divide-border rounded-3xl border border-border bg-card">
            {faqs.map((faq) => <details key={faq.question} className="p-7 open:bg-muted/25"><summary className="cursor-pointer text-lg font-semibold">{faq.question}</summary><p className="mt-4 leading-8 text-muted-foreground">{faq.answer}</p></details>)}
          </div>
        </section>
        <section className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.045em]">Ihre Frage ist nicht dabei?</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted-foreground">Dann beschreiben Sie kurz Ihre Ausgangslage. Ein konkretes Problem ist für den Einstieg hilfreicher als eine fertige technische Lösung.</p>
            <Button asChild size="lg" className="mt-7"><Link href="/#kontakt">Frage stellen<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
