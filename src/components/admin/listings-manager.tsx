"use client";

import { useEffect, useState } from "react";
import { slugify } from "@/lib/slug";
import { RemoteImage } from "@/components/remote-image";

interface ListingRow {
  _id: string;
  slug: string;
  title: string;
  address: string;
  city: string;
  state: string;
  neighborhoodSlug: string;
  status: "draft" | "published" | "coming-soon" | "sold";
  priceUsd: number;
  priceType: "sale" | "rent";
  priceLabel: string;
  beds: number;
  baths: number;
  bathsHalf: number;
  rooms: number;
  sqft: number;
  lotAcres: number;
  yearBuilt: number;
  mlsNumber: string;
  hoa: string;
  features: string[];
  description: string;
  imageUrl: string;
  imageUrls: string[];
  seoTitle: string;
  seoDescription: string;
  featuredOnHome: boolean;
  externalUrl: string;
}

const emptyForm: Omit<ListingRow, "_id"> = {
  slug: "",
  title: "",
  address: "",
  city: "",
  state: "TX",
  neighborhoodSlug: "",
  status: "published",
  priceUsd: 0,
  priceType: "sale",
  priceLabel: "",
  beds: 0,
  baths: 0,
  bathsHalf: 0,
  rooms: 0,
  sqft: 0,
  lotAcres: 0,
  yearBuilt: 0,
  mlsNumber: "",
  hoa: "",
  features: [],
  description: "",
  imageUrl: "",
  imageUrls: [],
  seoTitle: "",
  seoDescription: "",
  featuredOnHome: false,
  externalUrl: ""
};

