"use client";

import styles from "./InputTime.module.css";

import { ChangeEventHandler, useState } from "react";
import { useFormContext } from "react-hook-form";

interface InputTimeProps {
  id: string;
  label: string;
  name: string;
  handleTimeChange?: (time: string) => void;
}

const InputTime = ({ id, name, handleTimeChange, label }: InputTimeProps) => {
  const [time, setTime] = useState(label);
  const { register } = useFormContext();

  const handleInputTimeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTime(event.target.value);
    handleTimeChange && handleTimeChange(event.target.value);
  };

  return (
    <div className={`${styles.timePicker} relative w-[12rem]`}>
      <div className="h-[4rem] rounded-radius10 cursor-pointer leading-[4rem] pl-[1.8rem] bg-example_gray_100">
        <label
          htmlFor={name}
          className="text-size13"
        >
          {time}
        </label>
        <input
          className="absolute top-0 left-0 w-full h-full opacity-0"
          type="time"
          id={id}
          {...register(name, {})}
          onChange={handleInputTimeChange}
        />
      </div>
    </div>
  );
};

export default InputTime;
