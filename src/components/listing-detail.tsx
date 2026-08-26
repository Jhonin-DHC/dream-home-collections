import { FavoriteButton } from "@/components/favorite-button";
import { InquiryForm } from "@/components/inquiry-form";
import { ListingImageGallery } from "@/components/listing-image-gallery";
import { listingPriceDisplay } from "@/lib/listings-service";
import { formatNumber } from "@/lib/slug";
import { site } from "@/lib/site";
import type { PublicListing } from "@/types/content";

export function ListingDetail({ listing }: { listing: PublicListing }) {
  const bathsLabel = listing.bathsHalf ? `${listing.baths} Full, ${listing.bathsHalf} Half` : listing.baths ? String(listing.baths) : "—";
  const stats = [
    listing.beds ? `${listing.beds} Beds` : null,
    listing.baths ? `${listing.baths + listing.bathsHalf} Baths` : null,
    listing.sqft ? `${formatNumber(listing.sqft)} Sq Ft` : null,
    listing.lotAcres ? `${listing.lotAcres} Acres` : null
  ].filter(Boolean);

  const specs = [
    ["Address", listing.address],
    ["City", `${listing.city}, ${listing.state}`],
    ["Price", listingPriceDisplay(listing)],
    ["MLS", listing.mlsNumber || "—"],
    ["Square Footage", listing.sqft ? `${formatNumber(listing.sqft)} sq ft` : "—"],
    ["Lot Size", listing.lotAcres ? `${listing.lotAcres} acres` : "—"],
    ["Year Built", listing.yearBuilt ? String(listing.yearBuilt) : "—"],
    ["HOA", listing.hoa || "—"],
    ["Bedrooms", listing.beds ? String(listing.beds) : "—"],
    ["Bathrooms", bathsLabel]
  ];

  return (
    <article>
      <section className="bg-[var(--navy)] py-14 text-[var(--ivory)]">
        <div className="container-shell">
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--gold)]">{listing.city}, {listing.state}</p>
          <h1 className="mt-3 font-[family-name:var(--font-serif)] text-5xl md:text-6xl">{listingPriceDisplay(listing)}</h1>
          <h2 className="mt-3 text-2xl">{listing.address}{listing.city ? `, ${listing.city}, ${listing.state}` : ""}</h2>
          <p className="mt-4 text-sm uppercase tracking-widest text-[var(--stone)]">{stats.join(" • ")}</p>
          <div className="mt-6">
            <FavoriteButton listingId={listing.id} />
          </div>
        </div>
      </section>

      <section className="container-shell py-10">
        <h3 className="section-title mb-5">Extraordinary Estate Gallery</h3>
        <ListingImageGallery name={listing.title} imageUrl={listing.imageUrl} imageUrls={listing.imageUrls} />
      </section>

      <section className="container-shell grid gap-10 py-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="prose-dhc" dangerouslySetInnerHTML={{ __html: listing.description }} />
        <aside className="space-y-6">
          <div className="border border-[var(--stone)] bg-white p-6">
            <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[var(--navy)]">Property Details</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {specs.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-[var(--stone)] py-2">
                  <dt className="text-[var(--muted)]">{label}</dt>
                  <dd className="text-right font-medium">{value}</dd>
                </div>
              ))}
            </dl>
            {listing.features.length > 0 ? (
              <ul className="mt-5 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                {listing.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="bg-[var(--cream)] p-6">
            <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[var(--navy)]">Schedule a tour</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Email {site.email} or call {site.phone}, or send a message below.
            </p>
            <div className="mt-4">
              <InquiryForm listingId={listing.id} listingSlug={listing.slug} listingTitle={listing.title} source="listing-tour" />
            </div>
          </div>
        </aside>
      </section>
    </article>
  );
}
