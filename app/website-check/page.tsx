import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Code2, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Button } from "@/components/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { WebsiteCheckTool } from "@/components/website-check/website-check-tool";

const siteUrl = "https://pllana.io";
const pageUrl = `${siteUrl}/website-check`;
const pageTitle = "Kostenloser Website-Check für Unternehmen | Leon Pllana IT-Solutions";
const pageDescription = "Prüfen Sie kostenlos Performance, SEO, Barrierefreiheit und technische Qualität Ihrer Website. Erhalten Sie eine verständliche Auswertung mit konkretem Verbesserungspotenzial.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: "Leon Pllana IT-Solutions",
    locale: "de_DE",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Kostenloser Website-Check von Leon Pllana IT-Solutions" }],
  },
  twitter: { card: "summary_large_image", title: pageTitle, description: pageDescription, images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

const trustItems = [
  "Kostenloser Basis-Check",
  "Ergebnis in wenigen Minuten",
  "Keine Zugangsdaten erforderlich",
  "Nur öffentlich erreichbare Seiten",
];

const featureCards = [
  { icon: Workflow, title: "Performance", text: "Wir prüfen, wie schnell wichtige Inhalte sichtbar und Seiten bedienbar werden." },
  { icon: Sparkles, title: "SEO-Grundlagen", text: "Technische Grundlagen für eine verständliche Darstellung in Suchmaschinen werden ausgewertet." },
  { icon: ShieldCheck, title: "Barrierefreiheit", text: "Der Check erkennt ausgewählte Hürden für Tastatur-, Screenreader- und kontrastbewusste Nutzung." },
  { icon: Code2, title: "Technische Qualität", text: "Best Practices, Stabilität und auffällige Ressourcen werden in einen geschäftlichen Kontext übersetzt." },
];

const faqItems = [
  ["Ist der Website-Check wirklich kostenlos?", "Ja. Der Basis-Report mit vier Scores, zentralen Kennzahlen und den wichtigsten Erkenntnissen ist kostenlos und ohne Eingabe von Kontaktdaten sichtbar."],
  ["Welche Daten werden geprüft?", "Die öffentlich erreichbare URL wird über die Google PageSpeed Insights API auf Performance, Barrierefreiheit, Best Practices und technische SEO-Grundlagen geprüft. Zugangsdaten oder interne Inhalte werden nicht abgefragt."],
  ["Werden Änderungen an meiner Website vorgenommen?", "Nein. Der Check liest ausschließlich öffentlich verfügbare Messdaten aus und nimmt keinerlei Änderungen an Ihrer Website vor."],
  ["Brauchen Sie Zugangsdaten?", "Nein. Für den Website-Check werden weder CMS-, Hosting- noch Analyse-Zugangsdaten benötigt."],
  ["Warum können die Werte schwanken?", "Messwerte können sich durch Serverauslastung, Netzwerkbedingungen, Drittanbieter-Skripte, neue Inhalte oder den gewählten Testzeitpunkt verändern. Deshalb sind einzelne Messungen immer als Momentaufnahme zu verstehen."],
  ["Ist der Check mit Google PageSpeed Insights identisch?", "Die technische Datenquelle ist die offizielle PageSpeed Insights API. Leon Pllana IT-Solutions priorisiert die Ergebnisse zusätzlich und übersetzt sie in verständliche mögliche Auswirkungen für Unternehmen."],
  ["Was passiert mit meinen Kontaktdaten?", "Kontaktdaten werden nur verarbeitet, wenn Sie den ausführlichen Report anfordern. Sie dienen der Report-Zustellung und werden entsprechend der Datenschutzerklärung behandelt."],
  ["Bekomme ich automatisch einen Newsletter?", "Nein. Marketing-E-Mails sind optional, die Checkbox ist nicht vorausgewählt und der Report wird auch ohne Einwilligung versendet. Eine Aufnahme in den Verteiler erfolgt erst nach separater Double-Opt-in-Bestätigung."],
] as const;

function WebsiteCheckHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-sm font-semibold tracking-[-0.02em]">
          <Image src="/logo.png" alt="Leon Pllana IT-Solutions Logo" width={32} height={32} className="h-8 w-8 shrink-0 rounded-xl" priority />
          <span className="truncate">Leon Pllana IT-Solutions</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Seitennavigation">
          <Link href="#website-check" className="text-sm text-muted-foreground transition hover:text-foreground">Website-Check</Link>
          <Link href="#was-wird-geprueft" className="text-sm text-muted-foreground transition hover:text-foreground">Prüfumfang</Link>
          <Link href="#faq" className="text-sm text-muted-foreground transition hover:text-foreground">FAQ</Link>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:block"><LanguageSwitcher /></div>
          <div className="hidden sm:block"><ThemeToggle /></div>
          <Button asChild size="sm"><Link href="/#kontakt">Beratung</Link></Button>
        </div>
      </div>
    </header>
  );
}

