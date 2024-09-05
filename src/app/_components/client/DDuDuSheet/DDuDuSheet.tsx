import { BottomSheet } from "../BottomSheet";
import { DDuDuMenu } from "./components";

interface DDuDuSheetProps {
  dduduId: number;
  handleEditDDuDu: (id: number) => void;
  onDeleteDDuDu: (id: number) => void;
  handleDDuDuSheetToggleOff: () => void;
  handleSelectDifferentDate: (type: "change" | "repeat", currentDate: string) => void;
  handleAlarmSetting: () => void;
  handleDDuDuTimeSetting: (beginAt?: string, endAt?: string) => void;
  onRepeatCurrentDate: () => void;
}

const DDuDuSheet = ({
  dduduId,
  handleEditDDuDu,
  onDeleteDDuDu,
  handleDDuDuSheetToggleOff,
  handleSelectDifferentDate,
  handleAlarmSetting,
  handleDDuDuTimeSetting,
  onRepeatCurrentDate,
}: DDuDuSheetProps) => {
  return (
    <BottomSheet
      isShow
      defaultHeight={"fit-content"}
      maxHeight={"fit-content"}
      onClose={handleDDuDuSheetToggleOff}
    >
      <DDuDuMenu
        dduduId={dduduId}
        handleEditDDuDu={handleEditDDuDu}
        onDeleteDDuDu={onDeleteDDuDu}
        handleDDuDuSheetToggleOff={handleDDuDuSheetToggleOff}
        handleSelectDifferentDate={handleSelectDifferentDate}
        handleAlarmSetting={handleAlarmSetting}
        handleDDuDuTimeSetting={handleDDuDuTimeSetting}
        onRepeatCurrentDate={onRepeatCurrentDate}
      />
    </BottomSheet>
  );
};

export default DDuDuSheet;
