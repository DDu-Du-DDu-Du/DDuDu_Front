import { useToggle } from "@/app/_hooks";

interface UseColorToggleProps {
  onSelectColor: (color: string) => void;
  onSetIsEditing: (isEdit: boolean) => void;
}

const useColorToggle = ({ onSelectColor, onSetIsEditing }: UseColorToggleProps) => {
  const {
    isToggle: isColorToggle,
    handleToggleOn: handleColorToggleOn,
    handleToggleOff: handleColorToggleOff,
  } = useToggle();
  const handleSelectColor = (color: string) => {
    onSelectColor(color);
    onSetIsEditing(true);
  };

  return {
    isColorToggle,
    handleColorToggleOn,
    handleColorToggleOff,
    handleSelectColor,
  };
};

export default useColorToggle;
