import type { Locale } from "@/lib/i18n";
import { selectionCopy } from "./offer-selection-copy";

// Fixed project prices specified by Leon; independent of recurring care fees.
export const projectOffers = [
  { id: "website", fixedPrice: 1500 },
  { id: "microsoft365", fixedPrice: 1000 },
  { id: "software", fixedPrice: null },
] as const;

type ProjectId = (typeof projectOffers)[number]["id"];
type ProjectCopy = {
  title: string;
  outcome: string;
  features: readonly string[];
  scope: string;
};
type ProjectSectionCopy = {
  title: string;
  intro: string;
  fixed: string;
  onRequest: string;
  individualQuote: string;
  net: string;
  cta: string;
  offers: Record<ProjectId, ProjectCopy>;
};

export const projectCopy = {
  de: {
    title: "Einmalige Projekte",
    intro: "Von der ersten Einrichtung bis zur Übergabe: Starten Sie mit einem klar vereinbarten Projekt. Eine anschließende laufende Betreuung können Sie passend dazu buchen.",
    fixed: "einmaliger Festpreis", onRequest: "Auf Anfrage", individualQuote: "individuelles Angebot",
    net: "netto · Umsatzsteuer gemäß Angebot", cta: "Projekt anfragen",
    offers: {
      website: {
        title: "Website-Erstellung",
        outcome: "Ihr Unternehmensauftritt von der Domainregistrierung bis zum Go-live.",
        features: [
          "Abstimmung von Aufbau und Gestaltung, Domainregistrierung sowie DNS- und Hosting-Anbindung.",
          "Umsetzung der vereinbarten Seiten und Inhalte mit Darstellung für Smartphone und Desktop.",
          "Funktionstests, Go-live und Übergabe.",
        ],
        scope: "Seiten, Funktionen, Inhalte und Korrekturrunden werden vor Projektbeginn festgehalten. Die Registrierungstätigkeit ist enthalten; laufende Domain- und Hostinggebühren werden separat ausgewiesen.",
      },
      microsoft365: {
        title: "Microsoft-365-Einrichtung",
        outcome: "Ein neuer Tenant mit Benutzerkonten, Microsoft Entra ID und Intune.",
        features: [
          "Anlage des Microsoft-365-Tenants und der vereinbarten Benutzerkonten.",
          "Einrichtung der Entra-ID-Grundstruktur und grundlegender Zugriffsrichtlinien sowie der Intune-Geräteverwaltung.",
          "Vereinbarte Geräte- und Richtlinienkonfiguration, Funktionstest und dokumentierte Übergabe.",
        ],
        scope: "Lizenzkosten sind nicht enthalten. Benutzer- und Gerätezahl sowie die konkrete Konfiguration werden vorab vereinbart. Datenmigrationen und besondere App-Paketierungen werden gesondert angeboten. Microsoft Entra ID bezeichnet das frühere Azure AD.",
      },
      software: {
        title: "Individual Care",
        outcome: selectionCopy.de.individualOutcome,
        features: selectionCopy.de.individualFeatures,
        scope: selectionCopy.de.individualScope,
      },
    },
  },
  en: {
    title: "One-off projects",
    intro: "From initial setup to handover: start with a clearly agreed project. You can add ongoing support to suit your needs afterwards.",
    fixed: "one-off fixed price", onRequest: "On request", individualQuote: "individual quote",
    net: "net · VAT as stated in your quote", cta: "Enquire about a project",
    offers: {
      website: {
        title: "Website creation",
        outcome: "Your company website from domain registration to go-live.",
        features: [
          "Agree structure and design, register the domain and connect DNS and hosting.",
          "Build the agreed pages and content for mobile and desktop screens.",
          "Functional testing, go-live and handover.",
        ],
        scope: "Pages, features, content and revision rounds are agreed before the project starts. Registration work is included; recurring domain and hosting fees are listed separately.",
      },
      microsoft365: {
        title: "Microsoft 365 setup",
        outcome: "A new tenant with user accounts, Microsoft Entra ID and Intune.",
        features: [
          "Create the Microsoft 365 tenant and the agreed user accounts.",
          "Set up the Entra ID foundation, basic access policies and Intune device management.",
          "Agreed device and policy configuration, functional testing and documented handover.",
        ],
        scope: "Licence costs are excluded. User and device counts and the specific configuration are agreed in advance. Data migrations and specialist app packaging are quoted separately. Microsoft Entra ID is the former Azure AD.",
      },
      software: {
        title: "Individual Care",
        outcome: selectionCopy.en.individualOutcome,
        features: selectionCopy.en.individualFeatures,
        scope: selectionCopy.en.individualScope,
      },
    },
  },
  sq: {
    title: "Projekte të njëhershme",
    intro: "Nga konfigurimi fillestar deri te dorëzimi: filloni me një projekt të përcaktuar qartë. Më pas mund të zgjidhni mbështetjen e vazhdueshme sipas nevojave tuaja.",
    fixed: "çmim fiks i njëhershëm", onRequest: "Me kërkesë", individualQuote: "ofertë individuale",
    net: "neto · TVSH sipas ofertës", cta: "Kërkoni një projekt",
    offers: {
      website: {
        title: "Krijimi i faqes së internetit",
        outcome: "Faqja e kompanisë suaj nga regjistrimi i domenit deri te publikimi.",
        features: [
          "Dakordimi i strukturës dhe dizajnit, regjistrimi i domenit dhe lidhja me DNS dhe hostimin.",
          "Realizimi i faqeve dhe përmbajtjes së dakorduar për telefon dhe kompjuter.",
          "Testimi i funksioneve, publikimi dhe dorëzimi.",
        ],
        scope: "Faqet, funksionet, përmbajtja dhe raundet e korrigjimeve përcaktohen para fillimit. Puna e regjistrimit përfshihet; tarifat periodike të domenit dhe hostimit paraqiten veçmas.",
      },
      microsoft365: {
        title: "Konfigurimi i Microsoft 365",
        outcome: "Një tenant i ri me llogari përdoruesish, Microsoft Entra ID dhe Intune.",
        features: [
          "Krijimi i tenant-it Microsoft 365 dhe llogarive të dakorduara të përdoruesve.",
          "Konfigurimi bazë i Entra ID, politikave bazë të qasjes dhe administrimit të pajisjeve me Intune.",
          "Konfigurimi i dakorduar i pajisjeve dhe politikave, testimi dhe dorëzimi i dokumentuar.",
        ],
        scope: "Kostot e licencave nuk përfshihen. Numri i përdoruesve dhe pajisjeve dhe konfigurimi konkret dakordohen paraprakisht. Migrimet e të dhënave dhe paketimi i veçantë i aplikacioneve ofertohen veçmas. Microsoft Entra ID është emri i ri i Azure AD.",
      },
      software: {
        title: "Individual Care",
        outcome: selectionCopy.sq.individualOutcome,
        features: selectionCopy.sq.individualFeatures,
        scope: selectionCopy.sq.individualScope,
      },
    },
  },
} satisfies Record<Locale, ProjectSectionCopy>;
