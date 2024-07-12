import { BottomSheet } from "../BottomSheet";
import { DDuDuMenu } from "./components";

interface DDuDuSheetProps {
  dduduId: number;
  handleEditDDuDuId: (id: number) => void;
  handleDeleteDDuDuId: (id: number) => void;
  onClose: () => void;
}

const DDuDuSheet = ({
  dduduId,
  handleEditDDuDuId,
  handleDeleteDDuDuId,
  onClose,
}: DDuDuSheetProps) => {
  console.log("dduduId", dduduId);

  return (
    <BottomSheet
      isShow
      defaultHeight={"fit-content"}
      maxHeight={"fit-content"}
      onClose={onClose}
    >
      <DDuDuMenu
        dduduId={dduduId}
        handleEditDDuDuId={handleEditDDuDuId}
        handleDeleteDDuDuId={handleDeleteDDuDuId}
        onClose={onClose}
      />
    </BottomSheet>
  );
};

export default DDuDuSheet;
