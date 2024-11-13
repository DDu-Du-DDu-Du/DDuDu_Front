"use client";

import DDuDuRepeatForm from "../DDuDuRepeatForm/DDuDuRepeatForm";
import useRepeatEditor from "./hooks/useRepeatEditor/useRepeatEditor";

import { useSearchParams } from "next/navigation";

interface DDuDuRepeatEditorProps {
  goalId: string;
  repeatId: string;
}

const DDuDuRepeatEditor = ({ goalId, repeatId }: DDuDuRepeatEditorProps) => {
  console.log("DDuDuRepeatEditor의 repeatId", repeatId);
  console.log(useSearchParams().get("id"), "값 체크");

  const { currentRepeatDDuDu, currentRepeatMonthData } = useRepeatEditor({
    repeatId,
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
