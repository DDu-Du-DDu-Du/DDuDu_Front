import { SheetButton } from "@/app/_components/client";
import { ClockIcon, DeleteIcon, EditIcon } from "@/app/_components/server";
import { formatDateToYYYYMMDD } from "@/app/_utils";

import { DDuDuDetailType } from "../../DDuDuMenu";

interface DDuDuMainMenuProps {
  type: "ddudu" | "schedule";
  dduduId: number;
  dduduDetail: DDuDuDetailType;
  handleEditDDuDu: (id: number) => void;
  onDeleteDDuDu: (id: number) => void;
  handleDDuDuTimeSetting: (beginAt?: string, endAt?: string) => void;
  handleDDuDuSheetToggleOff: () => void;
}

const DDuDuMainMenu = ({
  type,
  dduduId,
  dduduDetail,
  handleEditDDuDu,
  onDeleteDDuDu,
  handleDDuDuTimeSetting,
  handleDDuDuSheetToggleOff,
}: DDuDuMainMenuProps) => {
  const { beginAt, endAt, scheduledOn, status } = dduduDetail;
  const isDDuDuDateNow = formatDateToYYYYMMDD(new Date()) === scheduledOn;

  const handleCurrentDDuDuEdit = () => {
    handleEditDDuDu(dduduId);
    handleDDuDuSheetToggleOff();
  };

  const handleCurrentDDuDuDelete = () => {
    onDeleteDDuDu(dduduId);
  };

  const handleDDuDuTimeChange = () => {
    if (beginAt && endAt) {
      handleDDuDuTimeSetting(beginAt, endAt);
    } else {
      handleDDuDuTimeSetting();
    }
  };

  return (
    <div className="flex w-full max-w-[50rem] gap-4">
      {type === "ddudu" && (
        <SheetButton
          Icon={<EditIcon size={24} />}
          title="수정하기"
          onClick={handleCurrentDDuDuEdit}
        />
      )}
      {(isDDuDuDateNow || status === "COMPLETE") && (
        <SheetButton
          Icon={<ClockIcon />}
          title="뚜두시간"
          onClick={handleDDuDuTimeChange}
        />
      )}
      <SheetButton
        Icon={<DeleteIcon size={24} />}
        title="삭제하기"
        className="flex-grow-[1]"
        onClick={handleCurrentDDuDuDelete}
      />
    </div>
  );
};

export default DDuDuMainMenu;
