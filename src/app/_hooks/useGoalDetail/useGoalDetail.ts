import { GOAL_KEY } from "@/app/_constants/queryKey/queryKey";
import { getGoalEditorData } from "@/app/_services/client/goalEditor";
import { GoalDetailType } from "@/app/_types/response/goal/goal";
import { useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";

interface UseGoalDetailProps {
  goalId: string;
}

const useGoalDetail = ({ goalId }: UseGoalDetailProps) => {
  const { data: session } = useSession();

  const { data: goalDetail } = useQuery<GoalDetailType>({
    queryKey: [GOAL_KEY.GOAL_EDITOR, goalId],
    queryFn: () => getGoalEditorData(session?.sessionToken as string, goalId),
    enabled: !!goalId && !!session,
  });

  return {
    goalDetail,
  };
};

export default useGoalDetail;
