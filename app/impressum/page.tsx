import type { Metadata } from "next";
import { LocalizedLegalPage } from "@/components/localized-legal-page";

export const metadata: Metadata = {
  title: "Impressum | Leon Pllana IT-Solutions",
  description: "Impressum von Leon Pllana IT-Solutions.",
};

const content = {
  de: {
    title: "Impressum",
    description: "Angaben zum Anbieter dieser Website und zentrale Kontaktinformationen.",
    sections: [
      { id: "anbieter", title: "Anbieter", paragraphs: ["Leon Pllana IT-Solutions\nLeon Pllana\nRothschwaiger Straße 4\n82256 Fürstenfeldbruck\nDeutschland"] },
      { id: "kontakt", title: "Kontakt", paragraphs: ["E-Mail: info@pllana.io\nTelefon: +49 172 7255810"] },
      { id: "steuer", title: "Steuerliche Angaben", paragraphs: ["Umsatzsteuer-ID: DE347734739"] },
      { id: "inhalt", title: "Verantwortlich für Inhalte", paragraphs: ["Leon Pllana, Anschrift wie oben."] },
    ],
  },
  en: {
    title: "Imprint",
    description: "Provider information for this website and key contact details.",
    sections: [
      { id: "anbieter", title: "Provider", paragraphs: ["Leon Pllana IT-Solutions\nLeon Pllana\nRothschwaiger Strasse 4\n82256 Fuerstenfeldbruck\nGermany"] },
      { id: "kontakt", title: "Contact", paragraphs: ["Email: info@pllana.io\nPhone: +49 172 7255810"] },
      { id: "steuer", title: "Tax information", paragraphs: ["VAT ID: DE347734739"] },
      { id: "inhalt", title: "Responsible for content", paragraphs: ["Leon Pllana, address as stated above."] },
    ],
  },
  sq: {
    title: "Impressum",
    description: "Të dhënat e ofruesit të kësaj faqeje dhe informacionet kryesore të kontaktit.",
    sections: [
      { id: "anbieter", title: "Ofruesi", paragraphs: ["Leon Pllana IT-Solutions\nLeon Pllana\nRothschwaiger Strasse 4\n82256 Fuerstenfeldbruck\nGjermani"] },
      { id: "kontakt", title: "Kontakt", paragraphs: ["Email: info@pllana.io\nTelefon: +49 172 7255810"] },
      { id: "steuer", title: "Të dhëna tatimore", paragraphs: ["Numri i TVSH-së: DE347734739"] },
      { id: "inhalt", title: "Përgjegjës për përmbajtjen", paragraphs: ["Leon Pllana, adresa si më sipër."] },
    ],
  },
};

export default function ImpressumPage() {
  return <LocalizedLegalPage content={content} />;
}
