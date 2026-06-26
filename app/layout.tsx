import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const siteUrl = "https://pllana.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Leon Pllana IT-Solutions | Strategischer Digitalisierungspartner",
    template: "%s | Leon Pllana IT-Solutions",
  },
  description:
    "Leon Pllana IT-Solutions entwickelt Unternehmen nachhaltig weiter: Digitalisierungsberatung, Prozessoptimierung, IT-Strategie, Microsoft 365, Cloud, Cyber Security, Automatisierung und KI.",
  applicationName: "Leon Pllana IT-Solutions",
  authors: [{ name: "Leon Pllana", url: siteUrl }],
  creator: "Leon Pllana IT-Solutions",
  publisher: "Leon Pllana IT-Solutions",
  category: "Technology Consulting",
  keywords: [
    "Leon Pllana IT-Solutions",
    "Digitalisierungsberatung",
    "Digitalisierung Mittelstand",
    "IT-Beratung",
    "IT-Strategie",
    "Prozessoptimierung",
    "Automatisierung",
    "Microsoft 365 Beratung",
    "Cloud Beratung",
    "Cyber Security",
    "KI im Unternehmen",
    "Digital Workplace",
    "Fürstenfeldbruck",
    "München",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Leon Pllana IT-Solutions | Innovation in every Step.",
    description:
      "Technologie folgt dem Prozess. Strategische Digitalisierung, IT-Architektur und Automatisierung für Unternehmen, die nachhaltig besser funktionieren sollen.",
    url: siteUrl,
    siteName: "Leon Pllana IT-Solutions",
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Leon Pllana IT-Solutions",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  slogan: "Innovation in every Step.",
  description:
    "Strategischer Digitalisierungspartner für Digitalisierungsberatung, Prozessoptimierung, IT-Strategie, Cloud, Cyber Security, Automatisierung und KI.",
  email: "info@pllana.io",
  telephone: "+491727255810",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rothschwaiger Straße 4",
    postalCode: "82256",
    addressLocality: "Fürstenfeldbruck",
    addressCountry: "DE",
  },
  areaServed: ["Deutschland", "Österreich", "Schweiz", "Europa"],
  sameAs: ["https://instagram.com/pllanaio", "https://www.linkedin.com/in/leon-pllana/"],
  knowsAbout: [
    "Digitalisierungsberatung",
    "IT-Strategie",
    "Prozessoptimierung",
    "Microsoft 365",
    "Cloud",
    "Cyber Security",
    "Automatisierung",
    "Softwareentwicklung",
    "Künstliche Intelligenz",
  ],
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
