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
  disabled?: boolean;
}

const CheckboxInput = ({
  children,
  type = "icon",
  className,
  checked,
  value,
  size = 32,
  disabled,
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
        disabled={disabled}
        readOnly={!rest.onChange}
        {...rest}
      />

      <motion.label
        htmlFor={id || inputId}
        className={twMerge(
          "block bg-example_gray_300 rounded-radius10 select-none",
          checked && "bg-example_gray_900",
          type === "word" &&
            "p-[1.2rem] min-w-[4rem] flex items-center justify-center text-[1.3rem]",
          disabled ? "opacity-40 cursor-default" : "hover:bg-transparent_50 cursor-pointer",
          className,
        )}
        style={{
          width: type === "icon" ? size : "fit-content",
          height: type === "icon" ? size : "4rem",
        }}
        whileTap={disabled ? {} : { scale: 0.95 }}
      >
        {type === "icon" && (
          <CheckIcon
            size={"100%"}
            fill={theme.colors["white_100"]}
            className="p-[0.2rem]"
          />
        )}

        {type === "word" && children}
      </motion.label>
    </>
  );
};

export default CheckboxInput;
