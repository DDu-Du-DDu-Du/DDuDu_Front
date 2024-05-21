"use client";

import { CaptionProps, useNavigation } from "react-day-picker";

import ChevronLeftIcon from "@/app/_components/server/icons/ChevronLeftIcon/ChevronLeftIcon";
import ChevronRightIcon from "@/app/_components/server/icons/ChevronRightIcon/ChevronRightIcon";

const FeedCalenderHeader = (props: CaptionProps, MonthlyGoal: string[]) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const currentYear = props.displayMonth.getFullYear();
  const currentMonth = props.displayMonth.getMonth() + 1;

  return (
    <header className="flex flex-col items-center px-4 py-2">
      <section className="flex items-center justify-between w-full mb-3">
        <header className="text-lg font-medium">
          {currentYear}년 {currentMonth}월
        </header>
        <div className="flex items-center">
          <button
            onClick={() => previousMonth && goToMonth(previousMonth)}
            className="h-5 w-5"
          >
            <ChevronLeftIcon className="h-5 w-5 fill-example_gray_1200" />
          </button>
          <button
            onClick={() => nextMonth && goToMonth(nextMonth)}
            className="h-5 w-5"
          >
            <ChevronRightIcon className="h-5 w-5 fill-example_gray_1200" />
          </button>
        </div>
      </section>
      <div className="bg-example_gray_100 w-full rounded-radius10 flex justify-start items-start p-3 text-sm mb-4">
        <ul>
          {MonthlyGoal.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default FeedCalenderHeader;
