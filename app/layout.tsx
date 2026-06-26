import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const siteUrl = "https://pllana.io";
const businessName = "Leon Pllana IT-Solutions";
const businessDescription =
  "Leon Pllana IT-Solutions ist ein strategischer Digitalisierungspartner aus Fürstenfeldbruck bei München. Das Unternehmen unterstützt B2B-Kunden bei Digitalisierungsberatung, Prozessoptimierung, IT-Strategie, Microsoft 365, Cloud, Cyber Security, Automatisierung, Softwareentwicklung und KI. Technologie folgt dabei immer dem Prozess.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Leon Pllana IT-Solutions | Strategischer Digitalisierungspartner",
    template: "%s | Leon Pllana IT-Solutions",
  },
  description:
    "Strategischer Digitalisierungspartner aus Fürstenfeldbruck bei München: Digitalisierungsberatung, Prozessoptimierung, IT-Strategie, Microsoft 365, Cloud, Cyber Security, Automatisierung und KI für B2B-Unternehmen.",
  applicationName: businessName,
  authors: [{ name: "Leon Pllana", url: siteUrl }],
  creator: businessName,
  publisher: businessName,
  category: "Technology Consulting",
  keywords: [
    "Leon Pllana IT-Solutions",
    "Digitalisierungsberatung Fürstenfeldbruck",
    "IT-Beratung München",
    "Digitalisierung Mittelstand",
    "strategischer Digitalisierungspartner",
    "IT-Strategie",
    "Prozessoptimierung",
    "Automatisierung",
    "Microsoft 365 Beratung",
    "Cloud Beratung",
    "Cyber Security Beratung",
    "KI im Unternehmen",
    "Digital Workplace",
    "Softwareentwicklung",
    "API Integration",
    "Fürstenfeldbruck",
    "München",
    "Bayern",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Leon Pllana IT-Solutions | Innovation in every Step.",
    description:
      "Strategischer Digitalisierungspartner aus Fürstenfeldbruck bei München. Technologie folgt dem Prozess: Beratung, IT-Strategie, Automatisierung, Cloud, Cyber Security und KI für B2B-Unternehmen.",
    url: siteUrl,
    siteName: businessName,
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Leon Pllana IT-Solutions – Innovation in every Step.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leon Pllana IT-Solutions | Innovation in every Step.",
    description:
      "Strategischer Digitalisierungspartner für Prozessoptimierung, IT-Strategie, Cloud, Cyber Security, Automatisierung und KI.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const organizationSchema = {
  "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
  "@id": `${siteUrl}/#organization`,
  name: businessName,
  legalName: businessName,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og-image.png`,
  slogan: "Innovation in every Step.",
  description: businessDescription,
  email: "info@pllana.io",
  telephone: "+491727255810",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rothschwaiger Straße 4",
    postalCode: "82256",
    addressLocality: "Fürstenfeldbruck",
    addressRegion: "Bayern",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    addressCountry: "DE",
    addressRegion: "Bayern",
    addressLocality: "Fürstenfeldbruck",
  },
  areaServed: [
    { "@type": "Country", name: "Deutschland" },
    { "@type": "AdministrativeArea", name: "Bayern" },
    { "@type": "City", name: "München" },
    { "@type": "City", name: "Fürstenfeldbruck" },
    { "@type": "Country", name: "Österreich" },
    { "@type": "Country", name: "Schweiz" },
    { "@type": "Place", name: "Europa" },
  ],
  sameAs: ["https://instagram.com/pllanaio", "https://www.linkedin.com/in/leon-pllana/"],
  knowsAbout: [
    "Digitalisierungsberatung",
    "IT-Beratung",
    "IT-Strategie",
    "Prozessoptimierung",
    "Microsoft 365",
    "Cloud-Infrastruktur",
    "Cyber Security",
    "Backup und Monitoring",
    "Automatisierung",
    "Softwareentwicklung",
    "API-Integration",
    "Künstliche Intelligenz im Unternehmen",
    "Digital Workplace",
    "IT-Projektleitung",
    "IT-Outsourcing",
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digitalisierungsberatung" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Prozessanalyse und Prozessoptimierung" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT-Strategie und technische Unternehmensberatung" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Microsoft 365 und Digital Workplace" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud, IT-Infrastruktur und Cyber Security" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Softwareentwicklung, API-Integration und KI-Automatisierung" } },
  ],
};

const serviceSchema = {
  "@type": "Service",
  "@id": `${siteUrl}/#service`,
  name: "Strategische Digitalisierung und IT-Beratung für B2B-Unternehmen",
  serviceType: "Digitalisierungsberatung, IT-Strategie, Prozessoptimierung, Automatisierung und technische Unternehmensberatung",
  provider: { "@id": `${siteUrl}/#organization` },
  areaServed: ["Deutschland", "Bayern", "München", "Fürstenfeldbruck", "Österreich", "Schweiz", "Europa"],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "B2B-Unternehmen, Mittelstand, Startups, Familienunternehmen, Dienstleister, Produktion, Kanzleien, Agenturen und Unternehmensgruppen",
  },
  description:
    "Leon Pllana IT-Solutions analysiert Unternehmen, versteht Prozesse, identifiziert Ineffizienzen und entwickelt darauf aufbauend passende technologische Lösungen. Die Leistung richtet sich ausschließlich an B2B-Kunden.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Leistungen von Leon Pllana IT-Solutions",
    itemListElement: [
      "Digitalisierungsberatung",
      "IT-Infrastruktur",
      "Microsoft 365",
      "Cloud",
      "Cyber Security",
      "Backup",
      "Monitoring",
      "Softwareentwicklung",
      "API-Integration",
      "KI",
      "Automatisierung",
      "Prozessanalyse",
      "Dokumentation",
      "IT-Strategie",
      "Digital Workplace",
      "IT-Projektleitung",
      "IT-Outsourcing",
      "Technische Unternehmensberatung",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
};

