import type { Metadata } from "next";
import { LocalizedLegalPage } from "@/components/localized-legal-page";

export const metadata: Metadata = {
  title: "AGB | Leon Pllana IT-Solutions",
  description: "Allgemeine Geschäftsbedingungen von Leon Pllana IT-Solutions.",
};

const deSections = [
  ["geltungsbereich", "Geltungsbereich", "Diese Allgemeinen Geschäftsbedingungen gelten für Leistungen von Leon Pllana IT-Solutions gegenüber Unternehmen, Selbstständigen, Freiberuflern und sonstigen geschäftlichen Auftraggebern. Abweichende Bedingungen des Auftraggebers gelten nur, wenn sie ausdrücklich schriftlich bestätigt wurden. Individuelle Vereinbarungen, Angebote oder Projektverträge haben Vorrang vor diesen Bedingungen."],
  ["leistungen", "Leistungen", "Leon Pllana IT-Solutions erbringt Leistungen in den Bereichen Digitalisierungsberatung, IT-Strategie, Prozessanalyse, Automatisierung, Softwareentwicklung, API-Integration, Cloud, Microsoft 365, IT-Infrastruktur, Cyber Security, Backup, Monitoring, KI und technische Unternehmensberatung. Der konkrete Leistungsumfang ergibt sich aus dem jeweiligen Angebot, Projektauftrag oder einer sonstigen schriftlichen Vereinbarung."],
  ["vertragsschluss", "Vertragsschluss und Angebote", "Angebote sind freibleibend, sofern sie nicht ausdrücklich als verbindlich bezeichnet werden. Ein Vertrag kommt zustande, wenn ein Angebot angenommen, ein Auftrag schriftlich bestätigt oder mit der Leistungserbringung im gegenseitigen Einvernehmen begonnen wird. Änderungen des Leistungsumfangs bedürfen einer Abstimmung und können Auswirkungen auf Zeitplan, Aufwand und Vergütung haben."],
  ["mitwirkung", "Mitwirkungspflichten des Auftraggebers", "Der Auftraggeber stellt alle für die Leistung erforderlichen Informationen, Zugänge, Ansprechpartner, Entscheidungen und Unterlagen rechtzeitig bereit. Verzögerungen durch fehlende Mitwirkung, unvollständige Informationen oder verspätete Entscheidungen verlängern vereinbarte Zeitpläne angemessen."],
  ["verguetung", "Vergütung und Zahlungsbedingungen", "Die Vergütung richtet sich nach dem jeweiligen Angebot oder der individuellen Vereinbarung. Leistungen können nach Aufwand, pauschal, in Projektphasen oder im Rahmen laufender Betreuung abgerechnet werden. Soweit nichts anderes vereinbart ist, sind Rechnungen ohne Abzug innerhalb der angegebenen Zahlungsfrist fällig."],
  ["nutzungsrechte", "Nutzungsrechte und Arbeitsergebnisse", "Arbeitsergebnisse wie Konzepte, Dokumentationen, Quellcode, Schnittstellen, Automatisierungen oder sonstige technische Lösungen dürfen vom Auftraggeber im vereinbarten Umfang genutzt werden. Vorbestehende Methoden, Templates, Know-how und allgemeine Lösungsansätze verbleiben bei Leon Pllana IT-Solutions, soweit nichts anderes vereinbart ist."],
  ["drittanbieter", "Drittanbieter, Lizenzen und externe Dienste", "Soweit Leistungen Produkte, Plattformen, Lizenzen oder Dienste Dritter einbeziehen, gelten ergänzend deren Bedingungen. Der Auftraggeber ist für die Einhaltung der jeweiligen Lizenz- und Nutzungsbedingungen verantwortlich, sofern nichts anderes vereinbart ist."],
  ["haftung", "Haftung", "Leon Pllana IT-Solutions haftet nach den gesetzlichen Vorschriften bei Vorsatz, grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit. Bei einfacher Fahrlässigkeit haftet Leon Pllana IT-Solutions nur bei Verletzung wesentlicher Vertragspflichten und beschränkt auf den typischerweise vorhersehbaren Schaden."],
  ["vertraulichkeit", "Vertraulichkeit", "Beide Parteien behandeln vertrauliche Informationen, Geschäftsgeheimnisse, technische Informationen, Zugangsdaten, Kundendaten und interne Unterlagen vertraulich. Diese Pflicht gilt auch nach Beendigung der Zusammenarbeit fort."],
  ["datenschutz", "Datenschutz und Sicherheit", "Beide Parteien beachten die jeweils anwendbaren Datenschutzvorschriften. Soweit Leon Pllana IT-Solutions im Auftrag personenbezogene Daten verarbeitet, wird bei Bedarf eine gesonderte Vereinbarung zur Auftragsverarbeitung geschlossen."],
  ["referenzen", "Referenzen", "Leon Pllana IT-Solutions darf den Auftraggeber nur mit vorheriger Zustimmung als Referenz nennen. Inhalte von Case Studies, Logos, Kennzahlen oder Projektdetails werden nur nach vorheriger Freigabe veröffentlicht."],
  ["schlussbestimmungen", "Schlussbestimmungen", "Es gilt deutsches Recht. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz von Leon Pllana IT-Solutions. Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt."],
  ["kontakt", "Kontakt", "Rückfragen zu diesen Allgemeinen Geschäftsbedingungen können an info@pllana.io gerichtet werden."],
];

