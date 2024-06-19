import { getMe } from "./app/_services/server";
import { refreshAccessToken, socialLogin } from "./app/_services/server/auth/auth";
import { ServiceUser } from "./app/_types/auth/auth.type";

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
  },
  callbacks: {
    jwt: async ({ token, account }) => {
      const threshold = 5 * 60 * 1000; // 액세스토큰 만료 판별에 사용되는 오프셋 (5분)

      if (account && account.access_token) {
        console.log("first authenticate");
        // 첫 로그인 시
        try {
          const tokenResponse = await socialLogin(account.access_token);
          const meResponse = await getMe(tokenResponse.accessToken);
          console.log("토큰 신규 발급 성공");
          return {
            ...token,
            accessToken: tokenResponse.accessToken,
            refreshToken: tokenResponse.refreshToken,
            expiresAt: Date.now() + 6 * 60 * 60 * 1000,
            errorMessage: null,
            user: meResponse,
          };
        } catch (error) {
          console.log("토큰 생성에 실패하였습니다. 에러:", error);
          return { ...token, errorMessage: "failed to get token" };
        }
      } else if (token.expiresAt && (token.expiresAt as number) - Date.now() >= threshold) {
        // 유효한 액세스 토큰 보유 시
        console.log("현재 토큰을 그대로 사용합니다.");

        try {
          const meResponse = await getMe(token.accessToken as string);
          return {
            ...token,
            errorMessage: null,
            user: meResponse,
          };
        } catch (error) {
          console.log("유저 정보 갱신에 실패하였습니다. 에러:", error);
          return { ...token, errorMessage: "failed to update user information" };
        }
      } else {
        // 액세스 토큰 만료 시
        try {
          console.log("액세스 토큰이 만료되었습니다. 갱신을 시도합니다.");
          const tokenResponse = await refreshAccessToken(token.refreshToken);
          const meResponse = await getMe(tokenResponse.accessToken);
          console.log("성공적으로 갱신되었습니다.", tokenResponse);
          return {
            ...token,
            accessToken: tokenResponse.accessToken,
            refreshToken: tokenResponse.refreshToken,
            expiresAt: Date.now() + 6 * 60 * 60 * 1000,
            errorMessage: null,
            user: meResponse,
          };
        } catch (error) {
          console.log("토큰 갱신에 실패하였습니다. 에러:", error);
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

      if (token.user) {
        const { id, username, nickname, profileImageUrl, authority } = token.user as ServiceUser;
        session.user = {
          userId: id,
          id: username,
          nickname,
          authority,
          image: profileImageUrl,
          email: "non-used",
          emailVerified: null,
        };
      }

      return session;
    },
  },
});
