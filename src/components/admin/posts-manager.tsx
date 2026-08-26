"use client";

import { useEffect, useState } from "react";
import { slugify } from "@/lib/slug";

interface Row {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  categorySlug: string;
  featuredImage: string;
  publishedAt: string;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
}

const empty: Omit<Row, "_id"> = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  category: "Dallas",
  categorySlug: "dallas",
  featuredImage: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  published: true,
  seoTitle: "",
  seoDescription: ""
};

export function PostsManager() {
  const [items, setItems] = useState<Row[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    const response = await fetch("/api/admin/posts");
    const payload = await response.json();
    if (!response.ok) return setError(payload.error);
    setItems(payload.posts ?? []);
  };

  useEffect(() => {
    void load();
  }, []);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      categorySlug: form.categorySlug || slugify(form.category)
    };
    const response = await fetch(editingId ? `/api/admin/posts/${editingId}` : "/api/admin/posts", {
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
      <h2 className="font-[family-name:var(--font-serif)] text-3xl">Blog posts</h2>
      <form onSubmit={save} className="grid gap-3 rounded border border-white/10 bg-white/5 p-5">
        <input className="field-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || slugify(e.target.value) })} required />
        <input className="field-input" placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} />
        <input className="field-input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value, categorySlug: slugify(e.target.value) })} />
        <input className="field-input" placeholder="Featured image URL" value={form.featuredImage} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })} />
        <textarea className="field-input" placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        <textarea className="field-input min-h-40" placeholder="Body HTML" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
        <input className="field-input" placeholder="SEO title" value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
        <textarea className="field-input" placeholder="SEO description" value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} />
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <button className="btn-gold">{editingId ? "Update" : "Create"} post</button>
      </form>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item._id} className="flex items-center justify-between border border-white/10 px-4 py-3 text-sm">
            <span>{item.title}</span>
            <div className="flex gap-2">
              <button type="button" className="btn-ghost !text-[var(--ivory)]" onClick={() => { const { _id, ...rest } = item; setEditingId(_id); setForm({ ...empty, ...rest, publishedAt: String(rest.publishedAt).slice(0, 10) }); }}>
                Edit
              </button>
              <button type="button" className="btn-ghost !text-[var(--ivory)]" onClick={async () => { await fetch(`/api/admin/posts/${item._id}`, { method: "DELETE" }); await load(); }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