const enSections = [
  ["scope", "Scope", "These terms apply to services provided by Leon Pllana IT-Solutions to companies, self-employed professionals, freelancers and other business clients. Individual agreements, offers or project contracts take precedence over these terms."],
  ["services", "Services", "Services include digitalisation consulting, IT strategy, process analysis, automation, software development, API integration, cloud, Microsoft 365, IT infrastructure, cyber security, backup, monitoring, AI and technical business consulting. The exact scope is defined in the relevant offer or written agreement."],
  ["contract", "Contract and offers", "Offers are non-binding unless explicitly marked as binding. A contract is formed when an offer is accepted, an order is confirmed or work begins by mutual agreement. Changes to scope may affect timeline, effort and remuneration."],
  ["cooperation", "Client cooperation", "The client provides all required information, access, contact persons, decisions and documents in due time. Delays caused by missing cooperation or incomplete information may extend agreed timelines appropriately."],
  ["payment", "Fees and payment", "Fees are based on the relevant offer or individual agreement. Services may be charged by effort, fixed price, project phase or ongoing support. Unless otherwise agreed, invoices are due without deduction within the stated payment period."],
  ["rights", "Usage rights and work results", "Concepts, documentation, source code, interfaces, automations and other technical results may be used by the client within the agreed scope. Pre-existing methods, templates, know-how and general solution approaches remain with Leon Pllana IT-Solutions unless otherwise agreed."],
  ["third-party", "Third-party services and licences", "If third-party products, platforms, licences or services are involved, their terms apply in addition. The client is responsible for compliance with applicable licence and usage terms unless otherwise agreed."],
  ["liability", "Liability", "Leon Pllana IT-Solutions is liable according to statutory law in cases of intent, gross negligence and injury to life, body or health. In cases of simple negligence, liability is limited to breaches of essential contractual duties and to typically foreseeable damage."],
  ["confidentiality", "Confidentiality", "Both parties treat confidential information, trade secrets, technical information, access data, client data and internal documents confidentially. This obligation continues after the collaboration ends."],
  ["privacy", "Data protection and security", "Both parties comply with applicable data protection law. If Leon Pllana IT-Solutions processes personal data on behalf of the client, a separate data processing agreement will be concluded where required."],
  ["references", "References", "Leon Pllana IT-Solutions may name the client as a reference only with prior approval. Case studies, logos, metrics or project details are published only after prior release."],
  ["final", "Final provisions", "German law applies. Place of jurisdiction is, where legally permissible, the registered place of business of Leon Pllana IT-Solutions. If individual provisions are invalid, the remaining provisions remain effective."],
  ["contact", "Contact", "Questions about these terms can be sent to info@pllana.io."],
];

