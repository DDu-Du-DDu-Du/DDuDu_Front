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
    // updateAge: 0,
  },
  callbacks: {
    jwt: async ({ token, account }) => {
      const threshold = 5 * 60 * 1000; // 액세스토큰 만료 판별에 사용되는 오프셋 (5분)

      if (account && account.access_token) {
        console.log("first authenticate");
        // 첫 로그인 시
        try {
          const response = await socialLogin(account.access_token);
          console.log("토큰 신규 발급 성공");

          // TODO: 서버로부터 유저정보를 받아온 후 세션에 저장

          return {
            ...token,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            expiresAt: Date.now() + 6 * 60 * 60 * 1000,
            errorMessage: null,
          };
        } catch (error) {
          return { ...token, errorMessage: "failed to get token" };
        }
      } else if (token.expiresAt && (token.expiresAt as number) - Date.now() >= threshold) {
        // 유효한 액세스 토큰 보유 시
        console.log("현재 토큰을 그대로 사용합니다.", token);
        return token;
      } else {
        // 액세스 토큰 만료 시
        try {
          console.log("액세스 토큰이 만료되었습니다. 갱신을 시도합니다.");

          const response = await refreshAccessToken(token.refreshToken);

          console.log("성공적으로 갱신되었습니다.", response);
          return {
            ...token,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            expiresAt: Date.now() + 6 * 60 * 60 * 1000,
            errorMessage: null,
          };
        } catch (error) {
          console.log("갱신에 실패하였습니다. 에러:", error);
          return { ...token, errorMessage: "failed to update token" };
        }
      }
    },
    // 세션을 조회할 때마다 호출
    session: async ({ session, token }) => {
      if (token.accessToken) {
        session.sessionToken = token.accessToken.toString();
      }

      if (token.errorMessage) {
        session.errorMessage = token.errorMessage.toString();
      }

      return session;
    },
  },
});
