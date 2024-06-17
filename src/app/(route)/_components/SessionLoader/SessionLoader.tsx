"use client";

import { useEffect } from "react";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface SessionLoaderProps {
  children: React.ReactNode;
}
const SessionLoader = ({ children }: SessionLoaderProps) => {
  const session = useSession();
  const pathname = usePathname();

  useEffect(() => {
    console.log(session);
  }, [pathname, session, session.status]);

  return <>{children}</>;
};

export default SessionLoader;
