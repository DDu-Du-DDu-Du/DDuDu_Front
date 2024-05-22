"use client";

import { ColorPickerInput } from "./components";

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

const ColorSheet = () => {
  return (
    <ul
      className="w-full h-full p-[2.5rem] border-[0.1rem] grid grid-cols-color8 color_sheet_450:grid-cols-color6 color_sheet_350:grid-cols-color4 color_sheet_350:px-0 "
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
            name="colorPick"
          />
        </li>
      ))}
    </ul>
  );
};

export default ColorSheet;
