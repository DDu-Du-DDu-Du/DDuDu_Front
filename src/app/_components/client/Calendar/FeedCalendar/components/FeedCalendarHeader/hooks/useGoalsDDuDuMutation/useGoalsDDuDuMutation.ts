import { useNavigation } from "react-day-picker";

import { FEED_KEY, QUERY_KEY } from "@/app/_constants/queryKey/queryKey";
import {
  fetchCreateGoals,
  fetchEditGoals,
  getGoals,
  getMonthlyDDuDus,
} from "@/app/_services/client";
import { MonthlyWeeklyDDuDuType } from "@/app/_types/response/feed/feed";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GoalsType } from "../../../../FeedCalendar";
import { convertCurrentDate } from "../../utils";

import { useSession } from "next-auth/react";

interface UseGoalsDDuDuMutationProps {
  currentYear: number;
  currentMonth: number;
  handleToggleOff: () => void;
}

const useGoalsDDuDuMutation = ({
  currentYear,
  currentMonth,
  handleToggleOff,
}: UseGoalsDDuDuMutationProps) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  const MonthlyGoals = async (year: number, month: number) => {
    const currentDate = `${year}-${month < 10 ? "0" : ""}${month}-01`;
    return await queryClient.fetchQuery<GoalsType>({
      queryKey: [FEED_KEY.MONTHLY_GOALS, year, month],
      queryFn: () =>
        getGoals({
          accessToken: session?.sessionToken as string,
          type: "MONTH",
          date: currentDate,
        }),
    });
  };

  const onMonthlyGoalsSuccess = async () => {
    queryClient.invalidateQueries({
      queryKey: [FEED_KEY.MONTHLY_GOALS, currentYear, currentMonth],
    });
    const updateMonthlyGoals = await MonthlyGoals(currentYear, currentMonth);
    queryClient.setQueryData([FEED_KEY.MONTHLY_GOALS], () => updateMonthlyGoals);
    handleToggleOff();
  };

  const createMonthlyGoalsMutation = useMutation({
    mutationKey: [FEED_KEY.MONTHLY_GOALS, QUERY_KEY.CREATE],
    mutationFn: fetchCreateGoals,
    onSuccess: onMonthlyGoalsSuccess,
  });

  const editMonthlyGoalsMutation = useMutation({
    mutationKey: [FEED_KEY.MONTHLY_GOALS, QUERY_KEY.EDIT],
    mutationFn: fetchEditGoals,
    onSuccess: onMonthlyGoalsSuccess,
  });

  const MonthlyDDuDUs = async (year: number, month: number) => {
    const currentDate = `${year}-${month < 10 ? "0" : ""}${month}`;
    return await queryClient.fetchQuery<MonthlyWeeklyDDuDuType[]>({
      queryKey: [FEED_KEY.MONTHLY_DDUDUS, year, month],
      queryFn: () =>
        getMonthlyDDuDus({
          accessToken: session?.sessionToken as string,
          userId: session?.user.userId as number,
          date: currentDate,
        }),
    });
  };
  const handleNextToMonth = async () => {
    const { year, month } = convertCurrentDate("next", currentYear, currentMonth);

    nextMonth && goToMonth(nextMonth);
    const newMonthlyDDuDus = await MonthlyDDuDUs(year, month);
    queryClient.setQueryData([FEED_KEY.MONTHLY_DDUDUS], () => newMonthlyDDuDus);

    const newMonthlyGoals = await MonthlyGoals(year, month);
    queryClient.setQueryData([FEED_KEY.MONTHLY_GOALS], () => newMonthlyGoals);
  };

  const handlePrevToMonth = async () => {
    const { year, month } = convertCurrentDate("prev", currentYear, currentMonth);

    previousMonth && goToMonth(previousMonth);
    const newMonthlyDDuDus = await MonthlyDDuDUs(year, month);
    queryClient.setQueryData([FEED_KEY.MONTHLY_DDUDUS], () => newMonthlyDDuDus);

    const newMonthlyGoals = await MonthlyGoals(year, month);
    queryClient.setQueryData([FEED_KEY.MONTHLY_GOALS], () => newMonthlyGoals);
  };
  return {
    createMonthlyGoalsMutation,
    editMonthlyGoalsMutation,
    handleNextToMonth,
    handlePrevToMonth,
  };
};

export default useGoalsDDuDuMutation;
