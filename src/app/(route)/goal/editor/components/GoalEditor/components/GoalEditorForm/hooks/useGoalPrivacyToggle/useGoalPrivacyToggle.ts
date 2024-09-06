import { useToggle } from "@/app/_hooks";
import { GoalPrivacyType } from "@/app/_types/response/goal/goal";

interface UseGoalPrivacyToggleProps {
  onSelectPrivacy: (goalPrivacy: GoalPrivacyType) => void;
  onSetIsEditing: (ieEdit: boolean) => void;
}

const useGoalPrivacyToggle = ({ onSelectPrivacy, onSetIsEditing }: UseGoalPrivacyToggleProps) => {
  const {
    isToggle: isGoalPrivacyToggle,
    handleToggleOn: handleGoalPrivacyToggleOn,
    handleToggleOff: handleGoalPrivacyToggleOff,
  } = useToggle();

  const handleSelectGoalPrivacy = (goalPrivacy: GoalPrivacyType) => {
    onSelectPrivacy(goalPrivacy);
    onSetIsEditing(true);
  };

  return {
    isGoalPrivacyToggle,
    handleGoalPrivacyToggleOn,
    handleGoalPrivacyToggleOff,
    handleSelectGoalPrivacy,
  };
};

export default useGoalPrivacyToggle;
