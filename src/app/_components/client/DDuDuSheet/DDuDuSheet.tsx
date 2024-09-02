import { BottomSheet } from "../BottomSheet";
import { DDuDuMenu } from "./components";

interface DDuDuSheetProps {
  dduduId: number;
  handleEditDDuDu: (id: number) => void;
  handleDeleteDDuDu: (id: number) => void;
  onClose: () => void;
  handleSelectDifferentDate: () => void;
  handleAlarmSetting: () => void;
}

const DDuDuSheet = ({
  dduduId,
  handleEditDDuDu,
  handleDeleteDDuDu,
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
        handleEditDDuDu={handleEditDDuDu}
        handleDeleteDDuDu={handleDeleteDDuDu}
        onClose={onClose}
        handleSelectDifferentDate={handleSelectDifferentDate}
        handleAlarmSetting={handleAlarmSetting}
      />
    </BottomSheet>
  );
};

export default DDuDuSheet;
