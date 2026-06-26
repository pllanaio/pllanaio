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
      description="Rahmeninformationen für die Zusammenarbeit. Der finale Text muss an konkrete Angebote, Verträge und Leistungsmodelle angepasst werden."
      sections={[
        {
          id: "geltungsbereich",
          title: "Geltungsbereich",
          children: <p>TODO: Geltungsbereich, Kundengruppen und Einbeziehung der Bedingungen definieren.</p>,
        },
        {
          id: "leistungen",
          title: "Leistungen und Zusammenarbeit",
          children: <p>TODO: Leistungsarten, Projektablauf, Mitwirkungspflichten und Abnahmeprozesse beschreiben.</p>,
        },
        {
          id: "verguetung",
          title: "Vergütung und Zahlungsbedingungen",
          children: <p>TODO: Vergütungsmodelle, Zahlungsfristen, Auslagen, Reisekosten und Abrechnung regeln.</p>,
        },
        {
          id: "rechte",
          title: "Nutzungsrechte und Arbeitsergebnisse",
          children: <p>TODO: Rechte an Konzepten, Dokumentationen, Quellcode, Schnittstellen und sonstigen Arbeitsergebnissen regeln.</p>,
        },
        {
          id: "kontakt",
          title: "Kontakt",
          children: <p>Rückfragen können an <a className="text-foreground underline underline-offset-4" href={`mailto:${contactEmail}`}>{contactEmail}</a> gerichtet werden.</p>,
        },
        {
          id: "hinweis",
          title: "Hinweis zur Finalisierung",
          children: (
            <p className="rounded-3xl border border-border bg-card p-6">
              Diese Seite ist ein strukturierter Platzhalter. Bitte vor Veröffentlichung durch eine qualifizierte Rechtsberatung finalisieren lassen.
            </p>
          ),
        },
      ]}
    />
  );
}
