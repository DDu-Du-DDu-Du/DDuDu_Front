import { socialLogin } from "./app/_services/server/auth/auth";

import NextAuth from "next-auth";
import kakao from "next-auth/providers/kakao";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    kakao({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
    updateAge: 0,
  },
  callbacks: {
    // 로그인 후 jwt 토큰이 생성되거나, 갱신될 때 호출
    jwt: async ({ token, account }) => {
      if (account && account.access_token) {
        const response = await socialLogin({ socialToken: account.access_token });

        token.accessToken = response.accessToken;
        token.refreshToken = response.refreshToken;

        console.log("isLogin");
      }

      // ? 카카오에서 넘겨주는 유저 정보 + 서비스에서 관리하는 유저 정보 모두 조회 가능한지

      console.log("JWT Callbacked");
      return token;
    },
    // 세션을 조회할 때마다 호출
    session: async ({ session, token }) => {
      if (token?.accessToken) {
        session.sessionToken = token.accessToken.toString();
      }

      console.log("Session Callbacked");
      return session;
    },
  },
});
