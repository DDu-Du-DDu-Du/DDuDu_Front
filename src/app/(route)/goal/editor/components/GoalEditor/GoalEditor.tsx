"use client";

import { ConfirmModal } from "@/app/_components/client";
import { useGoalDetail, useToggle } from "@/app/_hooks";

import { GoalEditorForm } from "./components";
import { useTempData } from "./hooks";

interface GoalEditorProps {
  goalId: string;
}

const GoalEditor = ({ goalId }: GoalEditorProps) => {
  const { goalDetail: goalEditorData } = useGoalDetail({ goalId });

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
