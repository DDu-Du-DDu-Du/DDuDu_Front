"use client";

import { CaptionProps, useNavigation } from "react-day-picker";
import { useForm } from "react-hook-form";

import ChevronLeftIcon from "@/app/_components/server/icons/ChevronLeftIcon/ChevronLeftIcon";
import ChevronRightIcon from "@/app/_components/server/icons/ChevronRightIcon/ChevronRightIcon";
import { useToggle } from "@/app/_hooks";
import { getMonthlyDDuDus, getMonthlyGoals } from "@/app/_services/client";
import { MonthlyDDuDuType } from "@/app/_types/response/feed/feed";
import { useQueryClient } from "@tanstack/react-query";

import { MonthlyGoalsType } from "../../FeedCalender";

// import { MainGoalEditModal } from "./components";
import { useSession } from "next-auth/react";

interface FeedCalenderHeaderProps {
  props: CaptionProps;
  monthlyGoals?: MonthlyGoalsType;
}

const FeedCalenderHeader = ({ props, monthlyGoals }: FeedCalenderHeaderProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
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

  const methods = useForm();

  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { isToggle, handleToggleOn } = useToggle();

  const MonthlyDDuDUs = async (type: "next" | "prev") => {
    const { year, month } = convertCurrentDate(type);
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

  const MonthlyGoals = async (type: "next" | "prev") => {
    const { year, month } = convertCurrentDate(type);
    const currentDate = `${year}-${month < 10 ? "0" : ""}${month}-01`;
    return await queryClient.fetchQuery<MonthlyGoalsType[]>({
      queryKey: ["monthlyGoals", year, month],
      queryFn: () =>
        getMonthlyGoals({
          accessToken: session?.sessionToken as string,
          type: "MONTH",
          date: currentDate,
        }),
    });
  };

  const handleNextToMonth = async () => {
    nextMonth && goToMonth(nextMonth);
    const newMonthlyDDuDus = await MonthlyDDuDUs("next");
    queryClient.setQueryData(["monthlyDDuDus"], () => newMonthlyDDuDus);

    const newMonthlyGoals = await MonthlyGoals("next");
    queryClient.setQueryData(["monthlyGoals"], () => newMonthlyGoals);
  };

  const handlePrevToMonth = async () => {
    previousMonth && goToMonth(previousMonth);
    const newMonthlyDDuDus = await MonthlyDDuDUs("prev");
    queryClient.setQueryData(["monthlyDDuDus"], () => newMonthlyDDuDus);

    const newMonthlyGoals = await MonthlyGoals("prev");
    queryClient.setQueryData(["monthlyGoals"], () => newMonthlyGoals);
  };

  const handleMonthlyGoalUpdate = () => {
    handleToggleOn();
  };

  const onValid = () => {};

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
      {isToggle === false && (
        <article
          className="bg-example_gray_100 w-full rounded-radius10 flex justify-start items-start p-[1.6rem] text-size11 mb-[1.5rem] cursor-pointer"
          onClick={handleMonthlyGoalUpdate}
        >
          {monthlyGoals?.contents ? (
            <p className="w-full text-left text-example_black_500">{monthlyGoals.contents}</p>
          ) : (
            // TODO: 추후 디자인, 로직 수정
            <p className="w-full text-left text-example_gray_700">월 별 목표를 설정해 보세요!</p>
          )}
        </article>
      )}
      {isToggle && (
        <form
          className="flex justify-end flex-wrap bg-example_gray_100 w-full rounded-radius10 p-[1.6rem] text-size11 mb-[1.5rem] cursor-pointer"
          onSubmit={methods.handleSubmit(onValid)}
        >
          <textarea
            className="w-[100%] bg-transparent outline-none resize-none"
            defaultValue={monthlyGoals?.contents || ""}
            {...methods.register("content", { required: true })}
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
      {/* <MainGoalEditModal
        isToggle={isToggle}
        monthlyGoals={monthlyGoals}
        handleToggleOff={handleToggleOff}
      /> */}
    </header>
  );
};

export default FeedCalenderHeader;
