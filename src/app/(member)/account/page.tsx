import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentMember } from "@/lib/member-auth";
import { ProfileForm } from "@/components/profile-form";

export default async function AccountPage() {
  const member = await getCurrentMember();
  if (!member) redirect("/?auth=login");

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      <aside className="space-y-3 text-sm">
        <Link href="/account" className="block text-[var(--gold-dark)]">
          Profile
        </Link>
        <Link href="/account/favorites" className="block hover:text-[var(--gold-dark)]">
          Favorites
        </Link>
      </aside>
      <div>
        <h1 className="section-title">Your profile</h1>
        <p className="section-copy mt-2">Update your concierge details. Passwords are stored with bcrypt — WordPress passwords were not migrated.</p>
        <div className="mt-8 max-w-lg">
          <ProfileForm name={member.name} email={member.email} phone={member.phone || ""} />
        </div>
      </div>
    </div>
  );
}
