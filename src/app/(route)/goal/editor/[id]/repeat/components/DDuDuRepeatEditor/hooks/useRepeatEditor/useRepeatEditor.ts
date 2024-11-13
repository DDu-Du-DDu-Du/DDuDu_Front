import { useMemo } from "react";

import { RepeatDdudusType } from "@/app/_types/response/goal/goal";

import { DayOfMonthString } from "../../../DDuDuRepeatForm/DDuDuRepeatForm.types";

interface UseRepeatEditorProps {
  repeatId: string;
  repeatDDuDu?: RepeatDdudusType[];
}

const useRepeatEditor = ({ repeatId, repeatDDuDu = [] }: UseRepeatEditorProps) => {
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
