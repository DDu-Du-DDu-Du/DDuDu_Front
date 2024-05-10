"use client";

import { useMemo } from "react";

import { twJoin } from "tailwind-merge";

interface UseSheetButtonStyleProps {
  buttonType: "main" | "sub";
}

const useSheetButtonStyle = ({ buttonType }: UseSheetButtonStyleProps) => {
  const style = useMemo(
    () =>
      twJoin(
        "text-size13 flex items-center",

        buttonType === "main" &&
          "h-[8rem] flex-grow-[2] bg-example_gray_100 flex-col justify-center gap-[0.6rem] rounded-radius10",

        buttonType === "sub" && "w-full h-[3.2rem] gap-[1.6rem]",
      ),
    [buttonType],
  );

  return style;
};

export default useSheetButtonStyle;
