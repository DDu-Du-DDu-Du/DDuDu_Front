"use client";

import { HTMLAttributes, useId, useMemo } from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";

import tailwindConfig from "@/../tailwind.config";

import { CheckIcon } from "../../server";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig";

interface CheckboxInputProps extends Omit<HTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  name: string;
  value: string | number;
  checked?: boolean;
  options?: RegisterOptions<FieldValues, string>;
  size?: number;
  id?: string;
  className?: string;
}

const CheckboxInput = ({
  className,
  checked,
  name,
  value,
  options,
  size = 32,
  id,
  ...rest
}: CheckboxInputProps) => {
  const inputId = useId();
  const { register, watch } = useFormContext();
  const { theme } = resolveConfig(tailwindConfig);

  const watchValue = watch(name);
  const isChecked = useMemo(() => {
    if (typeof watchValue === "object") {
      return watchValue.includes(value);
    }

    return watchValue === value;
  }, [value, watchValue]);

  return (
    <>
      <input
        id={id || inputId}
        value={value}
        type="checkbox"
        checked={checked || isChecked}
        className="hidden group"
        {...rest}
        {...register(name, options)}
      />

      <motion.label
        htmlFor={id || inputId}
        className={twMerge(
          "block bg-example_gray_300 rounded-radius10 cursor-pointer",
          (checked || isChecked) && "bg-example_gray_900",
          className,
        )}
        style={{
          width: size,
          height: size,
        }}
      >
        <CheckIcon
          size={"100%"}
          fill={theme.colors["white_100"]}
        />
      </motion.label>
    </>
  );
};

export default CheckboxInput;
