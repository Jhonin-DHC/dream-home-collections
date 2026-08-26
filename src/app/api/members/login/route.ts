import { NextResponse } from "next/server";
import { createMemberSession, verifyMemberCredentials } from "@/lib/member-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    if (!body.email || !body.password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }
    const member = await verifyMemberCredentials(body.email, body.password);
    if (!member) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }
    await createMemberSession(member.email);
    return NextResponse.json({ ok: true, email: member.email });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
