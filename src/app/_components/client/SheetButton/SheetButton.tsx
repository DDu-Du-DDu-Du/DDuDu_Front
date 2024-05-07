"use client";

import ExampleIcon from "../../server/ExampleIcon/ExampleIcon";

import { HTMLMotionProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface SheetButtonProps extends HTMLMotionProps<"button"> {
  buttonType?: "large" | "small";
  title: string;
  className?: string;
}

const SheetButton = ({ title, className, ...rest }: SheetButtonProps) => {
  return (
    <motion.button
      type="button"
      className={twMerge(
        "h-[8rem] flex-grow-[2] bg-example_gray_100 text-size13 flex flex-col items-center justify-center gap-[0.6rem] rounded-radius10",
        className,
      )}
      whileTap={{
        scale: 0.9,
      }}
      {...rest}
    >
      <ExampleIcon />
      {title}
    </motion.button>
  );
};

export default SheetButton;
