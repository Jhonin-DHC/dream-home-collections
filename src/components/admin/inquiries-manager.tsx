"use client";

import { useEffect, useState } from "react";

interface InquiryRow {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  listingTitle: string;
  source: string;
  read: boolean;
  createdAt: string;
}

export function InquiriesManager() {
  const [items, setItems] = useState<InquiryRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    const response = await fetch("/api/admin/inquiries");
    const payload = await response.json();
    if (!response.ok) return setError(payload.error);
    setItems(payload.inquiries ?? []);
  };

  useEffect(() => {
    void load();
  }, []);

  const markRead = async (id: string, read: boolean) => {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read })
    });
    await load();
  };

  return (
    <div className="space-y-6">
      <h2 className="font-[family-name:var(--font-serif)] text-3xl">Inquiries</h2>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <div className="space-y-3">
        {items.map((item) => (
          <article key={item._id} className="border border-white/10 p-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{item.name} · {item.email}</p>
                <p className="text-[var(--stone)]">{item.phone} · {item.source} {item.listingTitle ? `· ${item.listingTitle}` : ""}</p>
              </div>
              <button type="button" className="btn-ghost !text-[var(--ivory)]" onClick={() => markRead(item._id, !item.read)}>
                {item.read ? "Mark unread" : "Mark read"}
              </button>
            </div>
            <p className="mt-3 whitespace-pre-wrap">{item.message}</p>
          </article>
        ))}
        {items.length === 0 ? <p className="text-[var(--stone)]">No inquiries yet.</p> : null}
      </div>
    </div>
  );
}
