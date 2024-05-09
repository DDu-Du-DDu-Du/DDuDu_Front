"use client";

import { ButtonProps } from "./Button.type";
import { useConvertButtonStyle } from "./hooks";

import { twJoin } from "tailwind-merge";

const Button = ({
  children,
  radius = "0.94rem",
  fontSize = "0.94rem",
  fontWeight = "bold",
  fontColor = "black",
  backgroundColor = "yellow",
  border = "none",
  shadow = false,
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

  return (
    <button
      className={twJoin(`h-[3.5rem] w-[20rem]`, convertedStyle)}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
