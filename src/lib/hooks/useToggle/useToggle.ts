import { useState } from "react";

interface UseToggleProps {
  defaultOption?: boolean;
}

interface UseToggleReturn {
  isToggle: boolean;
  handleToggleOn: () => void;
  handleToggleOff: () => void;
  handleToggle: () => void;
}

type UseToggle = (options?: UseToggleProps) => UseToggleReturn;

const useToggle: UseToggle = ({ defaultOption = false } = {}) => {
  const [isToggle, setIsToggle] = useState(defaultOption);
  const handleToggleOn = () => {
    setIsToggle(true);
  };

  const handleToggleOff = () => {
    setIsToggle(false);
  };

  const handleToggle = () => {
    setIsToggle((prevState) => !prevState);
  };

  return {
    isToggle,
    handleToggleOn,
    handleToggleOff,
    handleToggle,
  };
};

export default useToggle;
