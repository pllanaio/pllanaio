import Link from "next/link";
import { ArrowRight, Check, Layers3, ShieldCheck, Workflow, Sparkles, Network, Code2 } from "lucide-react";
import { Button } from "@/components/button";
import { FadeIn } from "@/components/motion";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = ["Denkweise", "Vorgehen", "Kompetenzen", "Cases", "FAQ"];

const pains = [
  "Prozesse sind historisch gewachsen, aber nie bewusst gestaltet.",
  "Teams arbeiten mit Tools, die nicht miteinander sprechen.",
  "Entscheidungen entstehen aus Bauchgefühl statt Transparenz.",
  "IT löst Symptome, aber nicht die Ursache im Unternehmen."
];

const steps = [
  ["01", "Verstehen", "Wir betrachten Geschäftsmodell, Menschen, Prozesse und bestehende Systeme."],
  ["02", "Analysieren", "Wir identifizieren Ineffizienzen, Risiken, Medienbrüche und Potenziale."],
  ["03", "Optimieren", "Bevor Technologie eingesetzt wird, vereinfachen wir Abläufe und Entscheidungen."],
  ["04", "Digitalisieren", "Wir wählen die richtige Architektur: Cloud, Microsoft 365, Software, Schnittstellen oder KI."],
  ["05", "Automatisieren", "Wiederkehrende Arbeit wird reduziert, Datenflüsse werden sauber verbunden."],
  ["06", "Begleiten", "Nach dem Projekt beginnt die Partnerschaft: Betrieb, Verbesserung und Skalierung."]
];

const capabilities = [
  [Layers3, "Digitalisierungsberatung", "Strategie, Roadmaps und Priorisierung für digitale Unternehmensentwicklung."],
  [Workflow, "Prozessanalyse & Automatisierung", "Abläufe verstehen, vereinfachen, dokumentieren und automatisieren."],
  [Network, "IT-Infrastruktur & Cloud", "Skalierbare Architekturen für sichere, moderne und effiziente Arbeitsumgebungen."],
  [ShieldCheck, "Cyber Security & Backup", "Schutz, Monitoring, Wiederherstellbarkeit und Verantwortung im Betrieb."],
  [Code2, "Software & API-Integration", "Individuelle Lösungen, Schnittstellen und Systeme, die Prozesse wirklich abbilden."],
  [Sparkles, "KI im Unternehmen", "Pragmatische KI-Anwendungen, die Arbeit erleichtern statt Komplexität erhöhen."]
];

const cases = [
  ["Mittelstand", "Von manuellen Abläufen zu klaren digitalen Prozessen.", "Analyse gewachsener Excel- und E-Mail-Prozesse, Aufbau einer zentralen Microsoft-365-Struktur, Automatisierung wiederkehrender Freigaben."],
  ["Dienstleister", "Mehr Transparenz zwischen Vertrieb, Projekt und Abrechnung.", "Entwicklung einer Integrationslogik zwischen CRM, Projektmanagement und Dokumentation, damit Informationen dort entstehen, wo sie gebraucht werden."],
  ["Produktion", "Sicherere Infrastruktur für langfristiges Wachstum.", "Bewertung der bestehenden IT-Landschaft, Einführung von Backup-, Monitoring- und Security-Prozessen mit klaren Verantwortlichkeiten."]
];

