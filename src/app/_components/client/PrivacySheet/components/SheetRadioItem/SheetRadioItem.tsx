import styles from "./SheetRadioItem.module.css";

import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";

import { ExampleIcon } from "@/app/_components/server";

interface SheetRadioItemProps {
  label: string;
  value: string;
  id: string;
  name: string;
  options?: RegisterOptions<FieldValues, string>;
}

const SheetRadioItem = ({ label, value, id, name, options }: SheetRadioItemProps) => {
  const { register } = useFormContext();

  return (
    <li>
      <label
        className="flex justify-between cursor-pointer"
        htmlFor={id}
      >
        <div className="flex items-center">
          <ExampleIcon />
          <span className="ml-[1rem]">{label}</span>
        </div>
        <input
          className="hidden"
          type="radio"
          id={id}
          value={value}
          {...register(name, options)}
        />
        <span className={styles.customRadio}></span>
      </label>
    </li>
  );
};

export default SheetRadioItem;
