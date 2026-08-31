import { NextResponse } from "next/server";
import { createMember, createMemberSession } from "@/lib/member-auth";
import { publicErrorMessage } from "@/lib/public-error";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string; name?: string; phone?: string };
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
    }
    if (body.password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }
    const member = await createMember({
      email: body.email,
      password: body.password,
      name: body.name,
      phone: body.phone
    });
    await createMemberSession(member.email);
    return NextResponse.json({ ok: true, email: member.email }, { status: 201 });
  } catch (error) {
    const raw = error instanceof Error ? error.message : "Registration failed.";
    const status = raw.includes("already exists") ? 409 : 500;
    const message =
      status === 409 ? raw : publicErrorMessage(error, "Registration failed. Please try again.");
    return NextResponse.json({ error: message }, { status });
  }
}
