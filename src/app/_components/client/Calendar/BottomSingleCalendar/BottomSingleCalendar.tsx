"use client";

import { bottomSheetCalendarStyles } from "../calendar.styles";

import { CaptionLabelProps, DayPicker } from "react-day-picker";

import ChevronLeftIcon from "@/app/_components/server/icons/ChevronLeftIcon/ChevronLeftIcon";
import ChevronRightIcon from "@/app/_components/server/icons/ChevronRightIcon/ChevronRightIcon";
import { formatDateToYYYYMMDD } from "@/app/_utils";

import { BottomSheet } from "../../BottomSheet";

import { ko } from "date-fns/locale/ko";

export interface BottomSingleCalendarProps {
  currentDate: string;
  selectedDate: Date | undefined;
  setSelected: (date: Date | undefined) => void;
  onChangeDDuDuDate: (selectedDate: Date) => void;
  handleCalendarSheetToggleOff: () => void;
}

const BottomSingleCalendar = ({
  currentDate,
  selectedDate,
  setSelected,
  onChangeDDuDuDate,
  handleCalendarSheetToggleOff,
}: BottomSingleCalendarProps) => {
  const handleSelectedDate = () => {
    if (!selectedDate || currentDate === formatDateToYYYYMMDD(selectedDate)) {
      handleCalendarSheetToggleOff();
      return;
    }

    onChangeDDuDuDate(selectedDate);
  };

  return (
    <BottomSheet
      maxHeight={"fit-content"}
      defaultHeight={"fit-content"}
      onClose={handleCalendarSheetToggleOff}
      isShow
    >
      <DayPicker
        locale={ko}
        fixedWeeks
        mode={"single"}
        selected={selectedDate}
        onSelect={setSelected}
        className="w-full pb-[1.5rem] px-[2.4rem]"
        classNames={bottomSheetCalendarStyles}
        components={{
          CaptionLabel: (date: CaptionLabelProps) => (
            <p>
              {date.displayMonth.getFullYear()} {date.displayMonth.getMonth() + 1}월
            </p>
          ),
          IconLeft: ({ ...props }) => (
            <ChevronLeftIcon
              {...props}
              className="h-5 w-5"
              fill="#8E8E8E"
            />
          ),
          IconRight: ({ ...props }) => (
            <ChevronRightIcon
              {...props}
              className="h-5 w-5"
              fill="#8E8E8E"
            />
          ),
        }}
      />
      <div className="px-[2.4rem]">
        <button
          className="w-[100%] max-w-[50rem] h-[5.6rem] bg-example_gray_700 rounded-radius15 mb-[2rem]"
          onClick={handleSelectedDate}
        >
          확인
        </button>
      </div>
    </BottomSheet>
  );
};

export default BottomSingleCalendar;
