import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--stone)] bg-[var(--navy)] text-[var(--ivory)]">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image src={site.logo} alt={site.name} width={200} height={56} className="h-12 w-auto brightness-0 invert" />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--stone)]">{site.description}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <a href={site.socials.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={site.socials.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={site.socials.youtube} target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a href={site.socials.pinterest} target="_blank" rel="noreferrer">
              Pinterest
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-[family-name:var(--font-serif)] text-xl">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--stone)]">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/neighborhoods">Neighborhoods</Link>
            </li>
            <li>
              <Link href="/our-blogs">Our Blogs</Link>
            </li>
            <li>
              <Link href="/service-area">Service Area</Link>
            </li>
            <li>
              <Link href="/privacy-policy-page">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-of-service">Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-[family-name:var(--font-serif)] text-xl">Legal</h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--stone)]">
            <li>
              <Link href="/resources/legal/iabs">IABS</Link>
            </li>
            <li>
              <Link href="/resources/legal/consumer-protection-notice">Consumer Protection</Link>
            </li>
            <li>
              <Link href="/resources/legal/mls-rule-schedule-of-fines">MLS Schedule of Fines</Link>
            </li>
            <li>
              <Link href="/resources/legal/mls-rules-and-regulations">MLS Rules</Link>
            </li>
            <li>
              <Link href="/resources/legal/fair-housing">Fair Housing</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-[family-name:var(--font-serif)] text-xl">Concierge</h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--stone)]">
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-[var(--stone)]">
        Copyright © {new Date().getFullYear()} {site.name}
      </div>
    </footer>
  );
}
