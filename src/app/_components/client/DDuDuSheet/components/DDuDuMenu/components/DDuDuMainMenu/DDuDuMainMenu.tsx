import { SheetButton } from "@/app/_components/client";
import { ExampleIcon } from "@/app/_components/server";

interface DDuDuMainMenuProps {
  dduduId: number;
  handleEditDDuDuId: (id: number) => void;
  handleDeleteDDuDuId: (id: number) => void;
  onClose: () => void;
}

const DDuDuMainMenu = ({
  dduduId,
  handleEditDDuDuId,
  handleDeleteDDuDuId,
  onClose,
}: DDuDuMainMenuProps) => {
  const handleCurrentDDuDuEdit = () => {
    handleEditDDuDuId(dduduId);
    onClose();
  };

  const handleCurrentDDuDuDelete = () => {
    handleDeleteDDuDuId(dduduId);
  };

  return (
    <div className="flex w-full max-w-[50rem] gap-4">
      <SheetButton
        Icon={<ExampleIcon size={32} />}
        title="수정하기"
        onClick={handleCurrentDDuDuEdit}
      />
      <SheetButton
        Icon={<ExampleIcon />}
        title="투두시간"
        onClick={() => console.log("투두시간 설정하기", dduduId)}
      />
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
