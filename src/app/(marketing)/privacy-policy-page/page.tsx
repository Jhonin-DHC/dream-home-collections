import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Dream Home Collections collects, uses, and protects your information."
};

export default function PrivacyPage() {
  return (
    <article className="container-shell prose-dhc max-w-3xl py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold-dark)]">Privacy Policy</p>
      <h1 className="section-title mt-2">How We Collect, Use, and Protect Your Information</h1>
      <p>Effective Date: 24/06/2024</p>
      <p>
        At Dream Home Collections, we are committed to protecting your privacy and ensuring that your personal information
        is handled in a secure and responsible manner. This Privacy Policy outlines the types of personal information we
        collect, how it is used, and the steps we take to protect it.
      </p>
      <h2>1. Information We Collect</h2>
      <ul>
        <li>Personal identification information: name, email address, phone number, and other contact details you provide.</li>
        <li>Usage data: IP address, browser type, and device information through cookies and similar technologies.</li>
        <li>Messaging data if you opt in to SMS or A2P 10DLC messages.</li>
      </ul>
      <h2>2. Use of Information</h2>
      <p>
        We use collected information to provide services, communicate with you, improve the Site, send requested messages,
        and — with your consent — marketing communications you may opt out of at any time.
      </p>
      <h2>3. Sharing Your Information</h2>
      <p>
        We do not sell, trade, or rent your personal information. We may share it with service providers who help operate
        the Site, or when required to comply with law.
      </p>
      <h2>4. Security and your rights</h2>
      <p>
        We use commercially reasonable measures to protect your information. You may access, correct, or delete personal
        information by contacting us at {site.email}.
      </p>
      <h2>5. Contact</h2>
      <p>
        Dream Home Collections
        <br />
        {site.email}
        <br />
        {site.phone}
      </p>
    </article>
  );
}
