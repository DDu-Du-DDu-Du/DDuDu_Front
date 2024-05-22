"use client";

interface ColorPickerProps {
  color: string;
  name: string;
}

const ColorPickerInput = ({ color, name }: ColorPickerProps) => {
  return (
    <>
      <input
        id={`${color}_picker`}
        type="radio"
        name={name}
        value={color}
        className="hidden"
      />
      <label
        htmlFor={`${color}_picker`}
        className="w-[3.2rem] h-[3.2rem] rounded-circle border-2 block"
        style={{
          backgroundColor: color,
        }}
      />
    </>
  );
};

export default ColorPickerInput;
