import { useState } from "react";

interface UseColorPickerReturn {
  color: string;
  isOpen: boolean;
  togglePalette: () => void;
  changeColor: (newColor: string) => void;
}

const useColorPicker = (): UseColorPickerReturn => {
  const [color, setColor] = useState<string>("#EA2424");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const togglePalette = () => {
    setIsOpen(!isOpen);
  };

  const changeColor = (newColor: string) => {
    setColor(newColor);
    setIsOpen(false);
  };

  return {
    color,
    isOpen,
    togglePalette,
    changeColor,
  };
};

export default useColorPicker;
