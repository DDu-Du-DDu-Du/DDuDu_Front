import { SheetButton } from "@/app/_components/client";
import { ExampleIcon } from "@/app/_components/server";
import { formatDateToYYYYMMDD } from "@/app/_utils";

import { DDuDuDetailType } from "../../DDuDuMenu";

interface DDuDuMainMenuProps {
  dduduId: number;
  dduduDetail: DDuDuDetailType;
  handleEditDDuDu: (id: number) => void;
  onDeleteDDuDu: (id: number) => void;
  handleDDuDuTimeSetting: (beginAt?: string, endAt?: string) => void;
  handleDDuDuSheetToggleOff: () => void;
}

const DDuDuMainMenu = ({
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
      <SheetButton
        Icon={<ExampleIcon size={32} />}
        title="수정하기"
        onClick={handleCurrentDDuDuEdit}
      />
      {(isDDuDuDateNow || status === "COMPLETE") && (
        <SheetButton
          Icon={<ExampleIcon />}
          title="뚜두시간"
          onClick={handleDDuDuTimeChange}
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
