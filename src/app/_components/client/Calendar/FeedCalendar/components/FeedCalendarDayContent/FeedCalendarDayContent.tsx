import { DayContentProps } from "react-day-picker";

import { MonthlyWeeklyDDuDuType } from "@/app/_types/response/feed/feed";

import useFeedCalendarDayConetent from "../../hooks/useFeedCalendarDayContent/useFeedCalendarDayContent";
import DailyDDuDu from "../DailyDDuDu/DailyDDuDu";

import { useRouter } from "next/navigation";
import { twJoin, twMerge } from "tailwind-merge";

interface FeedCalendarDayContentProps {
  props: DayContentProps;
  monthlyDDuDus: MonthlyWeeklyDDuDuType[];
  currentURL: string;
  selectedDDuDuDate?: string;
}

const FeedCalendarDayContent = ({
  props,
  monthlyDDuDus,
  currentURL,
  selectedDDuDuDate,
}: FeedCalendarDayContentProps) => {
  const { isToday, selectedDate, formattedDate } = useFeedCalendarDayConetent(props);

  const router = useRouter();

  const dailyDDuDuDate = monthlyDDuDus.find((ddudu) => ddudu.date === formattedDate);

  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center gap-2 w-[4.2rem] h-[5.4rem]",
        (selectedDDuDuDate === formattedDate || (!selectedDDuDuDate && isToday)) &&
          "text-sub_3 font-bold bg-sub_2 rounded-radius5",
      )}
      onClick={() => router.replace(`${currentURL}&date=${formattedDate}`)}
    >
      {dailyDDuDuDate && dailyDDuDuDate.totalCount > 0 ? (
        <DailyDDuDu
          totalCount={dailyDDuDuDate.totalCount}
          doneCount={dailyDDuDuDate.totalCount - dailyDDuDuDate.uncompletedCount}
          restCount={dailyDDuDuDate.uncompletedCount}
        />
      ) : (
        <div
          className={twJoin(
            "rounded-full shrink-0 w-[2.4rem] h-[2.4rem] bg-sub_1 border flex justify-center items-center",
            (selectedDDuDuDate === formattedDate || (!selectedDDuDuDate && isToday)) &&
              "border-sub_3",
          )}
        />
      )}

      <p>{selectedDate}</p>
    </div>
  );
};

export default FeedCalendarDayContent;
