"use client";

import Link from "next/link";
import { ArrowRight, Code2, Layers3, Network, Workflow } from "lucide-react";
import { Button } from "@/components/button";
import { useLocale } from "@/components/locale-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServicePricePreview } from "@/components/services/service-price-preview";
import { serviceLinks } from "@/lib/services/catalog";
import { servicesUiCopy } from "@/lib/services/ui-copy";

const icons = { web: Layers3, workplace: Workflow, cloud: Network, individual: Code2 };

export function ServicesOverviewContent() {
  const { locale } = useLocale();
  const copy = servicesUiCopy[locale];
  return <>
    <SiteHeader />
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 pb-16 pt-28 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link href="/" className="underline underline-offset-4">{copy.home}</Link></li><li aria-hidden="true">/</li><li aria-current="page">{copy.services}</li></ol></nav>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">{copy.eyebrow}</p>
          <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">{copy.heading}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">{copy.intro}</p>
        </div>
      </section>
      <section aria-label={copy.services} className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          {serviceLinks.map((service) => {
            const Icon = icons[service.packageId];
            return <article key={service.slug} className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-premium sm:p-9">
              <Icon className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
              <h2 className="mt-6 text-3xl font-semibold tracking-tight"><Link href={service.href} className="hover:underline">{service.name}</Link></h2>
              <p className="mt-4 grow leading-7 text-muted-foreground">{copy.summaries[service.packageId]}</p>
              <ServicePricePreview packageId={service.packageId} />
              <Button asChild variant="outline" className="mt-6 h-auto min-h-12 justify-between gap-3 py-3"><Link href={service.href} aria-label={`${service.name}: ${copy.details}`}>{copy.details}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link></Button>
            </article>;
          })}
        </div>
      </section>
      <section className="border-y border-border bg-muted/30 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div><h2 className="text-3xl font-semibold tracking-tight">{copy.regionalTitle}</h2><p className="mt-5 max-w-xl leading-8 text-muted-foreground">{copy.regionalText}</p><p className="mt-5 text-sm font-medium">{copy.region}</p></div>
          <div><h2 className="text-3xl font-semibold tracking-tight">{copy.overviewHelp}</h2><p className="mt-5 max-w-xl leading-8 text-muted-foreground">{copy.overviewHelpText}</p><Button asChild size="lg" className="mt-6 h-auto min-h-14 whitespace-normal py-3"><Link href="/#kontakt">{copy.contact}<ArrowRight className="ml-3 h-4 w-4 shrink-0" aria-hidden="true" /></Link></Button></div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
