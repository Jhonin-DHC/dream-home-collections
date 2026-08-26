import { NextResponse } from "next/server";
import { getCurrentMember } from "@/lib/member-auth";

export async function GET() {
  const member = await getCurrentMember();
  if (!member) return NextResponse.json({ authenticated: false }, { status: 401 });
  return NextResponse.json({
    authenticated: true,
    member: {
      id: member._id.toString(),
      email: member.email,
      name: member.name,
      phone: member.phone,
      favoriteListingIds: member.favoriteListingIds
    }
  });
}
