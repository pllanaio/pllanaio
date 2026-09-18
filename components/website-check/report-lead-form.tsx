"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, LockKeyhole } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { trackWebsiteCheckEvent } from "@/lib/website-check/analytics";
import type { WebsiteCheckResult } from "@/lib/website-check/types";

const fieldClass = "mt-2 w-full rounded-2xl border border-border bg-background/85 px-4 py-3.5 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-foreground focus:ring-2 focus:ring-accent/35 disabled:cursor-not-allowed disabled:opacity-60";

export type WebsiteCheckPreview = Pick<WebsiteCheckResult, "normalizedUrl" | "domain" | "strategy">;

const labels = {
  de: {
    security: "Sicherheitsprüfung",
    error: "Das Ergebnis konnte gerade nicht freigeschaltet werden.",
    eyebrow: "Analyse abgeschlossen",
    title: "Ihr Ergebnis ist bereit.",
    intro: "Hinterlassen Sie kurz Ihre Kontaktdaten. Direkt danach zeigen wir Ihnen die vollständige Auswertung und senden Ihnen den Report zusätzlich per E-Mail.",
    analysed: "Analysierte Website",
    locked: "Scores, technische Auffälligkeiten und konkrete Verbesserungspotenziale werden nach dem Absenden Ihrer Kontaktdaten freigeschaltet.",
    first: "Vorname",
    last: "Nachname",
    company: "Unternehmen",
    email: "Geschäftliche E-Mail-Adresse",
    phone: "Telefonnummer",
    optional: "optional",
    privacy: "Ihre Kontaktdaten werden benötigt, um die angeforderte Auswertung freizuschalten und Ihnen den Website-Report zuzusenden. Eine Marketing-Einwilligung ist dafür nicht erforderlich.",
    marketingA: "Ich möchte zusätzlich gelegentlich praktische Tipps zur Verbesserung meiner Website sowie Informationen zu den Leistungen von Leon Pllana IT-Solutions per E-Mail erhalten. Ich kann meine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Weitere Informationen finde ich in der",
    privacyLink: "Datenschutzerklärung",
    sending: "Ergebnis wird freigeschaltet …",
    submit: "Ergebnis anzeigen & Report erhalten",
    successTitle: "Ihre Auswertung ist freigeschaltet.",
    successText: "Sie sehen die vollständigen Ergebnisse jetzt direkt auf dieser Seite. Den Report senden wir Ihnen zusätzlich per E-Mail zu.",
    confirmation: "Für zusätzliche Website-Tipps erhalten Sie separat eine Bestätigungs-E-Mail. Erst nach Ihrer Bestätigung werden Sie in den Verteiler aufgenommen.",
    cta: "Unverbindliches Erstgespräch vereinbaren",
    trust: "Keine Pflicht zur Marketing-Einwilligung · Ihre Analyse bleibt mit der eingegebenen URL verknüpft",
  },
  en: {
    security: "Security check",
    error: "The result could not be unlocked right now.",
    eyebrow: "Analysis complete",
    title: "Your result is ready.",
    intro: "Leave your contact details and we will immediately unlock the complete evaluation and also send the report by email.",
    analysed: "Analysed website",
    locked: "Scores, technical findings and concrete improvement opportunities are unlocked after you submit your contact details.",
    first: "First name",
    last: "Last name",
    company: "Company",
    email: "Business email address",
    phone: "Phone number",
    optional: "optional",
    privacy: "Your contact details are required to unlock the requested evaluation and send you the website report. Marketing consent is not required.",
    marketingA: "I would also like to occasionally receive practical website improvement tips and information about Leon Pllana IT-Solutions by email. I can withdraw my consent at any time. Further information is available in the",
    privacyLink: "privacy policy",
    sending: "Unlocking result …",
    submit: "Show result & receive report",
    successTitle: "Your evaluation is unlocked.",
    successText: "You can now see the complete results directly on this page. We will also send the report to you by email.",
    confirmation: "You will receive a separate confirmation email for additional website tips. You will only be added after confirming.",
    cta: "Book a non-binding initial consultation",
    trust: "No marketing consent required · Your analysis stays linked to the submitted URL",
  },
  sq: {
    security: "Kontroll sigurie",
    error: "Rezultati nuk mund të hapej tani.",
    eyebrow: "Analiza përfundoi",
    title: "Rezultati juaj është gati.",
    intro: "Lini shkurt të dhënat e kontaktit. Menjëherë pas kësaj do të shihni vlerësimin e plotë dhe raportin do ta merrni edhe me email.",
    analysed: "Faqja e analizuar",
    locked: "Pikët, gjetjet teknike dhe mundësitë konkrete për përmirësim hapen pasi të dërgoni të dhënat e kontaktit.",
    first: "Emri",
    last: "Mbiemri",
    company: "Kompania",
    email: "Emaili i biznesit",
    phone: "Numri i telefonit",
    optional: "opsionale",
    privacy: "Të dhënat e kontaktit nevojiten për të hapur vlerësimin dhe për t'ju dërguar raportin. Pëlqimi për marketing nuk është i detyrueshëm.",
    marketingA: "Dëshiroj të marr herë pas here këshilla praktike për përmirësimin e faqes dhe informacione për Leon Pllana IT-Solutions me email. Mund ta tërheq pëlqimin në çdo kohë. Informacione të tjera gjenden te",
    privacyLink: "politika e privatësisë",
    sending: "Po hapet rezultati …",
    submit: "Shfaq rezultatin & merr raportin",
    successTitle: "Vlerësimi juaj u hap.",
    successText: "Tani mund t'i shihni rezultatet e plota direkt në këtë faqe. Raportin do ta merrni edhe me email.",
    confirmation: "Për këshilla shtesë do të merrni një email konfirmimi. Do të shtoheni vetëm pas konfirmimit.",
    cta: "Rezervoni një bisedë fillestare pa detyrim",
    trust: "Nuk kërkohet pëlqim marketingu · Analiza mbetet e lidhur me URL-në e dërguar",
  },
} as const;

