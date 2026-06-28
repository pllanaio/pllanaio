import { LocalizedLegalPage } from "@/components/localized-legal-page";

export const metadata = {
  title: "Cookie-Richtlinie",
  description: "Informationen zum Einsatz von Cookies, Google Analytics und Einwilligungen auf pllana.io.",
};

const content = {
  de: {
    title: "Cookie-Richtlinie",
    description: "Diese Cookie-Richtlinie erklärt, welche Cookies und vergleichbaren Technologien auf dieser Website eingesetzt werden und wie Sie Ihre Einwilligung verwalten können.",
    sections: [
      { id: "grundlagen", title: "Was sind Cookies?", paragraphs: ["Cookies sind kleine Textdateien, die im Browser gespeichert werden. Sie können erforderlich sein, damit eine Website technisch funktioniert, oder optional eingesetzt werden, um die Nutzung statistisch auszuwerten.", "Vergleichbare Technologien sind zum Beispiel Local Storage, Session Storage oder Skripte externer Dienste."] },
      { id: "notwendig", title: "Technisch notwendige Cookies und Speicherungen", paragraphs: ["Technisch notwendige Speicherungen dienen dem sicheren und stabilen Betrieb der Website. Dazu gehören insbesondere die Speicherung Ihrer Cookie-Auswahl, Spracheinstellungen und Darstellungspräferenzen wie Hell-/Dunkelmodus.", "Diese Funktionen sind erforderlich, um die Website korrekt bereitzustellen. Sie werden nicht zu Marketingzwecken verwendet."] },
      { id: "analytics", title: "Analyse-Cookies und Google Analytics", paragraphs: ["Mit Ihrer Einwilligung wird Google Analytics eingesetzt, um zu verstehen, wie Besucher diese Website nutzen. Dabei können Informationen wie Seitenaufrufe, Klicks auf Kontaktmöglichkeiten, verwendete Geräte, ungefähre Standortdaten und technische Nutzungsdaten verarbeitet werden.", "Google Analytics wird erst aktiviert, nachdem Sie Analyse-Cookies akzeptiert haben. Ohne Einwilligung werden keine Google-Analytics-Skripte geladen.", "Die IP-Anonymisierung ist aktiviert. Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO."] },
      { id: "tracking", title: "Erfasste Interaktionen", paragraphs: ["Nach Einwilligung können Interaktionen wie Klicks auf Gespräch anfragen, WhatsApp, LinkedIn, Instagram, interne Sprungmarken und externe Partnerlinks erfasst werden.", "Diese Daten helfen dabei, die Website verständlicher, effizienter und relevanter zu gestalten."] },
      { id: "widerruf", title: "Einwilligung ändern oder widerrufen", paragraphs: ["Sie können Ihre Cookie-Auswahl jederzeit über den Link Cookie-Einstellungen im Footer der Website erneut öffnen und ändern.", "Wenn Sie Ihre Browserdaten löschen, wird auch Ihre gespeicherte Cookie-Auswahl gelöscht und das Banner erneut angezeigt."] },
      { id: "kontakt", title: "Kontakt", paragraphs: ["Bei Fragen zur Cookie-Nutzung oder zum Datenschutz erreichen Sie Leon Pllana IT-Solutions unter info@pllana.io."] },
    ],
  },
  en: {
    title: "Cookie Policy",
    description: "This cookie policy explains which cookies and similar technologies are used on this website and how you can manage your consent.",
    sections: [
      { id: "basics", title: "What are cookies?", paragraphs: ["Cookies are small text files stored in the browser. They may be required for technical website functionality or used optionally to evaluate usage statistically.", "Similar technologies include local storage, session storage and scripts from external services."] },
      { id: "necessary", title: "Technically necessary cookies and storage", paragraphs: ["Technically necessary storage supports secure and stable website operation. This includes storing your cookie choice, language settings and display preferences such as light or dark mode.", "These functions are required to provide the website correctly. They are not used for marketing purposes."] },
      { id: "analytics", title: "Analytics cookies and Google Analytics", paragraphs: ["With your consent, Google Analytics is used to understand how visitors use this website. Information such as page views, contact clicks, devices used, approximate location data and technical usage data may be processed.", "Google Analytics is activated only after you accept analytics cookies. Without consent, no Google Analytics scripts are loaded.", "IP anonymisation is enabled. Processing is based on your consent under Art. 6(1)(a) GDPR."] },
      { id: "tracking", title: "Tracked interactions", paragraphs: ["After consent, interactions such as clicks on request a conversation, WhatsApp, LinkedIn, Instagram, internal anchors and external partner links may be recorded.", "This data helps make the website clearer, more efficient and more relevant."] },
      { id: "withdraw", title: "Change or withdraw consent", paragraphs: ["You can reopen and change your cookie choice at any time via the Cookie settings link in the website footer.", "If you delete your browser data, your saved cookie choice is also deleted and the banner will be shown again."] },
      { id: "contact", title: "Contact", paragraphs: ["For questions about cookie usage or data protection, contact Leon Pllana IT-Solutions at info@pllana.io."] },
    ],
  },
  sq: {
    title: "Politika e Cookies",
    description: "Kjo politikë shpjegon cilat cookies dhe teknologji të ngjashme përdoren në këtë faqe dhe si mund ta menaxhoni pëlqimin tuaj.",
    sections: [
      { id: "basics", title: "Çfarë janë cookies?", paragraphs: ["Cookies janë skedarë të vegjël teksti që ruhen në shfletues. Ato mund të jenë të nevojshme për funksionimin teknik të faqes ose të përdoren opsionalisht për analizë statistikore të përdorimit.", "Teknologji të ngjashme janë local storage, session storage dhe skripte nga shërbime të jashtme."] },
      { id: "necessary", title: "Cookies dhe ruajtje teknikisht të nevojshme", paragraphs: ["Ruajtjet teknikisht të nevojshme shërbejnë për funksionimin e sigurt dhe stabil të faqes. Këtu përfshihet ruajtja e zgjedhjes suaj për cookies, cilësimet e gjuhës dhe preferencat e paraqitjes si modaliteti i ndritshëm ose i errët.", "Këto funksione janë të nevojshme për ta ofruar faqen në mënyrë korrekte. Ato nuk përdoren për marketing."] },
      { id: "analytics", title: "Cookies analitike dhe Google Analytics", paragraphs: ["Me pëlqimin tuaj përdoret Google Analytics për të kuptuar si e përdorin vizitorët këtë faqe. Mund të përpunohen informacione si shikimet e faqeve, klikimet në kontakt, pajisjet e përdorura, të dhënat e përafërta të vendndodhjes dhe të dhënat teknike të përdorimit.", "Google Analytics aktivizohet vetëm pasi të pranoni cookies analitike. Pa pëlqim nuk ngarkohen skriptet e Google Analytics.", "Anonimizimi i IP-së është aktiv. Përpunimi bazohet në pëlqimin tuaj sipas Art. 6(1)(a) GDPR."] },
      { id: "tracking", title: "Ndërveprimet e regjistruara", paragraphs: ["Pas pëlqimit mund të regjistrohen ndërveprime si klikimet në kërko bisedë, WhatsApp, LinkedIn, Instagram, lidhje të brendshme dhe lidhje të jashtme të partnerëve.", "Këto të dhëna ndihmojnë që faqja të bëhet më e qartë, më efikase dhe më relevante."] },
      { id: "withdraw", title: "Ndryshimi ose tërheqja e pëlqimit", paragraphs: ["Mund ta hapni dhe ndryshoni zgjedhjen tuaj për cookies në çdo kohë përmes lidhjes Cilësimet e cookies në footer.", "Nëse fshini të dhënat e shfletuesit, fshihet edhe zgjedhja e ruajtur dhe banneri shfaqet përsëri."] },
      { id: "contact", title: "Kontakt", paragraphs: ["Për pyetje rreth përdorimit të cookies ose mbrojtjes së të dhënave, kontaktoni Leon Pllana IT-Solutions në info@pllana.io."] },
    ],
  },
};

export default function CookiePolicyPage() {
  return <LocalizedLegalPage content={content} />;
}
