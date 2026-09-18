import type { Locale } from "@/lib/i18n";

// Shared commercial values. Changes should also be reflected in the offer template.
export const additionalHourlyRate = 100;
export const billingIncrementMinutes = 15;
const incrementPrice = additionalHourlyRate * billingIncrementMinutes / 60;
export const servicePackages = [
  { id: "web", name: "Web Care", monthlyPrice: 199, serviceHours: 1.5 },
  { id: "workplace", name: "Workplace Care", monthlyPrice: 399, serviceHours: 3 },
  { id: "cloud", name: "Cloud & App Care", monthlyPrice: 499, serviceHours: 4 },
] as const;

type PackageId = (typeof servicePackages)[number]["id"];
type PackageCopy = {
  audience: string;
  outcome: string;
  scope: string;
  features: readonly string[];
  exclusions: string;
};
type PortfolioCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  careTitle: string;
  from: string;
  monthly: string;
  net: string;
  timeLabel: string;
  hours: string;
  scopeLabel: string;
  includedLabel: string;
  details: string;
  separately: string;
  termsSummary: string;
  cta: string;
  budgetTitle: string;
  budgetText: string;
  additionalTitle: string;
  hourly: string;
  additionalText: string;
  conditionsTitle: string;
  conditions: readonly { title: string; text: string }[];
  packages: Record<PackageId, PackageCopy>;
};

