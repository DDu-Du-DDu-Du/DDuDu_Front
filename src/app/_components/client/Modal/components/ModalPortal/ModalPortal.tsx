"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: React.ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  const [isCSR, setIsCSR] = useState(false);

  useEffect(() => {
    setIsCSR(true);
  }, []);

  if (typeof window === "undefined") {
    return <></>;
  }
  if (!isCSR) {
    return <></>;
  }

  return createPortal(<>{children}</>, document.body);
};

export default ModalPortal;
