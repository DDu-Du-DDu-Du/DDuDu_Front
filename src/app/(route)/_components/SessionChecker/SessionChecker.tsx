"use client";

import { useEffect } from "react";

import { signOut, useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

interface SessionCheckerProps {
  children: React.ReactNode;
}
const SessionChecker = ({ children }: SessionCheckerProps) => {
  const session = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (session.data?.errorMessage) {
      signOut();
      redirect("/login");
    }
  }, [pathname, session, session.status]);

  return <>{children}</>;
};

export default SessionChecker;
