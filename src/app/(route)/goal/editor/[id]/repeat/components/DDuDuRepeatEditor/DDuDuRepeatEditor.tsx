"use client";

import { useGoalDetail } from "@/app/_hooks";

import DDuDuRepeatForm from "../DDuDuRepeatForm/DDuDuRepeatForm";
import useRepeatEditor from "./hooks/useRepeatEditor/useRepeatEditor";

interface DDuDuRepeatEditorProps {
  goalId: string;
  repeatId: string;
}

const DDuDuRepeatEditor = ({ goalId, repeatId }: DDuDuRepeatEditorProps) => {
  console.log("DDuDuRepeatEditor의 repeatId", repeatId);

  const { goalDetail } = useGoalDetail({ goalId });
  const { currentRepeatDDuDu, currentRepeatMonthData } = useRepeatEditor({
    repeatId,
    repeatDDuDu: goalDetail?.repeatDdudus,
  });

  if (repeatId && !currentRepeatDDuDu) {
    return null;
  }

  return (
    <DDuDuRepeatForm
      repeatId={repeatId}
      goalId={goalId}
      currentRepeatDDuDu={currentRepeatDDuDu}
      currentRepeatMonthData={currentRepeatMonthData}
    />
  );
};

export default DDuDuRepeatEditor;
