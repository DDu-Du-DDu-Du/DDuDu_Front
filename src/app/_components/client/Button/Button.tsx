"use client";

import React, { MouseEvent } from "react";

import { useConvertButtonStyle } from "./hooks";

import { HTMLMotionProps, motion } from "framer-motion";
import { twJoin, twMerge } from "tailwind-merge";

export type ButtonRadiusType = "basic" | "decreased";
export type ButtonBorderType = "green" | "none";
export type ButtonFontSizeType = "large" | "medium";
export type ButtonFontWeightType = "regular" | "bold";
export type ButtonFontColorType = "white" | "black";
export type ButtonBackgroundColorType = "yellow" | "orange" | "red";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  children?: React.ReactNode;
  className?: string;
  onClick: () => void;
  radius?: ButtonRadiusType;
  border?: ButtonBorderType;
  fontSize?: ButtonFontSizeType;
  fontWeight?: ButtonFontWeightType;
  fontColor?: ButtonFontColorType;
  backgroundColor?: ButtonBackgroundColorType;
  shadow?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      radius = "basic",
      fontSize = "large",
      fontWeight = "bold",
      fontColor = "black",
      backgroundColor = "yellow",
      border = "none",
      shadow = false,
      className,
      onClick,
      disabled = false,
      ...rest
    },
    ref,
  ) => {
    const convertedStyle = useConvertButtonStyle({
      radius,
      fontSize,
      fontWeight,
      fontColor,
      backgroundColor,
      border,
      shadow,
    });

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!onClick || disabled) {
        return;
      }

      onClick();
    };

    const disableStyle = disabled ? "opacity-50" : "";

    return (
      <motion.button
        ref={ref}
        className={twMerge(
          twJoin(`h-[3.5rem] w-[20rem] px-2 will-change-transform`, convertedStyle, disableStyle),
          className,
        )}
        type="button"
        onClick={handleClick}
        whileHover={disabled ? {} : { scale: 1.015, filter: "brightness(105%)" }}
        whileTap={disabled ? {} : { scale: 0.95 }}
        transition={{ type: "spring", stiffness: 350 }}
        {...rest}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
export default Button;
