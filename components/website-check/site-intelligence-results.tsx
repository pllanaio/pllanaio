import { Check, Code2, ShieldCheck, Sparkles } from "lucide-react";
import type { IntelligenceItem, IntelligenceSection, SiteIntelligenceResult } from "@/lib/website-check/types";

function statusIcon(status: IntelligenceItem["status"]) {
  if (status === "good") return <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />;
  if (status === "warning") return <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-300" aria-hidden="true" />;
  if (status === "critical") return <ShieldCheck className="h-4 w-4 text-red-600 dark:text-red-300" aria-hidden="true" />;
  if (status === "unknown") return <Code2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />;
  return <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-300" aria-hidden="true" />;
}

function scoreLabel(score: number | null) {
  if (score === null) return "Analyse";
  if (score >= 80) return "Gut";
  if (score >= 50) return "Ausbaufähig";
  return "Handlungsbedarf";
}

function IntelligenceCard({ section }: { section: IntelligenceSection }) {
  return (
    <details className="group overflow-hidden rounded-3xl border border-border bg-card/80 shadow-sm open:bg-card">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-5 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-7">
        <div className="min-w-0">
          <h4 className="text-xl font-semibold tracking-[-0.03em]">{section.title}</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{section.description}</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-sm font-medium">{section.score === null ? "–" : `${section.score}/100`}</div>
          <div className="mt-1 text-xs text-muted-foreground">{scoreLabel(section.score)}</div>
        </div>
      </summary>
      <div className="border-t border-border px-6 pb-7 pt-2 sm:px-7">
        <div className="divide-y divide-border">
          {section.items.map((entry, index) => (
            <div key={`${entry.label}-${index}`} className="grid gap-2 py-4 sm:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] sm:gap-6">
              <div className="flex items-start gap-2 text-sm font-medium">
                <span className="mt-0.5">{statusIcon(entry.status)}</span>
                <span>{entry.label}</span>
              </div>
              <div className="min-w-0 text-sm leading-6 text-muted-foreground">
                <p className="break-words">{entry.value}</p>
                {entry.evidence && <p className="mt-1 break-words text-xs opacity-80">Nachweis: {entry.evidence}</p>}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Erkennungssicherheit: {section.confidence === "high" ? "hoch" : section.confidence === "medium" ? "mittel" : "niedrig"}</p>
      </div>
    </details>
  );
}

export function SiteIntelligenceResults({ intelligence }: { intelligence: SiteIntelligenceResult }) {
  return (
    <section className="mt-8 rounded-[2.5rem] border border-border bg-background/80 p-6 shadow-premium backdrop-blur-xl sm:p-10 lg:p-14" aria-labelledby="site-intelligence-title">
      <div className="max-w-4xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Erweiterte Website-Analyse</p>
        <h3 id="site-intelligence-title" className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Alles, was öffentlich über die Website erkennbar ist</h3>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">Technologie, Hosting-Indikatoren, DNS, Sicherheit, SEO, AEO, GEO, Tracking, Rechtliches und weitere öffentlich sichtbare Signale.</p>
      </div>

      {intelligence.notes.length > 0 && (
        <div className="mt-8 rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5 text-sm leading-6 text-amber-900 dark:text-amber-100">
          {intelligence.notes.map((note) => <p key={note}>{note}</p>)}
        </div>
      )}

      <div className="mt-8 grid gap-4 xl:grid-cols-2">
        {intelligence.sections.map((entry) => <IntelligenceCard key={entry.key} section={entry} />)}
      </div>
    </section>
  );
}
