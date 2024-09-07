import { RepeatDdudusType } from "@/app/_types/response/goal/goal";

import { useRouter } from "next/navigation";

interface UseDeleteRepeatDDuDuMutationProps {
  goalId: string;
  repeatId: string;
  repeatDDuDu: RepeatDdudusType[];
  setRepeatDDuDu: (repeatDDuDu: RepeatDdudusType[]) => void;
}

const useDeleteRepeatDDuDuMutation = ({
  goalId,
  repeatId,
  repeatDDuDu,
  setRepeatDDuDu,
}: UseDeleteRepeatDDuDuMutationProps) => {
  const router = useRouter();

  const handleRepeatDDuDuDelete = () => {
    if (goalId === "create") {
      const updateRepeatDDuDu = repeatDDuDu.filter((ddudu) => ddudu.id !== Number(repeatId));
      setRepeatDDuDu(updateRepeatDDuDu);
      router.replace("/goal/editor");
    } else {
      // repeatDDuDu DELETE API호출
    }
  };

  return {
    handleRepeatDDuDuDelete,
  };
};

export default useDeleteRepeatDDuDuMutation;
