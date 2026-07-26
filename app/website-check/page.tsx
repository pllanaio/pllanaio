import type { Metadata } from "next";
import { WebsiteCheckPageContent } from "@/components/website-check/website-check-page-content";

const siteUrl = "https://pllana.io";
const pageUrl = `${siteUrl}/website-check`;
const pageTitle = "Kostenloser Website-Check für Unternehmen | Leon Pllana IT-Solutions";
const pageDescription = "Prüfen Sie kostenlos Performance, SEO, Barrierefreiheit und technische Qualität Ihrer Website. Erhalten Sie eine verständliche Auswertung mit konkretem Verbesserungspotenzial.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
    languages: {
      de: pageUrl,
      en: `${pageUrl}?lang=en`,
      sq: `${pageUrl}?lang=sq`,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: "Leon Pllana IT-Solutions",
    locale: "de_DE",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Kostenloser Website-Check von Leon Pllana IT-Solutions" }],
  },
  twitter: { card: "summary_large_image", title: pageTitle, description: pageDescription, images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: pageTitle,
  url: pageUrl,
  description: pageDescription,
  inLanguage: ["de-DE", "en", "sq"],
  isPartOf: { "@type": "WebSite", name: "Leon Pllana IT-Solutions", url: siteUrl },
  mainEntity: {
    "@type": "WebApplication",
    name: "Kostenloser Website-Check",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  },
};

export default async function WebsiteCheckPage({ searchParams }: { searchParams: Promise<{ marketing?: string }> }) {
  const { marketing } = await searchParams;
  return (
    <>
      <WebsiteCheckPageContent marketing={marketing} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
    </>
  );
}
