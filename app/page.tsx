"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/button";
import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/motion";
import { PartnerLogoMarquee } from "@/components/partner-logo-marquee";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionEyebrow } from "@/components/ui/section";
import { useLocale } from "@/components/locale-provider";
import { homeStructuredData } from "@/lib/home-structured-data";

const homepageCopy = {
  de: {
    heroKicker: "Strategische Digitalisierung",
    heroTitle: "Digitale Systeme, die Ihr Unternehmen einfacher machen.",
    heroText: "Wir vereinfachen Prozesse, verbinden Systeme und schaffen eine IT, die sicher, skalierbar und im Alltag nachvollziehbar funktioniert.",
    primary: "Potenziale besprechen",
    secondary: "Website kostenlos prüfen",
    motto: "Innovation in every Step.",
    principle: "Process first. Technology second.",
    principles: ["Prozesse klären", "Systeme verbinden", "Betrieb absichern"],
    proofEyebrow: "Referenzen",
    proofTitle: "Vertrauen entsteht durch Zusammenarbeit.",
    servicesEyebrow: "Was wir lösen",
    servicesTitle: "Von Strategie bis Umsetzung – ohne Tool-Zirkus.",
    servicesText: "Wir verbinden Beratung und technische Umsetzung. Damit nicht mehr Systeme entstehen, sondern bessere Abläufe.",
    services: [
      ["Strategie & Prozesse", "Abläufe verstehen, Prioritäten setzen und Digitalisierung dort starten, wo sie messbar entlastet."],
      ["IT & Security", "Microsoft 365, Cloud, Backup und Betrieb so aufstellen, dass Verantwortung und Risiken klar bleiben."],
      ["Software & Automatisierung", "Schnittstellen, individuelle Software, Automatisierung und KI dort einsetzen, wo Standardlösungen nicht reichen."],
    ],
    whyEyebrow: "Warum Pllana",
    whyTitle: "Strategische Digitalisierung statt isolierter IT-Projekte.",
    why: [
      ["Process first.", "Wir beginnen mit dem Geschäftsablauf – nicht mit einem Produkt."],
      ["Ein Partner.", "Beratung, technische Umsetzung und laufende Betreuung greifen ineinander."],
      ["Verantwortung statt Stunden.", "Sie wissen, was wir übernehmen, was das Ziel ist und was der nächste sinnvolle Schritt ist."],
    ],
    checkEyebrow: "Website-Check",
    checkTitle: "Wo steht Ihre Website technisch?",
    checkText: "Der kostenlose Check analysiert öffentlich sichtbare Performance-, SEO-, Security- und technische Signale und zeigt konkrete Verbesserungspotenziale.",
    checkCta: "Website prüfen",
    contactEyebrow: "Nächster Schritt",
    contactTitle: "Lassen Sie uns konkret werden.",
    contactText: "Beschreiben Sie kurz, was heute Zeit kostet, nicht sauber funktioniert oder verbessert werden soll. Wir ordnen die Situation ein und sprechen über sinnvolle nächste Schritte.",
  },
  en: {
    heroKicker: "Strategic digitalisation",
    heroTitle: "Digital systems that make your business easier to run.",
    heroText: "We simplify processes, connect systems and create IT that works securely, scales with you and remains understandable in day-to-day operations.",
    primary: "Discuss your potential",
    secondary: "Check your website for free",
    motto: "Innovation in every Step.",
    principle: "Process first. Technology second.",
    principles: ["Clarify processes", "Connect systems", "Secure operations"],
    proofEyebrow: "References",
    proofTitle: "Trust grows through collaboration.",
    servicesEyebrow: "What we solve",
    servicesTitle: "From strategy to implementation – without tool chaos.",
    servicesText: "We combine consulting with technical delivery. The goal is not more systems, but better ways of working.",
    services: [
      ["Strategy & processes", "Understand workflows, set priorities and start digitalisation where it creates measurable relief."],
      ["IT & security", "Structure Microsoft 365, cloud, backup and operations so ownership and risk stay clear."],
      ["Software & automation", "Use integrations, custom software, automation and AI where standard tools are not enough."],
    ],
    whyEyebrow: "Why Pllana",
    whyTitle: "Strategic digitalisation instead of isolated IT projects.",
    why: [
      ["Process first.", "We start with the business workflow, not with a product."],
      ["One partner.", "Consulting, technical implementation and ongoing support work together."],
      ["Ownership instead of hours.", "You know what we take responsibility for, what the goal is and what the next sensible step looks like."],
    ],
    checkEyebrow: "Website check",
    checkTitle: "How strong is your website technically?",
    checkText: "The free check analyses publicly visible performance, SEO, security and technical signals and highlights concrete improvement opportunities.",
    checkCta: "Check your website",
    contactEyebrow: "Next step",
    contactTitle: "Let’s get specific.",
    contactText: "Tell us what currently costs time, does not work cleanly or should improve. We will structure the situation and discuss sensible next steps.",
  },
  sq: {
    heroKicker: "Digjitalizim strategjik",
    heroTitle: "Sisteme digjitale që e bëjnë biznesin tuaj më të thjeshtë.",
    heroText: "Ne thjeshtojmë proceset, lidhim sistemet dhe ndërtojmë IT që funksionon në mënyrë të sigurt, shkallëzohet dhe mbetet e kuptueshme në përditshmëri.",
    primary: "Diskuto potencialin",
    secondary: "Kontrollo faqen falas",
    motto: "Innovation in every Step.",
    principle: "Process first. Technology second.",
    principles: ["Qartëso proceset", "Lidh sistemet", "Siguro operimin"],
    proofEyebrow: "Referenca",
    proofTitle: "Besimi krijohet përmes bashkëpunimit.",
    servicesEyebrow: "Çfarë zgjidhim",
    servicesTitle: "Nga strategjia te zbatimi – pa kaos mjetesh.",
    servicesText: "Ne lidhim këshillimin me zbatimin teknik. Qëllimi nuk është më shumë sisteme, por mënyra më të mira pune.",
    services: [
      ["Strategji & procese", "Kuptojmë rrjedhat, vendosim prioritete dhe nisemi aty ku digjitalizimi sjell lehtësim të matshëm."],
      ["IT & siguri", "Organizojmë Microsoft 365, cloud, backup dhe operim që përgjegjësia dhe rreziqet të mbeten të qarta."],
      ["Softuer & automatizim", "Përdorim integrime, softuer të personalizuar, automatizim dhe AI kur zgjidhjet standarde nuk mjaftojnë."],
    ],
    whyEyebrow: "Pse Pllana",
    whyTitle: "Digjitalizim strategjik në vend të projekteve të izoluara IT.",
    why: [
      ["Process first.", "Fillojmë me procesin e biznesit, jo me një produkt."],
      ["Një partner.", "Këshillimi, zbatimi teknik dhe mirëmbajtja e vazhdueshme lidhen me njëra-tjetrën."],
      ["Përgjegjësi në vend të orëve.", "E dini çfarë marrim përsipër, cili është qëllimi dhe cili është hapi tjetër i arsyeshëm."],
    ],
    checkEyebrow: "Kontrolli i faqes",
    checkTitle: "Sa e fortë është teknikisht faqja juaj?",
    checkText: "Kontrolli falas analizon sinjale publike të performancës, SEO-së, sigurisë dhe teknikës dhe tregon potenciale konkrete për përmirësim.",
    checkCta: "Kontrollo faqen",
    contactEyebrow: "Hapi tjetër",
    contactTitle: "Le të bëhemi konkretë.",
    contactText: "Përshkruani shkurt çfarë ju kushton kohë, nuk funksionon mirë ose duhet përmirësuar. Ne e strukturojmë situatën dhe diskutojmë hapat e arsyeshëm.",
  },
};

