import type { Metadata } from "next";
import { getNeighborhoods } from "@/lib/neighborhoods-service";
import { NeighborhoodCard } from "@/components/content-cards";

export const metadata: Metadata = {
  title: "Neighborhoods",
  description: "Explore exclusive Texas luxury neighborhoods curated by Dream Home Collections."
};

export default async function NeighborhoodsPage() {
  const neighborhoods = await getNeighborhoods();
  return (
    <section className="container-shell py-16">
      <h1 className="section-title">Exclusive Subdivisions</h1>
      <p className="section-copy mt-3 max-w-2xl">
        From Highland Park to Celina, browse the communities where Texas luxury lives.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {neighborhoods.map((neighborhood) => (
          <NeighborhoodCard key={neighborhood.slug} neighborhood={neighborhood} />
        ))}
      </div>
    </section>
  );
}
