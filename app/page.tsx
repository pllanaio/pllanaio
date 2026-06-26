import Link from "next/link";
import { ArrowRight, Check, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/button";
import { FadeIn } from "@/components/motion";
import { PartnerLogoMarquee } from "@/components/partner-logo-marquee";
import { ThemeToggle } from "@/components/theme-toggle";
import { Section, SectionEyebrow, SectionTitle } from "@/components/ui/section";
import { capabilities, caseStudies, contactEmail, faqs, methodologySteps, siteNav, socialLinks } from "@/lib/site-content";

const thinkingSteps = [
  {
    number: "01",
    title: "Historisch gewachsene Prozesse.",
    text: "Was heute komplex wirkt, war oft einmal die richtige Entscheidung. Über Jahre entstehen neue Ausnahmen, zusätzliche Werkzeuge und manuelle Zwischenschritte. Irgendwann kennt niemand mehr den gesamten Prozess.",
  },
  {
    number: "02",
    title: "Teams arbeiten mit Tools, die nicht miteinander sprechen.",
    text: "Informationen werden mehrfach erfasst, kopiert oder per E-Mail weitergegeben. Dadurch entstehen Medienbrüche, Zeitverluste und Fehler, die sich im Alltag summieren.",
  },
  {
    number: "03",
    title: "Entscheidungen entstehen aus Bauchgefühl statt Transparenz.",
    text: "Wenn aktuelle Daten fehlen, werden Entscheidungen langsamer und unsicherer. Transparenz schafft Orientierung und ermöglicht fundierte Entscheidungen in jedem Bereich des Unternehmens.",
  },
  {
    number: "04",
    title: "IT löst Symptome, aber nicht die Ursache.",
    text: "Neue Software macht einen schlechten Prozess nicht besser. Erst wenn Abläufe verstanden und optimiert werden, entfaltet Technologie ihren eigentlichen Mehrwert.",
  },
];

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
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
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <Button asChild size="sm">
            <Link href="#kontakt">Gespräch starten</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function SignalNode({ className, label, value }: { className?: string; label: string; value: string }) {
  return (
    <div className={`absolute rounded-2xl border border-border/80 bg-background/80 p-4 shadow-premium backdrop-blur-xl ${className}`}>
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-medium tracking-[-0.02em] text-foreground">{value}</p>
    </div>
  );
}

function HeroGraphic() {
  const rings = ["inset-8", "inset-16", "inset-24"];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-xl">
      <div className="absolute inset-0 rounded-[2.5rem] border border-border bg-card/60 shadow-premium backdrop-blur-xl" />
      <div className="absolute inset-5 overflow-hidden rounded-[2rem] border border-border/70 bg-muted/25">
        <div className="gradient-grid absolute inset-0 opacity-50" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

        {rings.map((ring) => (
          <div key={ring} className={`absolute ${ring} rounded-full border border-border/70`} />
        ))}

        <svg className="absolute inset-0 h-full w-full text-border" viewBox="0 0 560 560" aria-hidden="true">
          <path d="M106 166 C 190 130, 218 204, 280 250" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
          <path d="M454 164 C 370 132, 338 205, 280 250" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
          <path d="M118 398 C 190 428, 226 360, 280 310" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
          <path d="M444 398 C 370 430, 338 360, 280 310" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
          <path d="M280 122 L280 438" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 10" />
          <path d="M122 280 L438 280" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 10" />
        </svg>

        <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-accent/40 bg-background/90 p-5 text-center shadow-glow backdrop-blur-xl">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Core</p>
            <p className="mt-3 text-xl font-semibold tracking-[-0.04em]">Process first.</p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">Technology second.</p>
          </div>
        </div>

        <div className="absolute left-[15%] top-[16%] h-3 w-3 rounded-full bg-foreground shadow-glow" />
        <div className="absolute right-[15%] top-[16%] h-3 w-3 rounded-full bg-foreground/70" />
        <div className="absolute bottom-[17%] left-[17%] h-3 w-3 rounded-full bg-foreground/60" />
        <div className="absolute bottom-[17%] right-[17%] h-3 w-3 rounded-full bg-foreground/60" />

        <div className="absolute left-1/2 top-12 -translate-x-1/2 rounded-full border border-border bg-background/75 px-4 py-2 text-xs text-muted-foreground backdrop-blur">
          Unternehmensentwicklung durch Technologie
        </div>
      </div>

      <SignalNode className="-left-4 top-16 hidden w-40 lg:block" label="Input" value="Prozesse" />
      <SignalNode className="-right-4 top-24 hidden w-40 lg:block" label="Analyse" value="Potenziale" />
      <SignalNode className="bottom-20 -left-6 hidden w-44 lg:block" label="System" value="Architektur" />
      <SignalNode className="-right-5 bottom-14 hidden w-44 lg:block" label="Output" value="Skalierung" />

      <div className="absolute -bottom-7 left-6 right-6 rounded-2xl border border-border bg-background/90 p-5 shadow-premium backdrop-blur-xl">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-medium">Innovation entsteht Schritt für Schritt.</p>
            <p className="mt-1 text-sm text-muted-foreground">Jede Optimierung macht das System belastbarer.</p>
          </div>
          <div className="hidden rounded-full border border-border px-3 py-1 text-xs text-muted-foreground sm:block">01 → ∞</div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pt-24">
      <div className="gradient-grid absolute inset-0 -z-10 opacity-50" />
      <div className="absolute left-1/2 top-24 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto grid max-w-7xl items-center gap-20 py-24 lg:grid-cols-[1.02fr_.98fr]">
        <FadeIn>
          <div className="relative z-10">
            <div className="mb-8 inline-flex rounded-full border border-border bg-background/70 px-4 py-2 text-sm text-muted-foreground shadow-premium backdrop-blur">
              Strategic Digital Transformation · B2B · Process first
            </div>
            <h1 className="max-w-5xl text-6xl font-semibold tracking-[-0.075em] sm:text-7xl lg:text-8xl">
              Innovation in every Step.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9">
              Wir verkaufen keine IT. Wir analysieren Unternehmen, verstehen Prozesse und entwickeln digitale Systeme, die jeden Schritt klarer, effizienter und skalierbarer machen.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="#kontakt">
                  Potenziale analysieren <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#denkweise">Warum anders?</Link>
              </Button>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <p>Prozessanalyse</p>
              <p>Digitale Architektur</p>
              <p>Langfristige Partnerschaft</p>
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

function PartnerSection() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Unternehmen, die bereits auf Zusammenarbeit vertrauen</p>
          <PartnerLogoMarquee />
        </FadeIn>
      </div>
    </section>
  );
}

