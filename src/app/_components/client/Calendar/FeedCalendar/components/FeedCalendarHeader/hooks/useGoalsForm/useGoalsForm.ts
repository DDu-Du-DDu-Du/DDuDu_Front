import { SubmitHandler, useForm } from "react-hook-form";

import { RequestPeriodGoals } from "@/app/_types/request/feed/feed";

import { GoalsType } from "../../../../FeedCalendar";
import useGoalsDDuDuMutation from "../useGoalsDDuDuMutation/useGoalsDDuDuMutation";

import { useSession } from "next-auth/react";

interface MonthlyGoalsFormInfo {
  contents: string;
}

interface UseGoalsFormProps {
  currentYear: number;
  currentMonth: number;
  monthlyGoals?: GoalsType;
  monthlyGoalList?: string[];
  handleToggleOff: () => void;
}

const useGoalsForm = ({
  currentYear,
  currentMonth,
  monthlyGoals,
  monthlyGoalList,
  handleToggleOff,
}: UseGoalsFormProps) => {
  const methods = useForm<MonthlyGoalsFormInfo>();

  const { data: session } = useSession();

  const { createMonthlyGoalsMutation, editMonthlyGoalsMutation } = useGoalsDDuDuMutation({
    currentYear,
    currentMonth,
    handleToggleOff,
  });

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

  return {
    methods,
    onValid,
  };
};

export default useGoalsForm;
