import { useState } from "react";

import { useToggle } from "@/app/_hooks";

interface UseColorToggleProps {
  defaultColor: string;
}

const useColorToggle = ({ defaultColor }: UseColorToggleProps) => {
  const [color, setColor] = useState(defaultColor ?? "");

  const {
    isToggle: isColorToggle,
    handleToggleOn: handleColorToggleOn,
    handleToggleOff: handleColorToggleOff,
  } = useToggle();
  const handleSelectColor = (color: string) => {
    setColor(color);
  };

  return {
    color,
    isColorToggle,
    handleColorToggleOn,
    handleColorToggleOff,
    handleSelectColor,
  };
};

export default useColorToggle;
