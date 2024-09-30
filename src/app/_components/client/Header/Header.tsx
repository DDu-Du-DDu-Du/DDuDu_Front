"use client";

import { ArrowLeftIcon } from "../../server";
import { HeaderButton, HeaderLabel } from "./components";

import { useRouter } from "next/navigation";

interface HeaderProps {
  headerLabel: string;
  rightButtonIcon?: React.ReactNode;
  rightButtonFn?: () => void;
}

const Header = ({ headerLabel, rightButtonIcon, rightButtonFn }: HeaderProps) => {
  const router = useRouter();

  return (
    <header className="fixed top-0 flex h-[5.2rem] w-full max-w-[60rem] items-center justify-center z-header pointer-events-none bg-white_100">
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
    </header>
  );
};

export default Header;
