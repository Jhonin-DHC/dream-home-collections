import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { Neighborhood } from "@/models/Neighborhood";

export async function GET() {
  try {
    await connectMongo();
    const neighborhoods = await Neighborhood.find().sort({ name: 1 }).lean();
    return NextResponse.json({ neighborhoods });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load neighborhoods.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectMongo();
    const body = await request.json();
    const neighborhood = await Neighborhood.create(body);
    return NextResponse.json({ neighborhood }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create neighborhood.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
