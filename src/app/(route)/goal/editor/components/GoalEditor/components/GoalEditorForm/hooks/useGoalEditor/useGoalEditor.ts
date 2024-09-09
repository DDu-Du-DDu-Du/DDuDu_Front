import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import { GoalEditorFormInfo } from "@/app/(route)/goal/editor/goalEditor.types";

import { debounce } from "lodash";
import { useRouter } from "next/navigation";

interface UseGoalEditorProps {
  goalId: string;
  goalText: string;
  isLoadTempData: boolean | null;
  setGoalText: (goalText: string) => void;
  setIsEditing: (isEditing: boolean) => void;
}

const useGoalEditor = ({
  goalId,
  goalText,
  isLoadTempData,
  setGoalText,
  setIsEditing,
}: UseGoalEditorProps) => {
  const router = useRouter();

  const methods = useForm<GoalEditorFormInfo>();

  const goalValue = methods.watch("goal");

  /* eslint-disable react-hooks/exhaustive-deps */
  const delayedGoalValueSave = useCallback(
    debounce((goalValue) => {
      setGoalText(goalValue);

      if (!goalId) {
        setIsEditing(true);
      }
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

    methods.setValue("goal", goalText);
  }, [isLoadTempData]);

  const handleMoveRepeatDDuDu = () => {
    if (goalId) {
      router.push(`/goal/editor/${goalId}/repeat`);
      return;
    }

    router.push("/goal/editor/create/repeat");
  };

  return {
    methods,
    handleMoveRepeatDDuDu,
  };
};

export default useGoalEditor;
