import { useEffect, useState } from "react";

import { useGoalFormStore } from "@/app/_store";
import { GoalDetailType } from "@/app/_types/response/goal/goal";

interface UseTempDataProps {
  goalId: string;
  goalEditorData?: GoalDetailType;
  openModal: () => void;
}

const useTempData = ({ goalId, goalEditorData, openModal }: UseTempDataProps) => {
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

  return {
    type,
    isLoadTempData,
    goalText,
    goalPrivacy,
    color,
    repeatDDuDu,
    handleLoadTempData,
  };
};

export default useTempData;
