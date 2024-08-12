import InputDateSingle from "../InputDateSingle/InputDateSingle";
import useDateRange from "./hooks/useDateRange/useDateRange";

interface InputDateRangeProps {
  mode: "create" | "edit";
  todayDate: string;
  labelStart: string;
  nameStart: string;
  labelEnd: string;
  nameEnd: string;
}

const InputDateRange = ({
  mode,
  todayDate,
  labelStart,
  nameStart,
  labelEnd,
  nameEnd,
}: InputDateRangeProps) => {
  const { minDate, maxDate, handleMinDateChange, handleMaxDateChange } = useDateRange({
    todayDate,
  });

  return (
    <div className="flex gap-[0.8rem]">
      <InputDateSingle
        label={labelStart}
        name={nameStart}
        todayDate={mode === "create" ? todayDate : undefined}
        maxDate={mode === "create" ? maxDate : undefined}
        onMinDateChange={handleMinDateChange}
      />
      <InputDateSingle
        label={labelEnd}
        name={nameEnd}
        minDate={mode === "create" ? minDate : undefined}
        onMaxDateChange={handleMaxDateChange}
      />
    </div>
  );
};

export default InputDateRange;
