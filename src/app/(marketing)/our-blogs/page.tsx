import type { Metadata } from "next";
import { getCategories, getPublishedPosts } from "@/lib/posts-service";
import { PostCard } from "@/components/content-cards";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Blogs",
  description: "Luxury real estate insights across Texas — Dallas, Austin, Houston, and beyond."
};

export default async function BlogsPage() {
  const [posts, categories] = await Promise.all([getPublishedPosts(), getCategories()]);
  return (
    <section className="container-shell py-16">
      <h1 className="section-title">Our Blogs</h1>
      <p className="section-copy mt-3 max-w-2xl">
        Market insights, school guides, and pricing strategy for Texas luxury buyers and sellers.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="border border-[var(--stone)] px-3 py-1 text-xs uppercase tracking-widest text-[var(--navy)]"
          >
            {category.name}
          </Link>
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
