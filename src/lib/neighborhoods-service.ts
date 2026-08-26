import { connectMongo, isMongoConfigured } from "@/lib/mongodb";
import { normalizePublicImageUrl } from "@/lib/r2";
import { Neighborhood } from "@/models/Neighborhood";
import { seedNeighborhoods } from "@/data/neighborhoods";
import type { PublicNeighborhood } from "@/types/content";

function fromDoc(doc: Record<string, unknown>): PublicNeighborhood {
  return {
    id: String(doc._id ?? doc.id ?? doc.slug),
    slug: String(doc.slug ?? ""),
    name: String(doc.name ?? ""),
    headline: String(doc.headline ?? ""),
    city: String(doc.city ?? ""),
    heroImage: normalizePublicImageUrl(String(doc.heroImage ?? "")),
    body: String(doc.body ?? ""),
    listingSlugs: Array.isArray(doc.listingSlugs) ? doc.listingSlugs.map(String) : [],
    stats: String(doc.stats ?? ""),
    seoTitle: String(doc.seoTitle ?? ""),
    seoDescription: String(doc.seoDescription ?? "")
  };
}

export async function getNeighborhoods(): Promise<PublicNeighborhood[]> {
  try {
    if (!isMongoConfigured()) return seedNeighborhoods;
    await connectMongo();
    const docs = await Neighborhood.find({ published: true }).sort({ name: 1 }).lean();
    if (docs.length === 0) return seedNeighborhoods;
    return docs.map((doc) => fromDoc(doc as Record<string, unknown>));
  } catch {
    return seedNeighborhoods;
  }
}

export async function getNeighborhoodBySlug(slug: string): Promise<PublicNeighborhood | null> {
  const neighborhoods = await getNeighborhoods();
  return neighborhoods.find((item) => item.slug === slug) ?? null;
}
