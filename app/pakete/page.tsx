import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { ServicePackages } from "@/components/service-packages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { servicePackages } from "@/lib/service-packages";

const siteUrl = "https://pllana.io";
const url = `${siteUrl}/pakete`;
const title = "IT-Pakete & laufende Betreuung | Leon Pllana IT-Solutions";
const description = "Web Care, Workplace Care, Cloud & App Care und individuelle Lösungen: transparente Pakete für laufende IT-Betreuung und digitale Weiterentwicklung.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Leon Pllana IT-Solutions", locale: "de_DE", type: "website", images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Leon Pllana IT-Solutions" }] },
  twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/og-image.png`] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: "de",
      publisher: { "@id": `${siteUrl}/#organization` },
      mainEntity: { "@id": `${url}#packages` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "ItemList",
      "@id": `${url}#packages`,
      name: "IT-Betreuungspakete",
      itemListElement: servicePackages.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@type": "Service", name: item.name, provider: { "@id": `${siteUrl}/#organization` } },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Pakete", item: url },
      ],
    },
  ],
};

export default function PackagesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <SiteHeader />
      <main className="min-h-screen bg-background text-foreground">
        <section className="px-6 pb-10 pt-28 sm:pt-36">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-10 text-sm text-muted-foreground"><ol className="flex gap-2"><li><Link href="/" className="underline underline-offset-4">Startseite</Link></li><li aria-hidden="true">/</li><li aria-current="page">Pakete</li></ol></nav>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Pakete & Betreuung</p>
            <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Planbare Verantwortung statt einzelner IT-Tickets.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">Die Pakete bündeln einen klar definierten Betreuungsumfang. Preise bleiben transparent, während im Vordergrund steht, welche Systeme wir betreuen und welche Verantwortung wir übernehmen.</p>
            <div className="mt-8"><Button asChild variant="outline"><Link href="/leistungen">Einzelleistungen ansehen<ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
          </div>
        </section>
        <ServicePackages />
      </main>
      <SiteFooter />
    </>
  );
}
