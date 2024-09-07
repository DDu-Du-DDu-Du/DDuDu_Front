import { useToggle } from "@/app/_hooks";
import { GoalPrivacyType } from "@/app/_types/response/goal/goal";

interface UseGoalPrivacyToggleProps {
  goalId: string;
  setGoalPrivacy: (goalPrivacy: GoalPrivacyType) => void;
  setIsEditing: (ieEdit: boolean) => void;
}

const useGoalPrivacyToggle = ({
  goalId,
  setGoalPrivacy,
  setIsEditing,
}: UseGoalPrivacyToggleProps) => {
  const {
    isToggle: isGoalPrivacyToggle,
    handleToggleOn: handleGoalPrivacyToggleOn,
    handleToggleOff: handleGoalPrivacyToggleOff,
  } = useToggle();

  const handleSelectGoalPrivacy = (goalPrivacy: GoalPrivacyType) => {
    setGoalPrivacy(goalPrivacy);

    if (!goalId) {
      setIsEditing(true);
    }
  };

  return {
    isGoalPrivacyToggle,
    handleGoalPrivacyToggleOn,
    handleGoalPrivacyToggleOff,
    handleSelectGoalPrivacy,
  };
};

export default useGoalPrivacyToggle;
