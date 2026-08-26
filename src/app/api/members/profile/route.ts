import { NextResponse } from "next/server";
import { getCurrentMember } from "@/lib/member-auth";

export async function PATCH(request: Request) {
  try {
    const member = await getCurrentMember();
    if (!member) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = (await request.json()) as { name?: string; phone?: string };
    if (body.name) member.name = body.name.trim();
    if (typeof body.phone === "string") member.phone = body.phone.trim();
    await member.save();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update profile.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
