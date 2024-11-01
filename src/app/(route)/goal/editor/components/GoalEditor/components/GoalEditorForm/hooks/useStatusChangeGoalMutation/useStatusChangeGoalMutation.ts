import { FEED_KEY, GOAL_KEY } from "@/app/_constants/queryKey/queryKey";
import { fetchStatusChangeGoal } from "@/app/_services/client/goalEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

interface UseStatusChangeGoalMutationProps {
  sessionToken: string;
  goalId: string;
  goalStatus?: "IN_PROGRESS" | "DONE";
  reset: () => void;
}

const useStatusChangeGoalMutation = ({
  sessionToken,
  goalId,
  goalStatus,
  reset,
}: UseStatusChangeGoalMutationProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const statusChangeGoalMutation = useMutation({
    mutationKey: [GOAL_KEY.GOAL_STATUS, goalId],
    mutationFn: fetchStatusChangeGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GOAL_KEY.GOAL_EDITOR, goalId] });
      queryClient.invalidateQueries({ queryKey: [GOAL_KEY.GOAL_LIST] });
      queryClient.invalidateQueries({ queryKey: [FEED_KEY.DAILY_TIMETABLE] });
      queryClient.invalidateQueries({ queryKey: [FEED_KEY.DAILY_LIST] });
      reset();
      router.replace("/goal");
    },
  });

  const handleGoalStatusChange = () => {
    statusChangeGoalMutation.mutate({
      accessToken: sessionToken,
      goalId,
      status: goalStatus === "IN_PROGRESS" ? "DONE" : "IN_PROGRESS",
    });
  };

  return { handleGoalStatusChange };
};

export default useStatusChangeGoalMutation;
