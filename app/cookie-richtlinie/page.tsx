import { LegalPage } from "@/components/legal-page";

export const metadata = {
  title: "Cookie-Richtlinie",
  description: "Informationen zum Einsatz von Cookies, Google Analytics und Einwilligungen auf pllana.io.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie-Richtlinie"
      description="Diese Cookie-Richtlinie erklärt, welche Cookies und vergleichbaren Technologien auf dieser Website eingesetzt werden und wie Sie Ihre Einwilligung verwalten können."
      sections={[
        {
          id: "grundlagen",
          title: "Was sind Cookies?",
          children: (
            <>
              <p>Cookies sind kleine Textdateien, die im Browser gespeichert werden. Sie können erforderlich sein, damit eine Website technisch funktioniert, oder optional eingesetzt werden, um Nutzung statistisch auszuwerten.</p>
              <p>Vergleichbare Technologien sind zum Beispiel Local Storage, Session Storage oder Skripte externer Dienste.</p>
            </>
          ),
        },
        {
          id: "notwendig",
          title: "Technisch notwendige Cookies und Speicherungen",
          children: (
            <>
              <p>Technisch notwendige Speicherungen dienen dem sicheren und stabilen Betrieb der Website. Dazu gehören insbesondere die Speicherung Ihrer Cookie-Auswahl, Spracheinstellungen und Darstellungspräferenzen wie Hell-/Dunkelmodus.</p>
              <p>Diese Funktionen sind erforderlich, um die Website korrekt bereitzustellen. Sie werden nicht zu Marketingzwecken verwendet.</p>
            </>
          ),
        },
        {
          id: "analytics",
          title: "Analyse-Cookies und Google Analytics",
          children: (
            <>
              <p>Mit Ihrer Einwilligung wird Google Analytics eingesetzt, um zu verstehen, wie Besucher diese Website nutzen. Dabei können Informationen wie Seitenaufrufe, Klicks auf Kontaktmöglichkeiten, verwendete Geräte, ungefähre Standortdaten und technische Nutzungsdaten verarbeitet werden.</p>
              <p>Google Analytics wird erst aktiviert, nachdem Sie Analyse-Cookies akzeptiert haben. Ohne Einwilligung werden keine Google-Analytics-Skripte geladen.</p>
              <p>Die IP-Anonymisierung ist aktiviert. Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO.</p>
            </>
          ),
        },
        {
          id: "tracking",
          title: "Erfasste Interaktionen",
          children: (
            <>
              <p>Nach Einwilligung können Interaktionen wie Klicks auf „Gespräch anfragen“, WhatsApp, LinkedIn, Instagram, interne Sprungmarken und externe Partnerlinks erfasst werden.</p>
              <p>Diese Daten helfen dabei, die Website verständlicher, effizienter und relevanter zu gestalten.</p>
            </>
          ),
        },
        {
          id: "widerruf",
          title: "Einwilligung ändern oder widerrufen",
          children: (
            <>
              <p>Sie können Ihre Cookie-Auswahl jederzeit über den Link „Cookie-Einstellungen“ im Footer der Website erneut öffnen und ändern.</p>
              <p>Wenn Sie Ihre Browserdaten löschen, wird auch Ihre gespeicherte Cookie-Auswahl gelöscht und das Banner erneut angezeigt.</p>
            </>
          ),
        },
        {
          id: "kontakt",
          title: "Kontakt",
          children: (
            <p>Bei Fragen zur Cookie-Nutzung oder zum Datenschutz erreichen Sie Leon Pllana IT-Solutions unter info@pllana.io.</p>
          ),
        },
      ]}
    />
  );
}
