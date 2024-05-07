"use client";

import ExampleIcon from "../../server/ExampleIcon/ExampleIcon";

import { HTMLMotionProps, motion } from "framer-motion";
import { twJoin, twMerge } from "tailwind-merge";

interface SheetButtonProps extends HTMLMotionProps<"button"> {
  buttonType?: "large" | "small";
  title: string;

  rightPlace?: React.ReactNode;
  className?: string;
}

const SheetButton = ({
  buttonType = "small",
  title,
  rightPlace,
  className,
  ...rest
}: SheetButtonProps) => {
  return (
    <motion.button
      type="button"
      className={twMerge("w-full flex items-center gap-[1.6rem] text-size13", className)}
      whileTap={{
        scale: 0.9,
      }}
      {...rest}
    >
      <ExampleIcon />

      <p className={twJoin(buttonType === "small" && "flex-grow text-start")}>{title}</p>

      {buttonType === "small" && rightPlace && rightPlace}
    </motion.button>
  );
};

export default SheetButton;

// "w-full flex items-center gap-[1.6rem] text-size13"

//  "h-[8rem] flex-grow-[2] bg-example_gray_100 text-size13 flex flex-col items-center justify-center gap-[0.6rem] rounded-radius10",
