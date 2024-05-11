"use client";

import { HTMLAttributes } from "react";

interface CheckboxInputProps extends Omit<HTMLAttributes<HTMLInputElement>, "type" | "onChange"> {}

const CheckboxInput = ({ className, ...rest }: CheckboxInputProps) => {
  return (
    <input
      className={className}
      {...rest}
    >
      CheckboxInput
    </input>
  );
};

export default CheckboxInput;
