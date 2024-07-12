import { SubmitHandler, useForm } from "react-hook-form";

import { MainDDuDusType } from "@/app/(route)/feed/feed.types";
import { OptionIcon } from "@/app/_components/server/icons";
import { useClickAway } from "@/app/_hooks";
import { fetchCreateDDuDu, fetchEditDDuDu } from "@/app/_services/client";
import formatDateToYYYYMMDD from "@/app/_utils/formatDateToYYYYMMDD/formatDateToYYYYMMDD";
import { useMutation } from "@tanstack/react-query";

import { useSession } from "next-auth/react";

interface MainDDuDuInput {
  type?: "create" | "edit";
  goalId: number;
  color: string;
  dduduItem?: MainDDuDusType;
  onCloseDDuDuInput: (event?: MouseEvent | TouchEvent) => void;
  onCreateDDuDu?: ({ id, ddudu }: { id: number; ddudu: string }) => void;
  onEditDDuDu?: (ddudu: MainDDuDusType) => void;
}

interface DDuDuInputType {
  ddudu: string;
}

const MainDDuDuInput = ({
  type = "create",
  goalId,
  color,
  dduduItem,
  onCloseDDuDuInput,
  onCreateDDuDu,
  onEditDDuDu,
}: MainDDuDuInput) => {
  const { handleSubmit, register, reset, getValues } = useForm<DDuDuInputType>();
  const { data: session } = useSession();

  const onCreateSuccess = ({ id }: { id: number }) => {
    const ddudu = getValues("ddudu");
    onCreateDDuDu && onCreateDDuDu({ id, ddudu });
    reset();
  };

  const createDDuDuMutation = useMutation({
    mutationKey: ["dduduCreate"],
    mutationFn: fetchCreateDDuDu,
    onSuccess: onCreateSuccess,
  });

  const editDDuDuMutation = useMutation({
    mutationKey: ["dduduEdit"],
    mutationFn: fetchEditDDuDu,
  });

  const dduduRef = useClickAway<HTMLLIElement>(onCloseDDuDuInput);

  const onValid: SubmitHandler<DDuDuInputType> = ({ ddudu }) => {
    const nowDate = formatDateToYYYYMMDD(new Date());

    if (type === "create") {
      createDDuDuMutation.mutate({
        accessToken: session?.sessionToken as string,
        requestDDuDu: {
          goalId,
          name: ddudu,
          scheduledOn: nowDate,
        },
      });
    } else if (type === "edit" && dduduItem) {
      editDDuDuMutation.mutate({
        accessToken: session?.sessionToken as string,
        id: dduduItem.id,
        name: ddudu,
      });

      const dduduData = {
        id: dduduItem.id,
        name: ddudu,
        status: dduduItem.status,
      };

      onEditDDuDu && onEditDDuDu(dduduData);
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