const faqSchema = {
  "@type": "FAQPage",
  "@id": `${siteUrl}/#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht Leon Pllana IT-Solutions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Leon Pllana IT-Solutions ist ein strategischer Digitalisierungspartner für B2B-Unternehmen. Das Unternehmen analysiert Prozesse, erkennt Ineffizienzen und entwickelt nachhaltige digitale Lösungen mit IT, Cloud, Automatisierung, Softwareentwicklung, Cyber Security und KI.",
      },
    },
    {
      "@type": "Question",
      name: "Ist Leon Pllana IT-Solutions ein klassischer IT-Dienstleister?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. IT ist das Werkzeug, nicht der Ausgangspunkt. Zuerst werden Unternehmen, Prozesse und Ziele verstanden. Erst danach wird entschieden, welche Technologie eingesetzt wird.",
      },
    },
    {
      "@type": "Question",
      name: "Für wen arbeitet Leon Pllana IT-Solutions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Leon Pllana IT-Solutions arbeitet ausschließlich im B2B-Bereich – branchenunabhängig für Startups, Mittelstand, Familienunternehmen, Dienstleister, Produktion, Kanzleien, Agenturen und internationale Unternehmensgruppen.",
      },
    },
    {
      "@type": "Question",
      name: "In welcher Region ist Leon Pllana IT-Solutions tätig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Unternehmenssitz befindet sich in Fürstenfeldbruck bei München. Die Leistungen werden für Unternehmen in Deutschland, Bayern, München, Fürstenfeldbruck, Österreich, der Schweiz und europaweit erbracht.",
      },
    },
    {
      "@type": "Question",
      name: "Was bedeutet Innovation in every Step?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Innovation bedeutet bei Leon Pllana IT-Solutions kontinuierliche Verbesserung: jeder Prozess, jede Entscheidung, jeder Arbeitsplatz, jede Infrastruktur und jeder einzelne Schritt wird schrittweise optimiert.",
      },
    },
  ],
};

const webPageSchema = {
  "@type": "WebPage",
  "@id": `${siteUrl}/#webpage`,
  url: siteUrl,
  name: "Leon Pllana IT-Solutions | Strategischer Digitalisierungspartner",
  headline: "Innovation in every Step.",
  description: businessDescription,
  inLanguage: "de-DE",
  about: { "@id": `${siteUrl}/#organization` },
  mainEntity: { "@id": `${siteUrl}/#service` },
  primaryImageOfPage: `${siteUrl}/og-image.png`,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#aeo-summary"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, serviceSchema, faqSchema, webPageSchema],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${inter.variable} noise font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
