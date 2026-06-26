import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { contactEmail } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Impressum | Leon Pllana IT-Solutions",
  description: "Impressum von Leon Pllana IT-Solutions.",
};

export default function ImpressumPage() {
  return (
    <LegalPage
      title="Impressum"
      description="Angaben zum Anbieter dieser Website und zentrale Kontaktinformationen."
      sections={[
        {
          id: "anbieter",
          title: "Anbieter",
          children: (
            <p>
              Leon Pllana IT-Solutions<br />
              Leon Pllana<br />
              TODO: Straße und Hausnummer<br />
              TODO: PLZ und Ort<br />
              Deutschland
            </p>
          ),
        },
        {
          id: "kontakt",
          title: "Kontakt",
          children: (
            <p>
              E-Mail: <a className="text-foreground underline underline-offset-4" href={`mailto:${contactEmail}`}>{contactEmail}</a><br />
              Telefon: TODO: Telefonnummer
            </p>
          ),
        },
        {
          id: "steuer",
          title: "Steuerliche Angaben",
          children: <p>Umsatzsteuer-ID: TODO</p>,
        },
        {
          id: "inhalt",
          title: "Verantwortlich für Inhalte",
          children: <p>Leon Pllana, Anschrift wie oben.</p>,
        },
        {
          id: "hinweis",
          title: "Hinweis zur Finalisierung",
          children: (
            <p className="rounded-3xl border border-border bg-card p-6">
              Diese Seite enthält Platzhalter. Bitte vor Veröffentlichung die korrekten Unternehmensdaten ergänzen und rechtlich prüfen lassen.
            </p>
          ),
        },
      ]}
    />
  );
}
