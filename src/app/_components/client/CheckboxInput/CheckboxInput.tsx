"use client";

import { HTMLAttributes, useId } from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";

interface CheckboxInputProps extends Omit<HTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  name: string;
  value: string | number;
  options?: RegisterOptions<FieldValues, string>;
  id?: string;
  className?: string;
}

const CheckboxInput = ({
  className,
  name,
  value,
  options,

  id,
  ...rest
}: CheckboxInputProps) => {
  const inputId = useId();
  const { register } = useFormContext();

  return (
    <>
      <input
        id={id || inputId}
        value={value}
        type="checkbox"
        className="hidden"
        {...rest}
        {...register(name, options)}
      />

      <label
        htmlFor={id || inputId}
        className={className}
      >
        dd
      </label>
    </>
  );
};

export default CheckboxInput;
