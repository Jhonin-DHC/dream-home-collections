"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";

function ResetPasswordInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    const response = await fetch("/api/members/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: form.get("password") })
    });
    const payload = await response.json();
    setLoading(false);
    if (!response.ok) {
      setError(payload.error ?? "Reset failed.");
      return;
    }
    router.push("/?auth=login");
  };

  if (!token) {
    return <p className="text-[var(--muted)]">This reset link is missing a token. Request a new one from Login.</p>;
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input name="password" type="password" minLength={8} className="field-input" placeholder="New password" required />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button type="submit" className="btn-gold w-full" disabled={loading}>
        {loading ? "Saving..." : "Update password"}
      </button>
    </form>
  );
}

export function ResetPasswordForm() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordInner />
    </Suspense>
  );
}
