import React from "react";

import { Header } from "@/app/_components/client";

const HeaderLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="pt-20">
      <Header />
      {children}
    </main>
  );
};

export default HeaderLayout;
