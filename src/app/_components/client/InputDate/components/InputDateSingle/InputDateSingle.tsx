import styles from "../../InputDate.module.css";

import { useFormContext } from "react-hook-form";

import { useDateChange } from "../../hooks";

interface InputDateSingleProps {
  label: string;
  name: string;
  todayDate?: string;
  minDate?: string;
  maxDate?: string;
  onMinDateChange?: (data: string) => void;
  onMaxDateChange?: (data: string) => void;
}

const InputDateSingle = ({
  label,
  name,
  todayDate,
  minDate,
  maxDate,
  onMinDateChange,
  onMaxDateChange,
}: InputDateSingleProps) => {
  const { register } = useFormContext();
  const { date, handleInputChange } = useDateChange({
    label,
    onMinDateChange,
    onMaxDateChange,
  });

  return (
    <div className={`${styles.datePicker} relative w-[12rem]`}>
      <div className="h-[4rem] rounded-radius10 cursor-pointer leading-[4rem] pl-[1.8rem] bg-example_gray_100">
        <label
          htmlFor={name}
          className="text-size13"
        >
          {date}
        </label>
        <input
          className="absolute top-0 left-0 w-full h-full opacity-0"
          type="date"
          id={name}
          {...register(name, {
            required: true,
          })}
          onChange={handleInputChange}
          min={minDate || todayDate}
          max={maxDate}
        />
      </div>
    </div>
  );
};

export default InputDateSingle;
