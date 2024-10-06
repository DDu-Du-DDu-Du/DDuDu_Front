"use client";

import BottomSheet from "../BottomSheet/BottomSheet";
import { COLOR_LIST } from "./ColorSheet.constants";
import { ColorPickerInput } from "./components";

import { twJoin } from "tailwind-merge";

interface ColorSheetProps {
  isShow: boolean;
  pickedColor: string;
  disabled?: boolean;
  onClick: (color: string) => void;
  onClose: () => void;
}

const ColorSheet = ({ isShow, pickedColor, disabled, onClick, onClose }: ColorSheetProps) => {
  const handleSelectColor = (color: string) => {
    onClick(color);
    onClose();
  };

  return (
    <BottomSheet
      isShow={isShow}
      onClose={onClose}
      defaultHeight="fit-content"
      maxHeight="fit-content"
    >
      <div className="w-full flex items-center justify-center flex-col p-[2rem]">
        <ul
          className={twJoin(
            "grid grid-cols-color8 gap-[1rem] color_sheet_450:grid-cols-color6 color_sheet_420:grid-cols-color5 color_sheet_350:grid-cols-color4 color_sheet_350:px-0 pb-[3.1rem]",
            disabled && "opacity-35",
          )}
        >
          {COLOR_LIST.map((color, index) => (
            <li
              key={`${color}_${index}`}
              className="flex items-center justify-center"
            >
              <ColorPickerInput
                color={color}
                isChecked={pickedColor === color}
                name="color_sheet"
                disabled={disabled}
                onClick={handleSelectColor}
              />
            </li>
          ))}
        </ul>
      </div>
    </BottomSheet>
  );
};

export default ColorSheet;
