import { useForm } from "react-hook-form";

import { OptionIcon } from "@/app/_components/server/icons";
import { useClickAway } from "@/app/_hooks";
import { MainDDuDusType } from "@/app/_types/response/feed/feed";

import { useUpdateDDuDuMutation } from "./hooks";

import { useSession } from "next-auth/react";

export interface DDuDuInputType {
  ddudu: string;
}

interface MainDDuDuInputProps {
  type?: "create" | "edit";
  goalId: number;
  color: string;
  dduduItem?: MainDDuDusType;
  selectedDDuDuDate: string;
  onCloseDDuDuInput: (event?: MouseEvent | TouchEvent) => void;
}

const MainDDuDuInput = ({
  type = "create",
  goalId,
  color,
  dduduItem,
  selectedDDuDuDate,
  onCloseDDuDuInput,
}: MainDDuDuInputProps) => {
  const { handleSubmit, register, reset } = useForm<DDuDuInputType>();

  const { data: session } = useSession();

  const { onValid } = useUpdateDDuDuMutation({
    type,
    goalId,
    dduduItem,
    selectedDDuDuDate,
    sessionToken: session?.sessionToken as string,
    reset,
    onCloseDDuDuInput,
  });

  const dduduRef = useClickAway<HTMLLIElement>(onCloseDDuDuInput);

  return (
    <li
      className="flex items-center justify-between"
      ref={dduduRef}
    >
      <div
        className=" block size-[2rem] rounded-circle border-solid border-2 bg-[white]  mr-[1rem]"
        style={{ borderColor: `#${color}` }}
      />
      <form
        className="flex-1"
        onSubmit={handleSubmit(onValid)}
      >
        <input
          className="w-[100%] py-[0.5rem] px-[0.5rem] border-solid border-b outline-none"
          style={{ borderColor: `#${color}` }}
          type="text"
          placeholder="할 일 입력"
          autoFocus
          defaultValue={dduduItem?.name || ""}
          {...register("ddudu", {
            required: true,
          })}
        />
      </form>
      <button
        type="button"
        className="ml-[0.5rem] p-[0.5rem] pr-[0]"
      >
        <OptionIcon />
      </button>
    </li>
  );
};

export default MainDDuDuInput;
