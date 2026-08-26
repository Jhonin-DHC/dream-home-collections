import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { connectMongo } from "@/lib/mongodb";
import { getAuthSecret, SESSION_MAX_AGE } from "@/lib/auth";
import { Member } from "@/models/Member";

export const MEMBER_COOKIE = "dhc_session";
const RESET_MAX_AGE = 60 * 60;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function createMember(input: {
  email: string;
  password: string;
  name: string;
  phone?: string;
}) {
  await connectMongo();
  const email = input.email.toLowerCase().trim();
  const existing = await Member.findOne({ email });
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const passwordHash = await hashPassword(input.password);
  return Member.create({
    email,
    passwordHash,
    name: input.name.trim(),
    phone: input.phone?.trim() || "",
    favoriteListingIds: []
  });
}

export async function verifyMemberCredentials(email: string, password: string) {
  await connectMongo();
  const member = await Member.findOne({ email: email.toLowerCase().trim() });
  if (!member) return null;
  const valid = await bcrypt.compare(password, member.passwordHash);
  return valid ? member : null;
}

export async function createMemberSession(email: string) {
  const token = await new SignJWT({ email, role: "member" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getAuthSecret());

  const cookieStore = await cookies();
  cookieStore.set(MEMBER_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE
  });
}

export async function clearMemberSession() {
  const cookieStore = await cookies();
  cookieStore.delete(MEMBER_COOKIE);
}

export async function getMemberEmail() {
  const cookieStore = await cookies();
  const token = cookieStore.get(MEMBER_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    if (payload.role !== "member") return null;
    return typeof payload.email === "string" ? payload.email : null;
  } catch {
    return null;
  }
}

export async function getCurrentMember() {
  const email = await getMemberEmail();
  if (!email) return null;
  try {
    await connectMongo();
    return Member.findOne({ email });
  } catch {
    return null;
  }
}

export async function createPasswordResetToken(email: string) {
  return new SignJWT({ email, purpose: "reset" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${RESET_MAX_AGE}s`)
    .sign(getAuthSecret());
}

export async function verifyPasswordResetToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    if (payload.purpose !== "reset") return null;
    return typeof payload.email === "string" ? payload.email : null;
  } catch {
    return null;
  }
}
