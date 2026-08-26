import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";
import { isEmailConfigured, sendInquiryAlert } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
      listingId?: string;
      listingSlug?: string;
      listingTitle?: string;
      source?: string;
    };

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    await connectMongo();
    const inquiry = await Inquiry.create({
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || "",
      message: body.message.trim(),
      listingId: body.listingId || "",
      listingSlug: body.listingSlug || "",
      listingTitle: body.listingTitle || "",
      source: body.source || "contact",
      read: false
    });

    if (isEmailConfigured()) {
      await sendInquiryAlert({
        id: inquiry._id.toString(),
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        message: inquiry.message,
        listingTitle: inquiry.listingTitle,
        source: inquiry.source
      });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not send inquiry.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
