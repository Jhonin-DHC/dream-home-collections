import { connectMongo, isMongoConfigured } from "@/lib/mongodb";
import { normalizePublicImageUrl } from "@/lib/r2";
import { rewriteLegacyWpMediaInText } from "@/lib/wp-media";
import { Post } from "@/models/Post";
import { seedPosts } from "@/data/posts";
import type { PublicPost } from "@/types/content";

function withPublicMedia(post: PublicPost): PublicPost {
  return {
    ...post,
    featuredImage: normalizePublicImageUrl(post.featuredImage),
    body: rewriteLegacyWpMediaInText(post.body)
  };
}

function fromDoc(doc: Record<string, unknown>): PublicPost {
  const publishedAt = doc.publishedAt instanceof Date ? doc.publishedAt.toISOString() : String(doc.publishedAt ?? "");
  return {
    id: String(doc._id ?? doc.id ?? doc.slug),
    slug: String(doc.slug ?? ""),
    title: String(doc.title ?? ""),
    excerpt: String(doc.excerpt ?? ""),
    body: rewriteLegacyWpMediaInText(String(doc.body ?? "")),
    category: String(doc.category ?? "Dallas"),
    categorySlug: String(doc.categorySlug ?? "dallas"),
    featuredImage: normalizePublicImageUrl(String(doc.featuredImage ?? "")),
    publishedAt,
    seoTitle: String(doc.seoTitle ?? ""),
    seoDescription: String(doc.seoDescription ?? "")
  };
}

export async function getPublishedPosts(): Promise<PublicPost[]> {
  try {
    if (!isMongoConfigured()) return seedPosts.map(withPublicMedia);
    await connectMongo();
    const docs = await Post.find({ published: true }).sort({ publishedAt: -1 }).lean();
    if (docs.length === 0) return seedPosts.map(withPublicMedia);
    return docs.map((doc) => fromDoc(doc as Record<string, unknown>));
  } catch {
    return seedPosts.map(withPublicMedia);
  }
}

export async function getPostBySlug(slug: string): Promise<PublicPost | null> {
  const posts = await getPublishedPosts();
  return posts.find((item) => item.slug === slug) ?? null;
}

export async function getPostsByCategory(categorySlug: string): Promise<PublicPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter((item) => item.categorySlug === categorySlug);
}

export async function getCategories() {
  const posts = await getPublishedPosts();
  const map = new Map<string, { name: string; slug: string; count: number }>();
  for (const post of posts) {
    const current = map.get(post.categorySlug);
    if (current) {
      current.count += 1;
    } else {
      map.set(post.categorySlug, { name: post.category, slug: post.categorySlug, count: 1 });
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}
