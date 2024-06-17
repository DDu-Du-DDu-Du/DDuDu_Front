import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// const matchersForAuth = ["/dashboard/:path*", "/myaccount/:path*", "/settings/:path*", "..."];

export async function middleware(request: NextRequest) {
  console.log(request);

  return NextResponse.next();
}
