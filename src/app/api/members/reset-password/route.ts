import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { Member } from "@/models/Member";
import { hashPassword, verifyPasswordResetToken } from "@/lib/member-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { token?: string; password?: string };
    if (!body.token || !body.password) {
      return NextResponse.json({ error: "Token and password are required." }, { status: 400 });
    }
    if (body.password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }
    const email = await verifyPasswordResetToken(body.token);
    if (!email) return NextResponse.json({ error: "This reset link is invalid or expired." }, { status: 400 });

    await connectMongo();
    const member = await Member.findOne({ email });
    if (!member) return NextResponse.json({ error: "Account not found." }, { status: 404 });
    member.passwordHash = await hashPassword(body.password);
    await member.save();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not reset password.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
