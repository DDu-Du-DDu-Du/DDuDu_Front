import { useMemo } from "react";

import { useGoalDetail } from "@/app/_hooks";
import { RepeatDdudusType } from "@/app/_types/response/goal/goal";

import { DayOfMonthString } from "../../../DDuDuRepeatForm/DDuDuRepeatForm.types";

interface UseRepeatEditorProps {
  repeatId: string;
  goalId: string;
}

const useRepeatEditor = ({ repeatId, goalId }: UseRepeatEditorProps) => {
  const { goalDetail } = useGoalDetail({ goalId });

  const currentRepeatDDuDu: RepeatDdudusType | undefined = useMemo(() => {
    if (!goalDetail) return;

    const { repeatDdudus } = goalDetail;

    return repeatDdudus.filter((ddudu) => String(ddudu.id) === repeatId)[0];
  }, [goalDetail, repeatId]);

  const currentRepeatMonthData =
    currentRepeatDDuDu && currentRepeatDDuDu.repeatPattern.repeatType === "MONTHLY"
      ? (currentRepeatDDuDu.repeatPattern.repeatDaysOfMonth?.map(String) as DayOfMonthString[])
      : [];

  return {
    currentRepeatDDuDu,
    currentRepeatMonthData,
  };
};

export default useRepeatEditor;
