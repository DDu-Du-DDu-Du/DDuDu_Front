import { useCallback, useEffect } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

import { GoalEditorFormInfo } from "../../GoalEditorForm";

import { debounce } from "lodash";
import { useRouter } from "next/navigation";

interface UseGoalEditorProps {
  goalId: string;
  goalText: string;
  isLoadTempData: boolean | null;
  setGoalText: (goalText: string) => void;
  setIsEditing: (isEditing: boolean) => void;
  watch: UseFormWatch<GoalEditorFormInfo>;
  setValue: UseFormSetValue<GoalEditorFormInfo>;
}

const useGoalEditor = ({
  goalId,
  goalText,
  isLoadTempData,
  setGoalText,
  setIsEditing,
  watch,
  setValue,
}: UseGoalEditorProps) => {
  const router = useRouter();

  const goalValue = watch("goal");

  /* eslint-disable react-hooks/exhaustive-deps */
  const delayedGoalValueSave = useCallback(
    debounce((goalValue) => {
      setGoalText(goalValue);
      setIsEditing(true);
    }, 2000),
    [],
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!goalValue || goalText === goalValue) {
      return;
    }

    delayedGoalValueSave(goalValue);
  }, [goalValue]);

  useEffect(() => {
    if (!isLoadTempData) {
      return;
    }

    setValue("goal", goalText);
  }, [isLoadTempData]);

  const handleMoveRepeatDDuDu = () => {
    if (goalId) {
      router.push(`/goal/editor/${goalId}/repeat`);
      return;
    }

    router.push("/goal/editor/create/repeat");
  };

  return {
    handleMoveRepeatDDuDu,
  };
};

export default useGoalEditor;
