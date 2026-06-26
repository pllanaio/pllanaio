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
      description="Diese Erklärung beschreibt, welche Daten beim Besuch dieser Website und bei der Kontaktaufnahme verarbeitet werden. Sie ist auf die aktuelle statische Next.js-Website ohne WordPress ausgerichtet."
      sections={[
        {
          id: "verantwortlicher",
          title: "Verantwortlicher",
          children: (
            <p>
              Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:<br />
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
          title: "Grundsatz der Datenverarbeitung",
          children: (
            <p>
              Diese Website ist als statische Website auf Basis von Next.js umgesetzt. Es werden keine Benutzerkonten, Kommentarfunktionen, Newsletter-Anmeldungen oder WordPress-Plugins betrieben. Personenbezogene Daten werden nur verarbeitet, soweit dies für den Betrieb der Website, die Sicherheit der technischen Infrastruktur oder die Bearbeitung einer Kontaktanfrage erforderlich ist.
            </p>
          ),
        },
        {
          id: "hosting",
          title: "Hosting und Bereitstellung",
          children: (
            <>
              <p>
                Die Website wird über Vercel bereitgestellt. Beim Aufruf der Website werden technische Verbindungsdaten verarbeitet, damit die Inhalte sicher und zuverlässig ausgeliefert werden können.
              </p>
              <p>
                Zu diesen Daten können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene URL, Referrer-URL, Browsertyp, Betriebssystem sowie technische Statusinformationen gehören. Die Verarbeitung erfolgt zur technischen Bereitstellung, Stabilität und Sicherheit der Website.
              </p>
              <p>TODO: Vercel-Vertrag, Region, Aufbewahrungsfristen und gegebenenfalls weitere Infrastrukturangaben final prüfen und ergänzen.</p>
            </>
          ),
        },
        {
          id: "kontakt",
          title: "Kontaktaufnahme per E-Mail",
          children: (
            <p>
              Wenn Sie per E-Mail Kontakt aufnehmen, werden die von Ihnen übermittelten Angaben verarbeitet, um Ihre Anfrage zu bearbeiten und Anschlussfragen zu ermöglichen. Dazu gehören insbesondere Ihre E-Mail-Adresse, Ihr Name, der Inhalt Ihrer Nachricht und gegebenenfalls weitere freiwillig übermittelte Informationen.
            </p>
          ),
        },
        {
          id: "social",
          title: "Instagram und WhatsApp Links",
          children: (
            <>
              <p>
                Auf der Website befinden sich Links zu externen Angeboten, derzeit Instagram und WhatsApp. Beim bloßen Besuch dieser Website werden über diese Links keine Inhalte der jeweiligen Anbieter eingebettet. Erst wenn Sie einen dieser Links aktiv anklicken, verlassen Sie diese Website und es gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
              </p>
              <p>
                Instagram: <a className="text-foreground underline underline-offset-4" href={socialLinks.instagram} target="_blank" rel="noreferrer">{socialLinks.instagram}</a><br />
                WhatsApp: <a className="text-foreground underline underline-offset-4" href={socialLinks.whatsapp} target="_blank" rel="noreferrer">{socialLinks.whatsapp}</a>
              </p>
            </>
          ),
        },
        {
          id: "cookies",
          title: "Cookies und Tracking",
          children: (
            <p>
              Nach aktuellem Stand setzt diese Website keine Analyse- oder Marketing-Cookies und verwendet keine Tracking-Tools wie Google Analytics, Meta Pixel oder vergleichbare Dienste. Sollte sich dies künftig ändern, wird diese Datenschutzerklärung entsprechend angepasst.
            </p>
          ),
        },
        {
          id: "fonts",
          title: "Schriften und Gestaltung",
          children: (
            <p>
              Die Website verwendet die im Projekt eingebundenen Schriften und Styles. Soweit Schriften lokal oder über die Next.js-Font-Optimierung bereitgestellt werden, erfolgt beim Laden der Website keine separate Anfrage an externe Schriftanbieter. TODO: Finale Font-Einbindung im Projekt prüfen.
            </p>
          ),
        },
        {
          id: "rechtsgrundlagen",
          title: "Rechtsgrundlagen",
          children: (
            <p>
              Die Verarbeitung technischer Daten erfolgt auf Grundlage berechtigter Interessen an einem sicheren und funktionsfähigen Betrieb der Website. Die Verarbeitung von Daten im Rahmen einer Kontaktaufnahme erfolgt zur Bearbeitung Ihrer Anfrage und gegebenenfalls zur Vorbereitung oder Durchführung einer geschäftlichen Beziehung.
            </p>
          ),
        },
        {
          id: "rechte",
          title: "Ihre Rechte",
          children: (
            <p>
              Sie haben im Rahmen der gesetzlichen Voraussetzungen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen. Außerdem können Sie sich bei einer zuständigen Datenschutzaufsichtsbehörde beschweren.
            </p>
          ),
        },
        {
          id: "speicherung",
          title: "Speicherdauer",
          children: (
            <p>
              Personenbezogene Daten werden nur so lange gespeichert, wie dies für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Kontaktanfragen werden gelöscht, wenn sie abschließend bearbeitet wurden und keine gesetzlichen oder geschäftlichen Gründe für eine weitere Speicherung bestehen.
            </p>
          ),
        },
        {
          id: "sicherheit",
          title: "Sicherheit",
          children: (
            <p>
              Diese Website wird über eine verschlüsselte Verbindung bereitgestellt. Eine verschlüsselte Übertragung erkennen Sie in der Regel an „https://“ in der Adresszeile Ihres Browsers.
            </p>
          ),
        },
        {
          id: "hinweis",
          title: "Hinweis zur Finalisierung",
          children: (
            <p className="rounded-3xl border border-border bg-card p-6">
              Diese Datenschutzerklärung wurde für den aktuellen Stand der Website erstellt. Bitte vor Veröffentlichung Unternehmensdaten, Hostingdetails, Schrift-Einbindung, WhatsApp-Nummer, Instagram-Link und gegebenenfalls weitere eingesetzte Dienste final prüfen.
            </p>
          ),
        },
      ]}
    />
  );
}
