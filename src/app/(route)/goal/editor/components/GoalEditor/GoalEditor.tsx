"use client";

import { ConfirmModal } from "@/app/_components/client";
import { GOAL_KEY } from "@/app/_constants/queryKey/queryKey";
import { useToggle } from "@/app/_hooks";
import { getGoalEditorData } from "@/app/_services/client/goalEditor";
import { GoalDetailType } from "@/app/_types/response/goal/goal";
import { useQuery } from "@tanstack/react-query";

import { GoalEditorForm } from "./components";
import { useTempData } from "./hooks";

import { useSession } from "next-auth/react";

interface GoalEditorProps {
  goalId: string;
}

const GoalEditor = ({ goalId }: GoalEditorProps) => {
  const { data: session } = useSession();

  const { data: goalEditorData } = useQuery<GoalDetailType>({
    queryKey: [GOAL_KEY.GOAL_EDITOR, goalId],
    queryFn: () => getGoalEditorData(session?.sessionToken as string, goalId),
    enabled: !!goalId && !!session,
  });

  const { isToggle: isModal, handleToggleOn: openModal, handleToggleOff: closeModal } = useToggle();

  const { type, isLoadTempData, goalText, goalPrivacy, color, repeatDDuDu, handleLoadTempData } =
    useTempData({
      goalId,
      goalEditorData,
      openModal,
    });

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
