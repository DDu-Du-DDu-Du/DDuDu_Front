import { SubmitHandler, useForm } from "react-hook-form";

import { useClickAway, useToggle } from "@/app/_hooks";
import { RequestPeriodGoals } from "@/app/_types/request/feed/feed";

import { GoalsType } from "../../../FeedCalendar/FeedCalendar";
import useWeeklyGoalsMutation from "../useWeeklyGoalsMutation/useWeeklyGoalsMutation";

import { useSession } from "next-auth/react";

interface WeeklyGoalsFormInfo {
  contents: string;
}

interface UseGoalsFormProps {
  selectedDDuDuDate: string;
  weeklyGoalList?: string[];
  weeklyGoals?: GoalsType;
}

const useGoalsForm = ({ selectedDDuDuDate, weeklyGoalList, weeklyGoals }: UseGoalsFormProps) => {
  const { isToggle, handleToggleOff, handleToggleOn } = useToggle();
  const weeklyGoalsRef = useClickAway<HTMLDivElement>(handleToggleOff);

  const handleWeeklyGoalUpdate = () => {
    handleToggleOn();
  };
  const methods = useForm<WeeklyGoalsFormInfo>();

  const { data: session } = useSession();

  const { createWeeklyGoalsMutation, editWeeklyGoalsMutation } = useWeeklyGoalsMutation({
    handleToggleOff,
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

  return { isToggle, weeklyGoalsRef, methods, handleWeeklyGoalUpdate, onValid };
};

export default useGoalsForm;
