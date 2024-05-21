"use client";

import { useSwitchToggle } from "./hooks";

import { twJoin } from "tailwind-merge";

interface SwitchButtonProps {
  firstLabel?: string;
  secondLabel?: string;
  viewKey?: string;
  selectedOption?: string;
  alternativeOption?: string;
}

const SwitchButton = ({
  firstLabel = "투두",
  secondLabel = "스케줄",
  viewKey = "view",
  selectedOption = "ddudu",
  alternativeOption = "schedule",
}: SwitchButtonProps) => {
  const { toggle, handleToggleToFirst, handleToggleToSecond } = useSwitchToggle({
    viewKey,
    selectedOption,
    alternativeOption,
  });

  return (
    <div className="relative flex flex-1 w-[16rem] h-[3rem] bg-example_gray_300 text-size13 rounded-[5rem] cursor-pointer select-none">
      <div
        className="relative flex justify-center items-center w-[50%] box-border z-10"
        onClick={handleToggleToFirst}
      >
        {firstLabel}
      </div>
      <div
        className="relative flex justify-center items-center w-[50%] box-border z-10"
        onClick={handleToggleToSecond}
      >
        {secondLabel}
      </div>
      <div
        className={twJoin(
          "absolute w-[50%] h-[3rem] bg-white_100 border-solid border-2 border-example_gray_500 rounded-[5rem] transition-all duration-200 ease-in-out",
          toggle === selectedOption ? "translate-x-0" : "translate-x-[100%]",
        )}
      />
    </div>
  );
};

export default SwitchButton;
