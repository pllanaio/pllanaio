import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { HubContent } from "@/lib/content-hubs";

export function ContentHubPage({ content }: { content: HubContent }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background text-foreground">
        <section className="px-6 pb-16 pt-28 sm:pt-36">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-10 text-sm text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="underline underline-offset-4">Startseite</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{content.eyebrow}</li>
              </ol>
            </nav>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">{content.eyebrow}</p>
            <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">{content.title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">{content.description}</p>
            <div className="mt-10 max-w-4xl rounded-3xl border border-border bg-muted/30 p-7 shadow-premium">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">Kurz gesagt</p>
              <p className="mt-4 text-xl leading-8">{content.summary}</p>
            </div>
          </div>
        </section>

        {content.sections.map((section, sectionIndex) => (
          <section key={section.title} className={sectionIndex % 2 === 0 ? "border-y border-border bg-muted/25 px-6 py-20" : "px-6 py-20"}>
            <div className="mx-auto max-w-7xl">
              <h2 className="max-w-4xl text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">{section.title}</h2>
              {section.intro ? <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{section.intro}</p> : null}
              <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => (
                  <article key={item.title} className="rounded-3xl border border-border bg-card p-7 shadow-premium">
                    <Check className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                    <p className="mt-3 leading-7 text-muted-foreground">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-foreground p-8 text-background shadow-premium sm:p-12">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">{content.ctaTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-background/70">{content.ctaText}</p>
            <Button asChild size="lg" variant="secondary" className="mt-7"><Link href={content.ctaHref}>{content.ctaLabel}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </section>

        <section className="border-t border-border px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-xl font-semibold">Weiterführende Themen</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {content.related.map((item) => <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center rounded-full border border-border px-5 py-2 text-sm font-medium transition hover:bg-muted">{item.label}<ArrowRight className="ml-2 h-4 w-4" /></Link>)}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
