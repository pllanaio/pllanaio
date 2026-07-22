"use client";

import { ChangeEvent, FormEvent, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Workflow } from "lucide-react";
import { trackWebsiteCheckEvent } from "@/lib/website-check/analytics";
import type { WebsiteCheckResult, WebsiteCheckStrategy } from "@/lib/website-check/types";
import { AnalysisProgress, progressSteps } from "@/components/website-check/analysis-progress";
import { CoreWebVitals, KeyFindings, ScoreCard } from "@/components/website-check/result-components";
import { ReportLeadForm, WebsiteCheckSuccess } from "@/components/website-check/report-lead-form";

interface AnalyzeResponse {
  ok: true;
  result: WebsiteCheckResult;
  analysisToken: string;
  cacheHit: boolean;
}

interface ErrorResponse {
  ok: false;
  error?: { code?: string; message?: string };
}

function WebsiteCheckResults({ result, analysisToken }: { result: WebsiteCheckResult; analysisToken: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    titleRef.current?.focus();
    trackWebsiteCheckEvent({ event: "report_form_viewed", analysis_id: result.id, domain: result.domain, strategy: result.strategy });
  }, [result]);

  return (
    <div className="mt-14">
      <section className="rounded-[2.5rem] border border-border bg-background/80 p-6 shadow-premium backdrop-blur-xl sm:p-10 lg:p-14" aria-labelledby="website-check-result-title">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Kostenloser Basis-Report</p>
            <h2 ref={titleRef} tabIndex={-1} id="website-check-result-title" className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.055em] outline-none sm:text-6xl">Ihr Ergebnis für {result.domain}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{result.summary}</p>
          </div>
          <div className="rounded-2xl border border-border bg-muted/35 px-5 py-4 text-sm text-muted-foreground">
            <p><span className="font-medium text-foreground">Test:</span> {result.strategy === "mobile" ? "Mobile" : "Desktop"}</p>
            <p className="mt-1"><span className="font-medium text-foreground">Analyse:</span> {new Date(result.createdAt).toLocaleString("de-DE")}</p>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Object.values(result.scores).map((score) => <ScoreCard key={score.key} score={score} />)}</div>
        <CoreWebVitals metrics={result.metrics} fieldDataAvailable={result.fieldDataAvailable} />
        <KeyFindings findings={result.findings} />
      </section>
      {success === null ? <ReportLeadForm result={result} analysisToken={analysisToken} onSuccess={setSuccess} /> : <WebsiteCheckSuccess marketingConfirmationSent={success} />}
    </div>
  );
}

