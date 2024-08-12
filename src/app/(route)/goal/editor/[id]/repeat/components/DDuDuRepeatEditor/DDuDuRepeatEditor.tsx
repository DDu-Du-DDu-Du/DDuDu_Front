"use client";

import { useMemo } from "react";

import { useGoalFormStore } from "@/app/_store";
import { RepeatDdudusType } from "@/app/_types/response/goal/goal";

import DDuDuRepeatForm from "../DDuDuRepeatForm/DDuDuRepeatForm";
import { DayOfMonthString } from "../DDuDuRepeatForm/DDuDuRepeatForm.types";

interface DDuDuRepeatEditorProps {
  goalId: string;
  repeatId: string;
}

const DDuDuRepeatEditor = ({ repeatId }: DDuDuRepeatEditorProps) => {
  // goalId가 create라는 것은 처음 생성하는 목표이며, 만약 goalId가 create가 아니라면 이미 만드어진 목표를 수정하는 것임.
  // 이미 만들어진 목표를 수정할 경우 해당 목표를 useQuery로 불러와야함
  // repeatId가 있다는 것은 데이터가 있다는 거고 수정이라는 뜻임

  const { repeatDDuDu } = useGoalFormStore();

  const currentRepeatDDuDu: RepeatDdudusType = useMemo(() => {
    return repeatDDuDu.filter((ddudu) => String(ddudu.id) === repeatId)[0];
  }, [repeatDDuDu, repeatId]);

  const currentRepeatMonthData =
    currentRepeatDDuDu.repeatPattern.type === "MONTHLY"
      ? (currentRepeatDDuDu.repeatPattern.repeatDaysOfMonth?.map(String) as DayOfMonthString[])
      : [];

  if (repeatId && !currentRepeatDDuDu) {
    return null;
  }

  return (
    <DDuDuRepeatForm
      repeatId={repeatId}
      currentRepeatDDuDu={currentRepeatDDuDu}
      currentRepeatMonthData={currentRepeatMonthData}
    />
  );
};

export default DDuDuRepeatEditor;
