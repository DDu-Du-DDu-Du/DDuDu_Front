import { DDuDuMainMenu, DDuDuSubMenu } from "./components";

interface DDuDuMenuProps {
  dduduId: number;
  handleEditDDuDuId: (id: number) => void;
  handleDeleteDDuDuId: (id: number) => void;
  onClose: () => void;
}

export const DDuDuMenu = ({
  dduduId,
  handleEditDDuDuId,
  handleDeleteDDuDuId,
  onClose,
}: DDuDuMenuProps) => {
  return (
    <div className="w-ful flex flex-col items-center gap-[2.5rem] p-[2rem]">
      <DDuDuMainMenu
        dduduId={dduduId}
        handleEditDDuDuId={handleEditDDuDuId}
        handleDeleteDDuDuId={handleDeleteDDuDuId}
        onClose={onClose}
      />
      <DDuDuSubMenu />
    </div>
  );
};

export default DDuDuMenu;
