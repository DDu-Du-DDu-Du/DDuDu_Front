"use client";

import ExampleIcon from "../../server/ExampleIcon/ExampleIcon";

import { twMerge } from "tailwind-merge";

interface SheetButtonProps {
  title: string;
  className?: string;
}

const SheetButton = ({ title, className }: SheetButtonProps) => {
  return (
    <button
      type="button"
      className={twMerge(
        "h-[8rem] flex-grow-[2] bg-example_gray_100 text-size13 flex flex-col items-center justify-center gap-[0.6rem] rounded-radius10",
        className,
      )}
    >
      <ExampleIcon />
      {title}
    </button>
  );
};

export default SheetButton;
