import type { Metadata } from "next";
import { LocalizedLegalPage } from "@/components/localized-legal-page";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Leon Pllana IT-Solutions",
  description: "Datenschutzerklärung für die Website von Leon Pllana IT-Solutions.",
};

const deSections = [
  ["verantwortlicher", "Verantwortlicher", "Leon Pllana IT-Solutions\nLeon Pllana\nRothschwaiger Straße 4\n82256 Fürstenfeldbruck\nDeutschland\nTelefon: +49 172 7255810\nE-Mail: info@pllana.io\nUSt-IdNr.: DE347734739"],
  ["grundsatz", "Grundsatz der Datenverarbeitung", "Eine Nutzung dieser Website ist grundsätzlich ohne aktive Angabe personenbezogener Daten möglich. Personenbezogene Daten werden verarbeitet, wenn dies für den technischen Betrieb, die Sicherheit der Website, die Bearbeitung von Kontaktanfragen, die Durchführung vorvertraglicher oder vertraglicher Maßnahmen oder die Analyse der Website-Nutzung erforderlich ist. Diese Website wird ohne WordPress, ohne Benutzerregistrierung, ohne Kommentarfunktion und ohne Blog-Kommentare betrieben."],
  ["hosting", "Hosting bei Hetzner in Deutschland", "Diese Website wird auf Infrastruktur von Hetzner in Deutschland betrieben. Beim Aufruf der Website werden technische Zugriffsdaten verarbeitet, damit die Inhalte sicher, zuverlässig und performant ausgeliefert werden können. Zu diesen Daten können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seiten, Referrer-URL, Browsertyp, Betriebssystem, übertragene Datenmenge und technische Statusinformationen gehören."],
  ["kontakt", "Kontaktaufnahme", "Wenn Sie per E-Mail Kontakt aufnehmen, werden die von Ihnen übermittelten Angaben zur Bearbeitung Ihrer Anfrage verarbeitet. Dazu gehören insbesondere Name, E-Mail-Adresse, Telefonnummer, Inhalt der Nachricht sowie weitere freiwillig übermittelte Informationen."],
  ["cookies", "Cookies, LocalStorage und Einwilligung", "Diese Website kann Cookies, LocalStorage oder vergleichbare Technologien einsetzen. Technisch erforderliche Speicherungen dienen dem sicheren und funktionsfähigen Betrieb der Website. Analyse- und Marketingtechnologien werden nur eingesetzt, soweit hierfür eine wirksame Einwilligung vorliegt."],
  ["gtm", "Google Tag Manager", "Diese Website kann Google Tag Manager nutzen. Anbieter ist Google Ireland Limited. Der Google Tag Manager dient dazu, Website-Tags zentral zu verwalten und kontrolliert auszuspielen. Er kann andere Dienste auslösen, insbesondere Google Analytics, sofern eine entsprechende Einwilligung vorliegt."],
  ["analytics", "Google Analytics 4", "Diese Website kann Google Analytics 4 nutzen, einen Webanalysedienst der Google Ireland Limited. Google Analytics hilft dabei zu verstehen, wie Besucher die Website nutzen. Dabei können Seitenaufrufe, Interaktionen, Geräte- und Browserinformationen, ungefähre Standortinformationen und Ereignisse verarbeitet werden. Die Verarbeitung erfolgt nur auf Grundlage Ihrer Einwilligung."],
  ["social", "Instagram, LinkedIn und WhatsApp", "Auf dieser Website befinden sich Links zu Instagram, LinkedIn und WhatsApp. Beim bloßen Besuch dieser Website werden keine Inhalte dieser Anbieter eingebettet und keine Daten an diese Anbieter übertragen. Erst wenn Sie einen solchen Link aktiv anklicken, verlassen Sie diese Website. Dann gelten die Datenschutzbestimmungen des jeweiligen Anbieters."],
  ["rechtsgrundlagen", "Rechtsgrundlagen", "Die Verarbeitung technischer Zugriffsdaten erfolgt auf Grundlage berechtigter Interessen an einem sicheren, stabilen und funktionsfähigen Betrieb der Website. Die Verarbeitung im Rahmen der Kontaktaufnahme erfolgt zur Bearbeitung Ihrer Anfrage und gegebenenfalls zur Durchführung vorvertraglicher oder vertraglicher Maßnahmen. Analyse- und Trackingdienste werden nur auf Grundlage einer vorherigen Einwilligung eingesetzt."],
  ["speicherdauer", "Speicherdauer", "Personenbezogene Daten werden nur so lange gespeichert, wie dies für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Kontaktanfragen werden gelöscht, wenn sie abschließend bearbeitet wurden und keine gesetzlichen oder geschäftlichen Gründe für eine weitere Speicherung bestehen."],
  ["rechte", "Rechte betroffener Personen", "Sie haben im Rahmen der gesetzlichen Voraussetzungen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch gegen bestimmte Verarbeitungen sowie Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft. Außerdem haben Sie das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren."],
  ["sicherheit", "Sicherheit", "Diese Website wird über eine verschlüsselte Verbindung bereitgestellt. Eine verschlüsselte Übertragung erkennen Sie in der Regel an https:// in der Adresszeile Ihres Browsers. Zusätzlich werden angemessene technische und organisatorische Maßnahmen getroffen, um die Website und verarbeitete Daten zu schützen."],
  ["aktualisierung", "Aktualisierung dieser Datenschutzerklärung", "Diese Datenschutzerklärung kann angepasst werden, wenn sich technische, rechtliche oder organisatorische Rahmenbedingungen ändern. Maßgeblich ist die jeweils auf dieser Website veröffentlichte Fassung."],
];

