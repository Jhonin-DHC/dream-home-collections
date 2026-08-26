import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { Post } from "@/models/Post";

export async function GET() {
  try {
    await connectMongo();
    const posts = await Post.find().sort({ publishedAt: -1 }).lean();
    return NextResponse.json({ posts });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load posts.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectMongo();
    const body = await request.json();
    const post = await Post.create(body);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create post.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
