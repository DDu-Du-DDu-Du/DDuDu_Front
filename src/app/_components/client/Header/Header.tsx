"use client";

import ArrowLeftIcon from "../../server/icons/ArrowLeftIcon/ArrowLeftIcon";
import { HeaderButton, HeaderLabel } from "./components";
import useSegmentConvert from "./hooks/useSegmentConvert/useSegmentConvert";

import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { headerLabel, rightButtonIcon, rightButtonFn } = useSegmentConvert();

  return (
    <nav className="fixed top-0 flex h-[5.2rem] w-full max-w-[60rem] items-center justify-center">
      <HeaderButton
        buttonPosition="LEFT"
        buttonFn={() => router.back()}
      >
        <ArrowLeftIcon
          size={16}
          fill="none"
        />
      </HeaderButton>

      <HeaderLabel label={headerLabel} />

      <HeaderButton
        buttonPosition="RIGHT"
        buttonFn={rightButtonFn}
      >
        {rightButtonIcon}
      </HeaderButton>
    </nav>
  );
};

export default Header;
