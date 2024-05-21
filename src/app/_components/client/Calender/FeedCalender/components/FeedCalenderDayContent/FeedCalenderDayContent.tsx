"use client";

import { DayContentProps } from "react-day-picker";

import formatDateToYYYYMMDD from "@/app/_utils/formatDateToYYYYMMDD/formatDateToYYYYMMDD";

import DailyDDuDu from "../DailyDDuDu/DailyDDuDu";
import { DAILY_DDUDU_MOCK_DATA } from "../DailyDDuDu/DailyDDuDu.constant";

import { twMerge } from "tailwind-merge";

const FeedCalenderDayContent = (props: DayContentProps) => {
  const formattedDate = formatDateToYYYYMMDD(props.date);
  const [selectedYear, selectedMonth, selectedDate] = [
    props.date.getFullYear(),
    props.date.getMonth() + 1,
    props.date.getDate(),
  ];
  const today = new Date();
  const [currentYear, currentMonth, currentDate] = [
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  ];

  const isToday =
    selectedYear === currentYear && selectedMonth === currentMonth && selectedDate === currentDate;

  return (
    <div
      className={twMerge(
        "flex flex-col gap-2 p-2",
        isToday && "font-bold bg-example_gray_300 rounded-radius5",
      )}
    >
      {/* TODO: API 연결 후 데이터 교체 */}
      {DAILY_DDUDU_MOCK_DATA[formattedDate] && (
        <DailyDDuDu
          totalCount={DAILY_DDUDU_MOCK_DATA[formattedDate].total}
          doneCount={DAILY_DDUDU_MOCK_DATA[formattedDate].done}
          restCount={DAILY_DDUDU_MOCK_DATA[formattedDate].rest}
        />
      )}

      <p className="text-example_gray_800">{selectedDate}</p>
    </div>
  );
};

export default FeedCalenderDayContent;
