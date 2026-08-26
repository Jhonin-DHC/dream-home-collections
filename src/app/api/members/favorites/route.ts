import { NextResponse } from "next/server";
import { getCurrentMember } from "@/lib/member-auth";

export async function POST(request: Request) {
  try {
    const member = await getCurrentMember();
    if (!member) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = (await request.json()) as { listingId?: string };
    if (!body.listingId) return NextResponse.json({ error: "listingId is required." }, { status: 400 });

    const exists = member.favoriteListingIds.includes(body.listingId);
    member.favoriteListingIds = exists
      ? member.favoriteListingIds.filter((id: string) => id !== body.listingId)
      : [...member.favoriteListingIds, body.listingId];
    await member.save();
    return NextResponse.json({ ok: true, saved: !exists, favoriteListingIds: member.favoriteListingIds });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update favorites.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
