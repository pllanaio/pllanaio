import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { CookieBanner } from "@/components/cookie-banner";
import { LocaleProvider } from "@/components/locale-provider";
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
    languages: {
      de: siteUrl,
      en: `${siteUrl}/?lang=en`,
      sq: `${siteUrl}/?lang=sq`,
      "x-default": siteUrl,
    },
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
  sameAs: ["https://instagram.com/pllanaio", "https://www.linkedin.com/in/leon-pllana/"],
};

const serviceSchema = {
  "@type": "Service",
  "@id": `${siteUrl}/#service`,
  name: "Strategische Digitalisierung und IT-Beratung für B2B-Unternehmen",
  provider: { "@id": `${siteUrl}/#organization` },
  areaServed: ["Deutschland", "Bayern", "München", "Fürstenfeldbruck", "Österreich", "Schweiz", "Europa"],
  description:
    "Leon Pllana IT-Solutions analysiert Unternehmen, versteht Prozesse, identifiziert Ineffizienzen und entwickelt darauf aufbauend passende technologische Lösungen. Die Leistung richtet sich ausschließlich an B2B-Kunden.",
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
  ],
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
          <LocaleProvider>
            {children}
            <CookieBanner />
            <Analytics />
          </LocaleProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
