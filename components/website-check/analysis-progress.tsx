import { Check, Sparkles } from "lucide-react";

export const progressSteps = [
  "Website wird auf Erreichbarkeit geprüft",
  "Performance wird analysiert",
  "SEO-Grundlagen werden ausgewertet",
  "Barrierefreiheit wird geprüft",
  "Ergebnisse werden verständlich aufbereitet",
];

export function AnalysisProgress({ activeStep }: { activeStep: number }) {
  return (
    <div className="min-h-[22rem] rounded-[2rem] border border-border bg-card/80 p-6 shadow-premium backdrop-blur-xl sm:p-10" role="status" aria-live="polite" aria-atomic="true">
      <div className="flex items-center gap-4">
        <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
          <Sparkles className="h-5 w-5 motion-safe:animate-pulse" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">Ihre Website wird analysiert</h2>
          <p className="mt-1 text-sm text-muted-foreground">Je nach Website und Auslastung kann die Prüfung etwas dauern.</p>
        </div>
      </div>
      <ol className="mt-8 space-y-3">
        {progressSteps.map((step, index) => {
          const done = index < activeStep;
          const active = index === activeStep;
          return (
            <li key={step} className={`flex min-h-14 items-center gap-4 rounded-2xl border px-4 py-3 transition ${active ? "border-accent/40 bg-accent/8" : "border-border/70 bg-background/45"}`}>
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs ${done ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : active ? "border-accent/50 text-accent" : "border-border text-muted-foreground"}`}>
                {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : active ? <span className="h-2 w-2 rounded-full bg-current motion-safe:animate-pulse" /> : index + 1}
              </span>
              <span className={active || done ? "text-foreground" : "text-muted-foreground"}>{step}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
