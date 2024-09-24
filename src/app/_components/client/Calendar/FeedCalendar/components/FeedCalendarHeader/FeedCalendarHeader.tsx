import { CaptionProps } from "react-day-picker";

import ChevronLeftIcon from "@/app/_components/server/icons/ChevronLeftIcon/ChevronLeftIcon";
import ChevronRightIcon from "@/app/_components/server/icons/ChevronRightIcon/ChevronRightIcon";

import { GoalsType } from "../../FeedCalendar";
import { useGoalsDDuDuMutation, useGoalsForm } from "./hooks";
import useMonthlyCalendar from "./hooks/useMonthlyCalendar/useMonthlyCalendar";

interface FeedCalenderHeaderProps {
  props: CaptionProps;
  monthlyGoals?: GoalsType;
}

const FeedCalendarHeader = ({ props, monthlyGoals }: FeedCalenderHeaderProps) => {
  const {
    isToggle,
    monthlyGoalsRef,
    monthlyGoalList,
    currentYear,
    currentMonth,
    handleToggleOff,
    handleMonthlyGoalUpdate,
  } = useMonthlyCalendar({ props, monthlyGoals });

  const { handlePrevToMonth, handleNextToMonth } = useGoalsDDuDuMutation({
    currentYear,
    currentMonth,
    handleToggleOff,
  });

  const { methods, onValid } = useGoalsForm({
    currentYear,
    currentMonth,
    monthlyGoals,
    monthlyGoalList,
    handleToggleOff,
  });

  return (
    <header className="flex flex-col items-center px-4 py-2">
      <section className="flex items-center justify-between w-full mb-3">
        <header className="text-size13 font-medium">
          {currentYear}년 {currentMonth}월
        </header>
        <article className="flex items-center">
          <button
            onClick={handlePrevToMonth}
            className="w-auto py-[0.2rem] px-[0.5rem]"
          >
            <ChevronLeftIcon className="h-5 w-5 fill-example_gray_1200" />
          </button>
          <button
            onClick={handleNextToMonth}
            className="w-auto py-[0.2rem] px-[0.5rem]"
          >
            <ChevronRightIcon className="h-5 w-5 fill-example_gray_1200" />
          </button>
        </article>
      </section>
      <section
        className="bg-example_gray_100 w-full rounded-radius10 text-size11 mb-[1.5rem] cursor-pointer"
        ref={monthlyGoalsRef}
      >
        {isToggle === false && (
          <article
            className="size-[100%] p-[1.6rem]"
            onClick={handleMonthlyGoalUpdate}
          >
            {monthlyGoalList?.length ? (
              <ul>
                {monthlyGoalList.map((goal) => (
                  <li
                    key={goal}
                    className="w-full text-left text-example_black_500"
                  >
                    {goal}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="w-full text-left text-example_gray_700">월 별 목표를 설정해 보세요!</p>
            )}
          </article>
        )}
        {isToggle && (
          <form
            className="flex justify-end flex-wrap p-[1.6rem]"
            onSubmit={methods.handleSubmit(onValid)}
          >
            <textarea
              className="w-[100%] bg-transparent outline-none resize-none"
              defaultValue={monthlyGoals?.contents || ""}
              {...methods.register("contents", { required: true })}
              autoFocus
            />
            <button
              className="flex justify-end bg-example_gray_800 text-white_100 rounded-radius5 p-[0.5rem]"
              type="submit"
            >
              목표 설정
            </button>
          </form>
        )}
      </section>
    </header>
  );
};

export default FeedCalendarHeader;
