"use client";

interface ColorPickerProps {
  color: string;
  name: string;
  disabled?: boolean;
  isChecked?: boolean;
  onClick: (color: string) => void;
}

const ColorPickerInput = ({
  color,
  name,
  isChecked = false,
  disabled,
  onClick,
}: ColorPickerProps) => {
  return (
    <>
      <input
        id={`${color}_picker`}
        type="radio"
        name={name}
        value={color}
        className="hidden"
        onClick={() => !disabled && onClick(color)}
      />

      {!isChecked && (
        <label
          htmlFor={`${color}_picker`}
          className="w-[3.2rem] h-[3.2rem] rounded-circle block cursor-pointer"
          style={{
            backgroundColor: color,
          }}
        />
      )}

      {isChecked && (
        <label
          htmlFor={`${color}_picker`}
          className="w-[3.2rem] h-[3.2rem] rounded-circle border-[0.4rem] flex items-center justify-center cursor-pointer"
          style={{
            borderColor: color,
          }}
        >
          <div
            className="w-[1.8rem] h-[1.8rem] rounded-circle"
            style={{
              backgroundColor: color,
            }}
          />
        </label>
      )}
    </>
  );
};

export default ColorPickerInput;
