import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPageBody } from "@/components/legal/legal-page-body";
import { legalPages } from "@/data/legal-pages";

const descriptions: Record<string, string> = {
  iabs: "Texas Information About Brokerage Services (IABS) for Dream Home Collections.",
  "consumer-protection-notice":
    "Texas Real Estate Commission Consumer Protection Notice — key rights and resources.",
  "mls-rules-and-regulations": "Full Texas REALTORS MLS Rules and Regulations document.",
  "mls-rule-schedule-of-fines": "Texas REALTORS MLS Rule Schedule of Fines for administrative sanctions.",
  "fair-housing": "Fair Housing rules and guidelines for listings, advertising, and conduct on Dream Home Collections."
};

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = legalPages.find((item) => item.slug === slug);
  if (!page) return {};
  return {
    title: page.title,
    description: descriptions[slug],
    alternates: {
      canonical: `/resources/legal/${page.slug}`
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = legalPages.find((item) => item.slug === slug);
  if (!page) return notFound();

  return <LegalPageBody slug={slug} updatedAt={page.updatedAt} fallbackTitle={page.title} />;
}
