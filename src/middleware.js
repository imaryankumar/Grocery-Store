import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl
    ? request.nextUrl.pathname
    : new URL(request.url).pathname;
  const isPublic =
    path === "/login" || path === "/signup" || path === "/forgot";

  const token = request.cookies.get("userToken")?.value || "";
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/chatboat", request.url));
  }
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/forgot",
    "/reset",
    "/chatboat",
    "/shop/:path*",
  ],
};
