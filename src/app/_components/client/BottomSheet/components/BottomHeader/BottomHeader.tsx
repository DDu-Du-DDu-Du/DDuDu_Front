"use client";

import tailwindConfig from "@/../tailwind.config";
import { BarHandleIcon } from "@/app/_components/server";

import resolveConfig from "tailwindcss/resolveConfig";

const BottomHeader = () => {
  const { theme } = resolveConfig(tailwindConfig);
  return (
    <header className="w-full h-[3.2rem] flex items-center justify-center">
      <BarHandleIcon
        size={100}
        fill={theme.colors["example_gray_500"]}
      />
    </header>
  );
};

export default BottomHeader;
