import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { verifyEncryptedToken } from "@/lib/website-check/tokens";
import type { AnalysisTokenPayload, WebsiteScore } from "@/lib/website-check/types";

export const metadata: Metadata = {
  title: "Ihr Website-Report",
  robots: { index: false, follow: false },
};

function scoreClass(status: WebsiteScore["status"]) {
  if (status === "very-good") return "border-emerald-500/30 bg-emerald-500/8";
  if (status === "critical") return "border-red-500/30 bg-red-500/8";
  if (status === "improvement") return "border-amber-500/30 bg-amber-500/8";
  return "border-border bg-muted/35";
}

export default async function WebsiteCheckReportPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  let payload: AnalysisTokenPayload;
  try {
    payload = verifyEncryptedToken<AnalysisTokenPayload>(token, "website-check-analysis");
  } catch {
    notFound();
  }
  const result = payload.analysis;

  return (
    <main className="relative min-h-[100dvh] px-4 pb-20 pt-8 text-foreground sm:px-6 sm:pt-12">
      <div className="gradient-grid absolute inset-0 -z-10 opacity-35" />
      <header className="mx-auto flex max-w-7xl items-center justify-between border-b border-border pb-7">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold"><Image src="/logo.png" alt="Leon Pllana IT-Solutions Logo" width={32} height={32} className="rounded-xl" /><span>Leon Pllana IT-Solutions</span></Link>
        <Link href="/website-check" className="text-sm text-muted-foreground transition hover:text-foreground">Neuen Check starten</Link>
      </header>

      <article className="mx-auto mt-12 max-w-7xl">
        <div className="rounded-[2.5rem] border border-border bg-card/90 p-7 shadow-premium backdrop-blur-xl sm:p-12 lg:p-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Ausführlicher Website-Report</p>
          <h1 className="mt-5 max-w-5xl break-words text-5xl font-semibold tracking-[-0.065em] sm:text-7xl">Technische Auswertung für {result.domain}</h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-muted-foreground">{result.summary}</p>
          <dl className="mt-9 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-muted/30 p-4"><dt>Analysierte URL</dt><dd className="mt-2 break-all font-medium text-foreground">{result.normalizedUrl}</dd></div>
            <div className="rounded-2xl border border-border bg-muted/30 p-4"><dt>Teststrategie</dt><dd className="mt-2 font-medium text-foreground">{result.strategy === "mobile" ? "Mobile" : "Desktop"}</dd></div>
            <div className="rounded-2xl border border-border bg-muted/30 p-4"><dt>Analysezeitpunkt</dt><dd className="mt-2 font-medium text-foreground">{new Date(result.createdAt).toLocaleString("de-DE")}</dd></div>
          </dl>

          <section className="mt-14" aria-labelledby="report-scores"><h2 id="report-scores" className="text-3xl font-semibold tracking-[-0.04em]">Hauptscores</h2><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Object.values(result.scores).map((score) => <article key={score.key} className={`rounded-3xl border p-6 ${scoreClass(score.status)}`}><p className="text-sm font-medium text-muted-foreground">{score.label}</p><p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{score.value ?? "–"}<span className="text-sm font-normal text-muted-foreground">/100</span></p><p className="mt-4 flex items-center gap-2 text-sm"><Check className="h-4 w-4" aria-hidden="true" />{score.statusLabel}</p></article>)}</div></section>

          <section className="mt-16" aria-labelledby="report-metrics"><h2 id="report-metrics" className="text-3xl font-semibold tracking-[-0.04em]">Zentrale Messwerte</h2><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{result.metrics.map((metric) => <article key={`${metric.key}-${metric.source}`} className="rounded-3xl border border-border bg-background/65 p-6"><div className="flex items-start justify-between gap-3"><h3 className="font-medium">{metric.label}</h3><span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{metric.sourceLabel}</span></div><p className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{metric.value ?? "Nicht verfügbar"}</p></article>)}</div></section>

          <section className="mt-16" aria-labelledby="report-findings"><h2 id="report-findings" className="text-3xl font-semibold tracking-[-0.04em]">Priorisierte Erkenntnisse</h2><div className="mt-7 space-y-4">{result.findings.map((finding, index) => <article key={finding.id} className="grid gap-5 rounded-3xl border border-border bg-background/65 p-6 sm:grid-cols-[48px_1fr] sm:p-8"><div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border text-sm font-semibold">{index + 1}</div><div><h3 className="text-2xl font-semibold tracking-[-0.035em]">{finding.title}</h3><p className="mt-3 text-sm font-medium">{finding.technicalSummary}</p><p className="mt-3 leading-7 text-muted-foreground">{finding.businessImpact}</p></div></article>)}</div></section>

          <section className="mt-16 rounded-[2rem] border border-border bg-muted/35 p-7 sm:p-10"><h2 className="text-3xl font-semibold tracking-[-0.04em]">Was sind die nächsten sinnvollen Schritte?</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">Die Ergebnisse sind eine technische Momentaufnahme und ersetzen keine vollständige fachliche Prüfung. In einem unverbindlichen Gespräch können die Befunde nach geschäftlicher Relevanz, Aufwand und realistischer Wirkung priorisiert werden.</p><Link href="/#kontakt" className="mt-7 inline-flex min-h-14 items-center justify-center rounded-full bg-foreground px-8 font-medium text-background shadow-premium transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Unverbindliches Erstgespräch vereinbaren <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link></section>
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-muted-foreground">Der Report basiert auf der Google PageSpeed Insights API und einer automatisierten Priorisierung. Messwerte können schwanken. Ein hoher Score garantiert weder Rankings noch Umsatz.</p>
      </article>
    </main>
  );
}
