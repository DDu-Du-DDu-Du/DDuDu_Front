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
    jwt: async ({ token, user }) => {
      console.log(user);
      console.log(token);
    },
    // session: async ({ session, token }) => {},
  },
});
