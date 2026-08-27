import { legalPages } from "@/data/legal-pages";
import { getPublishedListings } from "@/lib/listings-service";
import { getNeighborhoods } from "@/lib/neighborhoods-service";
import { getPublishedPosts } from "@/lib/posts-service";
import { site } from "@/lib/site";

export default async function sitemap() {
  const [listings, neighborhoods, posts] = await Promise.all([
    getPublishedListings(),
    getNeighborhoods(),
    getPublishedPosts()
  ]);

  const staticRoutes = ["", "/neighborhoods", "/our-blogs", "/service-area", "/privacy-policy-page", "/terms-of-service"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date()
    })
  );

  const legalRoutes = legalPages.map((page) => ({
    url: `${site.url}/resources/legal/${page.slug}`,
    lastModified: new Date()
  }));

  const dynamic = [...listings, ...neighborhoods, ...posts].map((item) => ({
    url: `${site.url}/${item.slug}`,
    lastModified: new Date()
  }));

  return [...staticRoutes, ...legalRoutes, ...dynamic];
}