function ThinkingSection() {
  return (
    <section id="denkweise" className="premium-frame relative overflow-hidden bg-background px-6 py-32">
      <div className="architecture-grid absolute inset-0 opacity-60" />
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl animate-drift" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <FadeIn>
            <div className="sticky top-28">
              <SectionEyebrow>Denkweise</SectionEyebrow>
              <h2 className="max-w-3xl text-5xl font-semibold tracking-[-0.065em] text-balance sm:text-7xl">
                IT ist nicht der Anfang. Verstehen ist der Anfang.
              </h2>
              <p className="mt-8 max-w-xl text-xl leading-8 text-muted-foreground">
                Digitalisierung scheitert selten an Technologie. Sie scheitert, wenn Prozesse, Menschen und Entscheidungen nicht zuerst verstanden werden.
              </p>
            </div>
          </FadeIn>

          <div className="relative">
            <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-border to-transparent md:block" />
            <div className="space-y-2">
              {thinkingSteps.map((step, index) => (
                <FadeIn key={step.number} delay={index * 0.06}>
                  <div className="group relative grid gap-5 border-b border-border/80 py-9 pl-0 md:grid-cols-[96px_1fr] md:pl-14">
                    <div className="hidden md:block">
                      <div className="absolute left-3 top-11 h-4 w-4 rounded-full border border-border bg-background transition group-hover:border-accent group-hover:shadow-glow" />
                      <p className="text-sm text-muted-foreground">{step.number}</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold tracking-[-0.04em] text-balance sm:text-3xl">{step.title}</p>
                      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{step.text}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
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
    <section id="kompetenzen" className="premium-frame relative overflow-hidden bg-muted/35 px-6 py-28 text-foreground">
      <div className="architecture-grid absolute inset-0 opacity-35" />
      <div className="relative mx-auto max-w-7xl">
        <FadeIn>
          <SectionEyebrow>Kompetenzen</SectionEyebrow>
          <SectionTitle>Eine Beratungsperspektive. Eine technische Umsetzungskraft.</SectionTitle>
        </FadeIn>
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <div key={capability.title} className="bg-card p-8">
                <Icon className="h-6 w-6 text-foreground" />
                <h3 className="mt-10 text-2xl font-semibold tracking-[-0.03em]">{capability.title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{capability.copy}</p>
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
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={`mailto:${contactEmail}`}>
                Gespräch anfragen <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
                <Instagram className="mr-2 h-4 w-4" /> Instagram
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
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
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p>© {new Date().getFullYear()} Leon Pllana IT-Solutions</p>
          <p className="mt-1">Innovation in every Step.</p>
        </div>
        <nav className="flex flex-wrap gap-4" aria-label="Rechtliche Links">
          <Link href="/impressum" className="transition hover:text-foreground">Impressum</Link>
          <Link href="/datenschutz" className="transition hover:text-foreground">Datenschutz</Link>
          <Link href="/agb" className="transition hover:text-foreground">AGB</Link>
        </nav>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <Header />
      <Hero />
      <PartnerSection />
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
