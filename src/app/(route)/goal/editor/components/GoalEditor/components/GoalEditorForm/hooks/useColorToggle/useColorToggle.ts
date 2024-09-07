import { useToggle } from "@/app/_hooks";

interface UseColorToggleProps {
  goalId: string;
  setColor: (color: string) => void;
  setIsEditing: (isEdit: boolean) => void;
}

const useColorToggle = ({ goalId, setColor, setIsEditing }: UseColorToggleProps) => {
  const {
    isToggle: isColorToggle,
    handleToggleOn: handleColorToggleOn,
    handleToggleOff: handleColorToggleOff,
  } = useToggle();
  const handleSelectColor = (color: string) => {
    setColor(color);

    if (!goalId) {
      setIsEditing(true);
    }
  };

  return {
    isColorToggle,
    handleColorToggleOn,
    handleColorToggleOff,
    handleSelectColor,
  };
};

export default useColorToggle;
