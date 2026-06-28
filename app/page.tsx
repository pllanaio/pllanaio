"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { FadeIn } from "@/components/motion";
import { PartnerLogoMarquee } from "@/components/partner-logo-marquee";
import { ThemeToggle } from "@/components/theme-toggle";
import { Section, SectionEyebrow, SectionTitle } from "@/components/ui/section";
import { useLocale } from "@/components/locale-provider";
import { contactEmail, siteNav, socialLinks } from "@/lib/site-content";

const localizedContent = {
  de: {
    thinking: [
      ["01", "Historisch gewachsene Prozesse.", "Was heute komplex wirkt, war oft einmal die richtige Entscheidung. Über Jahre entstehen neue Ausnahmen, zusätzliche Werkzeuge und manuelle Zwischenschritte."],
      ["02", "Tools, die nicht miteinander sprechen.", "Informationen werden mehrfach erfasst, kopiert oder per E-Mail weitergegeben. Dadurch entstehen Medienbrüche, Zeitverluste und Fehler."],
      ["03", "Entscheidungen ohne Transparenz.", "Wenn aktuelle Daten fehlen, werden Entscheidungen langsamer und unsicherer. Transparenz schafft Orientierung."],
      ["04", "IT löst Symptome, aber nicht die Ursache.", "Neue Software macht einen schlechten Prozess nicht besser. Erst wenn Abläufe verstanden sind, entfaltet Technologie Mehrwert."],
    ],
    methodology: [
      ["01", "Verstehen", "Geschäftsmodell, Menschen, Prozesse und bestehende Systeme werden ganzheitlich betrachtet."],
      ["02", "Analysieren", "Ineffizienzen, Risiken, Medienbrüche und Potenziale werden sichtbar gemacht."],
      ["03", "Optimieren", "Bevor Technologie eingesetzt wird, werden Abläufe vereinfacht und Entscheidungen klarer."],
      ["04", "Digitalisieren", "Die passende Architektur entsteht aus Cloud, Microsoft 365, Software, Schnittstellen oder KI."],
      ["05", "Automatisieren", "Wiederkehrende Arbeit wird reduziert und Datenflüsse werden sauber verbunden."],
      ["06", "Begleiten", "Nach dem Projekt beginnt die Partnerschaft: Betrieb, Verbesserung und Skalierung."],
    ],
    capabilities: [
      ["Digitalisierungsberatung", "Strategie, Roadmaps und Priorisierung für digitale Unternehmensentwicklung."],
      ["Prozessanalyse & Automatisierung", "Abläufe verstehen, vereinfachen, dokumentieren und automatisieren."],
      ["IT-Infrastruktur & Cloud", "Skalierbare Architekturen für sichere, moderne Arbeitsumgebungen."],
      ["Cyber Security & Backup", "Schutz, Monitoring, Wiederherstellbarkeit und Verantwortung im Betrieb."],
      ["Software & API-Integration", "Individuelle Lösungen und Schnittstellen, die Prozesse wirklich abbilden."],
      ["KI im Unternehmen", "Pragmatische KI-Anwendungen, die Arbeit erleichtern statt Komplexität erhöhen."],
    ],
    cases: [
      ["Mittelstand", "Von manuellen Abläufen zu klaren digitalen Prozessen.", "Analyse gewachsener Excel- und E-Mail-Prozesse, Aufbau einer zentralen Microsoft-365-Struktur und Automatisierung wiederkehrender Freigaben."],
      ["Dienstleister", "Mehr Transparenz zwischen Vertrieb, Projekt und Abrechnung.", "Entwicklung einer Integrationslogik zwischen CRM, Projektmanagement und Dokumentation."],
      ["Produktion", "Sicherere Infrastruktur für langfristiges Wachstum.", "Bewertung der bestehenden IT-Landschaft und Einführung von Backup-, Monitoring- und Security-Prozessen."],
    ],
    faq: [
      ["Bieten Sie klassische IT-Dienstleistungen an?", "Ja, aber nicht isoliert. Infrastruktur, Cloud, Microsoft 365, Security oder Software werden immer aus dem Unternehmenskontext heraus geplant."],
      ["Arbeiten Sie mit kleinen Unternehmen oder nur mit Konzernen?", "Die Unternehmensgröße ist nicht entscheidend. Entscheidend ist, ob Digitalisierung echten Mehrwert schaffen kann."],
      ["Verkaufen Sie bestimmte Produkte oder Lizenzen?", "Nein. Technologie folgt dem Prozess. Empfohlen wird, was zum Unternehmen, zur Strategie und zum Zielbild passt."],
      ["Wie beginnt eine Zusammenarbeit?", "Mit einem Gespräch über Ziele, Prozesse, Herausforderungen und Potenziale."],
    ],
    graphic: { top: "Unternehmensentwicklung durch Technologie", bottomTitle: "Innovation entsteht Schritt für Schritt.", bottomText: "Jede Optimierung macht das System belastbarer.", input: "Prozesse", analysis: "Potenziale", system: "Architektur", output: "Skalierung" },
  },
  en: {
    thinking: [
      ["01", "Historically grown processes.", "What looks complex today was often once the right decision. Over time, exceptions, tools and manual steps accumulate."],
      ["02", "Tools that do not talk to each other.", "Information is entered multiple times, copied or forwarded by email. This creates friction, delays and errors."],
      ["03", "Decisions without transparency.", "When current data is missing, decisions become slower and less reliable. Transparency creates orientation."],
      ["04", "IT fixes symptoms, not causes.", "New software does not improve a weak process. Technology creates value only when workflows are understood first."],
    ],
    methodology: [
      ["01", "Understand", "Business model, people, processes and existing systems are viewed as one connected system."],
      ["02", "Analyse", "Inefficiencies, risks, media breaks and opportunities become visible."],
      ["03", "Optimise", "Before technology is introduced, workflows are simplified and decisions become clearer."],
      ["04", "Digitalise", "The right architecture emerges from cloud, Microsoft 365, software, APIs or AI."],
      ["05", "Automate", "Recurring work is reduced and data flows are connected cleanly."],
      ["06", "Accompany", "After the project, the partnership begins: operation, improvement and scaling."],
    ],
    capabilities: [
      ["Digitalisation consulting", "Strategy, roadmaps and prioritisation for digital company development."],
      ["Process analysis & automation", "Understand, simplify, document and automate workflows."],
      ["IT infrastructure & cloud", "Scalable architectures for secure, modern work environments."],
      ["Cyber security & backup", "Protection, monitoring, recoverability and operational responsibility."],
      ["Software & API integration", "Custom solutions and interfaces that truly reflect processes."],
      ["AI in business", "Pragmatic AI use cases that reduce work instead of increasing complexity."],
    ],
    cases: [
      ["SME", "From manual workflows to clear digital processes.", "Analysis of grown Excel and email processes, a central Microsoft 365 structure and automation of recurring approvals."],
      ["Service provider", "More transparency between sales, projects and billing.", "Integration logic between CRM, project management and documentation."],
      ["Production", "More secure infrastructure for long-term growth.", "Assessment of the IT landscape and implementation of backup, monitoring and security processes."],
    ],
    faq: [
      ["Do you offer classic IT services?", "Yes, but not in isolation. Infrastructure, cloud, Microsoft 365, security and software are always planned from the company context."],
      ["Do you work with small companies or only corporations?", "Company size is not decisive. What matters is whether digitalisation can create real value."],
      ["Do you sell specific products or licences?", "No. Technology follows the process. Recommendations depend on the company, strategy and target picture."],
      ["How does a collaboration start?", "With a conversation about goals, processes, challenges and potential."],
    ],
    graphic: { top: "Company development through technology", bottomTitle: "Innovation emerges step by step.", bottomText: "Every optimisation makes the system more resilient.", input: "Processes", analysis: "Potential", system: "Architecture", output: "Scaling" },
  },
  sq: {
    thinking: [
      ["01", "Procese të rritura historikisht.", "Ajo që sot duket komplekse shpesh ka qenë dikur vendimi i duhur. Me kohën shtohen përjashtime, mjete dhe hapa manualë."],
      ["02", "Mjete që nuk komunikojnë me njëra-tjetrën.", "Informacionet regjistrohen disa herë, kopjohen ose dërgohen me email. Kjo krijon vonesa dhe gabime."],
      ["03", "Vendime pa transparencë.", "Kur mungojnë të dhënat aktuale, vendimet bëhen më të ngadalta dhe më të pasigurta. Transparenca krijon orientim."],
      ["04", "IT zgjidh simptoma, jo shkakun.", "Softueri i ri nuk e përmirëson një proces të dobët. Teknologjia krijon vlerë vetëm kur proceset kuptohen më parë."],
    ],
    methodology: [
      ["01", "Kuptimi", "Modeli i biznesit, njerëzit, proceset dhe sistemet ekzistuese analizohen si një sistem i lidhur."],
      ["02", "Analiza", "Joefikasitetet, rreziqet dhe potencialet bëhen të dukshme."],
      ["03", "Optimizimi", "Para teknologjisë thjeshtohen proceset dhe vendimet bëhen më të qarta."],
      ["04", "Digjitalizimi", "Arkitektura e duhur krijohet nga cloud, Microsoft 365, softueri, API ose AI."],
      ["05", "Automatizimi", "Puna e përsëritur reduktohet dhe rrjedhat e të dhënave lidhen pastër."],
      ["06", "Shoqërimi", "Pas projektit fillon partneriteti: operim, përmirësim dhe shkallëzim."],
    ],
    capabilities: [
      ["Këshillim për digjitalizim", "Strategji, plane dhe prioritete për zhvillim digjital të kompanisë."],
      ["Analizë procesesh & automatizim", "Kuptim, thjeshtim, dokumentim dhe automatizim i proceseve."],
      ["Infrastrukturë IT & cloud", "Arkitektura të shkallëzueshme për ambiente pune moderne dhe të sigurta."],
      ["Siguri kibernetike & backup", "Mbrojtje, monitorim, rikuperim dhe përgjegjësi operative."],
      ["Softuer & integrim API", "Zgjidhje individuale dhe ndërfaqe që pasqyrojnë realisht proceset."],
      ["AI në kompani", "Përdorime praktike të AI që lehtësojnë punën pa shtuar kompleksitet."],
    ],
    cases: [
      ["Biznes i mesëm", "Nga procese manuale në procese të qarta digjitale.", "Analizë e proceseve Excel/email, strukturë qendrore Microsoft 365 dhe automatizim aprovimesh."],
      ["Ofrues shërbimesh", "Më shumë transparencë mes shitjeve, projekteve dhe faturimit.", "Logjikë integrimi mes CRM, menaxhimit të projekteve dhe dokumentimit."],
      ["Prodhim", "Infrastrukturë më e sigurt për rritje afatgjatë.", "Vlerësim i IT-së ekzistuese dhe zbatim i backup, monitorimit dhe sigurisë."],
    ],
    faq: [
      ["A ofroni shërbime klasike IT?", "Po, por jo të izoluara. Infrastruktura, cloud, Microsoft 365, siguria dhe softueri planifikohen gjithmonë nga konteksti i kompanisë."],
      ["Punoni me kompani të vogla apo vetëm me korporata?", "Madhësia nuk është vendimtare. E rëndësishme është nëse digjitalizimi krijon vlerë reale."],
      ["A shisni produkte ose licenca të caktuara?", "Jo. Teknologjia ndjek procesin. Rekomandimet varen nga kompania, strategjia dhe objektivi."],
      ["Si fillon bashkëpunimi?", "Me një bisedë rreth qëllimeve, proceseve, sfidave dhe potencialit."],
    ],
    graphic: { top: "Zhvillim kompanie përmes teknologjisë", bottomTitle: "Inovacioni lind hap pas hapi.", bottomText: "Çdo optimizim e bën sistemin më të qëndrueshëm.", input: "Proceset", analysis: "Potenciali", system: "Arkitektura", output: "Shkallëzimi" },
  },
};

