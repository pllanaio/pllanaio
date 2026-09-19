import type { Metadata } from "next";

const siteUrl = "https://pllana.io";
const businessName = "Leon Pllana IT-Solutions";
const organizationId = `${siteUrl}/#organization`;

export type HubItem = { title: string; text: string };
export type HubSection = { title: string; intro?: string; items: readonly HubItem[] };
export type HubContent = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  sections: readonly HubSection[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  ctaHref: string;
  related: readonly { label: string; href: string }[];
};

export const hubs = {
  "strategische-digitalisierung": {
    slug: "strategische-digitalisierung",
    eyebrow: "Strategische Digitalisierung",
    title: "Digitalisierung beginnt nicht mit Software, sondern mit dem richtigen Problem.",
    description: "Strategische Digitalisierung: Prozesse verstehen, Potenziale priorisieren und passende Technologien nachhaltig umsetzen.",
    summary: "Strategische Digitalisierung verbindet Geschäftsziele, Prozesse und Technologie. Erst wird verstanden, wo Zeit, Transparenz oder Sicherheit verloren gehen. Danach werden Abläufe vereinfacht und nur die Technologien eingesetzt, die einen klaren Beitrag leisten.",
    sections: [
      {
        title: "Unsere Denkweise",
        items: [
          { title: "Historisch gewachsene Prozesse", text: "Was heute komplex wirkt, war oft einmal die richtige Entscheidung. Über Jahre entstehen Ausnahmen, zusätzliche Werkzeuge und manuelle Zwischenschritte." },
          { title: "Tools, die nicht miteinander sprechen", text: "Informationen werden mehrfach erfasst, kopiert oder per E-Mail weitergegeben. Dadurch entstehen Medienbrüche, Zeitverluste und Fehler." },
          { title: "Entscheidungen ohne Transparenz", text: "Wenn aktuelle Daten fehlen, werden Entscheidungen langsamer und unsicherer. Transparenz schafft Orientierung." },
          { title: "IT löst Symptome, aber nicht automatisch Ursachen", text: "Neue Software macht einen schlechten Prozess nicht besser. Technologie schafft erst dann Mehrwert, wenn der Ablauf verstanden ist." },
        ],
      },
      {
        title: "So gehen wir vor",
        intro: "Ein klarer Ablauf verhindert, dass Digitalisierung zu einer Sammlung einzelner Tools wird.",
        items: [
          { title: "01 · Verstehen", text: "Geschäftsmodell, Menschen, Prozesse und bestehende Systeme werden ganzheitlich betrachtet." },
          { title: "02 · Analysieren", text: "Ineffizienzen, Risiken, Medienbrüche und Potenziale werden sichtbar gemacht." },
          { title: "03 · Optimieren", text: "Bevor Technologie eingesetzt wird, werden Abläufe vereinfacht und Entscheidungen klarer." },
          { title: "04 · Digitalisieren", text: "Die passende Architektur entsteht aus Microsoft 365, Cloud, Software, Schnittstellen oder anderen geeigneten Bausteinen." },
          { title: "05 · Automatisieren", text: "Wiederkehrende Arbeit wird reduziert und Datenflüsse werden sauber verbunden." },
          { title: "06 · Begleiten", text: "Nach der Umsetzung folgen Betrieb, Verbesserung und Skalierung statt eines abrupten Projektendes." },
        ],
      },
      {
        title: "Wann strategische Digitalisierung sinnvoll ist",
        items: [
          { title: "Wiederkehrende manuelle Arbeit", text: "Daten werden mehrfach übertragen, Listen gepflegt oder Freigaben per E-Mail nachverfolgt." },
          { title: "Unklare Systemlandschaft", text: "Mehrere Anwendungen erfüllen ähnliche Aufgaben oder niemand hat einen vollständigen Überblick über Abhängigkeiten." },
          { title: "Wachstum erzeugt Reibung", text: "Abläufe, die mit fünf Personen funktioniert haben, werden mit zwanzig Mitarbeitern unübersichtlich." },
          { title: "Technische Entscheidungen stehen an", text: "Cloud, Microsoft 365, Automatisierung oder Individualsoftware sollen eingeführt werden, aber die Prioritäten sind noch nicht klar." },
        ],
      },
    ],
    ctaTitle: "Wo verliert Ihr Unternehmen heute unnötig Zeit oder Klarheit?",
    ctaText: "Wir ordnen die Ausgangslage ein und priorisieren die nächsten sinnvollen Schritte, bevor Technologie ausgewählt wird.",
    ctaLabel: "Potenziale besprechen",
    ctaHref: "/#kontakt",
    related: [
      { label: "Kompetenzen ansehen", href: "/kompetenzen" },
      { label: "IT-Risiken einordnen", href: "/it-risiken" },
      { label: "Leistungen ansehen", href: "/leistungen" },
    ],
  },
  kompetenzen: {
    slug: "kompetenzen",
    eyebrow: "Kompetenzen",
    title: "Beratung, Architektur und Umsetzung aus einer Hand.",
    description: "Kompetenzen von Leon Pllana IT-Solutions: Prozessanalyse, Microsoft 365, Cloud, Cyber Security, Automatisierung, Software und KI.",
    summary: "Unsere Kompetenzen decken die Verbindung zwischen Geschäftsprozess und technischer Umsetzung ab. Entscheidend ist nicht, möglichst viele Technologien einzusetzen, sondern die richtige Kombination für den konkreten Ablauf und den laufenden Betrieb zu wählen.",
    sections: [
      {
        title: "Unsere Kernkompetenzen",
        items: [
          { title: "Digitalisierungsberatung", text: "Strategie, Roadmaps und Priorisierung für digitale Unternehmensentwicklung." },
          { title: "Prozessanalyse & Automatisierung", text: "Abläufe verstehen, vereinfachen, dokumentieren und wiederkehrende Arbeit automatisieren." },
          { title: "IT-Infrastruktur & Cloud", text: "Skalierbare Architekturen für sichere, moderne und nachvollziehbare Arbeitsumgebungen." },
          { title: "Cyber Security & Backup", text: "Schutz, Monitoring, Wiederherstellbarkeit, Zugriffsmodelle und klare Verantwortung im Betrieb." },
          { title: "Software & API-Integration", text: "Individuelle Lösungen und Schnittstellen, die bestehende Prozesse und Systeme sinnvoll verbinden." },
          { title: "KI im Unternehmen", text: "Pragmatische KI-Anwendungen für Recherche, Assistenz, Klassifizierung und Automatisierung – eingebettet in einen belastbaren Prozess." },
        ],
      },
      {
        title: "Wie die Kompetenzen zusammenspielen",
        items: [
          { title: "Prozess vor Plattform", text: "Wir klären zuerst Ziel, Beteiligte und Datenfluss. Erst danach entscheiden wir, ob Standardsoftware, Automatisierung oder Individualentwicklung passt." },
          { title: "Security als Bestandteil", text: "Berechtigungen, Backup und Wiederherstellung werden nicht erst nachträglich betrachtet, sondern gehören zur Architektur." },
          { title: "Betrieb mitdenken", text: "Dokumentation, Zuständigkeiten, Wartung und spätere Änderungen werden früh berücksichtigt, damit Lösungen langfristig tragfähig bleiben." },
        ],
      },
    ],
    ctaTitle: "Sie wissen noch nicht, welche Technologie die richtige ist?",
    ctaText: "Das ist ein guter Ausgangspunkt. Beschreiben Sie das Problem – die technische Lösung sollte erst danach festgelegt werden.",
    ctaLabel: "Ausgangslage besprechen",
    ctaHref: "/#kontakt",
    related: [
      { label: "Strategische Digitalisierung", href: "/strategische-digitalisierung" },
      { label: "Pakete & Betreuung", href: "/pakete" },
      { label: "Referenzen", href: "/referenzen" },
    ],
  },
  "it-risiken": {
    slug: "it-risiken",
    eyebrow: "IT-Risiken & Betriebssicherheit",
    title: "Die kritischsten IT-Risiken sind oft die, die im Alltag unsichtbar bleiben.",
    description: "IT-Risiken für Unternehmen erkennen: Backups, Wiederherstellung, Berechtigungen, E-Mail, Endgeräte, Prozesse und Website-Betrieb.",
    summary: "IT-Risiken entstehen nicht nur durch Angriffe. Häufiger fehlen getestete Wiederherstellungen, klare Berechtigungen, dokumentierte Zuständigkeiten oder ein verlässlicher Ablauf für Änderungen. Entscheidend ist, Risiken sichtbar und Verantwortlichkeiten überprüfbar zu machen.",
    sections: [
      {
        title: "Typische Risikofelder",
        items: [
          { title: "Backup & Wiederherstellung", text: "Ein laufender Backupjob beweist noch nicht, dass sich Daten oder Systeme im Ernstfall rechtzeitig wiederherstellen lassen." },
          { title: "Benutzer & Berechtigungen", text: "Historisch gewachsene Rechte, alte Konten oder gemeinsam genutzte Zugänge können unnötige Risiken erzeugen." },
          { title: "Microsoft 365 & E-Mail", text: "MFA, Administrationskonten, Weiterleitungen, Archivierung und Offboarding benötigen klare Regeln und regelmäßige Kontrolle." },
          { title: "Endgeräte", text: "Updates, Verschlüsselung, zentrale Verwaltung und der Umgang mit verlorenen Geräten sollten nicht vom einzelnen Mitarbeiter abhängen." },
          { title: "Server & Anwendungen", text: "Updates, Monitoring, Backup und Abhängigkeiten müssen dokumentiert sein, damit Störungen nicht erst im Ausfall verstanden werden." },
          { title: "Website & öffentlicher Auftritt", text: "Veraltete Systeme, fehlende Wartung oder schwache technische Grundlagen können Sicherheit, Sichtbarkeit und Anfragen beeinträchtigen." },
        ],
      },
      {
        title: "Fragen, die jedes Unternehmen beantworten können sollte",
        items: [
          { title: "Wann wurde zuletzt ein Restore getestet?", text: "Nicht wann das letzte Backup erstellt wurde, sondern wann Daten oder ein System tatsächlich erfolgreich wiederhergestellt wurden." },
          { title: "Wer hat heute worauf Zugriff?", text: "Berechtigungen sollten nachvollziehbar sein und beim Ein- oder Austritt von Mitarbeitern zuverlässig angepasst werden." },
          { title: "Was muss zuerst wieder laufen?", text: "Kritische Systeme und akzeptable Ausfallzeiten sollten vor einem Vorfall festgelegt sein." },
          { title: "Wer übernimmt im Störungsfall?", text: "Zuständigkeiten, Zugänge und Dokumentation dürfen nicht nur im Kopf einer einzelnen Person existieren." },
        ],
      },
      {
        title: "Risiken reduzieren statt Angst verkaufen",
        items: [
          { title: "Priorisieren", text: "Nicht jedes Thema ist gleich kritisch. Wir unterscheiden zwischen unmittelbaren Risiken, betrieblichen Schwächen und langfristigen Verbesserungen." },
          { title: "Testen", text: "Wiederherstellung, Zugriffe und technische Schutzmaßnahmen sollten überprüfbar sein statt nur auf Konfigurationen zu vertrauen." },
          { title: "Dokumentieren", text: "Zugänge, Zuständigkeiten und zentrale Abläufe müssen auch dann verständlich bleiben, wenn eine Schlüsselperson ausfällt." },
        ],
      },
    ],
    ctaTitle: "Wie belastbar ist Ihre aktuelle IT wirklich?",
    ctaText: "Wir können die wichtigsten Risikofelder gemeinsam priorisieren – ohne daraus ein künstliches Großprojekt zu machen.",
    ctaLabel: "IT-Situation besprechen",
    ctaHref: "/#kontakt",
    related: [
      { label: "Cloud & App Care", href: "/leistungen/cloud-app-care" },
      { label: "Workplace Care", href: "/leistungen/workplace-care" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  "ueber-uns": {
    slug: "ueber-uns",
    eyebrow: "Über uns & Vertrauen",
    title: "Unternehmerisches Denken, technische Tiefe und klare Verantwortung.",
    description: "Über Leon Pllana IT-Solutions: strategische Digitalisierung, IT-Architektur, Software, Cloud, Security, Automatisierung und langfristige Betreuung.",
    summary: "Leon Pllana IT-Solutions verbindet strategische Digitalisierung mit technischer Umsetzung. Der Fokus liegt auf nachvollziehbaren Entscheidungen, dokumentierten Prozessen und Lösungen, die nicht nur eingeführt, sondern langfristig betrieben und weiterentwickelt werden können.",
    sections: [
      {
        title: "Wofür wir stehen",
        items: [
          { title: "Experience", text: "Erfahrung aus realen Unternehmensprozessen, Infrastrukturprojekten, digitalen Arbeitsumgebungen und Softwarelösungen." },
          { title: "Expertise", text: "Kompetenz in Prozessanalyse, IT-Strategie, Microsoft 365, Cloud, Security, Automatisierung, Schnittstellen und Softwareentwicklung." },
          { title: "Authority", text: "Klare Positionierung als strategischer Digitalisierungspartner statt als reiner Produkt- oder Lizenzverkäufer." },
          { title: "Trust", text: "Transparente Kommunikation, dokumentierte Entscheidungen und Lösungen, die zum tatsächlichen Bedarf des Unternehmens passen." },
        ],
      },
      {
        title: "Unser Grundsatz",
        items: [
          { title: "Process first. Technology second.", text: "Technologie folgt dem Prozess. Ein Tool ist kein Ziel, sondern ein Baustein für einen besseren Ablauf." },
          { title: "Innovation In Every Step.", text: "Verbesserung muss nicht immer aus einem großen Transformationsprojekt bestehen. Viele kleine, sinnvolle Schritte erzeugen langfristig die robustere Organisation." },
          { title: "Langfristig statt einmalig", text: "Betrieb, Pflege und Weiterentwicklung werden früh mitgedacht, damit aus einem Projekt keine neue technische Baustelle entsteht." },
        ],
      },
    ],
    ctaTitle: "Sie suchen keinen weiteren Tool-Verkäufer?",
    ctaText: "Dann beginnen wir mit Ihrem Geschäftsprozess, Ihrer aktuellen Situation und dem Ergebnis, das erreicht werden soll.",
    ctaLabel: "Gespräch starten",
    ctaHref: "/#kontakt",
    related: [
      { label: "Referenzen", href: "/referenzen" },
      { label: "Strategische Digitalisierung", href: "/strategische-digitalisierung" },
      { label: "FAQ", href: "/faq" },
    ],
  },
} satisfies Record<string, HubContent>;

export function getHub(key: keyof typeof hubs): HubContent {
  return hubs[key];
}

export function getHubMetadata(content: HubContent): Metadata {
  const url = `${siteUrl}/${content.slug}`;
  const title = `${content.eyebrow} | ${businessName}`;
  return {
    title: { absolute: title },
    description: content.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: content.description,
      url,
      siteName: businessName,
      locale: "de_DE",
      type: "website",
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: businessName }],
    },
    twitter: { card: "summary_large_image", title, description: content.description, images: [`${siteUrl}/og-image.png`] },
  };
}

export function getHubStructuredData(content: HubContent) {
  const url = `${siteUrl}/${content.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": content.slug === "ueber-uns" ? "AboutPage" : "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: content.title,
        description: content.description,
        inLanguage: "de",
        publisher: { "@id": organizationId },
        about: content.sections.flatMap((section) => section.items.map((item) => item.title)),
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: siteUrl },
          { "@type": "ListItem", position: 2, name: content.eyebrow, item: url },
        ],
      },
    ],
  };
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
