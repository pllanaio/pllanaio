import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { CookieBanner } from "@/components/cookie-banner";
import { GlobalPreferences } from "@/components/global-preferences";
import { LocaleProvider } from "@/components/locale-provider";
import { OfferSelectionProvider } from "@/components/offer-selection-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { GTM_ID } from "@/lib/tracking";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const siteUrl = "https://pllana.io";
const businessName = "Leon Pllana IT-Solutions";
const founderId = `${siteUrl}/#leon-pllana`;
const businessDescription =
  "Leon Pllana IT-Solutions ist ein strategischer Digitalisierungspartner aus Fürstenfeldbruck bei München. Das Unternehmen unterstützt B2B-Kunden bei Digitalisierungsberatung, Prozessoptimierung, IT-Strategie, Microsoft 365, Cloud, Cyber Security, Automatisierung, Softwareentwicklung, API-Integration und KI. Technologie folgt dabei immer dem Prozess.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Digitalisierung & IT, die im Alltag funktioniert | Leon Pllana IT-Solutions",
    template: "%s | Leon Pllana IT-Solutions",
  },
  description:
    "Weniger manuelle Arbeit, klarere Prozesse und verlässlich betreute IT: Microsoft 365, Automatisierung, Cloud, Security und Software.",
  applicationName: businessName,
  manifest: "/manifest.webmanifest",
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
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Ihre IT sollte Probleme lösen – nicht neue schaffen. | Leon Pllana IT-Solutions",
    description:
      "Prozesse vereinfachen, Systeme verbinden und IT verlässlich betreiben: Microsoft 365, Automatisierung, Cloud, Security und Software.",
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
    title: "Ihre IT sollte Probleme lösen – nicht neue schaffen. | Leon Pllana IT-Solutions",
    description:
      "Digitalisierung und IT: Prozessoptimierung, Microsoft 365, Automatisierung, Cloud, Security und Software aus einer Hand.",
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

const personSchema = {
  "@type": "Person",
  "@id": founderId,
  name: "Leon Pllana",
  jobTitle: "Founder, Digitalisierungspartner und IT-Architekt",
  url: siteUrl,
  email: "info@pllana.io",
  worksFor: { "@id": `${siteUrl}/#organization` },
  sameAs: ["https://www.linkedin.com/in/leon-pllana/", "https://instagram.com/pllanaio"],
  knowsAbout: [
    "Unternehmensberatung",
    "Digitalisierungsstrategie",
    "Prozessoptimierung",
    "IT-Architektur",
    "Cloud",
    "Cyber Security",
    "Automatisierung",
    "Softwareentwicklung",
    "Künstliche Intelligenz",
  ],
};

const organizationSchema = {
  "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
  "@id": `${siteUrl}/#organization`,
  name: businessName,
  legalName: businessName,
  founder: { "@id": founderId },
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
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales and consulting",
      email: "info@pllana.io",
      telephone: "+491727255810",
      availableLanguage: ["de", "en", "sq"],
      areaServed: ["DE", "AT", "CH", "EU"],
    },
  ],
  areaServed: ["Deutschland", "Bayern", "München", "Fürstenfeldbruck", "Österreich", "Schweiz", "Europa"],
  sameAs: ["https://instagram.com/pllanaio", "https://www.linkedin.com/in/leon-pllana/"],
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [personSchema, organizationSchema],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${inter.variable} noise font-sans antialiased`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LocaleProvider>
            <OfferSelectionProvider>{children}</OfferSelectionProvider>
            <GlobalPreferences />
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
