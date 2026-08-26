import Link from "next/link";
import { RemoteImage } from "@/components/remote-image";
import type { PublicNeighborhood, PublicPost } from "@/types/content";

export function NeighborhoodCard({ neighborhood }: { neighborhood: PublicNeighborhood }) {
  return (
    <Link href={`/${neighborhood.slug}`} className="group block overflow-hidden border border-[var(--stone)] bg-white">
      <div className="relative h-52 bg-[var(--stone)]">
        <RemoteImage src={neighborhood.heroImage} alt={neighborhood.name} className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-5">
        <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[var(--navy)]">{neighborhood.headline || neighborhood.name}</h3>
        <p className="mt-2 text-xs uppercase tracking-widest text-[var(--muted)]">{neighborhood.stats}</p>
      </div>
    </Link>
  );
}

export function PostCard({ post }: { post: PublicPost }) {
  return (
    <Link href={`/${post.slug}`} className="block border border-[var(--stone)] bg-white p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--gold-dark)]">{post.category}</p>
      <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl text-[var(--navy)]">{post.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm text-[var(--muted)]">{post.excerpt}</p>
      <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--navy)]">Read article</span>
    </Link>
  );
}
