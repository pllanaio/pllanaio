import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { contactEmail, socialLinks } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Leon Pllana IT-Solutions",
  description: "Datenschutzerklärung für die Website von Leon Pllana IT-Solutions.",
};

export default function DatenschutzPage() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      description="Diese Erklärung beschreibt, welche Daten beim Besuch dieser Website und bei der Kontaktaufnahme verarbeitet werden. Die Website basiert auf Next.js und wird ohne WordPress betrieben."
      sections={[
        {
          id: "verantwortlicher",
          title: "Verantwortlicher",
          children: (
            <p>
              Leon Pllana IT-Solutions<br />
              Leon Pllana<br />
              TODO: Straße und Hausnummer<br />
              TODO: PLZ und Ort<br />
              E-Mail: <a className="text-foreground underline underline-offset-4" href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
          ),
        },
        {
          id: "grundsatz",
          title: "Grundsatz",
          children: (
            <p>
              Diese Website nutzt keine WordPress-Installation und keine WordPress-Plugins. Daten werden verarbeitet, soweit dies für Betrieb, Sicherheit, Kontaktaufnahme oder Webanalyse erforderlich ist.
            </p>
          ),
        },
        {
          id: "hosting",
          title: "Hosting bei Hetzner in Deutschland",
          children: (
            <>
              <p>
                Diese Website wird bei Hetzner in Deutschland betrieben. Beim Aufruf der Website können technische Zugriffsdaten verarbeitet werden, damit die Website sicher und zuverlässig ausgeliefert werden kann.
              </p>
              <p>
                Dazu können IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seiten, Browserinformationen, Betriebssystem, Referrer und technische Statusinformationen gehören.
              </p>
              <p>TODO: genaue Hetzner-Produktangaben, Log-Aufbewahrungsfristen und Vertragsdetails ergänzen.</p>
            </>
          ),
        },
        {
          id: "kontakt",
          title: "Kontaktaufnahme per E-Mail",
          children: (
            <p>
              Wenn Sie per E-Mail Kontakt aufnehmen, werden die übermittelten Angaben zur Bearbeitung Ihrer Anfrage verwendet. Dazu können Name, E-Mail-Adresse, Inhalt der Nachricht und freiwillige Zusatzangaben gehören.
            </p>
          ),
        },
        {
          id: "social",
          title: "Instagram und WhatsApp",
          children: (
            <>
              <p>
                Auf dieser Website befinden sich Links zu Instagram und WhatsApp. Beim bloßen Besuch dieser Website werden keine Inhalte dieser Anbieter eingebettet. Erst beim Anklicken verlassen Sie diese Website.
              </p>
              <p>
                Instagram: <a className="text-foreground underline underline-offset-4" href={socialLinks.instagram} target="_blank" rel="noreferrer">{socialLinks.instagram}</a><br />
                WhatsApp: <a className="text-foreground underline underline-offset-4" href={socialLinks.whatsapp} target="_blank" rel="noreferrer">{socialLinks.whatsapp}</a>
              </p>
            </>
          ),
        },
        {
          id: "gtm",
          title: "Google Tag Manager",
          children: (
            <p>
              Diese Website wird Google Tag Manager nutzen, um Tags zentral zu verwalten. Über den Google Tag Manager können weitere Dienste wie Google Analytics eingebunden werden. TODO: Container-ID und Consent-Konfiguration ergänzen.
            </p>
          ),
        },
        {
          id: "analytics",
          title: "Google Analytics",
          children: (
            <p>
              Diese Website wird Google Analytics zur Analyse der Website-Nutzung einsetzen. Google Analytics kann Informationen zu Seitenaufrufen, Geräten, Browsern, Interaktionen und ungefährer Herkunft verarbeiten. Die Aktivierung sollte erst nach Einwilligung erfolgen. TODO: Mess-ID, Consent Mode, Aufbewahrungsdauer und konkrete Konfiguration ergänzen.
            </p>
          ),
        },
        {
          id: "cookies",
          title: "Cookies und Einwilligung",
          children: (
            <p>
              Für Analysezwecke können Cookies oder vergleichbare Technologien eingesetzt werden. Nicht erforderliche Dienste werden erst nach Einwilligung aktiviert. TODO: Cookie-Banner und Link zum erneuten Öffnen der Einstellungen ergänzen.
            </p>
          ),
        },
        {
          id: "fonts",
          title: "Schriften und Gestaltung",
          children: <p>TODO: Finale Font-Einbindung prüfen und ergänzen.</p>,
        },
        {
          id: "rechte",
          title: "Ihre Rechte",
          children: (
            <p>
              Sie können im Rahmen der gesetzlichen Voraussetzungen Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit oder Widerspruch verlangen. Außerdem können Sie sich bei einer Datenschutzaufsichtsbehörde beschweren.
            </p>
          ),
        },
        {
          id: "sicherheit",
          title: "Sicherheit",
          children: <p>Diese Website wird über eine verschlüsselte Verbindung bereitgestellt.</p>,
        },
        {
          id: "hinweis",
          title: "Hinweis zur Finalisierung",
          children: (
            <p className="rounded-3xl border border-border bg-card p-6">
              Bitte vor Veröffentlichung Unternehmensdaten, Hetzner-Details, Google Tag Manager, Google Analytics, Cookie-Banner, Social-Links und tatsächlich eingesetzte Dienste final prüfen.
            </p>
          ),
        },
      ]}
    />
  );
}