function Hero() {
  const { locale } = useLocale();
  const copy = homepageCopy[locale];

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:pb-24 sm:pt-40">
      <div className="gradient-grid absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
        <FadeIn>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{copy.heroKicker}</p>
            <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.065em] sm:text-6xl lg:text-7xl">{copy.heroTitle}</h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-muted-foreground">{copy.heroText}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg"><Link href="#kontakt">{copy.primary}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/website-check">{copy.secondary}</Link></Button>
            </div>
            <p className="mt-8 text-sm font-medium text-muted-foreground">{copy.motto}</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <aside className="rounded-[2rem] border border-border bg-card p-7 shadow-premium sm:p-9">
            <p className="text-sm font-medium text-muted-foreground">{copy.principle}</p>
            <div className="mt-8 space-y-5">
              {copy.principles.map((item, index) => (
                <div key={item} className="flex items-center gap-4 border-b border-border pb-5 last:border-0 last:pb-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-sm font-semibold">{index + 1}</span>
                  <p className="text-xl font-semibold tracking-[-0.03em]">{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </FadeIn>
      </div>
    </section>
  );
}

function References() {
  const { locale } = useLocale();
  const copy = homepageCopy[locale];

  return (
    <section id="referenzen" className="border-y border-border bg-muted/25 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionEyebrow>{copy.proofEyebrow}</SectionEyebrow>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">{copy.proofTitle}</h2>
        </FadeIn>
        <div className="mt-8"><PartnerLogoMarquee /></div>
      </div>
    </section>
  );
}

function Services() {
  const { locale } = useLocale();
  const copy = homepageCopy[locale];

  return (
    <section id="leistungen" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionEyebrow>{copy.servicesEyebrow}</SectionEyebrow>
          <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">{copy.servicesTitle}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{copy.servicesText}</p>
        </FadeIn>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {copy.services.map(([title, text], index) => (
            <FadeIn key={title} delay={index * 0.04}>
              <article className="h-full rounded-3xl border border-border bg-card p-7 shadow-premium">
                <Check className="h-5 w-5" aria-hidden="true" />
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.035em]">{title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{text}</p>
              </article>
            </FadeIn>
          ))}
        </div>
        <FadeIn><Button asChild variant="outline" className="mt-8"><Link href="/leistungen">Alle Leistungen ansehen<ArrowRight className="ml-2 h-4 w-4" /></Link></Button></FadeIn>
      </div>
    </section>
  );
}

function WhyPllana() {
  const { locale } = useLocale();
  const copy = homepageCopy[locale];

  return (
    <section className="border-y border-border bg-muted/30 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionEyebrow>{copy.whyEyebrow}</SectionEyebrow>
          <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">{copy.whyTitle}</h2>
        </FadeIn>
        <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-card">
          {copy.why.map(([title, text], index) => (
            <FadeIn key={title} delay={index * 0.04}>
              <div className="grid gap-3 p-7 md:grid-cols-[220px_1fr] md:gap-8">
                <h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="leading-7 text-muted-foreground">{text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function WebsiteCheck() {
  const { locale } = useLocale();
  const copy = homepageCopy[locale];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="rounded-[2rem] bg-foreground p-8 text-background shadow-premium sm:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-background/60">{copy.checkEyebrow}</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{copy.checkTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-background/70">{copy.checkText}</p>
            <Button asChild size="lg" variant="secondary" className="mt-8"><Link href="/website-check">{copy.checkCta}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Contact() {
  const { locale } = useLocale();
  const copy = homepageCopy[locale];

  return (
    <section id="kontakt" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="text-center">
            <SectionEyebrow>{copy.contactEyebrow}</SectionEyebrow>
            <h2 className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">{copy.contactTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{copy.contactText}</p>
          </div>
          <div className="mt-10"><ContactForm /></div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData).replace(/</g, "\\u003c") }} />
      <SiteHeader />
      <Hero />
      <References />
      <Services />
      <WhyPllana />
      <WebsiteCheck />
      <Contact />
      <SiteFooter />
    </main>
  );
}
