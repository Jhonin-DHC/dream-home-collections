"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProfileForm({ name, email, phone }: { name: string; email: string; phone: string }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const response = await fetch("/api/members/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error ?? "Could not save profile.");
      return;
    }
    setError(null);
    setMessage("Profile saved.");
    router.refresh();
  };

  const logout = async () => {
    await fetch("/api/members/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <form onSubmit={save} className="space-y-3">
      <input name="name" defaultValue={name} className="field-input" required />
      <input defaultValue={email} className="field-input bg-[var(--cream)]" disabled />
      <input name="phone" defaultValue={phone} className="field-input" placeholder="Phone" />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {message ? <p className="text-sm text-[var(--navy)]">{message}</p> : null}
      <div className="flex gap-3">
        <button type="submit" className="btn-gold">
          Save
        </button>
        <button type="button" className="btn-ghost" onClick={logout}>
          Log out
        </button>
      </div>
    </form>
  );
}