const enSections = [
  ["controller", "Controller", "Leon Pllana IT-Solutions\nLeon Pllana\nRothschwaiger Strasse 4\n82256 Fuerstenfeldbruck\nGermany\nPhone: +49 172 7255810\nEmail: info@pllana.io\nVAT ID: DE347734739"],
  ["principle", "Principle of data processing", "This website can generally be used without actively providing personal data. Personal data is processed where necessary for technical operation, website security, handling enquiries, pre-contractual or contractual measures or analysis of website usage. This website is operated without WordPress, user registration, comment functionality or blog comments."],
  ["hosting", "Hosting by Hetzner in Germany", "This website is hosted on Hetzner infrastructure in Germany. When the website is accessed, technical access data is processed to deliver content securely, reliably and performantly. This may include IP address, date and time of access, pages and files accessed, referrer URL, browser type, operating system, transferred data volume and technical status information."],
  ["contact", "Contact", "If you contact us by email, the information you provide is processed to handle your enquiry. This may include name, email address, phone number, message content and any further information voluntarily provided."],
  ["cookies", "Cookies, local storage and consent", "This website may use cookies, local storage or similar technologies. Technically required storage supports secure and functional website operation. Analytics and marketing technologies are used only where valid consent has been given."],
  ["gtm", "Google Tag Manager", "This website may use Google Tag Manager, provided by Google Ireland Limited. Google Tag Manager is used to manage and control website tags. It may trigger other services, in particular Google Analytics, where the relevant consent exists."],
  ["analytics", "Google Analytics 4", "This website may use Google Analytics 4, a web analytics service by Google Ireland Limited. Google Analytics helps understand how visitors use the website. Page views, interactions, device and browser information, approximate location information and events may be processed. Processing takes place only on the basis of your consent."],
  ["social", "Instagram, LinkedIn and WhatsApp", "This website contains links to Instagram, LinkedIn and WhatsApp. Merely visiting this website does not embed content from those providers or transfer data to them. Only when you actively click such a link do you leave this website, and the privacy terms of the respective provider apply."],
  ["legal-basis", "Legal bases", "Technical access data is processed on the basis of legitimate interests in secure, stable and functional website operation. Contact data is processed to handle your enquiry and, where applicable, pre-contractual or contractual measures. Analytics and tracking services are used only on the basis of prior consent."],
  ["retention", "Retention period", "Personal data is stored only as long as necessary for the respective purpose or as required by statutory retention duties. Contact enquiries are deleted once finally processed unless legal or business reasons require further retention."],
  ["rights", "Rights of data subjects", "Subject to statutory requirements, you have rights of access, rectification, erasure, restriction of processing, data portability, objection to certain processing and withdrawal of consent with future effect. You also have the right to lodge a complaint with a competent data protection authority."],
  ["security", "Security", "This website is provided through an encrypted connection. You can usually recognise encrypted transmission by https:// in your browser address bar. Appropriate technical and organisational measures are also taken to protect the website and processed data."],
  ["updates", "Updates to this privacy policy", "This privacy policy may be adapted if technical, legal or organisational circumstances change. The version published on this website applies."],
];

