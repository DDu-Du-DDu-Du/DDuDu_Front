import "../_styles/globals.css";

import { ToastProvider } from "@/app/_components/client";

import { SpoqaHanSansFont } from "../_assets/font";
import { BottomProvider } from "../_components/client/BottomSheet/components";
import { TanstackProvider } from "./_components";
import SessionChecker from "./_components/SessionChecker/SessionChecker";

import type { Metadata } from "next";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "뚜두뚜두",
  description: "목표를 설정하고 성취하며 계획을 관리하는 투두 서비스",
  icons: {
    icon: "/icons/favicon.ico",
  },
  manifest: "/manifest.json",
};

interface RootLayoutProps {
  session: Session | null;
  children: React.ReactNode;
}

const RootLayout = ({ children, session }: Readonly<RootLayoutProps>) => {
  return (
    <html
      lang="ko"
      className={SpoqaHanSansFont.className}
    >
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover"
      />
      <body>
        <SessionProvider session={session}>
          <SessionChecker>
            <TanstackProvider>
              <main id="app">
                <ToastProvider>{children}</ToastProvider>
                <BottomProvider />
              </main>
            </TanstackProvider>
          </SessionChecker>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
