"use client";

import { MouseEvent, forwardRef } from "react";

import tailwindConfig from "@/../tailwind.config";
import { BarHandleIcon } from "@/app/_components/server";

import resolveConfig from "tailwindcss/resolveConfig";

interface BottomHeaderProps {
  onMouseDown: (event: MouseEvent<HTMLElement>) => void;
}

const BottomHeader = forwardRef<HTMLElement, BottomHeaderProps>(({ onMouseDown }, ref) => {
  const { theme } = resolveConfig(tailwindConfig);
  return (
    <header
      className="w-full h-[3.2rem] flex items-center justify-center"
      onMouseDown={onMouseDown}
      ref={ref}
    >
      <BarHandleIcon
        size={100}
        fill={theme.colors["example_gray_500"]}
      />
    </header>
  );
});

BottomHeader.displayName = "BottomHeader";
export default BottomHeader;
