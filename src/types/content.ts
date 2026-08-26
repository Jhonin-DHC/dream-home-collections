export type ListingStatus = "draft" | "published" | "coming-soon" | "sold";
export type PriceType = "sale" | "rent";

export interface PublicListing {
  id: string;
  slug: string;
  title: string;
  address: string;
  city: string;
  state: string;
  neighborhoodSlug: string;
  status: ListingStatus;
  priceUsd: number;
  priceType: PriceType;
  priceLabel: string;
  beds: number;
  baths: number;
  bathsHalf: number;
  rooms: number;
  sqft: number;
  lotAcres: number;
  yearBuilt: number;
  mlsNumber: string;
  hoa: string;
  features: string[];
  description: string;
  imageUrl: string;
  imageUrls: string[];
  seoTitle: string;
  seoDescription: string;
  featuredOnHome: boolean;
  externalUrl: string;
}

export interface PublicNeighborhood {
  id: string;
  slug: string;
  name: string;
  headline: string;
  city: string;
  heroImage: string;
  body: string;
  listingSlugs: string[];
  stats: string;
  seoTitle: string;
  seoDescription: string;
}

export interface PublicPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  categorySlug: string;
  featuredImage: string;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
}
