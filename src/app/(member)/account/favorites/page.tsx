import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentMember } from "@/lib/member-auth";
import { getPublishedListings } from "@/lib/listings-service";
import { ListingCard } from "@/components/listing-card";

export default async function FavoritesPage() {
  const member = await getCurrentMember();
  if (!member) redirect("/?auth=login");
  const listings = await getPublishedListings();
  const favorites = listings.filter((listing) => member.favoriteListingIds.includes(listing.id) || member.favoriteListingIds.includes(listing.slug));

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      <aside className="space-y-3 text-sm">
        <Link href="/account" className="block hover:text-[var(--gold-dark)]">
          Profile
        </Link>
        <Link href="/account/favorites" className="block text-[var(--gold-dark)]">
          Favorites
        </Link>
      </aside>
      <div>
        <h1 className="section-title">Saved homes</h1>
        {favorites.length === 0 ? (
          <p className="mt-6 text-[var(--muted)]">You have not saved any listings yet.</p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {favorites.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
