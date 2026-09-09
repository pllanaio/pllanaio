import type { Metadata, MetadataRoute } from "next";
import { serviceLinks } from "./catalog";
import type { ServicePage } from "./types";

const siteUrl = "https://pllana.io";
const businessName = "Leon Pllana IT-Solutions";
const overviewUrl = `${siteUrl}/leistungen`;
const organizationId = `${siteUrl}/#organization`;
const overviewTitle = "IT-Leistungen für KMU in München und Umgebung";
const overviewDescription =
  "Website-Erstellung und Wartung, Microsoft 365 mit Intune, Cloud-Betreuung und individuelle Software: IT-Leistungen für KMU in München und 50 km Umland.";

function pageMetadata(title: string, description: string, url: string): Metadata {
  const fullTitle = `${title} | ${businessName}`;

  return {
    title: { absolute: fullTitle },
    description,
    // The locale switch is client-side. These pages have one indexable German URL.
    alternates: { canonical: url, languages: {} },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: businessName,
      locale: "de_DE",
      type: "website",
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: businessName }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

export const servicesOverviewMetadata = pageMetadata(overviewTitle, overviewDescription, overviewUrl);

export function getServiceMetadata(service: ServicePage): Metadata {
  return pageMetadata(service.copy.de.seoTitle, service.copy.de.seoDescription, `${siteUrl}${service.href}`);
}

function breadcrumbs(items: readonly { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getServiceStructuredData(service: ServicePage) {
  const url = `${siteUrl}${service.href}`;
  const serviceId = `${url}#service`;
  const pageId = `${url}#webpage`;
  const breadcrumbId = `${url}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": serviceId,
        name: service.name,
        serviceType: service.copy.de.heading,
        description: service.copy.de.intro,
        url,
        provider: { "@id": organizationId },
        areaServed: { "@type": "Place", name: "München und 50 km Umland" },
        mainEntityOfPage: { "@id": pageId },
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url,
        name: service.copy.de.seoTitle,
        description: service.copy.de.seoDescription,
        inLanguage: "de",
        mainEntity: { "@id": serviceId },
        publisher: { "@id": organizationId },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@id": breadcrumbId,
        ...breadcrumbs([
          { name: "Startseite", url: siteUrl },
          { name: "Leistungen", url: overviewUrl },
          { name: service.name, url },
        ]),
      },
    ],
  } as const;
}

export function getServicesOverviewStructuredData() {
  const listId = `${overviewUrl}#services`;
  const breadcrumbId = `${overviewUrl}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${overviewUrl}#webpage`,
        url: overviewUrl,
        name: overviewTitle,
        description: overviewDescription,
        inLanguage: "de",
        publisher: { "@id": organizationId },
        mainEntity: { "@id": listId },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "ItemList",
        "@id": listId,
        name: "IT-Leistungen für Unternehmen",
        numberOfItems: serviceLinks.length,
        itemListElement: serviceLinks.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            "@id": `${siteUrl}${service.href}#service`,
            name: service.name,
            url: `${siteUrl}${service.href}`,
          },
        })),
      },
      {
        "@id": breadcrumbId,
        ...breadcrumbs([
          { name: "Startseite", url: siteUrl },
          { name: "Leistungen", url: overviewUrl },
        ]),
      },
    ],
  } as const;
}

export function getServiceSitemapEntries(): MetadataRoute.Sitemap {
  // No lastModified date is asserted without a known content revision date.
  return [
    { url: overviewUrl, changeFrequency: "monthly", priority: 0.9 },
    ...serviceLinks.map((service) => ({
      url: `${siteUrl}${service.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
