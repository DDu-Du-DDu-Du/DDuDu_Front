import { SubmitHandler } from "react-hook-form";

import { GoalEditorFormInfo } from "@/app/(route)/goal/editor/goalEditor.types";
import { FEED_KEY, GOAL_KEY } from "@/app/_constants/queryKey/queryKey";
import { fetchCreateGoal, fetchEditGoal } from "@/app/_services/client/goalEditor";
import { RepeatDduduRequestType } from "@/app/_types/request/repeatDdudu/repeatDdudu";
import { GoalPrivacyType, RepeatDdudusType } from "@/app/_types/response/goal/goal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

interface UseUpdateGoalMutationProps {
  sessionToken: string;
  goalId: string;
  color: string;
  goalPrivacy: GoalPrivacyType;
  repeatDDuDu: RepeatDdudusType[];
  reset: () => void;
}

const useUpdateGoalMutation = ({
  sessionToken,
  goalId,
  color,
  goalPrivacy,
  repeatDDuDu,
  reset,
}: UseUpdateGoalMutationProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleGoalMutationSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [GOAL_KEY.GOAL_LIST] });
    queryClient.invalidateQueries({ queryKey: [FEED_KEY.DAILY_TIMETABLE] });
    queryClient.invalidateQueries({ queryKey: [FEED_KEY.DAILY_LIST] });
    router.back();
    reset();
  };

  const createGoalMutation = useMutation({
    mutationKey: [GOAL_KEY.GOAL_CREATE],
    mutationFn: fetchCreateGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FEED_KEY.MONTHLY_DDUDUS] });
      queryClient.invalidateQueries({ queryKey: [FEED_KEY.WEEKLY_DDUDUS] });
      handleGoalMutationSuccess();
    },
  });

  const editGoalMutation = useMutation({
    mutationKey: [GOAL_KEY.GOAL_EDIT, goalId],
    mutationFn: fetchEditGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GOAL_KEY.GOAL_EDITOR, goalId] });
      handleGoalMutationSuccess();
    },
  });

  const onValid: SubmitHandler<GoalEditorFormInfo> = ({ goal }) => {
    const goalData = {
      name: goal,
      color: color.slice(1),
      privacyType: goalPrivacy,
    };

    if (goalId) {
      editGoalMutation.mutate({ accessToken: sessionToken, goalData, goalId });
    } else {
      const goalRepeatData = repeatDDuDu.map((ddudu) => {
        const repeatDDuDu: RepeatDduduRequestType = {
          name: ddudu.name,
          startDate: ddudu.startDate,
          endDate: ddudu.endDate,
          repeatType: ddudu.repeatPattern.repeatType,
        };

        if (ddudu.repeatPattern.repeatType === "WEEKLY") {
          repeatDDuDu.repeatDaysOfWeek = ddudu.repeatPattern.repeatDaysOfWeek;
        } else if (ddudu.repeatPattern.repeatType === "MONTHLY") {
          repeatDDuDu.repeatDaysOfMonth = ddudu.repeatPattern.repeatDaysOfMonth;
          repeatDDuDu.lastDayOfMonth = ddudu.repeatPattern.lastDay;
        }

        if (ddudu.beginAt && ddudu.endAt) {
          repeatDDuDu.beginAt = ddudu.beginAt;
          repeatDDuDu.endAt = ddudu.endAt;
        }

        return repeatDDuDu;
      });

      createGoalMutation.mutate({
        accessToken: sessionToken,
        goalData: { ...goalData, repeatDdudus: [...goalRepeatData] },
      });
    }
  };
  return {
    onValid,
  };
};

export default useUpdateGoalMutation;
