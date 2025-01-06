"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useBottomSheetClickAway } from "../../hooks";

interface BottomPortalProps {
  isShow: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const BottomPortal = ({ isShow, children, onClose }: BottomPortalProps) => {
  const bottomSheetRef = useRef<HTMLDivElement | null>(null);
  const [BottomElement, setBottomElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.querySelector("#bottom");

    if (!(element instanceof HTMLElement)) {
      return;
    }

    setBottomElement(element);
  }, []);

  useBottomSheetClickAway({ ref: bottomSheetRef, callback: onClose });

  if (!BottomElement || !isShow) {
    return null;
  }

  return createPortal(
    <>
      <div className="fixed top-0 w-screen h-screen max-w-[60rem] bg-transparent" />
      <div ref={bottomSheetRef}>{children}</div>
    </>,
    BottomElement,
  );
};

export default BottomPortal;
