import { SubmitHandler, UseFormReset } from "react-hook-form";

import { FEED_KEY } from "@/app/_constants/queryKey/queryKey";
import { fetchCreateDDuDu, fetchEditDDuDu } from "@/app/_services/client";
import { MainDDuDusType } from "@/app/_types/response/feed/feed";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DDuDuInputType } from "../../MainDDuDuInput";

interface useUpdateDDuDuMutationProps {
  type: "create" | "edit";
  sessionToken: string;
  selectedDDuDuDate: string;
  goalId: number;
  dduduItem?: MainDDuDusType;
  reset: UseFormReset<DDuDuInputType>;
  onCloseDDuDuInput: () => void;
}

const useUpdateDDuDuMutation = ({
  type,
  sessionToken,
  selectedDDuDuDate,
  goalId,
  dduduItem,
  reset,
  onCloseDDuDuInput,
}: useUpdateDDuDuMutationProps) => {
  const queryClient = useQueryClient();

  const onUpdateSuccess = () => {
    reset();
    onCloseDDuDuInput();
    queryClient.refetchQueries({ queryKey: [FEED_KEY.DAILY_LIST, selectedDDuDuDate] });
    queryClient.refetchQueries({ queryKey: [FEED_KEY.MONTHLY_DDUDUS] });
  };

  const createDDuDuMutation = useMutation({
    mutationKey: [FEED_KEY.CREATE_DDUDU],
    mutationFn: fetchCreateDDuDu,
    onSuccess: onUpdateSuccess,
  });

  const editDDuDuMutation = useMutation({
    mutationKey: [FEED_KEY.EDIT_DDUDU],
    mutationFn: fetchEditDDuDu,
    onSuccess: onUpdateSuccess,
  });

  const onValid: SubmitHandler<DDuDuInputType> = ({ ddudu }) => {
    if (type === "create") {
      createDDuDuMutation.mutate({
        accessToken: sessionToken,
        requestDDuDu: {
          goalId,
          name: ddudu,
          scheduledOn: selectedDDuDuDate,
        },
      });
    } else if (type === "edit" && dduduItem) {
      editDDuDuMutation.mutate({
        accessToken: sessionToken,
        id: dduduItem.id,
        name: ddudu,
      });
    }
  };

  return { onValid };
};

export default useUpdateDDuDuMutation;
