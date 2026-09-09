import type { Locale } from "@/lib/i18n";
import type { OfferId } from "@/lib/offer-selection";

export type OfferMode = "care" | "bundle" | "setup";
type SelectionCopy = {
  configure: string; careOnly: string; websiteBundle: string; workplaceBundle: string;
  websiteOnly: string; workplaceOnly: string; select: string; update: string; selected: string;
  once: string; monthly: string; noMonthly: string; setupDetails: string; requestNote: string;
  summary: string; summaryIntro: string; remove: string; change: string; clear: string;
  oneTimeTotal: string; monthlyTotal: string; individualExtra: string; costsNote: string;
  messageOptional: string; messageIndividual: string; individualAudience: string;
  individualOutcome: string; individualScope: string; individualFeatures: readonly string[];
  names: Record<OfferId, string>;
};

export const selectionCopy = {
  de: {
    configure: "Was benötigen Sie?", careOnly: "Nur Betreuung",
    websiteBundle: "Erstellung + Web Care", workplaceBundle: "Einrichtung + Workplace Care",
    websiteOnly: "Nur Website-Erstellung", workplaceOnly: "Nur Microsoft-365-Einrichtung",
    select: "Auswählen", update: "Auswahl übernehmen", selected: "In Ihrer Anfrage",
    once: "einmalig", monthly: "/ Monat", noMonthly: "Keine monatliche Betreuung ausgewählt",
    setupDetails: "Das umfasst die Einrichtung", requestNote: "Unverbindlich auswählen und im Kontaktformular anfragen.",
    summary: "Ihre ausgewählten Leistungen", summaryIntro: "Diese Auswahl wird mit Ihrer Anfrage per E-Mail übermittelt.",
    remove: "Entfernen", change: "Weitere Leistungen wählen / Auswahl ändern", clear: "Auswahl zurücksetzen",
    oneTimeTotal: "Einmalig gesamt", monthlyTotal: "Monatlich gesamt",
    individualExtra: "Individual Care kommt nach Abstimmung hinzu: einmalige und laufende Kosten auf Anfrage.",
    costsNote: "Alle Preise netto. Monatsbeträge sind Einstiegspreise für den beschriebenen Umfang. Domain, Hosting, Lizenzen und weitere Fremdkosten separat; Umsatzsteuer gemäß Angebot. Verbindlicher Umfang und Betreuungsbeginn werden im Angebot vereinbart.",
    messageOptional: "Optional: Ergänzen Sie Ihre Wünsche oder Fragen. Die ausgewählten Leistungen werden automatisch mitgesendet.",
    messageIndividual: "Beschreiben Sie kurz Ihr Vorhaben, zum Beispiel eine Anwendung oder einen Shopify-Shop mit gewünschter Pflege.",
    individualAudience: "Für Ihr individuelles Vorhaben",
    individualOutcome: "Software, Shopify-Shops und digitale Lösungen, die zu Ihrem Unternehmen passen.",
    individualScope: "Einmalige Umsetzung, laufende Pflege oder beides: Wir stimmen Leistungen, Zeitplan und Preise auf Ihr Projekt ab.",
    individualFeatures: ["Entwicklung und Weiterentwicklung von Individualsoftware und Schnittstellen.", "Erstellung, Anpassung und Pflege von Shopify-Shops.", "Weitere individuelle Web-, App- und Automatisierungsprojekte."],
    names: { "web-care": "Web Care", "website-setup": "Website-Erstellung", "workplace-care": "Workplace Care", "workplace-setup": "Microsoft-365-Einrichtung", "cloud-care": "Cloud & App Care", "individual-care": "Individual Care" },
  },
  en: {
    configure: "What do you need?", careOnly: "Support only",
    websiteBundle: "Creation + Web Care", workplaceBundle: "Setup + Workplace Care",
    websiteOnly: "Website creation only", workplaceOnly: "Microsoft 365 setup only",
    select: "Select", update: "Apply selection", selected: "In your enquiry",
    once: "one-off", monthly: "/ month", noMonthly: "No monthly support selected",
    setupDetails: "What setup includes", requestNote: "Select services and send a non-binding enquiry using the contact form.",
    summary: "Your selected services", summaryIntro: "This selection will be emailed with your enquiry.",
    remove: "Remove", change: "Choose more services / change selection", clear: "Clear selection",
    oneTimeTotal: "One-off total", monthlyTotal: "Monthly total",
    individualExtra: "Individual Care is quoted separately: one-off and recurring costs on request.",
    costsNote: "All prices are net. Monthly fees are starting prices for the stated scope. Domain, hosting, licences and other third-party costs are separate; VAT as stated in your quote. Final scope and support start date are agreed in the quote.",
    messageOptional: "Optional: add your wishes or questions. Selected services are included automatically.",
    messageIndividual: "Briefly describe your project, such as an application or a Shopify shop and the support you need.",
    individualAudience: "For your individual project",
    individualOutcome: "Software, Shopify shops and digital solutions built around your business.",
    individualScope: "One-off delivery, ongoing maintenance or both: scope, schedule and prices are tailored to your project.",
    individualFeatures: ["Custom software development, ongoing improvements and integrations.", "Shopify shop creation, customisation and maintenance.", "Other individual web, app and automation projects."],
    names: { "web-care": "Web Care", "website-setup": "Website creation", "workplace-care": "Workplace Care", "workplace-setup": "Microsoft 365 setup", "cloud-care": "Cloud & App Care", "individual-care": "Individual Care" },
  },
  sq: {
    configure: "Çfarë ju nevojitet?", careOnly: "Vetëm mirëmbajtje",
    websiteBundle: "Krijim + Web Care", workplaceBundle: "Konfigurim + Workplace Care",
    websiteOnly: "Vetëm krijimi i faqes", workplaceOnly: "Vetëm konfigurimi i Microsoft 365",
    select: "Zgjidhni", update: "Zbatoni zgjedhjen", selected: "Në kërkesën tuaj",
    once: "një herë", monthly: "/ muaj", noMonthly: "Nuk është zgjedhur mirëmbajtje mujore",
    setupDetails: "Çfarë përfshin konfigurimi", requestNote: "Zgjidhni shërbimet dhe dërgoni një kërkesë pa detyrim përmes formularit.",
    summary: "Shërbimet tuaja të zgjedhura", summaryIntro: "Kjo zgjedhje dërgohet me email bashkë me kërkesën tuaj.",
    remove: "Hiqni", change: "Zgjidhni shërbime të tjera / ndryshoni zgjedhjen", clear: "Pastroni zgjedhjen",
    oneTimeTotal: "Totali një herë", monthlyTotal: "Totali mujor",
    individualExtra: "Individual Care ofertohet veçmas: kostot fillestare dhe periodike sipas kërkesës.",
    costsNote: "Të gjitha çmimet janë neto. Tarifat mujore janë çmime fillestare për fushën e përshkruar. Domaini, hostimi, licencat dhe kostot e palëve të treta llogariten veçmas; TVSH-ja sipas ofertës. Fusha përfundimtare dhe fillimi i mirëmbajtjes dakordohen në ofertë.",
    messageOptional: "Opsionale: shtoni dëshirat ose pyetjet tuaja. Shërbimet e zgjedhura përfshihen automatikisht.",
    messageIndividual: "Përshkruani shkurt projektin tuaj, për shembull një aplikacion ose dyqan Shopify dhe mirëmbajtjen e dëshiruar.",
    individualAudience: "Për projektin tuaj individual",
    individualOutcome: "Softuer, dyqane Shopify dhe zgjidhje digjitale sipas biznesit tuaj.",
    individualScope: "Realizim një herë, mirëmbajtje periodike ose të dyja: shërbimet, afatet dhe çmimet përshtaten sipas projektit.",
    individualFeatures: ["Zhvillim dhe përmirësim i softuerit të personalizuar dhe integrimeve.", "Krijim, përshtatje dhe mirëmbajtje e dyqaneve Shopify.", "Projekte të tjera individuale për web, aplikacione dhe automatizim."],
    names: { "web-care": "Web Care", "website-setup": "Krijimi i faqes web", "workplace-care": "Workplace Care", "workplace-setup": "Konfigurimi i Microsoft 365", "cloud-care": "Cloud & App Care", "individual-care": "Individual Care" },
  },
} satisfies Record<Locale, SelectionCopy>;
