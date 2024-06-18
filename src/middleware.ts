import { NextResponse } from "next/server";

// const matchersForAuth = ["/dashboard/:path*", "/myaccount/:path*", "/settings/:path*", "..."];

export async function middleware() {
  // console.log(request);

  return NextResponse.next();
}
