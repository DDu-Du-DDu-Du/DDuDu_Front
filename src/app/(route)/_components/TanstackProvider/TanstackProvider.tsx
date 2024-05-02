"use client";

import React, { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface TanstackProviderProps {
  children: React.ReactNode;
}

const TanstackProvider = ({ children }: TanstackProviderProps) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {},
    }),
  );

  const DEVTOOL_KEY = process.env.NEXT_PUBLIC_MODE;

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={DEVTOOL_KEY === "local"} />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
