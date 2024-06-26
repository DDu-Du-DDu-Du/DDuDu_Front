"use client";

import { Button } from "@/app/_components/client";

import { BottomSheet } from "../BottomSheet";
import { ColorPickerInput } from "./components";

import { twJoin } from "tailwind-merge";

const TEST = [
  "#e74c3c",
  "#3498db",
  "#2ecc71",
  "#9b59b6",
  "#34495e",
  "#f1c40f",
  "#e67e22",
  "#1abc9c",
  "#ecf0f1",
  "#95a5a6",
  "#7f8c8d",
  "#d35400",
  "#c0392b",
  "#bdc3c7",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#bdc3c7",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
];

interface ColorSheetProps {
  isShow: boolean;
  pickedColor: string;
  disabled?: boolean;
  onClick: (color: string) => void;
  onClose: () => void;
}

const ColorSheet = ({ isShow, pickedColor, disabled, onClick, onClose }: ColorSheetProps) => {
  /*
  TODO

  추후 Color API 호출 및 연결
   */
  return (
    <BottomSheet
      isShow={isShow}
      onClose={onClose}
      defaultHeight="fit-content"
      maxHeight="fit-content"
    >
      <div className="w-full flex items-center justify-center flex-col pb-[5rem]">
        <ul
          className={twJoin(
            "w-full max-w-[50rem] h-full p-[2.5rem] border-[0.1rem] grid grid-cols-color8 color_sheet_450:grid-cols-color6 color_sheet_350:grid-cols-color4 color_sheet_350:px-0",
            disabled && "opacity-35",
          )}
          style={{
            gridAutoRows: "50px",
            alignItems: "center",
          }}
        >
          {TEST.map((color, index) => (
            <li
              key={`${color}_${index}`}
              className="w-[5rem] h-[5rem] flex items-center justify-center"
            >
              <ColorPickerInput
                color={color}
                isChecked={pickedColor === color}
                name="color_sheet"
                disabled={disabled}
                onClick={onClick}
              />
            </li>
          ))}
        </ul>

        <Button
          onClick={onClose}
          className="w-full max-w-[50rem] h-[5.6rem]"
          fontSize="large"
          backgroundColor="orange"
        >
          확인
        </Button>
      </div>
    </BottomSheet>
  );
};

export default ColorSheet;
