"use client";

import { useEffect, useState } from "react";

interface SettingsPayload {
  mongoConfigured: boolean;
  r2Configured: boolean;
  emailConfigured: boolean;
  inquiryNotifyEmails: string[];
  siteUrl: string;
}

export function SettingsForm() {
  const [settings, setSettings] = useState<SettingsPayload | null>(null);

  useEffect(() => {
    void fetch("/api/admin/settings")
      .then((response) => response.json())
      .then((payload) => setSettings(payload.settings));
  }, []);

  if (!settings) return <p className="text-sm text-[var(--stone)]">Loading settings...</p>;

  return (
    <div className="space-y-6">
      <h2 className="font-[family-name:var(--font-serif)] text-3xl">Settings</h2>
      <div className="space-y-2 border border-white/10 p-5 text-sm">
        <p>MongoDB configured: {settings.mongoConfigured ? "Yes" : "No"}</p>
        <p>R2 uploads configured: {settings.r2Configured ? "Yes" : "No"}</p>
        <p>SMTP email configured: {settings.emailConfigured ? "Yes" : "No"}</p>
        <p>Inquiry notify emails: {settings.inquiryNotifyEmails.join(", ") || "Not set"}</p>
        <p>Site URL: {settings.siteUrl || "Not set"}</p>
      </div>
    </div>
  );
}
