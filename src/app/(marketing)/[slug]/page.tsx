import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingDetail } from "@/components/listing-detail";
import { NeighborhoodDetail } from "@/components/neighborhood-detail";
import { PostDetail } from "@/components/post-detail";
import { resolveSlug } from "@/lib/content-resolver";
import { getListingsByNeighborhood, getPublishedListings } from "@/lib/listings-service";
import { getNeighborhoods } from "@/lib/neighborhoods-service";
import { getPublishedPosts } from "@/lib/posts-service";
import { site } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const [listings, neighborhoods, posts] = await Promise.all([
    getPublishedListings(),
    getNeighborhoods(),
    getPublishedPosts()
  ]);
  return [...listings, ...neighborhoods, ...posts].map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveSlug(slug);
  if (resolved.kind === "listing") {
    return {
      title: resolved.listing.seoTitle || resolved.listing.title,
      description: resolved.listing.seoDescription,
      openGraph: { images: resolved.listing.imageUrl ? [resolved.listing.imageUrl] : [] }
    };
  }
  if (resolved.kind === "neighborhood") {
    return {
      title: resolved.neighborhood.seoTitle || resolved.neighborhood.headline,
      description: resolved.neighborhood.seoDescription
    };
  }
  if (resolved.kind === "post") {
    return {
      title: resolved.post.seoTitle || resolved.post.title,
      description: resolved.post.seoDescription || resolved.post.excerpt
    };
  }
  return { title: site.name };
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const resolved = await resolveSlug(slug);

  if (resolved.kind === "listing") {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: resolved.listing.title,
      url: `${site.url}/${resolved.listing.slug}`,
      description: resolved.listing.seoDescription,
      image: resolved.listing.imageUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: resolved.listing.address,
        addressLocality: resolved.listing.city,
        addressRegion: resolved.listing.state
      }
    };
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ListingDetail listing={resolved.listing} />
      </>
    );
  }

  if (resolved.kind === "neighborhood") {
    let listings = await getListingsByNeighborhood(resolved.neighborhood.slug);
    if (listings.length === 0 && resolved.neighborhood.listingSlugs.length > 0) {
      const all = await getPublishedListings();
      listings = all.filter((item) => resolved.neighborhood.listingSlugs.includes(item.slug));
    }
    return <NeighborhoodDetail neighborhood={resolved.neighborhood} listings={listings} />;
  }

  if (resolved.kind === "post") {
    const related = (await getPublishedPosts())
      .filter((item) => item.slug !== resolved.post.slug && item.categorySlug === resolved.post.categorySlug)
      .slice(0, 2);
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: resolved.post.title,
      datePublished: resolved.post.publishedAt,
      description: resolved.post.seoDescription || resolved.post.excerpt
    };
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <PostDetail post={resolved.post} related={related} />
      </>
    );
  }

  notFound();
}
