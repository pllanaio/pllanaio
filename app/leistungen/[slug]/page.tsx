import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/services/service-detail-content";
import { serviceLinks } from "@/lib/services/catalog";
import { getServicePage } from "@/lib/services/pages";
import { getServiceMetadata, getServiceStructuredData, serializeJsonLd } from "@/lib/services/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceLinks.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();
  return getServiceMetadata(service);
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(getServiceStructuredData(service)) }}
      />
      <ServiceDetailContent service={service} />
    </>
  );
}
