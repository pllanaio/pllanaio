"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { trackWebsiteCheckEvent } from "@/lib/website-check/analytics";
import type { WebsiteCheckResult } from "@/lib/website-check/types";

const fieldClass = "mt-2 w-full rounded-2xl border border-border bg-background/85 px-4 py-3.5 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-foreground focus:ring-2 focus:ring-accent/35 disabled:cursor-not-allowed disabled:opacity-60";

interface ErrorResponse {
  ok: false;
  error?: { code?: string; message?: string };
}

type ReportStatus = "idle" | "sending" | "success" | "error";

interface TurnstileApi {
  render: (container: HTMLElement, options: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void; theme: "auto" }) => string;
  reset: (widgetId?: string) => void;
}

function TurnstileField({ onToken }: { onToken: (token: string) => void }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;
    const windowWithTurnstile = window as Window & { turnstile?: TurnstileApi };
    let cancelled = false;
    const render = () => {
      if (cancelled || !containerRef.current || !windowWithTurnstile.turnstile) return;
      windowWithTurnstile.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onToken,
        "expired-callback": () => onToken(""),
        theme: "auto",
      });
    };
    const existing = document.querySelector<HTMLScriptElement>('script[data-website-check-turnstile="true"]');
    if (windowWithTurnstile.turnstile) render();
    else if (existing) existing.addEventListener("load", render, { once: true });
    else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.websiteCheckTurnstile = "true";
      script.addEventListener("load", render, { once: true });
      document.head.appendChild(script);
    }
    return () => { cancelled = true; };
  }, [onToken, siteKey]);

  if (!siteKey) return null;
  return <div ref={containerRef} className="mt-5 min-h-[65px]" aria-label="Sicherheitsprüfung" />;
}

