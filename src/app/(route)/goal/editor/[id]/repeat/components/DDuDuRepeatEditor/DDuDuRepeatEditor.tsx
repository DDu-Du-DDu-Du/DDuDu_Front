"use client";

import { useMemo } from "react";

import { useGoalFormStore } from "@/app/_store";
import { RepeatDDuDuItem } from "@/app/_store/useGoalFormStore/useGoalFormStore";

import DDuDuRepeatForm from "../DDuDuRepeatForm/DDuDuRepeatForm";

interface DDuDuRepeatEditorProps {
  goalId: string;
  repeatId: string;
}

const DDuDuRepeatEditor = ({ goalId, repeatId }: DDuDuRepeatEditorProps) => {
  // goalId가 create라는 것은 처음 생성하는 목표이며, 만약 goalId가 create가 아니라면 이미 만드어진 목표를 수정하는 것임.
  // 이미 만들어진 목표를 수정할 경우 해당 목표를 useQuery로 불러와야함
  // repeatId가 있다는 것은 데이터가 있다는 거고 수정이라는 뜻임

  const { repeatDDuDu } = useGoalFormStore();

  console.log("repeatDDuDu", repeatDDuDu);

  const currentRepeatDDuDu: RepeatDDuDuItem = useMemo(() => {
    return repeatDDuDu.filter((ddudu) => String(ddudu.goalId) === repeatId)[0];
  }, [repeatDDuDu, repeatId]);

  console.log(currentRepeatDDuDu);

  if (repeatId && !currentRepeatDDuDu) {
    return null;
  }

  return (
    <DDuDuRepeatForm
      goalId={goalId}
      repeatId={repeatId}
      currentRepeatDDuDu={currentRepeatDDuDu}
    />
  );
};

export default DDuDuRepeatEditor;
