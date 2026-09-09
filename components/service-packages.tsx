"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { useLocale } from "@/components/locale-provider";
import { useOfferSelection } from "@/components/offer-selection-provider";
import { Section, SectionEyebrow, SectionTitle } from "@/components/ui/section";
import { additionalHourlyRate, portfolioCopy, servicePackages } from "@/lib/service-packages";
import { projectCopy, projectOffers } from "@/lib/project-offers";
import { selectionCopy, type OfferMode } from "@/lib/offer-selection-copy";
import type { OfferId } from "@/lib/offer-selection";

const careGroups = {
  web: ["web-care", "website-setup"],
  workplace: ["workplace-care", "workplace-setup"],
  cloud: ["cloud-care"],
} as const satisfies Record<(typeof servicePackages)[number]["id"], readonly OfferId[]>;

function goToContactForm() {
  const form = document.getElementById("angebotsanfrage");
  if (form) {
    form.focus({ preventScroll: true });
    form.scrollIntoView({ behavior: "instant", block: "start" });
  }
}

function CareCard({ service }: { service: (typeof servicePackages)[number] }) {
  const { locale } = useLocale();
  const { selectedOffers, replaceGroup, sending } = useOfferSelection();
  const copy = portfolioCopy[locale];
  const choice = selectionCopy[locale];
  const item = copy.packages[service.id];
  const projectId = service.id === "web" ? "website" : service.id === "workplace" ? "microsoft365" : null;
  const project = projectId ? projectCopy[locale].offers[projectId] : null;
  const setupPrice = projectId ? projectOffers.find((offer) => offer.id === projectId)!.fixedPrice : null;
  const group = careGroups[service.id];
  const careId = group[0];
  const setupId = group.length > 1 ? group[1] : null;
  const [mode, setMode] = useState<OfferMode>(() => setupId && selectedOffers.includes(setupId) ? selectedOffers.includes(careId) ? "bundle" : "setup" : "care");
  const nextSelection = setupId ? mode === "bundle" ? group : [mode === "setup" ? setupId : careId] : group;
  const inRequest = group.some((id) => selectedOffers.includes(id));
  const hasCare = !setupId || mode !== "setup";
  const hasSetup = !!setupId && mode !== "care";
  const euro = (value: number) => `${new Intl.NumberFormat(locale).format(value)} €`;
  const modes: { value: OfferMode; label: string }[] = [
    { value: "care", label: choice.careOnly },
    { value: "bundle", label: service.id === "web" ? choice.websiteBundle : choice.workplaceBundle },
    { value: "setup", label: service.id === "web" ? choice.websiteOnly : choice.workplaceOnly },
  ];

  return (
    <article aria-labelledby={`package-${service.id}`} className="min-w-0 rounded-3xl border border-border bg-card p-6 shadow-premium sm:p-8">
      <p className="text-sm text-muted-foreground">{item.audience}</p>
      <h3 id={`package-${service.id}`} className="mt-3 text-3xl font-semibold tracking-tight">{service.name}</h3>
      <p className="mt-4 leading-7 text-muted-foreground">{item.outcome}</p>
      {project && (
        <fieldset disabled={sending} className="mt-6 space-y-2">
          <legend className="mb-3 text-sm font-medium">{choice.configure}</legend>
          {modes.map((option) => (
            <label key={option.value} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm leading-5 ${mode === option.value ? "border-foreground bg-muted" : "border-border"}`}>
              <input type="radio" name={`mode-${service.id}`} value={option.value} checked={mode === option.value} onChange={() => setMode(option.value)} className="h-4 w-4 shrink-0 accent-foreground" />
              {option.label}
            </label>
          ))}
        </fieldset>
      )}
      <div className="mt-6 space-y-3" aria-live="polite" aria-atomic="true">
        {hasSetup && setupPrice !== null && <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1"><span className="text-4xl font-semibold tracking-tight">{euro(setupPrice)}</span><span className="text-sm text-muted-foreground">{choice.once}</span></p>}
        {hasCare ? <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1"><span className="text-sm text-muted-foreground">{copy.from}</span><span className="text-4xl font-semibold tracking-tight">{euro(service.monthlyPrice)}</span><span className="text-sm text-muted-foreground">{copy.monthly}</span></p> : <p className="text-sm text-muted-foreground">{choice.noMonthly}</p>}
        <p className="text-sm text-muted-foreground">{copy.net}</p>
      </div>
      <Button type="button" size="lg" disabled={sending} className="mt-6 w-full px-3" onClick={() => { replaceGroup(group, nextSelection); goToContactForm(); }} aria-label={`${service.name}: ${inRequest ? choice.update : choice.select}`}>{inRequest ? choice.update : choice.select}</Button>
      {inRequest && <p className="mt-2 text-center text-sm text-muted-foreground">{choice.selected}</p>}
      {hasSetup && project && <div className="mt-7 border-t border-border pt-5">
        <h4 className="font-semibold">{project.title}</h4>
        <p className="mt-2 leading-7 text-muted-foreground">{project.outcome}</p>
        <details className="mt-3">
          <summary className="cursor-pointer py-2 font-medium underline underline-offset-4">{choice.setupDetails}</summary>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-muted-foreground">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </details>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.scope}</p>
      </div>}
      {hasCare && <>
        <dl className="mt-7 border-y border-border py-5">
          <dt className="text-sm text-muted-foreground">{copy.timeLabel}</dt>
          <dd className="mt-1 text-lg font-semibold">{new Intl.NumberFormat(locale).format(service.serviceHours)} {copy.hours}</dd>
          <dt className="mt-4 text-sm text-muted-foreground">{copy.scopeLabel}</dt>
          <dd className="mt-1 leading-7">{item.scope}</dd>
        </dl>
        <details className="mt-5">
          <summary className="cursor-pointer rounded-sm py-2 font-medium underline decoration-border underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">{copy.details}</summary>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-muted-foreground">{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          <p className="mt-5 font-medium">{copy.separately}</p>
          <p className="mt-2 leading-7 text-muted-foreground">{item.exclusions}</p>
        </details>
      </>}
    </article>
  );
}

function IndividualCard() {
  const { locale } = useLocale();
  const { selectedOffers, replaceGroup, sending } = useOfferSelection();
  const choice = selectionCopy[locale];
  const inRequest = selectedOffers.includes("individual-care");
  return (
    <article aria-labelledby="package-individual" className="min-w-0 rounded-3xl border border-border bg-card p-6 shadow-premium sm:p-8">
      <p className="text-sm text-muted-foreground">{choice.individualAudience}</p>
      <h3 id="package-individual" className="mt-3 text-3xl font-semibold tracking-tight">Individual Care</h3>
      <p className="mt-4 leading-7 text-muted-foreground">{choice.individualOutcome}</p>
      <p className="mt-6 text-4xl font-semibold tracking-tight">{projectCopy[locale].onRequest}</p>
      <p className="mt-3 leading-7 text-muted-foreground">{choice.individualScope}</p>
      <Button type="button" size="lg" disabled={sending} className="mt-6 w-full px-3" onClick={() => { replaceGroup(["individual-care"], ["individual-care"]); goToContactForm(); }} aria-label={`Individual Care: ${inRequest ? choice.update : choice.select}`}>{inRequest ? choice.update : choice.select}</Button>
      {inRequest && <p className="mt-2 text-center text-sm text-muted-foreground">{choice.selected}</p>}
      <ul className="mt-7 list-disc space-y-3 border-t border-border pl-5 pt-5 leading-7 text-muted-foreground">{choice.individualFeatures.map((feature) => <li key={feature}>{feature}</li>)}</ul>
    </article>
  );
}

export function ServicePackages() {
  const { locale } = useLocale();
  const { selectedOffers } = useOfferSelection();
  const copy = portfolioCopy[locale];

  return (
    <Section id="pakete" className="scroll-mt-20 border-y border-border bg-muted/30">
      <SectionEyebrow>{copy.eyebrow}</SectionEyebrow>
      <SectionTitle>{copy.title}</SectionTitle>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{copy.intro}</p>

      <p className="mt-4 text-sm leading-6 text-muted-foreground">{selectionCopy[locale].requestNote}</p>
      <div className="mt-10 grid items-start gap-5 lg:grid-cols-2">
        {servicePackages.map((service) => <CareCard key={`${service.id}:${selectedOffers.filter((id) => (careGroups[service.id] as readonly OfferId[]).includes(id)).join(",")}`} service={service} />)}
        <IndividualCard />
      </div>

      <div className="mt-10 grid gap-8 border-b border-border pb-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h3 className="text-xl font-semibold">{copy.budgetTitle}</h3>
          <p className="mt-3 leading-7 text-muted-foreground">{copy.budgetText}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">{copy.additionalTitle}</h3>
          <p className="mt-3 text-2xl font-semibold">{additionalHourlyRate} <span className="text-base font-normal">{copy.hourly}</span></p>
          <p className="mt-3 leading-7 text-muted-foreground">{copy.additionalText}</p>
        </div>
      </div>

      <h3 className="mt-10 text-2xl font-semibold">{copy.conditionsTitle}</h3>
      <div className="mt-6 grid gap-x-10 gap-y-7 md:grid-cols-2">
        {copy.conditions.map((condition) => (
          <div key={condition.title}>
            <h4 className="font-semibold">{condition.title}</h4>
            <p className="mt-2 leading-7 text-muted-foreground">{condition.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
