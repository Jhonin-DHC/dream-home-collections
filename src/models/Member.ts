import mongoose, { Schema, models } from "mongoose";

const MemberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, default: "" },
    favoriteListingIds: { type: [String], default: [] }
  },
  { timestamps: true }
);

export const Member = models.Member || mongoose.model("Member", MemberSchema);
