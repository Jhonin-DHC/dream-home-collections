import { connectMongo, isMongoConfigured } from "@/lib/mongodb";
import { normalizePublicImageUrl, normalizePublicImageUrls } from "@/lib/r2";
import { rewriteLegacyWpMediaInText } from "@/lib/wp-media";
import { Listing } from "@/models/Listing";
import { seedListings } from "@/data/listings";
import type { PublicListing } from "@/types/content";

function withPublicMedia(listing: PublicListing): PublicListing {
  return {
    ...listing,
    imageUrl: normalizePublicImageUrl(listing.imageUrl),
    imageUrls: normalizePublicImageUrls(listing.imageUrls),
    description: rewriteLegacyWpMediaInText(listing.description)
  };
}

function fromDoc(doc: Record<string, unknown>): PublicListing {
  return {
    id: String(doc._id ?? doc.id ?? doc.slug),
    slug: String(doc.slug ?? ""),
    title: String(doc.title ?? ""),
    address: String(doc.address ?? ""),
    city: String(doc.city ?? ""),
    state: String(doc.state ?? "TX"),
    neighborhoodSlug: String(doc.neighborhoodSlug ?? ""),
    status: (doc.status as PublicListing["status"]) || "published",
    priceUsd: Number(doc.priceUsd ?? 0),
    priceType: (doc.priceType as PublicListing["priceType"]) || "sale",
    priceLabel: String(doc.priceLabel ?? ""),
    beds: Number(doc.beds ?? 0),
    baths: Number(doc.baths ?? 0),
    bathsHalf: Number(doc.bathsHalf ?? 0),
    rooms: Number(doc.rooms ?? 0),
    sqft: Number(doc.sqft ?? 0),
    lotAcres: Number(doc.lotAcres ?? 0),
    yearBuilt: Number(doc.yearBuilt ?? 0),
    mlsNumber: String(doc.mlsNumber ?? ""),
    hoa: String(doc.hoa ?? ""),
    features: Array.isArray(doc.features) ? doc.features.map(String) : [],
    description: rewriteLegacyWpMediaInText(String(doc.description ?? "")),
    imageUrl: normalizePublicImageUrl(String(doc.imageUrl ?? "")),
    imageUrls: normalizePublicImageUrls(Array.isArray(doc.imageUrls) ? doc.imageUrls.map(String) : []),
    seoTitle: String(doc.seoTitle ?? ""),
    seoDescription: String(doc.seoDescription ?? ""),
    featuredOnHome: Boolean(doc.featuredOnHome),
    externalUrl: String(doc.externalUrl ?? "")
  };
}

export async function getPublishedListings(): Promise<PublicListing[]> {
  try {
    if (!isMongoConfigured()) return seedListings.filter((item) => item.status !== "draft").map(withPublicMedia);
    await connectMongo();
    const docs = await Listing.find({ status: { $ne: "draft" } }).sort({ createdAt: -1 }).lean();
    if (docs.length === 0) return seedListings.filter((item) => item.status !== "draft").map(withPublicMedia);
    return docs.map((doc) => fromDoc(doc as Record<string, unknown>));
  } catch {
    return seedListings.filter((item) => item.status !== "draft").map(withPublicMedia);
  }
}

export async function getListingBySlug(slug: string): Promise<PublicListing | null> {
  const listings = await getPublishedListings();
  return listings.find((item) => item.slug === slug) ?? null;
}

export async function getFeaturedListings(): Promise<PublicListing[]> {
  const listings = await getPublishedListings();
  const featured = listings.filter((item) => item.featuredOnHome);
  return featured.length > 0 ? featured : listings.slice(0, 6);
}

export async function getListingsByNeighborhood(neighborhoodSlug: string): Promise<PublicListing[]> {
  const listings = await getPublishedListings();
  return listings.filter((item) => item.neighborhoodSlug === neighborhoodSlug);
}

export function listingPriceDisplay(listing: PublicListing) {
  if (listing.priceLabel) return listing.priceLabel;
  if (!listing.priceUsd) return "Price upon request";
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(listing.priceUsd);
  if (listing.priceType === "rent") return `${formatted} / Month`;
  return formatted;
}
