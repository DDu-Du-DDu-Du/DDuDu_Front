"use client";

import { DayContentProps } from "react-day-picker";

import useFeedCalenderDayConetent from "../../hooks/useFeedCalenderDayContent/useFeedCalenderDayConetns";
import DailyDDuDu from "../DailyDDuDu/DailyDDuDu";
import { DAILY_DDUDU_MOCK_DATA_TYPE } from "../DailyDDuDu/DailyDDuDu.constant";

import { twMerge } from "tailwind-merge";

const FeedCalenderDayContent = (
  props: DayContentProps,
  monthlyDDuDus: DAILY_DDUDU_MOCK_DATA_TYPE,
) => {
  const { isToday, selectedDate, formattedDate } = useFeedCalenderDayConetent(props);

  return (
    <div
      className={twMerge(
        "flex flex-col gap-2 p-2",
        isToday && "font-bold bg-example_gray_300 rounded-radius5",
      )}
    >
      {/* TODO: API 연결 후 데이터 교체 */}
      {monthlyDDuDus[formattedDate] && (
        <DailyDDuDu
          totalCount={monthlyDDuDus[formattedDate].total}
          doneCount={monthlyDDuDus[formattedDate].done}
          restCount={monthlyDDuDus[formattedDate].rest}
        />
      )}

      <p className="text-example_gray_800">{selectedDate}</p>
    </div>
  );
};

export default FeedCalenderDayContent;
