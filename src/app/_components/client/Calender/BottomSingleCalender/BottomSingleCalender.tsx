"use client";

import { BottomSheetCalenderStyles } from "../Calender.styles";

import { CaptionLabelProps, DayPicker } from "react-day-picker";

import ChevronLeftIcon from "@/app/_components/server/icons/ChevronLeftIcon/ChevronLeftIcon";
import ChevronRightIcon from "@/app/_components/server/icons/ChevronRightIcon/ChevronRightIcon";

import { ko } from "date-fns/locale/ko";

interface BottomSingleCalenderProps {
  selected: Date;
  setSelected: (dates: Date | undefined) => void;
}

const BottomSingleCalender = ({ selected, setSelected }: BottomSingleCalenderProps) => {
  return (
    <DayPicker
      locale={ko}
      fixedWeeks
      mode={"single"}
      selected={selected}
      onSelect={setSelected}
      className="w-full"
      classNames={BottomSheetCalenderStyles}
      components={{
        CaptionLabel: (date: CaptionLabelProps) => (
          <header className="flex text-size15 gap-2 w-full">
            <h1>{date.displayMonth.getFullYear()}</h1>
            <h1>{date.displayMonth.getMonth() + 1}월</h1>
          </header>
        ),
        IconLeft: ({ ...props }) => (
          <ChevronLeftIcon
            {...props}
            className="h-5 w-5"
          />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRightIcon
            {...props}
            className="h-5 w-5"
          />
        ),
      }}
    />
  );
};

export default BottomSingleCalender;
