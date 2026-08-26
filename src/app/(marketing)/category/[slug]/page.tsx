import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getPostsByCategory } from "@/lib/posts-service";
import { PostCard } from "@/components/content-cards";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);
  return { title: category ? category.name : "Category" };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const posts = await getPostsByCategory(slug);

  return (
    <section className="container-shell py-16">
      <h1 className="section-title">{category.name}</h1>
      <p className="section-copy mt-3">Stories and market notes from {category.name}.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
