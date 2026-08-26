import { ListingCard } from "@/components/listing-card";
import type { PublicListing, PublicNeighborhood } from "@/types/content";

export function NeighborhoodDetail({
  neighborhood,
  listings
}: {
  neighborhood: PublicNeighborhood;
  listings: PublicListing[];
}) {
  return (
    <article>
      <section className="bg-[var(--navy)] py-16 text-[var(--ivory)]">
        <div className="container-shell">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--gold)]">{neighborhood.city}</p>
          <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl md:text-6xl">
            {neighborhood.headline || neighborhood.name}
          </h1>
          {neighborhood.stats ? <p className="mt-4 text-sm uppercase tracking-widest text-[var(--stone)]">{neighborhood.stats}</p> : null}
        </div>
      </section>
      <section className="container-shell grid gap-10 py-12 lg:grid-cols-[1fr_1fr]">
        <div className="prose-dhc" dangerouslySetInnerHTML={{ __html: neighborhood.body }} />
      </section>
      <section className="container-shell pb-16">
        <h2 className="section-title mb-8">Homes in {neighborhood.name}</h2>
        {listings.length === 0 ? (
          <p className="text-[var(--muted)]">Listings for this neighborhood will appear here.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
