"use client";

import { ButtonProps } from "./Button.type";
import { useConvertButtonStyle } from "./hooks";

import { twJoin } from "tailwind-merge";

const Button = ({ children, radius = "0.94rem" }: ButtonProps) => {
  const convertedStyle = useConvertButtonStyle({
    radius,
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