const sqSections = [
  ["controller", "Përgjegjësi", "Leon Pllana IT-Solutions\nLeon Pllana\nRothschwaiger Strasse 4\n82256 Fuerstenfeldbruck\nGjermani\nTelefon: +49 172 7255810\nEmail: info@pllana.io\nNumri i TVSH-së: DE347734739"],
  ["principle", "Parimi i përpunimit të të dhënave", "Kjo faqe zakonisht mund të përdoret pa dhënë aktivisht të dhëna personale. Të dhënat personale përpunohen kur kjo është e nevojshme për funksionimin teknik, sigurinë e faqes, trajtimin e kërkesave, masat para-kontraktuale ose kontraktuale ose analizën e përdorimit të faqes. Kjo faqe operohet pa WordPress, regjistrim përdoruesish, funksion komentesh ose komente blogu."],
  ["hosting", "Hosting nga Hetzner në Gjermani", "Kjo faqe hostohet në infrastrukturën e Hetzner në Gjermani. Gjatë hapjes së faqes përpunohen të dhëna teknike të qasjes për të ofruar përmbajtjen në mënyrë të sigurt, të besueshme dhe performante. Këto mund të përfshijnë adresën IP, datën dhe orën e qasjes, faqet e hapura, URL-në referuese, llojin e shfletuesit, sistemin operativ, sasinë e të dhënave dhe informacionet teknike të statusit."],
  ["contact", "Kontaktimi", "Nëse na kontaktoni me email, informacionet që dërgoni përpunohen për të trajtuar kërkesën tuaj. Këto mund të përfshijnë emrin, adresën email, numrin e telefonit, përmbajtjen e mesazhit dhe informacione të tjera të dhëna vullnetarisht."],
  ["cookies", "Cookies, ruajtje lokale dhe pëlqim", "Kjo faqe mund të përdorë cookies, local storage ose teknologji të ngjashme. Ruajtjet teknikisht të nevojshme shërbejnë për funksionimin e sigurt dhe korrekt të faqes. Teknologjitë analitike dhe marketing përdoren vetëm kur ekziston pëlqim i vlefshëm."],
  ["gtm", "Google Tag Manager", "Kjo faqe mund të përdorë Google Tag Manager nga Google Ireland Limited. Google Tag Manager përdoret për menaxhimin dhe kontrollin e etiketave të faqes. Ai mund të aktivizojë shërbime të tjera, veçanërisht Google Analytics, nëse ekziston pëlqimi përkatës."],
  ["analytics", "Google Analytics 4", "Kjo faqe mund të përdorë Google Analytics 4, një shërbim analitik nga Google Ireland Limited. Google Analytics ndihmon të kuptohet si përdoret faqja. Mund të përpunohen shikimet e faqeve, ndërveprimet, informacionet e pajisjes dhe shfletuesit, vendndodhja e përafërt dhe eventet. Përpunimi bëhet vetëm në bazë të pëlqimit tuaj."],
  ["social", "Instagram, LinkedIn dhe WhatsApp", "Kjo faqe përmban lidhje drejt Instagram, LinkedIn dhe WhatsApp. Vetëm vizita e faqes nuk ngarkon përmbajtje nga këta ofrues dhe nuk transmeton të dhëna tek ata. Vetëm kur klikoni aktivisht një lidhje, largoheni nga kjo faqe dhe vlejnë politikat e privatësisë së ofruesit përkatës."],
  ["legal-basis", "Bazat ligjore", "Të dhënat teknike të qasjes përpunohen mbi bazën e interesit legjitim për funksionim të sigurt, stabil dhe funksional të faqes. Të dhënat e kontaktit përpunohen për të trajtuar kërkesën tuaj dhe, nëse zbatohet, për masa para-kontraktuale ose kontraktuale. Shërbimet analitike dhe tracking përdoren vetëm me pëlqim paraprak."],
  ["retention", "Kohëzgjatja e ruajtjes", "Të dhënat personale ruhen vetëm për aq kohë sa është e nevojshme për qëllimin përkatës ose sa kërkohet nga detyrimet ligjore. Kërkesat e kontaktit fshihen pasi të jenë trajtuar plotësisht, përveç rasteve kur arsye ligjore ose biznesore kërkojnë ruajtje të mëtejshme."],
  ["rights", "Të drejtat e personave të prekur", "Sipas kushteve ligjore, keni të drejtë për informacion, korrigjim, fshirje, kufizim të përpunimit, transferim të të dhënave, kundërshtim ndaj përpunimeve të caktuara dhe tërheqje të pëlqimit me efekt për të ardhmen. Keni gjithashtu të drejtë të ankoheni pranë autoritetit kompetent për mbrojtjen e të dhënave."],
  ["security", "Siguria", "Kjo faqe ofrohet përmes një lidhjeje të enkriptuar. Zakonisht e njihni transmetimin e enkriptuar nga https:// në adresën e shfletuesit. Janë marrë gjithashtu masa teknike dhe organizative të përshtatshme për të mbrojtur faqen dhe të dhënat e përpunuara."],
  ["updates", "Përditësime të kësaj politike privatësie", "Kjo politikë privatësie mund të përshtatet nëse ndryshojnë kushtet teknike, ligjore ose organizative. Vlen versioni i publikuar në këtë faqe."],
];

function toSections(items: string[][]) {
  return items.map(([id, title, paragraph]) => ({ id, title, paragraphs: [paragraph] }));
}

const content = {
  de: {
    title: "Datenschutzerklärung",
    description: "Diese Datenschutzerklärung informiert darüber, welche personenbezogenen Daten beim Besuch dieser Website, bei der Kontaktaufnahme und bei der Nutzung von Analyse- und Tag-Management-Diensten verarbeitet werden.",
    sections: toSections(deSections),
  },
  en: {
    title: "Privacy Policy",
    description: "This privacy policy explains which personal data is processed when visiting this website, contacting us and using analytics or tag management services.",
    sections: toSections(enSections),
  },
  sq: {
    title: "Politika e Privatësisë",
    description: "Kjo politikë privatësie shpjegon cilat të dhëna personale përpunohen gjatë vizitës në këtë faqe, gjatë kontaktimit dhe gjatë përdorimit të shërbimeve analitike ose të menaxhimit të etiketave.",
    sections: toSections(sqSections),
  },
};

export default function DatenschutzPage() {
  return <LocalizedLegalPage content={content} />;
}
