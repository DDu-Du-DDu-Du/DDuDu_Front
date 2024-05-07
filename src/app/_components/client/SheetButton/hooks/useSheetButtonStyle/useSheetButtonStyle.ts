"use client";

import { twJoin } from "tailwind-merge";

interface UseSheetButtonStyleProps {
  buttonType: "large" | "small";
}

const useSheetButtonStyle = ({ buttonType }: UseSheetButtonStyleProps) => {
  return twJoin(
    "text-size13 flex items-center",

    buttonType === "large" &&
      "h-[8rem] flex-grow-[2] bg-example_gray_100 flex-col justify-center gap-[0.6rem] rounded-radius10",

    buttonType === "small" && "w-full h-[3.2rem] gap-[1.6rem]",
  );
};

export default useSheetButtonStyle;
