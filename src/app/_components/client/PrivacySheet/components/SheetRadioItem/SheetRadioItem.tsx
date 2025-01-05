import styles from "./SheetRadioItem.module.css";

import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";

import { ExampleIcon } from "@/app/_components/server";

interface SheetRadioItemProps {
  label: string;
  icon?: React.ReactNode;
  value: string;
  id: string;
  name: string;
  options?: RegisterOptions<FieldValues, string>;
}

const SheetRadioItem = ({
  label,
  icon = <ExampleIcon />,
  value,
  id,
  name,
  options,
}: SheetRadioItemProps) => {
  const { register, watch } = useFormContext();

  const selectedRadio = watch(name);

  return (
    <li>
      <label
        className="flex justify-between cursor-pointer py-1"
        htmlFor={id}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-[1rem]">{label}</span>
        </div>
        <input
          className="hidden"
          type="radio"
          id={id}
          value={value}
          {...register(name, options)}
        />
        <span
          className={styles.customRadio}
          style={{ borderColor: selectedRadio === value ? "#1363de" : "#ccc" }}
        ></span>
      </label>
    </li>
  );
};

export default SheetRadioItem;
