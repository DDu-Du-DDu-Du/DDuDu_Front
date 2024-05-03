"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BottomPortalProps {
  isShow: boolean;
  children: React.ReactNode;
}

const BottomPortal = ({ isShow, children }: BottomPortalProps) => {
  const [BottomElement, setBottomElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.querySelector("#bottom");

    if (!(element instanceof HTMLElement)) {
      return;
    }

    setBottomElement(element);
  }, []);

  if (!BottomElement || !isShow) {
    return null;
  }

  return createPortal(<>{children}</>, BottomElement);
};

export default BottomPortal;
