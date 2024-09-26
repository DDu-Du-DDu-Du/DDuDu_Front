import { FEED_KEY, QUERY_KEY } from "@/app/_constants/queryKey/queryKey";
import { fetchCreateGoals, fetchEditGoals } from "@/app/_services/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseWeeklyGoalsMutationProps {
  handleToggleOff: () => void;
}

const useWeeklyGoalsMutation = ({ handleToggleOff }: UseWeeklyGoalsMutationProps) => {
  const queryClient = useQueryClient();
  const onWeeklyGoalsSuccess = async () => {
    queryClient.refetchQueries({ queryKey: [FEED_KEY.WEEKLY_GOALS] });
    handleToggleOff();
  };

  const createWeeklyGoalsMutation = useMutation({
    mutationKey: [FEED_KEY.WEEKLY_GOALS, QUERY_KEY.CREATE],
    mutationFn: fetchCreateGoals,
    onSuccess: onWeeklyGoalsSuccess,
  });

  const editWeeklyGoalsMutation = useMutation({
    mutationKey: [FEED_KEY.WEEKLY_GOALS, QUERY_KEY.EDIT],
    mutationFn: fetchEditGoals,
    onSuccess: onWeeklyGoalsSuccess,
  });
  return { createWeeklyGoalsMutation, editWeeklyGoalsMutation };
};

export default useWeeklyGoalsMutation;
