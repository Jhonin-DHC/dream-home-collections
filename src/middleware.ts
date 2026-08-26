import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

function getAuthSecret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET ?? "dev-secret-change-me");
}

async function hasRole(request: NextRequest, cookieName: string, role: string) {
  const token = request.cookies.get(cookieName)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    return payload.role === role;
  } catch {
    return false;
  }
}

const publicMemberApi = [
  "/api/members/register",
  "/api/members/login",
  "/api/members/logout",
  "/api/members/me",
  "/api/members/forgot-password",
  "/api/members/reset-password"
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const authed = await hasRole(request, "dhc_admin", "admin");
    if (!authed) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  const isPublicMemberApi = publicMemberApi.some((path) => pathname === path);
  if (pathname.startsWith("/account") || (pathname.startsWith("/api/members") && !isPublicMemberApi)) {
    const authed = await hasRole(request, "dhc_session", "member");
    if (!authed) {
      if (pathname.startsWith("/api/members")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/", request.url);
      loginUrl.searchParams.set("auth", "login");
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/account/:path*", "/api/members/:path*"]
};