export function ReportLeadForm({ result, analysisToken, onSuccess }: { result: WebsiteCheckResult; analysisToken: string; onSuccess: (marketingConfirmationSent: boolean) => void }) {
  const [status, setStatus] = useState<ReportStatus>("idle");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const formId = useId();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/website-check/request-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          company: data.get("company"),
          email: data.get("email"),
          phone: data.get("phone"),
          website: data.get("website"),
          analysisToken,
          marketingConsent,
          consentTextVersion: "2026-07-22",
          source: "website-check-v1",
          turnstileToken,
        }),
      });
      const payload = await response.json().catch(() => null) as ({ ok: true; marketingConfirmationSent: boolean } | ErrorResponse | null);
      if (!response.ok || !payload || !payload.ok) {
        throw new Error(payload && "error" in payload ? payload.error?.message : "Der Report konnte gerade nicht angefordert werden.");
      }
      trackWebsiteCheckEvent({ event: "report_requested", analysis_id: result.id, domain: result.domain, strategy: result.strategy });
      setStatus("success");
      onSuccess(payload.marketingConfirmationSent);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Der Report konnte gerade nicht angefordert werden.");
      setStatus("error");
    }
  }

  return (
    <section id="detailreport" className="mt-20 scroll-mt-28 rounded-[2.5rem] border border-border bg-card/90 p-6 shadow-premium backdrop-blur-xl sm:p-10 lg:p-14" aria-labelledby={`${formId}-title`}>
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Nächster Schritt</p>
          <h3 id={`${formId}-title`} className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Ausführlichen Website-Report erhalten</h3>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">Wir senden Ihnen eine verständliche Zusammenfassung der wichtigsten technischen Schwachstellen und möglichen nächsten Schritte per E-Mail zu.</p>
          <div className="mt-8 rounded-3xl border border-border bg-muted/35 p-5">
            <p className="text-sm text-muted-foreground">Analysierte Website</p>
            <p className="mt-2 break-all font-medium">{result.normalizedUrl}</p>
            <p className="mt-3 text-sm text-muted-foreground">Die URL ist über den signierten Analysebezug fest mit diesem Report verknüpft und kann im Formular nicht ausgetauscht werden.</p>
          </div>
        </div>

        <form onSubmit={submit} aria-describedby={`${formId}-privacy`}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">Vorname <span aria-hidden="true">*</span><input name="firstName" autoComplete="given-name" required maxLength={80} className={fieldClass} /></label>
            <label className="text-sm font-medium">Nachname <span className="font-normal text-muted-foreground">optional</span><input name="lastName" autoComplete="family-name" maxLength={80} className={fieldClass} /></label>
            <label className="text-sm font-medium sm:col-span-2">Unternehmen <span aria-hidden="true">*</span><input name="company" autoComplete="organization" required maxLength={120} className={fieldClass} /></label>
            <label className="text-sm font-medium sm:col-span-2">Geschäftliche E-Mail-Adresse <span aria-hidden="true">*</span><input name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} className={fieldClass} aria-describedby={`${formId}-privacy`} /></label>
            <label className="text-sm font-medium sm:col-span-2">Telefonnummer <span className="font-normal text-muted-foreground">optional</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} className={fieldClass} /></label>
          </div>
          <label className="hidden" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <p id={`${formId}-privacy`} className="mt-5 text-sm leading-6 text-muted-foreground">Ihre E-Mail-Adresse wird benötigt, um Ihnen den angeforderten Website-Report zuzusenden. Der Report ist nicht von einer Marketing-Einwilligung abhängig.</p>
          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background/55 p-4 text-sm leading-6">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setMarketingConsent(event.target.checked);
                if (event.target.checked) trackWebsiteCheckEvent({ event: "marketing_opt_in_selected", analysis_id: result.id, domain: result.domain });
              }}
              className="mt-1 h-5 w-5 shrink-0 accent-current"
            />
            <span>Ich möchte zusätzlich gelegentlich praktische Tipps zur Verbesserung meiner Website sowie Informationen zu den Leistungen von Leon Pllana IT-Solutions per E-Mail erhalten. Ich kann meine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Weitere Informationen finde ich in der <Link href="/datenschutz" className="underline underline-offset-4 hover:text-foreground">Datenschutzerklärung</Link>.</span>
          </label>
          <TurnstileField onToken={setTurnstileToken} />
          <div className="mt-7">
            <button type="submit" disabled={status === "sending"} className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-foreground px-8 text-base font-medium text-background shadow-premium transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-60 sm:w-auto">
              {status === "sending" ? "Report wird angefordert …" : "Website-Report per E-Mail erhalten"}
              {status !== "sending" && <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />}
            </button>
            <div className="min-h-7 pt-3 text-sm" aria-live="polite">
              {status === "error" && <p className="text-red-700 dark:text-red-300">{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export function WebsiteCheckSuccess({ marketingConfirmationSent }: { marketingConfirmationSent: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <section ref={ref} tabIndex={-1} className="mt-20 rounded-[2.5rem] border border-emerald-500/30 bg-emerald-500/8 p-8 shadow-premium outline-none sm:p-12" aria-labelledby="website-check-success-title">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/35 text-emerald-700 dark:text-emerald-300"><Check className="h-6 w-6" aria-hidden="true" /></div>
      <h3 id="website-check-success-title" className="mt-7 text-4xl font-semibold tracking-[-0.05em]">Ihr Website-Report wurde angefordert.</h3>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Prüfen Sie bitte Ihr E-Mail-Postfach. Der Versand kann in Einzelfällen einige Minuten dauern.</p>
      {marketingConfirmationSent && <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">Für zusätzliche Website-Tipps erhalten Sie separat eine Bestätigungs-E-Mail. Erst nach Ihrer Bestätigung werden Sie in den Verteiler aufgenommen.</p>}
      <Link href="/#kontakt" onClick={() => trackWebsiteCheckEvent({ event: "consultation_cta_clicked" })} className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-foreground px-8 font-medium text-background shadow-premium transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Unverbindliches Erstgespräch vereinbaren <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
    </section>
  );
}
