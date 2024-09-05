import { FEED_KEY } from "@/app/_constants/queryKey/queryKey";
import { fetchCompleteToggleDDuDu, fetchDeleteDDuDu } from "@/app/_services/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseDDuDuMutationProps {
  sessionToken: string;
  selectedDDuDuDate: string;
  handleDDuDuSheetToggleOff: () => void;
}

const useDDuDuMutation = ({
  sessionToken,
  selectedDDuDuDate,
  handleDDuDuSheetToggleOff,
}: UseDDuDuMutationProps) => {
  const queryClient = useQueryClient();

  const handleSuccessDDuDu = () => {
    queryClient.refetchQueries({ queryKey: [FEED_KEY.MONTHLY_DDUDUS] });
    queryClient.refetchQueries({ queryKey: [FEED_KEY.DAILY_LIST, selectedDDuDuDate] });
  };

  const deleteDDuDuMutation = useMutation({
    mutationKey: [FEED_KEY.DELETE_DDUDU],
    mutationFn: fetchDeleteDDuDu,
    onSuccess: () => {
      handleSuccessDDuDu();
      handleDDuDuSheetToggleOff();
    },
  });

  const completeToggleDDuDuMutation = useMutation({
    mutationKey: [FEED_KEY.COMPLETE_TOGGLE],
    mutationFn: fetchCompleteToggleDDuDu,
    onSuccess: handleSuccessDDuDu,
  });

  const onDDuDuCompleteToggle = (id: number) => {
    completeToggleDDuDuMutation.mutate({
      accessToken: sessionToken,
      id,
    });
  };
  const onDeleteDDuDu = (id: number) => {
    deleteDDuDuMutation.mutate({
      accessToken: sessionToken,
      id,
    });
  };

  return {
    onDDuDuCompleteToggle,
    onDeleteDDuDu,
  };
};

export default useDDuDuMutation;
