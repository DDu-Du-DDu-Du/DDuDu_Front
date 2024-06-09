"use server";

import { signIn, signOut } from "@/auth";

export const signInWithKakao = async () => {
  await signIn("kakao", { redirectTo: "/" });
};

export const signOutWithForm = async () => {
  await signOut();
};
