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
}: ButtonProps) => {
  const convertedStyle = useConvertButtonStyle({
    radius,
    fontSize,
    fontWeight,
    fontColor,
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
