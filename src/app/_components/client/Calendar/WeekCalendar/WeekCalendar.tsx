"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@/app/_components/server";
import { MonthlyWeeklyDDuDuType } from "@/app/_types/response/feed/feed";
import { getDayOfWeek } from "@/app/_utils";

import { GoalsType } from "../FeedCalendar/FeedCalendar";
import DailyDDuDu from "../FeedCalendar/components/DailyDDuDu/DailyDDuDu";
import { useCalendar, useGoalsForm, useWeeklyDate } from "./hooks";
import { getDateNumber } from "./utils";

import { twJoin } from "tailwind-merge";

interface WeeklyCalendarProps {
  selectedDDuDuDate: string;
  weeklyDDuDus: MonthlyWeeklyDDuDuType[];
  weeklyGoals?: GoalsType;
}

const WeekCalendar = ({ weeklyDDuDus, weeklyGoals, selectedDDuDuDate }: WeeklyCalendarProps) => {
  const { weeklyGoalList, selectedDate } = useCalendar({ selectedDDuDuDate, weeklyGoals });

  const { isToggle, weeklyGoalsRef, methods, handleWeeklyGoalUpdate, onValid } = useGoalsForm({
    selectedDDuDuDate,
    weeklyGoalList,
    weeklyGoals,
  });

  const { handleDateClick, handlePreviousWeek, handleNextWeek } = useWeeklyDate({ weeklyDDuDus });

  return (
    <section className="bg-white px-[2.4rem] pb-[1.5rem] rounded-b-[2.5rem]">
      <article className="flex flex-col items-center px-4 py-2">
        <div className="flex items-center justify-between w-full mb-3">
          <strong className="text-size13 font-medium">
            {selectedDate.year}년 {getDateNumber(selectedDate.month)}월
          </strong>
          <div className="flex items-center">
            <button
              className="w-auto py-[0.2rem] px-[0.5rem]"
              onClick={handlePreviousWeek}
            >
              <ChevronLeftIcon className="h-5 w-5 fill-example_gray_1200" />
            </button>
            <button
              className="w-auto py-[0.2rem] px-[0.5rem]"
              onClick={handleNextWeek}
            >
              <ChevronRightIcon className="h-5 w-5 fill-example_gray_1200" />
            </button>
          </div>
        </div>
        <div
          className="bg-example_gray_100 w-full rounded-radius10 text-size11 mb-[1.5rem] cursor-pointer"
          ref={weeklyGoalsRef}
        >
          {isToggle === false && (
            <article
              className="size-[100%] p-[1.6rem]"
              onClick={handleWeeklyGoalUpdate}
            >
              {weeklyGoalList?.length ? (
                <ul>
                  {weeklyGoalList.map((goal) => (
                    <li
                      key={goal}
                      className="w-full text-left text-example_black_500"
                    >
                      {goal}
                    </li>
                  ))}
                </ul>
              ) : (
                // TODO: 추후 디자인, 로직 수정
                <p className="w-full text-left text-example_gray_700">
                  주 간 목표를 설정해 보세요!
                </p>
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
                defaultValue={weeklyGoals?.contents || ""}
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
        </div>
      </article>
      <div className="grid grid-cols-7 justify-items-center text-center text-size11">
        {weeklyDDuDus.map(({ date, totalCount, uncompletedCount }) => (
          <div key={date}>
            <div className="h-[2.1rem] text-example_gray_1100">{getDayOfWeek(date)}</div>
            <div
              className={twJoin(
                "flex flex-col justify-center items-center w-[4.2rem] h-[5.4rem] rounded-radius5 gap-[0.5rem] m-1 cursor-pointer",
                date === selectedDDuDuDate ? "bg-example_gray_300" : "",
              )}
              onClick={() => handleDateClick(date)}
            >
              {totalCount > 0 ? (
                <DailyDDuDu
                  totalCount={totalCount}
                  restCount={uncompletedCount}
                  doneCount={totalCount - uncompletedCount}
                />
              ) : (
                <div className="rounded-full shrink-0 w-[2.4rem] h-[2.4rem] bg-example_gray_100 flex justify-center items-center" />
              )}
              <div
                className={twJoin(
                  "text-example_gray_800",
                  date === selectedDDuDuDate ? "font-bold" : "",
                )}
              >
                {getDateNumber(date)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeekCalendar;
