"use client";

import React from "react";

import { useSession } from "next-auth/react";

/* eslint-disable react-hooks/rules-of-hooks */

const page = () => {
  const { data: session } = useSession();

  console.log("homeSession(client):", session);
  return <div className="mt-[5.2rem]">ds</div>;
};

export default page;
