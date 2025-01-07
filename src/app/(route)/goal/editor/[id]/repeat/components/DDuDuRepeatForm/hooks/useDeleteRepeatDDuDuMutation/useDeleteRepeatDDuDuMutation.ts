import { FEED_KEY, GOAL_KEY, REPEAT_DDUDU_KEY } from "@/app/_constants/queryKey/queryKey";
import { fetchDeleteRepeatDDudu } from "@/app/_services/client/repeatDdudu";
import { RepeatDdudusType } from "@/app/_types/response/goal/goal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UseDeleteRepeatDDuDuMutationProps {
  goalId: string;
  repeatId: string;
  repeatDDuDu: RepeatDdudusType[];
  setRepeatDDuDu: (repeatDDuDu: RepeatDdudusType[]) => void;
}

const useDeleteRepeatDDuDuMutation = ({
  goalId,
  repeatId,
  repeatDDuDu,
  setRepeatDDuDu,
}: UseDeleteRepeatDDuDuMutationProps) => {
  const router = useRouter();

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const deleteRepeatDDuDuMutation = useMutation({
    mutationKey: [REPEAT_DDUDU_KEY.REPEAT_DELETE],
    mutationFn: fetchDeleteRepeatDDudu,
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({ queryKey: [GOAL_KEY.GOAL_EDITOR, goalId] });
      queryClient.invalidateQueries({ queryKey: [FEED_KEY.MONTHLY_DDUDUS] });
      queryClient.invalidateQueries({ queryKey: [FEED_KEY.DAILY_LIST] });
      queryClient.invalidateQueries({ queryKey: [FEED_KEY.WEEKLY_DDUDUS] });
      queryClient.invalidateQueries({ queryKey: [FEED_KEY.DAILY_TIMETABLE] });
    },
  });

  const handleRepeatDDuDuDelete = () => {
    if (goalId === "create") {
      const updateRepeatDDuDu = repeatDDuDu.filter((ddudu) => ddudu.id !== Number(repeatId));
      setRepeatDDuDu(updateRepeatDDuDu);
      router.back();
    } else {
      deleteRepeatDDuDuMutation.mutate({
        accessToken: session?.sessionToken as string,
        repeatId,
      });
    }
  };

  return {
    handleRepeatDDuDuDelete,
  };
};

export default useDeleteRepeatDDuDuMutation;
