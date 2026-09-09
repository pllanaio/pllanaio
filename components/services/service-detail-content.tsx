"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/button";
import { ContactForm } from "@/components/contact-form";
import { useLocale } from "@/components/locale-provider";
import { ServicePackageCard, ServiceTerms } from "@/components/service-packages";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServicePricePreview } from "@/components/services/service-price-preview";
import { serviceLinks } from "@/lib/services/catalog";
import { servicesUiCopy } from "@/lib/services/ui-copy";
import type { ServicePage } from "@/lib/services/types";

export function ServiceDetailContent({ service }: { service: ServicePage }) {
  const { locale } = useLocale();
  const copy = service.copy[locale];
  const ui = servicesUiCopy[locale];
  const pricingTitle = service.packageId === "individual" ? ui.individualPricingTitle : service.packageId === "cloud" ? ui.carePricingTitle : ui.pricingTitle;
  const pricingText = service.packageId === "individual" ? ui.individualPricingText : service.packageId === "cloud" ? ui.carePricingText : ui.pricingText;
  return <>
    <SiteHeader />
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border px-6 pb-20 pt-28 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-muted-foreground"><ol className="flex flex-wrap items-center gap-2"><li><Link href="/" className="underline underline-offset-4">{ui.home}</Link></li><li aria-hidden="true">/</li><li><Link href="/leistungen" className="underline underline-offset-4">{ui.services}</Link></li><li aria-hidden="true">/</li><li aria-current="page">{service.name}</li></ol></nav>
          <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">{copy.eyebrow}</p>
              <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">{copy.heading}</h1>
              <p className="mt-7 text-lg leading-8 text-muted-foreground">{copy.intro}</p>
              <ServicePricePreview packageId={service.packageId} />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-auto min-h-14 whitespace-normal py-3"><a href="#paket-konfigurieren">{ui.configure}<ArrowRight className="ml-3 h-4 w-4 shrink-0" aria-hidden="true" /></a></Button>
                <Button asChild size="lg" variant="outline" className="h-auto min-h-14 whitespace-normal py-3"><a href="#leistungsumfang">{ui.viewScope}</a></Button>
              </div>
            </div>
            <aside className="rounded-3xl border border-border bg-muted/40 p-7 sm:p-9" aria-labelledby="service-problems-title">
              <p className="text-sm font-medium text-muted-foreground">{service.name}</p>
              <h2 id="service-problems-title" className="mt-4 text-2xl font-semibold tracking-tight">{copy.problemsTitle}</h2>
              <ul className="mt-6 divide-y divide-border">{copy.problems.map((problem) => <li key={problem} className="py-4 leading-7 text-muted-foreground">{problem}</li>)}</ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-20" aria-labelledby="service-benefits-title">
        <div className="mx-auto max-w-7xl">
          <h2 id="service-benefits-title" className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl">{copy.benefitsTitle}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">{copy.benefits.map((benefit) => <div key={benefit.title} className="border-t border-border pt-6"><Check className="h-5 w-5 text-muted-foreground" aria-hidden="true" /><h3 className="mt-4 text-xl font-semibold">{benefit.title}</h3><p className="mt-3 leading-7 text-muted-foreground">{benefit.text}</p></div>)}</div>
        </div>
      </section>

      <section id="leistungsumfang" className="scroll-mt-20 border-y border-border bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl">{copy.deliverablesTitle}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">{copy.deliverables.map((item) => <article key={item.title} className="rounded-2xl border border-border bg-card p-7"><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-4 leading-7 text-muted-foreground">{item.text}</p></article>)}</div>
        </div>
      </section>

      <section id="paket-konfigurieren" className="scroll-mt-20 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="lg:sticky lg:top-28"><p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">{ui.pricing}</p><h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">{pricingTitle}</h2><p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{pricingText}</p><Link href="/leistungen" className="mt-5 inline-flex min-h-11 items-center text-sm underline underline-offset-4">{ui.overview}</Link></div>
            <ServicePackageCard packageId={service.packageId} showDetailLink={false} />
          </div>
          {service.packageId !== "individual" && <details className="mt-10 rounded-2xl border border-border px-6 py-4"><summary className="cursor-pointer py-2 font-medium">{ui.conditions}</summary><ServiceTerms /></details>}
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-7xl"><h2 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl">{copy.processTitle}</h2><ol className="mt-10 grid gap-8 md:grid-cols-3">{copy.process.map((step, index) => <li key={step.title}><p className="text-sm text-muted-foreground" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-4 text-xl font-semibold">{step.title}</h3><p className="mt-3 leading-7 text-muted-foreground">{step.text}</p></li>)}</ol></div>
      </section>

      <section className="px-6 py-20" aria-labelledby="service-faq-title">
        <div className="mx-auto max-w-4xl"><h2 id="service-faq-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">{copy.faqTitle}</h2><div className="mt-10 divide-y divide-border rounded-2xl border border-border">{copy.faqs.map((faq) => <details key={faq.question} className="p-6 open:bg-muted/30"><summary className="cursor-pointer text-lg font-medium">{faq.question}</summary><p className="mt-4 leading-7 text-muted-foreground">{faq.answer}</p></details>)}</div></div>
      </section>

      <section className="border-y border-border bg-muted/30 px-6 py-16">
        <div className="mx-auto max-w-7xl"><h2 className="max-w-3xl text-3xl font-semibold tracking-tight">{ui.regionalTitle}</h2><p className="mt-5 max-w-3xl leading-8 text-muted-foreground">{ui.regionalText}</p><p className="mt-5 text-sm font-medium">{ui.region}</p><h2 className="mt-12 text-xl font-semibold">{ui.related}</h2><ul className="mt-4 flex flex-wrap gap-3">{serviceLinks.filter((item) => item.slug !== service.slug).map((item) => <li key={item.slug}><Link href={item.href} className="inline-flex min-h-11 items-center rounded-full border border-border bg-background px-5 py-2 text-sm transition hover:bg-muted">{item.name}<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link></li>)}</ul></div>
      </section>

      <section id="kontakt" className="scroll-mt-20 px-6 py-20">
        <div className="mx-auto max-w-4xl"><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{copy.ctaTitle}</h2><p className="mb-10 mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{copy.ctaText}</p><ContactForm /></div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
