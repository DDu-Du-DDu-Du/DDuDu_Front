import { useNavigation } from "react-day-picker";

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
      queryKey: ["monthlyGoals", year, month],
      queryFn: () =>
        getGoals({
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
    mutationFn: fetchCreateGoals,
    onSuccess: onMonthlyGoalsSuccess,
  });

  const editMonthlyGoalsMutation = useMutation({
    mutationKey: ["edit", "monthlyGoals"],
    mutationFn: fetchEditGoals,
    onSuccess: onMonthlyGoalsSuccess,
  });

  const MonthlyDDuDUs = async (year: number, month: number) => {
    const currentDate = `${year}-${month < 10 ? "0" : ""}${month}`;
    return await queryClient.fetchQuery<MonthlyWeeklyDDuDuType[]>({
      queryKey: ["monthlyDDuDus", year, month],
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
    queryClient.setQueryData(["monthlyDDuDus"], () => newMonthlyDDuDus);

    const newMonthlyGoals = await MonthlyGoals(year, month);
    queryClient.setQueryData(["monthlyGoals"], () => newMonthlyGoals);
  };

  const handlePrevToMonth = async () => {
    const { year, month } = convertCurrentDate("prev", currentYear, currentMonth);

    previousMonth && goToMonth(previousMonth);
    const newMonthlyDDuDus = await MonthlyDDuDUs(year, month);
    queryClient.setQueryData(["monthlyDDuDus"], () => newMonthlyDDuDus);

    const newMonthlyGoals = await MonthlyGoals(year, month);
    queryClient.setQueryData(["monthlyGoals"], () => newMonthlyGoals);
  };
  return {
    createMonthlyGoalsMutation,
    editMonthlyGoalsMutation,
    handleNextToMonth,
    handlePrevToMonth,
  };
};

export default useGoalsDDuDuMutation;
