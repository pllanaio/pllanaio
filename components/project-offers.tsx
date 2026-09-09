"use client";

import Link from "next/link";
import { Button } from "@/components/button";
import { useLocale } from "@/components/locale-provider";
import { projectCopy, projectOffers } from "@/lib/project-offers";

export function ProjectOffers() {
  const { locale } = useLocale();
  const copy = projectCopy[locale];
  const currency = new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

  return (
    <div id="projekte" className="mt-12 scroll-mt-20" aria-labelledby="project-offers-title">
      <h3 id="project-offers-title" className="text-3xl font-semibold tracking-tight">{copy.title}</h3>
      <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{copy.intro}</p>
      <div className="mt-8 divide-y divide-border border-y border-border">
        {projectOffers.map((project) => {
          const item = copy.offers[project.id];
          return (
            <article key={project.id} aria-labelledby={`project-${project.id}`} className="grid gap-6 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,0.85fr)] xl:gap-8">
              <div>
                <h4 id={`project-${project.id}`} className="text-2xl font-semibold tracking-tight">{item.title}</h4>
                <p className="mt-3 leading-7 text-muted-foreground">{item.outcome}</p>
              </div>
              <div className="min-w-0">
                <ul className="list-disc space-y-2 pl-5 leading-7">
                  {item.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.scope}</p>
              </div>
              <div className="min-w-0 md:col-span-2 xl:col-span-1">
                <p className="text-3xl font-semibold tracking-tight">
                  {project.fixedPrice === null ? copy.onRequest : currency.format(project.fixedPrice)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{project.fixedPrice === null ? copy.individualQuote : copy.fixed}</p>
                {project.fixedPrice !== null ? <p className="mt-2 text-sm text-muted-foreground">{copy.net}</p> : null}
                <Button asChild variant="outline" className="mt-5 h-auto min-h-11 max-w-full whitespace-normal px-5 py-3 text-center">
                  <Link href="#kontakt" aria-label={`${item.title}: ${copy.cta}`}>{copy.cta}</Link>
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
