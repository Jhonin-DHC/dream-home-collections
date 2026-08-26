"use client";

import { useEffect, useState } from "react";
import { slugify } from "@/lib/slug";

interface Row {
  _id: string;
  slug: string;
  name: string;
  headline: string;
  city: string;
  heroImage: string;
  body: string;
  listingSlugs: string[];
  stats: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
}

const empty: Omit<Row, "_id"> = {
  slug: "",
  name: "",
  headline: "",
  city: "",
  heroImage: "",
  body: "",
  listingSlugs: [],
  stats: "",
  seoTitle: "",
  seoDescription: "",
  published: true
};

export function NeighborhoodsManager() {
  const [items, setItems] = useState<Row[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    const response = await fetch("/api/admin/neighborhoods");
    const payload = await response.json();
    if (!response.ok) return setError(payload.error);
    setItems(payload.neighborhoods ?? []);
  };

  useEffect(() => {
    void load();
  }, []);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = { ...form, slug: form.slug || slugify(form.name) };
    const response = await fetch(editingId ? `/api/admin/neighborhoods/${editingId}` : "/api/admin/neighborhoods", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const body = await response.json();
    if (!response.ok) return setError(body.error);
    setForm(empty);
    setEditingId(null);
    await load();
  };

  return (
    <div className="space-y-8">
      <h2 className="font-[family-name:var(--font-serif)] text-3xl">Neighborhoods</h2>
      <form onSubmit={save} className="grid gap-3 rounded border border-white/10 bg-white/5 p-5">
        <input className="field-input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: form.slug || slugify(e.target.value) })} required />
        <input className="field-input" placeholder="Slug (keep WP permalink)" value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} />
        <input className="field-input" placeholder="Headline" value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} />
        <input className="field-input" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        <input className="field-input" placeholder="Hero image URL" value={form.heroImage} onChange={(e) => setForm({ ...form, heroImage: e.target.value })} />
        <input className="field-input" placeholder="Stats" value={form.stats} onChange={(e) => setForm({ ...form, stats: e.target.value })} />
        <input className="field-input" placeholder="Listing slugs (comma separated)" value={form.listingSlugs.join(", ")} onChange={(e) => setForm({ ...form, listingSlugs: e.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} />
        <textarea className="field-input min-h-32" placeholder="Body HTML" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <button className="btn-gold">{editingId ? "Update" : "Create"} neighborhood</button>
      </form>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item._id} className="flex items-center justify-between border border-white/10 px-4 py-3 text-sm">
            <span>{item.name} · /{item.slug}</span>
            <div className="flex gap-2">
              <button type="button" className="btn-ghost !text-[var(--ivory)]" onClick={() => { const { _id, ...rest } = item; setEditingId(_id); setForm({ ...empty, ...rest }); }}>
                Edit
              </button>
              <button type="button" className="btn-ghost !text-[var(--ivory)]" onClick={async () => { await fetch(`/api/admin/neighborhoods/${item._id}`, { method: "DELETE" }); await load(); }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
