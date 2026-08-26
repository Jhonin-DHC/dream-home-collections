"use client";

import { useEffect, useState } from "react";

export function FavoriteButton({ listingId }: { listingId: string }) {
  const [saved, setSaved] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    fetch("/api/members/me")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (!payload?.member) return;
        setAuthed(true);
        setSaved((payload.member.favoriteListingIds ?? []).includes(listingId));
      })
      .catch(() => undefined);
  }, [listingId]);

  const toggle = async () => {
    if (!authed) {
      const next = encodeURIComponent(window.location.pathname);
      window.location.assign(`/?auth=login&next=${next}`);
      return;
    }
    const response = await fetch("/api/members/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId })
    });
    const payload = await response.json();
    if (response.ok) setSaved(Boolean(payload.saved));
  };

  return (
    <button type="button" onClick={toggle} className="btn-ghost" aria-pressed={saved}>
      {saved ? "Saved to favorites" : "Save favorite"}
    </button>
  );
}
