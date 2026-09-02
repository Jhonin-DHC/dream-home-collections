"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { SocialLinks } from "@/components/social-links";

const nav = [
  { href: "/", label: "Home" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/service-area", label: "Service Area" },
  { href: "/our-blogs", label: "Blogs" }
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [memberName, setMemberName] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/members/me")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (active) setMemberName(payload?.member?.name ?? null);
      })
      .catch(() => {
        if (active) setMemberName(null);
      });
    return () => {
      active = false;
    };
  }, [pathname]);

  const openAuth = (mode: "login" | "register") => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    params.set("auth", mode);
    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--stone)] bg-[var(--ivory)]/95 backdrop-blur">
      <div className="container-shell flex items-center justify-between gap-4 py-3">
        <Link href="/" className="shrink-0">
          <Image src={site.logo} alt={site.name} width={220} height={64} className="h-12 w-auto md:h-14" priority />
        </Link>

        <nav className="hidden items-center gap-7 text-sm tracking-wide text-[var(--navy)] lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "text-[var(--gold-dark)]" : "hover:text-[var(--gold-dark)]"}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 text-xs text-[var(--navy)] lg:flex">
          <SocialLinks />
          <a href={`mailto:${site.email}`} className="hidden xl:inline">
            {site.email}
          </a>
          <a href={site.phoneHref} className="font-semibold">
            {site.phone}
          </a>
          {memberName ? (
            <Link href="/account" className="btn-ghost !py-2 !px-3">
              {memberName.split(" ")[0]}
            </Link>
          ) : (
            <div className="flex gap-2">
              <button type="button" className="btn-ghost !py-2 !px-3" onClick={() => openAuth("login")}>
                Login
              </button>
              <button type="button" className="btn-gold !py-2 !px-3" onClick={() => openAuth("register")}>
                Register
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className="lg:hidden text-sm uppercase tracking-wide text-[var(--navy)]"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="border-t border-[var(--stone)] bg-[var(--ivory)] px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <SocialLinks />
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.phoneHref}>{site.phone}</a>
            {memberName ? (
              <Link href="/account">Account</Link>
            ) : (
              <>
                <button type="button" className="text-left" onClick={() => openAuth("login")}>
                  Login
                </button>
                <button type="button" className="text-left" onClick={() => openAuth("register")}>
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
