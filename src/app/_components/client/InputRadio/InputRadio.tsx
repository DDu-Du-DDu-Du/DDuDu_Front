"use client";

import { useFormContext } from "react-hook-form";

import { twMerge } from "tailwind-merge";

interface InputRadioProps {
  id: string;
  label: string;
  name: string;
  selected: string;
}

const InputRadio = ({ id, label, name, selected }: InputRadioProps) => {
  const { register } = useFormContext();

  return (
    <>
      <input
        className="hidden"
        type="radio"
        {...register(name, {
          required: true,
        })}
        id={id}
        value={id}
      />
      <label
        className={twMerge(
          "px-[1.2rem] py-[1.4rem] text-size13 leading-[1.3rem] rounded-radius10 cursor-pointer border-solid border-[1px] border-example_gray_100",
          selected === id && "font-medium bg-example_gray_100",
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </>
  );
};

export default InputRadio;