const faqs = [
  ["Bieten Sie klassische IT-Dienstleistungen an?", "Ja, aber nicht isoliert. Infrastruktur, Cloud, Microsoft 365, Security oder Software werden immer aus dem Unternehmenskontext heraus geplant."],
  ["Arbeiten Sie mit kleinen Unternehmen oder nur mit Konzernen?", "Die Unternehmensgröße ist nicht entscheidend. Entscheidend ist, ob Digitalisierung echten Mehrwert schaffen kann und eine langfristige Zusammenarbeit gewünscht ist."],
  ["Verkaufen Sie bestimmte Produkte oder Lizenzen?", "Nein. Technologie folgt dem Prozess. Empfohlen wird, was zum Unternehmen, zur Strategie und zum Zielbild passt."],
  ["Wie beginnt eine Zusammenarbeit?", "Mit einem Gespräch über Ziele, Prozesse, Herausforderungen und Potenziale. Erst danach entsteht eine sinnvolle technologische Empfehlung." ]
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">{children}</p>;
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="#" className="text-sm font-semibold tracking-[-0.02em]">Leon Pllana IT-Solutions</Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Hauptnavigation">
            {nav.map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm text-muted-foreground transition hover:text-foreground">{item}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm"><Link href="#kontakt">Gespräch starten</Link></Button>
          </div>
        </div>
      </header>

      <section className="relative flex min-h-screen items-center px-6 pt-24">
        <div className="gradient-grid absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-36 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-16 py-24 lg:grid-cols-[1.05fr_.95fr]">
          <FadeIn>
            <div className="relative z-10">
              <div className="mb-8 inline-flex rounded-full border border-border bg-background/70 px-4 py-2 text-sm text-muted-foreground shadow-premium backdrop-blur">
                Strategic Digital Transformation · B2B
              </div>
              <h1 className="max-w-5xl text-6xl font-semibold tracking-[-0.07em] sm:text-7xl lg:text-8xl">
                Innovation in every Step.
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9">
                Unternehmen verändern sich nicht durch neue Software. Sie verändern sich durch bessere Entscheidungen, klarere Prozesse und Technologie, die exakt zum Unternehmen passt.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg"><Link href="#kontakt">Digitale Potenziale entdecken <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline"><Link href="#vorgehen">Arbeitsweise ansehen</Link></Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative mx-auto aspect-square max-w-xl rounded-[2rem] border border-border bg-card/70 p-5 shadow-premium backdrop-blur-xl">
              <div className="absolute inset-6 rounded-[1.5rem] border border-border/70" />
              <div className="grid h-full grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="relative rounded-2xl border border-border bg-muted/50 p-4">
                    <div className="absolute inset-x-4 top-4 h-1 rounded-full bg-foreground/10" />
                    <div className="mt-8 h-16 rounded-xl bg-background/70" />
                    {i === 4 && <div className="absolute inset-0 rounded-2xl border border-accent/60 bg-accent/10 shadow-glow" />}
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-6 left-8 right-8 rounded-2xl border border-border bg-background/90 p-5 shadow-premium backdrop-blur-xl">
                <p className="text-sm font-medium">Technologie folgt dem Prozess.</p>
                <p className="mt-1 text-sm text-muted-foreground">Nicht umgekehrt.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="denkweise" className="border-y border-border bg-muted/35 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionLabel>Denkweise</SectionLabel>
            <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">IT ist nicht der Anfang. Verstehen ist der Anfang.</h2>
          </FadeIn>
          <div className="mt-14 grid gap-5 md:grid-cols-4">
            {pains.map((pain, i) => (
              <FadeIn key={pain} delay={i * 0.05}>
                <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-premium">
                  <p className="text-sm text-muted-foreground">Problem {String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-8 text-lg font-medium leading-7">{pain}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="vorgehen" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionLabel>Vorgehen</SectionLabel>
            <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Tausende kleine Optimierungen. Ein Unternehmen, das besser funktioniert.</h2>
          </FadeIn>
          <div className="mt-16 grid gap-4 lg:grid-cols-3">
            {steps.map(([number, title, copy], i) => (
              <FadeIn key={title} delay={i * 0.04}>
                <div className="group h-full rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-premium">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{number}</span>
                    <Check className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
                  </div>
                  <h3 className="mt-10 text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                  <p className="mt-4 leading-7 text-muted-foreground">{copy}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="kompetenzen" className="bg-foreground px-6 py-28 text-background dark:bg-card dark:text-foreground">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionLabel>Kompetenzen</SectionLabel>
            <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Eine Beratungsperspektive. Eine technische Umsetzungskraft.</h2>
          </FadeIn>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-background/15 bg-background/15 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(([Icon, title, copy]) => (
              <div key={title as string} className="bg-foreground p-8 dark:bg-card">
                {/* @ts-expect-error icon component */}
                <Icon className="h-6 w-6" />
                <h3 className="mt-10 text-2xl font-semibold tracking-[-0.03em]">{title as string}</h3>
                <p className="mt-4 leading-7 text-background/65 dark:text-muted-foreground">{copy as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionLabel>Case Studies</SectionLabel>
            <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Nicht Projekte. Entwicklungsschritte.</h2>
          </FadeIn>
          <div className="mt-16 space-y-4">
            {cases.map(([tag, title, copy], i) => (
              <FadeIn key={title} delay={i * 0.05}>
                <article className="grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-premium md:grid-cols-[180px_1fr]">
                  <p className="text-sm font-medium text-muted-foreground">{tag}</p>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                    <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{copy}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-border bg-muted/45 p-8 shadow-premium sm:p-14 lg:p-20">
          <FadeIn>
            <p className="text-lg text-muted-foreground">Brand Promise</p>
            <blockquote className="mt-6 max-w-5xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Jede Zusammenarbeit hinterlässt ein Unternehmen, das besser funktioniert als zuvor.
            </blockquote>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-muted-foreground">Nicht nur technisch. Organisatorisch, strategisch und langfristig.</p>
          </FadeIn>
        </div>
      </section>

      <section id="faq" className="border-y border-border bg-muted/35 px-6 py-28">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Klarheit vor Technologie.</h2>
          </FadeIn>
          <div className="mt-12 divide-y divide-border rounded-3xl border border-border bg-card">
            {faqs.map(([q, a]) => (
              <details key={q} className="group p-7 open:bg-muted/30">
                <summary className="cursor-pointer list-none text-lg font-medium">{q}</summary>
                <p className="mt-4 leading-7 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="px-6 py-28">
        <div className="mx-auto max-w-5xl text-center">
          <FadeIn>
            <SectionLabel>Kontakt</SectionLabel>
            <h2 className="text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">Lassen Sie uns herausfinden, welcher Schritt Ihr Unternehmen besser macht.</h2>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-muted-foreground">Ein erstes Gespräch muss nichts verkaufen. Es muss verstehen, wo heute Potenzial verborgen ist.</p>
            <div className="mt-10 flex justify-center">
              <Button asChild size="lg"><a href="mailto:hello@pllana.io">Gespräch anfragen <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Leon Pllana IT-Solutions</p>
          <p>Innovation in every Step.</p>
        </div>
      </footer>
    </main>
  );
}
