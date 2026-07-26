"use client";

import { Check } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { getWebsiteCheckTranslation } from "@/lib/website-check/i18n";
import type { WebsiteFinding, WebsiteMetric, WebsiteScore } from "@/lib/website-check/types";

function StatusIcon({ status }: { status: WebsiteScore["status"] }) {
  if (status === "very-good") return <Check className="h-5 w-5" aria-hidden="true" />;
  if (status === "unavailable") return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14" /></svg>;
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 2.8 19h18.4L12 3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>;
}

function scoreTone(status: WebsiteScore["status"]) {
  if (status === "very-good") return "border-emerald-500/35 bg-emerald-500/8 text-emerald-700 dark:text-emerald-300";
  if (status === "critical") return "border-red-500/35 bg-red-500/8 text-red-700 dark:text-red-300";
  if (status === "improvement") return "border-amber-500/35 bg-amber-500/8 text-amber-800 dark:text-amber-300";
  return "border-border bg-muted/35 text-muted-foreground";
}

export function ScoreCard({ score }: { score: WebsiteScore }) {
  const { locale } = useLocale();
  const t = getWebsiteCheckTranslation(locale).tool;
  return (
    <article className={`rounded-3xl border p-6 shadow-premium ${scoreTone(score.status)}`} aria-label={`${score.label}: ${score.value ?? t.unavailable} von 100, ${score.statusLabel}`}>
      <div className="flex items-start justify-between gap-5"><div><p className="text-sm font-medium uppercase tracking-[0.16em]">{score.label}</p><p className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-foreground">{score.value ?? "–"}<span className="ml-1 text-base font-normal text-muted-foreground">/100</span></p></div><span className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20" aria-hidden="true"><StatusIcon status={score.status} /></span></div>
      <p className="mt-5 flex items-center gap-2 text-sm font-medium"><StatusIcon status={score.status} /> {score.statusLabel}</p>
    </article>
  );
}

function metricTone(rating: WebsiteMetric["rating"]) {
  if (rating === "good") return "text-emerald-700 dark:text-emerald-300";
  if (rating === "poor") return "text-red-700 dark:text-red-300";
  if (rating === "needs-improvement") return "text-amber-800 dark:text-amber-300";
  return "text-muted-foreground";
}

export function CoreWebVitals({ metrics, fieldDataAvailable }: { metrics: WebsiteMetric[]; fieldDataAvailable: boolean }) {
  const { locale } = useLocale();
  const t = getWebsiteCheckTranslation(locale).tool;
  return (
    <section aria-labelledby="website-check-metrics-title" className="mt-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{t.metricsEyebrow}</p><h3 id="website-check-metrics-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{t.metricsTitle}</h3></div><p className="max-w-md text-sm leading-6 text-muted-foreground">{fieldDataAvailable ? t.fieldData : t.noFieldData}</p></div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => <article key={`${metric.key}-${metric.source}`} className="rounded-3xl border border-border bg-card/85 p-6 shadow-premium backdrop-blur-xl"><div className="flex items-start justify-between gap-4"><h4 className="font-medium leading-6">{metric.label}</h4><span className="rounded-full border border-border bg-background/75 px-3 py-1 text-xs text-muted-foreground">{metric.sourceLabel}</span></div><p className={`mt-6 text-3xl font-semibold tracking-[-0.04em] ${metricTone(metric.rating)}`}>{metric.value ?? t.unavailable}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{metric.rating === "good" && t.ratingGood}{metric.rating === "needs-improvement" && t.ratingImprove}{metric.rating === "poor" && t.ratingPoor}{metric.rating === "unknown" && t.ratingUnknown}</p></article>)}
      </div>
    </section>
  );
}

function findingTone(severity: WebsiteFinding["severity"]) {
  if (severity === "critical") return "border-red-500/30 bg-red-500/7";
  if (severity === "warning") return "border-amber-500/30 bg-amber-500/7";
  return "border-border bg-muted/30";
}

export function KeyFindings({ findings }: { findings: WebsiteFinding[] }) {
  const { locale } = useLocale();
  const t = getWebsiteCheckTranslation(locale).tool;
  return <section aria-labelledby="website-check-findings-title" className="mt-16"><p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{t.findingsEyebrow}</p><h3 id="website-check-findings-title" className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{t.findingsTitle}</h3><div className="mt-8 space-y-4">{findings.map((finding, index) => <article key={finding.id} className={`grid gap-5 rounded-3xl border p-6 shadow-premium sm:grid-cols-[52px_1fr] sm:p-8 ${findingTone(finding.severity)}`}><div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background/80 text-sm font-semibold" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div><div><h4 className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">{finding.title}</h4><p className="mt-3 text-sm font-medium text-foreground/75">{finding.technicalSummary}</p><p className="mt-3 leading-7 text-muted-foreground">{finding.businessImpact}</p></div></article>)}</div></section>;
}
