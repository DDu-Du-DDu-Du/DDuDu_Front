import { SubmitHandler, useForm } from "react-hook-form";

import { OptionIcon } from "@/app/_components/server/icons";
import { useClickAway } from "@/app/_hooks";

interface MainDDuDuInput {
  goalId: number;
  color: string;
  onCloseDDuDuInput: (event?: MouseEvent | TouchEvent) => void;
  onCreateDDuDu: (ddudu: string) => void;
}

interface DDuDuInputType {
  ddudu: string;
}

const MainDDuDuInput = ({ goalId, color, onCloseDDuDuInput, onCreateDDuDu }: MainDDuDuInput) => {
  const { handleSubmit, register, reset } = useForm<DDuDuInputType>();

  const dduduRef = useClickAway<HTMLLIElement>(onCloseDDuDuInput);

  const onValid: SubmitHandler<DDuDuInputType> = ({ ddudu }) => {
    // /api/ddudus 뚜두 생성
    console.log(goalId, ddudu);
    onCreateDDuDu(ddudu);
    reset();
  };

  return (
    <li
      className="flex items-center justify-between"
      ref={dduduRef}
    >
      <div
        className=" block size-[2rem] rounded-circle border-solid border-2 bg-[white]  mr-[1rem]"
        style={{ borderColor: color }}
      />
      <form
        className="flex-1"
        onSubmit={handleSubmit(onValid)}
      >
        <input
          className="w-[100%] py-[0.5rem] px-[0.5rem] border-solid border-b outline-none"
          style={{ borderColor: color }}
          type="text"
          placeholder="할 일 입력"
          autoFocus
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
