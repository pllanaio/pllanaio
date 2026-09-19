import { ContentHubPage } from "@/components/content-hub-page";
import { getHub, getHubMetadata, getHubStructuredData, serializeJsonLd } from "@/lib/content-hubs";

const content = getHub("it-risiken");

export const metadata = getHubMetadata(content);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(getHubStructuredData(content)) }} />
      <ContentHubPage content={content} />
    </>
  );
}
