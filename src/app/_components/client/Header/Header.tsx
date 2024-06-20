"use client";

import { ArrowLeftIcon } from "../../server";
import { HeaderButton, HeaderLabel } from "./components";
import { useHeaderLabel, useHeaderRightButton } from "./hooks";

import { useRouter, useSelectedLayoutSegments } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  const { headerLabel } = useHeaderLabel({ segments });
  const { rightButtonIcon, rightButtonFn } = useHeaderRightButton({ segments });

  return (
    <header className="fixed top-0 flex h-[5.2rem] w-full max-w-[60rem] items-center justify-center z-header pointer-events-none">
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
