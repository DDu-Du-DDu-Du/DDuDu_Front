import { SheetButton } from "@/app/_components/client";
import { ExampleIcon } from "@/app/_components/server";

interface DDuDuMainMenuProps {
  dduduId: number;
  isDDuDuDateNow: boolean;
  status: "COMPLETE" | "UNCOMPLETED";
  handleEditDDuDu: (id: number) => void;
  handleDeleteDDuDu: (id: number) => void;
  onClose: () => void;
}

const DDuDuMainMenu = ({
  dduduId,
  isDDuDuDateNow,
  status,
  handleEditDDuDu,
  handleDeleteDDuDu,
  onClose,
}: DDuDuMainMenuProps) => {
  const handleCurrentDDuDuEdit = () => {
    handleEditDDuDu(dduduId);
    onClose();
  };

  const handleCurrentDDuDuDelete = () => {
    handleDeleteDDuDu(dduduId);
  };

  return (
    <div className="flex w-full max-w-[50rem] gap-4">
      <SheetButton
        Icon={<ExampleIcon size={32} />}
        title="수정하기"
        onClick={handleCurrentDDuDuEdit}
      />
      {(isDDuDuDateNow || status === "COMPLETE") && (
        <SheetButton
          Icon={<ExampleIcon />}
          title="뚜두시간"
          onClick={() => {}}
        />
      )}
      <SheetButton
        Icon={<ExampleIcon />}
        title="삭제하기"
        className="flex-grow-[1]"
        onClick={handleCurrentDDuDuDelete}
      />
    </div>
  );
};

export default DDuDuMainMenu;
