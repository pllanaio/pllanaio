"use client";

import Link from "next/link";
import { Button } from "@/components/button";
import { useLocale } from "@/components/locale-provider";
import { Section, SectionEyebrow, SectionTitle } from "@/components/ui/section";
import { additionalHourlyRate, portfolioCopy, servicePackages } from "@/lib/service-packages";

export function ServicePackages() {
  const { locale } = useLocale();
  const copy = portfolioCopy[locale];
  const number = new Intl.NumberFormat(locale);

  return (
    <Section id="pakete" className="scroll-mt-20 border-y border-border bg-muted/30">
      <SectionEyebrow>{copy.eyebrow}</SectionEyebrow>
      <SectionTitle>{copy.title}</SectionTitle>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{copy.intro}</p>

      <div className="mt-12 grid items-start gap-5 lg:grid-cols-3">
        {servicePackages.map((service) => {
          const item = copy.packages[service.id];
          return (
            <article key={service.id} aria-labelledby={`package-${service.id}`} className="min-w-0 rounded-3xl border border-border bg-card p-6 shadow-premium sm:p-8">
              <p className="text-sm text-muted-foreground">{item.audience}</p>
              <h3 id={`package-${service.id}`} className="mt-3 text-3xl font-semibold tracking-tight">{service.name}</h3>
              <p className="mt-4 min-h-20 leading-7 text-muted-foreground">{item.outcome}</p>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-sm text-muted-foreground">{copy.from}</span>
                <span className="text-5xl font-semibold tracking-tight">{service.monthlyPrice} €</span>
                <span className="text-sm text-muted-foreground">{copy.monthly}</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{copy.net}</p>
              <dl className="mt-7 border-y border-border py-5">
                <dt className="text-sm text-muted-foreground">{copy.timeLabel}</dt>
                <dd className="mt-1 text-lg font-semibold">{number.format(service.serviceHours)} {copy.hours}</dd>
                <dt className="mt-4 text-sm text-muted-foreground">{copy.scopeLabel}</dt>
                <dd className="mt-1 leading-7">{item.scope}</dd>
              </dl>
              <details className="group mt-5">
                <summary className="cursor-pointer rounded-sm py-2 font-medium underline decoration-border underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">{copy.details}</summary>
                <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-muted-foreground">
                  {item.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <p className="mt-5 font-medium">{copy.separately}</p>
                <p className="mt-2 leading-7 text-muted-foreground">{item.exclusions}</p>
              </details>
              <Button asChild size="lg" variant="outline" className="mt-7 w-full px-3">
                <Link href="#kontakt" aria-label={`${service.name}: ${copy.cta}`}>{copy.cta}</Link>
              </Button>
            </article>
          );
        })}
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
