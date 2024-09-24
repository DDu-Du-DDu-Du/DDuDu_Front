import { FEED_KEY } from "@/app/_constants/queryKey/queryKey";
import { fetchDDuDuChangeDate, fetchDDuDuRepeatDate } from "@/app/_services/client";
import { formatDateToYYYYMMDD } from "@/app/_utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseDDuDuDateMutationProps {
  sessionToken: string;
  currentDDuDuId: number;
  currentCalendarType: "change" | "repeat";
  handleSelectedDate: (selectedDate: Date | undefined) => void;
  handleCalendarSheetToggleOff: () => void;
  handleDDuDuSheetToggleOff: () => void;
}

const useDDuDuDateMutation = ({
  sessionToken,
  currentDDuDuId,
  currentCalendarType,
  handleSelectedDate,
  handleCalendarSheetToggleOff,
  handleDDuDuSheetToggleOff,
}: UseDDuDuDateMutationProps) => {
  const queryClient = useQueryClient();

  const handleSuccessDate = () => {
    queryClient.invalidateQueries({
      queryKey: [FEED_KEY.DAILY_LIST],
    });
    queryClient.refetchQueries({
      queryKey: [FEED_KEY.DAILY_LIST],
    });
    queryClient.refetchQueries({ queryKey: [FEED_KEY.DAILY_TIMETABLE] });
    queryClient.refetchQueries({ queryKey: [FEED_KEY.MONTHLY_DDUDUS] });
    queryClient.refetchQueries({ queryKey: [FEED_KEY.WEEKLY_DDUDUS] });

    handleSelectedDate(undefined);
    handleCalendarSheetToggleOff();
  };

  const dduduChangeDateMutation = useMutation({
    mutationKey: [FEED_KEY.DDUDU_CHANGE_DATE],
    mutationFn: fetchDDuDuChangeDate,
    onSuccess: handleSuccessDate,
  });

  const dduduRepeatDateMutation = useMutation({
    mutationKey: [FEED_KEY.DDUDU_REPEAT_DATE],
    mutationFn: fetchDDuDuRepeatDate,
    onSuccess: () => {
      handleSuccessDate();
      handleDDuDuSheetToggleOff();
    },
  });

  const onChangeDDuDuDate = (selectedDate: Date) => {
    if (currentCalendarType === "change") {
      dduduChangeDateMutation.mutate({
        accessToken: sessionToken,
        id: currentDDuDuId,
        date: formatDateToYYYYMMDD(selectedDate),
      });
    } else if (currentCalendarType === "repeat") {
      dduduRepeatDateMutation.mutate({
        accessToken: sessionToken,
        id: currentDDuDuId,
        date: formatDateToYYYYMMDD(selectedDate),
      });
    }
  };

  const onRepeatCurrentDate = () => {
    dduduRepeatDateMutation.mutate({
      accessToken: sessionToken,
      id: currentDDuDuId,
      date: formatDateToYYYYMMDD(new Date()),
    });
  };

  return {
    onChangeDDuDuDate,
    onRepeatCurrentDate,
  };
};

export default useDDuDuDateMutation;