type ReportStatus = "idle" | "sending" | "error";
interface ErrorResponse { ok: false; error?: { code?: string; message?: string }; }
interface ReportSuccessResponse { ok: true; result: WebsiteCheckResult; marketingConfirmationSent: boolean; }
interface TurnstileApi { render: (container: HTMLElement, options: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void; theme: "auto" }) => string; reset: (widgetId?: string) => void; }

function TurnstileField({ onToken, ariaLabel }: { onToken: (token: string) => void; ariaLabel: string }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;
    const apiWindow = window as Window & { turnstile?: TurnstileApi };
    let cancelled = false;
    const render = () => {
      if (!cancelled && containerRef.current && apiWindow.turnstile) {
        apiWindow.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: onToken,
          "expired-callback": () => onToken(""),
          theme: "auto",
        });
      }
    };
    const existing = document.querySelector<HTMLScriptElement>('script[data-website-check-turnstile="true"]');
    if (apiWindow.turnstile) render();
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
  return <div ref={containerRef} className="mt-5 min-h-[65px]" aria-label={ariaLabel} />;
}

export function ReportLeadForm({
  preview,
  analysisToken,
  onSuccess,
}: {
  preview: WebsiteCheckPreview;
  analysisToken: string;
  onSuccess: (result: WebsiteCheckResult, marketingConfirmationSent: boolean) => void;
}) {
  const { locale } = useLocale();
  const t = labels[locale];
  const [status, setStatus] = useState<ReportStatus>("idle");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const formId = useId();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
    trackWebsiteCheckEvent({ event: "report_form_viewed", domain: preview.domain, strategy: preview.strategy });
  }, [preview.domain, preview.strategy]);

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
          locale,
        }),
      });
      const payload = await response.json().catch(() => null) as ReportSuccessResponse | ErrorResponse | null;
      if (!response.ok || !payload || !payload.ok || !payload.result) {
        throw new Error(payload && "error" in payload ? payload.error?.message : t.error);
      }

      trackWebsiteCheckEvent({
        event: "report_requested",
        analysis_id: payload.result.id,
        domain: payload.result.domain,
        strategy: payload.result.strategy,
      });
      onSuccess(payload.result, payload.marketingConfirmationSent);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : t.error);
      setStatus("error");
    }
  }

  return (
    <section id="detailreport" className="mt-14 scroll-mt-28 rounded-[2.5rem] border border-border bg-card/90 p-6 shadow-premium backdrop-blur-xl sm:p-10 lg:p-14" aria-labelledby={`${formId}-title`}>
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-muted/45">
            <LockKeyhole className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{t.eyebrow}</p>
          <h2 ref={titleRef} tabIndex={-1} id={`${formId}-title`} className="mt-4 text-4xl font-semibold tracking-[-0.055em] outline-none sm:text-5xl">{t.title}</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">{t.intro}</p>
          <div className="mt-8 rounded-3xl border border-border bg-muted/35 p-5">
            <p className="text-sm text-muted-foreground">{t.analysed}</p>
            <p className="mt-2 break-all font-medium">{preview.normalizedUrl}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{t.locked}</p>
          </div>
          <p className="mt-5 text-sm leading-6 text-muted-foreground">{t.trust}</p>
        </div>

        <form onSubmit={submit} aria-describedby={`${formId}-privacy`}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">{t.first} *<input name="firstName" autoComplete="given-name" required maxLength={80} className={fieldClass} /></label>
            <label className="text-sm font-medium">{t.last} <span className="font-normal text-muted-foreground">{t.optional}</span><input name="lastName" autoComplete="family-name" maxLength={80} className={fieldClass} /></label>
            <label className="text-sm font-medium sm:col-span-2">{t.company} *<input name="company" autoComplete="organization" required maxLength={120} className={fieldClass} /></label>
            <label className="text-sm font-medium sm:col-span-2">{t.email} *<input name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} className={fieldClass} /></label>
            <label className="text-sm font-medium sm:col-span-2">{t.phone} <span className="font-normal text-muted-foreground">{t.optional}</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} className={fieldClass} /></label>
          </div>

          <label className="hidden" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <p id={`${formId}-privacy`} className="mt-5 text-sm leading-6 text-muted-foreground">{t.privacy}</p>
          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background/55 p-4 text-sm leading-6">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setMarketingConsent(event.target.checked);
                if (event.target.checked) trackWebsiteCheckEvent({ event: "marketing_opt_in_selected", domain: preview.domain, strategy: preview.strategy });
              }}
              className="mt-1 h-5 w-5 shrink-0 accent-current"
            />
            <span>{t.marketingA} <Link href="/datenschutz" className="underline underline-offset-4 hover:text-foreground">{t.privacyLink}</Link>.</span>
          </label>

          <TurnstileField onToken={setTurnstileToken} ariaLabel={t.security} />

          <div className="mt-7">
            <button type="submit" disabled={status === "sending"} className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-foreground px-8 text-base font-medium text-background shadow-premium transition hover:opacity-90 disabled:opacity-60 sm:w-auto">
              {status === "sending" ? t.sending : t.submit}
              {status !== "sending" && <ArrowRight className="ml-2 h-4 w-4" />}
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
  const { locale } = useLocale();
  const t = labels[locale];
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);

  return (
    <section ref={ref} tabIndex={-1} className="mt-10 rounded-[2.5rem] border border-emerald-500/30 bg-emerald-500/8 p-8 shadow-premium outline-none sm:p-12">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/35 text-emerald-700 dark:text-emerald-300"><Check className="h-6 w-6" /></div>
      <h3 className="mt-7 text-4xl font-semibold tracking-[-0.05em]">{t.successTitle}</h3>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{t.successText}</p>
      {marketingConfirmationSent && <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{t.confirmation}</p>}
      <Link href="/#kontakt" onClick={() => trackWebsiteCheckEvent({ event: "consultation_cta_clicked" })} className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-foreground px-8 font-medium text-background shadow-premium transition hover:opacity-90">
        {t.cta}<ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </section>
  );
}
