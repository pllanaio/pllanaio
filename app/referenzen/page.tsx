import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { PartnerLogoMarquee } from "@/components/partner-logo-marquee";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { partnerCompanies } from "@/lib/site-content";

const siteUrl = "https://pllana.io";
const url = `${siteUrl}/referenzen`;
const title = "Referenzen & Projektszenarien | Leon Pllana IT-Solutions";
const description = "Referenzunternehmen und typische Projektszenarien aus Digitalisierung, Microsoft 365, Automatisierung, Software, Cloud und IT-Sicherheit.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Leon Pllana IT-Solutions", locale: "de_DE", type: "website", images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Leon Pllana IT-Solutions" }] },
  twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/og-image.png`] },
};

const scenarios = [
  { tag: "Prozesse & Microsoft 365", title: "Von manuellen Abläufen zu klaren digitalen Prozessen.", text: "Typisches Szenario: gewachsene Excel- und E-Mail-Abläufe werden analysiert, Zuständigkeiten geklärt und wiederkehrende Freigaben oder Datentransfers strukturiert digitalisiert." },
  { tag: "CRM & Integration", title: "Mehr Transparenz zwischen Vertrieb, Projekt und Abrechnung.", text: "Typisches Szenario: Informationen aus CRM, Projektmanagement oder Dokumentation werden über Schnittstellen verbunden, damit Daten dort verfügbar sind, wo sie gebraucht werden." },
  { tag: "Cloud & Security", title: "Betriebssicherheit für wachsende Systeme.", text: "Typisches Szenario: bestehende Infrastruktur wird hinsichtlich Backup, Monitoring, Berechtigungen und Verantwortlichkeiten bewertet und schrittweise verbessert." },
];

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
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "ItemList",
      name: "Referenzunternehmen",
      itemListElement: partnerCompanies.map((partner, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@type": "Organization", name: partner.name, ...(partner.url ? { url: partner.url } : {}) },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Referenzen", item: url },
      ],
    },
  ],
};

export default function ReferencesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <SiteHeader />
      <main className="min-h-screen bg-background text-foreground">
        <section className="px-6 pb-16 pt-28 sm:pt-36">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-10 text-sm text-muted-foreground"><ol className="flex gap-2"><li><Link href="/" className="underline underline-offset-4">Startseite</Link></li><li aria-hidden="true">/</li><li aria-current="page">Referenzen</li></ol></nav>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Referenzen</p>
            <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Zusammenarbeit wird sichtbar, wenn Systeme im Alltag funktionieren.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">Hier finden Sie Unternehmen, mit denen wir zusammenarbeiten, und typische Projektszenarien, die zeigen, welche Aufgaben wir in Digitalisierungs- und IT-Projekten lösen.</p>
          </div>
        </section>
        <section className="border-y border-border bg-muted/25 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-semibold tracking-[-0.045em]">Referenzunternehmen</h2>
            <div className="mt-8"><PartnerLogoMarquee /></div>
          </div>
        </section>
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="max-w-4xl text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Typische Projektbilder</h2>
            <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">Die folgenden Beispiele beschreiben typische Aufgabenfelder und sind bewusst nicht als konkrete, einzelnen Referenzkunden zugeordnete Fallstudien dargestellt.</p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {scenarios.map((item) => <article key={item.title} className="rounded-3xl border border-border bg-card p-7 shadow-premium"><p className="text-sm font-medium text-muted-foreground">{item.tag}</p><h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">{item.title}</h3><p className="mt-4 leading-7 text-muted-foreground">{item.text}</p></article>)}
            </div>
          </div>
        </section>
        <section className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-foreground p-8 text-background sm:p-12">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.045em]">Ihr Ausgangspunkt muss nicht wie ein bestehendes Projekt aussehen.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-background/70">Beschreiben Sie das Problem oder Ziel. Wir klären gemeinsam, welcher nächste Schritt sinnvoll ist.</p>
            <Button asChild size="lg" variant="secondary" className="mt-7"><Link href="/#kontakt">Vorhaben besprechen<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
