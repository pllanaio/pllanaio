import type { LucideIcon } from "lucide-react";
import { Code2, Layers3, Network, ShieldCheck, Sparkles, Workflow } from "lucide-react";

export const contactEmail = "info@pllana.io";

export const socialLinks = {
  instagram: "https://instagram.com/pllanaio",
  whatsapp: "https://api.whatsapp.com/send?phone=491727255810",
};

export type PartnerCompany = {
  name: string;
  logo?: string;
  url?: string;
  width?: number;
  height?: number;
  offsetY?: number;
};

export const partnerCompanies: PartnerCompany[] = [
  { name: "Segnitz Bau", logo: "/partners/segnitz-bau.png", url: "https://segnitzbau.de", width: 260, height: 150, offsetY: 0 },
  { name: "HVAC Chicago LLC", logo: "/partners/hvac-chicago.jpg", url: "https://chicago-hvac.biz", width: 300, height: 150, offsetY: 0 },
  { name: "LeCom Sh.p.k", logo: "/partners/lecom.png", url: "https://lecom-ks.com", width: 250, height: 150, offsetY: 0 },
];

export const siteNav = [
  { label: "Denkweise", href: "#denkweise" },
  { label: "Vorgehen", href: "#vorgehen" },
  { label: "Kompetenzen", href: "#kompetenzen" },
  { label: "Cases", href: "#cases" },
  { label: "FAQ", href: "#faq" },
];

export const painPoints = [
  "Prozesse sind historisch gewachsen, aber nie bewusst gestaltet.",
  "Teams arbeiten mit Tools, die nicht miteinander sprechen.",
  "Entscheidungen entstehen aus Bauchgefühl statt Transparenz.",
  "IT löst Symptome, aber nicht die Ursache im Unternehmen.",
];

export const methodologySteps = [
  { number: "01", title: "Verstehen", copy: "Wir betrachten Geschäftsmodell, Menschen, Prozesse und bestehende Systeme." },
  { number: "02", title: "Analysieren", copy: "Wir identifizieren Ineffizienzen, Risiken, Medienbrüche und Potenziale." },
  { number: "03", title: "Optimieren", copy: "Bevor Technologie eingesetzt wird, vereinfachen wir Abläufe und Entscheidungen." },
  { number: "04", title: "Digitalisieren", copy: "Wir wählen die richtige Architektur: Cloud, Microsoft 365, Software, Schnittstellen oder KI." },
  { number: "05", title: "Automatisieren", copy: "Wiederkehrende Arbeit wird reduziert, Datenflüsse werden sauber verbunden." },
  { number: "06", title: "Begleiten", copy: "Nach dem Projekt beginnt die Partnerschaft: Betrieb, Verbesserung und Skalierung." },
];

export type Capability = { icon: LucideIcon; title: string; copy: string };

export const capabilities: Capability[] = [
  { icon: Layers3, title: "Digitalisierungsberatung", copy: "Strategie, Roadmaps und Priorisierung für digitale Unternehmensentwicklung." },
  { icon: Workflow, title: "Prozessanalyse & Automatisierung", copy: "Abläufe verstehen, vereinfachen, dokumentieren und automatisieren." },
  { icon: Network, title: "IT-Infrastruktur & Cloud", copy: "Skalierbare Architekturen für sichere, moderne und effiziente Arbeitsumgebungen." },
  { icon: ShieldCheck, title: "Cyber Security & Backup", copy: "Schutz, Monitoring, Wiederherstellbarkeit und Verantwortung im Betrieb." },
  { icon: Code2, title: "Software & API-Integration", copy: "Individuelle Lösungen, Schnittstellen und Systeme, die Prozesse wirklich abbilden." },
  { icon: Sparkles, title: "KI im Unternehmen", copy: "Pragmatische KI-Anwendungen, die Arbeit erleichtern statt Komplexität erhöhen." },
];

export const caseStudies = [
  { tag: "Mittelstand", title: "Von manuellen Abläufen zu klaren digitalen Prozessen.", copy: "Analyse gewachsener Excel- und E-Mail-Prozesse, Aufbau einer zentralen Microsoft-365-Struktur, Automatisierung wiederkehrender Freigaben." },
  { tag: "Dienstleister", title: "Mehr Transparenz zwischen Vertrieb, Projekt und Abrechnung.", copy: "Entwicklung einer Integrationslogik zwischen CRM, Projektmanagement und Dokumentation, damit Informationen dort entstehen, wo sie gebraucht werden." },
  { tag: "Produktion", title: "Sicherere Infrastruktur für langfristiges Wachstum.", copy: "Bewertung der bestehenden IT-Landschaft, Einführung von Backup-, Monitoring- und Security-Prozessen mit klaren Verantwortlichkeiten." },
];

export const faqs = [
  { question: "Bieten Sie klassische IT-Dienstleistungen an?", answer: "Ja, aber nicht isoliert. Infrastruktur, Cloud, Microsoft 365, Security oder Software werden immer aus dem Unternehmenskontext heraus geplant." },
  { question: "Arbeiten Sie mit kleinen Unternehmen oder nur mit Konzernen?", answer: "Die Unternehmensgröße ist nicht entscheidend. Entscheidend ist, ob Digitalisierung echten Mehrwert schaffen kann und eine langfristige Zusammenarbeit gewünscht ist." },
  { question: "Verkaufen Sie bestimmte Produkte oder Lizenzen?", answer: "Nein. Technologie folgt dem Prozess. Empfohlen wird, was zum Unternehmen, zur Strategie und zum Zielbild passt." },
  { question: "Wie beginnt eine Zusammenarbeit?", answer: "Mit einem Gespräch über Ziele, Prozesse, Herausforderungen und Potenziale. Erst danach entsteht eine sinnvolle technologische Empfehlung." },
];
