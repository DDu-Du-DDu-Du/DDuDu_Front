"use client";

import { SwitchButton } from "@/app/_components/client";
import { CreateIcon, ListIcon, MainFeedIcon } from "@/app/_components/server";
import { useClickAway, useToggle } from "@/app/_hooks";

import Link from "next/link";

const MainHeader = () => {
  const { isToggle, handleToggleOn, handleToggleOff } = useToggle();

  const goalButtonRef = useClickAway<HTMLDivElement>(handleToggleOff);

  return (
    <header className="mb-[2rem] pt-[2.4rem] px-[2.4rem]">
      <ul className="flex justify-end gap-[0.8rem] mb-[1.5rem]">
        <li
          className="relative ml-[0.8rem]"
          onClick={handleToggleOn}
        >
          <MainFeedIcon
            className="cursor-pointer"
            fill="darkgray"
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
                    <CreateIcon fill="darkgray" />
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
                    <ListIcon fill="darkgray" />
                    <span className="pl-[0.8rem]">목표관리</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </li>
      </ul>
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
