import { BottomSheet } from "../BottomSheet";
import { DDuDuMenu } from "./components";

interface DDuDuSheetProps {
  dduduId: number;
  handleEditDDuDu: (id: number) => void;
  handleDeleteDDuDu: (id: number) => void;
  onClose: () => void;
  handleSelectDifferentDate: (type: "change" | "repeat", currentDate: string) => void;
  handleAlarmSetting: () => void;
  handleDDuDuTimeSetting: (beginAt?: string, endAt?: string) => void;
  handleRepeatCurrentDate: () => void;
}

const DDuDuSheet = ({
  dduduId,
  handleEditDDuDu,
  handleDeleteDDuDu,
  onClose,
  handleSelectDifferentDate,
  handleAlarmSetting,
  handleDDuDuTimeSetting,
  handleRepeatCurrentDate,
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
        handleDDuDuTimeSetting={handleDDuDuTimeSetting}
        handleRepeatCurrentDate={handleRepeatCurrentDate}
      />
    </BottomSheet>
  );
};

export default DDuDuSheet;