export function WebsiteCheckTool() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<WebsiteCheckStrategy>("mobile");
  const [state, setState] = useState<"idle" | "analyzing" | "success" | "error">("idle");
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState<WebsiteCheckResult | null>(null);
  const [analysisToken, setAnalysisToken] = useState("");
  const [error, setError] = useState("");
  const errorRef = useRef<HTMLParagraphElement>(null);
  const inputId = useId();

  useEffect(() => {
    if (state !== "analyzing") return;
    setActiveStep(0);
    const interval = window.setInterval(() => setActiveStep((current) => Math.min(current + 1, progressSteps.length - 1)), 1_300);
    return () => window.clearInterval(interval);
  }, [state]);

  useEffect(() => {
    if (state === "error") errorRef.current?.focus();
  }, [state]);

  async function analyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    const trimmed = url.trim();
    if (!trimmed || trimmed.length > 2048) {
      setError("Bitte geben Sie eine gültige Website-Adresse ein.");
      setState("error");
      return;
    }

    setState("analyzing");
    trackWebsiteCheckEvent({ event: "website_check_started", strategy });
    try {
      const response = await fetch("/api/website-check/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed, strategy }),
      });
      const payload = await response.json().catch(() => null) as AnalyzeResponse | ErrorResponse | null;
      if (!response.ok || !payload || !payload.ok) {
        const message = payload && "error" in payload ? payload.error?.message : "Die Analyse konnte gerade nicht abgeschlossen werden.";
        const code = payload && "error" in payload ? payload.error?.code : "UNKNOWN";
        trackWebsiteCheckEvent({ event: "website_check_failed", strategy, error_code: code });
        throw new Error(message);
      }
      setActiveStep(progressSteps.length - 1);
      setResult(payload.result);
      setAnalysisToken(payload.analysisToken);
      setState("success");
      trackWebsiteCheckEvent({ event: "website_check_completed", analysis_id: payload.result.id, domain: payload.result.domain, strategy: payload.result.strategy });
    } catch (analysisError) {
      setError(analysisError instanceof Error ? analysisError.message : "Die Analyse konnte gerade nicht abgeschlossen werden.");
      setState("error");
    }
  }

  return (
    <div>
      <form onSubmit={analyze} noValidate className="mx-auto max-w-5xl rounded-[2.25rem] border border-border bg-card/85 p-5 shadow-premium backdrop-blur-xl sm:p-8" aria-describedby={`${inputId}-help ${inputId}-error`}>
        <label htmlFor={inputId} className="text-sm font-medium">Website-URL</label>
        <div className="mt-2 grid gap-3 lg:grid-cols-[1fr_auto]">
          <input id={inputId} name="url" type="text" inputMode="url" autoComplete="url" placeholder="beispiel.de" value={url} onChange={(event: ChangeEvent<HTMLInputElement>) => setUrl(event.target.value)} maxLength={2048} disabled={state === "analyzing"} aria-invalid={state === "error"} className="min-h-16 w-full rounded-2xl border border-border bg-background/90 px-5 text-lg text-foreground outline-none transition placeholder:text-muted-foreground focus:border-foreground focus:ring-2 focus:ring-accent/35 disabled:opacity-60" />
          <button type="submit" disabled={state === "analyzing"} className="inline-flex min-h-16 items-center justify-center rounded-2xl bg-foreground px-7 text-base font-medium text-background shadow-premium transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-60">{state === "analyzing" ? "Analyse läuft …" : "Website kostenlos analysieren"}<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></button>
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p id={`${inputId}-help`} className="text-sm text-muted-foreground">Mit oder ohne https:// – es werden ausschließlich öffentlich erreichbare Seiten geprüft.</p>
          <fieldset className="flex items-center gap-2" disabled={state === "analyzing"}>
            <legend className="sr-only">Testgerät auswählen</legend>
            {(["mobile", "desktop"] as const).map((option) => (
              <label key={option} className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition ${strategy === option ? "border-foreground bg-foreground text-background" : "border-border bg-background/70 text-muted-foreground hover:text-foreground"}`}>
                <input type="radio" name="strategy" value={option} checked={strategy === option} onChange={() => setStrategy(option)} className="sr-only" />{option === "mobile" ? "Mobile" : "Desktop"}
              </label>
            ))}
          </fieldset>
        </div>
        <div id={`${inputId}-error`} className="min-h-7 pt-3 text-sm" aria-live="assertive">
          {state === "error" && <p ref={errorRef} tabIndex={-1} className="text-red-700 outline-none dark:text-red-300">{error}</p>}
        </div>
      </form>

      {state !== "success" && (
        <div className="mt-10 min-h-[22rem]">
          {state === "idle" && (
            <div className="grid min-h-[22rem] place-items-center rounded-[2rem] border border-dashed border-border bg-background/35 p-8 text-center">
              <div className="max-w-2xl"><Workflow className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" /><h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">Vier technische Perspektiven, eine verständliche Auswertung</h2><p className="mt-3 leading-7 text-muted-foreground">Starten Sie den Check, um Performance, Barrierefreiheit, technische Qualität und SEO-Grundlagen zu prüfen. Kontaktdaten sind für den Basis-Report nicht erforderlich.</p></div>
            </div>
          )}
          {state === "analyzing" && <AnalysisProgress activeStep={activeStep} />}
          {state === "error" && (
            <div className="grid min-h-[22rem] place-items-center rounded-[2rem] border border-red-500/30 bg-red-500/7 p-8 text-center">
              <div className="max-w-2xl"><h2 className="text-2xl font-semibold tracking-[-0.04em]">Die Analyse konnte nicht abgeschlossen werden</h2><p className="mt-3 leading-7 text-muted-foreground">{error}</p><p className="mt-3 text-sm text-muted-foreground">Prüfen Sie die Adresse und starten Sie den Check erneut.</p></div>
            </div>
          )}
        </div>
      )}
      {state === "success" && result && analysisToken && <WebsiteCheckResults result={result} analysisToken={analysisToken} />}
    </div>
  );
}
