import "../_styles/globals.css";

import { ToastProvider } from "@/app/_components/client";

import { SpoqaHanSansFont } from "../_assets/font";
import { BottomProvider } from "../_components/client/BottomSheet/components";
import { TanstackProvider } from "./_components";
import SessionChecker from "./_components/SessionChecker/SessionChecker";

import type { Metadata, Viewport } from "next";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export const viewport: Viewport = {
  themeColor: "#1363de",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "뚜두뚜두",
  description: "목표를 설정하고 성취하며 계획을 관리하는 투두 서비스",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
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
