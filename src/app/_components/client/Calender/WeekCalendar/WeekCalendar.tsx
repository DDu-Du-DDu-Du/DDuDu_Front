"use client";

import React, { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ChevronLeftIcon, ChevronRightIcon } from "@/app/_components/server";
import { FEED_KEY } from "@/app/_constants/queryKey/queryKey";
import { useClickAway, useToggle } from "@/app/_hooks";
import { fetchCreateGoals, fetchEditGoals } from "@/app/_services/client";
import { RequestPeriodGoals } from "@/app/_types/request/feed/feed";
import { MonthlyWeeklyDDuDuType } from "@/app/_types/response/feed/feed";
import { getDayOfWeek } from "@/app/_utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GoalsType } from "../FeedCalender/FeedCalender";
import DailyDDuDu from "../FeedCalender/components/DailyDDuDu/DailyDDuDu";

import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { twJoin } from "tailwind-merge";

interface WeeklyGoalsFormInfo {
  contents: string;
}

interface WeeklyCalendarProps {
  selectedDDuDuDate: string;
  weeklyDDuDus: MonthlyWeeklyDDuDuType[];
  weeklyGoals?: GoalsType;
}

const WeekCalendar = ({ weeklyDDuDus, weeklyGoals, selectedDDuDuDate }: WeeklyCalendarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const weeklyGoalList = useMemo(() => weeklyGoals?.contents?.split("\n"), [weeklyGoals?.contents]);

  const [year, month] = selectedDDuDuDate.split("-");
  const selectedMonth = useMemo(() => {
    return {
      year,
      month,
    };
  }, [year, month]);

  const methods = useForm<WeeklyGoalsFormInfo>();

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { isToggle, handleToggleOff, handleToggleOn } = useToggle();
  const weeklyGoalsRef = useClickAway<HTMLDivElement>(handleToggleOff);

  const getDateNumber = (dateString: string) => {
    const day = dateString.split("-").at(-1);

    if (!day) {
      throw new Error("dateString 값이 정상적이지 않습니다.");
    }

    return Number(day);
  };

  const padDateNumber = (dateNumber: number) => {
    if (dateNumber >= 10) {
      return dateNumber;
    }
    return `0${dateNumber}`;
  };

  const handleDateClick = (seletedDate: string) => {
    let queryString = searchParams.toString();
    const deleteParamIndex = searchParams.toString().indexOf("&date=");

    if (deleteParamIndex > -1) {
      queryString = searchParams.toString().slice(0, deleteParamIndex);
    }

    const currentURL = `${pathname}?${queryString}`;

    router.replace(`${currentURL}&date=${seletedDate}`);
  };

  const handleNextWeek = () => {
    const selectedWeekLastDay = weeklyDDuDus.at(-1)?.date;

    if (!selectedWeekLastDay) {
      return;
    }

    const [year, month, day] = selectedWeekLastDay.split("-").map(Number);

    const lastDay = new Date(year, month, 0).getDate();

    let queryString = searchParams.toString();
    const deleteParamIndex = searchParams.toString().indexOf("&date=");

    if (deleteParamIndex > -1) {
      queryString = searchParams.toString().slice(0, deleteParamIndex);
    }

    const currentURL = `${pathname}?${queryString}`;

    if (day + 1 > lastDay) {
      if (month === 12) {
        router.replace(`${currentURL}&date=${year + 1}-01-01`);
      } else {
        router.replace(`${currentURL}&date=${year}-${padDateNumber(month + 1)}-01`);
      }
    } else {
      router.replace(
        `${currentURL}&date=${year}-${padDateNumber(month)}-${padDateNumber(day + 1)}`,
      );
    }
  };

  const handlePreviousWeek = () => {
    const selectedWeekLastDay = weeklyDDuDus[0]?.date;

    if (!selectedWeekLastDay) {
      return;
    }

    const [year, month, day] = selectedWeekLastDay.split("-").map(Number);

    let queryString = searchParams.toString();
    const deleteParamIndex = searchParams.toString().indexOf("&date=");

    if (deleteParamIndex > -1) {
      queryString = searchParams.toString().slice(0, deleteParamIndex);
    }

    let prevMonthLastDay = 31;
    if (month - 1 > 0) {
      prevMonthLastDay = new Date(year, month - 1, 0).getDate();
    }
    const currentURL = `${pathname}?${queryString}`;

    if (day - 1 < 1) {
      if (month === 1) {
        router.replace(`${currentURL}&date=${year - 1}-12-${prevMonthLastDay}`);
      } else {
        router.replace(
          `${currentURL}&date=${year}-${padDateNumber(month - 1)}-${prevMonthLastDay}`,
        );
      }
    } else {
      router.replace(
        `${currentURL}&date=${year}-${padDateNumber(month)}-${padDateNumber(day - 1)}`,
      );
    }
  };

  const handleWeeklyGoalUpdate = () => {
    handleToggleOn();
  };

  const onWeeklyGoalsSuccess = async () => {
    queryClient.refetchQueries({ queryKey: [FEED_KEY.WEEKLY_GOALS] });
    handleToggleOff();
  };

  const createWeeklyGoalsMutation = useMutation({
    mutationKey: ["create", "weeklyGoals"],
    mutationFn: fetchCreateGoals,
    onSuccess: onWeeklyGoalsSuccess,
  });

  const editWeeklyGoalsMutation = useMutation({
    mutationKey: ["edit", "weeklyGoals"],
    mutationFn: fetchEditGoals,
    onSuccess: onWeeklyGoalsSuccess,
  });

  const onValid: SubmitHandler<WeeklyGoalsFormInfo> = ({ contents }) => {
    if (!weeklyGoalList) {
      const periodGoals: RequestPeriodGoals = {
        contents,
        type: "WEEK",
        planDate: selectedDDuDuDate,
      };

      createWeeklyGoalsMutation.mutate({
        accessToken: session?.sessionToken as string,
        periodGoals,
      });
    } else if (weeklyGoals && weeklyGoals.id) {
      editWeeklyGoalsMutation.mutate({
        accessToken: session?.sessionToken as string,
        contents,
        periodGoalsId: weeklyGoals.id,
      });
    }
  };

  return (
    <section className="bg-white px-[2.4rem] pb-[1.5rem] rounded-b-[2.5rem]">
      <article className="flex flex-col items-center px-4 py-2">
        <div className="flex items-center justify-between w-full mb-3">
          <strong className="text-size13 font-medium">
            {selectedMonth.year}년 {getDateNumber(selectedMonth.month)}월
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
