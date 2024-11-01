import { FEED_KEY, GOAL_KEY } from "@/app/_constants/queryKey/queryKey";
import { fetchDeleteGoal } from "@/app/_services/client/goalEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

interface UseDeleteGoalProps {
  sessionToken: string;
  goalId: string;
  reset: () => void;
}

const useDeleteGoal = ({ sessionToken, goalId, reset }: UseDeleteGoalProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteGoalMutation = useMutation({
    mutationKey: [GOAL_KEY.GOAL_DELETE, goalId],
    mutationFn: fetchDeleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GOAL_KEY.GOAL_LIST] });
      queryClient.invalidateQueries({ queryKey: [FEED_KEY.DAILY_TIMETABLE] });
      queryClient.invalidateQueries({ queryKey: [FEED_KEY.DAILY_LIST] });
      reset();
      router.replace("/goal");
    },
  });

  const handleGoalDelete = () => {
    deleteGoalMutation.mutate({ accessToken: sessionToken, goalId });
  };

  return { handleGoalDelete };
};

export default useDeleteGoal;
