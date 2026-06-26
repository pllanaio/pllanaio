import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/button";
import { FadeIn } from "@/components/motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Section, SectionEyebrow, SectionTitle } from "@/components/ui/section";
import { capabilities, caseStudies, faqs, methodologySteps, painPoints, siteNav } from "@/lib/site-content";

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="#" className="text-sm font-semibold tracking-[-0.02em]">
          Leon Pllana IT-Solutions
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Hauptnavigation">
          {siteNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href="#kontakt">Gespräch starten</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function HeroGraphic() {
  return (
    <div className="relative mx-auto aspect-square max-w-xl rounded-[2rem] border border-border bg-card/70 p-5 shadow-premium backdrop-blur-xl">
      <div className="absolute inset-6 rounded-[1.5rem] border border-border/70" />
      <div className="grid h-full grid-cols-3 gap-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="relative rounded-2xl border border-border bg-muted/50 p-4">
            <div className="absolute inset-x-4 top-4 h-1 rounded-full bg-foreground/10" />
            <div className="mt-8 h-16 rounded-xl bg-background/70" />
            {index === 4 ? <div className="absolute inset-0 rounded-2xl border border-accent/60 bg-accent/10 shadow-glow" /> : null}
          </div>
        ))}
      </div>
      <div className="absolute -bottom-6 left-8 right-8 rounded-2xl border border-border bg-background/90 p-5 shadow-premium backdrop-blur-xl">
        <p className="text-sm font-medium">Technologie folgt dem Prozess.</p>
        <p className="mt-1 text-sm text-muted-foreground">Nicht umgekehrt.</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center px-6 pt-24">
      <div className="gradient-grid absolute inset-0 opacity-60" />
      <div className="absolute left-1/2 top-36 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-16 py-24 lg:grid-cols-[1.05fr_.95fr]">
        <FadeIn>
          <div className="relative z-10">
            <div className="mb-8 inline-flex rounded-full border border-border bg-background/70 px-4 py-2 text-sm text-muted-foreground shadow-premium backdrop-blur">
              Strategic Digital Transformation · B2B
            </div>
            <h1 className="max-w-5xl text-6xl font-semibold tracking-[-0.07em] sm:text-7xl lg:text-8xl">
              Innovation in every Step.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9">
              Unternehmen verändern sich nicht durch neue Software. Sie verändern sich durch bessere Entscheidungen, klarere Prozesse und Technologie, die exakt zum Unternehmen passt.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="#kontakt">
                  Digitale Potenziale entdecken <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#vorgehen">Arbeitsweise ansehen</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <HeroGraphic />
        </FadeIn>
      </div>
    </section>
  );
}

function ThinkingSection() {
  return (
    <section id="denkweise" className="border-y border-border bg-muted/35 px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionEyebrow>Denkweise</SectionEyebrow>
          <SectionTitle>IT ist nicht der Anfang. Verstehen ist der Anfang.</SectionTitle>
        </FadeIn>
        <div className="mt-14 grid gap-5 md:grid-cols-4">
          {painPoints.map((pain, index) => (
            <FadeIn key={pain} delay={index * 0.05}>
              <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-premium">
                <p className="text-sm text-muted-foreground">Problem {String(index + 1).padStart(2, "0")}</p>
                <p className="mt-8 text-lg font-medium leading-7">{pain}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodologySection() {
  return (
    <Section id="vorgehen">
      <FadeIn>
        <SectionEyebrow>Vorgehen</SectionEyebrow>
        <SectionTitle>Tausende kleine Optimierungen. Ein Unternehmen, das besser funktioniert.</SectionTitle>
      </FadeIn>
      <div className="mt-16 grid gap-4 lg:grid-cols-3">
        {methodologySteps.map((step, index) => (
          <FadeIn key={step.title} delay={index * 0.04}>
            <div className="group h-full rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-premium">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{step.number}</span>
                <Check className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
              </div>
              <h3 className="mt-10 text-2xl font-semibold tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-4 leading-7 text-muted-foreground">{step.copy}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

function CapabilitiesSection() {
  return (
    <section id="kompetenzen" className="bg-foreground px-6 py-28 text-background dark:bg-card dark:text-foreground">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionEyebrow>Kompetenzen</SectionEyebrow>
          <SectionTitle>Eine Beratungsperspektive. Eine technische Umsetzungskraft.</SectionTitle>
        </FadeIn>
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-background/15 bg-background/15 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <div key={capability.title} className="bg-foreground p-8 dark:bg-card">
                <Icon className="h-6 w-6" />
                <h3 className="mt-10 text-2xl font-semibold tracking-[-0.03em]">{capability.title}</h3>
                <p className="mt-4 leading-7 text-background/65 dark:text-muted-foreground">{capability.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  return (
    <Section id="cases">
      <FadeIn>
        <SectionEyebrow>Case Studies</SectionEyebrow>
        <SectionTitle>Nicht Projekte. Entwicklungsschritte.</SectionTitle>
      </FadeIn>
      <div className="mt-16 space-y-4">
        {caseStudies.map((caseStudy, index) => (
          <FadeIn key={caseStudy.title} delay={index * 0.05}>
            <article className="grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-premium md:grid-cols-[180px_1fr]">
              <p className="text-sm font-medium text-muted-foreground">{caseStudy.tag}</p>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{caseStudy.title}</h3>
                <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{caseStudy.copy}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

function BrandPromiseSection() {
  return (
    <Section>
      <div className="rounded-[2.5rem] border border-border bg-muted/45 p-8 shadow-premium sm:p-14 lg:p-20">
        <FadeIn>
          <p className="text-lg text-muted-foreground">Brand Promise</p>
          <blockquote className="mt-6 max-w-5xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Jede Zusammenarbeit hinterlässt ein Unternehmen, das besser funktioniert als zuvor.
          </blockquote>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-muted-foreground">Nicht nur technisch. Organisatorisch, strategisch und langfristig.</p>
        </FadeIn>
      </div>
    </Section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="border-y border-border bg-muted/35 px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <SectionEyebrow>FAQ</SectionEyebrow>
          <SectionTitle className="max-w-none">Klarheit vor Technologie.</SectionTitle>
        </FadeIn>
        <div className="mt-12 divide-y divide-border rounded-3xl border border-border bg-card">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-7 open:bg-muted/30">
              <summary className="cursor-pointer list-none text-lg font-medium">{faq.question}</summary>
              <p className="mt-4 leading-7 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="kontakt" className="px-6 py-28">
      <div className="mx-auto max-w-5xl text-center">
        <FadeIn>
          <SectionEyebrow>Kontakt</SectionEyebrow>
          <h2 className="text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">Lassen Sie uns herausfinden, welcher Schritt Ihr Unternehmen besser macht.</h2>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-muted-foreground">Ein erstes Gespräch muss nichts verkaufen. Es muss verstehen, wo heute Potenzial verborgen ist.</p>
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg">
              <a href="mailto:hello@pllana.io">
                Gespräch anfragen <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Leon Pllana IT-Solutions</p>
        <p>Innovation in every Step.</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <Header />
      <Hero />
      <ThinkingSection />
      <MethodologySection />
      <CapabilitiesSection />
      <CaseStudiesSection />
      <BrandPromiseSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
