"use client";

import tailwindConfig from "@/../tailwind.config";
import { SwitchButton } from "@/app/_components/client";
import { CreateIcon, ListIcon, MainFeedIcon } from "@/app/_components/server";
import { useClickAway, useToggle } from "@/app/_hooks";

import Link from "next/link";
import resolveConfig from "tailwindcss/resolveConfig";

const MainHeader = () => {
  const { isToggle, handleToggleOn, handleToggleOff } = useToggle();

  const goalButtonRef = useClickAway<HTMLDivElement>(handleToggleOff);

  const { theme } = resolveConfig(tailwindConfig);

  return (
    <header className="mb-[2rem] pt-[2.4rem] px-[2.4rem]">
      <div className="flex justify-between items-center mb-[1.5rem]">
        <h1 className="text-white text-size20 font-bold">뚜두뚜두</h1>
        <ul className="flex justify-end gap-[0.8rem]">
          <li
            className="relative ml-[0.8rem]"
            onClick={handleToggleOn}
          >
            <MainFeedIcon
              className="cursor-pointer"
              fill={theme.colors.white}
            />
            <div ref={goalButtonRef}>
              {isToggle && (
                <ul className="absolute right-0 flex flex-col w-[12.8rem] p-[1.6rem] gap-[1rem] bg-white_100 rounded-radius10 z-background_content">
                  <li>
                    <Link
                      className="flex items-center py-[0.3rem]"
                      href="/goal/editor"
                      title="목표 등록 페이지로 이동"
                      scroll={false}
                    >
                      <CreateIcon fill={theme.colors.main} />
                      <span className="pl-[0.8rem]">목표등록</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center py-[0.3rem]"
                      href="/goal"
                      title="목표 관리 페이지로 이동"
                      scroll={false}
                    >
                      <ListIcon fill={theme.colors.main} />
                      <span className="pl-[0.8rem]">목표관리</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
        </ul>
      </div>
      <SwitchButton />
      {isToggle && (
        <div
          className="absolute w-[100%] h-[100%] top-0 left-0 z-background"
          style={{ background: "rgba(0,0,0,0.5)" }}
        ></div>
      )}
    </header>
  );
};

export default MainHeader;
