"use client";

import { DayContentProps } from "react-day-picker";

import useFeedCalenderDayConetent from "../../hooks/useFeedCalenderDayContent/useFeedCalenderDayConetns";
import DailyDDuDu from "../DailyDDuDu/DailyDDuDu";
import { DAILY_DDUDU_MOCK_DATA_TYPE } from "../DailyDDuDu/DailyDDuDu.constant";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface FeedCalenderDayContentProps {
  props: DayContentProps;
  monthlyDDuDus: DAILY_DDUDU_MOCK_DATA_TYPE;
  currentURL: string;
  selectedDDuDu?: string;
}

const FeedCalenderDayContent = ({
  props,
  monthlyDDuDus,
  currentURL,
  selectedDDuDu,
}: FeedCalenderDayContentProps) => {
  const { isToday, selectedDate, formattedDate } = useFeedCalenderDayConetent(props);

  const router = useRouter();

  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center gap-2 w-[4.2rem] h-[5.4rem] text-size11",
        (selectedDDuDu === formattedDate || (!selectedDDuDu && isToday)) &&
          "font-bold bg-example_gray_300 rounded-radius5",
      )}
      onClick={() => router.replace(`${currentURL}&date=${formattedDate}`)}
    >
      {/* TODO: API 연결 후 데이터 교체 */}
      {monthlyDDuDus[formattedDate] ? (
        <DailyDDuDu
          totalCount={monthlyDDuDus[formattedDate].total}
          doneCount={monthlyDDuDus[formattedDate].done}
          restCount={monthlyDDuDus[formattedDate].rest}
        />
      ) : (
        <div className="rounded-full shrink-0 w-[2.4rem] h-[2.4rem] bg-example_gray_100 flex justify-center items-center" />
      )}

      <p className="text-example_gray_800">{selectedDate}</p>
    </div>
  );
};

export default FeedCalenderDayContent;
