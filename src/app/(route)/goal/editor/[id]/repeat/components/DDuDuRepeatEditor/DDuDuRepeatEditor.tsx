"use client";

import { Header } from "@/app/_components/client";

import DDuDuRepeatForm from "../DDuDuRepeatForm/DDuDuRepeatForm";
import { useRepeatEditor } from "./hooks";

import { useSearchParams } from "next/navigation";

interface DDuDuRepeatEditorProps {
  goalId: string;
}

const DDuDuRepeatEditor = ({ goalId }: DDuDuRepeatEditorProps) => {
  const searchParams = useSearchParams();
  const repeatId = searchParams.get("id") || "";

  const { currentRepeatDDuDu, currentRepeatMonthData } = useRepeatEditor({
    repeatId,
    goalId,
  });

  if (repeatId && !currentRepeatDDuDu) {
    return null;
  }

  return (
    <>
      <Header headerLabel={repeatId ? "반복수정" : "반복생성"} />
      <DDuDuRepeatForm
        repeatId={repeatId}
        goalId={goalId}
        currentRepeatDDuDu={currentRepeatDDuDu}
        currentRepeatMonthData={currentRepeatMonthData}
      />
    </>
  );
};

export default DDuDuRepeatEditor;
