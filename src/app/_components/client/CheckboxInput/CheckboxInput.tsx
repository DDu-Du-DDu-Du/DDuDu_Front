"use client";

import { HTMLAttributes, useId } from "react";

import tailwindConfig from "@/../tailwind.config";

import { CheckIcon } from "../../server";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig";

interface CheckboxInputProps extends Omit<HTMLAttributes<HTMLInputElement>, "type"> {
  children?: React.ReactNode;
  type?: "icon" | "word";
  checked?: boolean;
  value?: string | number;
  size?: number;
  id?: string;
  className?: string;
}

const CheckboxInput = ({
  children,
  type = "icon",
  className,
  checked,
  value,
  size = 32,
  id,
  ...rest
}: CheckboxInputProps) => {
  const inputId = useId();
  const { theme } = resolveConfig(tailwindConfig);

  return (
    <>
      <input
        id={id || inputId}
        value={value}
        type="checkbox"
        checked={checked}
        className="hidden group"
        {...rest}
      />

      <motion.label
        htmlFor={id || inputId}
        className={twMerge(
          "block bg-example_gray_300 rounded-radius10 cursor-pointer",
          checked && "bg-example_gray_900",
          type === "word" &&
            "p-[1.2rem] min-w-[4rem] flex items-center justify-center text-[1.3rem]",
          className,
        )}
        style={{
          width: type === "icon" ? size : "fit-content",
          height: type === "icon" ? size : "4rem",
        }}
      >
        {type === "icon" && (
          <CheckIcon
            size={"100%"}
            fill={theme.colors["white_100"]}
          />
        )}

        {type === "word" && children}
      </motion.label>
    </>
  );
};

export default CheckboxInput;