function WebsiteCheckFooter() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div><p>© {new Date().getFullYear()} Leon Pllana IT-Solutions</p><p className="mt-1">Innovation in every Step.</p></div>
        <nav className="flex flex-wrap gap-4" aria-label="Rechtliche Links">
          <Link href="/impressum" className="transition hover:text-foreground">Impressum</Link>
          <Link href="/datenschutz" className="transition hover:text-foreground">Datenschutz</Link>
          <Link href="/agb" className="transition hover:text-foreground">AGB</Link>
          <Link href="/cookie-richtlinie" className="transition hover:text-foreground">Cookie-Richtlinie</Link>
        </nav>
      </div>
    </footer>
  );
}

export default async function WebsiteCheckPage({ searchParams }: { searchParams: Promise<{ marketing?: string }> }) {
  const { marketing } = await searchParams;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    url: pageUrl,
    description: pageDescription,
    inLanguage: "de-DE",
    isPartOf: { "@type": "WebSite", name: "Leon Pllana IT-Solutions", url: siteUrl },
    mainEntity: {
      "@type": "WebApplication",
      name: "Kostenloser Website-Check",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
  };

  return (
    <main className="relative min-h-[100dvh] overflow-hidden text-foreground">
      <WebsiteCheckHeader />
      <section className="relative isolate px-4 pb-20 pt-32 sm:px-6 sm:pb-28 sm:pt-40">
        <div className="gradient-grid absolute inset-0 -z-10 opacity-45" />
        <div className="absolute left-1/2 top-24 -z-10 h-[32rem] w-[32rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="mx-auto max-w-7xl text-center">
          {marketing === "confirmed" && <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-800 dark:text-emerald-200" role="status">Ihre E-Mail-Adresse wurde bestätigt. Vielen Dank.</div>}
          {marketing === "invalid" && <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-amber-900 dark:text-amber-200" role="status">Der Bestätigungslink ist ungültig oder abgelaufen. Eine Aufnahme in den Verteiler ist nicht erfolgt.</div>}
          <h1 className="text-balance mx-auto max-w-5xl text-5xl font-semibold tracking-[-0.07em] sm:text-7xl lg:text-8xl">Wie gut arbeitet Ihre Website wirklich?</h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-2xl sm:leading-9">Analysieren Sie kostenlos die Performance, Suchmaschinen-Basis, Barrierefreiheit und technische Qualität Ihrer Website – verständlich ausgewertet und ohne Fachchinesisch.</p>
          <ul className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground" aria-label="Vorteile des Website-Checks">
            {trustItems.map((item) => <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />{item}</li>)}
          </ul>
        </div>
        <div id="website-check" className="mx-auto mt-12 max-w-7xl scroll-mt-28"><WebsiteCheckTool /></div>
      </section>

      <section id="was-wird-geprueft" className="premium-frame bg-muted/30 px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Was wird geprüft?</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Technische Qualität, verständlich auf das Geschäft übersetzt.</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map(({ icon: Icon, title, text }) => (
              <article key={title} className="bg-card p-7 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-muted/45"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em]">{title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Warum ist das wichtig?</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Eine Website ist ein geschäftlicher Kontaktpunkt – nicht nur eine technische Datei.</h2>
          </div>
          <div className="grid gap-4">
            {[
              ["Geringere Absprungrisiken", "Schnell sichtbare und stabil bedienbare Inhalte können verhindern, dass Interessenten den ersten Eindruck vorzeitig abbrechen."],
              ["Bessere mobile Nutzererfahrung", "Viele geschäftliche Erstkontakte beginnen auf dem Smartphone. Eine belastbare mobile Basis erleichtert Orientierung und Kontaktaufnahme."],
              ["Professionellerer Eindruck", "Stabile Layouts, klare Bedienung und saubere technische Grundlagen unterstützen einen verlässlichen Markenauftritt."],
              ["Technische Voraussetzungen für Sichtbarkeit", "Saubere SEO-Grundlagen helfen Suchmaschinen, Inhalte technisch zu erfassen. Ein hoher Score allein garantiert jedoch weder Rankings noch Umsatz."],
              ["Zugänglichere Inhalte", "Bessere Kontraste, Alternativtexte und nachvollziehbare Bedienelemente können mehr Menschen den Zugang zu Ihren Angeboten ermöglichen."],
            ].map(([title, text]) => <article key={title} className="rounded-3xl border border-border bg-card/80 p-7 shadow-premium backdrop-blur-xl"><h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3><p className="mt-3 leading-7 text-muted-foreground">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="faq" className="border-y border-border bg-muted/30 px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Häufige Fragen</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Transparent erklärt.</h2>
          <div className="mt-12 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card/90 shadow-premium">
            {faqItems.map(([question, answer]) => <details key={question} className="group p-6 open:bg-muted/30 sm:p-7"><summary className="cursor-pointer list-none pr-8 text-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{question}</summary><p className="mt-4 leading-7 text-muted-foreground">{answer}</p></details>)}
          </div>
          <div className="mt-12 text-center"><Button asChild size="lg"><Link href="/#kontakt">Unverbindliches Erstgespräch vereinbaren <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
        </div>
      </section>
      <WebsiteCheckFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
