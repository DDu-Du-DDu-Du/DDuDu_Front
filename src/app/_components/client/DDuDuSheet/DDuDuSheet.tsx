import { BottomSheet } from "../BottomSheet";
import { DDuDuMenu } from "./components";

interface DDuDuSheetProps {
  dduduId: number;
  handleEditDDuDu: (id: number) => void;
  handleDeleteDDuDu: (id: number) => void;
  handleDDuDuSheetToggleOff: () => void;
  handleSelectDifferentDate: (type: "change" | "repeat", currentDate: string) => void;
  handleAlarmSetting: () => void;
  handleDDuDuTimeSetting: (beginAt?: string, endAt?: string) => void;
  onRepeatCurrentDate: () => void;
}

const DDuDuSheet = ({
  dduduId,
  handleEditDDuDu,
  handleDeleteDDuDu,
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
        handleDeleteDDuDu={handleDeleteDDuDu}
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
