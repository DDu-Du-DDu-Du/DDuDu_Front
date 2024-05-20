import InputDateSingle from "../InputDateSingle/InputDateSingle";
import useDateRange from "./hooks/useDateRange/useDateRange";

interface InputDateRangeProps {
  todayDate: string;
  labelStart: string;
  nameStart: string;
  labelEnd: string;
  nameEnd: string;
}

const InputDateRange = ({
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
        todayDate={todayDate}
        maxDate={maxDate}
        onMinDateChange={handleMinDateChange}
      />
      <InputDateSingle
        label={labelEnd}
        name={nameEnd}
        minDate={minDate}
        onMaxDateChange={handleMaxDateChange}
      />
    </div>
  );
};

export default InputDateRange;
