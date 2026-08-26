import Link from "next/link";
import { listingPriceDisplay } from "@/lib/listings-service";
import { formatNumber } from "@/lib/slug";
import { RemoteImage } from "@/components/remote-image";
import type { PublicListing } from "@/types/content";

export function ListingCard({ listing }: { listing: PublicListing }) {
  const href = listing.externalUrl || `/${listing.slug}`;
  const external = Boolean(listing.externalUrl);
  const stats = [
    listing.beds ? `${listing.beds} beds` : null,
    listing.baths ? `${listing.baths} baths` : null,
    listing.rooms ? `${listing.rooms} rooms` : null,
    listing.sqft ? `${formatNumber(listing.sqft)} SqFt` : null,
    listing.lotAcres ? `${listing.lotAcres} acres` : null
  ].filter(Boolean);

  return (
    <article className="group overflow-hidden border border-[var(--stone)] bg-white">
      <Link href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="block">
        <div className="relative h-56 w-full overflow-hidden bg-[var(--stone)]">
          <RemoteImage src={listing.imageUrl} alt={listing.title} className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
          {listing.status === "coming-soon" ? (
            <span className="absolute left-3 top-3 bg-[var(--gold)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--navy)]">
              Coming Soon
            </span>
          ) : null}
        </div>
        <div className="space-y-2 p-5">
          <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[var(--navy)]">{listing.title}</h3>
          <p className="text-xs uppercase tracking-widest text-[var(--muted)]">{stats.join(" · ")}</p>
          <p className="line-clamp-3 text-sm text-[var(--muted)]" dangerouslySetInnerHTML={{ __html: listing.description.replace(/<[^>]+>/g, " ").slice(0, 160) }} />
          <p className="pt-2 text-lg font-semibold text-[var(--navy)]">{listingPriceDisplay(listing)}</p>
          <span className="inline-block pt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-dark)]">
            {external ? "More Details" : listing.status === "coming-soon" ? "Coming Soon" : "View Details"}
          </span>
        </div>
      </Link>
    </article>
  );
}
