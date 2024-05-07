"use client";

import ExampleIcon from "../../server/ExampleIcon/ExampleIcon";
import { useSheetButtonStyle } from "./hooks";

import { HTMLMotionProps, motion } from "framer-motion";
import { twJoin, twMerge } from "tailwind-merge";

interface SheetButtonProps extends HTMLMotionProps<"button"> {
  buttonType?: "large" | "small";
  title: string;

  rightPlace?: React.ReactNode;
  className?: string;
}

const SheetButton = ({
  buttonType = "large",
  title,
  rightPlace,
  className,
  ...rest
}: SheetButtonProps) => {
  const buttonStyle = useSheetButtonStyle({ buttonType });

  return (
    <motion.button
      type="button"
      className={twMerge(buttonStyle, className)}
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
