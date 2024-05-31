import { useState } from "react";

import { useToggle } from "@/app/_hooks";

import { GoalPrivacyType } from "../../GoalEditor.types";

interface UseGoalPrivacyToggleProps {
  defaultGoalPrivacy: GoalPrivacyType;
}

const useGoalPrivacyToggle = ({ defaultGoalPrivacy }: UseGoalPrivacyToggleProps) => {
  const [goalPrivacy, setGoalPrivacy] = useState<GoalPrivacyType>(defaultGoalPrivacy ?? "PUBLIC");
  const {
    isToggle: isGoalPrivacyToggle,
    handleToggleOn: handleGoalPrivacyToggleOn,
    handleToggleOff: handleGoalPrivacyToggleOff,
  } = useToggle();
  const handleSelectGoalPrivacy = (goalPrivacy: GoalPrivacyType) => {
    setGoalPrivacy(goalPrivacy);
  };

  return {
    goalPrivacy,
    isGoalPrivacyToggle,
    handleGoalPrivacyToggleOn,
    handleGoalPrivacyToggleOff,
    handleSelectGoalPrivacy,
  };
};

export default useGoalPrivacyToggle;