export const portfolioCopy = {
  de: {
    eyebrow: "Leistungen für KMU · München und 50 km Umland",
    title: "Projekte umsetzen. Systeme betreuen.",
    intro: "Eine neue Website, Microsoft 365, individuelle Software oder laufende Wartung: Wählen Sie die passende Leistung. Einmalige Projekte und monatliche Betreuung sind einzeln buchbar und miteinander kombinierbar.",
    careTitle: "Laufende Betreuung",
    from: "ab", monthly: "/ Monat", net: "netto · Umsatzsteuer gemäß Angebot",
    timeLabel: "Interne Servicekapazität", hours: "Std. / Monat",
    scopeLabel: "Passend für", includedLabel: "Damit Sie sich nicht selbst kümmern müssen", details: "Leistungsumfang & Grenzen", separately: "Bei Bedarf separat",
    termsSummary: "Transparente Rahmenbedingungen ansehen",
    cta: "Betreuung anfragen",
    budgetTitle: "Klare Betreuung statt einzelner IT-Aufträge",
    budgetText: "Die monatliche Pauschale bündelt regelmäßige Pflege, Prüfungen, Support, kleinere Anpassungen, Abstimmung und Dokumentation. Routine und Betriebssicherheit haben Vorrang. Für zusätzliche Vorhaben stimmen wir Umfang und Kosten vorab mit Ihnen ab.",
    additionalTitle: "Zusätzliche Vorhaben nach Freigabe", hourly: "€ netto / Stunde",
    additionalText: `Abrechnung in ${billingIncrementMinutes}-Minuten-Schritten zu ${incrementPrice} € netto. Bei absehbarem Mehrbedarf stimmen wir den zusätzlichen Aufwand vorab mit Ihnen ab.`,
    conditionsTitle: "So entsteht Ihr verbindliches Angebot",
    conditions: [
      { title: "Bestand prüfen und Umfang festlegen", text: "Die Einstiegspreise gelten für den beschriebenen Referenzumfang bei übernahmefähigen Systemen. Vor Beginn prüfen wir Zustand, Zugänge und Pflegeaufwand. Größere oder komplexere Umgebungen erhalten ein angepasstes Angebot." },
      { title: "Einrichtung als eigenes Projekt", text: "Neue Websites, Microsoft-365- und Intune-Einrichtungen, Migrationen, neue Apps, Backup-Einrichtung und die Behebung bestehender Probleme werden einmalig separat angeboten. Die monatliche Betreuung beginnt nach der vereinbarten Übergabe." },
      { title: "Fremdkosten transparent ausweisen", text: "Hosting, Domains, Microsoft-Lizenzen, kostenpflichtige Software und Backup-Speicher sind nicht in der Betreuungspauschale enthalten. Vor-Ort-Einsätze und Fahrtkosten werden vorab vereinbart." },
      { title: "Zusammenarbeit planbar vereinbaren", text: "Servicefenster, Reaktionszeiten, Laufzeit, Kündigung und Zahlungsweise werden im Angebot festgehalten. Eine Rufbereitschaft oder 24/7-Betreuung ist nicht enthalten. Ungenutzte Servicezeit wird nicht in den Folgemonat übertragen." },
    ],
    packages: {
      web: {
        audience: "Für Ihren Unternehmensauftritt",
        outcome: "Ihre Website bleibt technisch gepflegt, aktuell und zuverlässig erreichbar – ohne dass Sie Updates, Sicherungen und kleine Änderungen selbst nachhalten müssen.",
        scope: "Eine vereinbarte Unternehmenswebsite beziehungsweise eine CMS-Installation.",
        features: ["Regelmäßige technische Pflege, vereinbarte Updates und Funktionstests.", "Kontrolle der Sicherungsergebnisse bei eingerichtetem Website-Backup.", "Kleine Text- und Bildänderungen mit Ihren bereitgestellten Inhalten.", "Kurze Dokumentation der erledigten Arbeiten und Auffälligkeiten."],
        exclusions: "Neuerstellung, Relaunch, Shops, individuelle Webanwendungen, Texterstellung und größere Designänderungen. Backup-Einrichtung vor Betreuungsbeginn klären.",
      },
      workplace: {
        audience: "Für digitale Arbeitsplätze",
        outcome: "Ein verlässlicher Ansprechpartner für Microsoft 365, Benutzer und Geräte – mit regelmäßigem Blick auf Zustand, Zugriffe und Compliance.",
        scope: "Ein bestehender Microsoft-365-Mandant mit bis zu 10 Benutzern und 15 bereits in Intune eingebundenen Geräten.",
        features: ["Regelmäßige Zustandsprüfung von Microsoft 365, Intune, Geräterichtlinien und vereinbarten Unternehmens-Apps.", "Prüfung der vereinbarten Geräte-Compliance und grundlegenden Zugriffsrichtlinien.", "Kleine Benutzer-, Geräte- und Standard-App-Anpassungen im laufenden Betreuungsrahmen.", "Dokumentation von Auffälligkeiten und durchgeführten Änderungen."],
        exclusions: "Ersteinrichtung, Migrationen, umfangreiche Richtlinienänderungen, neue App-Paketierungen und Vor-Ort-Arbeiten. Eine zusätzliche Datensicherung für Microsoft 365 wird gesondert vereinbart.",
      },
      cloud: {
        audience: "Für Server und Unternehmens-Apps",
        outcome: "Ihre Anwendung läuft auf einer gepflegten Umgebung, Backups werden kontrolliert und technische Auffälligkeiten landen nicht erst im Notfall auf Ihrem Tisch.",
        scope: "Ein Linux-Server, ein produktiver Anwendungsstack inklusive vereinbarter Abhängigkeiten und ein externes Backupziel für bis zu 100 GB Quelldaten.",
        features: ["Regelmäßige Server- und Anwendungspflege mit Kompatibilitätsprüfung und Funktionstest.", "Automatisierte Sicherung nach vereinbarter Einrichtung und regelmäßige Prüfung der Ergebnisse.", "Stichprobenartige Wiederherstellung mit dokumentiertem Ergebnis.", "Kleine Konfigurationsänderungen im laufenden Betreuungsrahmen."],
        exclusions: "Neue Installationen, Migrationen, weitere Anwendungen, eigene Softwareentwicklung und größere Versionswechsel. Aufbewahrung und gesicherte Daten werden im Angebot festgelegt; ein vollständiger Notfall-Wiederanlauf ist separat zu planen.",
      },
    },
  },
  en: {
    eyebrow: "Services for SMEs · Munich and within 50 km",
    title: "Deliver projects. Maintain systems.",
    intro: "A new website, Microsoft 365, custom software or ongoing maintenance: choose the service you need. One-off projects and monthly support are available separately and can be combined.",
    careTitle: "Ongoing support",
    from: "from", monthly: "/ month", net: "net · VAT as stated in your quote",
    timeLabel: "Internal service capacity", hours: "hours / month",
    scopeLabel: "A good fit for", includedLabel: "So you do not have to manage it yourself", details: "Scope & boundaries", separately: "Agreed separately when needed",
    termsSummary: "View transparent service terms",
    cta: "Request support",
    budgetTitle: "Ongoing ownership instead of separate IT tickets",
    budgetText: "The monthly fee bundles regular maintenance, checks, support, minor adjustments, coordination and documentation. Routine work and operational reliability take priority. Additional projects are agreed with you in advance.",
    additionalTitle: "Additional projects with your approval", hourly: "€ net / hour",
    additionalText: `Billed in ${billingIncrementMinutes}-minute increments at €${incrementPrice} net. If more time is needed, we agree the additional work with you in advance.`,
    conditionsTitle: "How we prepare your binding quote",
    conditions: [
      { title: "Review the systems and agree the scope", text: "Starting prices apply to the reference scope for systems ready for ongoing support. We review their condition, access and maintenance effort first. Larger or more complex environments receive an adjusted quote." },
      { title: "Set up through a separate project", text: "New websites, Microsoft 365 and Intune setup, migrations, new apps, backup setup and existing issues are quoted separately as one-off work. Monthly support starts after the agreed handover." },
      { title: "Show third-party costs separately", text: "Hosting, domains, Microsoft licences, paid software and backup storage are not included in the service fee. On-site visits and travel costs are agreed in advance." },
      { title: "Agree how we work together", text: "Service windows, response times, contract term, cancellation and payment are specified in the quote. On-call or 24/7 support is not included. Unused service time does not carry over to the following month." },
    ],
    packages: {
      web: {
        audience: "For your company website", outcome: "A maintained website with up-to-date content.",
        scope: "One agreed company website or CMS installation.",
        features: ["Regular technical maintenance, agreed updates and functional checks.", "Review of backup results where website backups are configured.", "Minor text and image changes using supplied content.", "A short record of completed work and notable findings."],
        exclusions: "New builds, relaunches, shops, custom web applications, copywriting and major design changes. Agree backup setup before support starts.",
      },
      workplace: {
        audience: "For digital workplaces", outcome: "Microsoft 365 and managed devices with a dedicated contact.",
        scope: "One existing Microsoft 365 tenant with up to 10 users and 15 devices already enrolled in Intune.",
        features: ["Regular health review of Microsoft 365, Intune, device policies and agreed business apps.", "Review of agreed device compliance and basic access policies.", "Minor user, device and standard app changes within the ongoing support scope.", "Documentation of findings and completed changes."],
        exclusions: "Initial setup, migrations, extensive policy changes, new app packaging and on-site work. Additional Microsoft 365 data backup is agreed separately.",
      },
      cloud: {
        audience: "For servers and business apps", outcome: "A supported application with server maintenance and checked backups.",
        scope: "One Linux server, one production application stack including agreed dependencies and one external backup target for up to 100 GB of source data.",
        features: ["Regular server and application maintenance with compatibility and functional checks.", "Automated backups after agreed setup and regular review of the results.", "Sample restores with documented results.", "Minor configuration changes within the ongoing support scope."],
        exclusions: "New installations, migrations, additional applications, custom development and major version upgrades. Retention and protected data are specified in the quote; full disaster recovery is planned separately.",
      },
    },
  },
  sq: {
    eyebrow: "Shërbime për NVM · Mynih dhe 50 km përreth",
    title: "Realizim projektesh dhe mirëmbajtje sistemesh.",
    intro: "Një faqe e re, Microsoft 365, softuer i personalizuar apo mirëmbajtje e vazhdueshme: zgjidhni shërbimin e duhur. Projektet e njëhershme dhe mbështetja mujore mund të blihen veçmas ose të kombinohen.",
    careTitle: "Mbështetje e vazhdueshme",
    from: "nga", monthly: "/ muaj", net: "neto · TVSH sipas ofertës",
    timeLabel: "Kapaciteti i brendshëm i shërbimit", hours: "orë / muaj",
    scopeLabel: "I përshtatshëm për", includedLabel: "Që të mos duhet ta menaxhoni vetë", details: "Shërbimet & kufijtë", separately: "Veçmas sipas nevojës",
    termsSummary: "Shikoni kushtet transparente të shërbimit",
    cta: "Kërkoni mbështetje",
    budgetTitle: "Përgjegjësi e vazhdueshme në vend të kërkesave të veçanta IT",
    budgetText: "Tarifa mujore bashkon mirëmbajtjen, kontrollet, mbështetjen, ndryshimet e vogla, koordinimin dhe dokumentimin. Mirëmbajtja rutinë dhe funksionimi i sigurt kanë përparësi. Projektet shtesë dakordohen paraprakisht.",
    additionalTitle: "Projekte shtesë me miratimin tuaj", hourly: "€ neto / orë",
    additionalText: `Faturim në intervale prej ${billingIncrementMinutes} minutash me ${incrementPrice} € neto. Nëse nevojitet më shumë kohë, puna shtesë dakordohet paraprakisht me ju.`,
    conditionsTitle: "Si përgatitet oferta juaj përfundimtare",
    conditions: [
      { title: "Kontrolli i sistemeve dhe përcaktimi i fushës", text: "Çmimet fillestare vlejnë për fushën referuese dhe sisteme të gatshme për mbështetje. Fillimisht kontrollojmë gjendjen, qasjet dhe nevojën për mirëmbajtje. Mjediset më të mëdha ose më komplekse marrin ofertë të përshtatur." },
      { title: "Konfigurimi si projekt më vete", text: "Faqet e reja, konfigurimi i Microsoft 365 dhe Intune, migrimet, aplikacionet e reja, konfigurimi i backup-it dhe problemet ekzistuese ofertohen veçmas. Mbështetja mujore fillon pas dorëzimit të dakorduar." },
      { title: "Kostot e palëve të treta veçmas", text: "Hostimi, domenet, licencat Microsoft, softueri me pagesë dhe hapësira e backup-it nuk përfshihen në tarifën e shërbimit. Vizitat në vend dhe shpenzimet e udhëtimit dakordohen paraprakisht." },
      { title: "Bashkëpunim i planifikueshëm", text: "Oraret e shërbimit, koha e reagimit, afati, ndërprerja dhe pagesa përcaktohen në ofertë. Gatishmëria emergjente dhe mbështetja 24/7 nuk përfshihen. Koha e papërdorur nuk bartet në muajin pasues." },
    ],
    packages: {
      web: {
        audience: "Për faqen e kompanisë", outcome: "Një faqe e mirëmbajtur teknikisht me përmbajtje të përditësuar.",
        scope: "Një faqe kompanie ose një instalim CMS i dakorduar.",
        features: ["Mirëmbajtje teknike e rregullt, përditësime të dakorduara dhe test funksional.", "Kontroll i rezultateve të backup-it kur ai është konfiguruar.", "Ndryshime të vogla teksti dhe imazhesh me materialet tuaja.", "Dokumentim i shkurtër i punëve dhe gjetjeve."],
        exclusions: "Faqe të reja, ridizenjim, dyqane, aplikacione individuale, shkrim tekstesh dhe ndryshime të mëdha dizajni. Konfigurimi i backup-it dakordohet para fillimit.",
      },
      workplace: {
        audience: "Për vendet digjitale të punës", outcome: "Microsoft 365 dhe pajisje të administruara me një person kontakti.",
        scope: "Një mjedis ekzistues Microsoft 365 me deri në 10 përdorues dhe 15 pajisje të regjistruara tashmë në Intune.",
        features: ["Kontroll i rregullt i Microsoft 365, Intune, politikave të pajisjeve dhe aplikacioneve të dakorduara.", "Kontroll i përputhshmërisë së pajisjeve dhe politikave bazë të qasjes.", "Ndryshime të vogla të përdoruesve, pajisjeve dhe aplikacioneve standarde brenda mirëmbajtjes së vazhdueshme.", "Dokumentim i gjetjeve dhe ndryshimeve të kryera."],
        exclusions: "Konfigurimi fillestar, migrimet, ndryshimet e mëdha të politikave, paketimi i aplikacioneve të reja dhe puna në vend. Backup shtesë për të dhënat e Microsoft 365 dakordohet veçmas.",
      },
      cloud: {
        audience: "Për serverë dhe aplikacione biznesi", outcome: "Një aplikacion i mbështetur me server të mirëmbajtur dhe backup të kontrolluar.",
        scope: "Një server Linux, një sistem aplikacioni në prodhim me varësitë e dakorduara dhe një destinacion të jashtëm backup-i për deri në 100 GB të dhëna burimore.",
        features: ["Mirëmbajtje e rregullt e serverit dhe aplikacionit me kontroll përputhshmërie dhe funksionimi.", "Backup automatik pas konfigurimit të dakorduar dhe kontroll i rregullt i rezultateve.", "Rikthime provë me rezultate të dokumentuara.", "Ndryshime të vogla konfigurimi brenda mirëmbajtjes së vazhdueshme."],
        exclusions: "Instalime të reja, migrime, aplikacione shtesë, zhvillim individual dhe kalime të mëdha versionesh. Ruajtja dhe të dhënat e mbrojtura përcaktohen në ofertë; rikthimi i plotë pas incidentit planifikohet veçmas.",
      },
    },
  },
} satisfies Record<Locale, PortfolioCopy>;
