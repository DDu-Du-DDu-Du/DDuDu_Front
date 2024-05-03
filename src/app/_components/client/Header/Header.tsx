"use client";

import { ReactNode } from "react";

import { scrollToTop } from "@/app/_utils";

import useSegmentConvert from "./hooks/useSegmentConvert/useSegmentConvert";

import { useSelectedLayoutSegments } from "next/navigation";

const Header = () => {
  const segments = useSelectedLayoutSegments();
  const [visible, headerLabel, leftButtonIcon, leftButtonFn, rightButtonIcon, rightButtonFn] =
    useSegmentConvert({ segments });

  if (!visible) {
    return <></>;
  }

  return (
    <nav className="fixed top-0 flex h-[5.2rem] w-full max-w-[60rem] items-center justify-center">
      {leftButtonFn && (
        <button
          className="absolute left-[2.4rem] top-[1.9rem] flex h-[1.6rem] w-[1.6rem] items-center justify-center"
          onClick={leftButtonFn as () => void}
        >
          {leftButtonIcon as ReactNode}
        </button>
      )}
      <p
        className="select-none text-size15"
        onClick={scrollToTop}
      >
        {headerLabel as string}
      </p>
      {rightButtonFn && (
        <button
          className="absolute right-[2.4rem] top-[1.9rem] h-[1.6rem] w-[1.6rem]"
          onClick={rightButtonFn as () => void}
        >
          {rightButtonIcon as ReactNode}
        </button>
      )}
    </nav>
  );
};

export default Header;
