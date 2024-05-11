"use client";

import { HTMLAttributes } from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";

import { twMerge } from "tailwind-merge";

interface TextInputProps extends Omit<HTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  name: string;
  options?: RegisterOptions<FieldValues, string>;
  placeholder?: string;
  disabled?: boolean;
}

const TextInput = ({
  name,
  options = {},
  className,
  placeholder,
  disabled,
  ...rest
}: TextInputProps) => {
  const { register, formState } = useFormContext();

  return (
    <input
      type="text"
      placeholder={placeholder}
      disabled={disabled}
      className={twMerge(
        "w-full h-[5.6rem] bg-example_gray_100 rounded-radius15 px-[1.2rem] text-size15",
        !formState.errors[name] &&
          "focus:outline-none focus:border-example_gray_900 focus:border-[0.3rem] focus:border-double",
        formState.errors[name] &&
          "focus:outline-none border-double border-example_red_500 border-[0.4rem]",
        disabled && " cursor-default opacity-40",
        className,
      )}
      {...rest}
      {...register(name, options)}
    />
  );
};

export default TextInput;
