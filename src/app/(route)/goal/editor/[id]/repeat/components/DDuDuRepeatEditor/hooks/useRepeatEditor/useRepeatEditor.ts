import { useMemo } from "react";

import { useGoalFormStore } from "@/app/_store";
import { RepeatDdudusType } from "@/app/_types/response/goal/goal";

import { DayOfMonthString } from "../../../DDuDuRepeatForm/DDuDuRepeatForm.types";

interface UseRepeatEditorProps {
  repeatId: string;
}

const useRepeatEditor = ({ repeatId }: UseRepeatEditorProps) => {
  const { repeatDDuDu } = useGoalFormStore();

  console.log("repeatDDuDu", repeatDDuDu);

  const currentRepeatDDuDu: RepeatDdudusType = useMemo(() => {
    return repeatDDuDu.filter((ddudu) => String(ddudu.id) === repeatId)[0];
  }, [repeatDDuDu, repeatId]);

  console.log("currentRepeatDDuDu", currentRepeatDDuDu);

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
