"use client";

import { useEffect, useRef, useState } from "react";
import { slugify } from "@/lib/slug";
import { RemoteImage } from "@/components/remote-image";

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
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const response = await fetch("/api/admin/posts");
    const payload = await response.json();
    if (!response.ok) return setError(payload.error);
    setItems(payload.posts ?? []);
  };

  useEffect(() => {
    void load();
  }, []);

  const uploadFeaturedImage = async (files: FileList | File[]) => {
    const file = Array.from(files)[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const body = new FormData();
    body.append("file", file);
    body.append("folder", "posts");
    const response = await fetch("/api/admin/uploads", { method: "POST", body });
    const payload = (await response.json()) as { url?: string; error?: string };
    setUploading(false);
    if (!response.ok || !payload.url) {
      setError(payload.error ?? "Featured image upload failed.");
      return;
    }
    setForm((current) => ({ ...current, featuredImage: payload.url as string }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
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
    setSaving(false);
    if (!response.ok) return setError(body.error);
    setForm(empty);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    await load();
  };

  return (
    <div className="space-y-8">
      <h2 className="font-[family-name:var(--font-serif)] text-3xl">Blog posts</h2>
      <form onSubmit={save} className="grid gap-3 rounded border border-white/10 bg-white/5 p-5">
        <input className="field-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || slugify(e.target.value) })} required />
        <input className="field-input" placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} />
        <input className="field-input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value, categorySlug: slugify(e.target.value) })} />
        <div>
          <p className="mb-2 text-sm text-[var(--stone)]">Featured / hero image</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => e.target.files && void uploadFeaturedImage(e.target.files)}
          />
          <p className="mt-1 text-xs text-[var(--stone)]">
            {uploading ? "Uploading to Cloudflare R2..." : "JPEG, PNG, WebP, GIF — stored on Cloudflare R2"}
          </p>
          {form.featuredImage ? (
            <div className="mt-3 flex items-start gap-3">
              <div className="relative h-28 w-44 overflow-hidden border border-white/20">
                <RemoteImage src={form.featuredImage} alt="Featured image preview" className="object-cover" sizes="176px" />
              </div>
              <button
                type="button"
                className="btn-ghost !text-[var(--ivory)]"
                onClick={() => {
                  setForm((current) => ({ ...current, featuredImage: "" }));
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              >
                Remove image
              </button>
            </div>
          ) : null}
        </div>
        <textarea className="field-input" placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        <textarea className="field-input min-h-40" placeholder="Body HTML" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
        <input className="field-input" placeholder="SEO title" value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
        <textarea className="field-input" placeholder="SEO description" value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} />
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <button className="btn-gold" disabled={saving || uploading}>
          {saving ? "Saving..." : editingId ? "Update" : "Create"} post
        </button>
      </form>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item._id} className="flex items-center justify-between border border-white/10 px-4 py-3 text-sm">
            <span>{item.title}</span>
            <div className="flex gap-2">
              <button type="button" className="btn-ghost !text-[var(--ivory)]" onClick={() => { const { _id, ...rest } = item; setEditingId(_id); setForm({ ...empty, ...rest, publishedAt: String(rest.publishedAt).slice(0, 10) }); if (fileInputRef.current) fileInputRef.current.value = ""; }}>
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
