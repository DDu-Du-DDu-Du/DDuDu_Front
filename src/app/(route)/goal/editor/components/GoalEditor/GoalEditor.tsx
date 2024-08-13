"use client";

import { useEffect, useState } from "react";

import { ConfirmModal } from "@/app/_components/client";
import { useToggle } from "@/app/_hooks";
import { getGoalEditorData } from "@/app/_services/client/goalEditor";
import { useGoalFormStore } from "@/app/_store";
import { GoalDetailType } from "@/app/_types/response/goal/goal";
import { useQuery } from "@tanstack/react-query";

import { GoalEditorForm } from "./components";

import { useSession } from "next-auth/react";

interface GoalEditorProps {
  goalId: string;
}

const GoalEditor = ({ goalId }: GoalEditorProps) => {
  const { data: session } = useSession();
  const {
    type,
    isLoad,
    isEditing,
    goalText,
    goalPrivacy,
    color,
    repeatDDuDu,
    setIsLoad,
    setIsEditing,
    initialize,
    reset,
  } = useGoalFormStore();

  const { data: goalEditorData } = useQuery<GoalDetailType>({
    queryKey: ["goal", "editor", goalId],
    queryFn: () => getGoalEditorData(session?.sessionToken as string, goalId),
    enabled: !!goalId && !!session,
  });

  const { isToggle: isModal, handleToggleOn: openModal, handleToggleOff: closeModal } = useToggle();

  const [isLoadTempData, setIsLoadTempData] = useState<boolean | null>(null);
  const [tempData] = useState({
    goalText,
    goalPrivacy,
    color,
    repeatDDuDu: [...repeatDDuDu],
  });

  useEffect(() => {
    if (isLoad) {
      initialize(tempData);
      setIsLoadTempData(true);
      setIsLoad(false);
      return;
    }

    if (goalId && goalEditorData) {
      initialize({
        type: "EDIT",
        goalText: goalEditorData.name,
        goalPrivacy: goalEditorData.privacyType,
        color: `#${goalEditorData.color}`,
        repeatDDuDu: goalEditorData.repeatDdudus,
      });
      setIsLoadTempData(true);

      return;
    }

    if (type === "EDIT" || !isEditing) {
      reset();
      return;
    }

    if (isEditing) {
      reset();
      openModal();
    }

    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const handleLoadTempData = (isComplete: boolean) => {
    if (!isComplete) {
      reset();
      setIsLoadTempData(false);
      return;
    }

    initialize(tempData);
    setIsLoadTempData(true);
    setIsEditing(false);
  };

  if ((goalId && !goalText) || (type === "EDIT" && !goalId)) {
    return;
  }

  return (
    <>
      <GoalEditorForm
        goalId={goalId}
        isLoadTempData={isLoadTempData}
        goalStatus={goalEditorData?.status}
        goalFormData={{ goalText, goalPrivacy, color, repeatDDuDu }}
      />
      <ConfirmModal
        title="임시 저장된 데이터가 있습니다."
        message="저장된 데이터를 불러오시겠습니까?"
        isToggle={isModal}
        handleToggleOff={closeModal}
        onCompleteCheck={handleLoadTempData}
      />
    </>
  );
};

export default GoalEditor;
