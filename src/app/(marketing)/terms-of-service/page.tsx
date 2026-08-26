import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Dream Home Collections."
};

export default function TermsPage() {
  return (
    <article className="container-shell prose-dhc max-w-3xl py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold-dark)]">Terms of Service</p>
      <h1 className="section-title mt-2">Understanding the Rules of Using Our Services</h1>
      <p>Effective Date: 24/06/2024</p>
      <p>
        Welcome to Dream Home Collections. By accessing or using this website, you agree to comply with and be bound by
        these Terms. If you do not agree, please do not use the Website.
      </p>
      <h2>1. Services provided</h2>
      <p>
        Dream Home Collections provides real estate-related services, including property listings, consultations, and
        market analysis. Information on this Website is for informational purposes only and does not constitute
        professional advice.
      </p>
      <h2>2. User responsibilities</h2>
      <ul>
        <li>Use this Website only for lawful purposes.</li>
        <li>Do not post false, misleading, or fraudulent information.</li>
        <li>Unauthorized access or interference with Website functionality is prohibited.</li>
      </ul>
      <h2>3. Intellectual property</h2>
      <p>
        All content on the Website is owned or licensed by Dream Home Collections and protected by copyright, trademark,
        and other laws. Unauthorized use is prohibited.
      </p>
      <h2>4. Limitation of liability</h2>
      <p>
        We do not guarantee the accuracy, completeness, or reliability of any information on the Website. To the fullest
        extent permitted by law, Dream Home Collections shall not be liable for damages arising from your use of the
        Website.
      </p>
      <h2>5. Governing law</h2>
      <p>These Terms are governed by the laws of the State of Texas, United States.</p>
      <h2>6. Contact</h2>
      <p>
        {site.email}
        <br />
        {site.phone}
      </p>
    </article>
  );
}
