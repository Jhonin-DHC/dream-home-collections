import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { Member } from "@/models/Member";

export async function GET() {
  try {
    await connectMongo();
    const members = await Member.find().sort({ createdAt: -1 }).select("-passwordHash").lean();
    return NextResponse.json({ members });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load members.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
