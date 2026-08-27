import type { Metadata } from "next";
import { ServiceAreaPageContent } from "@/components/service-area/service-area-page-content";
import { getServiceAreaCopy } from "@/i18n/service-area-copy";

const copy = getServiceAreaCopy();

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description
  }
};

export default function ServiceAreaPage() {
  return <ServiceAreaPageContent />;
}
