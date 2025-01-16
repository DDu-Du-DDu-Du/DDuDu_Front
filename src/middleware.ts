import { AUTH_ROUTES, BASE_URL, PUBLIC_ROUTES } from "./app/_constants/auth/auth";
import { bypassPathCheck } from "./app/_utils/";
import { auth } from "./auth";

import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */

    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

const bypassPaths = [
  "/manifest*",
  "/swe-worker*",
  "/sw.js*",
  "/workbox-*",
  "/assets*",
  "/fonts*",
  "/icons*",
  "/favicon*",
  "/login",
];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  const isBypassPaths = bypassPathCheck(bypassPaths, pathname);
  if (isBypassPaths) {
    return;
  }

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL(BASE_URL, request.url));
  }

  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.url));
  }

  return NextResponse.next();
}
