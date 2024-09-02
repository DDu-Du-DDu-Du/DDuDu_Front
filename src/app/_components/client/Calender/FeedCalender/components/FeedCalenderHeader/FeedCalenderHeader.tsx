"use client";

import { useMemo } from "react";
import { CaptionProps, useNavigation } from "react-day-picker";
import { SubmitHandler, useForm } from "react-hook-form";

import ChevronLeftIcon from "@/app/_components/server/icons/ChevronLeftIcon/ChevronLeftIcon";
import ChevronRightIcon from "@/app/_components/server/icons/ChevronRightIcon/ChevronRightIcon";
import { useClickAway, useToggle } from "@/app/_hooks";
import {
  fetchCreateMonthlyGoals,
  fetchEditMonthlyGoals,
  getMonthlyDDuDus,
  getMonthlyGoals,
} from "@/app/_services/client";
import { RequestPeriodGoals } from "@/app/_types/request/feed/feed";
import { MonthlyDDuDuType } from "@/app/_types/response/feed/feed";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MonthlyGoalsType } from "../../FeedCalender";

import { useSession } from "next-auth/react";

interface MonthlyGoalsFormInfo {
  contents: string;
}

interface FeedCalenderHeaderProps {
  props: CaptionProps;
  monthlyGoals?: MonthlyGoalsType;
}

const FeedCalenderHeader = ({ props, monthlyGoals }: FeedCalenderHeaderProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const monthlyGoalList = useMemo(
    () => monthlyGoals?.contents?.split("\n"),
    [monthlyGoals?.contents],
  );
  const currentYear = props.displayMonth.getFullYear();
  const currentMonth = props.displayMonth.getMonth() + 1;

  const convertCurrentDate = (type: "next" | "prev") => {
    let year = currentYear;
    let month = currentMonth;

    if (type === "next") {
      year = currentMonth + 1 > 12 ? currentYear + 1 : currentYear;
      month = currentMonth + 1 > 12 ? 1 : currentMonth + 1;
    } else if (type === "prev") {
      year = currentMonth - 1 < 1 ? currentYear - 1 : currentYear;
      month = currentMonth - 1 < 1 ? 12 : currentMonth - 1;
    }

    return { year, month };
  };

  const methods = useForm<MonthlyGoalsFormInfo>();

  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { isToggle, handleToggleOn, handleToggleOff } = useToggle();
  const monthlyGoalsRef = useClickAway<HTMLSelectElement>(handleToggleOff);

  const MonthlyDDuDUs = async (year: number, month: number) => {
    const currentDate = `${year}-${month < 10 ? "0" : ""}${month}`;
    return await queryClient.fetchQuery<MonthlyDDuDuType[]>({
      queryKey: ["monthlyDDuDus", year, month],
      queryFn: () =>
        getMonthlyDDuDus({
          accessToken: session?.sessionToken as string,
          userId: session?.user.userId as number,
          date: currentDate,
        }),
    });
  };

  const MonthlyGoals = async (year: number, month: number) => {
    const currentDate = `${year}-${month < 10 ? "0" : ""}${month}-01`;
    return await queryClient.fetchQuery<MonthlyGoalsType>({
      queryKey: ["monthlyGoals", year, month],
      queryFn: () =>
        getMonthlyGoals({
          accessToken: session?.sessionToken as string,
          type: "MONTH",
          date: currentDate,
        }),
    });
  };

  const onMonthlyGoalsSuccess = async () => {
    queryClient.invalidateQueries({ queryKey: ["monthlyGoals", currentYear, currentMonth] });
    const updateMonthlyGoals = await MonthlyGoals(currentYear, currentMonth);
    queryClient.setQueryData(["monthlyGoals"], () => updateMonthlyGoals);
    handleToggleOff();
  };

  const createMonthlyGoalsMutation = useMutation({
    mutationKey: ["create", "monthlyGoals"],
    mutationFn: fetchCreateMonthlyGoals,
    onSuccess: onMonthlyGoalsSuccess,
  });

  const editMonthlyGoalsMutation = useMutation({
    mutationKey: ["edit", "monthlyGoals"],
    mutationFn: fetchEditMonthlyGoals,
    onSuccess: onMonthlyGoalsSuccess,
  });

  const handleNextToMonth = async () => {
    const { year, month } = convertCurrentDate("next");

    nextMonth && goToMonth(nextMonth);
    const newMonthlyDDuDus = await MonthlyDDuDUs(year, month);
    queryClient.setQueryData(["monthlyDDuDus"], () => newMonthlyDDuDus);

    const newMonthlyGoals = await MonthlyGoals(year, month);
    queryClient.setQueryData(["monthlyGoals"], () => newMonthlyGoals);
  };

  const handlePrevToMonth = async () => {
    const { year, month } = convertCurrentDate("prev");

    previousMonth && goToMonth(previousMonth);
    const newMonthlyDDuDus = await MonthlyDDuDUs(year, month);
    queryClient.setQueryData(["monthlyDDuDus"], () => newMonthlyDDuDus);

    const newMonthlyGoals = await MonthlyGoals(year, month);
    queryClient.setQueryData(["monthlyGoals"], () => newMonthlyGoals);
  };

  const handleMonthlyGoalUpdate = () => {
    handleToggleOn();
  };

  const onValid: SubmitHandler<MonthlyGoalsFormInfo> = ({ contents }) => {
    if (!monthlyGoalList) {
      const periodGoals: RequestPeriodGoals = {
        contents,
        type: "MONTH",
        planDate: `${currentYear}-${currentMonth < 10 ? "0" : ""}${currentMonth}-01`,
      };

      createMonthlyGoalsMutation.mutate({
        accessToken: session?.sessionToken as string,
        periodGoals,
      });
    } else if (monthlyGoals && monthlyGoals.id) {
      editMonthlyGoalsMutation.mutate({
        accessToken: session?.sessionToken as string,
        contents,
        periodGoalsId: monthlyGoals.id,
      });
    }
  };

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
              // TODO: 추후 디자인, 로직 수정
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

export default FeedCalenderHeader;
