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
              Rothschwaiger Straße 4<br />
              82256 Fürstenfeldbruck<br />
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
              Telefon: +49 172 7255810
            </p>
          ),
        },
        {
          id: "steuer",
          title: "Steuerliche Angaben",
          children: <p>Umsatzsteuer-ID: DE347734739</p>,
        },
        {
          id: "inhalt",
          title: "Verantwortlich für Inhalte",
          children: <p>Leon Pllana, Anschrift wie oben.</p>,
        },
      ]}
    />
  );
}
