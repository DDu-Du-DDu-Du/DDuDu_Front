"use client";

import React from "react";

import { signOutWithForm } from "@/app/_api/serverActions/auth";

import { useSession } from "next-auth/react";

/* eslint-disable react-hooks/rules-of-hooks */

const page = () => {
  const { data: session, update } = useSession();

  const handleClick = () => {
    update();
  };

  console.log("homeSession(client):", session);
  return (
    <div className="mt-[5.2rem]">
      ds
      {session?.sessionToken && (
        <form action={signOutWithForm}>
          <button type="submit">로그아웃</button>
        </form>
      )}
      <button onClick={handleClick}>업데이트</button>
    </div>
  );
};

export default page;
