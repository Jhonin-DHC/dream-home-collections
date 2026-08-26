import { getFeaturedListings } from "@/lib/listings-service";
import { getNeighborhoods } from "@/lib/neighborhoods-service";
import { getPublishedPosts } from "@/lib/posts-service";
import { ListingCard } from "@/components/listing-card";
import { InquiryForm } from "@/components/inquiry-form";
import { NeighborhoodCard, PostCard } from "@/components/content-cards";
import { site } from "@/lib/site";

export default async function HomePage() {
  const [listings, neighborhoods, posts] = await Promise.all([
    getFeaturedListings(),
    getNeighborhoods(),
    getPublishedPosts()
  ]);

  return (
    <>
      <section className="bg-[var(--navy)] py-20 text-center text-[var(--ivory)]">
        <div className="container-shell">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Texas luxury real estate</p>
          <h1 className="mt-4 font-[family-name:var(--font-serif)] text-5xl md:text-7xl">{site.tagline}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[var(--stone)]">{site.description}</p>
        </div>
      </section>

      <section className="container-shell py-16">
        <h2 className="section-title mb-8">Featured collections</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>

      <section className="bg-[var(--cream)] py-16">
        <div className="container-shell">
          <h2 className="section-title mb-3">Explore Our Exclusive Subdivisions</h2>
          <p className="section-copy mb-8 max-w-3xl">
            Tucked into North Texas’s most desirable enclaves, these communities offer gated privacy, custom estates, and
            lasting value.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {neighborhoods.map((neighborhood) => (
              <NeighborhoodCard key={neighborhood.slug} neighborhood={neighborhood} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <h2 className="section-title mb-3">News &amp; Stories</h2>
        <p className="section-copy mb-8 max-w-3xl">
          Discover the latest in luxury real estate through featured home tours, market insights, and exclusive community
          spotlights.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="bg-[var(--navy)] py-16 text-[var(--ivory)]">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-[family-name:var(--font-serif)] text-4xl">Ready to find your dream home?</h2>
            <p className="mt-4 text-[var(--stone)]">
              Let us connect you with hand-picked luxury properties that align with your taste, needs, and lifestyle.
            </p>
            <p className="mt-6 text-sm">
              {site.email}
              <br />
              {site.phone}
            </p>
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-serif)] text-2xl">Your dream home is one message away</h3>
            <div className="mt-4">
              <InquiryForm source="home" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
