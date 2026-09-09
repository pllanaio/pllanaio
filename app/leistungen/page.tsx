import { ServicesOverviewContent } from "@/components/services/services-overview-content";
import { getServicesOverviewStructuredData, serializeJsonLd, servicesOverviewMetadata } from "@/lib/services/seo";

export const metadata = servicesOverviewMetadata;

export default function ServicesOverviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(getServicesOverviewStructuredData()) }}
      />
      <ServicesOverviewContent />
    </>
  );
}
