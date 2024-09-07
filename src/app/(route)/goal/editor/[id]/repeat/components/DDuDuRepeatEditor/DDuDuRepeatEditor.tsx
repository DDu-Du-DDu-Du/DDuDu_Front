"use client";

import DDuDuRepeatForm from "../DDuDuRepeatForm/DDuDuRepeatForm";
import useRepeatEditor from "./hooks/useRepeatEditor/useRepeatEditor";

interface DDuDuRepeatEditorProps {
  goalId: string;
  repeatId: string;
}

const DDuDuRepeatEditor = ({ goalId, repeatId }: DDuDuRepeatEditorProps) => {
  const { currentRepeatDDuDu, currentRepeatMonthData } = useRepeatEditor({ repeatId });

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
