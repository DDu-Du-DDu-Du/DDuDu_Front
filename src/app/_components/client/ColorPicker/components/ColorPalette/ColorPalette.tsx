import React, { useState } from "react";

import { BottomSheet } from "../../../BottomSheet";
import Button from "../../../Button/Button";

interface ColorPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectColor: (color: string) => void;
}

const colors = [
  "#EA2424",
  "#E94F35",
  "#EF8062",
  "#FFEC01",
  "#FFEF42",
  "#FFF49A",
  "#FFFDF6",
  "#D8097B",
  "#ED6EA5",
  "#F8C8E0",
  "#312682",
  "#6858A1",
  "#BCB4DB",
  "#F3F2F8",
  "#009FE3",
  "#5BC4F1",
  "#D2ECFB",
  "#00963F",
  "#8DC797",
  "#C0DEC4",
  "#EAF4EC",
  "#1D1D1B",
  "#6F6F6D",
  "#D9D9D9",
];

const ColorPalette: React.FC<ColorPaletteProps> = ({ isOpen, onClose, onSelectColor }) => {
  const [selectedColor, setSelectedColor] = useState<string>("#EA2424");

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleConfirm = () => {
    onSelectColor(selectedColor);
    onClose();
  };

  return (
    <BottomSheet
      isShow={isOpen}
      onClose={onClose}
      defaultHeight="33rem"
      maxHeight="33rem"
    >
      <div className="flex flex-wrap justify-center p-8">
        {colors.map((color, index) => (
          <Button
            key={index}
            className="w-8 h-8 m-2.5 rounded-full"
            onClick={() => handleColorSelect(color)}
          />
        ))}
      </div>
      <div className="flex justify-center p-4">
        <Button onClick={handleConfirm}>확인</Button>
      </div>
    </BottomSheet>
  );
};

export default ColorPalette;
