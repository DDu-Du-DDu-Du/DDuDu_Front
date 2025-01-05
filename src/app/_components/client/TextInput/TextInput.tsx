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
        "w-full h-[5.6rem] bg-example_gray_100 rounded-radius15 px-[1.2rem] text-size15 outline-0 outline-none focus:outline-0",
        !formState.errors[name] && "focus:border-main focus:border-[0.1rem]",
        formState.errors[name] && "border-example_red_500 border-[0.1rem]",
        disabled && " cursor-default opacity-40",
        className,
      )}
      {...rest}
      {...register(name, options)}
    />
  );
};

export default TextInput;
