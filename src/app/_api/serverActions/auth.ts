"use server";

import { signIn } from "@/auth";

export const signInWithKakao = async () => {
  await signIn("kakao", { redirectTo: "/" });
};
