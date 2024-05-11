"use client";

import { useFormContext } from "react-hook-form";

interface TextInputProps {
  name: string;
}

const TextInput = ({ name }: TextInputProps) => {
  const { register } = useFormContext();

  return (
    <input
      type="text"
      className="border-2 border-red-200"
      {...register(name)}
    />
  );
};

export default TextInput;
