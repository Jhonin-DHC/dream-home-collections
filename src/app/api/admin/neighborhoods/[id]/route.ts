import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { Neighborhood } from "@/models/Neighborhood";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    await connectMongo();
    const body = await request.json();
    const neighborhood = await Neighborhood.findByIdAndUpdate(id, body, { new: true });
    if (!neighborhood) return NextResponse.json({ error: "Neighborhood not found." }, { status: 404 });
    return NextResponse.json({ neighborhood });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update neighborhood.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    await connectMongo();
    const neighborhood = await Neighborhood.findByIdAndDelete(id);
    if (!neighborhood) return NextResponse.json({ error: "Neighborhood not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete neighborhood.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
