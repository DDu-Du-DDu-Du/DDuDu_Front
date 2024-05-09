"use client";

import { MouseEvent } from "react";

import { ButtonProps } from "./Button.type";
import { useConvertButtonStyle } from "./hooks";

import { twJoin, twMerge } from "tailwind-merge";

const Button = ({
  children,
  radius = "0.94rem",
  fontSize = "0.94rem",
  fontWeight = "bold",
  fontColor = "black",
  backgroundColor = "yellow",
  border = "none",
  shadow = false,
  className,
  onClick,
  ...rest
}: ButtonProps) => {
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
    if (!onClick) return;

    onClick();
  };

  return (
    <button
      className={twMerge(twJoin(`h-[3.5rem] w-[20rem]`, convertedStyle), className)}
      type="button"
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
