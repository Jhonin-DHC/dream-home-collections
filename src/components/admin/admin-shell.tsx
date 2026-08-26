"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/admin/listings", label: "Listings" },
  { href: "/admin/neighborhoods", label: "Neighborhoods" },
  { href: "/admin/posts", label: "Blogs" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/members", label: "Members" },
  { href: "/admin/settings", label: "Settings" }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch("/api/admin/inquiries/alerts");
        const payload = await response.json();
        if (active && response.ok) setUnreadCount(payload.unreadCount ?? 0);
      } catch {
        // ignore
      }
    };
    void load();
    const timer = window.setInterval(load, 30000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [pathname]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] text-[var(--ivory)]">
      <div className="grid min-h-screen lg:grid-cols-[240px_1fr]">
        <aside className="border-r border-white/10 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Dream Home Collections</p>
          <h1 className="mt-2 font-[family-name:var(--font-serif)] text-2xl">Admin</h1>
          {unreadCount > 0 ? (
            <p className="mt-3 rounded border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-3 py-2 text-xs text-[var(--gold)]">
              {unreadCount} new inquir{unreadCount === 1 ? "y" : "ies"}
            </p>
          ) : null}
          <nav className="mt-8 space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const showBadge = item.href === "/admin/inquiries" && unreadCount > 0;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded px-3 py-2 text-sm ${
                    active ? "bg-white/15 text-white" : "text-[var(--stone)] hover:bg-white/10"
                  }`}
                >
                  <span>{item.label}</span>
                  {showBadge ? (
                    <span className="rounded-full bg-[var(--gold)] px-2 py-0.5 text-[10px] font-semibold text-[var(--navy)]">
                      {unreadCount}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <button type="button" onClick={logout} className="btn-ghost mt-8 w-full !text-[var(--ivory)]">
            Log out
          </button>
        </aside>
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
