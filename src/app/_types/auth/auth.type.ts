// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session } from "next-auth";

declare module "next-auth" {
  interface User {
    userId: number;
    nickname: string;
    authority: string;
  }
  interface Session {
    sessionToken: string;
    errorMessage: string;
    user: User;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    sessionToken: string;
    refreshToken: string;
    expiresAt: number;
  }
}

export interface ServiceUser {
  id: number;
  username: string;
  nickname: string;
  profileImageUrl: string | null;
  authority: string;
}
