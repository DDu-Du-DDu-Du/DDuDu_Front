import styles from "../../InputTime.module.css";

import { useFormContext } from "react-hook-form";

import { useTimeChange } from "../../hooks";
import { validateEndTime } from "../../utils";

interface InputTimeSingleProps {
  label: string;
  name: string;
  startTime?: string;
  onStartTimeChange?: (time: string) => void;
  onEndTimeChange?: (time: string) => void;
}

const InputTimeSingle = ({
  label,
  name,
  startTime,
  onStartTimeChange,
  onEndTimeChange,
}: InputTimeSingleProps) => {
  const { register } = useFormContext();

  const { time, handleTimeChange } = useTimeChange({
    label,
    onStartTimeChange,
    onEndTimeChange,
  });

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
          id={name}
          {...register(name, {
            validate: {
              endTime: (value) => {
                if (name === "endAt" && startTime) {
                  return (
                    validateEndTime(value, startTime) ||
                    "종료 시간은 시작 시간보다 같거나 늦어야 합니다."
                  );
                }

                return true;
              },
            },
          })}
          onChange={handleTimeChange}
        />
      </div>
    </div>
  );
};

export default InputTimeSingle;
