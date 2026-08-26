import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { Member } from "@/models/Member";
import { createPasswordResetToken } from "@/lib/member-auth";
import { isEmailConfigured, sendPasswordResetEmail } from "@/lib/email";
import { site } from "@/lib/site";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    if (!body.email) return NextResponse.json({ error: "Email is required." }, { status: 400 });

    await connectMongo();
    const member = await Member.findOne({ email: body.email.toLowerCase().trim() });
    if (member && isEmailConfigured()) {
      const token = await createPasswordResetToken(member.email);
      const resetUrl = `${site.url.replace(/\/$/, "")}/reset-password?token=${encodeURIComponent(token)}`;
      await sendPasswordResetEmail(member.email, resetUrl);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not process reset.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
