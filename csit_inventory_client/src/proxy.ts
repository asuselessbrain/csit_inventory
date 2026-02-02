import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/authService";

type UserRole = "ADMIN" | "TEACHER" | "STUDENT";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  const isAuthenticated = !!user;
  const role = user?.role as UserRole | undefined;

  if (!isAuthenticated) {
    if (pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  
  if (role === "ADMIN") {
    if (pathname.startsWith("/student") || pathname.startsWith("/teacher")) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  if (role === "TEACHER") {
    if (pathname.startsWith("/admin") || pathname.startsWith("/student")) {
      return NextResponse.redirect(new URL("/teacher/dashboard", request.url));
    }
  }

  if (role === "STUDENT") {
    if (pathname.startsWith("/admin") || pathname.startsWith("/teacher")) {
      return NextResponse.redirect(new URL("/student/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/teacher/:path*", 
    "/student/:path*",
  ],
};