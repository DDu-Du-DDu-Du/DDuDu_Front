import { BottomSheet } from "../BottomSheet";
import { DDuDuMenu } from "./components";

interface DDuDuSheetProps {
  dduduId: number;
  handleEditDDuDuId: (id: number) => void;
  handleDeleteDDuDuId: (id: number) => void;
  onClose: () => void;
  handleSelectDifferentDate: () => void;
  handleAlarmSetting: () => void;
}

const DDuDuSheet = ({
  dduduId,
  handleEditDDuDuId,
  handleDeleteDDuDuId,
  onClose,
  handleSelectDifferentDate,
  handleAlarmSetting,
}: DDuDuSheetProps) => {
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
        handleSelectDifferentDate={handleSelectDifferentDate}
        handleAlarmSetting={handleAlarmSetting}
      />
    </BottomSheet>
  );
};

export default DDuDuSheet;
