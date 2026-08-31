import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { Member } from "@/models/Member";
import { createPasswordResetToken } from "@/lib/member-auth";
import { isEmailConfigured, sendPasswordResetEmail } from "@/lib/email";
import { getRequestOrigin, publicErrorMessage } from "@/lib/public-error";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    if (!body.email) return NextResponse.json({ error: "Email is required." }, { status: 400 });

    if (!isEmailConfigured()) {
      return NextResponse.json(
        { error: "Password reset email is not available yet. Please contact the concierge." },
        { status: 503 }
      );
    }

    await connectMongo();
    const member = await Member.findOne({ email: body.email.toLowerCase().trim() });
    if (member) {
      const token = await createPasswordResetToken(member.email);
      const resetUrl = `${getRequestOrigin(request).replace(/\/$/, "")}/reset-password?token=${encodeURIComponent(token)}`;
      await sendPasswordResetEmail(member.email, resetUrl);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Forgot password failed:", error);
    return NextResponse.json(
      { error: publicErrorMessage(error, "Could not send a reset email. Please try again later or contact the concierge.") },
      { status: 500 }
    );
  }
}
