import mongoose, { Schema, models } from "mongoose";

const NeighborhoodSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true },
    headline: { type: String, default: "" },
    city: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    body: { type: String, default: "" },
    listingSlugs: { type: [String], default: [] },
    stats: { type: String, default: "" },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Neighborhood = models.Neighborhood || mongoose.model("Neighborhood", NeighborhoodSchema);
