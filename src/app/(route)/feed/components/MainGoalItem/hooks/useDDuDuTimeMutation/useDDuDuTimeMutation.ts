import { DDuDuTimeRangeType, DDuDuTimeType } from "@/app/(route)/feed/feed.types";
import { FEED_KEY } from "@/app/_constants/queryKey/queryKey";
import { fetchDDuDuChangeTime } from "@/app/_services/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseDDuDuTimeMutationProps {
  sessionToken: string;
  currentDDuDuTime: DDuDuTimeType;
  currentDDuDuId: number;
  selectedDDuDuDate: string;
  handleUpdateDDuDuTime: (dduduTime: DDuDuTimeType) => void;
  handleDDuDuTimeSheetToggleOff: () => void;
}

const useDDuDuTimeMutation = ({
  sessionToken,
  currentDDuDuTime,
  currentDDuDuId,
  selectedDDuDuDate,
  handleUpdateDDuDuTime,
  handleDDuDuTimeSheetToggleOff,
}: UseDDuDuTimeMutationProps) => {
  const queryClient = useQueryClient();

  const dduduChangeTimeMutation = useMutation({
    mutationKey: [FEED_KEY.DDUDU_CHANGE_TIME],
    mutationFn: fetchDDuDuChangeTime,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FEED_KEY.DDUDU_DETAIL] });
      queryClient.refetchQueries({ queryKey: [FEED_KEY.DDUDU_DETAIL] });
      queryClient.refetchQueries({ queryKey: [FEED_KEY.DAILY_TIMETABLE] });
      queryClient.refetchQueries({ queryKey: [FEED_KEY.DAILY_TIMETABLE, selectedDDuDuDate] });
      handleUpdateDDuDuTime({ beginAt: "", endAt: "" });
      handleDDuDuTimeSheetToggleOff();
    },
  });

  const onChangeDDuDuTime = (selectedTime: DDuDuTimeRangeType) => {
    const { beginHour, beginMin, endHour, endMin } = selectedTime;
    const time = {
      beginAt: `${beginHour < 10 ? `0${beginHour}` : beginHour}:${beginMin < 10 ? `0${beginMin}` : beginMin}:00`,
      endAt: `${endHour < 10 ? `0${endHour}` : endHour}:${endMin < 10 ? `0${endMin}` : endMin}:00`,
    };

    if (!currentDDuDuTime.beginAt || !currentDDuDuTime.endAt) {
      if (beginHour === 0 && beginMin === 0 && endHour === 0 && endMin === 0) {
        handleDDuDuTimeSheetToggleOff();
        return;
      }
    } else {
      const [currentBeginHour, currentBeginMin] = currentDDuDuTime.beginAt.split(":").map(Number);
      const [currentEndHour, currentEndMin] = currentDDuDuTime.endAt.split(":").map(Number);

      if (
        beginHour === currentBeginHour &&
        beginMin === currentBeginMin &&
        endHour === currentEndHour &&
        endMin === currentEndMin
      ) {
        handleDDuDuTimeSheetToggleOff();
        return;
      }
    }

    dduduChangeTimeMutation.mutate({
      accessToken: sessionToken,
      time,
      id: currentDDuDuId,
    });
  };

  return {
    onChangeDDuDuTime,
  };
};

export default useDDuDuTimeMutation;
