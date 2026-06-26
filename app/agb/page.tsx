import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { contactEmail } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "AGB | Leon Pllana IT-Solutions",
  description: "Allgemeine Geschäftsbedingungen von Leon Pllana IT-Solutions.",
};

export default function AGBPage() {
  return (
    <LegalPage
      title="Allgemeine Geschäftsbedingungen"
      description="Bedingungen für die Zusammenarbeit mit Leon Pllana IT-Solutions im Bereich Digitalisierung, IT-Beratung, Softwareentwicklung, Infrastruktur und technische Unternehmensberatung."
      sections={[
        {
          id: "geltungsbereich",
          title: "Geltungsbereich",
          children: (
            <p>
              Diese Allgemeinen Geschäftsbedingungen gelten für Leistungen von Leon Pllana IT-Solutions gegenüber Unternehmen, Selbstständigen, Freiberuflern und sonstigen geschäftlichen Auftraggebern. Abweichende Bedingungen des Auftraggebers gelten nur, wenn sie ausdrücklich schriftlich bestätigt wurden. Individuelle Vereinbarungen, Angebote oder Projektverträge haben Vorrang vor diesen Bedingungen.
            </p>
          ),
        },
        {
          id: "leistungen",
          title: "Leistungen",
          children: (
            <p>
              Leon Pllana IT-Solutions erbringt Leistungen in den Bereichen Digitalisierungsberatung, IT-Strategie, Prozessanalyse, Automatisierung, Softwareentwicklung, API-Integration, Cloud, Microsoft 365, IT-Infrastruktur, Cyber Security, Backup, Monitoring, KI und technische Unternehmensberatung. Der konkrete Leistungsumfang ergibt sich aus dem jeweiligen Angebot, Projektauftrag oder einer sonstigen schriftlichen Vereinbarung.
            </p>
          ),
        },
        {
          id: "vertragsschluss",
          title: "Vertragsschluss und Angebote",
          children: (
            <p>
              Angebote sind freibleibend, sofern sie nicht ausdrücklich als verbindlich bezeichnet werden. Ein Vertrag kommt zustande, wenn ein Angebot angenommen, ein Auftrag schriftlich bestätigt oder mit der Leistungserbringung im gegenseitigen Einvernehmen begonnen wird. Änderungen des Leistungsumfangs bedürfen einer Abstimmung und können Auswirkungen auf Zeitplan, Aufwand und Vergütung haben.
            </p>
          ),
        },
        {
          id: "mitwirkung",
          title: "Mitwirkungspflichten des Auftraggebers",
          children: (
            <p>
              Der Auftraggeber stellt alle für die Leistung erforderlichen Informationen, Zugänge, Ansprechpartner, Entscheidungen und Unterlagen rechtzeitig bereit. Verzögerungen, die durch fehlende Mitwirkung, unvollständige Informationen oder verspätete Entscheidungen entstehen, verlängern vereinbarte Zeitpläne angemessen. Der Auftraggeber bleibt für fachliche Entscheidungen, interne Freigaben und organisatorische Umsetzung in seinem Unternehmen verantwortlich.
            </p>
          ),
        },
        {
          id: "projektablauf",
          title: "Projektablauf und Termine",
          children: (
            <p>
              Termine und Zeitpläne sind nur verbindlich, wenn sie ausdrücklich als verbindlich vereinbart wurden. IT- und Digitalisierungsprojekte hängen regelmäßig von technischen, organisatorischen und externen Faktoren ab. Leon Pllana IT-Solutions informiert über erkennbare Verzögerungen und stimmt notwendige Anpassungen mit dem Auftraggeber ab.
            </p>
          ),
        },
        {
          id: "verguetung",
          title: "Vergütung und Zahlungsbedingungen",
          children: (
            <p>
              Die Vergütung richtet sich nach dem jeweiligen Angebot oder der individuellen Vereinbarung. Leistungen können nach Aufwand, pauschal, in Projektphasen oder im Rahmen laufender Betreuung abgerechnet werden. Soweit nichts anderes vereinbart ist, sind Rechnungen ohne Abzug innerhalb der angegebenen Zahlungsfrist fällig. Zusätzlich entstehende Aufwände, die nicht vom vereinbarten Leistungsumfang umfasst sind, werden nach vorheriger Abstimmung gesondert berechnet.
            </p>
          ),
        },
        {
          id: "abnahme",
          title: "Abnahme und Freigabe",
          children: (
            <p>
              Soweit eine Abnahme erforderlich ist, prüft der Auftraggeber die Leistung innerhalb angemessener Frist. Wesentliche Mängel sind nachvollziehbar zu beschreiben. Erfolgt innerhalb angemessener Frist keine Rückmeldung und wird die Leistung produktiv genutzt, gilt sie als freigegeben, soweit gesetzlich zulässig und nichts anderes vereinbart wurde.
            </p>
          ),
        },
        {
          id: "nutzungsrechte",
          title: "Nutzungsrechte und Arbeitsergebnisse",
          children: (
            <p>
              Arbeitsergebnisse wie Konzepte, Dokumentationen, Quellcode, Schnittstellen, Automatisierungen oder sonstige technische Lösungen dürfen vom Auftraggeber im vereinbarten Umfang genutzt werden. Weitergehende Nutzungsrechte, Übertragungen oder Bearbeitungsrechte ergeben sich aus der jeweiligen Vereinbarung. Vorbestehende Methoden, Templates, Know-how, Frameworks und allgemeine Lösungsansätze von Leon Pllana IT-Solutions verbleiben bei Leon Pllana IT-Solutions, soweit nichts anderes vereinbart ist.
            </p>
          ),
        },
        {
          id: "drittanbieter",
          title: "Drittanbieter, Lizenzen und externe Dienste",
          children: (
            <p>
              Soweit Leistungen Produkte, Plattformen, Lizenzen oder Dienste Dritter einbeziehen, gelten ergänzend deren Bedingungen. Dazu können beispielsweise Cloud-Anbieter, Microsoft-Dienste, Hosting-Anbieter, Softwaretools, KI-Dienste oder Sicherheitslösungen gehören. Der Auftraggeber ist für die Einhaltung der jeweiligen Lizenz- und Nutzungsbedingungen verantwortlich, sofern nichts anderes vereinbart ist.
            </p>
          ),
        },
        {
          id: "haftung",
          title: "Haftung",
          children: (
            <p>
              Leon Pllana IT-Solutions haftet nach den gesetzlichen Vorschriften bei Vorsatz, grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit. Bei einfacher Fahrlässigkeit haftet Leon Pllana IT-Solutions nur bei Verletzung wesentlicher Vertragspflichten und beschränkt auf den typischerweise vorhersehbaren Schaden. Eine weitergehende Haftung ist ausgeschlossen, soweit gesetzlich zulässig.
            </p>
          ),
        },
        {
          id: "vertraulichkeit",
          title: "Vertraulichkeit",
          children: (
            <p>
              Beide Parteien behandeln vertrauliche Informationen, Geschäftsgeheimnisse, technische Informationen, Zugangsdaten, Kundendaten und interne Unterlagen vertraulich. Diese Pflicht gilt auch nach Beendigung der Zusammenarbeit fort. Gesetzliche Offenlegungspflichten bleiben unberührt.
            </p>
          ),
        },
        {
          id: "datenschutz",
          title: "Datenschutz und Sicherheit",
          children: (
            <p>
              Beide Parteien beachten die jeweils anwendbaren Datenschutzvorschriften. Soweit Leon Pllana IT-Solutions im Auftrag personenbezogene Daten verarbeitet, wird bei Bedarf eine gesonderte Vereinbarung zur Auftragsverarbeitung geschlossen. Der Auftraggeber bleibt für die rechtliche Zulässigkeit der durch ihn bereitgestellten Daten und Verarbeitungen verantwortlich.
            </p>
          ),
        },
        {
          id: "referenzen",
          title: "Referenzen",
          children: (
            <p>
              Leon Pllana IT-Solutions darf den Auftraggeber nur mit vorheriger Zustimmung als Referenz nennen. Inhalte von Case Studies, Logos, Kennzahlen oder Projektdetails werden nur nach vorheriger Freigabe veröffentlicht.
            </p>
          ),
        },
        {
          id: "schlussbestimmungen",
          title: "Schlussbestimmungen",
          children: (
            <p>
              Es gilt deutsches Recht. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz von Leon Pllana IT-Solutions. Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Anstelle der unwirksamen Bestimmung gilt eine Regelung als vereinbart, die dem wirtschaftlichen Zweck möglichst nahekommt.
            </p>
          ),
        },
        {
          id: "kontakt",
          title: "Kontakt",
          children: (
            <p>
              Rückfragen zu diesen Allgemeinen Geschäftsbedingungen können an <a className="text-foreground underline underline-offset-4" href={`mailto:${contactEmail}`}>{contactEmail}</a> gerichtet werden.
            </p>
          ),
        },
        {
          id: "hinweis",
          title: "Hinweis zur rechtlichen Prüfung",
          children: (
            <p className="rounded-3xl border border-border bg-card p-6">
              Diese AGB wurden inhaltlich an das Geschäftsmodell von Leon Pllana IT-Solutions angepasst. Bitte vor Veröffentlichung final rechtlich prüfen lassen, insbesondere Haftung, Nutzungsrechte, Datenschutz, Auftragsverarbeitung und Zahlungsbedingungen.
            </p>
          ),
        },
      ]}
    />
  );
}
