import { auth } from "./auth";

import { NextRequest, NextResponse } from "next/server";

export const config = {
  // 아래 Matcher 경로에서만 미들웨어가 실행됩니다.
  // ! 개발 편의성을 위해 미들웨어 실행을 풀어놓았습니다.
  // TODO 추후 로그인이 필요한 페이지를 정리한 후 matcher에 추가해주어야 합니다.
  matcher: ["/none-middleware-call"],
};

export async function middleware(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