function Header() {
  const { t } = useLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="#" className="flex items-center gap-3 text-sm font-semibold tracking-[-0.02em]">
          <Image src="/logo.png" alt="Leon Pllana IT-Solutions Logo" width={32} height={32} className="h-8 w-8 rounded-xl" priority />
          <span>Leon Pllana IT-Solutions</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Hauptnavigation">
          {siteNav.map((item, index) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground transition hover:text-foreground">
              {t.nav[index]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:block"><LanguageSwitcher /></div>
          <div className="hidden md:block"><ThemeToggle /></div>
          <Button asChild size="sm"><Link href="#kontakt">{t.headerCta}</Link></Button>
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
  const { locale } = useLocale();
  const g = localizedContent[locale].graphic;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-xl">
      <div className="absolute inset-0 rounded-[2.5rem] border border-border bg-card/60 shadow-premium backdrop-blur-xl" />
      <div className="absolute inset-5 overflow-hidden rounded-[2rem] border border-border/70 bg-muted/25">
        <div className="gradient-grid absolute inset-0 opacity-50" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        {['inset-8', 'inset-16', 'inset-24'].map((ring) => <div key={ring} className={`absolute ${ring} rounded-full border border-border/70`} />)}
        <svg className="absolute inset-0 h-full w-full text-border" viewBox="0 0 560 560" aria-hidden="true">
          <path d="M106 166 C 190 130, 218 204, 280 250" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
          <path d="M454 164 C 370 132, 338 205, 280 250" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
          <path d="M118 398 C 190 428, 226 360, 280 310" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
          <path d="M444 398 C 370 430, 338 360, 280 310" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
          <path d="M280 122 L280 438" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 10" />
          <path d="M122 280 L438 280" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 10" />
        </svg>
        <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-accent/40 bg-background/90 p-5 text-center shadow-glow backdrop-blur-xl">
          <div><p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Core</p><p className="mt-3 text-xl font-semibold tracking-[-0.04em]">Process first.</p><p className="mt-2 text-xs leading-5 text-muted-foreground">Technology second.</p></div>
        </div>
        <div className="absolute left-[15%] top-[16%] h-3 w-3 rounded-full bg-foreground shadow-glow" />
        <div className="absolute right-[15%] top-[16%] h-3 w-3 rounded-full bg-foreground/70" />
        <div className="absolute bottom-[17%] left-[17%] h-3 w-3 rounded-full bg-foreground/60" />
        <div className="absolute bottom-[17%] right-[17%] h-3 w-3 rounded-full bg-foreground/60" />
        <div className="absolute left-1/2 top-12 -translate-x-1/2 rounded-full border border-border bg-background/75 px-4 py-2 text-xs text-muted-foreground backdrop-blur">{g.top}</div>
      </div>
      <SignalNode className="-left-4 top-16 hidden w-40 lg:block" label="Input" value={g.input} />
      <SignalNode className="-right-4 top-24 hidden w-40 lg:block" label="Analysis" value={g.analysis} />
      <SignalNode className="bottom-20 -left-6 hidden w-44 lg:block" label="System" value={g.system} />
      <SignalNode className="-right-5 bottom-14 hidden w-44 lg:block" label="Output" value={g.output} />
      <div className="absolute -bottom-7 left-6 right-6 rounded-2xl border border-border bg-background/90 p-5 shadow-premium backdrop-blur-xl">
        <p className="text-sm font-medium">{g.bottomTitle}</p><p className="mt-1 text-sm text-muted-foreground">{g.bottomText}</p>
      </div>
    </div>
  );
}

function Hero() {
  const { t } = useLocale();
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pt-24">
      <div className="gradient-grid absolute inset-0 -z-10 opacity-50" />
      <div className="absolute left-1/2 top-24 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-20 py-24 lg:grid-cols-[1.02fr_.98fr]">
        <FadeIn><div className="relative z-10">
          <div className="mb-8 inline-flex rounded-full border border-border bg-background/70 px-4 py-2 text-sm text-muted-foreground shadow-premium backdrop-blur">{t.badge}</div>
          <h1 className="max-w-5xl text-6xl font-semibold tracking-[-0.075em] sm:text-7xl lg:text-8xl">{t.heroTitle}</h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9">{t.heroText}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><Link href="#kontakt">{t.heroPrimary} <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="#denkweise">{t.heroSecondary}</Link></Button>
          </div>
          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3 border-t border-border pt-6 text-sm text-muted-foreground">{t.pillars.map((item) => <p key={item}>{item}</p>)}</div>
        </div></FadeIn>
        <FadeIn delay={0.15}><HeroGraphic /></FadeIn>
      </div>
    </section>
  );
}

function AeoSummary() {
  const { t } = useLocale();
  return <section id="aeo-summary" className="px-6 pb-20"><div className="mx-auto max-w-7xl rounded-[2rem] border border-border bg-card/70 p-8 shadow-premium backdrop-blur-xl md:p-10"><p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">{t.summaryEyebrow}</p><h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">{t.summaryTitle}</h2><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{t.summaryText}</p></div></section>;
}

function PartnerSection() {
  const { t } = useLocale();
  return <section className="px-6 pb-24"><div className="mx-auto max-w-7xl"><FadeIn><p className="mb-6 text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">{t.partners}</p><PartnerLogoMarquee /></FadeIn></div></section>;
}

function ThinkingSection() {
  const { t, locale } = useLocale();
  return <section id="denkweise" className="premium-frame relative overflow-hidden bg-background px-6 py-32"><div className="architecture-grid absolute inset-0 opacity-60" /><div className="relative mx-auto max-w-7xl"><div className="grid gap-16 lg:grid-cols-[0.92fr_1.08fr]"><FadeIn><div className="sticky top-28"><SectionEyebrow>{t.thinkingEyebrow}</SectionEyebrow><h2 className="max-w-3xl text-5xl font-semibold tracking-[-0.065em] sm:text-7xl">{t.thinkingTitle}</h2><p className="mt-8 max-w-xl text-xl leading-8 text-muted-foreground">{t.thinkingText}</p></div></FadeIn><div className="space-y-2">{localizedContent[locale].thinking.map(([number, title, text], index) => <FadeIn key={number} delay={index * 0.06}><div className="grid gap-5 border-b border-border/80 py-9 md:grid-cols-[96px_1fr]"><p className="text-sm text-muted-foreground">{number}</p><div><p className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{title}</p><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{text}</p></div></div></FadeIn>)}</div></div></div></section>;
}

function MethodologySection() {
  const { t, locale } = useLocale();
  return <Section id="vorgehen"><FadeIn><SectionEyebrow>{t.methodologyEyebrow}</SectionEyebrow><SectionTitle>{t.methodologyTitle}</SectionTitle></FadeIn><div className="mt-16 grid gap-4 lg:grid-cols-3">{localizedContent[locale].methodology.map(([number, title, text], index) => <FadeIn key={title} delay={index * 0.04}><div className="group h-full rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-premium"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">{number}</span><Check className="h-4 w-4 text-muted-foreground" /></div><h3 className="mt-10 text-2xl font-semibold tracking-[-0.03em]">{title}</h3><p className="mt-4 leading-7 text-muted-foreground">{text}</p></div></FadeIn>)}</div></Section>;
}

function CapabilitiesSection() {
  const { t, locale } = useLocale();
  return <section id="kompetenzen" className="premium-frame relative overflow-hidden bg-muted/35 px-6 py-28 text-foreground"><div className="relative mx-auto max-w-7xl"><FadeIn><SectionEyebrow>{t.capabilitiesEyebrow}</SectionEyebrow><SectionTitle>{t.capabilitiesTitle}</SectionTitle></FadeIn><div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{localizedContent[locale].capabilities.map(([title, text]) => <div key={title} className="bg-card p-8"><h3 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h3><p className="mt-4 leading-7 text-muted-foreground">{text}</p></div>)}</div></div></section>;
}

function CaseStudiesSection() {
  const { t, locale } = useLocale();
  return <Section id="cases"><FadeIn><SectionEyebrow>{t.casesEyebrow}</SectionEyebrow><SectionTitle>{t.casesTitle}</SectionTitle></FadeIn><div className="mt-16 space-y-4">{localizedContent[locale].cases.map(([tag, title, text], index) => <FadeIn key={title} delay={index * 0.05}><article className="grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-premium md:grid-cols-[180px_1fr]"><p className="text-sm font-medium text-muted-foreground">{tag}</p><div><h3 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h3><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{text}</p></div></article></FadeIn>)}</div></Section>;
}

function BrandPromiseSection() {
  const { t } = useLocale();
  return <Section><div className="rounded-[2.5rem] border border-border bg-muted/45 p-8 shadow-premium sm:p-14 lg:p-20"><FadeIn><p className="text-lg text-muted-foreground">{t.brandPromiseLabel}</p><blockquote className="mt-6 max-w-5xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">{t.brandPromiseTitle}</blockquote><p className="mt-8 max-w-2xl text-xl leading-8 text-muted-foreground">{t.brandPromiseText}</p></FadeIn></div></Section>;
}

function FAQSection() {
  const { t, locale } = useLocale();
  return <section id="faq" className="border-y border-border bg-muted/35 px-6 py-28"><div className="mx-auto max-w-4xl"><FadeIn><SectionEyebrow>{t.faqEyebrow}</SectionEyebrow><SectionTitle className="max-w-none">{t.faqTitle}</SectionTitle></FadeIn><div className="mt-12 divide-y divide-border rounded-3xl border border-border bg-card">{localizedContent[locale].faq.map(([question, answer]) => <details key={question} className="group p-7 open:bg-muted/30"><summary className="cursor-pointer list-none text-lg font-medium">{question}</summary><p className="mt-4 leading-7 text-muted-foreground">{answer}</p></details>)}</div></div></section>;
}

function ContactSection() {
  const { t } = useLocale();
  return <section id="kontakt" className="px-6 py-28"><div className="mx-auto max-w-5xl text-center"><FadeIn><SectionEyebrow>{t.contactEyebrow}</SectionEyebrow><h2 className="text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">{t.contactTitle}</h2><p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-muted-foreground">{t.contactText}</p><div className="mt-12 flex justify-center"><Button asChild size="lg"><a href={`mailto:${contactEmail}`} className="min-w-64 justify-center">{t.contactCta} <ArrowRight className="ml-2 h-4 w-4" /></a></Button></div><div className="mx-auto mt-12 max-w-2xl border-t border-border pt-8"><p className="text-sm text-muted-foreground">{t.socialHint}</p><div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"><Button asChild size="lg" variant="outline"><a href={socialLinks.linkedin} target="_blank" rel="noreferrer"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</a></Button><Button asChild size="lg" variant="outline"><a href={socialLinks.whatsapp} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</a></Button><Button asChild size="lg" variant="outline"><a href={socialLinks.instagram} target="_blank" rel="noreferrer"><Instagram className="mr-2 h-4 w-4" /> Instagram</a></Button></div></div></FadeIn></div></section>;
}

function Footer() {
  const { t } = useLocale();
  return <footer className="border-t border-border px-6 py-10"><div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"><div><p>© {new Date().getFullYear()} Leon Pllana IT-Solutions</p><p className="mt-1">{t.footerClaim}</p></div><nav className="flex flex-wrap gap-4" aria-label="Rechtliche Links"><Link href="/impressum" className="transition hover:text-foreground">{t.legal.imprint}</Link><Link href="/datenschutz" className="transition hover:text-foreground">{t.legal.privacy}</Link><Link href="/agb" className="transition hover:text-foreground">{t.legal.terms}</Link><Link href="/cookie-richtlinie" className="transition hover:text-foreground">{t.legal.cookies}</Link></nav></div></footer>;
}

export default function Home() {
  return <main className="min-h-screen overflow-hidden bg-background text-foreground"><Header /><Hero /><AeoSummary /><PartnerSection /><ThinkingSection /><MethodologySection /><CapabilitiesSection /><CaseStudiesSection /><BrandPromiseSection /><FAQSection /><ContactSection /><Footer /></main>;
}
