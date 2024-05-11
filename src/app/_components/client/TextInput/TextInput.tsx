"use client";

import { HTMLAttributes } from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";

import { twMerge } from "tailwind-merge";

interface TextInputProps extends Omit<HTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  name: string;
  options?: RegisterOptions<FieldValues, string>;
}

const TextInput = ({ name, options = {}, ...rest }: TextInputProps) => {
  const { register } = useFormContext();

  return (
    <input
      type="text"
      className={twMerge(
        "w-full h-[5.6rem] bg-example_gray_100 rounded-radius15 px-[1.2rem] text-size15",
        "focus:outline-double focus:outline-example_gray_900 focus:outline-[0.3rem]",
      )}
      {...rest}
      {...register(name, options)}
    />
  );
};

export default TextInput;
