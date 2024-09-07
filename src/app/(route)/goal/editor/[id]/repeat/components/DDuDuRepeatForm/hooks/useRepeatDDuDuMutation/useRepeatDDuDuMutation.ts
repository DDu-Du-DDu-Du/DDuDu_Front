import { SubmitHandler } from "react-hook-form";

import { REPEAT_DDUDU_KEY } from "@/app/_constants/queryKey/queryKey";
import { fetchCreateRepeatDDudu, fetchEditRepeatDDudu } from "@/app/_services/client/repeatDdudu";
import { RepeatDduduRequestType } from "@/app/_types/request/repeatDdudu/repeatDdudu";
import { DayOfMonth, RepeatDdudusPattern, RepeatDdudusType } from "@/app/_types/response/goal/goal";
import { useMutation } from "@tanstack/react-query";

import { DDuDuRepeatFormDataType } from "../../DDuDuRepeatForm";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UseRepeatDDuDuMutation {
  goalId: string;
  repeatId: string;
  repeatDDuDu: RepeatDdudusType[];
  setRepeatDDuDu: (repeatDDuDu: RepeatDdudusType[]) => void;
  setAddRepeatDDuDu: (repeatDDuDu: RepeatDdudusType) => void;
}

const useRepeatDDuDuMutation = ({
  goalId,
  repeatId,
  repeatDDuDu,
  setRepeatDDuDu,
  setAddRepeatDDuDu,
}: UseRepeatDDuDuMutation) => {
  const router = useRouter();

  const { data: session } = useSession();

  const createRepeatDDuDuMutation = useMutation({
    mutationKey: [REPEAT_DDUDU_KEY.REPEAT_DDUDU],
    mutationFn: fetchCreateRepeatDDudu,
    onSuccess: () => {
      router.replace(`/goal/editor/${goalId}/repeats`);
    },
  });

  const editRepeatDDuDuMutation = useMutation({
    mutationKey: [REPEAT_DDUDU_KEY.REPEAT_DDUDU, repeatId],
    mutationFn: fetchEditRepeatDDudu,
    onSuccess: () => {
      router.replace(`/goal/editor/${goalId}/repeats`);
    },
  });

  const onValid: SubmitHandler<DDuDuRepeatFormDataType> = ({
    name,
    repeatType,
    repeatDaysOfMonth,
    repeatDaysOfWeek,
    startDate,
    endDate,
    lastDay,
    beginAt,
    endAt,
  }) => {
    let repeatPattern: RepeatDdudusPattern = { repeatType };
    let repeatTime = {};

    if (repeatType === "WEEKLY") {
      repeatPattern = { repeatType, repeatDaysOfWeek };
    } else if (repeatType === "MONTHLY") {
      const daysOfMonth: DayOfMonth[] = repeatDaysOfMonth
        ? repeatDaysOfMonth.map(Number).filter((day): day is DayOfMonth => day >= 1 && day <= 31)
        : [];

      if (daysOfMonth.length === 0 && !!lastDay[0] === false) {
        // 매월을 선택하고 일자 / 마지막 날을 아무 것도 선택하지 않은 경우
        return;
      }

      repeatPattern = {
        repeatType,
        repeatDaysOfMonth: daysOfMonth,
        lastDay: !!lastDay[0],
      };
    }

    if (beginAt && endAt) {
      repeatTime = { beginAt, endAt };
    }

    const newRepeatDDuDuId =
      repeatDDuDu.length === 0 ? 1 : repeatDDuDu[repeatDDuDu.length - 1].id + 1;

    const newRepeatDDuDu: RepeatDdudusType = {
      name,
      id: newRepeatDDuDuId,
      startDate,
      endDate,
      repeatPattern,
      ...repeatTime,
    };

    const requestRepeatDDuDu: RepeatDduduRequestType = {
      name,
      startDate,
      endDate,
      ...repeatPattern,
      ...repeatTime,
    };

    if (repeatId) {
      const editRepeatDDuDu = repeatDDuDu.map((ddudu) => {
        if (ddudu.id === Number(repeatId)) {
          return { ...newRepeatDDuDu, id: ddudu.id };
        }

        return ddudu;
      });

      setRepeatDDuDu(editRepeatDDuDu);

      if (Number(goalId)) {
        // 즉시 수정
        editRepeatDDuDuMutation.mutate({
          accessToken: session?.sessionToken as string,
          repeatDDuDuData: requestRepeatDDuDu,
          repeatId,
        });
      }
    } else {
      setAddRepeatDDuDu(newRepeatDDuDu);

      if (Number(goalId)) {
        // 즉시 생성
        createRepeatDDuDuMutation.mutate({
          accessToken: session?.sessionToken as string,
          repeatDDuDuData: { ...requestRepeatDDuDu, goalId: Number(goalId) },
        });
      }
    }

    if (!Number(goalId)) {
      router.back();
    }
  };

  return {
    onValid,
  };
};
export default useRepeatDDuDuMutation;
