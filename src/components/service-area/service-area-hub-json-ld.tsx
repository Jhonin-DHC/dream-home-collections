import { site } from "@/lib/site";
import { TOTAL_SERVICE_COUNT } from "@/lib/service-area";

export function ServiceAreaHubJsonLd() {
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${site.url}/service-area#webpage`,
      url: `${site.url}/service-area`,
      name: "Dream Home Collections Texas Service Area",
      description:
        "Dream Home Collections Texas luxury home coverage including DFW primary counties, extended Texas support, and Houston HAR market reference.",
      isPartOf: { "@id": `${site.url}/#website` }
    },
    {
      "@type": "ItemList",
      "@id": `${site.url}/service-area#coverage`,
      name: "Texas service counties",
      numberOfItems: TOTAL_SERVICE_COUNT
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph })
      }}
    />
  );
}
