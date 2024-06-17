import { refreshAccessToken, socialLogin } from "./app/_services/server/auth/auth";

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
    maxAge: 60 * 60 * 6, // 뚜두 서버 액세스토큰 만료 시간과 같음 (6시간)
    updateAge: 0,
  },
  callbacks: {
    jwt: async ({ token, account }) => {
      const threshold = 5 * 60 * 1000; // 액세스토큰 만료 판별에 사용되는 오프셋 (5분)

      if (account && account.access_token) {
        // 첫 로그인 시
        const response = await socialLogin(account.access_token);

        return {
          ...token,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          expiresAt: Date.now() + 6 * 60 * 60 * 1000,
        };
      } else if ((token.expiresAt as number) - Date.now() <= threshold) {
        // 유효한 액세스 토큰 보유 시
        return token;
      } else {
        // 액세스 토큰 만료 시
        try {
          const response = await refreshAccessToken(token.refreshToken as string);
          return {
            ...token,
            accessToken: response.accessToken,
            expiresAt: Date.now() + 6 * 60 * 60 * 1000,
          };
        } catch (error) {
          // TODO: 에러처리
          return { ...token };
        }
      }
    },
    // 세션을 조회할 때마다 호출
    session: async ({ session, token }) => {
      if (token?.accessToken) {
        session.sessionToken = token.accessToken.toString();
      }

      return session;
    },
  },
});
