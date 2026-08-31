"use client";

import { useState } from "react";

export function InquiryForm({
  listingId,
  listingSlug,
  listingTitle,
  source = "contact"
}: {
  listingId?: string;
  listingSlug?: string;
  listingTitle?: string;
  source?: string;
}) {
  const [status, setStatus] = useState<"idle" | "saving" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saving");
    setError(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, listingId, listingSlug, listingTitle, source })
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setError(payload.error ?? "Unable to send your message.");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Unable to send your message. Please try again.");
    }
  };

  if (status === "sent") {
    return (
      <p className="border border-[var(--gold)] bg-white p-5 text-sm text-[var(--navy)]">
        Thank you. Your message has been received. A concierge will review it in the admin inbox.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3 bg-white p-5 shadow-sm">
      <input name="name" className="field-input" placeholder="Full name" required />
      <input name="email" type="email" className="field-input" placeholder="Email" required />
      <input name="phone" className="field-input" placeholder="Phone" />
      <textarea name="message" className="field-input min-h-28" placeholder="How can we help?" required />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button type="submit" className="btn-gold w-full" disabled={status === "saving"}>
        {status === "saving" ? "Saving..." : "Send message"}
      </button>
    </form>
  );
}
