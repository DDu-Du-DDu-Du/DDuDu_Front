import { SubmitHandler, useForm } from "react-hook-form";

import { OptionIcon } from "@/app/_components/server/icons";
import { FEED_KEY } from "@/app/_constants/queryKey/queryKey";
import { useClickAway } from "@/app/_hooks";
import { fetchCreateDDuDu, fetchEditDDuDu } from "@/app/_services/client";
import { MainDDuDusType } from "@/app/_types/response/feed/feed";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "next-auth/react";

interface MainDDuDuInputProps {
  type?: "create" | "edit";
  goalId: number;
  color: string;
  dduduItem?: MainDDuDusType;
  selectedDDuDuDate: string;
  onCloseDDuDuInput: (event?: MouseEvent | TouchEvent) => void;
}

interface DDuDuInputType {
  ddudu: string;
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

  const queryClient = useQueryClient();

  const onUpdateSuccess = () => {
    reset();
    onCloseDDuDuInput();
    queryClient.refetchQueries({ queryKey: [FEED_KEY.DAILY_LIST, selectedDDuDuDate] });
    queryClient.refetchQueries({ queryKey: [FEED_KEY.MONTHLY_DDUDUS] });
  };

  const createDDuDuMutation = useMutation({
    mutationKey: [FEED_KEY.CREATE_DDUDU],
    mutationFn: fetchCreateDDuDu,
    onSuccess: onUpdateSuccess,
  });

  const editDDuDuMutation = useMutation({
    mutationKey: [FEED_KEY.EDIT_DDUDU],
    mutationFn: fetchEditDDuDu,
    onSuccess: onUpdateSuccess,
  });

  const dduduRef = useClickAway<HTMLLIElement>(onCloseDDuDuInput);

  const onValid: SubmitHandler<DDuDuInputType> = ({ ddudu }) => {
    if (type === "create") {
      createDDuDuMutation.mutate({
        accessToken: session?.sessionToken as string,
        requestDDuDu: {
          goalId,
          name: ddudu,
          scheduledOn: selectedDDuDuDate,
        },
      });
    } else if (type === "edit" && dduduItem) {
      editDDuDuMutation.mutate({
        accessToken: session?.sessionToken as string,
        id: dduduItem.id,
        name: ddudu,
      });
    }
  };

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
