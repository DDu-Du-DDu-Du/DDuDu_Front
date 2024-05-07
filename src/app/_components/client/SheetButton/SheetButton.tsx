"use client";

import { useSheetButtonStyle } from "./hooks";

import { HTMLMotionProps, motion } from "framer-motion";
import { twJoin, twMerge } from "tailwind-merge";

interface SheetButtonProps extends HTMLMotionProps<"button"> {
  buttonType?: "large" | "small";
  title: string;
  Icon: React.ReactNode;

  rightPlace?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const SheetButton = ({
  buttonType = "large",
  title,
  Icon,
  rightPlace,
  disabled = false,
  className,
  ...rest
}: SheetButtonProps) => {
  const buttonStyle = useSheetButtonStyle({ buttonType });

  return (
    <motion.button
      type="button"
      className={twMerge(buttonStyle, className)}
      whileTap={disabled ? {} : { scale: 0.9 }}
      whileHover={disabled ? {} : { filter: "brightness(97%)" }}
      style={{ opacity: disabled ? 0.6 : 1 }}
      disabled={disabled}
      {...rest}
    >
      {Icon}

      <p className={twJoin(buttonType === "small" && "flex-grow text-start")}>{title}</p>

      {buttonType === "small" && rightPlace && rightPlace}
    </motion.button>
  );
};

export default SheetButton;
