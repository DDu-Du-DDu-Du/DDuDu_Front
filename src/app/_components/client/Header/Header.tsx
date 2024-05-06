"use client";

import HeaderButton from "./Components/HeaderButton/HeaderButton";
import HeaderLabel from "./Components/HeaderLabel/HeaderLabel";
import useSegmentConvert from "./hooks/useSegmentConvert/useSegmentConvert";

import { useSelectedLayoutSegments } from "next/navigation";

const Header = () => {
  const segments = useSelectedLayoutSegments();
  const { visible, headerLabel, leftButtonIcon, leftButtonFn, rightButtonIcon, rightButtonFn } =
    useSegmentConvert({ segments });

  if (!visible) {
    return <></>;
  }

  return (
    <nav className="fixed top-0 flex h-[5.2rem] w-full max-w-[60rem] items-center justify-center">
      <HeaderButton
        buttonPosition="LEFT"
        buttonFn={leftButtonFn}
        buttonIcon={leftButtonIcon}
      />
      <HeaderLabel label={headerLabel} />
      <HeaderButton
        buttonPosition="RIGHT"
        buttonFn={rightButtonFn}
        buttonIcon={rightButtonIcon}
      />
    </nav>
  );
};

export default Header;
