"use client";

import { useEffect, useState } from "react";

interface MemberRow {
  _id: string;
  name: string;
  email: string;
  phone: string;
  favoriteListingIds: string[];
  createdAt: string;
}

export function MembersManager() {
  const [items, setItems] = useState<MemberRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/members")
      .then((response) => response.json())
      .then((payload) => {
        if (payload.error) setError(payload.error);
        else setItems(payload.members ?? []);
      });
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="font-[family-name:var(--font-serif)] text-3xl">Members</h2>
      <p className="text-sm text-[var(--stone)]">WordPress passwords were not imported. Invite existing users to register or reset.</p>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item._id} className="border border-white/10 px-4 py-3 text-sm">
            <p className="font-medium">{item.name} · {item.email}</p>
            <p className="text-[var(--stone)]">{item.phone || "No phone"} · {item.favoriteListingIds?.length || 0} favorites</p>
          </div>
        ))}
        {items.length === 0 ? <p className="text-[var(--stone)]">No members yet.</p> : null}
      </div>
    </div>
  );
}