export function ListingsManager() {
  const [listings, setListings] = useState<ListingRow[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const response = await fetch("/api/admin/listings");
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error ?? "Failed to load listings.");
      return;
    }
    setListings(
      (payload.listings ?? []).map((listing: ListingRow) => ({
        ...listing,
        imageUrls: Array.isArray(listing.imageUrls) ? listing.imageUrls : [],
        features: Array.isArray(listing.features) ? listing.features : []
      }))
    );
  };

  useEffect(() => {
    void load();
  }, []);

  const uploadFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;
    setUploading(true);
    setError(null);
    const uploadedUrls: string[] = [];
    for (const file of fileArray) {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "listings");
      const response = await fetch("/api/admin/uploads", { method: "POST", body });
      const payload = await response.json();
      if (response.ok && payload.url) uploadedUrls.push(payload.url as string);
      else setError(payload.error ?? "Upload failed.");
    }
    if (uploadedUrls.length > 0) {
      setForm((current) => {
        if (!current.imageUrl) {
          const [main, ...rest] = uploadedUrls;
          return { ...current, imageUrl: main, imageUrls: [...current.imageUrls, ...rest] };
        }
        return { ...current, imageUrls: [...current.imageUrls, ...uploadedUrls] };
      });
    }
    setUploading(false);
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...form, slug: form.slug || slugify(form.address || form.title) };
    const response = await fetch(editingId ? `/api/admin/listings/${editingId}` : "/api/admin/listings", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const body = await response.json();
    setSaving(false);
    if (!response.ok) {
      setError(body.error ?? "Save failed.");
      return;
    }
    setForm(emptyForm);
    setEditingId(null);
    await load();
  };

  const edit = (listing: ListingRow) => {
    const { _id, ...rest } = listing;
    setEditingId(_id);
    setForm({ ...emptyForm, ...rest });
  };

  const remove = async (id: string) => {
    await fetch(`/api/admin/listings/${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-[family-name:var(--font-serif)] text-3xl">Listings</h2>
        <p className="mt-1 text-sm text-[var(--stone)]">Create one template-driven listing per property. Keep WordPress slugs.</p>
      </div>

      <form onSubmit={save} className="grid gap-3 rounded border border-white/10 bg-white/5 p-5 md:grid-cols-2">
        <input className="field-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || slugify(e.target.value) })} required />
        <input className="field-input" placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} />
        <input className="field-input" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
        <input className="field-input" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        <input className="field-input" placeholder="Neighborhood slug" value={form.neighborhoodSlug} onChange={(e) => setForm({ ...form, neighborhoodSlug: e.target.value })} />
        <select className="field-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ListingRow["status"] })}>
          <option value="published">Published</option>
          <option value="coming-soon">Coming soon</option>
          <option value="sold">Sold</option>
          <option value="draft">Draft</option>
        </select>
        <input className="field-input" type="number" placeholder="Price USD" value={form.priceUsd} onChange={(e) => setForm({ ...form, priceUsd: Number(e.target.value) })} />
        <select className="field-input" value={form.priceType} onChange={(e) => setForm({ ...form, priceType: e.target.value as ListingRow["priceType"] })}>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
        <input className="field-input" placeholder="Price label override" value={form.priceLabel} onChange={(e) => setForm({ ...form, priceLabel: e.target.value })} />
        <input className="field-input" type="number" placeholder="Beds" value={form.beds} onChange={(e) => setForm({ ...form, beds: Number(e.target.value) })} />
        <input className="field-input" type="number" placeholder="Baths" value={form.baths} onChange={(e) => setForm({ ...form, baths: Number(e.target.value) })} />
        <input className="field-input" type="number" placeholder="Half baths" value={form.bathsHalf} onChange={(e) => setForm({ ...form, bathsHalf: Number(e.target.value) })} />
        <input className="field-input" type="number" placeholder="Sq ft" value={form.sqft} onChange={(e) => setForm({ ...form, sqft: Number(e.target.value) })} />
        <input className="field-input" type="number" step="0.001" placeholder="Lot acres" value={form.lotAcres} onChange={(e) => setForm({ ...form, lotAcres: Number(e.target.value) })} />
        <input className="field-input" type="number" placeholder="Year built" value={form.yearBuilt} onChange={(e) => setForm({ ...form, yearBuilt: Number(e.target.value) })} />
        <input className="field-input" placeholder="MLS #" value={form.mlsNumber} onChange={(e) => setForm({ ...form, mlsNumber: e.target.value })} />
        <input className="field-input" placeholder="HOA" value={form.hoa} onChange={(e) => setForm({ ...form, hoa: e.target.value })} />
        <input className="field-input md:col-span-2" placeholder="Features (comma separated)" value={form.features.join(", ")} onChange={(e) => setForm({ ...form, features: e.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} />
        <textarea className="field-input min-h-32 md:col-span-2" placeholder="Description HTML" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className="field-input md:col-span-2" placeholder="SEO title" value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
        <textarea className="field-input md:col-span-2" placeholder="SEO description" value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} />
        <input className="field-input md:col-span-2" placeholder="External URL (optional)" value={form.externalUrl} onChange={(e) => setForm({ ...form, externalUrl: e.target.value })} />
        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input type="checkbox" checked={form.featuredOnHome} onChange={(e) => setForm({ ...form, featuredOnHome: e.target.checked })} />
          Featured on homepage
        </label>
        <div className="md:col-span-2">
          <input type="file" accept="image/*" multiple onChange={(e) => e.target.files && uploadFiles(e.target.files)} />
          <p className="mt-1 text-xs text-[var(--stone)]">{uploading ? "Uploading..." : "JPEG, PNG, WebP, GIF — stored on R2"}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[form.imageUrl, ...form.imageUrls].filter(Boolean).map((url) => (
              <div key={url} className="relative h-16 w-16 overflow-hidden border border-white/20">
                <RemoteImage src={url} alt="" className="object-cover" sizes="64px" />
              </div>
            ))}
          </div>
        </div>
        {error ? <p className="text-sm text-red-300 md:col-span-2">{error}</p> : null}
        <button type="submit" className="btn-gold md:col-span-2" disabled={saving}>
          {saving ? "Saving..." : editingId ? "Update listing" : "Create listing"}
        </button>
      </form>

      <div className="space-y-2">
        {listings.map((listing) => (
          <div key={listing._id} className="flex items-center justify-between border border-white/10 px-4 py-3 text-sm">
            <div>
              <p className="font-medium">{listing.title}</p>
              <p className="text-[var(--stone)]">/{listing.slug} · {listing.status}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn-ghost !text-[var(--ivory)]" onClick={() => edit(listing)}>
                Edit
              </button>
              <button type="button" className="btn-ghost !text-[var(--ivory)]" onClick={() => remove(listing._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
