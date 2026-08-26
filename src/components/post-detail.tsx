import Link from "next/link";
import { RemoteImage } from "@/components/remote-image";
import type { PublicPost } from "@/types/content";

export function PostDetail({ post, related }: { post: PublicPost; related: PublicPost[] }) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "";

  return (
    <article className="container-shell py-14">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold-dark)]">
        <Link href={`/category/${post.categorySlug}`}>{post.category}</Link>
        {date ? ` · ${date}` : ""}
      </p>
      <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-serif)] text-4xl text-[var(--navy)] md:text-5xl">{post.title}</h1>
      {post.featuredImage ? (
        <div className="relative mt-8 h-72 w-full overflow-hidden md:h-96">
          <RemoteImage src={post.featuredImage} alt={post.title} className="object-cover" sizes="100vw" />
        </div>
      ) : null}
      <div className="prose-dhc mx-auto mt-10 max-w-3xl" dangerouslySetInnerHTML={{ __html: post.body }} />
      {related.length > 0 ? (
        <section className="mt-16 border-t border-[var(--stone)] pt-10">
          <h2 className="section-title mb-6">Related stories</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <Link key={item.slug} href={`/${item.slug}`} className="border border-[var(--stone)] p-5">
                <p className="text-xs uppercase tracking-widest text-[var(--gold-dark)]">{item.category}</p>
                <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl text-[var(--navy)]">{item.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
