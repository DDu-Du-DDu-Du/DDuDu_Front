"use client";

import ArrowLeftIcon from "../../server/Icons/staticIcons/ArrowLeftIcon/ArrowLeftIcon";
import HeaderButton from "./components/HeaderButton/HeaderButton";
import HeaderLabel from "./components/HeaderLabel/HeaderLabel";
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
        <ArrowLeftIcon />
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
