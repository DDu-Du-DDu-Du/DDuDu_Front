"use client";

import { CaptionProps, useNavigation } from "react-day-picker";

import ChevronLeftIcon from "@/app/_components/server/icons/ChevronLeftIcon/ChevronLeftIcon";
import ChevronRightIcon from "@/app/_components/server/icons/ChevronRightIcon/ChevronRightIcon";
import { useToggle } from "@/app/_hooks";

import { MonthlyGoalsType } from "../../FeedCalender";
import { MainGoalEditModal } from "./components";

const FeedCalenderHeader = (props: CaptionProps, monthlyGoal?: MonthlyGoalsType[]) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const currentYear = props.displayMonth.getFullYear();
  const currentMonth = props.displayMonth.getMonth() + 1;

  const { isToggle, handleToggleOff, handleToggleOn } = useToggle();

  return (
    <header className="flex flex-col items-center px-4 py-2">
      <section className="flex items-center justify-between w-full mb-3">
        <header className="text-size13 font-medium">
          {currentYear}년 {currentMonth}월
        </header>
        <article className="flex items-center">
          <button
            onClick={() => previousMonth && goToMonth(previousMonth)}
            className="w-auto py-[0.2rem] px-[0.5rem]"
          >
            <ChevronLeftIcon className="h-5 w-5 fill-example_gray_1200" />
          </button>
          <button
            onClick={() => nextMonth && goToMonth(nextMonth)}
            className="w-auto py-[0.2rem] px-[0.5rem]"
          >
            <ChevronRightIcon className="h-5 w-5 fill-example_gray_1200" />
          </button>
        </article>
      </section>
      <article
        className="bg-example_gray_100 w-full rounded-radius10 flex justify-start items-start p-[1.6rem] text-size11 mb-[1.5rem] cursor-pointer"
        onClick={handleToggleOn}
      >
        {monthlyGoal ? (
          <ul className="flex flex-col gap-[0.8rem]">
            {monthlyGoal.map(({ id, contents }) => (
              <li key={id}>{contents}</li>
            ))}
          </ul>
        ) : (
          // TODO: 추후 디자인, 로직 수정
          <p className="w-full text-center text-example_gray_700">월간 목표 추가하기</p>
        )}
      </article>
      <MainGoalEditModal
        isToggle={isToggle}
        monthlyGoal={monthlyGoal}
        handleToggleOff={handleToggleOff}
      />
    </header>
  );
};

export default FeedCalenderHeader;
