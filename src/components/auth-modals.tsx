"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function AuthModalsInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("auth");
  const next = searchParams.get("next") || "/account";
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (mode !== "login" && mode !== "register" && mode !== "forgot") return null;

  const close = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("auth");
    url.searchParams.delete("next");
    router.replace(`${url.pathname}${url.search}${url.hash}`);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const endpoint =
      mode === "register" ? "/api/members/register" : mode === "forgot" ? "/api/members/forgot-password" : "/api/members/login";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const body = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(body.error ?? "Something went wrong.");
      return;
    }

    if (mode === "forgot") {
      setMessage("If that email exists, we sent a reset link.");
      return;
    }

    close();
    router.push(next);
    router.refresh();
  };

  const title = mode === "register" ? "Create your account" : mode === "forgot" ? "Reset password" : "Member login";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--navy-deep)]/55 px-4" onClick={close}>
      <div className="w-full max-w-md bg-[var(--ivory)] p-7 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold-dark)]">Dream Home Collections</p>
        <h2 className="section-title mt-2 text-3xl">{title}</h2>
        <form onSubmit={submit} className="mt-6 space-y-3">
          {mode === "register" ? (
            <input name="name" className="field-input" placeholder="Full name" required />
          ) : null}
          <input name="email" type="email" className="field-input" placeholder="Email" required />
          {mode === "register" ? <input name="phone" className="field-input" placeholder="Phone (optional)" /> : null}
          {mode !== "forgot" ? (
            <input name="password" type="password" className="field-input" placeholder="Password" minLength={8} required />
          ) : null}
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          {message ? <p className="text-sm text-[var(--navy)]">{message}</p> : null}
          <button type="submit" className="btn-gold w-full" disabled={loading}>
            {loading ? "Please wait..." : mode === "register" ? "Register" : mode === "forgot" ? "Send reset link" : "Sign in"}
          </button>
        </form>
        <div className="mt-4 flex justify-between text-sm text-[var(--muted)]">
          {mode === "login" ? (
            <>
              <button type="button" onClick={() => router.replace("?auth=register")}>
                Create account
              </button>
              <button type="button" onClick={() => router.replace("?auth=forgot")}>
                Forgot password
              </button>
            </>
          ) : (
            <button type="button" onClick={() => router.replace("?auth=login")}>
              Back to login
            </button>
          )}
          <button type="button" onClick={close}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function AuthModals() {
  return (
    <Suspense fallback={null}>
      <AuthModalsInner />
    </Suspense>
  );
}
