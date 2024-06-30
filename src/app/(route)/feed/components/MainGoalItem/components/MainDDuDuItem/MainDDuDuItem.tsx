import { OptionIcon } from "@/app/_components/server/icons";

import { twJoin } from "tailwind-merge";

interface MainDDuDuItemProps {
  id: number;
  ddudu: string;
  status: "UNCOMPLETED" | "COMPLETE";
  color: string;
  onDDuDuCheckToggle: (id: number) => void;
  handleToggleOn: () => void;
}

const MainDDuDuItem = ({
  id,
  ddudu,
  status,
  color,
  onDDuDuCheckToggle,
  handleToggleOn,
}: MainDDuDuItemProps) => {
  const handleDDuDuCheckToggle = () => {
    onDDuDuCheckToggle(id);
  };

  return (
    <li className="flex items-center justify-between">
      <label
        className="relative block size-[2rem] rounded-circle border-solid border-2 bg-[white]  mr-[1rem] cursor-pointer"
        style={{ borderColor: color }}
        htmlFor={`${ddudu}${id}`}
      >
        <input
          className="hidden"
          type="checkbox"
          id={`${ddudu}${id}`}
          onChange={handleDDuDuCheckToggle}
        />
        {status === "COMPLETE" && (
          <div
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 size-[1rem] rounded-circle"
            style={{ backgroundColor: color }}
          />
        )}
      </label>
      <strong
        className={twJoin(
          "flex-1 py-[0.5rem] px-[0.5rem] font-regular cursor-pointer",
          status === "COMPLETE" ? "line-through" : "none",
        )}
        onClick={handleToggleOn}
      >
        {ddudu}
      </strong>
      <button
        type="button"
        className="ml-[0.5rem] p-[0.5rem] pr-[0]"
        onClick={handleToggleOn}
      >
        <OptionIcon />
      </button>
    </li>
  );
};

export default MainDDuDuItem;
