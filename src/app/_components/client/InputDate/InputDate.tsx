"use client";

import InputDateRange from "./components/InputDateRange/InputDateRange";
import InputDateSingle from "./components/InputDateSingle/InputDateSingle";
import getTodayFormatDate from "./utils/getTodayFormatDate";

interface InputDateProps {
  type: "single" | "range";
  labelStart: string;
  nameStart: string;
  labelEnd?: string;
  nameEnd?: string;
}

const InputDate = ({
  type = "single",
  labelStart,
  nameStart,
  labelEnd,
  nameEnd,
}: InputDateProps) => {
  const todayDate = getTodayFormatDate();

  return (
    <>
      {type === "single" && (
        <InputDateSingle
          label={labelStart}
          name={nameStart}
          todayDate={todayDate}
        />
      )}
      {type === "range" && labelEnd && nameEnd && (
        <InputDateRange
          labelStart={labelStart}
          nameStart={nameStart}
          labelEnd={labelEnd}
          nameEnd={nameEnd}
          todayDate={todayDate}
        />
      )}
    </>
  );
};

export default InputDate;
