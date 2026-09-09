const siteUrl = "https://pllana.io";
const founderId = `${siteUrl}/#leon-pllana`;
const businessDescription =
  "Leon Pllana IT-Solutions ist ein strategischer Digitalisierungspartner aus Fürstenfeldbruck bei München. Das Unternehmen unterstützt B2B-Kunden bei Digitalisierungsberatung, Prozessoptimierung, IT-Strategie, Microsoft 365, Cloud, Cyber Security, Automatisierung, Softwareentwicklung, API-Integration und KI. Technologie folgt dabei immer dem Prozess.";

const offerCatalogSchema = {
  "@type": "OfferCatalog",
  "@id": `${siteUrl}/#offers`,
  name: "Leistungen von Leon Pllana IT-Solutions",
  itemListElement: [
    "Digitalisierungsberatung",
    "Prozessanalyse und Prozessoptimierung",
    "IT-Strategie und technische Unternehmensberatung",
    "Microsoft 365 und Digital Workplace",
    "Cloud, IT-Infrastruktur und Cyber Security",
    "Backup und Monitoring",
    "Softwareentwicklung und API-Integration",
    "KI und Automatisierung im Unternehmen",
    "IT-Projektleitung und IT-Outsourcing",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};

const serviceSchema = {
  "@type": "Service",
  "@id": `${siteUrl}/#service`,
  name: "Strategische Digitalisierung und IT-Beratung für B2B-Unternehmen",
  serviceType: "Digitalisierungsberatung, IT-Strategie, Prozessoptimierung, Automatisierung und technische Unternehmensberatung",
  provider: { "@id": `${siteUrl}/#organization` },
  hasOfferCatalog: { "@id": `${siteUrl}/#offers` },
  areaServed: ["Deutschland", "Bayern", "München", "Fürstenfeldbruck", "Österreich", "Schweiz", "Europa"],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "B2B-Unternehmen, Mittelstand, Startups, Familienunternehmen, Dienstleister, Produktion, Kanzleien, Agenturen und Unternehmensgruppen",
  },
  description:
    "Leon Pllana IT-Solutions analysiert Unternehmen, versteht Prozesse, identifiziert Ineffizienzen und entwickelt darauf aufbauend passende technologische Lösungen. Die Leistung richtet sich ausschließlich an B2B-Kunden.",
};

const webPageSchema = {
  "@type": "WebPage",
  "@id": `${siteUrl}/#webpage`,
  url: siteUrl,
  name: "Leon Pllana IT-Solutions | Strategischer Digitalisierungspartner",
  headline: "Innovation in every Step.",
  description: businessDescription,
  inLanguage: ["de-DE", "en", "sq"],
  about: { "@id": `${siteUrl}/#organization` },
  mainEntity: { "@id": `${siteUrl}/#service` },
  primaryImageOfPage: `${siteUrl}/og-image.png`,
  reviewedBy: { "@id": founderId },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#aeo-summary", "#ai-seo"],
  },
};

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [offerCatalogSchema, serviceSchema, webPageSchema],
};