const sqSections = [
  ["scope", "Fusha e zbatimit", "Këto kushte vlejnë për shërbimet e Leon Pllana IT-Solutions ndaj kompanive, profesionistëve të pavarur, freelancerëve dhe klientëve të tjerë biznesorë. Marrëveshjet individuale, ofertat ose kontratat e projektit kanë përparësi."],
  ["services", "Shërbimet", "Shërbimet përfshijnë këshillim për digjitalizim, strategji IT, analizë procesesh, automatizim, zhvillim softueri, integrim API, cloud, Microsoft 365, infrastrukturë IT, siguri kibernetike, backup, monitorim, AI dhe këshillim teknik biznesi."],
  ["contract", "Kontrata dhe ofertat", "Ofertat janë jo të detyrueshme, përveç rasteve kur shënohen qartë si të detyrueshme. Kontrata krijohet kur oferta pranohet, porosia konfirmohet ose puna fillon me marrëveshje të përbashkët."],
  ["cooperation", "Bashkëpunimi i klientit", "Klienti siguron në kohë informacionet, qasjet, personat kontaktues, vendimet dhe dokumentet e nevojshme. Vonesat nga mungesa e bashkëpunimit mund të zgjasin afatet në mënyrë të arsyeshme."],
  ["payment", "Pagesa dhe kushtet e pagesës", "Pagesa bazohet në ofertën përkatëse ose marrëveshjen individuale. Shërbimet mund të faturohen sipas kohës, me çmim fiks, sipas fazave të projektit ose si mbështetje e vazhdueshme."],
  ["rights", "Të drejtat e përdorimit dhe rezultatet", "Konceptet, dokumentacionet, kodi, ndërfaqet, automatizimet dhe zgjidhjet teknike mund të përdoren nga klienti sipas fushës së rënë dakord. Metodat, modelet dhe know-how ekzistues mbeten te Leon Pllana IT-Solutions, përveç nëse është rënë dakord ndryshe."],
  ["third-party", "Shërbime dhe licenca të palëve të treta", "Nëse përfshihen produkte, platforma, licenca ose shërbime të palëve të treta, vlejnë edhe kushtet e tyre. Klienti është përgjegjës për respektimin e kushteve të licencës dhe përdorimit."],
  ["liability", "Përgjegjësia", "Leon Pllana IT-Solutions mban përgjegjësi sipas ligjit për qëllim, neglizhencë të rëndë dhe dëmtim të jetës, trupit ose shëndetit. Për neglizhencë të thjeshtë, përgjegjësia kufizohet në detyrimet thelbësore kontraktuale dhe dëmin zakonisht të parashikueshëm."],
  ["confidentiality", "Konfidencialiteti", "Të dyja palët trajtojnë informacionet konfidenciale, sekretet tregtare, informacionet teknike, të dhënat e qasjes, të dhënat e klientit dhe dokumentet e brendshme si konfidenciale."],
  ["privacy", "Mbrojtja e të dhënave dhe siguria", "Të dyja palët respektojnë ligjet e zbatueshme për mbrojtjen e të dhënave. Nëse nevojitet përpunim të dhënash në emër të klientit, lidhet marrëveshje e veçantë për përpunimin e të dhënave."],
  ["references", "Referencat", "Leon Pllana IT-Solutions mund ta përmendë klientin si referencë vetëm me miratim paraprak. Studimet e rastit, logot, shifrat ose detajet e projektit publikohen vetëm pas miratimit."],
  ["final", "Dispozitat përfundimtare", "Zbatohet e drejta gjermane. Vendi i juridiksionit është, sa lejohet ligjërisht, selia e Leon Pllana IT-Solutions. Nëse ndonjë dispozitë është e pavlefshme, dispozitat e tjera mbeten në fuqi."],
  ["contact", "Kontakt", "Pyetjet rreth këtyre kushteve mund të dërgohen në info@pllana.io."],
];

function toSections(items: string[][]) {
  return items.map(([id, title, paragraph]) => ({ id, title, paragraphs: [paragraph] }));
}

const content = {
  de: {
    title: "Allgemeine Geschäftsbedingungen",
    description: "Bedingungen für die Zusammenarbeit mit Leon Pllana IT-Solutions im Bereich Digitalisierung, IT-Beratung, Softwareentwicklung, Infrastruktur und technische Unternehmensberatung.",
    sections: toSections(deSections),
  },
  en: {
    title: "Terms and Conditions",
    description: "Terms for working with Leon Pllana IT-Solutions in digitalisation, IT consulting, software development, infrastructure and technical business consulting.",
    sections: toSections(enSections),
  },
  sq: {
    title: "Kushtet e Përgjithshme",
    description: "Kushtet për bashkëpunimin me Leon Pllana IT-Solutions në digjitalizim, këshillim IT, zhvillim softueri, infrastrukturë dhe këshillim teknik biznesi.",
    sections: toSections(sqSections),
  },
};

export default function AGBPage() {
  return <LocalizedLegalPage content={content} />;
}
